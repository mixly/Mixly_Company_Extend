#ifndef _NOVA_LIGHT_H_
#define _NOVA_LIGHT_H_

#include "Arduino.h"

class Light
{
public:
	Light(uint8_t pin);
	int read(void);
private:
	uint8_t _light_pin;
};


#endif