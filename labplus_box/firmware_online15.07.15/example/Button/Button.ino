/**************************************************************************
  Copyright (C), 2014- ,  申议实业
  File name:      Button.ino
  Author: jiangzhaohui      Version: v1.0      Date: 2014.10.8
  Description: 
	 按键测试
  History:  
                  
    1. Date: 2014.10.8       Author:
       Modification: 代码创建
    2. ...
****************************************************************************/

#include "Config.h"

void setup()
{
	//key init
	pinMode(PIN_BT_UP, INPUT);
	pinMode(PIN_BT_DOWN, INPUT);
	pinMode(PIN_BT_LEFT, INPUT);
	pinMode(PIN_BT_RIGHT, INPUT);
	pinMode(PIN_BT_MID , INPUT);
	
	pinMode(PIN_NORTH_LED_R, OUTPUT);
	pinMode(PIN_NORTH_LED_Y, OUTPUT);
	pinMode(PIN_NORTH_LED_G, OUTPUT);
	pinMode(PIN_SOUTH_LED_R, OUTPUT);
	pinMode(PIN_SOUTH_LED_Y, OUTPUT);
	
	digitalWrite(PIN_NORTH_LED_R, LOW);
	digitalWrite(PIN_NORTH_LED_Y, LOW);
	digitalWrite(PIN_NORTH_LED_G, LOW);
	digitalWrite(PIN_SOUTH_LED_R, LOW);
	digitalWrite(PIN_SOUTH_LED_Y, LOW);
}
 
void loop() {
	if(!digitalRead(PIN_BT_UP))
		digitalWrite(PIN_NORTH_LED_R, HIGH);
	if(!digitalRead(PIN_BT_DOWN))
		digitalWrite(PIN_NORTH_LED_Y, HIGH);
	if(!digitalRead(PIN_BT_LEFT))
		digitalWrite(PIN_NORTH_LED_G, HIGH);
	if(!digitalRead(PIN_BT_RIGHT))
		digitalWrite(PIN_SOUTH_LED_R, HIGH);
	if(!digitalRead(PIN_BT_MID))
		digitalWrite(PIN_SOUTH_LED_Y, HIGH);
   delay(100);
   digitalWrite(PIN_NORTH_LED_R, LOW);
   digitalWrite(PIN_NORTH_LED_Y, LOW);
   digitalWrite(PIN_NORTH_LED_G, LOW);
   digitalWrite(PIN_SOUTH_LED_R, LOW);
   digitalWrite(PIN_SOUTH_LED_Y, LOW);
}

