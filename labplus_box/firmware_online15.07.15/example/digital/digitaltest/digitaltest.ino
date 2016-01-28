/**************************************************************************
  Copyright (C), 2014- ,  申议实业
  File name:      DigitalLedTest.ino
  Author:       Version: v1.0      Date: 2014.10.8
  Description: 基于TM1637芯片的数码管测试代码
		1、
		2、
			 
  Others:         
  Function List:  
  History:  
                  
    1. Date: 2014.10.8       Author: jiangzhaohui
       Modification: 代码创建
    2. ...
****************************************************************************/
#include "Config.h"
TM1637 digitalLedTest;
//int num;

void setup() {
  // put your setup code here, to run once:
	digitalLedTest.set(5);
	digitalLedTest.init(PIN_DIG_LED_CLK, PIN_DIG_LED_DIO);
 //       num = 0;
}

void loop() {
  // put your main code here, to run repeatedly:
    for(byte i=0; i<99; i++){
      digitalLedTest.display(0, (byte)(i%10));
      digitalLedTest.display(1, (byte)(i/10));
      delay(1000);
    }
}
