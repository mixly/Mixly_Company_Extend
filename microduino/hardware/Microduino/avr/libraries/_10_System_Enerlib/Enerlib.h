/*
Enerlib: easy-to-use wrapper for AVR's Sleep lib.
By E.P.G. - 12/2012 - Ver. 1.0.1
*/

#ifndef Enerlib_h
#define Enerlib_h

class Energy
{
  private:
    bool sleeping;
	public:
    Energy();
		void PowerDown(void);
		void Idle(void);
		void SleepADC(void);
		void PowerSave(void);
    void Standby(void);
    bool WasSleeping(void);
};

#endif