#ifndef _NOVA_BLUETOOTH_H_
#define _NOVA_BLUETOOTH_H_
#include "Arduino.h"
#include "Nova.h"
#include <utility/SoftwareSerial.h>

#define HARDWARE 1
#define SOFTWARE 2

#define SS 1
#define UL 2
#define US 3
#define UR 4
#define LS 5
#define RS 6
#define DL 7
#define DS 8
#define DR 9
#define AA 10
#define BB 11
#define CC 12
#define DD 13
#define ON 14
#define OFF 15

class BlueTooth : public SoftwareSerial
{
public:
	BlueTooth(uint8_t port);
    void begin(long baud);
    uint8_t readAppKey(void);//读取蓝牙遥控按键
    int16_t available(void);
    String readString(void);
    virtual size_t write(uint8_t byte);
    void write(const char *str);
    void write(byte *buffer, int length);
    void readBytes(byte *buffer, int length);
    
private:
	bool stringcmp(char *str1, String str2);
    uint8_t _BtLen;
    char _BtComData[4];
    uint8_t _appKey;
    uint8_t _port;
};
#endif
