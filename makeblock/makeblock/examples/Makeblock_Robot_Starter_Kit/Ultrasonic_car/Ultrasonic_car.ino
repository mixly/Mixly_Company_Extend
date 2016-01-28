/*************************************************************************
* File Name          : Makeblock Ultrasonic.ino
* Author             : Jasen
* Updated            : Jasen
* Version            : V1.0.0
* Date               : 11/6/2013
* Description        : Demo code for Makeblock Starter Robot kit,two motors
                       connect on the M1 and M2 port of baseshield, the Ultrasonic sensor
                       connect on port 3.
* License            : CC-BY-SA 3.0
* Copyright (C) 2013 Maker Works Technology Co., Ltd. All right reserved.
* http://www.makeblock.cc/
**************************************************************************/
#include <Makeblock.h>
#include <Arduino.h>
#include <SoftwareSerial.h>
#include <Wire.h>

MeDCMotor MotorL(M1);  
MeDCMotor MotorR(M2);
MeUltrasonicSensor UltrasonicSensor(PORT_3);
int moveSpeed = 190;
int turnSpeed = 200;
int distance=0;
int randnum = 0;
boolean leftflag,rightflag;

void setup()
{
    leftflag=false;
    rightflag=false;
    randomSeed(analogRead(0));
   // Serial.begin(9600);
}

void loop()
{
  distance = UltrasonicSensor.distanceCm();
  //Serial.println(distance);
  
  if(distance>2&&distance<40)
  {
    randnum=random(300);
    if(randnum > 150 && !rightflag)
    {
      leftflag=true;
      TurnLeft();   
    }
    else
    {
      rightflag=true;
      TurnRight();  
    }
  }
  else
  {
      leftflag=false;
      rightflag=false;
      Forward();
  }
  delay(150);
}

void Forward()
{
  MotorL.run(moveSpeed);
  MotorR.run(moveSpeed);
}
void Backward()
{
  MotorL.run(-moveSpeed);
  MotorR.run(-moveSpeed);
}
void TurnLeft()
{
  MotorL.run(-turnSpeed);
  MotorR.run(turnSpeed);
}
void TurnRight()
{
  MotorL.run(turnSpeed);
  MotorR.run(-turnSpeed);
}
