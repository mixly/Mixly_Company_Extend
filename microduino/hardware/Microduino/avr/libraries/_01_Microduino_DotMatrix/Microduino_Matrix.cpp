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

#include "Microduino_Matrix.h"

Matrix::Matrix(uint8_t (*_addr)[8]) {
//	uint8_t (*p)[10]=_addr;
  uint8_t _x = 0, _y = 0;
  for(uint8_t a=0;a<8;a++)	//判断第一层
  {
     if(_addr[0][a] == 0){

      break;	//NULL，结束当前层判断
    }
    else{
      _x = a+1;
      for(uint8_t b=0;b<8;b++) { //判断第二层
        if(_addr[b][a] == 0){
          break;	//NULL，结束当前层判断
        }
        else {
          _y = b+1;
        }
      }
    } 
  }
  
  this->_numX = _x;
  this->_numY = _y;

  this->_matrixNum = this->_numX * this->_numY;
  led = new LedControl[this->_matrixNum];

  this->cursor_y = 0;
  this->cursor_x = 0;

  uint8_t _p[64];  
  for (int a = 0; a < this->_numY; a++) {
    for (int b = 0; b < this->_numX ; b++) {
      uint8_t _s = b + a * this->_numX ;
      _p[_s]=_addr[a][b];
    }
  }
  setDeviceAddr(_p);

  clearFastMode();
  clearColor();
  setFontMode(true);
}


uint8_t Matrix::getDeviceAddr(uint8_t _a) {
    return led[_a].getDeviceAddr();
}


void Matrix::setDeviceAddr(uint8_t* _addr){
  for (int a = 0; a < getMatrixNum(); a++)
    led[a].setDeviceAddr(_addr[a]);
}


void Matrix::clearDisplay() {
  for (int a = 0; a < getMatrixNum(); a++)
    led[a].clearDisplay();
}


void Matrix::setLedColor(uint8_t _row, uint8_t _col, uint8_t _value_r, uint8_t _value_g, uint8_t _value_b) {
    int16_t _s = (_row/8) + (_col/8) * getWidth();
    led[_s].setLedColor(_row%8, _col%8, _value_r, _value_g, _value_b);
}


void Matrix::setLedColorFast(uint8_t _row, uint8_t _col, uint8_t _value_r, uint8_t _value_g, uint8_t _value_b) {
    int16_t _s = (_row/8) + (_col/8) * getWidth();
    led[_s].setLedColorFast(_row%8, _col%8, _value_r, _value_g, _value_b);
}


void Matrix::setCursor(int16_t _x, int16_t _y) {
  this->cursor_x = _x;
  this->cursor_y = _y;

  for (int _y = 0; _y < getHeight(); _y++) {
    for (int _x = 0; _x < getWidth(); _x++) {
      uint8_t _s = _x + _y * getWidth();
      led[_s].setCursor(-(8 * _x) + this->cursor_x, -(8 * _y) + this->cursor_y);
    }
  }
}


void Matrix::setFastMode() {
  //  runFun(&setFastMode);
  //  this->Fast_mode = true;
  for (int a = 0; a < getMatrixNum(); a++)
    led[a].setFastMode();
}


void Matrix::clearFastMode() {
  //  this->Fast_mode = false;
  for (int a = 0; a < getMatrixNum(); a++)
    led[a].clearFastMode();
}


void Matrix::setFontMode(bool _Mode) {
  for (int a = 0; a < getMatrixNum(); a++)
    led[a].setFontMode(_Mode);
}


void Matrix::setColor(uint8_t value_r, uint8_t value_g, uint8_t value_b) {
  for (int a = 0; a < getMatrixNum(); a++)
    led[a].setColor(value_r, value_g, value_b);
}


void Matrix::clearColor() {
  for (int a = 0; a < getMatrixNum(); a++)
    led[a].clearColor();
}


void Matrix::writeString(char* _c, bool _m, uint16_t _t, int16_t _xy) {
  setFontMode(_m);
  int c1 = (_m ? getWidth() : getHeight()) * 8;
  int c2 = -(_m ? getStringWidth(_c) : getStringHeight(_c))  - c1;
  for (int a = c1; a > c2; a--) {
    setCursor((_m ? a : _xy), (_m ? _xy : a));
    print(_c);
    delay(_t);
#ifdef WDT
    wdt_reset();
#endif
  }
}


size_t Matrix::write(uint8_t c) {
   if(CharToInt(c) > 94 || CharToInt(c) < 0)
	return 0;

  for (int a = 0; a < getMatrixNum(); a++)
    led[a].write(c);

  return 1;
/* void Matrix::print(char* _c) {
  for (int a = 0; a < this->_matrixNum; a++)
    led[a].print(_c);
} */
}


int16_t Matrix::getStringWidth(char* _String) {
  //    return (uint32_t)(offset + millis() / 1000);
  int _leng = 0;
  int _Width = 0;
  while (_String[_leng] != NULL) {
    _Width += 1 + pgm_read_byte(alphabetBitmap[((int)_String[_leng] - 32)] + FONE_SIZE_X);
    _leng++;
  }
  return _Width;
}


int16_t Matrix::getStringHeight(char* _String) {
  //    return (uint32_t)(offset + millis() / 1000);
  int _leng = 0;
  int _Height = 0;
  while (_String[_leng] != NULL) {
    _Height += 1 + FONE_SIZE_Y;
    _leng++;
  }
  return _Height;
}


int16_t Matrix::getMatrixNum() {
  return this->_matrixNum;
}


int16_t Matrix::getWidth() {
  return this->_numX;
}


int16_t Matrix::getHeight() {
  return this->_numY;
}