 /*
Nova_Light

Serial port will print "Light value".

Created 15 Dec 2015
By Blue

https://github.com/StarLabMakerSpace/Nova/wiki
*/

#include <Nova.h>

Light light = Light(A0); // A0、A1、A2、A3

void setup() {
Serial.begin(9600);
}

void loop() {
  Serial.print("Current Light = ");
  Serial.println(light.read());
  delay(500);
}
