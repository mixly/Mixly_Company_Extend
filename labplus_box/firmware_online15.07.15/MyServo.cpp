/**************************************************************************
  Copyright (C), 2014- ,  
  File name:      Servo.cpp
  Author: jiangzhaohui      Version: v1.0      Date: 2014.10.8
  Description:
  Others:         
  Function List:  
    1. 
	2. 
  History:  
                  
    1. Date: 2014.10.8       Author:
       Modification: 
    2. ...
****************************************************************************/
#include "Config.h"

/***************************************************************************
  Function:       servopulse(int auduinoPin, int angel) 
  Description:
  Calls:          
  Called By:      
  Input:     
  Output:         
  Return: 
  Others: 
***************************************************************************/
void servopulse(int arduinoPin, int angel)
{
  uint8_t i;
  int plus;
 // if(angel < 0)
 //	angel = 0;
 // if(angel > 180)
 //	angel = 180;
 //Serial.write(arduinoPin);
 //Serial.write(angel);
  pinMode(arduinoPin, OUTPUT);
  plus = map(angel,0,180,345, 1800); //1714);
    // plus = map(angel,0,180,345, 1650); //1714);
  // plus = map(angel,0,180,385, 2480); //1714);
  for(i=0; i<25; i++){ 	
	digitalWrite(arduinoPin,HIGH);
//	Serial.write(plus);
	delayMicroseconds(plus);
	digitalWrite(arduinoPin,LOW);
	delay(20-plus/1000);    
  }
}