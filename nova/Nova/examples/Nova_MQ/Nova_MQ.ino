 /*
Nova_MQ

Serial port will print MQ Serial Sensor value.

Created 15 Dec 2015
By Blue

http://easy.cc
*/

#include <Nova.h>

MQ MQ2 = MQ(A0); // A0、A1、A2、A3

void setup() {
Serial.begin(9600);
}

void loop() {
  Serial.print("Current MQ Serial Sensor Value = ");
  Serial.println(MQ.read());
  delay(500);
}
