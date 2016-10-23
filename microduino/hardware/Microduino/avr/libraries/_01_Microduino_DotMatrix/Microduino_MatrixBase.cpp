// 本作品采用知识共享 署名-非商业性使用-相同方式共享 3.0 未本地化版本 许可协议进行许可
// 访问 http://creativecommons.org/licenses/by-nc-sa/3.0/ 查看该许可协议
// ==============

// 版权所有：
// @老潘orz  wasdpkj@hotmail.com
// ==============

// Microduino-IDE
// ==============
// Microduino Getting start:
// http://www.microduino.cc/download/

// Microduino IDE Support：
// https://github.com/wasdpkj/Microduino-IDE-Support/

// ==============
// Microduino wiki:
// http://wiki.microduino.cc

// ==============
// E-mail:
// Kejia Pan
// pankejia@microduino.cc

// ==============
// Weibo:
// @老潘orz

#include "Microduino_MatrixBase.h"

uint8_t MatrixCount = 0;                                     // the total number of attached keys

LedControl::LedControl() {
  if ( MatrixCount < 64) {
    this->matrixIndex = MatrixCount++;                    // assign a key index to this instance
    this->Devices_addr = 64 - MatrixCount;
  }
  else {
    this->matrixIndex = 255 ;  // too many keys
  }

  this->type = TYPE_COLOR;
  this->brightness = 255;
  this->Fast_mode = false;
  clearColor();
}

uint8_t LedControl::getDeviceAddr() {
  return (this->Devices_addr + 1);
}

void LedControl::setDeviceAddr(uint8_t _addr) {
  this->Devices_addr = _addr - 1;
}

void LedControl::clearFastMode() {
  this->Fast_mode = false;
}

void LedControl::setFastMode() {
  this->Fast_mode = true;
}

void LedControl::setType(bool _type) {
  this->type = _type;
}

void LedControl::clearColor() {
  this->value_color[0] = 255;
  this->value_color[1] = 255;
  this->value_color[2] = 255;
}

void LedControl::setColor(uint8_t _value_r, uint8_t _value_g, uint8_t _value_b) {
  if (_value_r > 255 || _value_r < 0 || _value_g > 255 || _value_g < 0 || _value_b > 255 || _value_b < 0)
    return;

  this->value_color[0] = _value_r;
  this->value_color[1] = _value_g;
  this->value_color[2] = _value_b;
}

void LedControl::setBrightness(uint8_t _value) {
  if (_value > 255 || _value < 0)
    return;

  this->brightness = _value;
}

void LedControl::clearDisplay() {
  if (this->type == TYPE_COLOR) {
    Wire.beginTransmission(this->Devices_addr + 1); // transmit to device #4
    Wire.write(0x60);       // sends five bytes
    Wire.endTransmission();    // stop transmitting
  }
  else {
    Wire.beginTransmission(this->Devices_addr + 1); // transmit to device #4
    Wire.write(0xC0);       // sends five bytes
    Wire.endTransmission();    // stop transmitting
  }
}


void LedControl::setLedColor(uint8_t _row, uint8_t _col, uint8_t _value_r, uint8_t _value_g, uint8_t _value_b) {
  if (_row < 0 || _row > 7 || _col < 0 || _col > 7 || _value_r > 255 || _value_r < 0 || _value_g > 255 || _value_g < 0 || _value_b > 255 || _value_b < 0)
    return;

  if (this->type == TYPE_COLOR) {
    Wire.beginTransmission(this->Devices_addr + 1); // transmit to device #4
    uint8_t temp[4];
    temp[0] = 0x80 | (_row << 3) | _col;
    temp[1] = _value_b / 8;
    temp[2] = 0x20 | _value_g / 8;
    temp[3] = 0x40 | _value_r / 8;
    Wire.write(temp, 4);       // sends five bytes
    Wire.endTransmission();    // stop transmitting
  }
  else {
    Wire.beginTransmission(this->Devices_addr + 1); // transmit to device #4
    uint8_t temp[2];
    temp[0] = 0x80 | (_row << 3) | _col;
    temp[1] = ((_value_b / 8) + (_value_g / 8) + (_value_r / 8)) / 3;
    Wire.write(temp, 2);       // sends five bytes
    Wire.endTransmission();    // stop transmitting
  }
}

void LedControl::setLedColorFast(uint8_t _row, uint8_t _col, uint8_t _value_r, uint8_t _value_g, uint8_t _value_b) {
  if (_row < 0 || _row > 7 || _col < 0 || _col > 7 || _value_r > 255 || _value_r < 0 || _value_g > 255 || _value_g < 0 || _value_b > 255 || _value_b < 0)
    return;

  if (this->type == TYPE_COLOR) {
    Wire.beginTransmission(this->Devices_addr + 1); // transmit to device #4
    uint8_t temp[2];
    temp[0] = 0xC0 | (_row << 3) | _col;
    temp[1] = ((_value_b / 64) << 4) | ((_value_g / 64) << 2) | (_value_r / 64);
    Wire.write(temp, 2);       // sends five bytes
    Wire.endTransmission();    // stop transmitting
  }
  else {
    Wire.beginTransmission(this->Devices_addr + 1); // transmit to device #4
    uint8_t temp[2];
    temp[0] = 0x80 | (_row << 3) | _col;
    temp[1] = ((_value_b / 8) + (_value_g / 8) + (_value_r / 8)) / 3;
    Wire.write(temp, 2);       // sends five bytes
    Wire.endTransmission();    // stop transmitting
  }
}

