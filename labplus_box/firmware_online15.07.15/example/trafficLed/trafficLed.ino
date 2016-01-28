/**************************************************************************
  Copyright (C), 2014- ,  申议实业
  File name:      trafficLed.ino
  Author: jiangzhaohui      Version: v1.0      Date: 2014.10.8
  Description: 交通灯测试
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
	pinMode(PIN_NORTH_LED_R, OUTPUT);
	pinMode(PIN_NORTH_LED_Y, OUTPUT);
    pinMode(PIN_NORTH_LED_G, OUTPUT);
	
	pinMode(PIN_SOUTH_LED_R, OUTPUT);
	pinMode(PIN_SOUTH_LED_Y, OUTPUT);
    pinMode( PIN_SOUTH_LED_G, OUTPUT);
	
	pinMode(PIN_WEST_LED_R, OUTPUT);
	pinMode(PIN_WEST_LED_Y, OUTPUT);
    pinMode(PIN_WEST_LED_G, OUTPUT);
	
	pinMode(PIN_EAST_LED_R, OUTPUT);
	pinMode(PIN_EAST_LED_Y, OUTPUT);
    pinMode(PIN_EAST_LED_G, OUTPUT);
}

void loop(void){
	digitalWrite(PIN_NORTH_LED_R, HIGH);
	delay(500);
	digitalWrite(PIN_NORTH_LED_R, LOW);
	delay(500);

	digitalWrite(PIN_NORTH_LED_Y, HIGH);
	delay(500);
	digitalWrite(PIN_NORTH_LED_Y, LOW);
	delay(500);

	digitalWrite(PIN_NORTH_LED_G, HIGH);
	delay(500);
	digitalWrite(PIN_NORTH_LED_G, LOW);
	delay(500);
	digitalWrite(PIN_SOUTH_LED_R, HIGH);
	delay(500);
	digitalWrite(PIN_SOUTH_LED_R, LOW);
	delay(500);
	
	digitalWrite(PIN_SOUTH_LED_Y, HIGH);
	delay(500);
	digitalWrite(PIN_SOUTH_LED_Y, LOW);
	delay(500);

	digitalWrite(PIN_SOUTH_LED_G, HIGH);
	delay(500);
	digitalWrite(PIN_SOUTH_LED_G, LOW);
	delay(500);

	digitalWrite(PIN_WEST_LED_R, HIGH);
	delay(500);
	digitalWrite(PIN_WEST_LED_R, LOW);
	delay(500);

	digitalWrite(PIN_WEST_LED_Y, HIGH);
	delay(500);
	digitalWrite(PIN_WEST_LED_Y, LOW);
	delay(500);

	digitalWrite(PIN_WEST_LED_G, HIGH);
	delay(500);
	digitalWrite(PIN_WEST_LED_G, LOW);
	delay(500);

	digitalWrite(PIN_EAST_LED_R, HIGH);
	delay(500);
	digitalWrite(PIN_EAST_LED_R, LOW);
	delay(500);

	digitalWrite(PIN_EAST_LED_Y, HIGH);
	delay(500);
	digitalWrite(PIN_EAST_LED_Y, LOW);
	delay(500);

	digitalWrite(PIN_EAST_LED_G, HIGH);
	delay(500);
	digitalWrite(PIN_EAST_LED_G, LOW);
	delay(500);
}

