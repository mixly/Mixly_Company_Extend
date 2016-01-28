 /*
Nova_4Button

Serial port will print button is pressed

Created 15 Dec 2015
By Blue

http://easy.cc/wiki/index.php/Nova
*/

#include <Nova.h>

FourButton button = FourButton(A0); // A0、A1、A2、A3

void setup() {
Serial.begin(9600);
}

void loop() {
  if(button.A_ButtonState()==true)
  {
    Serial.println("A Button is pressed");
  }
  if(button.B_ButtonState()==true)
  {
    Serial.println("B Button is pressed");
  }
  if(button.C_ButtonState()==true)
  {
    Serial.println("C Button is pressed");
  }
  if(button.D_ButtonState()==true)
  {
    Serial.println("D Button is pressed");
  }
}
