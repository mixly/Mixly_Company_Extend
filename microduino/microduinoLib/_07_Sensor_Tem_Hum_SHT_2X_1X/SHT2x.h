/*
  SHT2x - A Humidity Library for Arduino.

  Supported Sensor modules:
    SHT21-Breakout Module - http://www.moderndevice.com/products/sht21-humidity-sensor
	SHT2x-Breakout Module - http://www.misenso.com/products/001
	
  Created by Christopher Ladden at Modern Device on December 2009.
  
  Modified by www.misenso.com on October 2011:
	- code optimisation
	- compatibility with Arduino 1.0

  This library is free software; you can redistribute it and/or
  modify it under the terms of the GNU Lesser General Public
  License as published by the Free Software Foundation; either
  version 2.1 of the License, or (at your option) any later version.

  This library is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
  Lesser General Public License for more details.

  You should have received a copy of the GNU Lesser General Public
  License along with this library; if not, write to the Free Software
  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/


#ifndef SHT2X_H
#define SHT2X_H

#include <inttypes.h>

typedef enum {
    eSHT2xAddress = 0x40,
} HUM_SENSOR_T;

typedef enum {
    eTempHoldCmd		= 0xE3,
    eRHumidityHoldCmd	= 0xE5,
    eTempNoHoldCmd      = 0xF3,
    eRHumidityNoHoldCmd = 0xF5,
} HUM_MEASUREMENT_CMD_T;

class SHT2xClass
{
  private:
	uint16_t readSensor(uint8_t command);

  public:
    float GetHumidity(void);
    float GetTemperature(void);
};

extern SHT2xClass SHT2x;

#endif
