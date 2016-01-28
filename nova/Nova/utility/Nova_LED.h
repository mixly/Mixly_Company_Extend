#ifndef _NOVA_LED_H_
#define _NOVA_LED_H_
#include "Arduino.h"
#include "Nova.h"
class LED
{
public:
	LED(uint8_t port);
	void On(void);
	void Off(void);
private:
	uint8_t _led_pin;
};
#endif