

#if defined(ARDUINO) && ARDUINO >= 100
#include "Arduino.h"
#else
#include "WProgram.h"
#endif

#include "Rtc_Pcf8563.h"

Rtc_Pcf8563::Rtc_Pcf8563(void)
{
	devAddr = RTCC_R>>1;	
}

void Rtc_Pcf8563::begin()
{  	 
	Wire.begin();
}

void Rtc_Pcf8563::initClock()
{  	 
	begin();
}


uint8_t Rtc_Pcf8563::decToBcd(uint8_t val)
{
  return ( (val/10*16) + (val%10) );
}

uint8_t Rtc_Pcf8563::bcdToDec(uint8_t val)
{
  return ( (val/16*10) + (val%16) );
}


void Rtc_Pcf8563::clearStatus()
{
	status1 = 0;
	status2 = 0;
	Wire.beginTransmission(devAddr);	// Issue I2C start signal
	Wire.write(RTCC_STAT1_ADDR);
	Wire.write(status1); 				//control/status1
	Wire.write(status2); 				//control/status2
	Wire.endTransmission();  
}


void Rtc_Pcf8563::setTime(uint8_t _hour, uint8_t _minute, uint8_t _second)
{
	Wire.beginTransmission(devAddr);	// Issue I2C start signal
	Wire.write(RTCC_SEC_ADDR);   	// send addr low byte, req'd
	Wire.write(decToBcd(_second)); 		//set seconds
	Wire.write(decToBcd(_minute));	//set minutes
	Wire.write(decToBcd(_hour));		//set hour
	Wire.endTransmission();
   
}


void Rtc_Pcf8563::getTime()
{  
	/* set the start byte , get the 2 status bytes */
	Wire.beginTransmission(devAddr);
 	Wire.write(RTCC_SEC_ADDR);
 	Wire.endTransmission();
  	
 	Wire.requestFrom(devAddr, 3u); //request 5 bytes
 	dateTime.second = bcdToDec(Wire.read() & 0x7F);
	dateTime.minute = bcdToDec(Wire.read() & 0x7F);
	dateTime.hour = bcdToDec(Wire.read() & 0x3F);
}



void Rtc_Pcf8563::setDate(uint8_t _day, uint8_t _weekday, uint8_t _month, uint16_t _year)
{
    /* year val is 00 to 99, xx
        with the highest bit of month = century
        0=20xx
        1=19xx
        */
    uint8_t monBuf = decToBcd(_month);
	uint8_t yearBuf = decToBcd((uint8_t)(_year%100));
    if (_year < 2000){
        monBuf |= RTCC_CENTURY_MASK;
    }else {
        monBuf &= ~RTCC_CENTURY_MASK;
    }
    Wire.beginTransmission(devAddr);    // Issue I2C start signal
    Wire.write(RTCC_DAY_ADDR);
    Wire.write(decToBcd(_day));            //set day
    Wire.write(decToBcd(_weekday));    //set weekday
    Wire.write(monBuf);                         //set month, century to 1
    Wire.write(yearBuf);        //set year to 99
    Wire.endTransmission();
}

void Rtc_Pcf8563::setDate(uint8_t _day, uint8_t _weekday, uint8_t _month, uint8_t _y,uint16_t _year){
	setDate(_day,_weekday,_month,_year);
}

void Rtc_Pcf8563::getDate()
{  
	/* set the start byte of the date data */
	Wire.beginTransmission(devAddr);
 	Wire.write(RTCC_DAY_ADDR);
 	Wire.endTransmission();
  	
 	Wire.requestFrom(devAddr, 4u); //request 4 bytes
	//0x3f = 0b00111111
	dateTime.day = bcdToDec(Wire.read() & 0x3F);
	//0x07 = 0b00000111
	dateTime.weekday = bcdToDec(Wire.read() & 0x07);
	//get raw month data byte and set month and century with it.
	dateTime.month = Wire.read();
	dateTime.year = bcdToDec(Wire.read());
	if (dateTime.month & RTCC_CENTURY_MASK) {
		dateTime.year += 1900;
	}else {
		dateTime.year += 2000;
	}
	//0x1f = 0b00011111
	dateTime.month = bcdToDec(dateTime.month & 0x1F);
}


