 /*
Nova_Button

Serial port will print distance.

Created 15 Dec 2015
By Blue

http://easy.cc
*/

#include <Nova.h>

Ultrasonic myUltrasonic = Ultrasonic(A0);// A0,A1,A2,A3

void setup() {
Serial.begin(9600);
}

void loop() {
Serial.println(myUltrasonic.distance());//get distance
delay(1000);
}
