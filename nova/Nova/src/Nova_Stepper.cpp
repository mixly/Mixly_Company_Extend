#include "Nova_Stepper.h"

#define DIRECTION_CCW 0 
#define DIRECTION_CW  1 
/*typedef enum
{
  DIRECTION_CCW = 0,  ///< Clockwise
  DIRECTION_CW  = 1   ///< Counter-Clockwise
} Direction;
*/


Stepper::Stepper(uint8_t port)
{
	switch(port)
	{
		case M0:
			_Stepper_dir = M0_PIN_0;
			_stepper = M0_PIN_1;
		break;

		case M1:
			_Stepper_dir = M1_PIN_0;
			_stepper = M1_PIN_1;
		break;

		case M2:
			_Stepper_dir = S4_PIN_0;
			_stepper = S4_PIN_1;
		break;

		case M3:
			_Stepper_dir = S5_PIN_0;
			_stepper = S5_PIN_1;
		break;

		case C0:
			_Stepper_dir = C0_PIN_0;
			_stepper = C0_PIN_1;
		break;

		case C1:
			_Stepper_dir = C1_PIN_1;
			_stepper = C1_PIN_0;
		break;

		default:
		break;
	}	
	_currentPos = 0;
    _targetPos = 0;
    _acceleration = 0;
    _lastStepTime = micros();
    _speed = 0;
    _dir = DIRECTION_CW;
    setCurrentPosition(0);
    pinMode(_Stepper_dir, OUTPUT);
	pinMode(_stepper, OUTPUT);
}

void Stepper::moveTo(long absolute)
{
  if (_targetPos != absolute)
  {
    _targetPos = absolute;
    computeNewSpeed();
  }
}

void Stepper::move(long relative)
{
  moveTo(_currentPos + relative);
}

boolean Stepper::runSpeed()
{
  // Dont do anything unless we actually have a step interval
  if (!_stepInterval)
  {
    return false;
  }

  if (micros() - _lastStepTime > _stepInterval)
  {
    if (_dir == DIRECTION_CW)
    {
      // Clockwise
      _currentPos += 1;
    }
    else
    {
      // Anticlockwise  
      _currentPos -= 1;
    }
    step();
    _lastStepTime = micros();
    return true;
  }
  else
  {
    return false;
  }
}


long Stepper::distanceToGo()
{
  return _targetPos - _currentPos;
}


long Stepper::targetPosition()
{
  return _targetPos;
}

long Stepper::currentPosition()
{
  return _currentPos;
}

void Stepper::setCurrentPosition(long position)
{
  _targetPos = _currentPos = position;
  _n = 0;
  _stepInterval = 0;
}

void Stepper::computeNewSpeed()
{
  long distanceTo = distanceToGo();
  long stepsToStop = (long)((_speed * _speed) / (2.0 * _acceleration));
  if (distanceTo == 0 && stepsToStop <= 1)
  {
    // We are at the target and its time to stop
    _stepInterval = 0;
    _speed = 0.0;
    _n = 0;
    return;
  }

  if (distanceTo > 0)
  {
    // We are anticlockwise from the target
    // Need to go clockwise from here, maybe decelerate now
    if (_n > 0)
    {
      // Currently accelerating, need to decel now? Or maybe going the wrong way?
      if ((stepsToStop >= distanceTo) || _dir == DIRECTION_CCW)
      {
        _n = -stepsToStop; // Start deceleration
      }
    }
    else if (_n < 0)
    {
      // Currently decelerating, need to accel again?
      if ((stepsToStop < distanceTo) && _dir == DIRECTION_CW)
      {
        _n = -_n; // Start accceleration
      }
    }
  }
  else if (distanceTo < 0)
  {
    // We are clockwise from the target
    // Need to go anticlockwise from here, maybe decelerate
    if (_n > 0)
    {
      // Currently accelerating, need to decel now? Or maybe going the wrong way?
      if ((stepsToStop >= -distanceTo) || _dir == DIRECTION_CW)
      {
        _n = -stepsToStop; // Start deceleration
      }
    }
    else if (_n < 0)
    {
      // Currently decelerating, need to accel again?
      if ((stepsToStop < -distanceTo) && _dir == DIRECTION_CCW)
      {
        _n = -_n; // Start accceleration
      }
    }
  }

  // Need to accelerate or decelerate
  if (_n == 0)
  {
    // First step from stopped
    _cn = _c0;
    _dir = (distanceTo > 0) ? DIRECTION_CW : DIRECTION_CCW;
  }
  else
  {
    // Subsequent step. Works for accel (n is +_ve) and decel (n is -ve).
    _cn = _cn - ((2.0 * _cn) / ((4.0 * _n) + 1)); // Equation 13
    _cn = max(_cn, _cmin);
  }
  _n++;
  _stepInterval = _cn;
  _speed = 1000000.0 / _cn;
  if (_dir == DIRECTION_CCW)
  {
    _speed = -_speed;
  }
}

boolean Stepper::run()
{
  if((_speed == 0.0) || (distanceToGo() == 0))
  {
    return false;
  }

  if (runSpeed())
  {
	computeNewSpeed();
    return true;
  }
}

void Stepper::setMaxSpeed(float speed)
{
  if (_maxSpeed != speed)
  {
    _maxSpeed = speed;
    _cmin = 1000000.0 / speed;
    // Recompute _n from current speed and adjust speed if accelerating or cruising
    if (_n > 0)
    {
      _n = (long)((_speed * _speed) / (2.0 * _acceleration)); // Equation 16
      computeNewSpeed();
    }
  }
}

void Stepper::setAcceleration(float acceleration)
{
  if(acceleration == 0.0)
  {
    return;
  }
  if(_acceleration != acceleration)
  {
    _n = _n * (_acceleration / acceleration);
    //	_c0 = sqrt(2.0 / acceleration) * 1000000.0;
    // Accelerates at half the expected rate. Why?
    _c0 = sqrt(1.0/acceleration) * 1000000.0;
    _acceleration = acceleration;
    computeNewSpeed();
  }
}

void Stepper::setSpeed(float speed)
{
  if (speed == _speed)
  {
    return;
  }
  speed = constrain(speed, -_maxSpeed, _maxSpeed);
  if (speed == 0.0)
  {
    _stepInterval = 0;
  }

  else
  {
    _stepInterval = fabs(1000000.0 /speed);
    _dir = (speed > 0.0) ? DIRECTION_CW : DIRECTION_CCW;
  }
  _speed = speed;
}

float Stepper::speed()
{
  return _speed;
}

void Stepper::step()
{
  if(_dir == DIRECTION_CW)
  {
    digitalWrite(_Stepper_dir,LOW);
  }
  else
  {
    digitalWrite(_Stepper_dir,HIGH);
  }
  digitalWrite(_stepper, HIGH);
  delayMicroseconds(1);
  digitalWrite(_stepper, LOW);
}

void Stepper::runToPosition()
{
  while (run())
  {
    ;
  }
}

boolean Stepper::runSpeedToPosition()
{
  if (_targetPos == _currentPos)
  {
    return false;
  }
  if (_targetPos >_currentPos)
  {
	_dir = DIRECTION_CW;
  }
  else
  {
	_dir = DIRECTION_CCW;
  }
  return runSpeed();
}

void Stepper::runToNewPosition(long position)
{
  moveTo(position);
  runToPosition();
}