/*************************************************************************
* File Name          : TestInfaredReceiver.ino
* Author             : Xixoyu

* Version            : V1.0.1
* Date               : 6/23/2013
* Description        : Example for Makeblock Electronic modules of Me - 
                       Infrared Receiver. 
* License            : CC-BY-SA 3.0
* Copyright (C) 2013 Maker Works Technology Co., Ltd. All right reserved.
* http://www.makeblock.cc/
**************************************************************************/
#include <Makeblock.h>
#include <Arduino.h>
#include <SoftwareSerial.h>
#include <Wire.h>


MeInfraredReceiver infraredReceiverDecode(PORT_6); 
void setup()
{
    infraredReceiverDecode.begin();
    Serial.begin(9600);
    Serial.println("InfraredReceiverDecode Start!");
}

void loop()
{
    if(infraredReceiverDecode.available())
    {
        switch(infraredReceiverDecode.read())
        {
            case IR_BUTTON_A: Serial.println("Press A.");break;
            case IR_BUTTON_B: Serial.println("Press B.");break;
            case IR_BUTTON_C: Serial.println("Press C.");break;
            case IR_BUTTON_D: Serial.println("Press D.");break;
            case IR_BUTTON_E: Serial.println("Press E.");break;
            case IR_BUTTON_F: Serial.println("Press F.");break;
            case IR_BUTTON_SETTING: Serial.println("Press Setting.");break;
            case IR_BUTTON_UP: Serial.println("Press Up.");break;
            case IR_BUTTON_DOWN: Serial.println("Press Down.");break;
            case IR_BUTTON_LEFT: Serial.println("Press Left.");break;
            case IR_BUTTON_RIGHT: Serial.println("Press Right.");break;
            case IR_BUTTON_0: Serial.println("Press 0.");break;
            case IR_BUTTON_1: Serial.println("Press 1.");break;
            case IR_BUTTON_2: Serial.println("Press 2.");break;
            case IR_BUTTON_3: Serial.println("Press 3.");break;
            case IR_BUTTON_4: Serial.println("Press 4.");break;
            case IR_BUTTON_5: Serial.println("Press 5.");break;
            case IR_BUTTON_6: Serial.println("Press 6.");break;
            case IR_BUTTON_7: Serial.println("Press 7.");break;
            case IR_BUTTON_8: Serial.println("Press 8.");break;
            case IR_BUTTON_9: Serial.println("Press 9.");break;
            default:break;
        }
    }
}


