
 /*
Nova_Relay

Turns on a Relay on for one second, then off for one second, repeatedly.

Created 15 Dec 2015
By Blue

http://easy.cc
*/


#include <Nova.h>

Relay relay = Relay(S0);  // A0、A1、A2、A3、S0、S1、S2、S3 

void setup() 
{

}

void loop() 
{
  // turn the LED on
  relay.on(); 
  
  // wait for a second
  delay(1000);
  
  // turn the LED off
  relay.off();
  
  // wait for a second
  delay(1000);
}
