/*************************************************************************
* File Name          : Makeblock IR_Controle.ino
* Author             : Jasen
* Updated            : Jasen
* Version            : V1.1.0
* Date               : 5/22/2014
* Description        : Demo code for Makeblock Starter Robot kit,two motors
                       connect on the M1 and M2 port of baseshield, The IR receiver module
                       connect on port 6.
                       The four black button on the IR controller is used to control the direction 
                       of robot, the number button on the IR controller is for changing the speed of the robot.
                       button 1 is for setting the speed to the slowest,button 9 is for setting the speed to fastest.
* License            : CC-BY-SA 3.0
* Copyright (C) 2013 Maker Works Technology Co., Ltd. All right reserved.
* http://www.makeblock.cc/
**************************************************************************/
#include <Makeblock.h>
#include <Arduino.h>
#include <SoftwareSerial.h>
#include <Wire.h>

MeDCMotor MotorL(M1);  
MeDCMotor MotorR(M2);
MeInfraredReceiver infraredReceiverDecode(PORT_6);
int moveSpeed = 190;
boolean leftflag,rightflag;
int minSpeed = 55;
int factor = 23;

void setup()
{
    infraredReceiverDecode.begin();

}

void loop()
{
 if(infraredReceiverDecode.available()||infraredReceiverDecode.buttonState())
    {
        switch(infraredReceiverDecode.read())
        {
          case IR_BUTTON_PLUS: 
               Forward();
               break;
          case IR_BUTTON_MINUS:
               Backward();
               break;
          case IR_BUTTON_NEXT:
               TurnRight();
               break;
          case IR_BUTTON_PREVIOUS:
               TurnLeft();
               break;
          case IR_BUTTON_9:
               ChangeSpeed(factor*9+minSpeed);
               break;
          case IR_BUTTON_8:
               ChangeSpeed(factor*8+minSpeed);
               break;
          case IR_BUTTON_7:
               ChangeSpeed(factor*7+minSpeed);
               break;
          case IR_BUTTON_6:
               ChangeSpeed(factor*6+minSpeed);
               break;
          case IR_BUTTON_5:
               ChangeSpeed(factor*5+minSpeed);
               break;
          case IR_BUTTON_4:
               ChangeSpeed(factor*4+minSpeed);
               break;
         case IR_BUTTON_3:
               ChangeSpeed(factor*3+minSpeed);
               break;
         case IR_BUTTON_2:
               ChangeSpeed(factor*2+minSpeed);
               break;
         case IR_BUTTON_1:
               ChangeSpeed(factor*1+minSpeed);
               break;
        }
    }
    else
    {
      Stop();
    }
}

  

void Forward()
{
  MotorL.run(moveSpeed);
  MotorR.run(moveSpeed);
}
void Backward()
{
  MotorL.run(-moveSpeed);
  MotorR.run(-moveSpeed);
}
void TurnLeft()
{
  MotorL.run(-moveSpeed);
  MotorR.run(moveSpeed);
}
void TurnRight()
{
  MotorL.run(moveSpeed);
  MotorR.run(-moveSpeed);
}
void Stop()
{
  MotorL.run(0);
  MotorR.run(0);
}
void ChangeSpeed(int spd)
{
  moveSpeed = spd;
}
