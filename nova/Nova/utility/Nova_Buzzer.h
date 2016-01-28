#ifndef _NOVA_BUZZER_H_
#define _NOVA_BUZZER_H_
#include "Arduino.h"
#include "Nova.h"

class Buzzer
{
public:
	Buzzer(uint8_t port);
	void Tone(uint16_t frequency, uint32_t duration);
	//void PlayMusic(uint8_t tune, uint8_t duration, uint8_t speed);
private:
	uint8_t _Buzzer_pin;
    // int _Tune_D[24]={
      // //0  1-  2-  3-  4-  5-  6-  7-
        // -1,147,165,175,196,221,248,278,
      // //0  1   2   3   4   5   6   7
        // -1,294,330,350,393,441,495,556,  
      // //0  1+  2+  3+  4+  5+  6+  7+
        // -1,589,661,700,786,882,990,1112 
    // };
};

#endif