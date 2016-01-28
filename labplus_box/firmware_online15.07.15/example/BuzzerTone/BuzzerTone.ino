/**************************************************************************
  Copyright (C), 2014- ,  申议实业
  File name:      BuzzerTone.ino
  Author: jiangzhaohui      Version: v1.0      Date: 2014.12.26
  Description: 蜂鸣器播放音调
      利用蜂鸣器播放：1(do) 2(rui) 3(mi) 4(fa)  5(shuo)  6(la)  7(xi)
  Others:         
  Function List:  
  History:  
                  
    1. Date: 2014.12.26       Author:
       Modification: 代码创建
    2. ...
****************************************************************************/
#include "Config.h"

/* 定义音调数组，do=261HZ re=293HZ mi=329HZ fa=349HZ so=392HZ
   la=440HZ xi=494HZ*/
//const static uint16_t toneVal[7] = {261, 293, 329, 349, 392, 440, 494};
//const static uint16_t toneVal[7] = {3831, 3413, 3040, 2865, 9861, 2273, 2024};
const static uint16_t toneVal[7] = {1915, 1706, 1520, 1433, 1276, 1136, 1012};  //本数组保存各音调频率
unsigned long timeCnt;

void setup()
{
  pinMode(PIN_BUZZER, OUTPUT);
  digitalWrite(PIN_BUZZER, 1);
  delay(5000);
  digitalWrite(PIN_BUZZER, 0);
}

void loop(){

}
/* void loop()
{ 
     for(int k=0; k<7;k++)    //总共6个按键 
     {
		timeCnt = millis();
	    while((millis()-timeCnt)<300)   //按键按下后,一个音调播放300毫秒
	    {
           digitalWrite(PIN_BUZZER, 1);          //开蜂鸣器
           delayMicroseconds(toneVal[k]);    //延时对应音调需要的时间
	       digitalWrite(PIN_BUZZER, 0);          //关蜂鸣器
           delayMicroseconds(toneVal[k]);    //延时对应音调需要的时间
	    } 
    }
 }*/