void Rtc_Pcf8563::setDateTime(DateTime _dateTime)
{
	uint8_t monBuf = decToBcd(_dateTime.month);
	uint8_t yearBuf = decToBcd((uint8_t)(_dateTime.year%100));
    if (_dateTime.year < 2000){
        monBuf |= RTCC_CENTURY_MASK;
    }else {
        monBuf &= ~RTCC_CENTURY_MASK;
    }	
	Wire.beginTransmission(devAddr);	// Issue I2C start signal
	Wire.write(RTCC_SEC_ADDR);   	// send addr low byte, req'd
	Wire.write(decToBcd(_dateTime.second)); 		//set seconds
	Wire.write(decToBcd(_dateTime.minute));	//set minutes
	Wire.write(decToBcd(_dateTime.hour));		//set hour
    Wire.write(decToBcd(_dateTime.day));            //set day
    Wire.write(decToBcd(_dateTime.weekday));    //set weekday
    Wire.write(monBuf);                         //set month, century to 1
    Wire.write(yearBuf);        //set year to 99
    Wire.endTransmission();  
}


DateTime Rtc_Pcf8563::getDateTime()
{
	/* set the start byte , get the 2 status bytes */
	Wire.beginTransmission(devAddr);
 	Wire.write(RTCC_SEC_ADDR);
 	Wire.endTransmission();
  	
 	Wire.requestFrom(devAddr, 7u); //request 5 bytes
 	dateTime.second = bcdToDec(Wire.read() & 0x7F);
	dateTime.minute = bcdToDec(Wire.read() & 0x7F);
	dateTime.hour = bcdToDec(Wire.read() & 0x3F);
	dateTime.day = bcdToDec(Wire.read() & 0x3F);
	dateTime.weekday = bcdToDec(Wire.read() & 0x07);
	dateTime.month = Wire.read();
	dateTime.year = bcdToDec(Wire.read());
	if (dateTime.month & RTCC_CENTURY_MASK) {
		dateTime.year += 1900;
	}else {
		dateTime.year += 2000;
	}
	dateTime.month = bcdToDec(dateTime.month & 0x1F);
	return dateTime;
}



/* set the alarm values
 * whenever the clock matches these values an int will
 * be sent out pin 3 of the Pcf8563 chip
 */
void Rtc_Pcf8563::setAlarm(uint8_t _minute, uint8_t _hour, uint8_t _day, uint8_t _weekday, uint8_t _enable)
{
    _minute = decToBcd(constrain(_minute, 0, 59))|RTCC_ALARM;
	_hour = decToBcd(constrain(_hour, 0, 23))|RTCC_ALARM;
	_day = decToBcd(constrain(_day, 1, 31))|RTCC_ALARM;
	_weekday = decToBcd(constrain(_weekday, 0, 6))|RTCC_ALARM;
	
	switch(_enable){
		case EN_MINUTE:
			_minute &= ~RTCC_ALARM;
			break;
		case EN_HOUR:
			_hour &= ~RTCC_ALARM;
			break;
		case EN_DAY:
			_day &= ~RTCC_ALARM;
			break;
		case EN_WEEKDAY:
			_weekday &= ~RTCC_ALARM;
			break;
		default:
			break;
	}

    //TODO bounds check  the inputs first
    Wire.beginTransmission(devAddr);    // Issue I2C start signal
    Wire.write(RTCC_ALRM_MIN_ADDR);
    Wire.write(_minute);                //minute alarm value reset to 00
    Wire.write(_hour);                //hour alarm value reset to 00
    Wire.write(_day);                //day alarm value reset to 00
    Wire.write(_weekday);            //weekday alarm value reset to 00
    Wire.endTransmission();	
}



