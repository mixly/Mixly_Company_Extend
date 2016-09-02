#ifndef _NOVA_DUAL_MOTOR_H_
#define _NOVA_DUAL_MOTOR_H_
#include "Arduino.h"
#include "Nova.h"

class Dual_Motor
{
public:
	Dual_Motor(uint8_t port);
	void run(int speed);
	void stop(void);
private:
	uint8_t _DIR_pin,_PWM_pin;
};
#endif