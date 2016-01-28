/**************************************************************************
  Copyright (C), 2014- ,  申议实业
  File name:      Ultrasoni.ino
  Author: jiangzhaohui      Version: v1.0      Date: 2015.03.11
  Description:
  Others:         
  Function List:  
    1. 
    2. 
  History:  
                  
    1. Date: 2015.03.11       Author:
       Modification: 代码创建
    2. ...
****************************************************************************/
#include "Config.h"

void setup() {
  // put your setup code here, to run once:
	Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
 Serial.println(distanceCm(PIN_TRIG, PIN_ECHO));
 delay(500);	
}
