/*
 1.Set the dead zone and make sure the value stability of Joystick in zero. 
 -------------------------------------------------------------------------
 wiki:https://www.microduino.cc/wiki/index.php?title=Microduino-Joypad
 */

#include <Joypad.h>

#define joy_DEAD_ZONE 25

int Joy_dead_zone(int _Joy_vol)
{
  if(abs(_Joy_vol)>joy_DEAD_ZONE)
    return ((_Joy_vol>0) ? (_Joy_vol-joy_DEAD_ZONE) : (_Joy_vol+joy_DEAD_ZONE));
  else
    return 0;
}

void setup() {
  Serial.begin(115200);
}

void loop() {
  Serial.println();

  Serial.print("[Joystick] X: ");
  Serial.print(Joy_dead_zone(Joypad.readJoystickX()));
  Serial.print(",Y: ");
  Serial.println(Joy_dead_zone(Joypad.readJoystickY()));

  Serial.print("[Joystick1] X: ");
  Serial.print(Joy_dead_zone(Joypad.readJoystick1X()));
  Serial.print(",Y: ");
  Serial.println(Joy_dead_zone(Joypad.readJoystick1Y()));

  Serial.println();
  delay(200);
}