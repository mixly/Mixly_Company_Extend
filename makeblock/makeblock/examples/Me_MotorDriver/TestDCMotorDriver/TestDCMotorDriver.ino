/*************************************************************************
* File Name          : TestMotorDriver.ino
* Author             : Steve
* Updated            : Jasen
* Version            : V1.0.1
* Date               : 11/14/2013
* Description        : Test for Makeblock Electronic modules of Me -Motor 
                       Driver. You can directly connect a motor to M1 or M2 Port, or connect to PORT_1 or PORT_2 through a DC                        motor driver
* License            : CC-BY-SA 3.0
* Copyright (C) 2013 Maker Works Technology Co., Ltd. All right reserved.
* http://www.makeblock.cc/
**************************************************************************/
#include <Makeblock.h>
#include <Arduino.h>
#include <SoftwareSerial.h>
#include <Wire.h>

MeDCMotor motor1(PORT_1);
MeDCMotor motor2(PORT_2);
MeDCMotor motor3(M1);
MeDCMotor motor4(M2);

uint8_t motorSpeed = 100;

void setup()
{

}

void loop()
{
	motor1.run(motorSpeed); // value: between -255 and 255.
	motor2.run(motorSpeed); // value: between -255 and 255.
    motor3.run(motorSpeed);
	motor4.run(motorSpeed);
	delay(2000);
    motor1.stop();
	motor2.stop();
    motor3.stop();
	motor4.stop();
	delay(100);
	motor1.run(-motorSpeed);
	motor2.run(-motorSpeed);
    motor3.run(-motorSpeed);
    motor4.run(-motorSpeed);
	delay(2000);
	motor1.stop();
	motor2.stop();
    motor3.stop();
	motor4.stop();
	delay(2000);
}

