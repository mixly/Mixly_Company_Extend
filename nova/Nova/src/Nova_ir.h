#ifndef _NOVA_IR_H
#define _NOVA_IR_H

#include "Arduino.h"
#include <utility/SoftIIC.h>
class IRNEW {
public:
  IRNEW(uint8_t port);
  uint8_t read(uint8_t last);
  bool restart(uint8_t addr);
  bool start(uint8_t addr);
  void stop(void);
  bool write(uint8_t data);
private:
  uint8_t i2c_addr;
};

#endif

