#ifndef _NOVA_ITR_H_
#define _NOVA_ITR_H_
#include "Arduino.h"
#include "Nova.h"

class ITR
{
public:
	ITR(uint8_t port);
	bool state(void);
private:
	uint8_t _ITR_pin;
};

#endif