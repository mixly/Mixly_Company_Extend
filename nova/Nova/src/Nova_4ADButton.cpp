#include "Nova_4ADButton.h"

FourButton::FourButton(uint8_t port)
{
	_adc_pin = port;
}

bool FourButton::buttonAState(void)
{
	if(analogRead(_adc_pin) < 380)
	{
		delay(10);
		if(analogRead(_adc_pin) < 380)
		{
			return true;
		}
	}

	return false;
	
}

bool FourButton::buttonBState(void)
{
	if((analogRead(_adc_pin) < 465) && (analogRead(_adc_pin) > 380))
	{
		delay(10);
		if((analogRead(_adc_pin) < 465) && (analogRead(_adc_pin) > 380))
		{
			return true;
		}
	}

	{
		return false;
	}
}

bool FourButton::buttonCState(void)
{
	if((analogRead(_adc_pin) < 550) && (analogRead(_adc_pin) > 465))
	{
		delay(10);
		if((analogRead(_adc_pin) < 550) && (analogRead(_adc_pin) > 465))
		{
			return true;
		}
	}
	
	{
		return false;
	}
}

bool FourButton::buttonDState(void)
{
	if((analogRead(_adc_pin) < 800) && (analogRead(_adc_pin) > 550))
	{
		delay(10);
		if((analogRead(_adc_pin) < 800) && (analogRead(_adc_pin) > 550))
		{
			return true;
		}
	}
	
	{
		return false;
	}
}
