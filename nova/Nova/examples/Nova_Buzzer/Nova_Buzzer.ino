 /*
Nova_Buzzer

Buzzer will play do re mi fa so la si.

Created 15 Dec 2015
By Blue

http://easy.cc
*/

#include <Nova.h>

Buzzer myBuzzer = Buzzer(S0); // A0、A1、A2、A3、S0、S1、S2、S3 

int Tune[8]={0,294,330,350,393,441,495,556}; // do re mi fa so la si
  
void setup() {
}

void loop() {

 myBuzzer.tone(Tune[1],1000);//do, delay 1000ms
 myBuzzer.tone(Tune[2],1000);//re, delay 1000ms
 myBuzzer.tone(Tune[3],1000);//mi, delay 1000ms
 myBuzzer.tone(Tune[4],1000);//fa, delay 1000ms
 myBuzzer.tone(Tune[5],1000);//so, delay 1000ms
 myBuzzer.tone(Tune[6],1000);//la, delay 1000ms
 myBuzzer.tone(Tune[7],1000);//si, delay 1000ms
}
