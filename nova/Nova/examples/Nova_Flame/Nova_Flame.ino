 /*
Nova_Flame

Serial port will print flame value.

Created 15 Dec 2015
By Blue

http://easy.cc
*/

#include <Nova.h>

Flame flame = Flame(A0); // A0、A1、A2、A3

void setup() {
Serial.begin(9600);
}

void loop() {
  Serial.print("Current Flame Value = ");
  Serial.println(flame.read());
  delay(500);
}
