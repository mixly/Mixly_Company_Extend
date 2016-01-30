/*
 =================================
 本作品采用知识共享 署名-非商业性使用-相同方式共享 3.0 未本地化版本 许可协议进行许可
 访问 http://creativecommons.org/licenses/by-nc-sa/3.0/ 查看该许可协议
 版权所有：
 @老潘orz  wasdpkj@hotmail.com
 =================================

 Microduino wiki:
 http://wiki.microduino.cc
 */

#include <Wire.h>
#include "APDS9930.h"

void APDS9930::write8(uint8_t reg, uint8_t value)
{
  Wire.beginTransmission(I2C_ADDR_APDS9930);

  Wire.write(0x80 | reg);
  Wire.write(value);

  Wire.endTransmission();
}

uint16_t APDS9930::read16(uint8_t reg)
{
  uint16_t barr[2];

  Wire.beginTransmission(I2C_ADDR_APDS9930);
  Wire.write(0xA0 | reg);
  Wire.endTransmission();

  Wire.requestFrom(I2C_ADDR_APDS9930, 2);

  barr[0] = Wire.read();
  barr[1] = Wire.read();

  barr[1] <<= 8;
  barr[1] |= barr[0];
  return barr[1];
}


APDS9930::APDS9930() 
{
    Wire.begin();
    ch0_data=0;
    ch1_data=0;
    prox_data=0;
}

void APDS9930::power( bool _PW)
{
  if(!_PW)	delay(5); 

  write8(0, 0xff & ((WEN << 3) | (PEN << 2) | (AEN << 1) | (_PW)));   // write8(0,0x0f);

  delay(12); //Wait for 12 ms
}

void APDS9930::init(uint8_t _APDS9930_PDRIVE, uint8_t _APDS9930_PGAIN, uint8_t _APDS9930_AGAIN)
{
  write8(0, 0); //Disable and powerdown
  
  write8(1, APDS9930_ATIME);
  write8(2, APDS9930_PTIME);
  write8(3, APDS9930_WTIME);
  write8(0x0e, APDS9930_PPULSE);

  write8(0x0f, 0xff & ( (_APDS9930_PDRIVE << 6) | (APDS9930_PDIODE << 4) | (_APDS9930_PGAIN << 2) | (_APDS9930_AGAIN)));

  power(PON);
}

void APDS9930::getdata() {
  ch0_data = read16(0x14);
  ch1_data = read16(0x16);
  prox_data = read16(0x18);
}

//
// END OF FILE
//