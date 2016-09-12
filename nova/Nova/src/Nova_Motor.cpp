#include "Nova_Motor.h"
Motor::Motor(uint8_t port)
{
	switch(port)
	{
		case M0:
			_A_pin = M0_PIN_1;
			_B_pin = M0_PIN_0;
		break;
		case M1:
			_A_pin = M1_PIN_1;
			_B_pin = M1_PIN_0;
		break;
		case M2:
			_A_pin = M2_PIN_1;
			_B_pin = M2_PIN_0;
		break;
		case M3:
			_A_pin = M3_PIN_1;
			_B_pin = M3_PIN_0;
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
        stop();
    }
	else if(speed > 0)
	{
		digitalWrite(_A_pin, HIGH);
		analogWrite(_B_pin,(map(speed,0,100,255,0)));
	}
	else
	{
		digitalWrite(_A_pin, LOW);
		analogWrite(_B_pin,(map(speed,0,-100,0,255)));
	}
}

// void Motor::cw(uint8_t value)
// {
	// _value = value;
    
    // value = value > 100 ? 100 : value;
    // value = value < -100 ? -100 : value;
    
	// if(_value >= 100){
		// digitalWrite(_A_pin, HIGH);
		// digitalWrite(_B_pin, LOW);
	// }
	// else{
		// digitalWrite(_A_pin, HIGH);
		// analogWrite(_B_pin,(map(_value,0,100,255,0)));
	// }
// }

// void Motor::ccw(uint8_t value)
// {
	// _value = value;
	// if(_value >= 100){
		// digitalWrite(_A_pin, LOW);
		// digitalWrite(_B_pin, HIGH);
	// }
	// else{
		// digitalWrite(_A_pin, LOW);
		// analogWrite(_B_pin,(map(_value,0,100,0,255)));
	// }
// }
void Motor::stop(void)
{
	digitalWrite(_A_pin, HIGH);
	digitalWrite(_B_pin, HIGH);
}