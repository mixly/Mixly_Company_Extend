
#include "Nova.h"
Stepper stepper(M0); 

void setup()
{  
  Serial.begin(9600);
  // Change these to suit your stepper if you want
  stepper.setMaxSpeed(10000);
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
      Serial.println('0');
      break;
      case '1':
      stepper.moveTo(200);
      Serial.println('1');
      break;
      case '2':
      stepper.move(800);
      break;
      case '3':
      stepper.move(1600);
      break;
      case '4':
      stepper.move(8000);
      break;
      case '5':
      stepper.move(6800);
      break;
      case '6':
      stepper.move(8900);
      break;
      case '7':
      stepper.move(800);
      break;
      case '8':
      stepper.move(3200);
      break;
      case '9':
      stepper.move(4000);
      break;
    }
  }
stepper.run();
}
