#ifndef _NOVA_Touch_H_
#define _NOVA_Touch_H_
#include "Arduino.h"
#include "Nova.h"

class Touch
{
public:
	Touch(uint8_t port);
	bool state(void);
private:
	uint8_t _Touch_pin;
};

#endif
