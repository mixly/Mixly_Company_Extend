/**************************************************************************
  Copyright (C), 2014- ,  申议实业
  File name:      Motor.ino
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
MBMotor MOT;
void setup() {
  // put your setup code here, to run once:
  pinMode(PIN_MOTOR_DIR, OUTPUT);
  MOT.MotorDriver(PIN_MOTOR_DIR, PIN_MOTOR_PWM, 255);
}

void loop() {
  // put your main code here, to run repeatedly:
	
}
