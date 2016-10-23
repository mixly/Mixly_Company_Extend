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

#ifndef Microduino_Matrix_h
#define Microduino_Matrix_h

#if (ARDUINO >= 100)
#include "Arduino.h"
#include "Print.h"
#else
#include "WProgram.h"
#endif

#include "Fonts.h"
#include <Wire.h>
#include <avr/pgmspace.h>

#define MatrixPix_X 8
#define MatrixPix_Y 8

#define TYPE_S2	0
#define TYPE_COLOR	1

class LedControl : public Print {
  public:
    LedControl();
    //    LedControl(uint8_t _addr);
    uint8_t getDeviceAddr();
    void setDeviceAddr(uint8_t _addr);

    void clearDisplay();

    void setColor(uint8_t _value_r, uint8_t _value_g, uint8_t _value_b);
    void clearColor();
	
	void setBrightness(uint8_t _value);

	void setLedBrightness(uint8_t _row, uint8_t _col, uint8_t _value);
    void setLed(uint8_t _row, uint8_t _col, bool state);
    void setLedColor(uint8_t _row, uint8_t _col, uint8_t _value_r, uint8_t _value_g, uint8_t _value_b);
    void setLedColorFast(uint8_t _row, uint8_t _col, uint8_t _value_r, uint8_t _value_g, uint8_t _value_b);

    void setFastMode();
    void clearFastMode();

    void setRow(uint8_t _row, byte _value);
    void setColumn(uint8_t _col, byte _value);
	
	void setType(bool _type);

    void setCursor(int16_t x, int16_t y);
    virtual size_t write(uint8_t);
    void displayChar(int8_t _row, int8_t _col, char _charIndex);
    void writeString(int time, char * displayString);

    void (*Fun)();

  protected:
    uint8_t Devices_addr;
	bool type;
    bool Fast_mode;
    uint8_t value_color[3];
	uint8_t brightness;
    int16_t cursor_x, cursor_y;
    int16_t _width, _height; // Display w/h as modified by current rotation

    byte status[64];
  private :
    uint8_t matrixIndex;               // index into the channel data for this key
};

#endif