#include "Microduino_Key.h"
// compensation ticks to trim adjust for digitalWrite delays // 12 August 2009

//#define NBR_TIMERS        (NUM_DIGITAL_PINS / SERVOS_PER_TIMER)

static key_t keys[NUM_DIGITAL_PINS];                          // static array of key structures

uint8_t KeyCount = 0;                                     // the total number of attached keys

/****************** end of static functions ******************************/

Key::Key(int pin, uint8_t input)
{
  if ( KeyCount < NUM_DIGITAL_PINS) {
    this->keyIndex = KeyCount++;                    // assign a key index to this instance
	
    if (pin < NUM_DIGITAL_PINS ) {
	  pinMode( pin, input) ;                                   // set key pin to output
      keys[this->keyIndex].Pin.nbr = pin;
      this->key_status  = LOW;
      this->key_cache  = HIGH;

      keys[this->keyIndex].Pin.isActive = true;  // this must be set after the check for isTimerActive
    }

  }
  else
    this->keyIndex = INVALID_SERVO ;  // too many keys
}

/*
  uint8_t Key::attach(int pin)
  {
  if (pin < NUM_DIGITAL_PINS ) {
    pinMode( pin, INPUT_PULLUP) ;                                   // set key pin to output
    keys[this->keyIndex].Pin.nbr = pin;
    this->key_status  = LOW;
    this->key_cache  = HIGH;

    keys[this->keyIndex].Pin.isActive = true;  // this must be set after the check for isTimerActive
  }
  return this->keyIndex ;
  }
*/

/*
  uint8_t Key::attach(int pin, int min, int max)
  {
  if(this->keyIndex < NUM_DIGITAL_PINS ) {
    pinMode( pin, OUTPUT) ;                                   // set key pin to output
    keys[this->keyIndex].Pin.nbr = pin;
    // todo min/max check: abs(min - MIN_PULSE_WIDTH) /4 < 128
    this->min  = (MIN_PULSE_WIDTH - min)/4; //resolution of min/max is 4 uS
    this->max  = (MAX_PULSE_WIDTH - max)/4;
    // initialize the timer if it has not already been initialized
    timer16_Sequence_t timer = SERVO_INDEX_TO_TIMER(keyIndex);
    if(isTimerActive(timer) == false)
      initISR(timer);
    keys[this->keyIndex].Pin.isActive = true;  // this must be set after the check for isTimerActive
  }
  return this->keyIndex ;
  }
*/

bool Key::read(bool sta) // return the value as degrees
{
  // calculate and store the values for the given channel
  int8_t channel = keys[this->keyIndex].Pin.nbr;
  if ( channel < NUM_DIGITAL_PINS )  // ensure channel is valid
  {
    this->key_cache = this->key_status; //缓存作判断用
    this->key_status = !digitalRead(channel); //触发时

    switch (sta)
    {
      case 0:
        if (!this->key_status && this->key_cache)   //按下松开后
          return true;
        else
          return false;
        break;
      case 1:
        if (this->key_status && !this->key_cache)   //按下松开后
          return true;
        else
          return false;
        break;
    }
  }
}

bool Key::read(bool sta, int min, int max) // return the value as degrees
{
  // calculate and store the values for the given channel
  int8_t channel = keys[this->keyIndex].Pin.nbr;
  if ( channel < NUM_DIGITAL_PINS )  // ensure channel is valid
  {
	int analog=analogRead(channel);
    this->key_cache = this->key_status; //缓存作判断用
    this->key_status = bool( analog> min && analog < max); //触发时

    switch (sta)
    {
      case 0:
        if (!this->key_status && this->key_cache)   //按下松开后
          return true;
        else
          return false;
        break;
      case 1:
        if (this->key_status && !this->key_cache)   //按下松开后
          return true;
        else
          return false;
        break;
    }
  }
}

bool Key::attached()
{
  return keys[this->keyIndex].Pin.isActive ;
}