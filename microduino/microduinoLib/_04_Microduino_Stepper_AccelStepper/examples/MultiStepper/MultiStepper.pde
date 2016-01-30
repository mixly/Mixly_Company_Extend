// MultiStepper.pde
// -*- mode: C++ -*-
//
// Shows how to multiple simultaneous steppers
// Runs one stepper forwards and backwards, accelerating and decelerating
// at the limits. Runs other steppers at the same time
//
// Copyright (C) 2009 Mike McCauley
// $Id: MultiStepper.pde,v 1.1 2011/01/05 01:51:01 mikem Exp mikem $

#include <AccelStepper.h>

#include <AccelStepper.h>


int motor0DirPin = A0;
int motor0StepPin = 5;
int motor0EnPin = 4;

int motor1DirPin = A1;
int motor1StepPin = 6;
int motor1EnPin = 4;

int motor2DirPin = A2;
int motor2StepPin = 7;
int motor2EnPin = 4;

int motor3DirPin = A3;
int motor3StepPin = 8;
int motor3EnPin = 4;

// Define a stepper and the pins it will use
AccelStepper stepper0(1, motor0StepPin, motor0DirPin);
AccelStepper stepper1(1, motor1StepPin, motor1DirPin);
AccelStepper stepper2(1, motor2StepPin, motor2DirPin);
AccelStepper stepper3(1, motor3StepPin, motor3DirPin);
//A4982,left to right(OUT2B OUT2A OUT1A OUT1B):red,green,yellow,blue

void setup()
{
  pinMode(motor0EnPin, OUTPUT);
  digitalWrite(motor0EnPin, LOW);
  stepper0.setMaxSpeed(10000.0);
  stepper0.setAcceleration(100.0);
  stepper1.moveTo(3200);

  pinMode(motor1EnPin, OUTPUT);
  digitalWrite(motor1EnPin, LOW);
  stepper1.setMaxSpeed(20000.0);
  stepper1.setAcceleration(100.0);
  stepper1.moveTo(3200);

  pinMode(motor2EnPin, OUTPUT);
  digitalWrite(motor2EnPin, LOW);
  stepper2.setMaxSpeed(30000.0);
  stepper2.setAcceleration(100.0);
  stepper2.moveTo(3200);

  pinMode(motor3EnPin, OUTPUT);
  digitalWrite(motor3EnPin, LOW);
  stepper3.setMaxSpeed(40000.0);
  stepper3.setAcceleration(100.0);
  stepper3.moveTo(3200);
}

void loop()
{
  // Change direction at the limits
  if (stepper0.distanceToGo() == 0)
    stepper0.moveTo(-stepper0.currentPosition());
  stepper0.run();

  if (stepper1.distanceToGo() == 0)
    stepper1.moveTo(-stepper1.currentPosition());
  stepper1.run();

  if (stepper2.distanceToGo() == 0)
    stepper2.moveTo(-stepper2.currentPosition());
  stepper2.run();

  if (stepper3.distanceToGo() == 0)
    stepper3.moveTo(-stepper3.currentPosition());
  stepper3.run();
}