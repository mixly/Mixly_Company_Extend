/**************************************************************************
  Copyright (C), 2014- ,  申议科技
  File name:      Timer2.cpp
  Author: jiangzhaohui      Version: v1.0      Date: 2014.10.8
  Description: 定时器2
		定时器2被设计成专门用来产生马达PWM波，不能再用作其它用途。
  Others:         
  Function List:  
    1. void timer2Init(void)：timer2初始化
	2. ISR(TIMER2_OVF_vect)：timer2中断服务子程
  History:  
                  
    1. Date: 2014.10.8       Author:
       Modification: 代码创建
    2. ...
****************************************************************************/
#include "Arduino.h"
#include "Timer2.h"
#include "wiring_private.h"

byte direction1, direction2;
int motor1Speed, motor2Speed;
byte cnt1, cnt2;
/***************************************************************************
  Function:       void timer2Init(void)
  Description:    在Arduino的核心代码wring.c中，已对定时器2做了以下初始化：
				 1、sbi(TCCR2B, CS22); //CS22 =1 CS21 =0 CS20 =0 64分频，选择分频意味着启动了定时器
				    计数器未设初始值，8位计数器计数最大值为256，因此定时器的溢出中断时间间隔= 
					1/16000000/256/64 = 1.024ms
				 2、sbi(TCCR2A, WGM20); //WGM22 =0 WGM21 =0 WGM20=1 相位修正模式
					在这里，我们只需设置timer2的中断即可，需要PWM输出时，调用wring.c中的analogWrite()，
					此函数内部会完成PMW设置。
				本应用中，重新对定时器作初始化，这样保证arduino的代码不被修改。
  Calls:          
  Called By:      systemInit()
  Input:          
                 
  Output:         
  Return:         
  Others:        
***************************************************************************/
void timer2Init(void)
{
	/*motor1Speed = 0;
	motor2Speed = 0;
	cnt1 = 0;
	cnt2 = 0;
	
	pinMode(4, OUTPUT);   //初始化马达1、2各引脚
	pinMode(5, OUTPUT);
	pinMode(6, OUTPUT);
	pinMode(7, OUTPUT);
	
	digitalWrite(4, LOW);
	digitalWrite(5, LOW);
	digitalWrite(6, LOW);
	digitalWrite(7, LOW);
	
	//TCNT2 = 200;
	//把分频器设置为不分频，因此中断频率变为：16000000/256 = 62500，PWM频率为：62500/256 = 244.140625HZ
	#if defined(TCCR2) && defined(CS22) 
	cbi(TCCR2, CS22);
	sbi(TCCR2, CS20);
	#elif defined(TCCR2B) && defined(CS22)
	cbi(TCCR2B, CS22);	
	sbi(TCCR2B, CS20);
	#else
	#warning Timer 2 not finished (may not be present on this CPU)
	#endif
	//sbi(GTCCR, PSRASY);
	// configure timer 2 for phase correct pwm (8-bit)
	#if defined(TCCR2) && defined(WGM20)
	cbi(TCCR2, WGM20);
	#elif defined(TCCR2A) && defined(WGM20)
	cbi(TCCR2A, WGM20); //WGM22 =0 WGM21 =0 WGM20=1 相位修正模式
	#else
	#warning Timer 2 not finished (may not be present on this CPU)
	#endif 
	
	TIMSK2 = 1<<TOIE2; //timer2 Overflow Interrupt */
}

/***************************************************************************
  Function:       ISR(TIMER2_OVF_vect) 
  Description:    
  Calls:          
  Called By:      中断入口调用
  Input:          
                 
  Output:         
  Return: 
  Others: 
***************************************************************************/
ISR(TIMER2_OVF_vect) //timer1 overflow interrupt vector handler
{ /*
	DDRD |= (1 << DDD4); //设置引脚为输出
	DDRD |= (1 << DDD5);
	DDRD |= (1 << DDD6);
	DDRD |= (1 << DDD7);
	
	if(direction1 == 1){
		PORTD |= (1 << PORTD5);       //digitalWrite(5, HIGH);
		if((motor1Speed-cnt1)>=0){
			PORTD &= ~(1 << PORTD6);   //digitalWrite(6, LOW);
		}
		else{
			PORTD |= (1 << PORTD6);   //digitalWrite(6, HIGH);
		}
	}
	else if(direction1 == 2){
		PORTD |= (1 << PORTD6);       //digitalWrite(6, HIGH);
		if((motor1Speed-cnt1)>=0){
			PORTD &= ~(1 << PORTD5);  //digitalWrite(5, LOW);
		}
		else{
			PORTD |= (1 << PORTD5);    //digitalWrite(5, HIGH);
		}	
	}
	else{
		PORTD &= ~(1 << PORTD5);//digitalWrite(5, LOW); //马达停止 
		PORTD &= ~(1 << PORTD6);  //digitalWrite(6, LOW);
	}
	
	if(direction2 == 1){
		PORTD |= (1 << PORTD4);       //digitalWrite(5, HIGH);
		if((motor2Speed-cnt2)>=0){
			PORTD &= ~(1 << PORTD7);   //digitalWrite(6, LOW);
		}
		else{
			PORTD |= (1 << PORTD7);   //digitalWrite(6, HIGH);
		}
	}
	else if(direction2 == 2){
		PORTD |= (1 << PORTD7);       //digitalWrite(6, HIGH);
		if((motor2Speed-cnt2)>=0){
			PORTD &= ~(1 << PORTD4);  //digitalWrite(5, LOW);
		}
		else{
			PORTD |= (1 << PORTD4);    //digitalWrite(5, HIGH);
		}	
	}
	else{
		PORTD &= ~(1 << PORTD4);//digitalWrite(5, LOW); //马达停止 
		PORTD &= ~(1 << PORTD7);  //digitalWrite(6, LOW);
	}
	
	cnt1++;
	cnt2++;
	if(cnt1 == 255)
		cnt1 = 0;	
	if(cnt2 == 255)
		cnt2 = 0;
	//TCNT2 = 200;
	//Serial.println(10);  */
}