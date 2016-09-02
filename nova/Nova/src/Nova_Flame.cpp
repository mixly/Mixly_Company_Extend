#include "Nova_Flame.h"

Flame::Flame(uint8_t pin)
{
	_flame_pin = pin;
}

int Flame::read(void)
{
	return analogRead(_flame_pin);
}

