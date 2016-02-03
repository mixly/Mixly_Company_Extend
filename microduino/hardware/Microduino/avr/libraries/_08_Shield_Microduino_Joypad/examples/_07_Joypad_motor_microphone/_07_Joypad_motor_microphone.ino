/*
 1.The vibration motor works only when the battery gets connected.  
 2.Here are the core modules that support PWM control: Microduino Core+,Microduino Core USB,Microduino Core RF
 3.The louder you speak to the microphone, the greater the vibration amplitude becomes. 
 -------------------------------------------------------------------------
 wiki:https://www.microduino.cc/wiki/index.php?title=Microduino-Joypad
 */

#include <Joypad.h>

void setup() {
  // There's nothing to set up for this sketch
}

void loop() {
  Joypad.motor(map(Joypad.readMicrophone(),0,1023,0,255));           //motor off
}