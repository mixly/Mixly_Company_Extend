#include "Nova_TiltSwitch.h"

TiltSwitch::TiltSwitch(uint8_t port)
{

	switch(port)
	{
		case S0:
			_tilt_pin = S0_PIN;
		break;
		case S1:
			_tilt_pin = S1_PIN;
		break;
		case S2:
			_tilt_pin = S2_PIN;
		break;
		case S3:
			_tilt_pin = S3_PIN;
		break;
		case A0:
	      _tilt_pin = A0;
	    break;
	    case A1:
	      _tilt_pin = A1;
	    break;
	    case A2:
	      _tilt_pin = A2;
	    break;
	    case A3:
	      _tilt_pin = A3;
	    break;
	    
	    default:
	    break;
	}
	
	pinMode(_tilt_pin, INPUT);
}

bool TiltSwitch::state(void)
{
	if(digitalRead(_tilt_pin) == HIGH)
	{
		return false;
	}
	else
	{
		return true;
	}
}