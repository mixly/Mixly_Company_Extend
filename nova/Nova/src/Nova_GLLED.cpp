#include "Nova_GLLED.h"

GLLED::GLLED(uint8_t port)
{
	switch(port)
	{
		case M0:
			//_A_pin = M0_PIN_1;
			_ctrl_pin = M0_PIN_0;
		break;
		case M1:
			//_A_pin = M1_PIN_1;
			_ctrl_pin = M1_PIN_0;
		break;
		case M2:
			//_A_pin = M2_PIN_1;
			_ctrl_pin = M2_PIN_0;
		break;
		case M3:
			//_A_pin = M3_PIN_1;
			_ctrl_pin = M3_PIN_0;
		break;
		
		default:
	    break;
	}
	//pinMode(_A_pin, OUTPUT);
	pinMode(_ctrl_pin, OUTPUT);
}

void GLLED::on(void)
{
	analogWrite(_ctrl_pin, 60);
}

void GLLED::off(void)
{
	digitalWrite(_ctrl_pin, LOW);
}

void GLLED::brightness(uint8_t brightness)
{    
    analogWrite(_ctrl_pin,(map(brightness, 0, 100, 0, 255)));
}
