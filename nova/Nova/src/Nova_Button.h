#ifndef _NOVA_BUTTON_H_
#define _NOVA_BUTTON_H_
#include "Arduino.h"
#include "Nova.h"

class Button
{
public:
	Button(uint8_t port);
	bool state(void);
private:
	uint8_t _button_pin;
};

#endif
