 /*
Nova_Dual_Motor

Turn two motors run

Created 15 Dec 2015
By Blue

http://easy.cc
*/

#include <Nova.h>

Dual_Motor MA = Dual_Motor(M0); // M0、M1、M2、M3 
Dual_Motor MB = Dual_Motor(M1); // M0、M1、M2、M3 

void setup() {

}

void loop() {
  MA.run(90); // speed = (-100,100) 
  MB.run(90); // speed = (-100,100) 
  delay(1000);
  
  MA.run(-90);
  MB.run(-90);
  delay(1000);
  
  MA.stop(); // or MA.run(0);
  MB.stop(); // or MB.run(0);
  delay(1000);
}

