#include "Arduino.h"
#include <avr/io.h>
#include <avr/interrupt.h> 
#include "audio_play.h"

void audio_play_init(void)
{
  DDRL |=(1<<PL4);//for A_data
	PORTL |=(1<<PL4);	

	DDRL |=(1<<PL3);//for A_CS
	PORTL |=(1<<PL3);	
	
	DDRL |=(1<<PL2);//for A_CLK
	PORTL |=(1<<PL2);	
	
	DDRL |=(1<<PL1);//rest for rest
	//PORTL &=~(1<<PL1);
  DDRL |=(1<<PL0);//for POWER EN
	PORTL &=~(1<<PL0);
}
// #define A_DATA 45//PL4
// #define A_CS 46//PL3
// #define A_CL 47//PL2
// #define A_RESET 48//PL1
void three_lines(unsigned char addr)
{
	unsigned char i;
	PORTL &=~(1<<PL1);//rest=0
	delay(5);
	PORTL |=(1<<PL1);//rest=1
	delay(20);
	PORTL &=~(1<<PL3);//CS=0
	delay(1);
	for(i=0;i<8;i++)
	{
		PORTL &=~(1<<PL2);//CL=0
		if(addr&1)
		{
			PORTL |=(1<<PL4);//data=1
		}
		else
		{
			PORTL &=~(1<<PL4);//data=0
		}
		addr>>=1;
    delayMicroseconds(300);
		PORTL |=(1<<PL2);//CL=1
		delayMicroseconds(300);
	}
	PORTL |=(1<<PL2);
	delay(500);
	PORTL &=~(1<<PL1);//rest=0
	delay(5);
	PORTL |=(1<<PL1);//rest=1
}
void play_stop(void)
{
	unsigned char addr = 0xfe;
	unsigned char i;
	PORTL &=~(1<<PL3);//CS=0
	delay(5);
	for(i=0;i<8;i++)
	{
		PORTL &=~(1<<PL2);//CL=0
		if(addr&1)
		{
			PORTL |=(1<<PL4);//data=1
		}
		else
		{
			PORTL &=~(1<<PL4);//data=0
		}
		addr>>=1;
        delayMicroseconds(300);
		PORTL |=(1<<PL2);//CL=1
		delayMicroseconds(300);
	}
	PORTL |=(1<<PL2);	
}
