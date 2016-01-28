#include "Makeblock.h"
#include <Wire.h>
#include <SoftwareSerial.h>

Me7SegmentDisplay disp(PORT_6);
void setup()
{
  disp.init();
  disp.set(BRIGHT_TYPICAL);//BRIGHT_TYPICAL = 2,BRIGHT_DARKEST = 0,BRIGHTEST = 7;
}
void loop()
{
  int8_t NumTab[] = {0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15};//0~9,A,b,C,d,E,F
  int8_t ListDisp[4];
  unsigned char i = 0;
  unsigned char count = 0;
  delay(150);
  while(1)
  {
    i = count;
    count ++;
    if(count == sizeof(NumTab)) count = 0;
    for(unsigned char BitSelect = 0;BitSelect < 4;BitSelect ++)
    {
      ListDisp[BitSelect] = NumTab[i];
      i ++;
      if(i == sizeof(NumTab)) i = 0;
    }
    disp.display(0,ListDisp[0]);
    disp.display(1,ListDisp[1]); 
    disp.display(2,ListDisp[2]);
    disp.display(3,ListDisp[3]);
    delay(300);
  }
}
