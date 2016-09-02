 /*
Nova_Servo

Turns on two Servos from 180 to 0.

Created 15 Dec 2015
By Blue

http://easy.cc
*/


#include <Nova.h>

NovaPort M0Port(M0);
Servo myservo1;  // create servo object to control a servo 
Servo myservo2;  // create servo object to control another servo

void setup() {
  // put your setup code here, to run once:
  myservo1.attach(M0Port.getPin(S1));  // attaches the servo on servopin1
  myservo2.attach(M0Port.getPin(S2));  // attaches the servo on servopin2
}

void loop() {
  myservo1.write(0);                  // sets the servo position according to the scaled value 
  myservo2.write(0);
  delay(2000);                           // waits for the servo to get there 
  myservo1.write(180);
  myservo2.write(180);
  delay(2000); 
}
