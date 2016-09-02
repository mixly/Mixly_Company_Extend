#ifndef _NOVA_ULTRASONIC_H_
#define _NOVA_ULTRASONIC_H_
#include "Arduino.h"

class Ultrasonic
{
public:
	Ultrasonic(uint8_t pin);
	int distance(void);
private:
	uint8_t _Ultrasonic_pin;
};

#endif