void Rtc_Pcf8563::disableAlarm()
{
	setAlarm(0, 0, 0, 0, EN_NONE);	
}


/**
* Get alarm, set values to RTCC_NO_ALARM (99) if alarm flag is not set
*/
void Rtc_Pcf8563::getAlarm()
{
    /* set the start byte of the alarm data */
    Wire.beginTransmission(devAddr);
    Wire.write(RTCC_ALRM_MIN_ADDR);
    Wire.endTransmission();

    Wire.requestFrom(devAddr, 4u); //request 4 bytes
    alarmMinute = bcdToDec(Wire.read()&~RTCC_ALARM);
	alarmHour = bcdToDec(Wire.read()&~RTCC_ALARM);
	alarmDay = bcdToDec(Wire.read()&~RTCC_ALARM);
	alarmWeekday = bcdToDec(Wire.read()&~RTCC_ALARM);
}


/**
* Set the square wave pin output
*/
void Rtc_Pcf8563::setSquareWave(uint8_t frequency)
{
    Wire.beginTransmission(devAddr);    // Issue I2C start signal
    Wire.write(RTCC_SQW_ADDR);
    Wire.write(frequency);
    Wire.endTransmission();
}

void Rtc_Pcf8563::disableSquareWave()
{
    setSquareWave(SQW_DISABLE);
}


void Rtc_Pcf8563::setTimer(uint8_t frequency)
{
	Wire.beginTransmission(devAddr);    // Issue I2C start signal
    Wire.write(RTCC_TIMER_FRE_ADDR);
    Wire.write(frequency);
    Wire.endTransmission();
}


void Rtc_Pcf8563::disableTimer()
{
	setTimer(TIM_DISABLE);
}


void Rtc_Pcf8563::setTimerCnt(uint8_t count)
{
	Wire.beginTransmission(devAddr);    // Issue I2C start signal
    Wire.write(RTCC_TIMER_CNT_ADDR);
    Wire.write(count);
    Wire.endTransmission();
}


void Rtc_Pcf8563::clearAll()
{
	clearStatus();	
	disableAlarm();
	disableSquareWave();
	disableTimer();	
}


/* enable alarm interrupt
 * whenever the clock matches these values an int will
 * be sent out pin 3 of the Pcf8563 chip
 */
void Rtc_Pcf8563::enableAlarmInt()
{

    //set status2 AF val to zero
    status2 &= ~RTCC_STATUS_AF;
    //enable the interrupt
    status2 |= RTCC_STATUS_AIE;

    //enable the interrupt
    Wire.beginTransmission(devAddr);  // Issue I2C start signal
    Wire.write(RTCC_STAT2_ADDR);
    Wire.write(status2);
    Wire.endTransmission();
}

void Rtc_Pcf8563::disableAlarmInt()
{
	//set status2 AF val to zero to reset alarm 
	status2 &= ~RTCC_STATUS_AF;
	//turn off the interrupt
	status2 &= ~RTCC_STATUS_AIE;
		
	Wire.beginTransmission(devAddr);
	Wire.write(RTCC_STAT2_ADDR);
	Wire.write(status2); 
	Wire.endTransmission();  
}


/**
* Reset the alarm leaving interrupt unchanged
*/
void Rtc_Pcf8563::clearAlarmInt()
{
    //set status2 AF val to zero to reset alarm
    status2 &= ~RTCC_STATUS_AF;
    Wire.beginTransmission(devAddr);
    Wire.write(RTCC_STAT2_ADDR);
    Wire.write(status2);
    Wire.endTransmission();
}


void Rtc_Pcf8563::enableTimerInt()
{

    //set status2 AF val to zero
    status2 &= ~RTCC_STATUS_TF;
    //enable the interrupt
    status2 |= RTCC_STATUS_TIE;

    //enable the interrupt
    Wire.beginTransmission(devAddr);  // Issue I2C start signal
    Wire.write(RTCC_STAT2_ADDR);
    Wire.write(status2);
    Wire.endTransmission();
}

