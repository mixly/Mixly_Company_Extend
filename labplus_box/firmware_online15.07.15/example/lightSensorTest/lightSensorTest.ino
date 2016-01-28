/**************************************************************************
  Copyright (C), 2014- ,  申议实业
  File name:      lightSensorTest.ino
  Author: jiangzhaohui      Version: v1.0      Date: 2014.12.26
  Description: 在LCD上显示光敏电阻采样值
  Others:         
  Function List:  
  History:  
                  
    1. Date: 2014.12.26       Author:
       Modification: 代码创建
    2. ...
****************************************************************************/
#include "Config.h"

void setup()
{
	Serial.begin(9600);
}

void loop()
{
  Serial.println(lightVal(PIN_LIGHT));
  delay(1000); //延时1000ms
}


