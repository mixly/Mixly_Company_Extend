#include "Nova_MP3.h"

MP3::MP3(uint8_t port):Set_MP3(port)
{
	switch(port)
	{
		case S0:
			_MP3_pin = S0_PIN;
		break;
		case S1:
			_MP3_pin = S1_PIN;
		break;
		case S2:
			_MP3_pin = S2_PIN;
		break;
		case S3:
			_MP3_pin = S3_PIN;
		break;
		case A0:
	        _MP3_pin = A0;
	    break;
	    case A1:
			_MP3_pin = A1;
	    break;
	    case A2:
			_MP3_pin = A2;
	    break;
	    case A3:
			_MP3_pin = A3;
	    break;
	    
	    default:
	    break;
	}
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