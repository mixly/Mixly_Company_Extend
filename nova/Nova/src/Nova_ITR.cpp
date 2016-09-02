#include "Nova_ITR.h"

ITR::ITR(uint8_t port)
{

	switch(port)
	{
		case S0:
			_ITR_pin = S0_PIN;  
		break;
		case S1:
			_ITR_pin = S1_PIN;
		break;
		case S2:
			_ITR_pin = S2_PIN;
		break;
		case S3:
			_ITR_pin = S3_PIN;
		break;
		case A0:
	      _ITR_pin = A0;
	    break;
	    case A1:
	      _ITR_pin = A1;
	    break;
	    case A2:
	      _ITR_pin = A2;
	    break;
	    case A3:
	      _ITR_pin = A3;
	    break;
	    
	    default:
	    break;
	}
	
	pinMode(_ITR_pin, INPUT);
}

bool ITR::state(void)
{
	if(digitalRead(_ITR_pin) == LOW)
	{
		return false;
	}
	else
	{
		return true;
	}
}