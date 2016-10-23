// Microduino_Stepper.cpp
//
// Copyright (C) 2009-2013 Shenyang
// $Id: Microduino_Stepper.cpp,v 1.00 2016/04/07 $

#include "Microduino_Stepper.h"

static Stepper_t steppers[MAX_STEPPERS];

uint8_t StepperCount = 0;

// Some debugging assistance

void stepperAllEnable(){
	digitalWrite(PIN_EN, LOW);
}

void stepperAllDisable(){
	digitalWrite(PIN_EN, HIGH);
}


static inline void handle_interrupts(){
	for(uint8_t channel=0; channel < MAX_STEPPERS; channel++){
		if(steppers[channel].isActive)
			steppers[channel].stepper->computeStep();
	}
}

static void initISR(){

#if defined(_useTimer1)
    cli();
	TCCR1A = 0;
	TCCR1B = _BV(WGM12)|_BV(CS11);
	OCR1A = TIMER_COMP;
	TCNT1 = 0;
	TIMSK1 = _BV(OCIE1A);
	sei();  
#endif
	pinMode(PIN_EN, OUTPUT);
	stepperAllEnable();
}


#if defined(_useTimer1)
ISR(TIMER1_COMPA_vect){
	
	handle_interrupts();
}

#endif


static bool isTimerActive(){
	for(uint8_t channel=0; channel <MAX_STEPPERS ; channel++){
		if(steppers[channel].isActive == true)
			return  true;
	}
	return false;
}


/****************** end of static functions ******************************/

Stepper::Stepper(uint8_t _dirPin, uint8_t _stepPin){
	if(StepperCount < MAX_STEPPERS){
		this->stepperIndex = StepperCount++;
	}else{
		this->stepperIndex = INVALID_STEPPER;
	}
	dirPin = _dirPin;
	stepPin = _stepPin;
	speed = 0;
	period = 0;
	counter = 0;
}  


uint8_t Stepper::begin(){
	if(this->stepperIndex < MAX_STEPPERS){
		pinMode(dirPin, OUTPUT);
		pinMode(stepPin, OUTPUT);
		setMaxAccel(DEFAULT_ACCEL);
		if(isTimerActive() == false)
			initISR();
		steppers[this->stepperIndex].isActive = true;
		steppers[this->stepperIndex].stepper = this;
	}
	return this->stepperIndex;
}
  
 
void Stepper::setSpeed(int16_t _speed){	
	speed += constrain((_speed-speed), -(int16_t)maxAccel, (int16_t)maxAccel);
    if(speed == 0)
		period = 0;
	else
		period = MAX_SPEED/abs(speed);
	(speed>0) ? PIN_CLR(dirPin) : PIN_SET(dirPin);
}
 
 
void Stepper::setMaxAccel(uint16_t _accel){
	maxAccel = _accel;
}

int16_t Stepper::getSpeed() { return  speed; }
uint16_t Stepper::getMaxAccel() { return  maxAccel;}


void Stepper::computeStep(){
	counter++;
	if(counter > period){
		counter = 0;
		if(period > 0){
			PIN_SET(stepPin);
			delayMicroseconds(1);
			PIN_CLR(stepPin);
		}
	}
}


  

