 /*
Nova_Potentiometer

Serial port will print potentiometer value.

Created 15 Dec 2015
By Blue

http://easy.cc
*/

#include <Nova.h>

Potentiometer potentiometer = Potentiometer(A0); // A0、A1、A2、A3

void setup() {
Serial.begin(9600);
}

void loop() {
  Serial.print("Current Potentiometer Value = ");
  Serial.println(potentiometer.read());
  delay(500);
}
