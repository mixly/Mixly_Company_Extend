/*************************************************************************
 * File Name          : BaseBoardBuzzerTest.ino
 * Author             : Xiaoyu
 * Updated            : Xiaoyu
 * Version            : V1.0.0
 * Date               : 2/7/2014
 * Description        : Example for Makeblock Electronic modules of 
 * Me - Base Board.
 * License            : CC-BY-SA 3.0
 * Copyright (C) 2013 Maker Works Technology Co., Ltd. All right reserved.
 * http://www.makeblock.cc/
 **************************************************************************/

#include <Makeblock.h>
#include <SoftwareSerial.h>
#include <Wire.h>

void setup() 
{
}

void loop()
{
  buzzerOn();
  delay(1000);
  buzzerOff();
  delay(1000);
}

