 /*
Nova_DigitDisplay_DisplayNumber

Use Many method to Display Number.

Created 15 Dec 2015
By Blue

http://easy.cc/wiki/index.php/Nova
*/

#include <Nova.h>

DigitDisplay dis =DigitDisplay(S5);// C0、C1、S4、S5 

void setup() {

}

void loop() {
  dis.display_abcdef('a', 2);//only Display a,b,c,d,e,f
  delay(500);
  
  dis.displaynum(1234);//Display 1234
  delay(500);

  //Display 4 in the first location，Display 3 in the second location...
  dis.displaynum(4, 3, 2, 1);
  delay(500);
  
  dis.displaybit(4,2);//Display 4 in the second location
  delay(500);
  
  dis.displayfloat(0.123);
  delay(500);
  
  dis.displayfloat(0.12);
  delay(500);
  
  dis.displayfloat(0.1);
  delay(500);

  dis.displayfloat(0);
  delay(500);

  dis.displayfloat(5);
  delay(500);

  dis.displayfloat(5.6);
  delay(500);

  dis.displayfloat(5.67);
  delay(500);

  dis.displayfloat(5.678);
  delay(500);

  dis.displayfloat(35.67);
  delay(500);

  dis.displayfloat(435.63);
  delay(500);

  dis.displayfloat(9435.6); // out of range,only display 9435
  delay(500);
 
  dis.displayfloat(19435.6); // out of range,only display 9435
  delay(500);
}
