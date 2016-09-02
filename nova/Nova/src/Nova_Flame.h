#ifndef _NOVA_FLAME_H_
#define _NOVA_FLAME_H_
#include "Arduino.h"
#include "Nova.h"

class Flame
{
public:
	Flame(uint8_t port);
	int read(void);
private:
	uint8_t _flame_pin;
};
#endif