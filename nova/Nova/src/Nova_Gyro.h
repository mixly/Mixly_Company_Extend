#ifndef _NOVA_GYRO_H_
#define _NOVA_GYRO_H_
#include "Arduino.h"

#define GYRO_DEFAULT_ADDRESS 0x68

class Gyro
{
public:
  Gyro(uint8_t port);

  void begin();

  void update(void);

  void fast_update(void);

  uint8_t getDevAddr(void);

  double getAngleX(void);

  double getAngleY(void);

  double getAngleZ(void);

  double getGyroX(void);

  double getGyroY(void);
  
  double getGyroZ(void);

  double getAngle(uint8_t index);

private:
  volatile uint8_t  _AD0;
  volatile uint8_t  _INT;
  double  gSensitivity; /* for 500 deg/s, check data sheet */
  double  gx, gy, gz;
  double  gyrX, gyrY, gyrZ;
  int16_t accX, accY, accZ;
  double  gyrXoffs, gyrYoffs, gyrZoffs;
  uint8_t i2cData[14];
  uint8_t Device_Address;
  
  void deviceCalibration(void);

  int8_t writeReg(uint8_t reg, uint8_t data);
  uint8_t readReg(uint8_t reg);
  int8_t readData(uint8_t start, uint8_t *buffer, uint8_t size);
};
#endif