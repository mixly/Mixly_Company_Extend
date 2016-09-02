#include "Nova_Potentiometer.h"

Potentiometer::Potentiometer(uint8_t pin)
{
	_Potentiometer_pin = pin;
}

int Potentiometer::read(void)
{
	return analogRead(_Potentiometer_pin);
}

