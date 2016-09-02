#include "Nova_Buzzer.h"

Buzzer::Buzzer(uint8_t port)
{
	switch(port)
	{
		case S0:
			_Buzzer_pin = S0_PIN;
		break;
		case S1:
			_Buzzer_pin = S1_PIN;
		break;
		case S2:
			_Buzzer_pin = S2_PIN;
		break;
		case S3:
			_Buzzer_pin = S3_PIN;
		break;
		case A0:
	      _Buzzer_pin = A0;
	    break;
	    case A1:
	      _Buzzer_pin = A1;
	    break;
	    case A2:
	      _Buzzer_pin = A2;
	    break;
	    case A3:
	      _Buzzer_pin = A3;
	    break;
	    
	    default:
	    break;
	}
	
	pinMode(_Buzzer_pin, OUTPUT);
}

void Buzzer::tone(uint16_t frequency, uint32_t duration) 
{
  int period = 1000000L / frequency;
  int pulse = period / 2;
  pinMode(_Buzzer_pin, OUTPUT);
  
  for (long i = 0; i < duration * 1000L; i += period) 
  {
    digitalWrite(_Buzzer_pin, HIGH);
    delayMicroseconds(pulse);
    digitalWrite(_Buzzer_pin, LOW);
    delayMicroseconds(pulse);
  }
}

void Buzzer::noTone()
{
  pinMode(_Buzzer_pin, OUTPUT);
  digitalWrite(_Buzzer_pin, HIGH);
}