void LedControl::setLedBrightness(uint8_t _row, uint8_t _col, uint8_t _value) {
  if (_row < 0 || _row > 7 || _col < 0 || _col > 7 || _value > 255 || _value < 0)
    return;

  if (_value) {
    if (this->Fast_mode)
      this->setLedColorFast(_row, _col, this->value_color[0]*_value / 255, this->value_color[1]*_value / 255, this->value_color[2]*_value / 255);
    else
      this->setLedColor(_row, _col, this->value_color[0]*_value / 255, this->value_color[1]*_value / 255, this->value_color[2]*_value / 255);
  }
  else
    this->setLedColorFast(_row, _col, 0, 0, 0);
}

void LedControl::setLed(uint8_t _row, uint8_t _col, bool _state) {
  if (_row < 0 || _row > 7 || _col < 0 || _col > 7)
    return;

  setLedBrightness(_row, _col, _state ? this->brightness : 0);
}

void LedControl::setRow(uint8_t _row, byte _value) {
  if (_row < 0 || _row > 7)
    return;

  if (this->type == TYPE_COLOR) {
    byte _val;
    for (uint8_t _col = 0; _col < 8; _col++) {
      _val = _value >> (_col);
      _val = _val & 0x01;
      this->setLed(_row, _col, _val);
    }
  }
  else {
    uint8_t temp[9];
    Wire.beginTransmission(this->Devices_addr + 1); // transmit to device #4
    temp[0] = 0x80 | (_row << 3); //10000000 | x 确定列
    byte _val;
    for (uint8_t _col = 0; _col < 8; _col++) {
      _val = _value >> (_col);
      _val = _val & 0x01;
      temp[_col + 1] = (_val ? this->brightness : 0) & 0x7F | 0x40;
    }
    Wire.write(temp, 9);
    Wire.endTransmission();
  }
}

void LedControl::setColumn(uint8_t _col, byte _value) {
  if (_col < 0 || _col > 7)
    return;

  if (this->type == TYPE_COLOR) {
    byte _val;
    for (uint8_t _row = 0; _row < 8; _row++) {
      //_val = _value >> (7 - _row);
      _val = _value >> (_row);
      _val = _val & 0x01;
      this->setLed(_row, _col, _val);
    }
  }
  else {
    uint8_t temp[9];
    Wire.beginTransmission(this->Devices_addr + 1); // transmit to device #4
    temp[0] = 0x80 | _col;  //10000000 | x 确定列
    byte _val;
    for (uint8_t _row = 0; _row < 8; _row++) {
      _val = _value >> (_row);
      _val = _val & 0x01;
      temp[_row + 1] = (_val ? this->brightness : 0) & 0x3F;
    }
    Wire.write(temp, 9);
    Wire.endTransmission();
  }
}

void LedControl::writeString(int16_t _time, char* _displayString) {
  int16_t _leng = 0;
  int16_t _wight = 0;
  while (_displayString[_leng] != NULL) _wight += 1 + pgm_read_byte(alphabetBitmap[CharToInt(_displayString[_leng++])] + FONE_SIZE_X);
  //  Serial.println(_wight);

  for (int16_t a = 8; a > -_wight; a--) {
    int16_t c = 0;
    setCursor(a, 0);
    print(_displayString);
    delay(_time);
  }
}

void LedControl::setCursor(int16_t _x, int16_t _y) {
  this->cursor_x = _x;
  this->cursor_y = _y;
}

size_t LedControl::write(uint8_t c) {
  if (CharToInt(c) > 94 || CharToInt(c) < 0)
    return 0;

  this->displayChar((this->cursor_x), (this->cursor_y), c);
  this->cursor_x += 1 + pgm_read_byte(alphabetBitmap[CharToInt(c)] + FONE_SIZE_X);

  return 1;
}


void LedControl::displayChar(int8_t _row, int8_t _col, char _charIndex) {
  if (_row < 0 - 8 || _row > 7 + 8 || _col < 0 - 8 || _col > 7 + 8 || CharToInt(_charIndex) > 94 || CharToInt(_charIndex) < 0)
    return;

  uint8_t n = CharToInt(_charIndex);
  uint8_t m = FONE_SIZE_X - pgm_read_byte(alphabetBitmap[n] + FONE_SIZE_X);


  for (int8_t i = m; i < FONE_SIZE_X + 1; i++) {
	byte _val,_cache = 0x00;
    for (int8_t j = _col; _col < 0 ? j < 8 + _col : j < 8; j++) {
      if (i - m + _row < 0 || i - m + _row > 7) {
        break;
      }
      if (i != FONE_SIZE_X)
        _val = pgm_read_byte(alphabetBitmap[n] + i) >> (j - _col);
      else
        _val = 0x00 >> (j - _col);
      _val = _val & 0x01;
	  
      this->setLed(i - m + _row, j, _val);
    }
  }
}