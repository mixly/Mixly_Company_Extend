/*
 1.The vibration motor works only when the battery gets connected.  
 2.Here are the core modules supporting PWM control: Microduino Core+,Microduino Core USB,Microduino Core RF
 -------------------------------------------------------------------------
 wiki:https://www.microduino.cc/wiki/index.php?title=Microduino-Joypad
 */

#include <Joypad.h>

void setup() {
  // There's nothing to set up for this sketch
}

void loop() {
  Joypad.motor(0);           //motor off
  delay(1000);
  Joypad.motor(255/5); 
  delay(1000);
  Joypad.motor(255/4); 
  delay(1000);
  Joypad.motor(255/3); 
  delay(1000);
  Joypad.motor(255/2); 
  delay(1000);
  Joypad.motor(255);         //motor full
  delay(1000);
}