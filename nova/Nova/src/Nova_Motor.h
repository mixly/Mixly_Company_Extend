#ifndef _NOVA_MOTOR_H_
#define _NOVA_MOTOR_H_
#include "Arduino.h"
#include "Nova.h"

class Motor
{
public:
	Motor(uint8_t port);
	void run(int speed);
	void stop(void);
private:
	uint8_t _A_pin,_B_pin;
};
#endif