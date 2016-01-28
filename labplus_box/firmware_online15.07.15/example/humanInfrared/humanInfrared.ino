/**************************************************************************
  Copyright (C), 2014- ,  申议实业
  File name:      humanInfrared.ino
  Version: v1.0      Date: 2014.10.8
  Description: 人体红外测试				 
  Others:         
  History:  
                  
    1. Date: 2014.10.8       Author:
       Modification: 代码创建
    2. ...
****************************************************************************/
#include "Config.h"

void setup() {
  // put your setup code here, to run once:
 pinMode(PIN_HUMAN_INFRARED, INPUT);
 Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
    Serial.println(digitalRead(PIN_HUMAN_INFRARED));
	delay(500);
}
