 /*
Nova_Button

Serial port will print "Hello",When the sound sensor Trigger.

Created 15 Dec 2015
By Blue

https://github.com/StarLabMakerSpace/Nova/wiki
*/

#include <Nova.h>

Sound sound = Sound(S0); // A0、A1、A2、A3、S0、S1、S2、S3 

void setup() {
Serial.begin(9600);
}

void loop() {
  if(sound.state() == true)
  {
    Serial.println("Hello");
  }
}
