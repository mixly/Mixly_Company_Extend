 /*
Nova_4Button

Serial port will print button is pressed

Created 15 Dec 2015
By Blue

http://easy.cc
*/

#include <Nova.h>

FourButton button = FourButton(A0); // A0、A1、A2、A3

void setup() {
Serial.begin(9600);
}

void loop() {
  if(button.buttonAState()==true)
  {
    Serial.println("A Button is pressed");
  }
  if(button.buttonBState()==true)
  {
    Serial.println("B Button is pressed");
  }
  if(button.buttonCState()==true)
  {
    Serial.println("C Button is pressed");
  }
  if(button.buttonDState()==true)
  {
    Serial.println("D Button is pressed");
  }
}
