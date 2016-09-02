#include "Nova_Relay.h"

Relay::Relay(uint8_t port)
{
	switch(port)
	  {
	    case S0:
	      _relay_pin = S0_PIN;
	    break;
	    case S1:
	      _relay_pin = S1_PIN;
	    break;
	    case S2:
	      _relay_pin = S2_PIN;
	    break;
	    case S3:
	      _relay_pin = S3_PIN;
	    break;
	    case A0:
	      _relay_pin = A0;
	    break;
	    case A1:
	      _relay_pin = A1;
	    break;
	    case A2:
	      _relay_pin = A2;
	    break;
	    case A3:
	      _relay_pin = A3;
	    break;
	    
	    default:
	    break;
	  }
	pinMode(_relay_pin, OUTPUT);
}

void Relay::on(void)
{
	digitalWrite(_relay_pin, LOW);
}

void Relay::off(void)
{
	digitalWrite(_relay_pin, HIGH);
}

