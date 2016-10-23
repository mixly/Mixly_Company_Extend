// 
// JQ6500 audio library for Arduino
//

#include "JQ6500.h"
#include "JQ6500_def.h"
#include <SoftwareSerial.h>

JQ6500::JQ6500(SoftwareSerial *ser) {
    common_init();
	audioSwSerial = ser;	
}

JQ6500::JQ6500(HardwareSerial *ser) {
    common_init();
	audioHwSerial = ser;
}

void JQ6500::common_init(void){
	audioSwSerial = NULL;
	audioHwSerial = NULL;
	
}

void JQ6500::begin(uint16_t _baud){
	baud = _baud;
	if(audioSwSerial) audioSwSerial->begin(baud);
	else			  audioHwSerial->begin(baud);
	delay(100);
}

void JQ6500::sendCommand(uint8_t cmd, uint8_t *buf, uint16_t len){
	int i = 0;
	sendBuffer[0] = STX;
	sendBuffer[1] = len+2;
	sendBuffer[2] = cmd;
	if(len > 0)
		memcpy(sendBuffer+3, buf, len);
	sendBuffer[len+3] = ETX;
	if(audioSwSerial)
		audioSwSerial->write(sendBuffer, len+4);
	else
		audioHwSerial->write(sendBuffer, len+4);
	delay(160);
}

void JQ6500::next(){
	sendCommand(CMD_NEXT, NULL, 0);
}

void JQ6500::prev(){
	sendCommand(CMD_PREV, NULL, 0);
}

void JQ6500::choose(uint16_t num){
	cmdBuffer[0] = num>>8;
	cmdBuffer[1] = num&0xFF;
	sendCommand(CMD_CHOOSE, cmdBuffer, 2);
}

void JQ6500::volUp(){
	sendCommand(CMD_UP, NULL, 0);
}

void JQ6500::volDown(){
	sendCommand(CMD_DOWN, NULL, 0);
}

void JQ6500::volumn(uint8_t vol){
	cmdBuffer[0] = vol;
	sendCommand(CMD_VOL, cmdBuffer, 1);
}

void JQ6500::eq(uint8_t eq){
	cmdBuffer[0] = eq;
	sendCommand(CMD_EQ, cmdBuffer, 1);	
}

void JQ6500::setDevice(uint8_t device){
	cmdBuffer[0] = device;
	sendCommand(CMD_DEVICE, cmdBuffer, 1);
	delay(1500);	
}

void JQ6500::sleep(){	
	sendCommand(CMD_SLEEP, NULL, 0);
}

void JQ6500::reset(){
	sendCommand(CMD_RESET, NULL, 0);
	delay(1500);	
}

void JQ6500::play(){
	sendCommand(CMD_PLAY, NULL, 0);
}

void JQ6500::pause(){
	sendCommand(CMD_PAUSE, NULL, 0);
}

void JQ6500::folder(uint8_t temp){
	cmdBuffer[0] = temp;
	sendCommand(CMD_FOLDER, cmdBuffer, 1);
}

void JQ6500::setMode(uint8_t temp){
	cmdBuffer[0] = temp;
	sendCommand(CMD_MODE, cmdBuffer, 1);
}

void JQ6500::chooseFile(uint8_t folder, uint8_t file){
	cmdBuffer[0] = folder;
	cmdBuffer[1] = file;
	sendCommand(CMD_FILE, cmdBuffer, 2);
}

void JQ6500::init(uint8_t device, uint8_t mode, uint8_t vol){
	begin(9600);
	reset();
	setDevice(device);
	setMode(mode);
	volumn(vol);
}


uint16_t JQ6500::dataParse(){
	uint16_t sum = 0;
	uint8_t temp;
	if(audioSwSerial){
		while(audioSwSerial->available()){
			temp = char(audioSwSerial->read());
			if(temp>47&&temp<58){
				temp -=48;  
			}else if(temp>96&&temp<103){
				temp -=87;  
			}
			sum = sum*16+temp;
			delay(1);
		}
	}else{
		while(audioHwSerial->available()){
			temp = char(audioHwSerial->read());
			if(temp>47&&temp<58){
				temp -=48;  
			}else if(temp>96&&temp<103){
				temp -=87;  
			}
			sum = sum*16+temp; 
			delay(1);
		}
	}
	return sum;	
}

uint16_t JQ6500::queryNum(uint8_t cmd){
	if(audioSwSerial){
		audioSwSerial->stopListening();
		audioSwSerial->listen();
	}else{
		audioHwSerial->end();
		audioHwSerial->begin(baud);
	}
	sendCommand(cmd, NULL, 0);	
	return dataParse();	
}

uint16_t JQ6500::queryTF(){
	return queryNum(QUERY_TF);	
}

uint16_t JQ6500::queryTFFile(){
    return queryNum(QUERY_TF_FILE);	
}

uint16_t JQ6500::queryFlash(){
    return queryNum(QUERY_FLASH);	
}

uint16_t JQ6500::queryFlashFile(){
    return queryNum(QUERY_FLASH_FILE);	
}

uint16_t JQ6500::queryTotalTime(){	
    return queryNum(QUERY_TTIME);	
}

uint16_t JQ6500::queryPlayTime(){
    return queryNum(QUERY_PTIME);	
}

String JQ6500::queryName(){
	String nameCache = "";
	char temp;
	uint16_t i = 0;
	if(audioSwSerial){
		audioSwSerial->stopListening();
		audioSwSerial->listen();
	}else{
		audioHwSerial->end();
		audioHwSerial->begin(baud);
	}
	sendCommand(QUERY_NAME, NULL, 0);	
	if(audioSwSerial){
		
		while(audioSwSerial->available()){
			temp = audioSwSerial->read();
			nameCache += temp;
			if(temp == 32){
				i++;	
			}else{
				i = 0;
			}
			if(i >= 3){
				i = 0;
				nameCache.replace("   ", ".");
			}
			delay(1);
		}
	}else{
		while(audioHwSerial->available()){
			temp = audioHwSerial->read();
			nameCache += temp;
			if(temp == 32){
				i++;	
			}else{
				i = 0;
			}
			if(i >= 3){
				i = 0;
				nameCache.replace("   ", ".");
			}
			delay(1);
		}
	}
	return nameCache;	
}

//
// END OF FILE
//
