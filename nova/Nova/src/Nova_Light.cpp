#include "Nova_Light.h"

Light::Light(uint8_t pin)
{
	_light_pin = pin;
}

int Light::read(void)
{
	return analogRead(_light_pin);
}

