#include "Nova_LineFinder.h"

LineFinder::LineFinder(uint8_t port)
{
	switch(port)
	{
        case M0:
			_sensor_pin2 = M0_PIN_0;
			_sensor_pin1 = M0_PIN_1;
		break;

		case M1:
			_sensor_pin2 = M1_PIN_0;
			_sensor_pin1 = M1_PIN_1;
		break;
		case M2:
			_sensor_pin1 = S4_PIN_1;
			_sensor_pin2 = S4_PIN_0;
		break;

		case M3:
			_sensor_pin1 = S5_PIN_1;
			_sensor_pin2 = S5_PIN_0;
		break;

		case C0:
			_sensor_pin1 = C0_PIN_1;
			_sensor_pin2 = C0_PIN_0;
		break;

		case C1:
			_sensor_pin1 = C1_PIN_0;
			_sensor_pin2 = C1_PIN_1;
		break;

		default:
		break;
	}
	
	pinMode(_sensor_pin1, INPUT);
	pinMode(_sensor_pin2, INPUT);
	
}

bool LineFinder::stateR(void)
{
	if(digitalRead(_sensor_pin1) == true)return false;
	else return true;

}

bool LineFinder::stateL(void)
{
	if(digitalRead(_sensor_pin2) == true)return false;
	else return true;
}

uint8_t LineFinder::read(void)
{
    uint8_t state = L_IN_R_IN;
    bool lState = stateL();
    bool rState = stateR();
    state = ((1 & lState) << 1) | rState;
    return state;
}
