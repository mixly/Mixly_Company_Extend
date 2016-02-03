#include "Microduino_Motor.h"

static motor_t motors[10];                          // static array of key structures

uint8_t MotorCount = 0;                                     // the total number of attached keys

Motor::Motor(uint8_t _motor_pinA, uint8_t _motor_pinB) {
  if ( MotorCount < 10)
  {
    this->motorIndex = MotorCount++;                    // assign a key index to this instance
    if (_motor_pinA < NUM_DIGITAL_PINS && _motor_pinB < NUM_DIGITAL_PINS) {
      pinMode( _motor_pinA, OUTPUT) ;
      motors[this->motorIndex].Pin.nbr_A = _motor_pinA;

      pinMode( _motor_pinB, OUTPUT) ;
      motors[this->motorIndex].Pin.nbr_B = _motor_pinB;
	  
	  this->fix=1;
    }
  }
  else
    this->motorIndex = 255 ;  // too many keys
}

void Motor::Fix(float _fix)	{
  this->fix=_fix;
}

int16_t Motor::GetData(int16_t _throttle, int16_t _steering, bool _dir) {  
  this->_motor_vol = _throttle;

if(_dir)
  this->_motor_vol -= _steering / 2;
else
  this->_motor_vol += _steering / 2;

  if (this->_motor_vol > 255)
    this->_motor_vol = 255;
  else if (this->_motor_vol < -255)
    this->_motor_vol = -255;

  this->_motor_vol *= fix;

  return this->_motor_vol;
}


void Motor::Driver(int16_t _motor_driver)	{
  int8_t channel_A = motors[this->motorIndex].Pin.nbr_A;
  int8_t channel_B = motors[this->motorIndex].Pin.nbr_B;
  if (_motor_driver == 0)	{
    digitalWrite(channel_A, LOW);
    digitalWrite(channel_B, LOW);
  }
  else if (_motor_driver > 0)	{
    analogWrite(channel_A, _motor_driver);
    digitalWrite(channel_B, LOW);
  }
  else	{
    analogWrite(channel_A, 255 + _motor_driver);
    digitalWrite(channel_B, HIGH);
  }
}

void Motor::Free() {
  int8_t channel_A = motors[this->motorIndex].Pin.nbr_A;
  int8_t channel_B = motors[this->motorIndex].Pin.nbr_B;
  digitalWrite(channel_A, LOW);
  digitalWrite(channel_B, LOW);
}

void Motor::Brake() {
  int8_t channel_A = motors[this->motorIndex].Pin.nbr_A;
  int8_t channel_B = motors[this->motorIndex].Pin.nbr_B;
  digitalWrite(channel_A, HIGH);
  digitalWrite(channel_B, HIGH);
}