/**************************************************************************
  Copyright (C), 2014- ,  申议科技
  File name:      LightResistance.cpp
  Author: jiangzhaohui      Version: v1.0      Date: 2014.10.8
  Description: 光照度测量
          
  History:  
                  
    1. Date: 2014.10.8       Author:
       Modification: 代码创建
    2. ...
****************************************************************************/
#include "Config.h"

long lightVal(int arduinoPin)
{
    unsigned char i;
	int val;
	int sampleVal[5];
	float LighVal;
	
	for(i =0; i < 5; i++){ //作5次采样，取中间值
       sampleVal[i] = analogRead(arduinoPin);
	}
	BubbleShort(sampleVal, 5);
	val = sampleVal[2];
	
	val = map(val,0,512,100,0);
	val = val<0? 0: val;
    //在这里把采样值转成光照度值
	return (long)(val);  
} 