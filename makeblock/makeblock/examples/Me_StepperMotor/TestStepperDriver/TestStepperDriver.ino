/*************************************************************************
* File Name          : TestStepper.ino
* Author             : xiaoyu
* Version            : V1.0.0
* Date               : 5/27/2014
*Parts required	     :Me Stepper Driver , Stepper motor 
* Description        : Getting stared with  Me Stepper Driver V 1.0.

* License            : CC-BY-SA 3.0
* Copyright (C) 2013 Maker Works Technology Co., Ltd. All right reserved.
* http://www.makeblock.cc/
**************************************************************************/

//Stepper Driver connection
//connect  	1A and 1B to stepper coil 1  nornally  black and green wire
//connect 	2A and 2B to stepper coil 2  nornally red and blue wire

#include <Makeblock.h>
#include <SoftwareSerial.h>
#include <Wire.h>


int dirPin = mePort[PORT_1].s1;//the direction pin connect to Base Board PORT1 SLOT1
int stpPin = mePort[PORT_1].s2;//the Step pin connect to Base Board PORT1 SLOT2


 
void setup()
{
	pinMode(dirPin, OUTPUT);
	pinMode(stpPin, OUTPUT);
}

void step(boolean dir,int steps)
{
	digitalWrite(dirPin,dir);
	delay(50);
	for(int i=0;i<steps;i++){
		digitalWrite(stpPin, HIGH);
		delayMicroseconds(800);
		digitalWrite(stpPin, LOW);
		delayMicroseconds(800); 
	}
}

void loop()
{
	step(1,200);//run 200 step
	delay(1000);
	step(0,200);
	delay(1000);
}
