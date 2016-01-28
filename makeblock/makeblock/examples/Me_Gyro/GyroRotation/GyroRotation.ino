#include "Makeblock.h"
#include <Wire.h>
#include <SoftwareSerial.h>
MeGyro gyro;
void setup(){
  Serial.begin(9600);
  gyro.begin();
}
void loop(){
  gyro.update();
  if(Serial.available())
  {
    Serial.read();
    Serial.print("X:");
    Serial.print(gyro.angleX());
    Serial.print(" Y:");
    Serial.print(gyro.angleY());
    Serial.print(" Z:");
    Serial.println(gyro.angleZ());
  }
}
