#ifndef _NOVA_LINE_FINDER_H_
#define _NOVA_LINE_FINDER_H_
#include "Arduino.h"
#include "Nova.h"

#define	L_IN_R_IN 		0x00 //L and R are both inside of black line
#define	L_IN_R_OUT 		0x01 //L is inside of black line and R is outside of black line
#define	L_OUT_R_IN 		0x02 //L is outside of black line and R is inside of black line 
#define	L_OUT_R_OUT 	0x03 //L is outside of black line and R is outside of black line

class LineFinder
{
public:
	LineFinder(uint8_t port);
	bool stateR(void);//true == white,false == black
	bool stateL(void);//true == white,false == black
	uint8_t read(void);
private:
	uint8_t _sensor_pin1, _sensor_pin2;
};

#endif
