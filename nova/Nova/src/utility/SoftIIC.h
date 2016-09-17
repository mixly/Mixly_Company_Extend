#ifndef SoftIIC_H
#define SoftIIC_H

#include <Arduino.h>

/** Bit to or with address for read start and read restart */
uint8_t const I2C_READ = 1;

/** Bit to or with address for write start and write restart */
uint8_t const I2C_WRITE = 0;

uint8_t const I2C_DELAY_USEC = 4;

//------------------------------------------------------------------------------
class IICBase {
 public:
  /** Read a byte
   * \param[in] last send Ack if last is false else Nak to terminate read
   * \return byte read from I2C bus
   */
  virtual uint8_t read(uint8_t last) = 0;
  /** Send new address and read/write bit without sending a stop.
   * \param[in] addressRW i2c address with read/write bit
   * \return true for success false for failure
   */
  virtual bool restart(uint8_t addr) = 0;
  /** Issue a start condition
   * \param[in] addressRW i2c address with read/write bit
   * \return true for success false for failure
   */
  virtual bool start(uint8_t addr) = 0;
  /** Issue a stop condition. */
  virtual void stop(void) = 0;
  /** Write a byte
   * \param[in] data byte to write
   * \return true for Ack or false for Nak */
  virtual bool write(uint8_t data) = 0;
};
//---------------------------------------------------------------------

class SoftIIC : public IICBase {
 public:
  SoftIIC();
  void begin(uint8_t sdapin, uint8_t sclpin);
  uint8_t read(uint8_t last);
  bool restart(uint8_t addr);
  bool start(uint8_t addr);
  void stop(void);
  bool write(uint8_t b);
 private:
  //SoftI2cMaster() {}
  uint8_t _sdapin;
  uint8_t _sclpin;
};

#endif  // I2C_MASTER_H
