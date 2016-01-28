/*************************************************************************
* File Name          : TestTemperature.ino
* Author             : xiaoyu
* Version            : V1.0.0
* Date               : 5/27/2014
*Parts required		 : Me Temperature(DS18B20)
* Description        :
* License            : CC-BY-SA 3.0
* Copyright (C) 2013 Maker Works Technology Co., Ltd. All right reserved.
* http://www.makeblock.cc/
**************************************************************************/
#include <Makeblock.h>
#include <Arduino.h>
#include <SoftwareSerial.h>
#include <Wire.h>

MeTemperature myTemp(PORT_8,SLOT2);
void setup()
{
    Serial.begin(9600);
}
void loop()
{
 Serial.print("Temperature=");
 Serial.println(myTemp.temperature());
 delay(1000);
}
