/*
	代码悠改部分：
	1。修改白平衡调整系数值，R;1.35, b:1.00
	2. 修改滤镱电码：
	   if(green_ < 0.8*maxColor && green_ >= 0.6*maxColor)改为
	   if(green_ < 0.76*maxColor && green_ >= 0.6*maxColor)
	3. 添加颜色识别函数： COLOR_TYPE readRGB()
    4. 去掉辅助LED开关状态指示，辅助光源一直开启
*/
#include "Arduino.h"
#include "GroveColorSensor.h"
#include <Wire.h>
#include <math.h>
#include "EEPROM.h"

// Default constructor
GroveColorSensor::GroveColorSensor()
	// : triggerMode_(INTEG_MODE_FREE | INTEG_PARAM_PULSE_COUNT1)
	// , interruptSource_(INT_SOURCE_CLEAR)
	// , interruptMode_(INTR_LEVEL | INTR_PERSIST_EVERY)
	// , gainAndPrescaler_(GAIN_1 | PRESCALER_1)
	// , sensorAddress_(COLOR_SENSOR_ADDR)
	// , lightPin_(COLOR_LIGHT_PIN)
{	
	triggerMode_ = INTEG_MODE_FREE | INTEG_PARAM_PULSE_COUNT1;
	interruptSource_ = INT_SOURCE_CLEAR;
	interruptMode_ = INTR_LEVEL | INTR_PERSIST_EVERY;
	gainAndPrescaler_ = GAIN_4 | PRESCALER_1;
	sensorAddress_ = COLOR_SENSOR_ADDR;
	lightPin_ = COLOR_LIGHT_PIN;
	// GroveColorSensor::setTimingReg(); 
	// GroveColorSensor::setInterruptSourceReg();  
	// GroveColorSensor::setInterruptControlReg(); 
	// GroveColorSensor::setGain(); 
	// GroveColorSensor::setEnableADC(); 
}

// Constructor with parameters
GroveColorSensor::GroveColorSensor(
	  const int& triggerMode
	, const int& interruptSource
	, const int& interruptMode
	, const int& gainAndPrescaler
	, const int& sensorAddress)
	: triggerMode_(triggerMode)
	, interruptSource_(interruptSource)
	, interruptMode_(interruptMode)
	, gainAndPrescaler_(gainAndPrescaler)
	, sensorAddress_(sensorAddress) 
{}

void GroveColorSensor::setTimingReg()
{
	Wire.beginTransmission(sensorAddress_);
	Wire.write(REG_TIMING);
	Wire.write(triggerMode_);
	Wire.endTransmission();  
	delay(10); 
}

void GroveColorSensor::setInterruptSourceReg()
{
	Wire.beginTransmission(sensorAddress_);
	Wire.write(REG_INT_SOURCE);
	Wire.write(interruptSource_);
	Wire.endTransmission();  
	delay(10);
}

void GroveColorSensor::setInterruptControlReg()
{
	Wire.beginTransmission(sensorAddress_);
	Wire.write(REG_INT);
	Wire.write(interruptMode_);
	Wire.endTransmission();  
	delay(10);
}

void GroveColorSensor::setGain()
{
	Wire.beginTransmission(sensorAddress_);
	Wire.write(REG_GAIN);
	Wire.write(gainAndPrescaler_);
	Wire.endTransmission();
}

void GroveColorSensor::setEnableADC()
{
	Wire.beginTransmission(sensorAddress_);
	Wire.write(REG_CTL);
	Wire.write(CTL_DAT_INIITIATE);
	Wire.endTransmission();  
	delay(10);  
}

void GroveColorSensor::clearInterrupt()
{
	Wire.beginTransmission(sensorAddress_);
	Wire.write(CLR_INT);
	Wire.endTransmission(); 
}

void GroveColorSensor::GroveColorInit() 
{
	uint8_t i;
	uint8_t *pparamData;
    PARAM_DATA  paramData;
	pparamData = (uint8_t *)&paramData;
	
	GroveColorSensor::setTimingReg(); 
	GroveColorSensor::setInterruptSourceReg();  
	GroveColorSensor::setInterruptControlReg(); 
	GroveColorSensor::setGain(); 
	GroveColorSensor::setEnableADC(); 
	
	pinMode(lightPin_,OUTPUT);
	digitalWrite(lightPin_,LOW);
	
	for(i=0; i<14; i++)
	{
		pparamData[i] = EEPROM.read(i);
	}
	R0_ = paramData.r0.intData;
	G0_ = paramData.g0.intData;
	B0_ = paramData.b0.intData;
	kr_ = paramData.kr.floatData;
	kb_ = paramData.kb.floatData;
}

