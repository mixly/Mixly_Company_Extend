
 /*
Nova_RGB

Turns on an RGB.LED.

Created 15 Dec 2015
By Blue

http://easy.cc
*/


#include <Nova.h>

RGB pixels = RGB(S2);  // A0、A1、A2、A3、S0、S1、S2、S3 

void setup() 
{
pixels.begin(); 
}

void loop() 
{
    pixels.setPixelColor(2,pixels.Color(0,150,0)); // Moderately bright green color.
    pixels.show(); // This sends the updated pixel color to the hardware.
}
