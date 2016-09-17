#include "Nova_Gyro.h"
#include <utility/SoftIIC.h>

#define USE_SOFT_I2C 1

SoftIIC GyroIIC;

#define USER	0x80
#define C0	USER+1
#define C1	USER+2

#define S0	USER+11
#define S1	USER+12
#define S2	USER+13
#define S3	USER+14
#define S4	USER+15
#define S5	USER+16

#define M0	USER+21
#define M1	USER+22
#define M2	S4
#define M3	S5

//pin define
#define C0_PIN_0	0
#define C0_PIN_1	1

// 位置后面需要改回来
#define C1_PIN_0	A5	//SCL
#define C1_PIN_1	A4	//SDA

#define S0_PIN	2
#define S1_PIN	9
#define S2_PIN	10
#define S3_PIN	13

#define S4_PIN_0	11
#define S4_PIN_1	12
#define S5_PIN_0	3
#define S5_PIN_1	4

#define M0_PIN_0	5
#define M0_PIN_1	7
#define M1_PIN_0	6
#define M1_PIN_1	8

#define M2_PIN_0	S4_PIN_0
#define M2_PIN_1	S4_PIN_1
#define M3_PIN_0	S5_PIN_0
#define M3_PIN_1	S5_PIN_1

Gyro::Gyro(uint8_t port)
{
    uint8_t SCL_pin,SDA_pin;
	switch(port)
	{
	    case C0:
		    SCL_pin = C0_PIN_1;
			SDA_pin = C0_PIN_0;
		break;
		case C1:
			SCL_pin = C1_PIN_0;
			SDA_pin = C1_PIN_1;
		break;
		case S4:
			SCL_pin = S4_PIN_1;
			SDA_pin = S4_PIN_0;
		break;
		case S5:
			SCL_pin = S5_PIN_1;
			SDA_pin = S5_PIN_0;
		break;
        case M0:
			SCL_pin = M0_PIN_1;
			SDA_pin = M0_PIN_0;
		break;
        case M1:
			SCL_pin = M1_PIN_1;
			SDA_pin = M1_PIN_0;
		break;
	}
    GyroIIC.begin(SDA_pin,SCL_pin);  
    Device_Address = GYRO_DEFAULT_ADDRESS;
}


/**
 * \par Function
 *   begin
 * \par Description
 *   Initialize the Gyro.
 * \param[in]
 *   None
 * \par Output
 *   None
 * \return
 *   None
 * \par Others
 *   You can check the MPU6050 datasheet for the registor address.
 */
void Gyro::begin(void)
{
  gSensitivity = 65.5; //for 500 deg/s, check data sheet
  gx = 0;
  gy = 0;
  gz = 0;
  gyrX = 0;
  gyrY = 0;
  gyrZ = 0;
  accX = 0;
  accY = 0;
  accZ = 0;
  gyrXoffs = 0;
  gyrYoffs = 0;
  gyrZoffs = 0;
  
  delay(800);
  writeReg(0x6b, 0x00);//close the sleep mode
  writeReg(0x1a, 0x01);//configurate the digital low pass filter
  writeReg(0x1b, 0x08);//set the gyro scale to 500 deg/s
  
  
  deviceCalibration();
}

/**
 * \par Function
 *   update
 * \par Description
 *   Update some calculated angle values to the variable.
 * \param[in]
 *   None
 * \par Output
 *   None
 * \return
 *   None
 * \par Others
 *   The angle values are calculated by complementary filter.
 *   The time constant of filter is set to 0.5 second, but period dt is not a constant, 
 *   so the filter coefficient will be calculated dynamically.
 */
