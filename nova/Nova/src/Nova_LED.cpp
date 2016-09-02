#include "Nova_LED.h"

LED::LED(uint8_t port)
{
	switch(port)
	  {
	    case S0:
	      _led_pin = S0_PIN;
	    break;
	    case S1:
	      _led_pin = S1_PIN;
	    break;
	    case S2:
	      _led_pin = S2_PIN;
	    break;
	    case S3:
	      _led_pin = S3_PIN;
	    break;
	    case A0:
	      _led_pin = A0;
	    break;
	    case A1:
	      _led_pin = A1;
	    break;
	    case A2:
	      _led_pin = A2;
	    break;
	    case A3:
	      _led_pin = A3;
	    break;
	    
	    default:
	    break;
	  }
	pinMode(_led_pin, OUTPUT);
}

void LED::on(void)
{
	digitalWrite(_led_pin, LOW);
}

void LED::off(void)
{
	digitalWrite(_led_pin, HIGH);
}

void LED::brightness(uint8_t brightness)
{
   // if ((_led_pin == S1_PIN) || (_led_pin == S2_PIN))
    {
        //brightness = brightness < 0 ? 0 : brightness;
        //brightness = brightness > 100 ? 100 : brightness;
        analogWrite(_led_pin,map(brightness, 0, 100, 255, 0));
    }
}
