#ifndef _NOVA_RTC_h_
#define _NOVA_RTC_h_
#include "Arduino.h"
#include "Nova.h"


#define DS1307ADDR 0XD0

//星期
#define MON 1
#define TUE 2
#define WED 3
#define THU 4
#define FRI 5
#define SAT 6
#define SUN 7


class RTC
{
private:
	void getTime(void);
	uint8_t decToBcd(uint8_t val);
	uint8_t bcdToDec(uint8_t val);
    uint8_t readDS1307(uint8_t address, uint8_t *buf, uint8_t count);
    uint8_t writeDS1307(uint8_t address, uint8_t *buf, uint8_t count);
	uint8_t second;
	uint8_t minute;
	uint8_t hour; 
	uint8_t week;// day of week, 1 = Monday
	uint8_t day;
	uint8_t month;
	uint16_t year;
public:
	RTC(uint8_t port);
	uint8_t getSecond(void);
	uint8_t getMinute(void);
	uint8_t getHour(void);
	uint8_t getWeek(void);
	uint8_t getDay(void);
	uint8_t getMonth(void);
	uint16_t getYear(void);
	void fillByHMS(uint8_t _hour, uint8_t _minute, uint8_t _second);
	void fillByYMD(uint16_t _year, uint8_t _month, uint8_t _day);
	void fillByWeek(uint8_t _week);
};
#endif