 /*
Nova_ITR

Serial port will print "Hello",When the hall Trigger.

Created 15 Dec 2015
By Blue

http://easy.cc
*/

#include <Nova.h>

Hall hall = Hall(S0); // A0、A1、A2、A3、S0、S1、S2、S3 

void setup() {
 Serial.begin(9600);
}

void loop() {
  
  if(hall.state() == true)
  {
    Serial.println("Hello");
  }
}
