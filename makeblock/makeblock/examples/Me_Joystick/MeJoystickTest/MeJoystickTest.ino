/*************************************************************************
 * File Name          : MeJoystickTest.ino
 * Author             : Xiaoyu
 * Updated            : Xiaoyu
 * Version            : V1.0.0
 * Date               : 2/7/2014
 * Description        : Example for Makeblock Electronic modules of 
 * Me-Joystick. The module can only be connected to the PORT_6 of Me - Base Shield,
 * and the PORT_3,PORT_6,PORT_7,PORT_8 of Me - Base Board
 * License            : CC-BY-SA 3.0
 * Copyright (C) 2013 Maker Works Technology Co., Ltd. All right reserved.
 * http://www.makeblock.cc/
 **************************************************************************/

#include <Makeblock.h>
#include <SoftwareSerial.h>
#include <Wire.h>


MeJoystick joystick(PORT_6);

int x = 0;      // a variable for the Joystick's x value
int y = 0;      // a variable for the Joystick's y value

void setup() 
{
  // initialize serial communications at 9600 bps
  Serial.begin(9600);
}

void loop()
{
  // read the both joystick axis values:
  x = joystick.readX();  
  y = joystick.readY(); 

  // print the results to the serial monitor:
  Serial.print("Joystick X = " );                       
  Serial.print(x);   
  Serial.print("\t Joystick Y = " );                       
  Serial.println(y);     
  // wait 10 milliseconds before the next loop
  delay(10);  
}

