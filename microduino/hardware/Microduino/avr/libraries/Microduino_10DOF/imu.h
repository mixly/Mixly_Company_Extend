
#ifndef __IMU_H__
#define __IMU_H__

#include "arduino.h"

#define AHRS_KP		2.0f
#define AHRS_KI		0.01f

float q0, q1, q2, q3;
float exInt, eyInt, ezInt;
uint32_t tPrev;

static inline float invSqrt(float x){
	float halfx = 0.5f * x;
	float y = x;
	long i = *(long*)&y;
	i = 0x5f3759df - (i>>1);
	y = *(float*)&i;
	y = y * (1.5f -(halfx * y * y));
	return y;
}


void AHRSinit(){
	q0 = 1.0f;
	q1 = 0.0f;
	q2 = 0.0f;
	q3 = 0.0f;
	exInt = 0.0f;
	eyInt = 0.0f;
	ezInt = 0.0f;
	tPrev = micros();
} 


void AHRSupdate(float gx, float gy, float gz, float ax, float ay, float az, float mx, float my, float mz){
	float recipNorm;
	float ex = 0.0f, ey = 0.0f, ez = 0.0f;
	
	float q0q0 = q0*q0;
	float q0q1 = q0*q1;
	float q0q2 = q0*q2;
	float q1q1 = q1*q1;
	float q1q3 = q1*q3;
	float q2q2 = q2*q2;
	float q2q3 = q2*q3;
	float q3q3 = q3*q3;
	
	float halfDt = 0.0f;
	uint32_t tNow = micros();
	if(tNow < tPrev){
		halfDt = ((float)(tNow + (0xffffffff- tPrev)) / 2000000.0f);
	}else{
		halfDt =  ((float)(tNow - tPrev) / 2000000.0f);
	}
	tPrev = tNow;
	
	if(!((mx == 0.0f) && (my == 0.0f) && (mz == 0.0f))) {
		float hx, hy, hz, bx, bz;
		float wx, wy, wz;
		float q0q3 = q0*q3;
		float q1q2 = q1*q2;
	
    	recipNorm = invSqrt(mx * mx + my * my + mz * mz);
    	mx *= recipNorm;
    	my *= recipNorm;
    	mz *= recipNorm;
    
    	hx = 2.0f * (mx * (0.5f - q2q2 - q3q3) + my * (q1q2 - q0q3) + mz * (q1q3 + q0q2));
    	hy = 2.0f * (mx * (q1q2 + q0q3) + my * (0.5f - q1q1 - q3q3) + mz * (q2q3 - q0q1));
		hz = 2.0f * mx * (q1q3 - q0q2) + 2.0f * my * (q2q3 + q0q1) + 2.0f * mz * (0.5f - q1q1 - q2q2);
    	bx = sqrt(hx * hx + hy * hy);
    	bz = hz;
    
    	wx = 2 * bx * (0.5f - q2q2 - q3q3) + 2 * bz * (q1q3 - q0q2);
    	wy = 2 * bx * (q1q2 - q0q3) + 2 * bz * (q0q1 + q2q3);
    	wz = 2 * bx * (q0q2 + q1q3) + 2 * bz * (0.5f - q1q1 - q2q2);
    
    	ex += (my * wz - mz * wy);
    	ey += (mz * wx - mx * wz);
    	ez += (mx * wy - my * wx);
	}

	if(!((ax == 0.0f) && (ay == 0.0f) && (az == 0.0f))){
		float vx, vy, vz;
	
		recipNorm = invSqrt(ax * ax + ay * ay + az * az);
		ax *= recipNorm;
		ay *= recipNorm;
		az *= recipNorm;

		vx = 2 * (q1q3 - q0q2);
		vy = 2 * (q0q1 + q2q3);
		vz = q0q0 - q1q1 - q2q2 + q3q3;
		
		ex += ay * vz - az * vy;
		ey += az * vx - ax * vz;
		ez += ax * vy - ay * vx;
	}

	if(ex != 0.0f && ey != 0.0f && ez != 0.0f) {
		exInt += AHRS_KI * ex * halfDt;	
		eyInt += AHRS_KI * ey * halfDt;
		ezInt += AHRS_KI * ez * halfDt;	

		gx += AHRS_KP * ex + exInt;
		gy += AHRS_KP * ey + eyInt;
		gz += AHRS_KP * ez + ezInt;
	}

	float tempq0 = (-q1 * gx - q2 * gy - q3 * gz) * halfDt;
	float tempq1 = (q0 * gx + q2 * gz - q3 * gy) * halfDt;
	float tempq2 = (q0 * gy - q1 * gz + q3 * gx) * halfDt;
	float tempq3 = (q0 * gz + q1 * gy - q2 * gx) * halfDt; 

	q0 += tempq0;
	q1 += tempq1;
	q2 += tempq2;
	q3 += tempq3;
	
	recipNorm = invSqrt(q0 * q0 + q1 * q1 + q2 * q2 + q3 * q3);
	q0 *= recipNorm;
	q1 *= recipNorm;
	q2 *= recipNorm;
	q3 *= recipNorm;   	
	
}

#endif /* _IMU_H_ */