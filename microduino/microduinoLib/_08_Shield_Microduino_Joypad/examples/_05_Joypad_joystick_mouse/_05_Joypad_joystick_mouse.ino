/*
 1.Set the dead zone and make sure the value stability of Joystick in zero. 
 2.Only support Microduino-CoreUSB   
 3.Use Joystick to control the cursor. The left and right mouse buttons correspond to switch 3 and switch 4 respectively.  
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

void setup()
{
  Serial.begin(115200);       // initialize serial communication with your computer
  Mouse.begin();            // take control of the mouse
  delay(1000);
} 

void loop()
{
  int mouseX = map(Joy_dead_zone(Joypad.readJoystickX()),-512, 512, 10, -10);  // map the X value to a range of movement for the mouse X
  int mouseY = map(Joy_dead_zone(Joypad.readJoystickY()),-512, 512, -10, 10);  // map the Y value to a range of movement for the mouse Y

  Serial.println();
  Serial.print("[mouse] X: ");
  Serial.print(mouseX);
  Serial.print("[mouse] Y: ");
  Serial.println(mouseY);
  
  Mouse.move(mouseX, mouseY, 0);                 // move the mouse

  if (!Joypad.readButton(CH_SWITCH_3)) 
    Mouse.press(MOUSE_LEFT);
  else 
    Mouse.release(MOUSE_LEFT);

  if (!Joypad.readButton(CH_SWITCH_4)) 
    Mouse.press(MOUSE_RIGHT);
  else 
    Mouse.release(MOUSE_RIGHT);

  delay(10);      // a short delay before moving again
}