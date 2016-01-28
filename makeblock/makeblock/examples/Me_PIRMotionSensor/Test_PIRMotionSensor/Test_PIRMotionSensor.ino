/*************************************************************************
* File Name          : Test_PIRMotionSensor.ino
* Author             : xiaoyu
* Version            : V1.0.0
* Date               : 5/27/2014
*Parts required		 : Me PIRMotion Sensor
* Description        :
* License            : CC-BY-SA 3.0
* Copyright (C) 2013 Maker Works Technology Co., Ltd. All right reserved.
* http://www.makeblock.cc/
**************************************************************************/
#include <Makeblock.h>
#include <Arduino.h>
#include <SoftwareSerial.h>
#include <Wire.h>

MePIRMotionSensor myPIRsensor(PORT_8);
void setup()
{
    Serial.begin(9600);
}
void loop()
{
 
 if(myPIRsensor.isPeopleDetected())
 {
	Serial.println("People Detected");
 }
 delay(100);
}
