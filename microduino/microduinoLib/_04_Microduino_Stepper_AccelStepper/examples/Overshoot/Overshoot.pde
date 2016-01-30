// Overshoot.pde
// -*- mode: C++ -*-
//
// Check overshoot handling
// which sets a new target position and then waits until the stepper has 
// achieved it. This is used for testing the handling of overshoots
//
// Copyright (C) 2009 Mike McCauley
// $Id: Overshoot.pde,v 1.1 2011/01/05 01:51:01 mikem Exp mikem $

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
  stepper.setMaxSpeed(150);
  stepper.setAcceleration(100);
}

void loop()
{    
  stepper.moveTo(500);
  while (stepper.currentPosition() != 300) // Full speed up to 300
    stepper.run();
  stepper.runToNewPosition(0); // Cause an overshoot then back to 0
}
