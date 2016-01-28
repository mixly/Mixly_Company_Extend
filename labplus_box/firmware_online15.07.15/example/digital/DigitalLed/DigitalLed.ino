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

void setup() {
  // put your setup code here, to run once:
	digitalLedTest.set(5);
	digitalLedTest.init(PIN_DIG_LED_CLK, PIN_DIG_LED_DIO);
	digitalLedTest.display(0, 1);
	digitalLedTest.display(1, 2);
	digitalLedTest.display(2, 3);
	digitalLedTest.display(3, 4);
}

void loop() {
  // put your main code here, to run repeatedly:

}
