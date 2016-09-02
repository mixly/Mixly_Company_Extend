#include "Nova_Touch.h"

Touch::Touch(uint8_t port)
{
	switch(port)
	{
		case S0:
			_Touch_pin = S0_PIN;
		break;
		case S1:
			_Touch_pin = S1_PIN;
		break;
		case S2:
			_Touch_pin = S2_PIN;
		break;
		case S3:
			_Touch_pin = S3_PIN;
		break;
		case A0:
	      _Touch_pin = A0;
	    break;
	    case A1:
	      _Touch_pin = A1;
	    break;
	    case A2:
	      _Touch_pin = A2;
	    break;
	    case A3:
	      _Touch_pin = A3;
	    break;
	    
	    default:
	    break;
	}
	pinMode(_Touch_pin, INPUT);	
}
uint8_t readCapacitivePin(int _Touch_pin) {
  // Variables used to translate from Arduino to AVR pin naming
  volatile uint8_t* port;
  volatile uint8_t* ddr;
  volatile uint8_t* pin;
  // Here we translate the input pin number from
  //  Arduino pin number to the AVR PORT, PIN, DDR,
  //  and which bit of those registers we care about.
  byte bitmask;
  port = portOutputRegister(digitalPinToPort(_Touch_pin));
  ddr = portModeRegister(digitalPinToPort(_Touch_pin));
  bitmask = digitalPinToBitMask(_Touch_pin);
  pin = portInputRegister(digitalPinToPort(_Touch_pin));
  // Discharge the pin first by setting it low and output
  *port &= ~(bitmask);
  *ddr  |= bitmask;
  delay(1);
  uint8_t SREG_old = SREG; //back up the AVR Status Register
  // Prevent the timer IRQ from disturbing our measurement
  noInterrupts();
  // Make the pin an input with the internal pull-up on
  *ddr &= ~(bitmask);
  *port |= bitmask;

  // Now see how long the pin to get pulled up. This manual unrolling of the loop
  // decreases the number of hardware cycles between each read of the pin,
  // thus increasing sensitivity.
  uint8_t cycles = 17;
  if (*pin & bitmask) { cycles =  0;}
  else if (*pin & bitmask) { cycles =  1;}
  else if (*pin & bitmask) { cycles =  2;}
  else if (*pin & bitmask) { cycles =  3;}
  else if (*pin & bitmask) { cycles =  4;}
  else if (*pin & bitmask) { cycles =  5;}
  else if (*pin & bitmask) { cycles =  6;}
  else if (*pin & bitmask) { cycles =  7;}
  else if (*pin & bitmask) { cycles =  8;}
  else if (*pin & bitmask) { cycles =  9;}
  else if (*pin & bitmask) { cycles = 10;}
  else if (*pin & bitmask) { cycles = 11;}
  else if (*pin & bitmask) { cycles = 12;}
  else if (*pin & bitmask) { cycles = 13;}
  else if (*pin & bitmask) { cycles = 14;}
  else if (*pin & bitmask) { cycles = 15;}
  else if (*pin & bitmask) { cycles = 16;}

  // End of timing-critical section; turn interrupts back on if they were on before, or leave them off if they were off before
  SREG = SREG_old;

  // Discharge the pin again by setting it low and output
  //  It's important to leave the pins low if you want to 
  //  be able to touch more than 1 sensor at a time - if
  //  the sensor is left pulled high, when you touch
  //  two sensors, your body will transfer the charge between
  //  sensors.
  *port &= ~(bitmask);
  *ddr  |= bitmask;

  return cycles;
}

bool Touch::state(void)
{
	if(readCapacitivePin(_Touch_pin) > 4)
	{
		delay(10);
		if(readCapacitivePin(_Touch_pin) > 4)
		{
			return true;
		}
	}
	else
	{
		return false;
	}
}
