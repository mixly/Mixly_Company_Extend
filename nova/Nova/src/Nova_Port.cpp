#include "Nova_Port.h"

NovaPort::NovaPort(uint8_t port)
{
    _pin = 0;
    _pin_S1 = 0;
    _pin_S2 = 0;
    
    switch(port)
	  {
	    case S0:
	      _pin = S0_PIN;
	    break;
	    case S1:
	      _pin = S1_PIN;
	    break;
	    case S2:
	      _pin = S2_PIN;
	    break;
	    case S3:
	      _pin = S3_PIN;
	    break;
        
	    case A0:
	      _pin = A0;
	    break;
	    case A1:
	      _pin = A1;
	    break;
	    case A2:
	      _pin = A2;
	    break;
	    case A3:
	      _pin = A3;
	    break;
	    
        case M0:
	      _pin_S1 = M0_S1;
          _pin_S2 = M0_S2;
	    break;
	    case M1:
	      _pin_S1 = M1_S1;
          _pin_S2 = M1_S2;
	    break;
	    case M2:
	      _pin_S1 = M2_S1;
          _pin_S2 = M2_S2;
	    break;
	    case M3:
	      _pin_S1 = M3_S1;
          _pin_S2 = M3_S2;
	    break;
        
        case C0:
	      _pin_S1 = C0_S1;
          _pin_S2 = C0_S2;
	    break;
	    case C1:
	      _pin_S1 = C1_S1;
          _pin_S2 = C1_S2;
	    break;
        
	    default:
	    break;
	  }
}

uint8_t NovaPort::getPin()
{
    return _pin;
}

uint8_t NovaPort::getPin(uint8_t solt)
{
    if (solt == S1)
    {
        return _pin_S1;    
    }
    else if (solt == S2)
    {
        return _pin_S2;    
    }
}
