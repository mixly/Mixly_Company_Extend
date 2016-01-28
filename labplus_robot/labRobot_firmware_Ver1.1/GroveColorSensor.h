/****************************************************************************/	
//	Hardware: Grove - I2C Color Sensor
//  Arduino IDE: Arduino-1.6
//  
//  Author: Isaac Drafton
//	Version: 0.9
//  Refactored version of the library by FrankieChu - www.seeedstudio.com
//	
/******************************************************************************/

#ifndef GROVECOLORSENSOR
#define GROVECOLORSENSOR

#if defined(ARDUINO) && ARDUINO >= 100
  #include "Arduino.h"
#else
  #include "WProgram.h"
#endif
#include <Registers.h>

#define COLOR_LIGHT_PIN 26

typedef enum{
	WHITE,
	BLACK,
	RED,
	GREEN,
	BLUE,
	UNKNOW_COLOR,
}COLOR;

typedef union{
	uint8_t byteData[2];
	int  intData;
}INT2BYTE;

typedef union{
	uint8_t byteData[4];
	float floatData;
}FLOAT2BYTE;

typedef struct {
	INT2BYTE r0;
	INT2BYTE g0; 
	INT2BYTE b0;
	FLOAT2BYTE kr;
	FLOAT2BYTE kb;
}PARAM_DATA;

class GroveColorSensor
{
public:

	// Color Sensor LED Status
	int ledStatus;
	// Default constructor
	GroveColorSensor();
	// Constructor with parameters
	GroveColorSensor(
		  const int& triggerMode
		, const int& interruptSource
		, const int& interruptMode
		, const int& gainAndPrescaler
		, const int& sensorAddress);
	
	void GroveColorInit();
	void readRGB();
	void readRGB(int *red, int *green, int *blue);
	void calculateCoordinate();
	void clearInterrupt();
	COLOR getColor();
	
private:	 
	 
	// Set trigger mode. Including free mode, manually mode, single synchronization mode or so.
	void setTimingReg();
	// Set interrupt source
	void setInterruptSourceReg();
	// Set interrupt mode
	void setInterruptControlReg();
	// Set gain value and pre-scaler value
	void setGain();
	// Start ADC of the colour sensor
	void setEnableADC();
	
	// Used for storing the colour data
	int readingdata_[8];
	int green_;
	int red_;
	int blue_;
	int clear_;
	
	int R0_;
	int G0_;
	int B0_;
	float kr_;
	float kb_;
	
	int triggerMode_;	
	int interruptSource_;
	int interruptMode_;
	int gainAndPrescaler_;
	int sensorAddress_;
	int lightPin_;
	
};

#endif