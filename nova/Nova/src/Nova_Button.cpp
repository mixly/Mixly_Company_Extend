#include "Nova_Button.h"

Button::Button(uint8_t port)
{

	switch(port)
	{
		case S0:
			_button_pin = S0_PIN;
		break;
		case S1:
			_button_pin = S1_PIN;
		break;
		case S2:
			_button_pin = S2_PIN;
		break;
		case S3:
			_button_pin = S3_PIN;
		break;
		case A0:
	      _button_pin = A0;
	    break;
	    case A1:
	      _button_pin = A1;
	    break;
	    case A2:
	      _button_pin = A2;
	    break;
	    case A3:
	      _button_pin = A3;
	    break;
	    
	    default:
	    break;
	}
	
	pinMode(_button_pin, INPUT);
}

bool Button::state(void)
{
	if(digitalRead(_button_pin) == HIGH)
	{
		delay(10);
		if(digitalRead(_button_pin) == HIGH)
		{
			return false;
		}
	}
	
	{
		return true;
	}
}