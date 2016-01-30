/*
Enerlib: easy-to-use wrapper for AVR's Sleep lib.
By E.P.G. - 12/2012 - Ver. 1.0.1
*/

#include <avr/sleep.h>
#include "Enerlib.h"
#if defined(ARDUINO) && ARDUINO >= 100
  #include <arduino.h>
#else
  #include <wiring.h>
#endif

Energy::Energy()
{
  sleeping = false;
}

bool Energy::WasSleeping(void)
{
  bool a = sleeping;
  sleeping = false;
  return a;
}

void Energy::PowerDown(void)
{
	delay(100);
	set_sleep_mode(SLEEP_MODE_PWR_DOWN);
  sleeping = true;
	sleep_enable();
	sleep_mode();
	sleep_disable();
 }

void Energy::Idle(void)
{
  delay(100);
	set_sleep_mode(SLEEP_MODE_IDLE);
  sleeping = true;
	sleep_enable();
	sleep_mode();
	sleep_disable();
}

void Energy::SleepADC(void)
{
  delay(100);
	set_sleep_mode(SLEEP_MODE_ADC);
  sleeping = true;
	sleep_enable();
	sleep_mode();
	sleep_disable();
}

void Energy::PowerSave(void)
{
  delay(100);
	set_sleep_mode(SLEEP_MODE_PWR_SAVE);
  sleeping = true;
	sleep_enable();
	sleep_mode();
	sleep_disable();
}

void Energy::Standby(void)
{
  delay(100);
	set_sleep_mode(SLEEP_MODE_STANDBY);
  sleeping = true;
	sleep_enable();
	sleep_mode();
	sleep_disable();
}