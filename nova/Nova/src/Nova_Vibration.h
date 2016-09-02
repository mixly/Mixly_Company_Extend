#ifndef _NOVA_VIBRATION_H_
#define _NOVA_VIBRATION_H_
#include "Arduino.h"
#include "Nova.h"

class Vibration
{
public:
	Vibration(uint8_t port);
	bool state(void);
private:
	uint8_t _Vibration_pin;
};

#endif