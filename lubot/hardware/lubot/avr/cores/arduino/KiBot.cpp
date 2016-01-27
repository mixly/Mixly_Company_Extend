#include "KiBot.h"

#if USB_VID == 0x2341 && USB_PID == 0x803C
#include <Esplora.h>
#endif

/*
 -----------------------------------------------------------------------------
                                    Generals
 -----------------------------------------------------------------------------
*/

/*      Digital Input       */

KBDigital::KBDigital(uint8_t _pin)
{
    pin = _pin;
    pinMode(pin, INPUT);
}

boolean KBDigital::getDigital() {
    
    boolean val;
    
    #if USB_VID == 0x2341 && USB_PID == 0x803C
        int value = Esplora.readKB(pin);
        if (value < 128)
            val = 0;
        else
            val = 1;
    #else
        val = digitalRead(pin);
    #endif                

    return val;
}

TonePlay::TonePlay(uint8_t _pin)
{
	pin = _pin;
}

void TonePlay::play(unsigned int _frequency, unsigned long _duration)
{
	tone(pin,_frequency,_duration);
}

void TonePlay::play(unsigned int _frequency)
{
	tone(pin,_frequency);
}

void TonePlay::noPlay()
{
	noTone(pin);
}


/*      Output       */

KBOutput::KBOutput(uint8_t _pin)
{
    pin = _pin;
	_state = LOW;
	pinMode(pin, OUTPUT);
}

void KBOutput::write(int value)
{
		/*if(pin == 12 || pin == 13)
    {
    	digitalWrite(pin,value);
    }
    else
    {*/
    	if( value <= KB_MAX && value >= 0 )
        	analogWrite(pin, value * 0.25);
    	else
        	return;
    //}
}

void KBOutput::change()
{
		if( _state == LOW)
		KBOutput::on();
		else
		KBOutput::off();
}

/*
 -----------------------------------------------------------------------------
                                Digital Inputs
 -----------------------------------------------------------------------------
 */

/*      Button      */

LuButton::LuButton(uint8_t _pin) : KBDigital(_pin)
{
	_toggleState = LOW;
	_oldState = HIGH;
	_pressedState = LOW;
	_releasedState = LOW;
	_heldState = LOW;
    _heldTime = 500;
}

void LuButton::update() {
  boolean newState = LuButton::getDigital();
  if (newState != _oldState) {
    // pressed?
    if (newState == LOW) {    ///////BUTTON CC
      _pressedState = true;      
    }
    else {
      _releasedState = true;
     _toggleState = !_toggleState;	  
    }
    
    _oldState = newState;
    delay(50); // debouncing
  } 

  else {
      
      int timeDiff = millis() - _millisMark;
      
      if(newState == LOW && _oldState == LOW && timeDiff > _heldTime) {    ///////BUTTON CC
  		_heldState = true;
  	} else {
  		_heldState = false;
  	}

  	
  }
}


boolean LuButton::readSwitch()
{
	LuButton::update();
	return _toggleState;
}

boolean LuButton::pressed()
{
	LuButton::update();

	if(_pressedState == true)
	{
        _millisMark = millis();
		_pressedState = false;
		return true;
	}		
	else
		return false;
}

boolean LuButton::released()
{
	LuButton::update();

	if(_releasedState == true)
	{
		_releasedState = false;
		return true;
	}		
	else
		return false;
}

boolean LuButton::held()
{	
	LuButton::update();
	return _heldState;
}


/*
-----------------------------------------------------------------------------
                                        Outputs
-----------------------------------------------------------------------------
*/

/* LED */

LuLed::LuLed(uint8_t _pin) : KBOutput(_pin) {}	
	
/* Moto*/
KBMoto::KBMoto(uint8_t _pinS,uint8_t _pinD)
{
	pinS = _pinS;
	pinD = _pinD;
	pinMode(pinS, OUTPUT);
	pinMode(pinD, OUTPUT);
}

boolean KBMoto::setSpeed(int _speed)
{
	analogWrite(pinS, _speed);
}

boolean KBMoto::setDirection(int _dir)
{
	digitalWrite(pinD,_dir);
	stateDir = _dir;
}

boolean KBMoto::stop()
{
	analogWrite(pinS,0);
}

void KBMoto::changeDirection()
{
	if(stateDir == COUNTERCLOCKWISE)
	KBMoto::setDirection(CLOCKWISE);
	else
	KBMoto::setDirection(COUNTERCLOCKWISE);
}

/*
-----------------------------------------------------------------------------
                               define some objects
-----------------------------------------------------------------------------
*/
#if defined(__AVR_ATmega2560__) || defined(__AVR_ATmega1280__)

	LuLed ledLeft=LuLed(41);
	LuLed ledRight=LuLed(40);

	KBMoto motorLeft=KBMoto(44,42);
	KBMoto motorRight=KBMoto(45,43);

	TonePlay speaker=TonePlay(22);
#else
	LuLed ledLeft=LuLed(12);
	LuLed ledRight=LuLed(13);

	KBMoto motorLeft=KBMoto(6,7);
	KBMoto motorRight=KBMoto(5,4);

	TonePlay speaker=TonePlay(8);
#endif