// Random.pde
// -*- mode: C++ -*-
//
// Make a single stepper perform random changes in speed, position and acceleration
//
// Copyright (C) 2009 Mike McCauley
// $Id: Random.pde,v 1.1 2011/01/05 01:51:01 mikem Exp mikem $

#include <AccelStepper.h>

#define motor 1		//1 or 2

#ifdef motor == 1
int motorDirPin = 5;
int motorStepPin = 7;
int motorEnPin = 8;
#else
int motorDirPin = 18;
int motorStepPin = 22;
int motorEnPin = 23;
#endif

// Define a stepper and the pins it will use
AccelStepper stepper(1, motorStepPin, motorDirPin); 
//A4982,left to right(OUT2B OUT2A OUT1A OUT1B):red,green,yellow,blue

void setup()
{  
}

void loop()
{
    if (stepper.distanceToGo() == 0)
    {
	// Random change to speed, position and acceleration
	// Make sure we dont get 0 speed or accelerations
	delay(1000);
	stepper.moveTo(rand() % 200);
	stepper.setMaxSpeed((rand() % 200) + 1);
	stepper.setAcceleration((rand() % 200) + 1);
    }
    stepper.run();
}
