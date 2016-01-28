/**************************************************************************
  Copyright (C), 2014- ,  申议实业
  File name:      MICval.ino
  Author: jiangzhaohui      Version: v1.0      Date: 2014.12.26
  Description: 串口打印声音采样值
  Others:         
  Function List:  
  History:  
                  
    1. Date: 2014.12.26       Author:
       Modification: 代码创建
    2. ...
****************************************************************************/
#include "Config.h"

int micVal;  //变量,用来保存声音采样值

void setup()
{
  Serial.begin(9600);  //串口初始化,波特率为9600
}

void loop()
{
  micVal = loudness(PIN_SOUND);    //获得声音传感器的采样值
  Serial.println(micVal);  //在串口上打印采样值
  delay(200); //采样时间间隔设为1000ms
}


