/*
 1.The vibration motor works only when the battery gets connected.
 2.Here are the core modules supporting PWM control: Microduino Core+,Microduino Core USB,Microduino Core RF
 */

#include <Joypad.h>

void setup() {
  Serial.begin(115200);
}

void loop() {
  Serial.println();

  Serial.print("[SWITCH_L]:");
  Serial.println(Joypad.readButton(CH_SWITCH_L));
  Serial.print("[SWITCH_R]:");
  Serial.println(Joypad.readButton(CH_SWITCH_R));

  Serial.print("[JOYSTICK_SW]: ");
  Serial.println(Joypad.readButton(CH_JOYSTICK_SW));
  Serial.print("[JOYSTICK1_SW]: ");
  Serial.println(Joypad.readButton(CH_JOYSTICK1_SW));
  
  Serial.print("[SWITCH]: ");
  Serial.print(Joypad.readButton(CH_SWITCH_1));
  Serial.print(" , ");
  Serial.print(Joypad.readButton(CH_SWITCH_2));
  Serial.print(" , ");
  Serial.print(Joypad.readButton(CH_SWITCH_3));
  Serial.print(" , ");
  Serial.println(Joypad.readButton(CH_SWITCH_4));
  
  Serial.print("[Joystick] X: ");
  Serial.print(Joypad.readJoystickX());
  Serial.print(" ,Y: ");
  Serial.println(Joypad.readJoystickY());

  Serial.print("[Joystick1] X: ");
  Serial.print(Joypad.readJoystick1X());
  Serial.print(" ,Y: ");
  Serial.println(Joypad.readJoystick1Y());
  
  Serial.print("[LightSensor]: ");
  Serial.println(Joypad.readLightSensor());
  
  Serial.print("[Microphone]: ");
  Serial.println(Joypad.readMicrophone());
  
  Serial.println();
  delay(200);
}
