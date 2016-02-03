#include <PPMint.h>

PPMint PPM;

void setup() {
  Serial.begin(115200);
  PPM.setup();
}

// the loop function runs over and over again forever
void loop() {
  for(int a=0;a<8;a++){
    Serial.print(PPM.realRaw[a]);
    if(a<7)
      Serial.print(",");
    else
      Serial.println("");
  }

  delay(100);
}