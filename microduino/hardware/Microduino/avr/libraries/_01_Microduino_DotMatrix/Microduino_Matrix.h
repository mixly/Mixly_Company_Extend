// 本作品采用知识共享 署名-非商业性使用-相同方式共享 3.0 未本地化版本 许可协议进行许可
// 访问 http://creativecommons.org/licenses/by-nc-sa/3.0/ 查看该许可协议
// ==============

// 版权所有：
// @老潘orz  wasdpkj@hotmail.com
// ==============

// Microduino-IDE
// ==============
// Microduino Getting start:
// http://www.microduino.cc/download/

// Microduino IDE Support：
// https://github.com/wasdpkj/Microduino-IDE-Support/

// ==============
// Microduino wiki:
// http://wiki.microduino.cc

// ==============
// E-mail:
// Kejia Pan
// pankejia@microduino.cc

// ==============
// Weibo:
// @老潘orz

#ifndef Microduino_Multiple_h
#define Microduino_Multiple_h

#if (ARDUINO >= 100)
 #include "Arduino.h"
 #include "Print.h"
#else
 #include "WProgram.h"
#endif

#include "Microduino_MatrixBase.h"

#define WDT
#ifdef WDT
#include <avr/wdt.h>
#endif

#define MODE_H 1
#define MODE_V 0

class Matrix : public Print {
public:
	LedControl* led;

//	LedControl m_ledctl;
	//LedControl m(20);
//	virtual void clearDisplay();
	Matrix(uint8_t (*_addr)[8]);
//	Matrix(int _x,int _y);
//	void clearDisplay();
	int16_t getWidth();
	int16_t getHeight();
	int16_t getMatrixNum();
	
//    void print(char* c);    
	uint8_t getDeviceAddr(uint8_t _a);
	
	void setDeviceAddr(uint8_t* _addr);	

    void clearDisplay();

    void setColor(uint8_t value_r, uint8_t value_g, uint8_t value_b);
    void clearColor();	

	void setFontMode(bool _Mode);

	void setLed(uint8_t row, uint8_t column, bool state);
	void setLedColor(uint8_t row, uint8_t column, uint8_t value_r, uint8_t value_g, uint8_t value_b);
	void setLedColorFast(uint8_t row, uint8_t column, uint8_t value_r, uint8_t value_g, uint8_t value_b);

	void setFastMode();
	void clearFastMode();
	
    virtual size_t write(uint8_t);
	
    void setCursor(int16_t x, int16_t y);
	
	void runFun(const void* Fun = NULL);
    void (*Fun)();

    int16_t getStringWidth( char* _String);
    int16_t getStringHeight( char* _String);
	

	
	void writeString(char* _c,bool _m,uint16_t _t,int16_t _xy);
private:
//	bool Fast_mode;
	int16_t _numX, _numY; // Display w/h as modified by current rotation
	int16_t cursor_x, cursor_y;
	int16_t _matrixNum;
};


#endif