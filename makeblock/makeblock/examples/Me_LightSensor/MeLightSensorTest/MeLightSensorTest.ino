/*************************************************************************
 * File Name          : MeLightSensorTest.ino
 * Author             : Xiaoyu
 * Updated            : Xiaoyu
 * Version            : V1.0.0
 * Date               : 2/7/2014
 * Description        : Example for Makeblock Electronic modules of 
 * Me-LightSensor. The module can only be connected to the PORT_6 of Me - Base Shield,
 * and the PORT_3,PORT_6,PORT_7,PORT_8 of Me - Base Board. 
 * If just read thethe lightSensor's value, the module can  be connected to 
 * the PORT_6 ,PORT_7, PORT_8 of Me - Base Shield.
 * License            : CC-BY-SA 3.0
 * Copyright (C) 2013 Maker Works Technology Co., Ltd. All right reserved.
 * http://www.makeblock.cc/
 **************************************************************************/

#include <Makeblock.h>
#include <SoftwareSerial.h>
#include <Wire.h>


MeLightSensor lightSensor(PORT_6);

int value = 0;      // a variable for the lightSensor's value


void setup() 
{
  // initialize serial communications at 9600 bps
  Serial.begin(9600);
}

void loop()
{
  // read the lightSensor value:
  value = lightSensor.read();  

  // print the results to the serial monitor:
  Serial.print("value = " );                                            
  Serial.println(value);   
  // wait 100 milliseconds before the next loop
  delay(100);  
}


