 /*
Nova_DigitDisplay_DisplayNumber

Display Time.

Created 15 Dec 2015
By Blue

https://github.com/StarLabMakerSpace/Nova/wiki
*/

#include <Nova.h>

DigitDisplay dis = DigitDisplay(S5);// C0、C1、S4、S5 

void setup() {

}

void loop() {
  dis.displayTime(13,23); // Display 13:23
}