void Rtc_Pcf8563::disableTimerInt()
{
	//set status2 AF val to zero to reset alarm 
	status2 &= ~RTCC_STATUS_TF;
	//turn off the interrupt
	status2 &= ~RTCC_STATUS_TIE;
		
	Wire.beginTransmission(devAddr);
	Wire.write(RTCC_STAT2_ADDR);
	Wire.write(status2); 
	Wire.endTransmission();  
}


void Rtc_Pcf8563::clearTimerInt()
{
    //set status2 AF val to zero to reset alarm
    status2 &= ~RTCC_STATUS_TF;
    Wire.beginTransmission(devAddr);
    Wire.write(RTCC_STAT2_ADDR);
    Wire.write(status2);
    Wire.endTransmission();
}


/*
* Read status byte
*/
uint8_t Rtc_Pcf8563::readStatus2()
{
    /* set the start byte of the status 2 data */
    Wire.beginTransmission(devAddr);
    Wire.write(RTCC_STAT2_ADDR);
    Wire.endTransmission();

    Wire.requestFrom(devAddr, 1u); //request 1 bytes
    return Wire.read();
}

/*
* Returns true if AF is on
*
*/
boolean Rtc_Pcf8563::isAlarmed()
{
    return readStatus2() & RTCC_STATUS_AF;
}


boolean Rtc_Pcf8563::isCountdown()
{
    return readStatus2() & RTCC_STATUS_TF;
}


char *Rtc_Pcf8563::formatTime()
{
	//char strBuf[9];
	getTime();
	strBuf[0] = '0' + (dateTime.hour / 10);
	strBuf[1] = '0' + (dateTime.hour % 10);
	strBuf[2] = ':';
	strBuf[3] = '0' + (dateTime.minute / 10);
	strBuf[4] = '0' + (dateTime.minute % 10);
	strBuf[5] = ':';
	strBuf[6] = '0' + (dateTime.second / 10);
	strBuf[7] = '0' + (dateTime.second % 10);
	strBuf[8] = '\0';
 	return strBuf;
}
 

char *Rtc_Pcf8563::formatDate()
{
//	char strBuf[11];
	getDate();
	//do the asian style, yyyy-mm-dd
	strBuf[0] = '0' + (dateTime.year / 1000 );
	strBuf[1] = '0' + (dateTime.year % 1000 /100 );
	strBuf[2] = '0' + (dateTime.year % 100 /10 );
	strBuf[3] = '0' + (dateTime.year % 10);
	strBuf[4] = '-';	
	strBuf[5] = '0' + (dateTime.month / 10);
	strBuf[6] = '0' + (dateTime.month % 10);
	strBuf[7] = '-';
	strBuf[8] = '0' + (dateTime.day / 10);
	strBuf[9] = '0' + (dateTime.day % 10);
	strBuf[10] = '\0';
 	return strBuf;
}


uint8_t Rtc_Pcf8563::getSecond() {
 	return dateTime.second;
}

uint8_t Rtc_Pcf8563::getMinute() {
 	return dateTime.minute;
}

uint8_t Rtc_Pcf8563::getHour() {
 	return dateTime.hour;
}

uint8_t Rtc_Pcf8563::getDay() {
	return dateTime.day;
}

uint8_t Rtc_Pcf8563::getWeekday() {
	return dateTime.weekday;
}

uint8_t Rtc_Pcf8563::getMonth() {
	return dateTime.month;
}

uint16_t Rtc_Pcf8563::getYear() {
	return dateTime.year;
}


uint8_t Rtc_Pcf8563::getAlarmMinute() {
    return alarmMinute;
}

uint8_t Rtc_Pcf8563::getAlarmHour() {
    return alarmHour;
}

uint8_t Rtc_Pcf8563::getAlarmDay() {
    return alarmDay;
}

uint8_t Rtc_Pcf8563::getAlarmWeekday() {
    return alarmWeekday;
}

