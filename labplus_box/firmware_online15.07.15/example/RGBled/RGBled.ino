/**************************************************************************
  Copyright (C), 2014- ,  申议实业
  File name:      RGBled.ino
  Author: jiangzhaohui      Version: v1.0      Date: 2014.10.8
  Description: RGBLED测试
  Others:         
  Function List:  
    1. 
	2. 
  History:  
                  
    1. Date: 2014.10.8       Author:
       Modification: 代码创建
    2. ...
****************************************************************************/
#include "Config.h"

void setup(void)
{
	pinMode(PIN_LED_R, OUTPUT);
	pinMode(PIN_LED_G, OUTPUT);
    pinMode(PIN_LED_B, OUTPUT);
}

void loop(void){
	digitalWrite(PIN_LED_R, HIGH);
	delay(500);
	digitalWrite(PIN_LED_R, LOW);
	delay(500);
	
	digitalWrite(PIN_LED_G, HIGH);
	delay(500);
	digitalWrite(PIN_LED_G, LOW);
	delay(500);

	digitalWrite(PIN_LED_B, HIGH);
	delay(500);
	digitalWrite(PIN_LED_B, LOW);
	delay(500);
}
