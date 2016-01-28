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
void setup()
{
   Serial.begin(9600);
}

void loop()
{
   potVal = analogRead(PIN_POT);   //采样拔动电位器的采样值
   Serial.println(potVal);
  delay(500);
}
