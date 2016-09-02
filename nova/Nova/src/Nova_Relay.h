#ifndef _NOVA_RELAY_H_
#define _NOVA_RELAY_H_
#include "Arduino.h"
#include "Nova.h"
class Relay
{
public:
	Relay(uint8_t port);
	void on(void);
	void off(void);
private:
	uint8_t _relay_pin;
};
#endif