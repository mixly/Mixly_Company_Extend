 /*
Nova_Button

Serial port will print sound sensor value.

Created 15 Dec 2015
By Blue

http://easy.cc
*/

#include <Nova.h>

Sound sound = Sound(A0); // A0、A1、A2、A3

void setup() {
Serial.begin(9600);
}

void loop() {
  Serial.print("Current Sound = ");
  Serial.println(sound.read());
  delay(500);
}
