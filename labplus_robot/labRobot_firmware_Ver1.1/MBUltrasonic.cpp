/**************************************************************************
  Copyright (C), 2014- ,  
  File name:      Ultrasonic.cpp
  Author: jiangzhaohui      Version: v1.0      Date: 2014.10.8
  Description: 
			   
  Others:         
  Function List:  
    1. distanceCm(int pin1, int pin2): 
	2. distanceInch(int pin1, int pin2):
	3. measure(int pin1, int pin2)：
  History:  
                  
    1. Date: 2014.10.8       Author:
       Modification: 
    2. ...
****************************************************************************/

#include "Arduino.h"
#include <avr/interrupt.h>   //中断函数头文件
#include <avr/io.h>
#include "MBUltrasonic.h"
int distanceCm(int pin1)
{
    int distance = measure(pin1);
    return ((distance / 58));
}

int distanceInch(int pin1)
{
    int distance = measure(pin1);
    return ((distance / 148));
}

int measure(int pin1)
{
    long duration;
	pinMode(pin1, OUTPUT);
    digitalWrite(pin1,LOW);
    delayMicroseconds(2);
    digitalWrite(pin1,HIGH);	
    delayMicroseconds(10);
    digitalWrite(pin1,LOW);
    pinMode(pin1, INPUT);
    duration = pulseIn(pin1, HIGH,30000); 
    return duration;
}