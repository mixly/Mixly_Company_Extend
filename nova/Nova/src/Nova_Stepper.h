#ifndef _NOVA_Stepper_H_
#define _NOVA_Stepper_H_
#include "Arduino.h"
#include "Nova.h"

class Stepper
{
public:
	Stepper(uint8_t port);
	void  moveTo(long absolute); 
	void  move(long relative);
	boolean run();
	boolean runSpeed();
	void setMaxSpeed(float speed);
	void setAcceleration(float acceleration);
	void setSpeed(float speed);
	float speed();
	long distanceToGo();
	long targetPosition();
	long currentPosition();
	void setCurrentPosition(long position);
	void runToPosition();
	boolean runSpeedToPosition();
	void runToNewPosition(long position); 
	void disableOutputs();
	void enableOutputs();
	void computeNewSpeed();
	virtual void step();
	
private:
	uint8_t _Stepper_dir;
	uint8_t _dir;
	uint8_t _stepper;
	long _currentPos;     // Steps
	long _targetPos;      // Steps
	float _speed;         // Steps per second
	float _maxSpeed;
	float _acceleration;
	unsigned long _stepInterval;
	unsigned long _lastStepTime;
	long _n;
	float _c0;
	float _cn;
	float _cmin; // at max speed
};

#endif