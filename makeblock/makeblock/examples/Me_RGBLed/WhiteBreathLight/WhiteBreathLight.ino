/*************************************************************************
* File Name          : WhiteBreathLight.ino
* Author             : Evan
* Updated            : Ander
* Version            : V0.2.1
* Date               : 27/03/2014
* Description        : Test for Makeblock Electronic modules of MeRGBLed and
                       LedStrip.  
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

int bri = 0, st = 0;
void loop()
{
  if(bri>=100) st=1;
  if(bri<=0) st=0;
  
  if(st)bri--;
  else bri++;
  for(int t=0;t<15;t++){
    led.setColorAt(t, bri, bri, bri); // parameter description: led number, red, green, blue, flash mode
  }
  led.show();
  delay(20);
}
