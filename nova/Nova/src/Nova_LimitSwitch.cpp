#include "Nova_LimitSwitch.h"

LimitSwitch::LimitSwitch(uint8_t port)
{

	switch(port)
	{
		case S0:
			_limit_pin = S0_PIN;
		break;
		case S1:
			_limit_pin = S1_PIN;
		break;
		case S2:
			_limit_pin = S2_PIN;
		break;
		case S3:
			_limit_pin = S3_PIN;
		break;
		case A0:
	      _limit_pin = A0;
	    break;
	    case A1:
	      _limit_pin = A1;
	    break;
	    case A2:
	      _limit_pin = A2;
	    break;
	    case A3:
	      _limit_pin = A3;
	    break;
	    
	    default:
	    break;
	}
	
	pinMode(_limit_pin, INPUT);
}

bool LimitSwitch::state(void)
{
	if(digitalRead(_limit_pin) == HIGH)
	{
		delay(10);
		if(digitalRead(_limit_pin) == HIGH)
		{
			return false;
		}
	}
	
	{
		return true;
	}
}