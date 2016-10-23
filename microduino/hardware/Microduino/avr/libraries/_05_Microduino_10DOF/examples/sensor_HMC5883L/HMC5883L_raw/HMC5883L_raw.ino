#include "Wire.h"

#include "I2Cdev.h"
#include "HMC5883L.h"

HMC5883L mag;

int16_t mx, my, mz;

void setup() {
  // join I2C bus (I2Cdev library doesn't do this automatically)
  Wire.begin();

  // initialize serial communication
  // (38400 chosen because it works as well at 8MHz as it does at 16MHz, but
  // it's really up to you depending on your project)
  Serial.begin(115200);

  // initialize device
  Serial.println("Initializing I2C devices...");
  mag.initialize();

  // verify connection
  Serial.println("Testing device connections...");
  Serial.println(mag.testConnection() ? "HMC5883L connection successful" : "HMC5883L connection failed");

}

void loop() {
  // read raw heading measurements from device
  mag.getHeading(&mx, &my, &mz);

  // display tab-separated gyro x/y/z values
  Serial.print("mag:\t");
  Serial.print(mx); Serial.print("\t");
  Serial.print(my); Serial.print("\t");
  Serial.println(mz);

  delay(100);
}
