 /*
Nova_Motor

Turn the motors run

Created 15 Dec 2015
By Blue

http://easy.cc
*/

#include <Nova.h>

Motor MA = Motor(M1); // M0、M1、M2、M3

void setup() {

}

void loop() {
  MA.run(50); // motor run clockwise
  delay(2000);
  
  MA.run(0); // or MA.run(0);
  delay(1000);
  
  MA.run(-50); // motor run anticlockwise
  delay(2000);
  
  MA.run(0); // or MA.run(0);
  delay(1000);
}

