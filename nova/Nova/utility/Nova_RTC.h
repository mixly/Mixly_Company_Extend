#ifndef _NOVA_RTC_h_
#define _NOVA_RTC_h_
#include "Arduino.h"
#include "Nova.h"
#include "Wire.h"
#include "utility/SoftI2CMaster.h"

#define RTC_I2C_ADDRESS 0x68
#define DS1307_I2C_ADDRESS RTC_I2C_ADDRESS

//星期
#define MON 1
#define TUE 2
#define WED 3
#define THU 4
#define FRI 5
#define SAT 6
#define SUN 7

//月份
/*
#define Jan	1
#define	Feb	2
#define Mar	3
#define	Apr	4
#define	May 5
#define Jun 6
#define Jul 7
#define Aug 8
#define Sep 9
#define Oct 10
#define Nov 11
#define Dec 12
*/
class RTC
{
private:
	uint8_t decToBcd(uint8_t val);
	uint8_t bcdToDec(uint8_t val);
	uint8_t type;
public:
	RTC(uint8_t port);
	void startClock(void);
	void stopClock(void);
	void setTime(void);
	void getTime(void);
	uint8_t getsecond(void);
	uint8_t getminute(void);
	uint8_t gethour(void);
	uint8_t getdayOfWeek(void);
	uint8_t getdayOfMonth(void);
	uint8_t getmonth(void);
	uint8_t getyear(void);
	void fillByHMS(uint8_t _hour, uint8_t _minute, uint8_t _second);
	void fillByYMD(uint16_t _year, uint8_t _month, uint8_t _day);
	void fillDayOfWeek(uint8_t _dow);
	uint8_t second;
	uint8_t minute;
	uint8_t hour; 
	uint8_t dayOfWeek;// day of week, 1 = Monday
	uint8_t dayOfMonth;
	uint8_t month;
	uint16_t year;
};
#endif