/*
 1.Set the dead zone and make sure the value stability of Joystick in zero.  
 2.Move Joystick around to the fullest so that it can be adjusted.    
 3.Input 'e' in the serial port to end the adjustment.    
 4.Treat Joy_MID as the mid-value of the Joystick in the main program and 一Joy_maximum as the range of plus or minus.   
 -------------------------------------------------------------------------
 wiki:https://www.microduino.cc/wiki/index.php?title=Microduino-Joypad
 */

#include <Joypad.h>

#define joy_DEAD_ZONE 25
#define Joy_maximum 500
#define Joy_MID 1500

int joy_correct_max[4],joy_correct_min[4];
int Joy_x,Joy_y,Joy1_x,Joy1_y;


int Joy_dead_zone(int _Joy_vol)
{
  if(abs(_Joy_vol)>joy_DEAD_ZONE)
    return ((_Joy_vol>0) ? (_Joy_vol-joy_DEAD_ZONE) : (_Joy_vol+joy_DEAD_ZONE));
  else
    return 0;
}

int Joy_i(int _Joy_i,boolean _Joy_b,int _Joy_MIN,int _Joy_MAX)
{
  int _Joy_a;
  switch(_Joy_i)
  {
  case 0:
    _Joy_a=Joy_dead_zone(Joypad.readJoystickX());
    break;
  case 1:
    _Joy_a=Joy_dead_zone(Joypad.readJoystickY());
    break;
  case 2:
    _Joy_a=Joy_dead_zone(Joypad.readJoystick1X());
    break;
  case 3:
    _Joy_a=Joy_dead_zone(Joypad.readJoystick1Y());
    break;
  }

  if(_Joy_b)
  {
    if(_Joy_a<0)
      _Joy_a=map(_Joy_a, joy_correct_min[_Joy_i],0, _Joy_MAX, Joy_MID);
    else
      _Joy_a=map(_Joy_a, 0,joy_correct_max[_Joy_i], Joy_MID, _Joy_MIN);

    if(_Joy_a<_Joy_MIN) _Joy_a=_Joy_MIN;
    if(_Joy_a>_Joy_MAX) _Joy_a=_Joy_MAX;
  }
  return _Joy_a;
}

void Joy_correct()
{
  for(int a=0;a<4;a++)
  {
    int _c;
    _c=Joy_i(a,false,Joy_MID-Joy_maximum,Joy_MID+Joy_maximum);

    if(_c>joy_correct_max[a])
      joy_correct_max[a]=_c;

    if(_c<joy_correct_min[a])
      joy_correct_min[a]=_c;
  }

  Serial.println("");
  Serial.println("input 'e' to exit correct");
  Serial.print("joy_correct_min: ");
  for(int a=0;a<4;a++)
  {
    Serial.print(joy_correct_min[a]);
    if(a!=3)
      Serial.print(",");
    else
      Serial.println("");
  }

  Serial.print("joy_correct_max: ");
  for(int a=0;a<4;a++)
  {
    Serial.print(joy_correct_max[a]);
    if(a!=3)
      Serial.print(",");
    else
      Serial.println("");
  }
}

void setup() {
  Serial.begin(115200);

  Serial.println("\n\rCorrect IN...");
  delay(1000);
  for(int a=0;a<4;a++)  joy_correct_min[a]=0,joy_correct_max[a]=0;
  while(1)
  {
    Joy_correct();
    if(Serial.available())
      if(Serial.read()=='e')
        break;
  }
  Serial.println("\n\rCorrect OUT...");
  delay(1000);
}

void loop() {
  Serial.println();

  Serial.print("[Joy] X: ");
  Serial.print(Joy_i(0,true,Joy_MID-Joy_maximum,Joy_MID+Joy_maximum));
  Serial.print(",Y: ");
  Serial.println(Joy_i(1,true,Joy_MID-Joy_maximum,Joy_MID+Joy_maximum));

  Serial.print("[Joy1] X: ");
  Serial.print(Joy_i(2,true,Joy_MID-Joy_maximum,Joy_MID+Joy_maximum));
  Serial.print(",Y: ");
  Serial.println(Joy_i(3,true,Joy_MID-Joy_maximum,Joy_MID+Joy_maximum));

  delay(200);
}
