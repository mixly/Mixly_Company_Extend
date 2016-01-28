/*************************************************************************
* File Name          : ColorLoop.ino
* Author             : Evan
* Updated            : Ander
* Version            : V1.0.2
* Date               : 27/03/2014
* Description        : Test for Makeblock Electronic modules of  MeRGBLed and
                       LedStrip.  
* License            : CC-BY-SA 3.0
* Copyright (C) 2013 Maker Works Technology Co., Ltd. All right reserved.
* http://www.makeblock.cc/
**************************************************************************/
#include "Makeblock.h"
#include <SoftwareSerial.h>
#include <Wire.h>

MeRGBLed led(PORT_3);
int ledCount = 15;
float j,f,k;
void setup()
{
  led.setNumber(ledCount);
}
void loop(){
  color_loop();
}
void color_loop()
{  
  for (uint8_t t = 0; t < ledCount; t++)
  {
    uint8_t red =   64*(1+sin(t/2.0 + j/4.0       ));
    uint8_t green = 64*(1+sin(t/1.0 + f/9.0  + 2.1));
    uint8_t blue =  64*(1+sin(t/3.0 + k/14.0 + 4.2));
    led.setColorAt(t, red,green,blue);
  }
  led.show();
  j+=random(1,6)/6.0;
  f+=random(1,6)/6.0;
  k+=random(1,6)/6.0;
}
