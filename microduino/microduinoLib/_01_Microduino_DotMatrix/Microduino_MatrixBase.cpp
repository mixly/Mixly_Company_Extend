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

  this->Fast_mode = false;
  this->Font_mode = true;
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

void LedControl::setFontMode(bool _Mode) {
  this->Font_mode = _Mode;
}

void LedControl::clearColor() {
  this->value_color[0] = 255;
  this->value_color[1] = 255;
  this->value_color[2] = 255;
}

void LedControl::setColor(uint8_t value_r, uint8_t value_g, uint8_t value_b) {
  this->value_color[0] = value_r;
  this->value_color[1] = value_g;
  this->value_color[2] = value_b;
}

void LedControl::clearDisplay() {
  Wire.beginTransmission(this->Devices_addr + 1); // transmit to device #4
  Wire.write(0x60);       // sends five bytes
  Wire.endTransmission();    // stop transmitting
}


void LedControl::setLedColor(uint8_t _row, uint8_t _col, uint8_t _value_r, uint8_t _value_g, uint8_t _value_b) {
  if (_row < 0 || _row > 7 || _col < 0 || _col > 7 || _value_r > 255 || _value_r < 0 || _value_g > 255 || _value_g < 0 || _value_b > 255 || _value_b < 0)
    return;

  Wire.beginTransmission(this->Devices_addr + 1); // transmit to device #4
  uint8_t temp[4];
  temp[0] = 0x80 | (_row << 3) | _col;
  temp[1] = _value_b / 8;
  temp[2] = 0x20 | _value_g / 8;
  temp[3] = 0x40 | _value_r / 8;
  Wire.write(temp, 4);       // sends five bytes
  Wire.endTransmission();    // stop transmitting
}

void LedControl::setLedColorFast(uint8_t _row, uint8_t _col, uint8_t _value_r, uint8_t _value_g, uint8_t _value_b) {
  if (_row < 0 || _row > 7 || _col < 0 || _col > 7 || _value_r > 255 || _value_r < 0 || _value_g > 255 || _value_g < 0 || _value_b > 255 || _value_b < 0)
    return;

  Wire.beginTransmission(this->Devices_addr + 1); // transmit to device #4
  uint8_t temp[2];
  temp[0] = 0xC0 | (_row << 3) | _col;
  temp[1] = ((_value_b / 64) << 4) | ((_value_g / 64) << 2) | (_value_r / 64);
  Wire.write(temp, 2);       // sends five bytes
  Wire.endTransmission();    // stop transmitting
}

void LedControl::setLed(uint8_t _row, uint8_t _col, bool _state) {
  if (_row < 0 || _row > 7 || _col < 0 || _col > 7)
    return;

  if (_state) {
    if (this->Fast_mode)
      this->setLedColorFast(_row, _col, this->value_color[0], this->value_color[1], this->value_color[2]);
    else
      this->setLedColor(_row, _col, this->value_color[0], this->value_color[1], this->value_color[2]);
  }
  else
    this->setLedColorFast(_row, _col, 0, 0, 0);
}

void LedControl::setRow(uint8_t _row, byte _value) {
  if (_row < 0 || _row > 7)
    return;

  byte val;
  for (uint8_t _col = 0; _col < 8; _col++) {
    val = _value >> (_col);
    val = val & 0x01;
    this->setLed(_row, _col, val);
  }
}

void LedControl::setColumn(uint8_t _col, byte _value) {
  if (_col < 0 || _col > 7)
    return;

  byte val;
  for (uint8_t _row = 0; _row < 8; _row++) {
    //val = _value >> (7 - _row);
    val = _value >> (_row);
    val = val & 0x01;
    this->setLed(_row, _col, val);
  }
}

void LedControl::writeString(int16_t _time, char * _displayString) {
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
  if (this->Font_mode)
    this->cursor_x += 1 + pgm_read_byte(alphabetBitmap[CharToInt(c)] + FONE_SIZE_X);
  else
    this->cursor_y += 1 + FONE_SIZE_Y;
  return 1;
}


void LedControl::displayChar(int8_t row, int8_t col, char _charIndex) {
  if (row < 0 - 8 || row > 7 + 8 || col < 0 - 8 || col > 7 + 8 || CharToInt(_charIndex) > 94 || CharToInt(_charIndex) < 0)
    return;

  uint8_t n = CharToInt(_charIndex);
  uint8_t m = (this->Font_mode ? FONE_SIZE_X - pgm_read_byte(alphabetBitmap[n] + FONE_SIZE_X) : 0);

  byte val;
  for (int8_t i = m; i < FONE_SIZE_X + 1; i++) {
    for (int8_t _col = col; col < 0 ? _col < 8 + col : _col < 8; _col++) {
      if (i - m + row < 0 || i - m + row > 7)
        break;
      if (i != FONE_SIZE_X)
        val = pgm_read_byte(alphabetBitmap[n] + i) >> (_col - col);
      else
        val = 0x00 >> (_col - col);
      val = val & 0x01;
      this->setLed(i - m + row, _col, val);
    }
  }
}