#ifndef _NOVA_HALL_H_
#define _NOVA_HALL_H_
#include "Arduino.h"
#include "Nova.h"

class Hall
{
public:
	Hall(uint8_t port);
	bool state(void);
private:
	uint8_t _Hall_pin;
};

#endif