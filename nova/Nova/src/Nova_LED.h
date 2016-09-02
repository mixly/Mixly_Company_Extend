#ifndef _NOVA_LED_H_
#define _NOVA_LED_H_
#include "Arduino.h"
#include "Nova.h"
class LED
{
public:
	LED(uint8_t port);
	void on(void);
	void off(void);
    
    // 0~100
    void brightness(uint8_t brightness);
private:
	uint8_t _led_pin;
};
#endif