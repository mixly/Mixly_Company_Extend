/*
 * DRV8833 - Library for the DRV8833 dual motor driver carrier.
 * The DRV8833 can be found here: https://www.pololu.com/product/2130
 * The DRV8833 data sheet can be found here: https://www.pololu.com/file/download/drv8833.pdf?file_id=0J534
 *
 * Library: DRV8833
 * File: DRV8833.h
 *
 * Describes the class for the library.
 * v1.0
 *
 * Created March 16, 2015, by Aleksandr J. Spackman.
 *
 * This code is not yet in the public domain.
 *
 */

#ifndef DRV8833_H
#define DRV8833_H

#include "Arduino.h"

class DRV8833
{
public:
	// Constructor for the class:
	DRV8833();

	// Motor control functions:
	void motorAReverse();
	void motorAReverse(int speed);
	void motorAForward();
	void motorAForward(int speed);
	void motorAStop();

	void motorBReverse();
	void motorBReverse(int speed);
	void motorBForward();
	void motorBForward(int speed);
	void motorBStop();

	// Functions to attach motors:
	void attachMotorA(int a1 /* Input pin A1 */, int a2 /* Input pin A2 */);
	void attachMotorB(int b1 /* Input pin B1 */, int b2 /* Input pin B2 */);

private:
	// Fields for the class:
	int a1, a2, b1, b2;
	boolean motorAAttached = false;
	boolean motorBAttached = false;
};

#endif // DRV8833_H
