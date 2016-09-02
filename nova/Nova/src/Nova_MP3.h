#ifndef _Nova_MP3_H_
#define _Nova_MP3_H_
#include "Arduino.h"
#include "Nova.h"
#include <utility/Set_MP3.h>
static uint8_t sed_buf[8] = {0X7E,0XFF,0x06,00,00,00,00,0XEF};

class MP3 : public Set_MP3
{
public:
	
	MP3(uint8_t port);
    void begin(unsigned long baud);
	void play();
	void next_song();
	void last_song();
	void vol_up();
	void vol_dn();
	void loop_play();
	void stop();
	void random_play();
	void play(uint16_t num);
    void pause();
	void volume(uint16_t vol);
	
private:
	uint8_t _MP3;
	uint8_t _MP3_pin;
};
#endif


