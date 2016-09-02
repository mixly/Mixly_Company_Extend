#include <Nova.h>
Touch myTouch = Touch(S0); // A0、A1、A2、A3、S0、S1、S2、S3 

void setup() {
Serial.begin(9600);
}

void loop() {

  if(myTouch.state() == true)
  {
    Serial.println("Touch ");
  }
}
