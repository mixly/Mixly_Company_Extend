#ifndef _MICRODUINO_SOFT_PROTOCOL_H
#define _MICRODUINO_SOFT_PROTOCOL_H

#if ARDUINO >= 100
#include "Arduino.h"
#else
#include "WProgram.h"
#endif

#define PRO_PORT SoftwareSerial

#include "SoftwareSerial.h"

enum p_sta {
	P_ERROR,
	P_BUSY,
	P_NONE,
	P_FINE,
	P_TIMEOUT,
};

#define MODE_WHILE 1
#define MODE_LOOP 0

#define BUFFER_MAX 256
#define CHANNEL_NUM 8
#define TYPE_NUM 0xC8

class Protocol {
  public:
    Protocol(PRO_PORT *ser , byte _channel){ // Constructor when using HardwareSerial
	  //  common_init();  // Set everything to common state, then...
	  channel = _channel;
	  num = 0;
	  sta = false;
	  error = false;
	  P_Serial = ser; // ...override P_Serial with value passed.
	}
    void begin(uint16_t _baud);
    uint8_t parse(uint16_t* _data, bool _mod);

  private:
    byte inChar, inCache;
    byte buffer[BUFFER_MAX];
    byte channel;
    unsigned long num = 0;
    unsigned long time = 0;
    bool sta = false;
    bool error = false;

    bool available(bool _sta);
    PRO_PORT *P_Serial;
};


#endif