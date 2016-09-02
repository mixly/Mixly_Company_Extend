 /*
Nova_IRReceiveByte

Serial port will print "Which Button Press",When the infrared remote control button pressed.

Created 15 Dec 2015
By Blue

http://easy.cc
*/

#include <Nova.h> 

IRSendRev IR;

void setup()
{
  IR.begin(A1);// A0、A1、A2、A3、S0、S1、S2、S3 
  Serial.begin(9600);
}
void loop()
{
    if(IR.available())
    {
        switch(IR.recv())
        {
            case IR_BUTTON_OK: Serial.println("Press Ok.");break;
            case IR_BUTTON_UP: Serial.println("Press Up.");break;
            case IR_BUTTON_DOWN: Serial.println("Press Down.");break;
            case IR_BUTTON_LEFT: Serial.println("Press Left.");break;
            case IR_BUTTON_RIGHT: Serial.println("Press Right.");break;
            case IR_BUTTON_SPARK: Serial.println("Press *.");break;
            case IR_BUTTON_POUND: Serial.println("Press #.");break;
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
