#include <Microduino_Protocol_HardSer.h>

byte getChecksum(byte length, byte cmd, byte mydata[]) {
  //三个参数分别为： 数据长度  ，  指令代码  ，  实际数据数组
  byte checksum = 0;
  checksum ^= (length & 0xFF);
  checksum ^= (cmd & 0xFF);
  for (int i = 0; i < length; i++) checksum ^= (mydata[i] & 0xFF);
  return checksum;
}


/* Protocol::Protocol(PRO_PORT *ser , byte _channel) {
  //  common_init();  // Set everything to common state, then...
  this->channel = _channel;
  this->num = 0;
  this->sta = false;
  this->error = false;
  P_Serial = ser; // ...override P_Serial with value passed.
  } */


void Protocol::begin(uint16_t _baud) {
  P_Serial->begin(_baud);
  delay(20);
}


bool Protocol::available(bool _sta) {
  if (P_Serial->available() > 0) {
    if (_sta) {
      this->inCache = this->inChar;
      this->inChar = P_Serial->read();
      this->buffer[num] = this->inChar;

      if (this->num > BUFFER_MAX - 1) {
        this->num = 0;
        return false;
      }
      else {
        this->num++;
      }
    }
    return true;
  }
  return false;
}


uint8_t Protocol::parse(uint16_t* _data, bool _mod) {
  if (available(!_mod)) {
    time = millis();
    do {
      if (this->sta) {
        this->sta = false;
        this->num = 0;
        if (this->inChar == this->channel) {
          this->error = false;
          if (!_mod) {
            return P_BUSY;
          }
        }
        else  {
          this->error = true;
          return P_ERROR;
        }
      }

      if (this->inChar == 0xBB && this->inCache == 0xAA) {
        this->sta = true;
        if (!_mod) {
          return P_BUSY;
        }
      }

      if (this->num  == (CHANNEL_NUM * 2 + 1) && !this->error) {
        this->inCache = this->buffer[CHANNEL_NUM * 2];
        this->buffer[CHANNEL_NUM * 2] = NULL;
        this->inChar = getChecksum(CHANNEL_NUM * 2, 200, this->buffer);

        this->num = 0;
        if (!this->error && this->inCache == this->inChar) {
          for (uint8_t a = 0; a < CHANNEL_NUM; a++) {
            _data[a] = ((uint16_t)(this->buffer[a * 2])) | ((uint16_t)this->buffer[a * 2 + 1] << 8);
          }
          return P_FINE;
        }
        else {
          return P_ERROR;
        }
      }
      else if (!_mod) {
        return P_BUSY;
      }
    } while (_mod && (available(true) && millis() - time < 100));

    if (_mod) {
      return P_TIMEOUT;
    }
  }
  else {
    return P_NONE;
  }
}