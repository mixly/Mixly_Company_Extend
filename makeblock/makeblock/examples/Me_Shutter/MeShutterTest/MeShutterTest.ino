/*************************************************************************
 * File Name          : MeShutterTest.ino
 * Author             : Xiaoyu
 * Updated            : Xiaoyu
 * Version            : V1.0.0
 * Date               : 2/7/2014
 * Description        : Example for Makeblock Electronic modules of 
 * Me-Shutter. The module can only be connected to the PORT_3,PORT_4,PORT_6 
 * of Me - Base Shield,and the PORT_3,PORT_4,PORT_5,PORT_6,PORT_7,PORT_8 of 
  *Me - Base Board.
 * License            : CC-BY-SA 3.0
 * Copyright (C) 2013 Maker Works Technology Co., Ltd. All right reserved.
 * http://www.makeblock.cc/
 **************************************************************************/
#include <Makeblock.h>
#include <SoftwareSerial.h>
#include <Wire.h>

//MeShutter module can only be connected to the PORT_3, PORT_4, PORT_6 of base shield.
MeShutter myshutter(PORT3);

void setup() 
{
  // initialize serial communications at 9600 bps
  Serial.begin(9600);
}

void loop()
{
  if (Serial.available())
  {
    char a = Serial.read();
    if(a=='s')
    {
      myshutter.focusOn();
      delay(1000);
      myshutter.shotOn();
      delay(200);
      myshutter.shotOff();
      myshutter.focusOff();
    }
    if(a=='f')
    {
      myshutter.focusOn();
      delay(1500);
      myshutter.focusOff();
    }

  }

}

