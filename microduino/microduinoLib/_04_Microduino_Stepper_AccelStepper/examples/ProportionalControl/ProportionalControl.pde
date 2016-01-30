// ProportionalControl.pde
// -*- mode: C++ -*-
//
// Make a single stepper follow the analog value read from a pot or whatever
// The stepper will move at a constant speed to each newly set posiiton, 
// depending on the value of the pot.
//
// Copyright (C) 2012 Mike McCauley
// $Id: ProportionalControl.pde,v 1.1 2011/01/05 01:51:01 mikem Exp mikem $

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

// This defines the analog input pin for reading the control voltage
// Tested with a 10k linear pot between 5v and GND
#define ANALOG_IN A0

void setup()
{  
  stepper.setMaxSpeed(1000);
}

void loop()
{
  // Read new position
  int analog_in = analogRead(ANALOG_IN);
  stepper.moveTo(analog_in);
  stepper.setSpeed(100);
  stepper.runSpeedToPosition();
}
