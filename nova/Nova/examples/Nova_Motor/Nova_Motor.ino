 /*
Nova_Motor

Turn the motor run

Created 15 Dec 2015
By Blue

https://github.com/StarLabMakerSpace/Nova/wiki
*/

#include <Nova.h>

Motor MA = Motor(M0); // M0,M1

void setup() {

}

void loop() {
  MA.run(90); // speed = (-100,100) 
  delay(1000);
  
  MA.run(-90);
  delay(1000);
  
  MA.stop(); // or MA.run(0);
  delay(1000);
}

