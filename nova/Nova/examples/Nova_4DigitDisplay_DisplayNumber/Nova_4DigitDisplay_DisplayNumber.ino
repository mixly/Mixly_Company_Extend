 /*
Nova_DigitDisplay_DisplayNumber

Use Many method to Display Number.

Created 15 Dec 2015
By Blue

http://easy.cc
*/

#include <Nova.h>

DigitDisplay dis =DigitDisplay(M0);// C0、C1、M0、M1、M2、M3

void setup() {

}

void loop() {
  dis.displayABCDEF(String("a"), 1);//only Display a,b,c,d,e,f
  delay(500);
  
  dis.displayNum(1234);//Display 1234
  delay(500);

  //Display 4 in the first location，Display 3 in the second location...
  dis.displayNum(4, 3, 2, 1);
  delay(500);
  
  dis.displayBit(4,2);//Display 4 in the second location
  delay(500);
  
  dis.displayFloat(0.123);
  delay(500);
  
  dis.displayFloat(0.12);
  delay(500);
  
  dis.displayFloat(0.1);
  delay(500);

  dis.displayFloat(0);
  delay(500);

  dis.displayFloat(5);
  delay(500);

  dis.displayFloat(5.6);
  delay(500);

  dis.displayFloat(5.67);
  delay(500);

  dis.displayFloat(5.678);
  delay(500);

  dis.displayFloat(35.67);
  delay(500);

  dis.displayFloat(435.63);
  delay(500);

  dis.displayFloat(9435.6); // out of range,only display 9435
  delay(500);
 
  dis.displayFloat(19435.6); // out of range,only display 9435
  delay(500);
}
