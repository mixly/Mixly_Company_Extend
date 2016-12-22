
 /*
Nova_Led

Turns on an LED on for one second, then off for one second, repeatedly.

Created 15 Dec 2015
By Blue

http://easy.cc
*/


#include <Nova.h>

LED LED1 = LED(S0);  // A0、A1、A2、A3、S0、S1、S2、S3 

void setup() 
{
}

void loop() 
{
  LED1.on(); 
  delay(1000);
  LED1.off();  
  delay(1000);
  LED1.brightness(50);  //Set brightness  50
  delay(1000);
}
