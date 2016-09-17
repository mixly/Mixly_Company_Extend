#include "Nova_RTC.h"
#include <utility/SoftIIC.h>
#include "string.h"

#define USE_SOFT_I2C 1

SoftIIC ds1307;

uint8_t RTC::decToBcd(uint8_t val)
{
	return ( (val/10*16) + (val%10) );
}

//Convert binary coded decimal to normal decimal numbers
uint8_t RTC::bcdToDec(uint8_t val)
{
	return ( (val/16*10) + (val%16) );
}

RTC::RTC(uint8_t port)
{
	uint8_t SCL_pin,SDA_pin;

	switch(port)
  {
    case C0:
      SCL_pin = C0_PIN_1;
      SDA_pin = C0_PIN_0;
    break;
    case C1:
      SCL_pin = C1_PIN_0;
      SDA_pin = C1_PIN_1;
    break;
    case S4:
      SCL_pin = S4_PIN_1;
      SDA_pin = S4_PIN_0;
    break;
    case S5:
      SCL_pin = S5_PIN_1;
      SDA_pin = S5_PIN_0;
    break;
        case M0:
      SCL_pin = M0_PIN_1;
      SDA_pin = M0_PIN_0;
    break;
        case M1:
      SCL_pin = M1_PIN_1;
      SDA_pin = M1_PIN_0;
    break;
  }

    ds1307.begin(SDA_pin, SCL_pin);
}

/*
 * Read 'count' bytes from the DS1307 starting at 'address'
 */
uint8_t RTC::readDS1307(uint8_t address, uint8_t *buf, uint8_t count) {
  // issue a start condition, send device address and write direction bit
  if (!ds1307.start(DS1307ADDR | I2C_WRITE)) return false;

  // send the DS1307 address
  if (!ds1307.write(address)) return false;

  // issue a repeated start condition, send device address and read direction bit
  if (!ds1307.restart(DS1307ADDR | I2C_READ))return false;

  // read data from the DS1307
  for (uint8_t i = 0; i < count; i++) {

    // send Ack until last byte then send Ack
    buf[i] = ds1307.read(i == (count-1));
  }

  // issue a stop condition
  ds1307.stop();
  return true;
}
//------------------------------------------------------------------------------
/*
 * write 'count' bytes to DS1307 starting at 'address'
 */
uint8_t RTC::writeDS1307(uint8_t address, uint8_t *buf, uint8_t count) {
  // issue a start condition, send device address and write direction bit
  if (!ds1307.start(DS1307ADDR | I2C_WRITE)) return false;

  // send the DS1307 address
  if (!ds1307.write(address)) return false;

  // send data to the DS1307
  for (uint8_t i = 0; i < count; i++) {
    if (!ds1307.write(buf[i])) return false;
  }

  // issue a stop condition
  ds1307.stop();
  return true;
}

/****************************************************************/
/*Function: Read time and date from RTC	*/
void RTC::getTime()
{
    uint8_t r[8];
    
    if (!readDS1307(0, r, 7)) 
    {
        return;
    }
  
	second	   = bcdToDec(r[0] & 0x7f);
	minute	   = bcdToDec(r[1]);
	hour	   = bcdToDec(r[2] & 0x3f);// Need to change this if 12 hour am/pm
	week  	   = bcdToDec(r[3]);
	day        = bcdToDec(r[4]);
	month      = bcdToDec(r[5]);
	year	   = bcdToDec(r[6]);
}

/*******************************************************************/


void RTC::fillByHMS(uint8_t _hour, uint8_t _minute, uint8_t _second)
{
    uint8_t r[3];
	// assign variables
	r[2] = decToBcd(_hour);
	r[1] = decToBcd(_minute);
	r[0] = decToBcd(_second);
	  
    if (!writeDS1307(0, r, 3)) 
    {
        return;
    }
}

void RTC::fillByYMD(uint16_t _year, uint8_t _month, uint8_t _day)
{ 
    uint8_t r[3];
	// assign variables
	r[2] = decToBcd(_year-2000);
	r[1] = decToBcd(_month);
	r[0] = decToBcd(_day);
	  
    if (!writeDS1307(4, r, 3)) 
    {
        return;
    }  
}

void RTC::fillByWeek(uint8_t _week)
{
    uint8_t r[1];
    
	r[0] = decToBcd(_week);
	  
    if (!writeDS1307(3, r, 1)) 
    {
        return;
    } 
}

uint8_t RTC::getSecond(void)
{
    getTime();
	return second;
}
uint8_t RTC::getMinute(void)
{
    getTime();
	return minute;
}
uint8_t RTC::getHour(void)
{
    getTime();
	return hour;
}
uint8_t RTC::getWeek(void)
{
    getTime();
	return week;
}
uint8_t RTC::getDay(void)
{
    getTime();
	return day;
}
uint8_t RTC::getMonth(void)
{
    getTime();
	return month;
}
uint16_t RTC::getYear(void)
{
    getTime();
	return year+2000;
}