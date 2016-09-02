#include "Nova_MQ.h"

MQ::MQ(uint8_t pin)
{
	_MQ_pin = pin;
}

int MQ::read(void)
{
	return analogRead(_MQ_pin);
}

