/*
   Author Ilya ilyxa Tyshchenko
	Site: http://www.nest.org.ru/tag/Arduino
	e-mail: arduino@nest.org.ru
*/

#ifndef PPMint_h
#define PPMint_h

#include "Arduino.h"

#define _CHA_NUM 8
#define _PPM_PIN 2
#define _PPM_INT 0

class PPMint
{
	public:
		PPMint();
		int realRaw[_CHA_NUM];
                void PPMinterrupt(void);
		void setup();
	private:
		uint8_t prevRealRaw[_CHA_NUM];
		uint8_t currentChannel;
		unsigned long lastms,diffms;
		boolean sync;
};


#endif
