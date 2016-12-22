#ifndef _NOVA_GLLED_H_
#define _NOVA_GLLED_H_
#include "Arduino.h"
#include "Nova.h"
class GLLED
{
public:
	GLLED(uint8_t port);
    void on(void);
	void off(void);
    // 0~100
    void brightness(uint8_t brightness);
private:
	uint8_t _ctrl_pin;
};
#endif