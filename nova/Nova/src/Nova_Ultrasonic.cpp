#include "Nova_Ultrasonic.h"

Ultrasonic::Ultrasonic(uint8_t pin)
{
	_Ultrasonic_pin = pin;
}

int Ultrasonic::distance(void)
{
	float   n = analogRead(_Ultrasonic_pin);    //读取A0口的电压值
 
 	float vol = ((n/1024))*200+1; 
    
 	return (int)vol;
}