// I2C device class (I2Cdev) demonstration Arduino sketch for MPU6050 class using DMP (MotionApps v2.0)

#include "MPU6050_6Axis_Microduino.h"
#include "HMC5883L.h"
//#include "MPU6050.h" // not necessary if using MotionApps include file

//use HMC5883L
#define AXIS_9

// class default I2C address is 0x68
// specific I2C addresses may be passed as a parameter here
// AD0 low = 0x68 (default for SparkFun breakout and InvenSense evaluation board)
// AD0 high = 0x69
MPU6050 mpu;

#ifdef AXIS_9
  HMC5883L mag;
#endif

// uncomment "OUTPUT_READABLE_QUATERNION" if you want to see the actual
// quaternion components in a [w, x, y, z] format (not best for parsing
// on a remote host such as Processing or something though)
//#define OUTPUT_READABLE_QUATERNION

// uncomment "OUTPUT_READABLE_YAWPITCHROLL" if you want to see the yaw/
// pitch/roll angles (in degrees) calculated from the quaternions coming
// from the FIFO. Note this also requires gravity vector calculations.
// Also note that yaw/pitch/roll angles suffer from gimbal lock (for
// more info, see: http://en.wikipedia.org/wiki/Gimbal_lock)
#define OUTPUT_READABLE_YAWPITCHROLL

// orientation/motion vars
Quaternion q;           // [w, x, y, z]         quaternion container
float ypr[3];           // [yaw, pitch, roll]   yaw/pitch/roll container and gravity vector
float mx, my, mz;   //magneto measurements
uint8_t mpuMode;
bool mpuReady;

// ================================================================
// ===                      INITIAL SETUP                       ===
// ================================================================

void setup() {
    // initialize serial communication
    // (115200 chosen because it is required for Teapot Demo output, but it's
    // really up to you depending on your project)
    Serial.begin(115200);
    while (!Serial); // wait for Leonardo enumeration, others continue immediately

    //set MPU mode
    mpuMode = MODE_SW;    //MODE_DMP/MODE_SW
    // verify connection
    // load and configure the MPU
    Serial.println(F("Initializing MPU..."));
    mpuReady = mpu.begin(mpuMode);
    if (!mpuReady) {
        // ERROR!
        // 1 = initial memory load failed
        // 2 = DMP configuration updates failed
        // (if it's going to break, usually the code will be 1)
        Serial.print(F("MPU Initialization failed!"));
    }
#ifdef AXIS_9
    Serial.println("Initializing HMC5883L...");
    Serial.println(mag.begin() ? "HMC5883L connection successful" : "HMC5883L connection failed");

    // calibrate mag
    Serial.println("Calibrate mag start, please roate the sensor in 20s ...");
    mag.calibrateMag(0);
    Serial.println("Calibrate done.");
    Serial.print("offser:\t");
    Serial.print(mag.xOffset); Serial.print("\t");
    Serial.print(mag.yOffset); Serial.print("\t");
    Serial.println(mag.zOffset);
#endif    
}

// ================================================================
// ===                    MAIN PROGRAM LOOP                     ===
// ================================================================

void loop() {
    // if programming failed, don't try to do anything
    if (!mpuReady) return;

#ifdef AXIS_9
    mag.getMagneto(&mx, &my, &mz);
#endif
    
#ifdef OUTPUT_READABLE_QUATERNION
    // display quaternion values in easy matrix form: w x y z
  #ifdef AXIS_9
    mpu.getQuaternion(&q, mx, my, mz);
  #else
    mpu.getQuaternion(&q);  
  #endif
    Serial.print("quat\t");
    Serial.print(q.w);
    Serial.print("\t");
    Serial.print(q.x);
    Serial.print("\t");
    Serial.print(q.y);
    Serial.print("\t");
    Serial.println(q.z);
#endif

#ifdef OUTPUT_READABLE_YAWPITCHROLL
    // display Euler angles in degrees
  #ifdef AXIS_9
    mpu.getYawPitchRoll(ypr, mx, my, mz);
  #else
    mpu.getYawPitchRoll(ypr);  
  #endif
    Serial.print("ypr\t");
    Serial.print(ypr[0]);
    Serial.print("\t");
    Serial.print(ypr[1]);
    Serial.print("\t");
    Serial.println(ypr[2]);
#endif
}