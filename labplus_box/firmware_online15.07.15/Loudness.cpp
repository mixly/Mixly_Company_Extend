/**************************************************************************
  Copyright (C), 2014- ,  申议科技
  File name:      Loudness.cpp
  Author: jiangzhaohui      Version: v1.0      Date: 2014.10.8
  Description: 声响度测量

  History:  
                  
    1. Date: 2014.10.8       Author:
       Modification: 代码创建
    2. ...
****************************************************************************/
#include "Config.h"

long loudness(int arduinoPin)
{
    unsigned char i;
	int val;
	int sampleVal[20];
	
	for(i =0; i < 20; i++){ //作5次采样，取中间值
       sampleVal[i] = analogRead(arduinoPin);
	}
	BubbleShort(sampleVal, 20);
	for(i=0; i<5; i++)
		val = sampleVal[i+15];
    val = (int)(val/5)*3;
    //在这里把采样值转换成声响度值
	return (long)(val); 
} 