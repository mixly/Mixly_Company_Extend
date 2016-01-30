#include <AccelStepper.h>

#define MOTOR 3    //0 1 2 3

#if MOTOR == 0
int motorDirPin = A0;
int motorStepPin = 5;
int motorEnPin = 4;
#endif
#if MOTOR == 1
int motorDirPin = A1;
int motorStepPin = 6;
int motorEnPin = 4;
#endif
#if MOTOR == 2
int motorDirPin = A2;
int motorStepPin = 7;
int motorEnPin = 4;
#endif
#if MOTOR == 3
int motorDirPin = A3;
int motorStepPin = 8;
int motorEnPin = 4;
#endif

int motorSpeed = 19600; //maximum steps per second (about 3rps / at 16 microsteps)
int motorAccel = 80000; //steps/second/second to accelerate

//set up the accelStepper intance
//the "1" tells it we are using a driver
AccelStepper stepper(1, motorStepPin, motorDirPin);
//A4982,left to right(OUT2B OUT2A OUT1A OUT1B):red,green,yellow,blue

void setup() {
  stepper.setMaxSpeed(motorSpeed);
  stepper.setSpeed(motorSpeed);
  stepper.setAcceleration(motorAccel);

  pinMode(motorDirPin, OUTPUT);
  pinMode(motorEnPin, OUTPUT);
  digitalWrite(motorEnPin, LOW);

  stepper.moveTo(3200); //move 32000 steps (should be 10 rev)
}

void loop() {
  //if stepper is at desired location
  if (stepper.distanceToGo() == 0) {
    //go the other way the same amount of steps
    //so if current position is 400 steps out, go position -400
    stepper.moveTo(-stepper.currentPosition());
  }

  //these must be called as often as possible to ensure smooth operation
  //any delay will cause jerky motion
  stepper.run();
}