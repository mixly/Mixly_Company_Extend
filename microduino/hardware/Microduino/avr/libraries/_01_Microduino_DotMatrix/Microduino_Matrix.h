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

#define U8G_DRAW_UPPER_RIGHT 0x01
#define U8G_DRAW_UPPER_LEFT  0x02
#define U8G_DRAW_LOWER_LEFT 0x04
#define U8G_DRAW_LOWER_RIGHT  0x08
#define U8G_DRAW_ALL (U8G_DRAW_UPPER_RIGHT|U8G_DRAW_UPPER_LEFT|U8G_DRAW_LOWER_RIGHT|U8G_DRAW_LOWER_LEFT)

#define read16(Y,Z)  (uint16_t)((uint8_t)pgm_read_byte((Y) + (Z++)) | ((uint8_t)pgm_read_byte((Y) + (Z++)) << 8))
#define read32(Y,Z) (uint32_t)((uint8_t)pgm_read_byte((Y) + (Z++)) | ((uint8_t)pgm_read_byte((Y) + (Z++)) << 8) | ((uint8_t)pgm_read_byte((Y) + (Z++)) << 16) | ((uint8_t)pgm_read_byte((Y) + (Z++)) << 24))
#define BUFFPIXEL (MatrixPix_X * 8 * 3)

class Matrix : public Print {
public:
	LedControl* led;

//	LedControl m_ledctl;
	//LedControl m(20);
//	virtual void clearDisplay();
	Matrix(uint8_t (*_addr)[8],bool _type = TYPE_COLOR);
//	Matrix(int _x,int _y);
//	void clearDisplay();
	int16_t getWidth();
	int16_t getHeight();
	int16_t getMatrixNum();
	
//    void print(char* c);    
	uint8_t getDeviceAddr(uint8_t _a);
	
	void setDeviceAddr(uint8_t* _addr);	

    void clearDisplay();

    void setColor(uint8_t _value_r, uint8_t _value_g, uint8_t _value_b);
    void clearColor();	
	
	void setBrightness(uint8_t _value);

	void setLedBrightness(uint8_t _row, uint8_t _col, uint8_t _value);
	void setLed(uint8_t _row, uint8_t _col, bool state);
	void setLedColor(uint8_t _row, uint8_t _col, uint8_t _value_r, uint8_t _value_g, uint8_t _value_b);
	void setLedColorFast(uint8_t _row, uint8_t _col, uint8_t _value_r, uint8_t _value_g, uint8_t _value_b);

    void drawLine(int8_t x1, int8_t y1, int8_t x2, int8_t y2);
   
    void drawCircle(int8_t x0, int8_t y0, int8_t rad, int8_t option = U8G_DRAW_ALL);
    void drawDisc(int8_t x0, int8_t y0, int8_t rad, int8_t option = U8G_DRAW_ALL);
	
    void drawFrame(int8_t x, int8_t y, int8_t w, int8_t h);
    void drawRFrame(int8_t x, int8_t y, int8_t w, int8_t h, uint8_t r);
    void drawBox(int8_t x, int8_t y, int8_t w, int8_t h);
    void drawRBox(int8_t x, int8_t y, int8_t w, int8_t h, uint8_t r);
	
	void drawBMP(int16_t x, int16_t y, int16_t w, int16_t h,const uint8_t *bitmap);	
	bool drawBMP(int16_t x, int16_t y, const uint8_t *bitmap);

	void setFastMode();
	void clearFastMode();
	
	void setType(bool _type);
	
    virtual size_t write(uint8_t);
	
    void setCursor(int16_t x, int16_t y);
		
	void runFun(const void* Fun = NULL);
    void (*Fun)();

    int16_t getStringWidth( char* _String);
    int16_t getStringHeight( char* _String);
		
	void writeString(char* _c,uint16_t _t,int16_t _xy);

private:
//	bool Fast_mode;
    void drawCircle_section(int8_t x, int8_t y, int8_t x0, int8_t y0, uint8_t option);
    void drawDisc_section(int8_t x, int8_t y, int8_t x0, int8_t y0, uint8_t option);
	void drawVLine(int8_t x, int8_t y, int8_t w);	
	void drawHLine(int8_t x, int8_t y, int8_t h);	

	int16_t _numX, _numY; // Display w/h as modified by current rotation
	int16_t cursor_x, cursor_y;
	int16_t _matrixNum;
};


#endif