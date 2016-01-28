/**************************************************************************
  Copyright (C), 2014- ,  申议实业
  File name:      PullPotTest.ino
  Author: jiangzhaohui      Version: v1.0      Date: 2014.12.26
  Description: 直滑电位器测试
           拔动直滑电位器，使三色灯变色
  Others:         
  Function List:  
  History:  
                  
    1. Date: 2014.12.26       Author:
       Modification: 代码创建
    2. ...
****************************************************************************/
#include "Config.h"

int potVal;     //变量,用来保存拔动电位器采样值
int myLightVal;   //变量,用保存电位器采样值转化为亮度值

void setup()
{
 //以下把三色LED灯的各控制引脚设置为输出模式
  pinMode(PIN_LED_R, OUTPUT);
  pinMode(PIN_LED_G, OUTPUT);
  pinMode(PIN_LED_B, OUTPUT);
  
  //关闭三色色灯
  digitalWrite(PIN_LED_R, LOW); 
  digitalWrite(PIN_LED_G, LOW);
  digitalWrite(PIN_LED_B, LOW);
}

void loop()
{
   potVal = analogRead(PIN_POT);   //采样拔动电位器的采样值
   potVal > 512? 512 : potVal;    //把采样值约束在0-512范围
   myLightVal = potVal;             //电位器采样值转为亮度值
 //  lightVal = map(potVal, 0, 512, 0, 255);
   if(myLightVal < 255)
   {
       analogWrite(PIN_LED_R, myLightVal);       //红灯由暗变亮
       analogWrite(PIN_LED_G, 255-myLightVal);   //绿灯由亮变暗
   }
   else
   {
	   analogWrite(PIN_LED_R, 512-myLightVal);   //红灯由亮变暗
	   analogWrite(PIN_LED_B, myLightVal-255);   //蓝灯由暗变亮
   }
}
