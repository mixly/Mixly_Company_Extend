#include "Makeblock.h"
#include <SoftwareSerial.h>
#include <Wire.h>

int8_t TimeDisp[] = {0x00,0x00,0x00,0x00};
unsigned char second;
unsigned char minute = 0;
unsigned char hour = 12;
long lastTime = 0;

Me7SegmentDisplay disp(PORT_6);

void setup()
{
  disp.set();
  disp.init();
}
void loop()
{
  if(millis()-lastTime>=1000){
    TimingISR();
    
      TimeUpdate();
      disp.display(TimeDisp);
    
    lastTime = millis();
  }
}
void TimingISR()
{
  second ++;
  if(second == 60)
  {
    minute ++;
    if(minute == 60)
    {
      hour ++;
      if(hour == 24)hour = 0;
      minute = 0;
    }
    second = 0;
  }
}
void TimeUpdate(void)
{
  TimeDisp[0] = minute / 10;
  TimeDisp[1] = minute % 10;
  TimeDisp[2] = second / 10;
  TimeDisp[3] = second % 10;
}
