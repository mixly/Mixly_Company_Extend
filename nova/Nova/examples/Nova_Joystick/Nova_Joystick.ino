 /*
Nova_Joystick

Serial port will print Joystick x and y value.

Created 15 Dec 2015
By Blue

http://easy.cc
*/

#include <Nova.h>

Joystick stick(C1);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  stick.init();
}

void loop() {
  // put your main code here, to run repeatedly:
  Serial.print("X=");
  Serial.print(stick.readX());
  Serial.print(" Y=");
  Serial.print(stick.readY());
  Serial.print(" Distance=");
  Serial.println(stick.getDistance());
  delay(100);
}
