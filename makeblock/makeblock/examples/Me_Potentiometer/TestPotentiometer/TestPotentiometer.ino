/*************************************************************************
* File Name          : TestPotentiometer.ino
* Author             : xiaoyu
* Version            : V1.0.0
* Date               : 5/27/2014
*Parts required		 : Me Potentiometer
* Description        :
* License            : CC-BY-SA 3.0
* Copyright (C) 2013 Maker Works Technology Co., Ltd. All right reserved.
* http://www.makeblock.cc/
**************************************************************************/
#include <Makeblock.h>
#include <Arduino.h>
#include <SoftwareSerial.h>
#include <Wire.h>

MePotentiometer myPotentiometer(PORT_8);
void setup()
{
    Serial.begin(9600);
}
void loop()
{
 Serial.print("value=");
 Serial.println(myPotentiometer.read());
 delay(100);
}
