#include "Nova_Dual_Motor.h"
Dual_Motor::Dual_Motor(uint8_t port)
{
	switch(port)
	{
		case M0:
			_DIR_pin = M0_PIN_1;
			_PWM_pin = M0_PIN_0;
		break;
		case M1:
			_DIR_pin = M1_PIN_1;
			_PWM_pin = M1_PIN_0;
		break;
		case M2:
			_DIR_pin = M2_PIN_1;
			_PWM_pin = M2_PIN_0;
		break;
		case M3:
			_DIR_pin = M3_PIN_1;
			_PWM_pin = M3_PIN_0;
		break;
	}
	pinMode(_DIR_pin, OUTPUT);
}
void Dual_Motor::run(int speed)
{
    speed = speed > 100 ? 100 : speed;
    speed = speed < -100 ? -100 : speed;
    
    if (speed == 0)
    {
        digitalWrite(_DIR_pin, LOW);
        analogWrite(_PWM_pin, 0);
    }
	else if(speed > 0)
	{
		digitalWrite(_DIR_pin, LOW);
		analogWrite(_PWM_pin, map(speed, 0, 100, 0, 255));
	}
	else
	{
		digitalWrite(_DIR_pin, HIGH);
		analogWrite(_PWM_pin,  map(-1*speed, 0, 100, 0, 255));
	}
}
void Dual_Motor::stop(void)
{
	digitalWrite(_DIR_pin, LOW);
	analogWrite(_PWM_pin, 0);
}