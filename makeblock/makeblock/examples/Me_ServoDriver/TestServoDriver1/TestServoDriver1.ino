/*************************************************************************
* File Name          : TestServoDriver.ino
* Author             : Evan
* Updated            : xiayu
* Version            : V1.0.1
* Date               : 6/23/2013
* Description        :  Using Me Servo Driver module connecting two servos.
                        The module only can be connected to  PORT_1 and PORT_2 .
                        
* License            : CC-BY-SA 3.0
* Copyright (C) 2013 Maker Works Technology Co., Ltd. All right reserved.
* http://www.makeblock.cc/
**************************************************************************/
#include <Makeblock.h>
#include <Arduino.h>
#include <SoftwareSerial.h>
#include <Wire.h>

//Parts required:Me Servo Driver and two servo 	
//Me Servo Driver PWM1 connect servo1,PWM2connect servo2

#include <Servo.h> //include the Servo library;
MePort port(PORT_1);
Servo servoDriver1;  // create servo object to control a servo 
Servo servoDriver2;  // create servo object to control another servo
int servo2pin =  port.pin1();//attaches the servo on PORT_1 SLOT1 to the servo object
int servo1pin =  port.pin2();//attaches the servo on PORT_1 SLOT2 to the servo object

int pos1 = 0;
int pos2 = 180;
void setup()
{
  servoDriver1.attach(servo1pin);  // attaches the servo on servopin1
  servoDriver2.attach(servo2pin);  // attaches the servo on servopin2
}

void loop()
{
    servoDriver1.write(pos1);
    servoDriver2.write(pos1);
    delay(1000);  // Wait for the servo rotation to the set position
    servoDriver1.write(pos2);
    servoDriver2.write(pos2);
    delay(1000);  // Wait for the servo rotation to the set position
       
}
