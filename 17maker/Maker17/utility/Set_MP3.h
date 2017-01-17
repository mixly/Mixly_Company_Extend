#ifndef _Set_MP3_h
#define _Set_MP3_h

#include "Arduino.h"
#include <utility/SoftwareSerial.h>

class Set_MP3 : public SoftwareSerial
{
private:
  // per object data
  uint8_t _MP3_pin;
 
  // Expressed as 4-cycle delays (must never be 0!)
  uint16_t _rx_delay_centering;
  uint16_t _rx_delay_intrabit;
  uint16_t _rx_delay_stopbit;
  uint16_t _tx_delay;

  uint16_t _buffer_overflow:1;
  uint16_t _inverse_logic:1;

 

public:
  // public methods
  Set_MP3(uint8_t port, bool inverse_logic = false);
  ~Set_MP3();
};

// Arduino 0012 workaround

#endif
