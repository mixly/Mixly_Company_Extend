/*
 * AT24Cxx.h - library for AT24Cxx
 */

#ifndef AT24Cxx_h
#define AT24Cxx_h

#include <Arduino.h>
#include <Wire.h>
#define min(a,b) ((a)<(b)?(a):(b))

#define AT24Cxx_CTRL_ID 0x50

class AT24Cxx
{
  // user-accessible "public" interface
  public:
    AT24Cxx();
    AT24Cxx(uint8_t);
	
	void begin(void);
    bool isPresent(void);      // check if the device is present
    uint16_t readMem(uint16_t iAddr, uint8_t Buf[], uint16_t iCnt);
    uint8_t writeMem(uint16_t iAddr, uint8_t iVal);
    uint8_t writeMem(uint16_t iAddr, const char *pBuf, uint16_t iCnt);

    uint16_t readStr(uint16_t iAddr, uint8_t Buf[], uint16_t iBufLen);
    uint8_t writeStr(uint16_t iAddr, const char *pBuf);

  private:
	uint8_t devAddr;
  
};
#endif
