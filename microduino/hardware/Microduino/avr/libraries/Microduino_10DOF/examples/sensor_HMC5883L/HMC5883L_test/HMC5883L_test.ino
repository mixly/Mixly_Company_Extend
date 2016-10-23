#include "HMC5883L.h"

HMC5883L mag;

int16_t x, y, z;    //heading measurements
float mx, my, mz;   //magneto measurements
float dx, dy, dz;   //degrees measurements

void setup() {
  Serial.begin(115200);
  // initialize device
  Serial.println("Initializing I2C devices...");
  Serial.println(mag.begin() ? "HMC5883L connection successful" : "HMC5883L connection failed");

  // calibrate mag
  Serial.println("Calibrate start, please roate the sensor in 20s ...");
  mag.calibrateMag(0);
  Serial.println("Calibrate done.");
  Serial.print("offser:\t");
  Serial.print(mag.xOffset); Serial.print("\t");
  Serial.print(mag.yOffset); Serial.print("\t");
  Serial.println(mag.zOffset);
}

void loop() {
  // read heading measurements from device
  mag.getHeading(&x, &y, &z);
  // display tab-separated heading x/y/z values
  Serial.print("heading:\t");
  Serial.print(x); Serial.print("\t");
  Serial.print(y); Serial.print("\t");
  Serial.print(z); Serial.print("\t");

  // read magneto measurements from device
  mag.getMagneto(&mx, &my, &mz);
  // display tab-separated mag x/y/z values
  Serial.print("mag:\t");
  Serial.print(mx); Serial.print("\t");
  Serial.print(my); Serial.print("\t");
  Serial.print(mz); Serial.print("\t");

  // read degrees measurements from device
  mag.getDegrees(&dx, &dy, &dz);
  // display tab-separated degree x/y/z values
  Serial.print("degrees:\t");
  Serial.print(dx); Serial.print("\t");
  Serial.print(dy); Serial.print("\t");
  Serial.println(dz);

  delay(100);
}