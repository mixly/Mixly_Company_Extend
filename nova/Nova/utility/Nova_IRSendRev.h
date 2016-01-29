#ifndef _NOVA_IRSENDREV_H_
#define _NOVA_IRSENDREV_H_
#include "Nova.h"


#define IR_BUTTON_0 79
#define IR_BUTTON_1 255
#define IR_BUTTON_2 127
#define IR_BUTTON_3 191
#define IR_BUTTON_4 223
#define IR_BUTTON_5 95
#define IR_BUTTON_6 159
#define IR_BUTTON_7 239
#define IR_BUTTON_8 111
#define IR_BUTTON_9 175
#define IR_BUTTON_OK 87
#define IR_BUTTON_UP 119
#define IR_BUTTON_DOWN 103
#define IR_BUTTON_LEFT 215
#define IR_BUTTON_RIGHT 151
#define IR_BUTTON_SPARK 207
#define IR_BUTTON_POUND 143

#define D_LEN       0
#define D_STARTH    1
#define D_STARTL    2
#define D_SHORT     3
#define D_LONG      4
#define D_DATALEN   5
#define D_DATA      6


#define USECPERTICK 50  // microseconds per clock interrupt tick
#define RAWBUF 300 // Length of raw duration buffer

// Marks tend to be 100us too long, and spaces 100us too short
// when received due to sensor lag.
#define MARK_EXCESS 100

#define __DEBUG     0

// Results returned from the decoder
class decode_results
{
    public:
    volatile unsigned int *rawbuf; // Raw intervals in .5 us ticks
    int rawlen;           // Number of records in rawbuf.
};

// main class for receiving IR
class IRSendRev
{
private:
    decode_results results;
    //**************************rev**********************************
private:
    int decode(decode_results *results);
    void enableIRIn();
public:
    void begin(int port);
    unsigned char recv(void);
    unsigned char recv(unsigned char *revData);     // 
    unsigned char available();                          // if IR get data
    void clear();                                   // clear IR data

    //**************************send*********************************
private:
    void sendRaw(unsigned int buf[], int len, int hz);    
    void mark(int usec);
    void space(int usec);
	void enableIROut(int khz);
public:
    void send(unsigned char *idata, unsigned char ifreq);
};
#endif
