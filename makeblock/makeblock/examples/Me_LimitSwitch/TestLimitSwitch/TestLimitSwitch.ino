/*************************************************************************
* File Name          : TestLimitSwitch.ino
* Author             : Evan
* Updated            : xiaoyu 5/26/2014 Limit switch is touched, returns true
* Version            : V1.0.1
* Date               : 5/26/2014
*Parts required		 : Me-LimitSwitch
* Description        : Example for Makeblock Electronic modules of Me-LimitSwitch. 
						If the limit switch is touched, the  return value is true.
* License            : CC-BY-SA 3.0
* Copyright (C) 2013 Maker Works Technology Co., Ltd. All right reserved.
* http://www.makeblock.cc/
**************************************************************************/
#include <Makeblock.h>
#include <SoftwareSerial.h>
#include <Wire.h>

//Me_LimitSwitch module can only be connected to PORT_3, PORT_4, PORT_6,PORT_7,PORT_8 of base shield or from PORT_3 to PORT_8 of baseboard.
MeLimitSwitch limitSwitch(PORT_6); 
void setup()
{
    Serial.begin(9600);
    Serial.println("Start.");
}
void loop()
{
   if(limitSwitch.touched()) //If the limit switch is touched, the  return value is true.
   {
     Serial.println("State: DOWN.");
     delay(1);
     while(limitSwitch.touched()); //Repeat check the switch state, until released.
     delay(2);
   }
   if(!limitSwitch.touched()){
     Serial.println("State: UP.");
     delay(1);
     while(!limitSwitch.touched());
     delay(2);
   }
}