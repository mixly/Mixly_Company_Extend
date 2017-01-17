 
#include <utility/Set_MP3.h>

#define USER	0x80
#define S0	USER+11
#define S1	USER+12
#define S2	USER+13
#define S3	USER+14

#define S0_PIN	2
#define S1_PIN	9
#define S2_PIN	10
#define S3_PIN	13
//
// Constructor
//
Set_MP3::Set_MP3(uint8_t port, bool inverse_logic /* = false */) : SoftwareSerial(port , port ,inverse_logic)
{
	switch(port)
	{
		case S0:
			_MP3_pin = S0_PIN;
		break;
		case S1:
			_MP3_pin = S1_PIN;
		break;
		case S2:
			_MP3_pin = S2_PIN;
		break;
		case S3:
			_MP3_pin = S3_PIN;
		break;
		case A0:
	        _MP3_pin = A0;
	    break;
	    case A1:
			_MP3_pin = A1;
	    break;
	    case A2:
			_MP3_pin = A2;
	    break;
	    case A3:
			_MP3_pin = A3;
	    break;
	    
	    default:
	    break;
	}
  SoftwareSerial::setTX(_MP3_pin);
}

//
// Destructor
//
Set_MP3::~Set_MP3()
{
  SoftwareSerial::end();
}
