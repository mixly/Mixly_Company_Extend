#ifndef _Nova_4ADBUTTON_H_
#define _Nova_4ADBUTTON_H_
#include "Arduino.h"
#include "Nova.h"

class FourButton
{
public:
	FourButton(uint8_t port);
	bool A_ButtonState(void);
	bool B_ButtonState(void);
	bool C_ButtonState(void);
	bool D_ButtonState(void);
private:
	uint8_t _adc_pin;
};

#endif