void GroveColorSensor::readRGB()
{
	Wire.beginTransmission(sensorAddress_);
	Wire.write(REG_BLOCK_READ);
	Wire.endTransmission();
	
	Wire.beginTransmission(sensorAddress_);
	Wire.requestFrom(sensorAddress_, 8);
	delay(100);

	// if two bytes were received
	if(8 <= Wire.available())
	{
		int i;
		for(i = 0; i < 8; ++i)
		{
			readingdata_[i] = Wire.read();
			//Serial.println(readingdata_[i], BIN);
		}
	}
	green_	= readingdata_[1] * 256 + readingdata_[0];
	red_ 	= readingdata_[3] * 256 + readingdata_[2];
	blue_	= readingdata_[5] * 256 + readingdata_[4];
	clear_	= readingdata_[7] * 256 + readingdata_[6];
	
	Serial.print("The RGBC value are: RGBC( ");
	Serial.print(red_,DEC);
	Serial.print(", ");
	Serial.print(green_,DEC);
	Serial.print(", ");
	Serial.print(blue_,DEC);
	Serial.print(", ");
	Serial.println(" )");
	Serial.print("The Clear channel value are: ");
	Serial.println(clear_,DEC);
	Serial.println(" )");
	
	red_ = red_ - R0_;
	green_ = green_ - G0_;
	blue_ = blue_ - B0_;
/* 	red_ = red_ - 10;
	green_ = green_ - 20;
	blue_ = blue_ - 20; */
	
	double tmp;
	int maxColor;


	// red_  = red_  * 1.62; //白平衡调整
	// blue_ = blue_ * 1.017;
	red_  = red_  * kr_; //白平衡调整
	blue_ = blue_ * kb_;

	maxColor = max(red_, green_);
	maxColor = max(maxColor, blue_);
	   
	if(maxColor > 255)
	{
		tmp = 250.0/maxColor;
		green_	*= tmp;
		red_ 	*= tmp;
		blue_	*= tmp;
	}
	
	int minColor = min(red_, green_);
	minColor = min(minColor, blue_);
	maxColor = max(red_, green_);
	maxColor = max(maxColor, blue_);
	
	int greenTmp = green_;
	int redTmp 	 = red_;
	int blueTmp	 = blue_;
	
	// Serial.print("The RGB value are: RGB( ");
	// Serial.print(red_,DEC);
	// Serial.print(", ");
	// Serial.print(green_,DEC);
	// Serial.print(", ");
	// Serial.print(blue_,DEC);
	// Serial.println(" )");
	// Serial.print("The Clear channel value are: ");
	// Serial.println(clear_,DEC);
	
// when turn on LED, need to adjust the RGB data,otherwise it is almost the white color
//以下做一下滤波处理
	if(red_ < 0.8*maxColor && red_ >= 0.6*maxColor)
	{
		red_ *= 0.4;
    }
	else if(red_ < 0.6*maxColor)
	{
		red_ *= 0.2;
    }
	
	if(green_ < 0.8*maxColor && green_ >= 0.6*maxColor)
	{
		green_ *= 0.4;
    }
	else if(green_ < 0.6*maxColor)
	{
		if (maxColor == redTmp && greenTmp >= 2*blueTmp && greenTmp >= 0.2*redTmp)				//orange
		{
			green_ *= 5;
		}
		green_ *= 0.2;
    }
	
	if(blue_ < 0.8*maxColor && blue_ >= 0.6*maxColor && blue_ > 125)
	{
		blue_ *= 0.4;
    }
	else if(blue_ < 0.6*maxColor)
	{
		if (maxColor == redTmp && greenTmp >= 2*blueTmp && greenTmp >= 0.2*redTmp)				//orange
		{
			blue_ *= 0.5;
		}
		if (maxColor == redTmp && greenTmp <= blueTmp && blueTmp >= 0.2*redTmp)					//pink
		{
			blue_  *= 5;
		}
		blue_ *= 0.2;
    }
	
	minColor = min(red_, green_);
	minColor = min(minColor, blue_);
	if(maxColor == green_ && red_ >= 0.85*maxColor && minColor == blue_)						//yellow
	{
		red_ = maxColor;
		blue_ *= 0.4;
    }
	
	// Serial.print("The RGB value are: RGB( ");
	// Serial.print(red_,DEC);
	// Serial.print(", ");
	// Serial.print(green_,DEC);
	// Serial.print(", ");
	// Serial.print(blue_,DEC);
	// Serial.println(" )");
	// Serial.print("The Clear channel value are: ");
	// Serial.println(clear_,DEC);
	
	clearInterrupt();
}

