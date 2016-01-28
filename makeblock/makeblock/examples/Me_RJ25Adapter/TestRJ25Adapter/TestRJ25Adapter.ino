/*************************************************************************
* File Name          : TestRJ25Adapter.ino
* Author             : Ander
* Updated            : xiaoyu
* Version            : V1.0.1
* Date               : 5/27/2014
* Description        : Test for Makeblock Electronic modules of Me - 
                       RJ25 Adapter. The module can only be connected 
                       to the PORT_3, PORT_4, PORT_5, PORT_6, PORT_7, 
                       PORT_8 of Me - Base Shield. 
* License            : CC-BY-SA 3.0
* Copyright (C) 2013 Maker Works Technology Co., Ltd. All right reserved.
* http://www.makeblock.cc/
**************************************************************************/
#include <Makeblock.h>
#include <Arduino.h>
#include <SoftwareSerial.h>
#include <Wire.h>

MePort output(PORT_4);    
MePort input(PORT_3);   

int val;                      
void setup()
{
	Serial.begin(9600);
}
void loop()
{
	output.dWrite1(HIGH);//SLOT1 HIGH
	delay(500);
	output.dWrite1(LOW);//SLOT1 LOW
	delay(500);
	
	val = input.dRead1();//read SLOT1 lecel
	Serial.print("val=");
	Serial.println(val);	
}