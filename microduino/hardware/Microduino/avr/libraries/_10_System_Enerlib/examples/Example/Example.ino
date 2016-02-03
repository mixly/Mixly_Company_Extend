/*
Enerlib: easy-to-use wrapper for AVR's Sleep library.
By E.P.G. - 11/2010 - Ver. 1.0.0

When you call any methods for put Arduino in a low
power state, it can only be waked up by triggering
an interruption. If you don't use any interruption,
you must reset Arduino to wake it.
*/

#include <Enerlib.h>

Energy energy;

void INT0_ISR(void)
{
  /*
  The WasSleeping function will return true if Arduino
  was sleeping before the IRQ. Subsequent calls to
  WasSleeping will return false until Arduino reenters
  in a low power state. The WasSleeping function should
  only be called in the ISR.
  */
  if (energy.WasSleeping())
  {
    /*
    Arduino was waked up by IRQ.
    
    If you shut down external peripherals before sleeping, you
    can reinitialize them here. Look on ATMega's datasheet for
    hardware limitations in the ISR when microcontroller just
    leave any low power state.
    */
  }
  else
  {
    /*
    The IRQ happened in awake state.
    
    This code is for the "normal" ISR.
    */
  }
}

void setup()
{
  attachInterrupt(0, INT0_ISR, LOW);
  /*
  Pin 2 will be the "wake button". Due to uC limitations,
  it needs to be a level interrupt.
  For experienced programmers:
    ATMega's datasheet contains information about the rest of
    wake up sources. The Extended Standby is not implemented.
  */

  energy.PowerDown(); //Most power saving
  energy.Standby();
  energy.PowerSave();
  energy.SleepADC();
  energy.Idle();      //Least power saving
  
  /*
  You should look on the ATMega328P's datasheet:
  http://www.atmel.com/dyn/resources/prod_documents/doc8271.pdf
  for more information about low power modes.
  */
}

void loop()
{
}