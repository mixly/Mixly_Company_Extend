
#include <Rtc_Pcf8563.h>

/* get a real time clock object */
Rtc_Pcf8563 rtc;
/* set a time to start with.
 * year, month, weekday, day, hour, minute, second */
DateTime dateTime = {2016, 6, 3, 1, 15, 30, 40};
/* a flag for the interrupt */
volatile int alarmFlag=0;
long timer=millis();

/* the interrupt service routine */
void blink(){
  alarmFlag=1;
}

void setup()
{
  pinMode(2, INPUT);           // set pin to input
  Serial.begin(9600);
  /* clear out all the registers */
  rtc.begin();
  rtc.clearAll();
  rtc.setDateTime(dateTime);
   
  rtc.setAlarm(30, 10, 0, 0, EN_HOUR);
  rtc.enableAlarmInt();
  Serial.println("debug set alarm");

  /* setup int on pin 2 of arduino */
  attachInterrupt(0, blink, FALLING);
}

void loop()
{
  if(millis()-timer>500)
  {
    /* each sec update the display */
    Serial.print(rtc.formatTime());
    Serial.print("  ");
    Serial.print(rtc.formatDate());
    Serial.print("  0x");
    Serial.print(rtc.readStatus2(), HEX);
    Serial.print("\r\n");
    timer=millis();  
  }

  if (alarmFlag==1){
    clrAlarm();
  }
}

void clrAlarm()
{
  Serial.print("blink!\r\n");
  rtc.clearAlarmInt();   
  detachInterrupt(0);
  alarmFlag=0;
  attachInterrupt(0, blink, FALLING);
}