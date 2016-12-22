#include "Nova_ir.h"
#include <utility/SoftIIC.h>

SoftIIC IRIIC;

#define USER	0x80
#define C0	USER+1
#define C1	USER+2

#define S0	USER+11
#define S1	USER+12
#define S2	USER+13
#define S3	USER+14
#define S4	USER+15
#define S5	USER+16

#define M0	USER+21
#define M1	USER+22
#define M2	S4
#define M3	S5

//pin define
#define C0_PIN_0	0
#define C0_PIN_1	1

// 位置后面需要改回来
#define C1_PIN_0	A5	//SCL
#define C1_PIN_1	A4	//SDA

#define S0_PIN	2
#define S1_PIN	9
#define S2_PIN	10
#define S3_PIN	13

#define S4_PIN_0	11
#define S4_PIN_1	12
#define S5_PIN_0	3
#define S5_PIN_1	4

#define M0_PIN_0	5
#define M0_PIN_1	7
#define M1_PIN_0	6
#define M1_PIN_1	8

#define M2_PIN_0	S4_PIN_0
#define M2_PIN_1	S4_PIN_1
#define M3_PIN_0	S5_PIN_0
#define M3_PIN_1	S5_PIN_1

IRNEW::IRNEW(uint8_t port)
{
    uint8_t SCL_pin,SDA_pin;
	switch(port)
	{
	    case C0:
		    SCL_pin = C0_PIN_1;
			SDA_pin = C0_PIN_0;
		break;
		case C1:
			SCL_pin = C1_PIN_0;
			SDA_pin = C1_PIN_1;
		break;
		case S4:
			SCL_pin = S4_PIN_1;
			SDA_pin = S4_PIN_0;
		break;
		case S5:
			SCL_pin = S5_PIN_1;
			SDA_pin = S5_PIN_0;
		break;
        case M0:
			SCL_pin = M0_PIN_1;
			SDA_pin = M0_PIN_0;
		break;
        case M1:
			SCL_pin = M1_PIN_1;
			SDA_pin = M1_PIN_0;
		break;
	}
    IRIIC.begin(SDA_pin,SCL_pin);  
}
bool IRNEW::start(uint8_t addr){
	IRIIC.start(addr);
}
bool IRNEW::restart(uint8_t addr){
	IRIIC.restart(addr);
}
void IRNEW::stop(){
	IRIIC.stop();
}

uint8_t IRNEW::read(uint8_t last){
	uint8_t d;
	d = IRIIC.read(last);
	return d;
}
bool IRNEW::write(uint8_t data){
	IRIIC.write(data);
}

