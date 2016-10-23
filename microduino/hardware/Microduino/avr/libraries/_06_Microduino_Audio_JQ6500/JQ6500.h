// 
// JQ6500 audio library for Arduino
// VERSION: 0.1.0
//

#ifndef __JQ6500_H__
#define __JQ6500_H__

#if defined(ARDUINO) && ARDUINO >= 100
	#include <Arduino.h>
#else
	#include <WProgram.h>
	#include <pins_arduino.h>
#endif

#include <SoftwareSerial.h>
#include "JQ6500_def.h"
 
#define AUDIO_VERSION "0.1.0"

#define STX 0x7E
#define ETX 0xEF

#define CMD_NEXT    0x01
#define CMD_PREV    0x02
#define CMD_CHOOSE  0x03
#define CMD_UP      0x04
#define CMD_DOWN    0x05
#define CMD_VOL     0x06
#define CMD_EQ      0x07
#define CMD_DEVICE  0x09
#define CMD_SLEEP   0x0A
#define CMD_RESET   0x0C
#define CMD_PLAY    0x0D
#define CMD_PAUSE   0x0E
#define CMD_FOLDER  0x0F
#define CMD_MODE    0x11
#define CMD_FILE    0x12

#define QUERY_STA   	0x42
#define QUERY_VOL   	0x43
#define QUERY_EQ    	0x44
#define QUERY_MODE  	0x45
#define QUERY_VERSION 	0x46
#define QUERY_TF    	0x47
#define QUERY_DISK  	0x48
#define QUERY_FLASH 	0x49
#define QUERY_TF_FILE 	0x4B
#define QUERY_DISK_FILE 0x4C
#define QUERY_FLASH_FILE	0x4D
#define QUERY_PTIME 	0x50
#define QUERY_TTIME 	0x51
#define QUERY_NAME  	0x52
#define QUERY_FILES 	0x53


class JQ6500{
public:
	JQ6500(SoftwareSerial *ser);
	JQ6500(HardwareSerial *ser);
	
	void begin(uint16_t baud);
	void next();
	void prev();
	void choose(uint16_t num);
	void volUp();
	void volDown();
	void volumn(uint8_t vol);
	void eq(uint8_t eq);
	void setDevice(uint8_t device);
	void sleep();
	void reset();
	void play();
	void pause();
	void folder(uint8_t temp);
	void setMode(uint8_t temp);
	void chooseFile(uint8_t folder, uint8_t file);
	void init(uint8_t device, uint8_t mode, uint8_t vol);
	
	uint16_t queryTF();
	uint16_t queryTFFile();
	uint16_t queryFlash();
	uint16_t queryFlashFile();
	uint16_t queryTotalTime();
	uint16_t queryPlayTime();
	String queryName();
	
private:
	uint16_t baud;
	uint8_t sendBuffer[8];
	uint8_t cmdBuffer[8];

	SoftwareSerial *audioSwSerial;
	HardwareSerial *audioHwSerial;
  
	void common_init(void);
	void sendCommand(uint8_t cmd, uint8_t *buf, uint16_t len);
	uint16_t dataParse();
	uint16_t queryNum(uint8_t cmd);
};

#endif
//
// END OF FILE
//