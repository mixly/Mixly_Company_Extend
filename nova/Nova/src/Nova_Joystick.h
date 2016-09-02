#ifndef _NOVA_JOYSTICK_H_
#define _NOVA_JOYSTICK_H_
#include "Arduino.h"
#include "Nova.h"

class Joystick
{
public:
	Joystick(uint8_t port);
    void init(void);
	int16_t readX(void);
    int16_t readY(void);
    float   getDistance(void);
private:
	int16_t 
    _x_center,
    _y_center;
};

#endif