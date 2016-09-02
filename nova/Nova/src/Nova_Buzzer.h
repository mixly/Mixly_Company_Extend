#ifndef _NOVA_BUZZER_H_
#define _NOVA_BUZZER_H_
#include "Arduino.h"
#include "Nova.h"

class Buzzer
{
public:
	Buzzer(uint8_t port);
	void tone(uint16_t frequency, uint32_t duration);
    void noTone();
private:
	uint8_t _Buzzer_pin;
};

#endif