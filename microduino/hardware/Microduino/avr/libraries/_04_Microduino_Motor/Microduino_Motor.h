#ifndef Motor_h
#define Motor_h

#include "Arduino.h"

#define CHAN_LEFT 0
#define CHAN_RIGHT 1

typedef struct  {
  uint8_t nbr_A        :6 ; 
  uint8_t nbr_B        :6 ; 
} MotorPin_t   ;  

typedef struct {
  MotorPin_t Pin;
} motor_t;

class Motor {
public:
	Motor(uint8_t _motor_pinA, uint8_t _motor_pinB);
	void Fix(float _fix);
	void Driver(int16_t _motor_driver);
	void Free();
	void Brake();
	int16_t GetData(int16_t _throttle, int16_t _steering, bool _dir);
private:
    uint8_t motorIndex;               // index into the channel data for this key
	float fix;
	int16_t _motor_vol;
};

#endif