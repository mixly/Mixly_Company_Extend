#include "maker17_MP3.h"

MP3::MP3(uint8_t port):Set_MP3(port)
{
	
		
			_MP3_pin = port;
		
	
	//Set_MP3::Set_MP3(_MP3_pin);
}
void MP3::begin(unsigned long baud)
{
	Set_MP3::begin(baud);
	delay(500);
	//_MP3.begin(baud);
}
static void set_number (uint8_t *thebuf, uint16_t data) {
	*thebuf =	(uint8_t)(data>>8);
	*(thebuf+1) =	(uint8_t)data;
}

void MP3::play (uint16_t num)
{
	set_number ((sed_buf+5), num);
	sed_buf[3] = 0x12;
	for (int i=0; i<8; i++) {
		Set_MP3::write(sed_buf[i]);
	}
}

void MP3::volume(uint16_t vol)
{
	set_number ((sed_buf+5), vol);
	sed_buf[3] = 0x06;
	for (int i=0; i<8; i++) {
		Set_MP3::write(sed_buf[i]);
	}
}

void MP3::play()
{
	sed_buf[3] = 0x0D;
	for (int i=0; i<8; i++) {
		Set_MP3::write(sed_buf[i]);
		//int a = sed_buf[i];
		//uint8_t b = (uint8_t)a;
		//for(int j=0;j<8;j++){
		//	digitalWrite(_MP3_pin,b);
		//	b>>=1;
		//	delayMicroseconds(2);
		//_delay_us(130);
		//}
		
	}
}

void MP3::next_song()
{
	sed_buf[3] = 0x01;
	for (int i=0; i<8; i++) {
		Set_MP3::write(sed_buf[i]);
	}
}
void MP3::last_song()
{
	sed_buf[3] = 0x02;
	for (int i=0; i<8; i++) {
		Set_MP3::write(sed_buf[i]);
	}
}
void MP3::vol_up()
{
	sed_buf[3] = 0x04;
	for (int i=0; i<8; i++) {
		Set_MP3::write(sed_buf[i]);
	}
}
void MP3::vol_dn()
{
	sed_buf[3] = 0x05;
	for (int i=0; i<8; i++) {
		Set_MP3::write(sed_buf[i]);
	}
}
void MP3::loop_play()
{
	sed_buf[3] = 0x11;
	for (int i=0; i<8; i++) {
		Set_MP3::write(sed_buf[i]);
	}
}
void MP3::stop()
{
	sed_buf[3] = 0x16;
	for (int i=0; i<8; i++) {
		Set_MP3::write(sed_buf[i]);
	}
}
void MP3::random_play()
{
	sed_buf[3] = 0x18;
	for (int i=0; i<8; i++) {
		Set_MP3::write(sed_buf[i]);
	}
}
void MP3::pause()
{
	sed_buf[3] = 0x0E;
	for (int i=0; i<8; i++) {
		Set_MP3::write(sed_buf[i]);
	}
	
}
extern uint8_t sed_buf[8];