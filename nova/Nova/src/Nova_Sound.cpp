#include "Nova_Sound.h"

Sound::Sound(uint8_t pin)
{
	_sound_pin = pin;
}

int Sound::read(void)
{
	return analogRead(_sound_pin);
}

