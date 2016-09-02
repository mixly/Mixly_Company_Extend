#ifndef _NOVA_MQ_H_
#define _NOVA_MQ_H_
#include "Arduino.h"
#include "Nova.h"

class MQ
{
public:
	MQ(uint8_t port);
	int read(void);
private:
	uint8_t _MQ_pin;
};
#endif