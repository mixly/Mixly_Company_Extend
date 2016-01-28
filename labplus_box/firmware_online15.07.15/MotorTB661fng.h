/**************************************************************************
  Copyright (C), 2014- ,  申议科技
  File name:      MotorTB661fng.h
  Author: jiangzhaohui      Version: v1.0      Date: 2014.10.8
  Description: MakeBlock的马达驱动
  Others:         
  Function List:  
    1. 
	2. 
  History:  
                  
    1. Date: 2014.10.8       Author:
       Modification: 代码创建
    2. ...
****************************************************************************/
#ifndef MotorTB661fng_h
#define MotorTB661fng_h

#include <Arduino.h>

class MBMotor
{
	public:
		MBMotor();
		void MotorDriver(uint8_t pin1, uint8_t pin2, long pwmVal);
		//void MotorSpeed(int pwmPin, int speed);
		//MotorOff(int pwmPin);
	
	private:
	
};

#endif