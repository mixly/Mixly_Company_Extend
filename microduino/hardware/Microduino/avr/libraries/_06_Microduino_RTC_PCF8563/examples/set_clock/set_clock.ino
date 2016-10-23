#include <Rtc_Pcf8563.h>

//init the real time clock
Rtc_Pcf8563 rtc;
//year, month, weekday, day, hour, minute, second
DateTime dateTime = {2016, 6, 3, 1, 15, 30, 40};

void setup()
{
  Serial.begin(9600);
  //clear out the registers
  rtc.begin();
  rtc.clearAll();
  //set a time to start with.
  rtc.setDateTime(dateTime);
}

void loop()
{
  //both format functions call the internal getTime() so that the 
  //formatted strings are at the current time/date.
  Serial.println("CODE_1:");
  Serial.print(rtc.formatTime());
  Serial.print("     ");
  Serial.print(rtc.formatDate());
  Serial.print("\r\n");

  dateTime = rtc.getDateTime();
  Serial.println("CODE_2:");
  Serial.print(dateTime.year);
  Serial.print("/");
  Serial.print(dateTime.month);
  Serial.print("/");
  Serial.print(dateTime.day);
  Serial.print("     ");
  Serial.print(dateTime.hour);
  Serial.print(":");
  Serial.print(dateTime.minute);
  Serial.print(":");
  Serial.print(dateTime.second);
  Serial.print("\r\n");

  delay(1000);
  Serial.print("\r\n");
}