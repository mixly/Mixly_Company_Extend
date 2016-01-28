/**************************************************************************
  Copyright (C), 2014- ,  申议科技
  File name:      TemperatureNTC.cpp
  Author: jiangzhaohui      Version: v1.0      Date: 2014.10.8
  Description: NTC温度测量

  History:  
                  
    1. Date: 2014.10.8       Author:
       Modification: 代码创建
    2. ...
****************************************************************************/
#include "Config.h"

#define NTC_B		3935
#define NTC_R25		10000
#define NTC_K0		273.15
#define NTC_K25		298.15
#define NTC_KB		NTC_B*NTC_K25

long readTemperatureNTC(int arduinoPin)
{
    unsigned char i;
    float Rt;
	unsigned int val;
	float temperature;
	int sampleVal[5];
	
	for(i =0; i < 5; i++){ //作5次采样，取中间值
       sampleVal[i] = analogRead(arduinoPin);
	}
	BubbleShort(sampleVal, 5);
	val = sampleVal[2];
	
	Rt = ((float)val/(1024-(float)val))*10000;
	//Rt = 10000; //测试，此值下温度为25度
	temperature =(NTC_K0 + 25)*NTC_B/((NTC_K0 + 25)*log(Rt/NTC_R25) + 3935) - NTC_K0;
	return (long)(temperature*10); //放大10倍，保留一位小数
} 