void Gyro::update(void)
{
  static unsigned long	last_time = 0;
  int8_t return_value;
  double dt, filter_coefficient;
  /* read imu data */
  readData(0x3b, i2cData, 14);

   
   //Serial.println("hello");
   
  double ax, ay, az;
  /* assemble 16 bit sensor data */
  accX = ( (i2cData[0] << 8) | i2cData[1] );
  accY = ( (i2cData[2] << 8) | i2cData[3] );
  accZ = ( (i2cData[4] << 8) | i2cData[5] );  
  gyrX = ( ( (i2cData[8] << 8) | i2cData[9] ) - gyrXoffs) / gSensitivity;
  gyrY = ( ( (i2cData[10] << 8) | i2cData[11] ) - gyrYoffs) / gSensitivity;
  gyrZ = ( ( (i2cData[12] << 8) | i2cData[13] ) - gyrZoffs) / gSensitivity;  
  ax = atan2(accX, sqrt( pow(accY, 2) + pow(accZ, 2) ) ) * 180 / 3.1415926;
  ay = atan2(accY, sqrt( pow(accX, 2) + pow(accZ, 2) ) ) * 180 / 3.1415926;  

  dt = (double)(millis() - last_time) / 1000;
  last_time = millis();

  if(accZ > 0)
  {
    gx = gx - gyrY * dt;
    gy = gy + gyrX * dt;
  }
  else
  {
    gx = gx + gyrY * dt;
    gy = gy - gyrX * dt;
  }
  gz += gyrZ * dt;
  /*
     complementary filter
     set 0.5sec = tau = dt * A / (1 - A)
     so A = tau / (tau + dt)
  */
  filter_coefficient = 0.5 / (0.5 + dt);
  gx = gx * filter_coefficient + ax * (1 - filter_coefficient);
  gy = gy * filter_coefficient + ay * (1 - filter_coefficient);   
}

/**
 * \par Function
 *   fast_update
 * \par Description
 *   Fast update some calculated angle values to the variable.
 * \param[in]
 *   None
 * \par Output
 *   None
 * \return
 *   None
 * \par Others
 *   The angle values are calculated by complementary filter.
 *   The time constant of filter is set to 0.5 second, but period dt is not a constant, 
 *   so the filter coefficient will be calculated dynamically.
 */
void Gyro::fast_update(void)
{
  static unsigned long	last_time = 0;
  int8_t return_value;
  double dt, filter_coefficient;

  dt = (double)(millis() - last_time) / 1000.0;
  last_time = millis();

  /* read imu data */
  readData(0x3b, i2cData, 14);
 

  double ax, ay, az;
  /* assemble 16 bit sensor data */
  accX = ( (i2cData[0] << 8) | i2cData[1] );
  accY = ( (i2cData[2] << 8) | i2cData[3] );
  accZ = ( (i2cData[4] << 8) | i2cData[5] );  
  gyrX = ( ( (i2cData[8] << 8) | i2cData[9] ) - gyrXoffs) / gSensitivity;
  gyrY = ( ( (i2cData[10] << 8) | i2cData[11] ) - gyrYoffs) / gSensitivity;
  gyrZ = ( ( (i2cData[12] << 8) | i2cData[13] ) - gyrZoffs) / gSensitivity;  
  ax = atan2(accX, sqrt( pow(accY, 2) + pow(accZ, 2) ) ) * 180 / 3.1415926;
  ay = atan2(accY, sqrt( pow(accX, 2) + pow(accZ, 2) ) ) * 180 / 3.1415926;  

  if(accZ > 0)
  {
    gx = gx - gyrY * dt;
    gy = gy + gyrX * dt;
  }
  else
  {
    gx = gx + gyrY * dt;
    gy = gy - gyrX * dt;
  }
  gz += gyrZ * dt;

  gy = 0.98 * gy + 0.02 * ay;
  gx = 0.98 * gx + 0.02 * ax; 
}

/**
 * \par Function
 *   getDevAddr
 * \par Description
 *   Get the device address of Gyro.
 * \param[in]
 *   None
 * \par Output
 *   None
 * \return
 *   The device address of Gyro
 * \par Others
 *   None
 */
uint8_t Gyro::getDevAddr(void)
{
  return Device_Address;
}

/**
 * \par Function
 *   getHeadingX
 * \par Description
 *   Get the angle value of X-axis.
 * \param[in]
 *   None
 * \par Output
 *   None
 * \return
 *   The angle value of X-axis
 * \par Others
 *   X-axis angle value is calculated by complementary filter.
 */
double Gyro::getAngleX(void)
{
  return gx;
}

