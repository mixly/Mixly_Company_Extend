#include "Nova_Hall.h"

Hall::Hall(uint8_t port)
{

	switch(port)
	{
		case S0:
			_Hall_pin = S0_PIN;  
		break;
		case S1:
			_Hall_pin = S1_PIN;
		break;
		case S2:
			_Hall_pin = S2_PIN;
		break;
		case S3:
			_Hall_pin = S3_PIN;
		break;
		case A0:
	      _Hall_pin = A0;
	    break;
	    case A1:
	      _Hall_pin = A1;
	    break;
	    case A2:
	      _Hall_pin = A2;
	    break;
	    case A3:
	      _Hall_pin = A3;
	    break;
	    
	    default:
	    break;
	}
	
	pinMode(_Hall_pin, INPUT);
}

bool Hall::state(void)
{
	if(digitalRead(_Hall_pin) == HIGH)
	{
		return false;
	}
	else
	{
		return true;
	}
}