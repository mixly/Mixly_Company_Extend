/**************************************************************************
  Copyright (C), 2014- ,  申议科技
  File name:      MorteTB661fgn.h
  Author: jiangzhaohui      Version: v1.0      Date: 2014.10.8
  Description: MakeBlock的马达驱动
         1.注意：数字输出引脚使用前应该调用：pinMode(pin, OUTPUT);
		 2.调试的过程中，如果把马达更新的函数boardMega328p.updateMotors()放在主循环20ms时间间隔中正转和停止有问题，原因未知，只好放在实时更新中。
		 3、停止动作实际上是PWM引脚输出0占空比，所以收到停止命令PWM引脚必须置0
		 4、把下面的调试代码放入主循环中，可进行调试。
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

MBMotor::MBMotor()
{

}
		
void MBMotor::MotorDriver(uint8_t pin1, uint8_t pin2, long pwmVal)
{	
	int val;
	pinMode(pin1, OUTPUT);
	pinMode(pin2, OUTPUT);
	if(pwmVal < 0){
		digitalWrite(pin1, HIGH);
		val = abs(pwmVal);
		analogWrite(pin2, val);
	}	
	else if(pwmVal > 0){
		digitalWrite(pin1, LOW);
		val = pwmVal;
		analogWrite(pin2,val);
	}
	else{
		pinMode(pin1, OUTPUT);
		pinMode(pin2, OUTPUT);
		digitalWrite(pin1,LOW);
		digitalWrite(pin2,LOW);
	}
}
/*
void MBMotor::MotorSpeed(int pwmPin, int speed)
{
	analogWrite(pwmPin,speed);
}
*/
/*MBMotor::MotorOff(int pwmPin)
{
	analogWrite(pwmPin,0);
}*/

