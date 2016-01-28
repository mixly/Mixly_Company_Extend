/*************************************************************************
 * File Name          : Me4ButtonTest.ino
 * Author             : Xiaoyu
 * Updated            : Xiaoyu
 * Version            : V1.0.0
 * Date               : 2/7/2014
 * Description        : Example for Makeblock Electronic modules of 
 * Me-4ButtonTest. The module can only be connected to the PORT_6, PORT_7,
 * PORT_8 of Me - Base Shield,and the PORT_3,PORT_6,PORT_7,PORT_8 of Me - Base Board
 * License            : CC-BY-SA 3.0
 * Copyright (C) 2013 Maker Works Technology Co., Ltd. All right reserved.
 * http://www.makeblock.cc/
 **************************************************************************/

#include <Makeblock.h>
#include <SoftwareSerial.h>
#include <Wire.h>



Me4Button btn(PORT_8); //Me4Button module can only be connected to the PORT_6, PORT_7, PORT_8 of base shield.


void setup()
{
  Serial.begin(9600);
}

void loop()
{ 
  switch(btn.pressed())//Check which button pressed
  {
  case KEY1:
    Serial.println("KEY1 pressed");
    break;
  case KEY2:
    Serial.println("KEY2 pressed");
    break;
  case KEY3:
    Serial.println("KEY3 pressed");
    break;
  case KEY4:
    Serial.println("KEY4 pressed");
    break;
  }

  switch(btn.released())//Check which button released
  {
  case KEY1:
    Serial.println("KEY1 released");
    break;
  case KEY2:
    Serial.println("KEY2 released");
    break;
  case KEY3:
    Serial.println("KEY3 released");
    break;
  case KEY4:
    Serial.println("KEY4 released");
    break;
  }
  // wait 10 milliseconds before the next loop
  delay(10);
}


