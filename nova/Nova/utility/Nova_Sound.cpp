#include "Nova_Sound.h"

Sound::Sound(uint8_t port)
{

	switch(port)
	{
		case S0:
			_sound_pin = S0_PIN;
		break;
		case S1:
			_sound_pin = S1_PIN;
		break;
		case S2:
			_sound_pin = S2_PIN;
		break;
		case S3:
			_sound_pin = S3_PIN;
		break;
		case A0:
	      _sound_pin = A0;
	    break;
	    case A1:
	      _sound_pin = A1;
	    break;
	    case A2:
	      _sound_pin = A2;
	    break;
	    case A3:
	      _sound_pin = A3;
	    break;
	    
	    default:
	    break;
	}
	
	pinMode(_sound_pin, INPUT);
}

bool Sound::state(void)
{
	if(digitalRead(_sound_pin) == HIGH)
	{
		return false;
	}
	else
	{
		return true;
	}
}
