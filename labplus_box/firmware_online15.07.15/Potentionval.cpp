/**************************************************************************
  Copyright (C), 2014- ,  申议科技
  File name:      Potentionval.cpp
  Author: jiangzhaohui      Version: v1.0      Date: 2014.10.8
  Description: 电位器电阻值测量,单位：欧姆
               10K电位器，用于其它阻值需修改参数
  History:  
                  
    1. Date: 2014.10.8       Author:
       Modification: 代码创建
    2. ...
****************************************************************************/
#include "Config.h"

long potentionVal(int arduinoPin)
{
    unsigned char i;
	int val;
	int sampleVal[5];
	float Rx;
	
	for(i =0; i < 5; i++){ //作5次采样，取中间值
       sampleVal[i] = analogRead(arduinoPin);
	}
	BubbleShort(sampleVal, 5);
	val = sampleVal[2];

    Rx = ((float)val/(1024-(float)val))*10000;  
	return (long)(Rx);  
} 