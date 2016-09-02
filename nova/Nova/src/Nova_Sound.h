#ifndef _NOVA_SOUNDSENSOR_H_
#define _NOVA_SOUNDSENSOR_H_
#include "Arduino.h"
#include "Nova.h"

class Sound
{
public:
	Sound(uint8_t port);
	int read(void);
private:
	uint8_t _sound_pin;
};
#endif