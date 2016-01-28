#include <Makeblock.h>
#include <Arduino.h>
#include <SoftwareSerial.h>
#include <Wire.h>

//Parts required:Me RJ25 Adapter and two servo 	
//Me RJ25 Adapter SLOT1 connect servo1,SLOT2connect servo2,
//The Me RJ25 Adapter module can connect to the port with yellow tag (PORT_3 to PROT_8). 

#include <Servo.h> //include the Servo library;

MePort port(PORT_3);
Servo myservo1;  // create servo object to control a servo 
Servo myservo2;  // create servo object to control another servo
int servo1pin =  port.pin1();//attaches the servo on PORT_3 SLOT1 to the servo object
int servo2pin =  port.pin2();//attaches the servo on PORT_3 SLOT2 to the servo object

void setup() 
{ 
  myservo1.attach(servo1pin);  // attaches the servo on servopin1
  myservo2.attach(servo2pin);  // attaches the servo on servopin2
} 

void loop() 
{ 
  myservo1.write(0);                  // sets the servo position according to the scaled value 
  myservo2.write(0);
  delay(2000);                           // waits for the servo to get there 
  myservo1.write(180);
  myservo2.write(180);
  delay(2000); 
} 
