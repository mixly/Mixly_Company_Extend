/* sketch to test RCEncoder  */
// Sends a pulse stream on pin 2 proportional to the values of pots connected to the analog pins 

#include <RCEncoder.h>

#define OUTPUT_PIN 2

int value[8] = 
{
  128-1,128*2-1,128*3-1,128*4-1,128*5-1,128*6-1,128*7-1,128*8-1
};

void setup ()
{
  encoderBegin(OUTPUT_PIN);
}

void loop ()
{
  for(int i=0; i < 8; i++)
  {
    int pulseWidth = map(value[i], 0,1023, 1000, 2000); 
    encoderWrite(i, pulseWidth);
  }  
  delay(20); 
}