// Blocking.pde
// -*- mode: C++ -*-
//
// Shows how to use the blocking call runToNewPosition
// Which sets a new target position and then waits until the stepper has 
// achieved it.
//
// Copyright (C) 2009 Mike McCauley
// $Id: Blocking.pde,v 1.1 2011/01/05 01:51:01 mikem Exp mikem $

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
    stepper.setMaxSpeed(200.0);
    stepper.setAcceleration(100.0);
}

void loop()
{    
    stepper.runToNewPosition(0);
    stepper.runToNewPosition(500);
    stepper.runToNewPosition(100);
    stepper.runToNewPosition(120);
}
