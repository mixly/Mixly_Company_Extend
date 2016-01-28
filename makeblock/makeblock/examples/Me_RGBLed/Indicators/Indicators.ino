/*************************************************************************
* File Name          : Indicators.ino
* Author             : Evan
* Updated            : Ander
* Version            : V0.4.1
* Date               : 27/03/2014
* Description        : Test for Makeblock Electronic modules of MeRGBLed and
                       LedStrip. 
                      . 
* License            : CC-BY-SA 3.0
* Copyright (C) 2013 Maker Works Technology Co., Ltd. All right reserved.
* http://www.makeblock.cc/
**************************************************************************/
#include "Makeblock.h"
#include <SoftwareSerial.h>
#include <Wire.h>

MeRGBLed led(PORT_3);

void setup()
{
  // set the led quantity.
  led.setNumber(15);
}
int lastNum = 0;

void loop()
{
  byte count = random(1,15); 
 // generates random numbers
  indicators(count,20,30,40);
  delay(150);
}
void indicators(byte count,byte r,byte g,byte b){
  byte inSpeed = 10;
  if(lastNum <= count){
      for(int x = lastNum; x <= count; ++x){
          led.setColorAt(x,r,g,b);
          led.show();
          delay(inSpeed);
      }
    }
    else{
      for(int x = lastNum; x > count; --x){
          led.setColorAt(x,0,0,0);
          led.show();
          delay(inSpeed);
      }
    }
    lastNum = count; 
}
