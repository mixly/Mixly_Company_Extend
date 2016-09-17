
#include <utility/SoftIIC.h>

SoftIIC::SoftIIC()
{}
void SoftIIC::begin(uint8_t sdapin,uint8_t sclpin)
{
	_sdapin = sdapin;
	pinMode(_sdapin,OUTPUT);
	digitalWrite(_sdapin,HIGH);
	_sclpin = sclpin;
	pinMode(_sclpin,OUTPUT);
	digitalWrite(_sclpin,HIGH);
}
bool SoftIIC::start(uint8_t addr)
{
	digitalWrite(_sdapin, LOW);
	delayMicroseconds(I2C_DELAY_USEC);
	digitalWrite(_sclpin, LOW);
	return write(addr);
}
bool SoftIIC::restart(uint8_t addr)
{
	digitalWrite(_sdapin, HIGH);
	digitalWrite(_sclpin, HIGH);
	delayMicroseconds(I2C_DELAY_USEC);
	return start(addr);
}
void SoftIIC::stop()
{
	digitalWrite(_sdapin,LOW);
	delayMicroseconds(I2C_DELAY_USEC);
	digitalWrite(_sclpin,HIGH);
	delayMicroseconds(I2C_DELAY_USEC);
	digitalWrite(_sdapin,HIGH);
	delayMicroseconds(I2C_DELAY_USEC);
}
uint8_t SoftIIC::read(uint8_t last) {
  uint8_t b = 0;
  // make sure pull-up enabled
  digitalWrite(_sdapin, HIGH);
  pinMode(_sdapin, INPUT);
  // read byte
  for (uint8_t i = 0; i < 8; i++) {
    // don't change this loop unless you verify the change with a scope
    b <<= 1;
    delayMicroseconds(I2C_DELAY_USEC);
    digitalWrite(_sclpin, HIGH);
    if (digitalRead(_sdapin)) b |= 1;
    digitalWrite(_sclpin, LOW);
  }
  // send Ack or Nak
  pinMode(_sdapin, OUTPUT);
  digitalWrite(_sdapin, last);
  digitalWrite(_sclpin, HIGH);
  delayMicroseconds(I2C_DELAY_USEC);
  digitalWrite(_sclpin, LOW);
  digitalWrite(_sdapin, LOW);
  return b;
}

//------------------------------------------------------------------------------
/**
 * Write a byte.
 *
 * \param[in] data The byte to send.
 *
 * \return The value true, 1, if the slave returned an Ack or false for Nak.
 */
bool SoftIIC::write(uint8_t data) {
  // write byte
  for (uint8_t m = 0X80; m != 0; m >>= 1) {
    // don't change this loop unless you verify the change with a scope
    digitalWrite(_sdapin, m & data);
    digitalWrite(_sclpin, HIGH);
    delayMicroseconds(I2C_DELAY_USEC);
    digitalWrite(_sclpin, LOW);
  }
  // get Ack or Nak
  pinMode(_sdapin, INPUT);
  // enable pullup
  digitalWrite(_sdapin, HIGH);
  digitalWrite(_sclpin, HIGH);
  uint8_t rtn = digitalRead(_sdapin);
  digitalWrite(_sclpin, LOW);
  pinMode(_sdapin, OUTPUT);
  digitalWrite(_sdapin, LOW);
  return rtn == 0;
}
