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

void Buzzer::Tone(uint16_t frequency, uint32_t duration) // F 1-1000     TIME  ms
{
	unsigned long time;
	
    frequency = frequency > 1000 ? 1000 : frequency;
    frequency = frequency < 1 ? 1 : frequency;
    
    time = millis();
	 
	while((millis()- time) < duration)
	{
	    digitalWrite(_Buzzer_pin, HIGH);
	    delayMicroseconds(frequency/2);
	    digitalWrite(_Buzzer_pin, LOW);
	    delayMicroseconds(frequency/2);
    }
    
    digitalWrite(_Buzzer_pin, HIGH);
}

// void Buzzer::PlayMusic(uint8_t tune, uint8_t duration, uint8_t speed);
// {
	// Tone(_Tune_D[tune],duration*speed*8);
// }