#ifndef _NOVA_LIMIT_SWITCH_H_
#define _NOVA_LIMIT_SWITCH_H_
#include "Arduino.h"
#include "Nova.h"

class LimitSwitch
{
public:
	LimitSwitch(uint8_t port);
	bool state(void);
private:
	uint8_t _limit_pin;
};
#endif