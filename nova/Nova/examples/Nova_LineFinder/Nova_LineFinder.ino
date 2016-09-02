 /*
Nova_LineFinder

Serial port will print the line state.

Created 15 Dec 2015
By Blue

http://easy.cc
*/


#include <Nova.h>

LineFinder line = LineFinder(M2); // C0、C1、M0、M1、M2、M3  

void setup() {
Serial.begin(9600);
}

void loop() {  

  int state = 0;
  
  state = line.read();

  if (state == 0)
  {
    Serial.println("L and R are both inside of black line");
  }
  else if (state == 1)
  {
    Serial.println("L is inside of black line and R is outside of black line");
  }
  else if (state == 2)
  {
    Serial.println("L is outside of black line and R is inside of black line");
  }
  else if (state == 3)
  {
    Serial.println("L is outside of black line and R is outside of black line");
  }
}
