#include "Nova_RTC.h"
#include "utility/SoftI2CMaster.h"
#include "string.h"

SoftI2CMaster i2c;

char Month[12][4] = {
	{"Jan"},
	{"Feb"},
	{"Mar"},
	{"Apr"},
	{"May"},
	{"Jun"},
	{"Jul"},
	{"Aug"},
	{"Sep"},
	{"Oct"},
	{"Nov"},
	{"Dec"}
};
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
	uint8_t count = 0;
	type = true;
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
			SCL_pin = S4_PIN_0;
			SDA_pin = S4_PIN_1;
		break;
		case S5:
			SCL_pin = S5_PIN_0;
			SDA_pin = S5_PIN_1;
		break;
	}
	if(type == true)
	{
		pinMode(SCL_pin,OUTPUT);
		pinMode(SDA_pin,OUTPUT);
		i2c.begin(SCL_pin, SDA_pin);
	}
	else
	{
		Wire.begin();
	}
	//if(state == true)
	{
		//获取月份
		for (int i = 0; i < 12; i++)
		{
			for(int j = 0; j < 3; j++)
			{
				if(STRING_VERSION_CONFIG_H[j] == Month[i][j])
					count++;
				else
					count = 0;
			}
			if(count == 3)
			{
				month = i+1;
				break;
			}
		}
		//获取几号
		dayOfMonth=(STRING_VERSION_CONFIG_H[4]-48)*10+(STRING_VERSION_CONFIG_H[5]-48);
		for(int i = 7; i <= 10; i++)
		{
			year = year*10;
			year +=(STRING_VERSION_CONFIG_H[i]-48);
		}
		year -=2000;
		hour = (STRING_VERSION_CONFIG_H[12]-48)*10+(STRING_VERSION_CONFIG_H[13]-48);
		minute = (STRING_VERSION_CONFIG_H[15]-48)*10+(STRING_VERSION_CONFIG_H[16]-48);
		second = (STRING_VERSION_CONFIG_H[18]-48)*10+(STRING_VERSION_CONFIG_H[19]-48);
		setTime();
		setTime();
	}
}
/*Function: The clock timing will start */
void RTC::startClock(void)        // set the ClockHalt bit low to start the rtc
{
	if(type == true)
	{
	  i2c.beginTransmission(RTC_I2C_ADDRESS);
	  i2c.write((uint8_t)0x00);                      // Register 0x00 holds the oscillator start/stop bit
	  i2c.endTransmission();
	  i2c.requestFrom(RTC_I2C_ADDRESS);
	  second = i2c.read() & 0x7f;       // save actual seconds and AND sec with bit 7 (sart/stop bit) = clock started
	  i2c.beginTransmission(RTC_I2C_ADDRESS);
	  i2c.write((uint8_t)0x00);
	  i2c.write((uint8_t)second);                    // write seconds back and start the clock
	  i2c.endTransmission();
	}
	else
	{
		Wire.beginTransmission(DS1307_I2C_ADDRESS);
		Wire.write((uint8_t)0x00);                      // Register 0x00 holds the oscillator start/stop bit
		Wire.endTransmission();
		Wire.requestFrom(DS1307_I2C_ADDRESS, 1);
		second = Wire.read() & 0x7f;       // save actual seconds and AND sec with bit 7 (sart/stop bit) = clock started
		Wire.beginTransmission(DS1307_I2C_ADDRESS);
		Wire.write((uint8_t)0x00);
		Wire.write((uint8_t)second);                    // write seconds back and start the clock
		Wire.endTransmission();
	}
}
/*Function: The clock timing will stop */
void RTC::stopClock(void)         // set the ClockHalt bit high to stop the rtc
{
	if(type == true)
	{
	  i2c.beginTransmission(RTC_I2C_ADDRESS);
	  i2c.write((uint8_t)0x00);                      // Register 0x00 holds the oscillator start/stop bit
	  i2c.endTransmission();
	  i2c.requestFrom(RTC_I2C_ADDRESS);
	  second = i2c.read() | 0x80;       // save actual seconds and OR sec with bit 7 (sart/stop bit) = clock stopped
	  i2c.beginTransmission(RTC_I2C_ADDRESS);
	  i2c.write((uint8_t)0x00);
	  i2c.write((uint8_t)second);                    // write seconds back and stop the clock
	  i2c.endTransmission();
	}
	else
	{
		Wire.beginTransmission(DS1307_I2C_ADDRESS);
		Wire.write((uint8_t)0x00);                      // Register 0x00 holds the oscillator start/stop bit
		Wire.endTransmission();
		Wire.requestFrom(DS1307_I2C_ADDRESS, 1);
		second = Wire.read() | 0x80;       // save actual seconds and OR sec with bit 7 (sart/stop bit) = clock stopped
		Wire.beginTransmission(DS1307_I2C_ADDRESS);
		Wire.write((uint8_t)0x00);
		Wire.write((uint8_t)second);                    // write seconds back and stop the clock
		Wire.endTransmission();
	}
}
/****************************************************************/
/*Function: Read time and date from RTC	*/
void RTC::getTime()
{
    // Reset the register pointer
    if(type == true)
    {
		do
		{
			i2c.beginTransmission(RTC_I2C_ADDRESS);
			i2c.write((uint8_t)0x00);
			i2c.endTransmission();  
			delay(20);
			i2c.requestFrom(RTC_I2C_ADDRESS);
			// A few of these need masks because certain bits are control bits
			second	   = bcdToDec(i2c.read() & 0x7f);
			minute	   = bcdToDec(i2c.read());
			hour	   = bcdToDec(i2c.read() & 0x3f);// Need to change this if 12 hour am/pm
			dayOfWeek  = bcdToDec(i2c.read());
			dayOfMonth = bcdToDec(i2c.read());
			month      = bcdToDec(i2c.read());
			year	   = bcdToDec(i2c.read());
			i2c.endTransmission();
		}while(hour > 24);//Until the correct value is read
    }
    else
    {
		Wire.beginTransmission(DS1307_I2C_ADDRESS);
		Wire.write((uint8_t)0x00);
		Wire.endTransmission();  
		Wire.requestFrom(DS1307_I2C_ADDRESS, 7);
		// A few of these need masks because certain bits are control bits
		second	   = bcdToDec(Wire.read() & 0x7f);
		minute	   = bcdToDec(Wire.read());
		hour	   = bcdToDec(Wire.read() & 0x3f);// Need to change this if 12 hour am/pm
		dayOfWeek  = bcdToDec(Wire.read());
		dayOfMonth = bcdToDec(Wire.read());
		month      = bcdToDec(Wire.read());
		year	   = bcdToDec(Wire.read());
    }
}
/*******************************************************************/
/*Frunction: Write the time that includes the date to the RTC chip */
void RTC::setTime()
{
	if(type == true)//software iic
	{
		i2c.beginTransmission(RTC_I2C_ADDRESS);
		i2c.write((uint8_t)0x00);
		i2c.write(decToBcd(second));// 0 to bit 7 starts the clock
		i2c.write(decToBcd(minute));
		i2c.write(decToBcd(hour));  // If you want 12 hour am/pm you need to set bit 6 
		i2c.write(decToBcd(dayOfWeek));
		i2c.write(decToBcd(dayOfMonth));
		i2c.write(decToBcd(month));
		i2c.write(decToBcd(year));
		i2c.endTransmission();
	}
	else
	{
		Wire.beginTransmission(DS1307_I2C_ADDRESS);
		Wire.write((uint8_t)0x00);
		Wire.write(decToBcd(second));// 0 to bit 7 starts the clock
		Wire.write(decToBcd(minute));
		Wire.write(decToBcd(hour));  // If you want 12 hour am/pm you need to set bit 6 
		Wire.write(decToBcd(dayOfWeek));
		Wire.write(decToBcd(dayOfMonth));
		Wire.write(decToBcd(month));
		Wire.write(decToBcd(year));
		Wire.endTransmission();
	}
}
void RTC::fillByHMS(uint8_t _hour, uint8_t _minute, uint8_t _second)
{
	// assign variables
	hour = _hour;
	minute = _minute;
	second = _second;
}
void RTC::fillByYMD(uint16_t _year, uint8_t _month, uint8_t _day)
{
	year = _year-2000;
	month = _month;
	dayOfMonth = _day;
}
void RTC::fillDayOfWeek(uint8_t _dow)
{
	dayOfWeek = _dow;
}
uint8_t RTC::getsecond(void)
{
    getTime();
	return second;
}
uint8_t RTC::getminute(void)
{
    getTime();
	return minute;
}
uint8_t RTC::gethour(void)
{
    getTime();
	return hour;
}
uint8_t RTC::getdayOfWeek(void)
{
    getTime();
	return dayOfWeek;
}
uint8_t RTC::getdayOfMonth(void)
{
    getTime();
	return dayOfMonth;
}
uint8_t RTC::getmonth(void)
{
    getTime();
	return month;
}
uint8_t RTC::getyear(void)
{
    getTime();
	return year+2000;
}