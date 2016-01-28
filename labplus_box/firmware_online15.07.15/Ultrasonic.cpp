/**************************************************************************
  Copyright (C), 2014- ,  申议科技
  File name:      Ultrasonic.cpp
  Author: jiangzhaohui      Version: v1.0      Date: 2014.10.8
  Description: 超声波测距传感器
			   
  Others:         
  Function List:  
    1. distanceCm(int pin1, int pin2): 距离测量，单位：CM
	2. distanceInch(int pin1, int pin2):距离测量，单位：英寸
	3. measure(int pin1, int pin2)：测量
  History:  
                  
    1. Date: 2014.10.8       Author:
       Modification: 代码创建
    2. ...
****************************************************************************/
#include "Config.h"

long distanceCm(int pin1, int pin2)
{
    long distance = measure(pin1, pin2);
    return ((distance / 29)>> 1);
}

long distanceInch(int pin1, int pin2)
{
    long distance = measure(pin1, pin2);
    return ((distance / 74)>> 1);
}

long measure(int pin1, int pin2)
{
    long duration;
	pinMode(pin1, OUTPUT);
    digitalWrite(pin1,LOW);
    delayMicroseconds(2);
    digitalWrite(pin1,HIGH);	
    delayMicroseconds(10);
    digitalWrite(pin1,LOW);
    pinMode(pin2, INPUT);
//	noInterrupts();
    duration = pulseIn(pin2, HIGH,30000); //必须作超进设置，否则端口没接设备时会进入死循环
//	interrupts();
    return duration;
}