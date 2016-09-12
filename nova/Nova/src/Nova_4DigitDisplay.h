#ifndef _NOVA_4_DIGIT_DISPLAY_H_
#define _NOVA_4_DIGIT_DISPLAY_H_
#include "Arduino.h"
#include "Nova.h"
#include <util/delay.h>
class DigitDisplay
{
public:
	DigitDisplay(uint8_t port);
	void displayTime(uint16_t num);
	void displayNum(uint16_t num);
	void displayNum(uint16_t num,bool dir);
	void displayFloat(float f);
	void displayNum(uint8_t one, uint8_t two, uint8_t three, uint8_t four);
	void displayBit(uint8_t num, uint8_t bit);
	void displayABCDEF(const String &s, uint8_t bit);
	void clear(void);
	void clearBit(uint8_t bit);
private:
	bool type;//true sofeware,false hardware
	uint8_t SCL_pin,SDA_pin;
	void Write_DATA(unsigned char add,unsigned char DATA);
	void TM1650_start(void);
	void TM1650_stop(void);
	void TM1650_ACK(void);
	void TM1650_Write(unsigned char	DATA);
};
#endif