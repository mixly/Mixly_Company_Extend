#ifndef _Nova_4ADBUTTON_H_
#define _Nova_4ADBUTTON_H_
#include "Arduino.h"
#include "Nova.h"

class FourButton
{
public:
	FourButton(uint8_t port);
	bool buttonAState(void);
	bool buttonBState(void);
	bool buttonCState(void);
	bool buttonDState(void);
private:
	uint8_t _adc_pin;
};

#endif