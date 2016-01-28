#include "Nova_Motor.h"
Motor::Motor(uint8_t port)
{
	switch(port)
	{
		case M0:
			_A_pin = M0_PIN_0;
			_B_pin = M0_PIN_1;
		break;
		case M1:
			_A_pin = M1_PIN_0;
			_B_pin = M1_PIN_1;
		break;
	}
	pinMode(_A_pin, OUTPUT);
	pinMode(_B_pin, OUTPUT);
}
void Motor::run(int speed)
{
    speed = speed > 100 ? 100 : speed;
    speed = speed < -100 ? -100 : speed;
    
    if (speed == 0)
    {
        digitalWrite(_A_pin, LOW);
        digitalWrite(_B_pin, LOW);
    }
    else if (speed == 100)
    {
        digitalWrite(_A_pin, LOW);
        digitalWrite(_B_pin, HIGH);
    }
    else if (speed == -100)
    {
        digitalWrite(_A_pin, HIGH);
        digitalWrite(_B_pin, LOW);
    }
	else if(speed > 0)
	{
		digitalWrite(_A_pin, LOW);
		analogWrite(_B_pin, speed);
	}
	else
	{
		digitalWrite(_B_pin, LOW);
		analogWrite(_A_pin, -1*speed);
	}
}
void Motor::stop(void)
{
	digitalWrite(_A_pin, LOW);
	digitalWrite(_B_pin, LOW);
}