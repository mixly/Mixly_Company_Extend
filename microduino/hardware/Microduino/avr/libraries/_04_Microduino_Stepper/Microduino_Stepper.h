// Microduino_Stepper.cpp
//
// Copyright (C) 2009-2013 Shenyang
// $Id: Microduino_Stepper.cpp,v 1.00 2016/04/07 $

#ifndef __MICRODUINO_STEPPER_H__
#define __MICRODUINO_STEPPER_H__

#include <stdlib.h>
#include <Arduino.h>

#define _useTimer1
#define MAX_SPEED 	4096
#define TIMER_COMP	327680/MAX_SPEED


#define PIN_SET(pin) (*portOutputRegister(digitalPinToPort(pin)) |= digitalPinToBitMask(pin))
#define PIN_CLR(pin) (*portOutputRegister(digitalPinToPort(pin)) &= ~digitalPinToBitMask(pin))

#define MAX_STEPPERS 		4
#define INVALID_STEPPER		255 

#define PIN_EN  	4      //PORTB,0
#define PIN_DIRA 	A0    //PORTA,7
#define PIN_STEPA 	5   //PORTB,1
#define PIN_DIRB 	A1    //PORTA,6
#define PIN_STEPB 	6   //PORTB,2
#define PIN_DIRC 	A2    //PORTA,5
#define PIN_STEPC 	7   //PORTB,3
#define PIN_DIRD 	A3    //PORTA,4
#define PIN_STEPD 	8   //PORTD,6

#define DEFAULT_ACCEL 120

void stepperAllEnable();
void stepperAllDisable();

class Stepper
{
public:
	 
	Stepper(uint8_t _dirPin, uint8_t _stepPin);
	
	uint8_t begin();

	void setSpeed(int16_t _speed);
 
	void setMaxAccel(uint16_t _accel);

	int16_t getSpeed();
	
	uint16_t getMaxAccel();

	void computeStep();

private:

	uint8_t 	stepperIndex;
	uint8_t 	dirPin;
	uint8_t 	stepPin;
	int16_t		speed;
	uint16_t	maxAccel;
	uint16_t 	period;
	uint16_t	counter;

};


typedef struct{
	uint8_t isActive = false;
	Stepper *stepper;
}Stepper_t;


#endif

  

