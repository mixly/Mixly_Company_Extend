 /*
Nova_DigitDisplay_DisplayNumber

Display Time.

Created 15 Dec 2015
By Blue

http://easy.cc
*/

#include <Nova.h>

DigitDisplay dis = DigitDisplay(M0);// C0、C1、M0、M1、M2、M3

void setup() {

}

void loop() {
  dis.displayTime(1323); // Display 13:23
}