void GroveColorSensor::readRGB(int *red, int *green, int *blue)
{
	Wire.beginTransmission(sensorAddress_);
	Wire.write(REG_BLOCK_READ);
	Wire.endTransmission();
	
	Wire.beginTransmission(sensorAddress_);
	Wire.requestFrom(sensorAddress_, 8);
	delay(100);

	// if two bytes were received
	if(8 <= Wire.available())
	{
		int i;
		for(i = 0; i < 8; ++i)
		{
			readingdata_[i] = Wire.read();
			//Serial.println(readingdata_[i], BIN);
		}
	}
	green_	= readingdata_[1] * 256 + readingdata_[0];
	red_ 	= readingdata_[3] * 256 + readingdata_[2];
	blue_	= readingdata_[5] * 256 + readingdata_[4];
	clear_	= readingdata_[7] * 256 + readingdata_[6];
	
	// Serial.print("The RGB value are: RGB( ");
	// Serial.print(red_,DEC);
	// Serial.print(", ");
	// Serial.print(green_,DEC);
	// Serial.print(", ");
	// Serial.print(blue_,DEC);
	// Serial.println(" )");
	// Serial.print("The Clear channel value are: ");
	// Serial.println(clear_,DEC);
	
	int greenTmp = green_;
	int redTmp 	 = red_;
	int blueTmp	 = blue_;
	
	*red   = red_;
	*green = green_;
	*blue  = blue_;
}

void GroveColorSensor::calculateCoordinate()
{
	double X;
	double Y;
	double Z;
	double x;
	double y;
	
	X = (-0.14282) * red_ + (1.54924) * green_ + (-0.95641) * blue_;
	Y = (-0.32466) * red_ + (1.57837) * green_ + (-0.73191) * blue_;
	Z = (-0.68202) * red_ + (0.77073) * green_ + (0.563320) * blue_;
	
	x = X / (X + Y + Z);
	y = Y / (X + Y + Z);
	
	// if( (X > 0) && ( Y > 0) && ( Z > 0) )
	// {
/* 		Serial.println("The x,y values are(");
		Serial.print(x, 2);
		Serial.print(" , ");
		Serial.print(y, 2);
		Serial.println(")"); */
	// }
	// else
		// Serial.println("Error: overflow!");
}

COLOR GroveColorSensor::getColor()
{
	double X;
	double Y;
	double Z;
	double x;
	double y;
	COLOR color = UNKNOW_COLOR;
	
	readRGB();
	
/* 	X = (-0.14282) * red_ + (1.54924) * green_ + (-0.95641) * blue_;
	Y = (-0.32466) * red_ + (1.57837) * green_ + (-0.73191) * blue_;
	Z = (-0.68202) * red_ + (0.77073) * green_ + (0.563320) * blue_; */
	
	X =  41.24f * red_ + 35.76f * green_ + 18.05f * blue_;
	Y =  21.26f * red_ + 71.52f * green_ + 7.2f * blue_;
	Z =  1.93f  * red_ + 11.92f * green_ + 95.05f * blue_;
	
	x = X / (X + Y + Z);
	y = Y / (X + Y + Z);
	
	// if( (X > 0) && ( Y > 0) && ( Z > 0) )
	// {
		// Serial.println("The x,y values are(");
		// Serial.print(x, 2);
		// Serial.print(" , ");
		// Serial.print(y, 2);
		// Serial.println(")");
	// }
	// else
		// Serial.println("Error: overflow!");
	if(0.52< x && x< 0.7 && 0.25 < y && y < 0.45){      //红色
		color = RED;
	}
	else if(0.09 < x && x < 0.22 && 0.09 < y && y < 0.25){             //蓝色
		color = BLUE;
	}
	else if(0.235 < x && x < 0.302 && 0.349 < y && y < 0.8){            //绿色
		color = GREEN;
	}
	else if(0.29 < x && x < 0.34 && 0.44 < y && y< 0.8){            //绿色
		color = GREEN;
	}else if(0.29< x && x < 0.328 && 0.30 < y && y < 0.345){
		if(green_ < 100){
			color = BLACK;    //黑色
		}else{ 
			color = WHITE;    //白色
		}
	}
	
	// Serial.print("The color sensor param:( R0_ " );
	// Serial.print(R0_,DEC);
	// Serial.print(", G0_ ");
	// Serial.print(G0_,DEC);
	// Serial.print(", B0 ");
	// Serial.print(B0_,DEC);
	// Serial.print(", kr_ ");
	// Serial.println(kr_,4);
	// Serial.print(", kb_ ");
	// Serial.println(kb_,4);
	// Serial.println(" )");	
	
	return color;
}