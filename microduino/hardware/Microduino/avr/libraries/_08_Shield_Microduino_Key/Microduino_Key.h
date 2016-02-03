#ifndef Key_h
#define Key_h

#include <Arduino.h>

#if defined (__AVR_ATmega168P__) || defined(__AVR_ATmega328P__)
#define NUM_DIGITAL_PINS 22
#endif

#define INVALID_SERVO         255     // flag indicating an invalid key index
#define PRESS 1
#define RELEASE 0

typedef struct  {
  uint8_t nbr        :6 ;             // a pin number from 0 to 63
  uint8_t isActive   :1 ;             // true if this channel is enabled, pin not pulsed if false 
} KeyPin_t   ;  

typedef struct {
  KeyPin_t Pin;
  unsigned int ticks;
} key_t;

class Key
{
public:
  Key(int pin,uint8_t input);
  uint8_t attach(int pin);           // attach the given pin to the next free channel, sets pinMode, returns channel number or 0 if failure
  bool read(bool sta, int min, int max); // as above but also sets min and max values for writes. 
  bool read(bool sta);                        // returns current pulse width as an angle between 0 and 180 degrees
  bool attached();                   // return true if this key is attached, otherwise false 
private:
   uint8_t keyIndex;               // index into the channel data for this key
   bool key_status;
   bool key_cache;
};

#endif
