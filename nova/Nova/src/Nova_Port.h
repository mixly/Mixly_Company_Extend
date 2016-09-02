#ifndef _NOVA_PORT_H_
#define _NOVA_PORT_H_
#include "Arduino.h"
#include "Nova.h"


class NovaPort
{
public:
    NovaPort(uint8_t port);
    uint8_t getPin(uint8_t solt);
    uint8_t getPin();
private:
    uint8_t _pin;
    uint8_t _pin_S1;
    uint8_t _pin_S2;
};
#endif