/*
Nova_RTC

Serial port will print real time.

Created 15 Dec 2015
By Blue

http://easy.cc/wiki/index.php/Nova
*/

#include <Nova.h>

RTC rtc = RTC(C1);

void setup() {
Serial.begin(9600);
}

void loop() {

  printTime();
  delay(500);
}

void printTime()
{
	Serial.print(rtc.hour, DEC);
	Serial.print(":");
	Serial.print(rtc.minute, DEC);
	Serial.print(":");
	Serial.print(rtc.second, DEC);
	Serial.print("	");
	Serial.print(rtc.month, DEC);
	Serial.print("/");
	Serial.print(rtc.dayOfMonth, DEC);
	Serial.print("/");
	Serial.print(rtc.year+2000, DEC);
	Serial.println(" ");
}
