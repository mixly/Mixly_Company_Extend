#ifndef _NOVA_GYRO_H_
#define _NOVA_GYRO_H_
#include "Arduino.h"
#include <avr/io.h>
#include "Nova.h"





#define I2C_ERROR                  (-1)
#define GYRO_DEFAULT_ADDRESS       (0x68)

// Init function. Needs to be called once in the beginning.
// Returns false if SDA or SCL are low, which probably means 
// a I2C bus lockup or that the lines are not pulled up.
boolean __attribute__ ((noinline)) i2c_init(void);

// Start transfer function: <addr> is the 8-bit I2C address (including the R/W
// bit). 
// Return: true if the slave replies with an "acknowledge", false otherwise
bool __attribute__ ((noinline)) i2c_start(uint8_t addr); 

// Similar to start function, but wait for an ACK! Be careful, this can 
// result in an infinite loop!
void  __attribute__ ((noinline)) i2c_start_wait(uint8_t addr);

// Repeated start function: After having claimed the bus with a start condition,
// you can address another or the same chip again without an intervening 
// stop condition.
// Return: true if the slave replies with an "acknowledge", false otherwise
bool __attribute__ ((noinline)) i2c_rep_start(uint8_t addr);

// Issue a stop condition, freeing the bus.
void __attribute__ ((noinline)) i2c_stop(void) asm("ass_i2c_stop");

// Write one byte to the slave chip that had been addressed
// by the previous start call. <value> is the byte to be sent.
// Return: true if the slave replies with an "acknowledge", false otherwise
bool __attribute__ ((noinline)) i2c_write(uint8_t value) asm("ass_i2c_write");


// Read one byte. If <last> is true, we send a NAK after having received 
// the byte in order to terminate the read sequence. 
uint8_t __attribute__ ((noinline)) i2c_read(bool last);



class Gyro
{
public:
  Gyro(void);

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