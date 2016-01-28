/*************************************************************************
* File Name          : TestUSBHsot.ino
* Author             : Riven
* Updated            : Davin
* Version            : V1.0.1
* Date               : 1/27/2015
* Description        : Example for Makeblock Electronic modules of Me -
                       USB Host. The module can only be connected to the
                       port 4 of Me BaseBoard or the port 5 of Makeblock Orion.
* License            : CC-BY-SA 3.0
* Copyright (C) 2013 Maker Works Technology Co., Ltd. All right reserved.
* http://www.makeblock.cc/
**************************************************************************/
#include <Makeblock.h>
#include <SoftwareSerial.h>
#include <Wire.h>
#include "ch375.h"
CH375 usbhost;

void parseJoystick(unsigned char *buf)   //Analytic tunction, print 8 bytes from USB Host
{
    int i = 0;
    for(i = 0; i < 7; i++)
    {
        Serial.print(buf[i]);  //It won't work if you connect to the Makeblock Orion.
        Serial.print('-');
    }
    Serial.print(buf[7]);
    Serial.println();
    delay(10);
}

void setup()
{
    Serial.begin(9600);
    usbhost.init(USB1_0);  //USB1_0 or USB2_0
}

void loop()
{
    // put your main code here, to run repeatedly:
    if(!usbhost.device_online)
    {
        usbhost.probeDevice();
        delay(1000);
    }
    else
    {
        int len = usbhost.host_recv();
        parseJoystick(usbhost.RECV_BUFFER);
        delay(5);
    }
}

