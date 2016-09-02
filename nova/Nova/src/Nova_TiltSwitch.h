#ifndef _NOVA_TILT_SWITCH_H_
#define _NOVA_TILT_SWITCH_H_
#include "Arduino.h"
#include "Nova.h"

class TiltSwitch
{
public:
	TiltSwitch(uint8_t port);
	bool state(void);
private:
	uint8_t _tilt_pin;
};

#endif