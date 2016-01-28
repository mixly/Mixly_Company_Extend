/*************************************************************************
* File Name          : TestInfaredReceiver.ino
* Author             : Evan
* Updated            : Evan
* Version            : V1.0.1
* Date               : 5/18/2013
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
            case IR_BUTTON_POWER: Serial.println("Press Power.");break;
            case IR_BUTTON_MENU: Serial.println("Press Menu.");break;
            case IR_BUTTON_TEST: Serial.println("Press Test.");break;
            case IR_BUTTON_PLUS: Serial.println("Press Plus.");break;
            case IR_BUTTON_RETURN: Serial.println("Press Return.");break;
            case IR_BUTTON_PREVIOUS: Serial.println("Press Previous.");break;
            case IR_BUTTON_PLAY: Serial.println("Press Play.");break;
            case IR_BUTTON_NEXT: Serial.println("Press Next.");break;
            case IR_BUTTON_MINUS: Serial.println("Press Minus.");break;
            case IR_BUTTON_CLR: Serial.println("Press Clr.");break;
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


