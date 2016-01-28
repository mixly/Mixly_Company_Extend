
//You must install the AccelStepper libraries:http://www.airspayce.com/mikem/arduino/AccelStepper/AccelStepper-1.40.zip
//Stepper Driver connection
//connect  	1A and 1B to stepper coil 1  nornally  black and green wire
//connect 	2A and 2B to stepper coil 2  nornally red and blue wir

#include <AccelStepper.h>

#include <Makeblock.h>
#include <SoftwareSerial.h>
#include <Wire.h>


int dirPin = mePort[PORT_1].s1;//the direction pin connect to Base Board PORT1 SLOT1
int stpPin = mePort[PORT_1].s2;//the Step pin connect to Base Board PORT1 SLOT2
AccelStepper stepper(AccelStepper::DRIVER,stpPin,dirPin); 


void setup()
{  
  Serial.begin(9600);
  // Change these to suit your stepper if you want
  stepper.setMaxSpeed(1000);
  stepper.setAcceleration(20000);
  
}

void loop()
{
  if(Serial.available())
  {
    char a = Serial.read();
    switch(a)
    {
      case '0':
      stepper.moveTo(0);
      break;
      case '1':
      stepper.moveTo(200);
      break;
      case '2':
      stepper.move(50);
      break;
      case '3':
      stepper.move(100);
      break;
      case '4':
      stepper.move(200);
      break;
      case '5':
      stepper.move(400);
      break;
      case '6':
      stepper.move(600);
      break;
      case '7':
      stepper.move(4000);
      break;
      case '8':
      stepper.move(8000);
      break;
      case '9':
      stepper.move(3200);
      break;
    }
  }
    stepper.run();
}
