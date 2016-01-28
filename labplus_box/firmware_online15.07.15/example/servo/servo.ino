/**************************************************************************
  Copyright (C), 2014- ,  申议实业
  File name:      serve.ino
  Author: jiangzhaohui      Version: v1.0      Date: 2014.10.8
  Description: 舵机
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

}

void loop(void){
	servopulse(PIN_SERVO,  180);
	delay(500);
	servopulse(PIN_SERVO, 0);
	delay(500);
}

