/*************************************************************************
* File Name          : TestMicroSwitch.ino
* Author             : xiaoyu
* Version            : V1.0.0
* Date               : 5/27/2014
*Parts required	     :Me Micro Switch ,Me RJ25 Adapter
* Description        : Example for Makeblock Electronic modules of Me MicroSwitch. 

* License            : CC-BY-SA 3.0
* Copyright (C) 2013 Maker Works Technology Co., Ltd. All right reserved.
* http://www.makeblock.cc/
**************************************************************************/
#include <Makeblock.h>
#include <Arduino.h>
#include <SoftwareSerial.h>
#include <Wire.h>

//Me_LimitSwitch module can only be connected to PORT_3, PORT_4, PORT_6,PORT_7,PORT_8 of base shield or from PORT_3 to PORT_8 of baseboard.
MeLimitSwitch limitSwitch1(PORT_3,SLOT1); //connecte to Me RJ25 Adapter SLOT1
MeLimitSwitch limitSwitch2(PORT_3,SLOT2); //connecte to Me RJ25 Adapter SLOT2
void setup()
{
    Serial.begin(9600);
    Serial.println("Start.");
}
void loop()
{
   if(limitSwitch1.touched()) //If the limit switch is touched, the  return value is true.
   {
		delay(10);
		Serial.println("limitSwitch1 DOWN.");  
   }
      if(limitSwitch2.touched()) //If the limit switch is touched, the  return value is true.
   {
		delay(10);
		Serial.println("limitSwitch2 DOWN.");  
   }
}