/**
 * \par Function
 *   getHeadingY
 * \par Description
 *   Get the angle value of Y-axis.
 * \param[in]
 *   None
 * \par Output
 *   None
 * \return
 *   The angle value of Y-axis
 * \par Others
 *   Y-axis angle value is calculated by complementary filter.
 */
double Gyro::getAngleY(void)
{
  return gy;
}

/**
 * \par Function
 *   getHeadingZ
 * \par Description
 *   Get the angle value of Z-axis.
 * \param[in]
 *   None
 * \par Output
 *   None
 * \return
 *   The angle value of Z-axis
 * \par Others
 *   Z-axis angle value is integral of Z-axis angular velocity.
 */
double Gyro::getAngleZ(void)
{
  return gz;
}

/**
 * \par Function
 *   getGyroX
 * \par Description
 *   Get the data of gyroXrate.
 * \param[in]
 *   None
 * \par Output
 *   None
 * \return
 *   The data of gyroXrate
 * \par Others
 *   None
 */
double Gyro::getGyroX(void)
{
  return gyrX;
}

/**
 * \par Function
 *   getGyroY
 * \par Description
 *   Get the data of gyroYrate.
 * \param[in]
 *   None
 * \par Output
 *   None
 * \return
 *   The data of gyroYrate
 * \par Others
 *   None
 */
double Gyro::getGyroY(void)
{
  return gyrY;
}

double Gyro::getGyroZ(void)
{
  return gyrZ;
}

/**
 * \par Function
 *   getHeadingZ
 * \par Description
 *   Get the angle value of setting axis.
 * \param[in]
 *   index - Axis settings(1:X-axis, 2:Y-axis, 3:Z-axis)
 * \par Output
 *   None
 * \return
 *   The angle value of setting axis
 * \par Others
 *   Z-axis angle value is integral of Z-axis angular velocity.
 */
double Gyro::getAngle(uint8_t index)
{
  if(index == 1)
  {
    return gx;
  }
  else if(index == 2)
  {
    return gy;
  }
  else if(index == 3)
  {
    return gz;
  }
} 

/**
 * \par Function
 *   deviceCalibration
 * \par Description
 *   Calibration function for the Gyro. 
 * \param[in]
 *   None
 * \par Output
 *   None
 * \return
 *   None.
 * \par Others
 *   The calibration function will be called in initial process, please keep the 
 *   device in a rest status at that time.
 */
void Gyro::deviceCalibration(void)
{
  uint16_t x = 0;
  uint16_t num = 500;
  long xSum	= 0, ySum = 0, zSum = 0;
  for(x = 0; x < num; x++)
  {
	  readData(0x43, i2cData, 6);
	  xSum += ( (i2cData[0] << 8) | i2cData[1] );
	  ySum += ( (i2cData[2] << 8) | i2cData[3] );
	  zSum += ( (i2cData[4] << 8) | i2cData[5] );
  }
  gyrXoffs = xSum / num;
  gyrYoffs = ySum / num;
  gyrZoffs = zSum / num;
}

int8_t Gyro::writeReg(uint8_t reg, uint8_t data)
{
  uint8_t add = Device_Address;
  add <<= 1;
  GyroIIC.start(add+I2C_WRITE);

  GyroIIC.write(reg);

  GyroIIC.write(data);

  GyroIIC.stop();
}

uint8_t Gyro::readReg(uint8_t reg)
{
  uint8_t data = 0;
  uint8_t add = Device_Address;
  add <<= 1;
  GyroIIC.start(add+I2C_WRITE);
  GyroIIC.write(reg);
  // read
  GyroIIC.restart(add+I2C_READ);

  data= GyroIIC.read(true);          
  GyroIIC.stop();  
  return data;
}

int8_t Gyro::readData(uint8_t start, uint8_t *buffer, uint8_t size)
{
  uint8_t i;
  uint8_t add = Device_Address;
  add <<= 1;
  GyroIIC.start(add+I2C_WRITE);
  GyroIIC.write(start);
  // read
  GyroIIC.restart(add+I2C_READ);
  for (i=0;i<size-1;i++)
  {
    buffer[i] = GyroIIC.read(false);
  }
  buffer[i]= GyroIIC.read(true);          
  GyroIIC.stop();  
}
