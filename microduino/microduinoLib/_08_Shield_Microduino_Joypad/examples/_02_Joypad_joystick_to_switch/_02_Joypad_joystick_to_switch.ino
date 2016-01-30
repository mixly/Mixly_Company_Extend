/*
 1.Just model Joystick as a button and you can output values in four directions respectively. 
 -------------------------------------------------------------------------
 wiki:https://www.microduino.cc/wiki/index.php?title=Microduino-Joypad
 */

#include <Joypad.h>

void setup() {
  Serial.begin(115200);
}

void loop() {
  Serial.println();

  Serial.print("[Joystick SWITCH]: ");
  Serial.print(Joypad.readButton(JOYSTICK_UP));
  Serial.print(",");
  Serial.print(Joypad.readButton(JOYSTICK_DOWN));
  Serial.print(",");
  Serial.print(Joypad.readButton(JOYSTICK_LEFT));
  Serial.print(",");
  Serial.println(Joypad.readButton(JOYSTICK_RIGHT));

  Serial.print("[Joystick1 SWITCH]: ");
  Serial.print(Joypad.readButton(JOYSTICK1_UP));
  Serial.print(",");
  Serial.print(Joypad.readButton(JOYSTICK1_DOWN));
  Serial.print(",");
  Serial.print(Joypad.readButton(JOYSTICK1_LEFT));
  Serial.print(",");
  Serial.println(Joypad.readButton(JOYSTICK1_RIGHT));

  Serial.println();
  delay(200); 
}