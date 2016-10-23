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

Matrix::Matrix(uint8_t (*_addr)[8],bool _type) {
  //  uint8_t (*p)[10]=_addr;
  uint8_t _x = 0, _y = 0;
  for (uint8_t a = 0; a < 8; a++) //判断第一层
  {
    if (_addr[0][a] == 0) {

      break;  //NULL，结束当前层判断
    }
    else {
      _x = a + 1;
      for (uint8_t b = 0; b < 8; b++) { //判断第二层
        if (_addr[b][a] == 0) {
          break;  //NULL，结束当前层判断
        }
        else {
          _y = b + 1;
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
      _p[_s] = _addr[a][b];
    }
  }
  setDeviceAddr(_p);
  setType(_type);
  setBrightness(255);

  clearFastMode();
  clearColor();
}

void Matrix::setType(bool _type){
  for (int a = 0; a < getMatrixNum(); a++)
    led[a].setType(_type);
}


uint8_t Matrix::getDeviceAddr(uint8_t _a) {
  return led[_a].getDeviceAddr();
}


void Matrix::setDeviceAddr(uint8_t* _addr) {
  for (int a = 0; a < getMatrixNum(); a++)
    led[a].setDeviceAddr(_addr[a]);
}


void Matrix::clearDisplay() {
  for (int a = 0; a < getMatrixNum(); a++)
    led[a].clearDisplay();
}


void Matrix::setLedColor(uint8_t _row, uint8_t _col, uint8_t _value_r, uint8_t _value_g, uint8_t _value_b) {
  if((_col > (getHeight() * 8 - 1)) || (_row > (getWidth() * 8 - 1)))
	return;
  int16_t _s = (_row / 8) + (_col / 8) * getWidth();
  led[_s].setLedColor(_row % 8, _col % 8, _value_r, _value_g, _value_b);
}


void Matrix::setLedColorFast(uint8_t _row, uint8_t _col, uint8_t _value_r, uint8_t _value_g, uint8_t _value_b) {
  if((_col > (getHeight() * 8 - 1)) || (_row > (getWidth() * 8 - 1)))
	return;
  int16_t _s = (_row / 8) + (_col / 8) * getWidth();
  led[_s].setLedColorFast(_row % 8, _col % 8, _value_r, _value_g, _value_b);
}

void Matrix::setLed(uint8_t _row, uint8_t _col, bool _state) {
  if((_col > (getHeight() * 8 - 1)) || (_row > (getWidth() * 8 - 1)))
	return;
  int16_t _s = (_row / 8) + (_col / 8) * getWidth();
  led[_s].setLed(_row % 8, _col % 8, _state);
}

void Matrix::setLedBrightness(uint8_t _row, uint8_t _col, uint8_t _value) {
  if((_col > (getHeight() * 8 - 1)) || (_row > (getWidth() * 8 - 1)))
	return;
  int16_t _s = (_row / 8) + (_col / 8) * getWidth();
  led[_s].setLedBrightness(_row % 8, _col % 8, _value);
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


void Matrix::setColor(uint8_t _value_r, uint8_t _value_g, uint8_t _value_b) {
  for (int a = 0; a < getMatrixNum(); a++)
    led[a].setColor(_value_r, _value_g, _value_b);
}


void Matrix::clearColor() {
  for (int a = 0; a < getMatrixNum(); a++)
    led[a].clearColor();
}

void Matrix::setBrightness(uint8_t _value) {
  for (int a = 0; a < getMatrixNum(); a++)
    led[a].setBrightness(_value);
}


void Matrix::drawLine(int8_t x1, int8_t y1, int8_t x2, int8_t y2) {
  uint8_t tmp;
  uint8_t x, y;
  uint8_t dx, dy;
  int8_t err;
  int8_t ystep;

  uint8_t swapxy = 0;

  /* no BBX intersection check at the moment, should be added... */

  if ( x1 > x2 ) dx = x1 - x2; else dx = x2 - x1;
  if ( y1 > y2 ) dy = y1 - y2; else dy = y2 - y1;

  if ( dy > dx ) {
    swapxy = 1;
    tmp = dx; dx = dy; dy = tmp;
    tmp = x1; x1 = y1; y1 = tmp;
    tmp = x2; x2 = y2; y2 = tmp;
  }
  if ( x1 > x2 ) {
    tmp = x1; x1 = x2; x2 = tmp;
    tmp = y1; y1 = y2; y2 = tmp;
  }
  err = dx >> 1;
  if ( y2 > y1 ) ystep = 1; else ystep = -1;
  y = y1;
  for ( x = x1; x <= x2; x++ ) {
    if ( swapxy == 0 )
      setLed(x, y, 1);
    else
      setLed(y, x, 1);
    err -= (uint8_t)dy;
    if ( err < 0 ) {
      y += (uint8_t)ystep;
      err += (uint8_t)dx;
    }
  }
}


void Matrix::drawCircle_section(int8_t x, int8_t y, int8_t x0, int8_t y0, uint8_t option) {
  /* upper right */
  if ( option & U8G_DRAW_UPPER_RIGHT ) {
    setLed(x0 + x, y0 - y, 1);
    setLed(x0 + y, y0 - x, 1);
  }

  /* upper left */
  if ( option & U8G_DRAW_UPPER_LEFT ) {
    setLed(x0 - x, y0 - y, 1);
    setLed(x0 - y, y0 - x, 1);
  }

  /* lower right */
  if ( option & U8G_DRAW_LOWER_RIGHT ) {
    setLed(x0 + x, y0 + y, 1);
    setLed(x0 + y, y0 + x, 1);
  }

  /* lower left */
  if ( option & U8G_DRAW_LOWER_LEFT ) {
    setLed(x0 - x, y0 + y, 1);
    setLed(x0 - y, y0 + x, 1);
  }
}


void Matrix::drawVLine(int8_t x, int8_t y, int8_t w) {
  if(w<=0)
	return;

  while (w--) {
    setLed(x, y + w, 1);
  }
}


void Matrix::drawHLine(int8_t x, int8_t y, int8_t h) {
  if(h<=0)
	return;
	
  while (h--) {
    setLed(x + h, y, 1);
  }
}


void Matrix::drawDisc_section(int8_t x, int8_t y, int8_t x0, int8_t y0, uint8_t option) {
  /* upper right */
  if ( option & U8G_DRAW_UPPER_RIGHT ) {
    drawVLine(x0 + x, y0 - y, y + 1);
    drawVLine(x0 + y, y0 - x, x + 1);
  }

  /* upper left */
  if ( option & U8G_DRAW_UPPER_LEFT ) {
    drawVLine(x0 - x, y0 - y, y + 1);
    drawVLine(x0 - y, y0 - x, x + 1);
  }

  /* lower right */
  if ( option & U8G_DRAW_LOWER_RIGHT ) {
    drawVLine(x0 + x, y0, y + 1);
    drawVLine(x0 + y, y0, x + 1);
  }

  /* lower left */
  if ( option & U8G_DRAW_LOWER_LEFT ) {
    drawVLine(x0 - x, y0, y + 1);
    drawVLine(x0 - y, y0, x + 1);
  }
}


void Matrix::drawCircle(int8_t x0, int8_t y0, int8_t rad, int8_t option) {
  if(rad<=0)
	return;

  int8_t f;
  int8_t ddF_x;
  int8_t ddF_y;
  uint8_t x;
  uint8_t y;

  f = 1;
  f -= rad;
  ddF_x = 1;
  ddF_y = 0;
  ddF_y -= rad;
  ddF_y *= 2;
  x = 0;
  y = rad;

  drawCircle_section(x, y, x0, y0, option);

  while ( x < y ) {
    if (f >= 0) {
      y--;
      ddF_y += 2;
      f += ddF_y;
    }
    x++;
    ddF_x += 2;
    f += ddF_x;

    drawCircle_section(x, y, x0, y0, option);
  }
}


void Matrix::drawDisc(int8_t x0, int8_t y0, int8_t rad, int8_t option) {
  if(rad<=0)
	return;
  
  int8_t f;
  int8_t ddF_x;
  int8_t ddF_y;
  uint8_t x;
  uint8_t y;

  f = 1;
  f -= rad;
  ddF_x = 1;
  ddF_y = 0;
  ddF_y -= rad;
  ddF_y *= 2;
  x = 0;
  y = rad;

  drawDisc_section(x, y, x0, y0, option);

  while ( x < y ) {
    if (f >= 0) {
      y--;
      ddF_y += 2;
      f += ddF_y;
    }
    x++;
    ddF_x += 2;
    f += ddF_x;

    drawDisc_section(x, y, x0, y0, option);
  }
}


void Matrix::drawFrame(int8_t x, int8_t y, int8_t w, int8_t h){
  if(h<=0 || w<=0)
	return;
  
  int8_t xtmp = x;
    
  drawHLine(x, y, w);
  drawVLine(x, y, h);
  x+=w;
  x--;
  drawVLine(x, y, h);
  y+=h;
  y--;
  drawHLine(xtmp, y, w);	
}


void Matrix::drawRFrame(int8_t x, int8_t y, int8_t w, int8_t h, uint8_t r){
  if(h<3 || w<3)
	return;
  
if(r>(w-2)/2 || r>(h-2)/2)
	r=min((h-2)/2,(w-2)/2);

  int8_t xl, yu;
  xl = x;
  xl += r;
  yu = y;
  yu += r;
 
  {
    int8_t yl, xr;

    xr = x;
    xr += w;
    xr -= r;
    xr -= 1;
    
    yl = y;
    yl += h;
    yl -= r; 
    yl -= 1;

    drawCircle(xl, yu, r, U8G_DRAW_UPPER_LEFT);
    drawCircle(xr, yu, r, U8G_DRAW_UPPER_RIGHT);
    drawCircle(xl, yl, r, U8G_DRAW_LOWER_LEFT);
    drawCircle(xr, yl, r, U8G_DRAW_LOWER_RIGHT);
  }

  {
    int8_t ww, hh;

    ww = w;
    ww -= r;
    ww -= r;
    ww -= 2;
    hh = h;
    hh -= r;
    hh -= r;
    hh -= 2;
    
    xl++;
    yu++;
    h--;
    w--;
    drawHLine(xl, y, ww);
    drawHLine(xl, y+h, ww);
    drawVLine(x, yu, hh);
    drawVLine(x+w, yu, hh);
  }
}


void Matrix::drawBox(int8_t x, int8_t y, int8_t w, int8_t h){
  if(h<=0 || w<=0)
	return;

  do { 
    drawHLine(x, y, w);
    y++;    
    h--;
  } while( h != 0 );	
}


void Matrix::drawRBox(int8_t x, int8_t y, int8_t w, int8_t h, uint8_t r){
  if(h<3 || w<3)
	return;

  if(r>(w-2)/2 || r>(h-2)/2)
	r=min((h-2)/2,(w-2)/2);

  int8_t xl, yu;
  int8_t yl, xr;


  xl = x;
  xl += r;
  yu = y;
  yu += r;
 
  xr = x;
  xr += w;
  xr -= r;
  xr -= 1;
  
  yl = y;
  yl += h;
  yl -= r;
  yl -= 1;

  drawDisc(xl, yu, r, U8G_DRAW_UPPER_LEFT);
  drawDisc(xr, yu, r, U8G_DRAW_UPPER_RIGHT);
  drawDisc(xl, yl, r, U8G_DRAW_LOWER_LEFT);
  drawDisc(xr, yl, r, U8G_DRAW_LOWER_RIGHT);

  {
    int8_t ww, hh;

    ww = w;
    ww -= r;
    ww -= r;
    ww -= 2;
    hh = h;	
    hh -= r;
    hh -= r;
    hh -= 2;
    
    xl++;
    yu++;
    h--;
    drawBox(xl, y, ww, r+1);
    drawBox(xl, yl, ww, r+1);
    // drawHLine(xl, y+h, ww);
    drawBox(x, yu, w, hh);
    // drawVLine(x+w, yu, hh);
  }	
}


void Matrix::drawBMP(int16_t x, int16_t y, int16_t w, int16_t h,const uint8_t *bitmap){
  int16_t i, j, byteWidth = (w + 7) / 8;

  for(j=0; j<h; j++) {
    for(i=0; i<w; i++ ) {
      if(pgm_read_byte(bitmap + j * byteWidth + i / 8) & (128 >> ((h-i-1) & 7))) {
		setLed(x+i, y+j, 1);
      }
    }
  }
}


bool Matrix::drawBMP(int16_t x, int16_t y, const uint8_t *bitmap){
  uint32_t _dataNum = 0;
  uint8_t  _dataBuffer[BUFFPIXEL]; //pixel buffer (R+G+B per pixel)

  //Parse BMP header
  if (read16(bitmap, _dataNum) == 0x4D42) { //BMP signature
    (void)read32(bitmap, _dataNum); //File size
    (void)read32(bitmap, _dataNum); //Read & ignore creator bytes
    uint32_t bmpImageoffset = read32(bitmap, _dataNum); //Start of image data in file
    //Read DIB header
    (void)read32(bitmap, _dataNum);  //Header size
    int bmpWidth  = read32(bitmap, _dataNum),
        bmpHeight = read32(bitmap, _dataNum);

    bool  flip = true;      //BMP is stored bottom-to-top
    //If bmpHeight is negative, image is in top-down order.
    if (bmpHeight < 0) {
      bmpHeight = -bmpHeight;
      flip = false;
    }

    if (read16(bitmap, _dataNum) == 1) { //# planes -- must be '1'
      uint8_t bmpDepth = read16(bitmap, _dataNum); //Bit depth (currently must be 24)
      if ((bmpDepth == 24) && (read32(bitmap, _dataNum) == 0)) { //0 = uncompressed
        //BMP rows are padded (if needed) to 4-byte boundary
        uint32_t rowSize = (bmpWidth * 3 + 3) & ~3; //Not always = bmpWidth; may have padding

        //Crop area to be loaded
        int w = bmpWidth,
            h = bmpHeight;

        if ((x + w - 1) >= (getWidth() * 8)) w = (getWidth() * 8)  - x;
        if ((y + h - 1) >= (getHeight() * 8)) h = (getHeight() * 8) - y;

        for (int row = 0; row < h; row++) { //For each scanline...
          uint32_t pos = bmpImageoffset + (flip ? (bmpHeight - 1 - row) : row) * rowSize ;
          uint8_t  buffidx = sizeof(_dataBuffer); //Current position in _dataBuffer
          for (int col = 0; col < w; col++) { //For each pixel...
            //Time to read more pixel data?
            if (buffidx >= sizeof(_dataBuffer)) { //Indeed
              buffidx = 0; //Set index to beginning
              for (int a = 0; a < BUFFPIXEL; a++) {
                _dataBuffer[a] = pgm_read_byte(bitmap + (pos + a));
              }
            }

            uint8_t _b = _dataBuffer[buffidx++],
                    _g = _dataBuffer[buffidx++],
                    _r = _dataBuffer[buffidx++];
            setLedColor(col + x, row + y, _r, _g, _b);
          } //end pixel
        } //end scanline
      } //end goodBmp
      else {
        return false;
      }
    }//end planes
    else {
      return false;
    }
  }//end sianatrue
  else {
    return false;
  }
  return true;
}


void Matrix::writeString(char* _c, uint16_t _t, int16_t _xy) {
  int c1 = getWidth() * 8;
  int c2 = -getStringWidth(_c)  - c1;
  for (int a = c1; a > c2; a--) {
    setCursor(a, _xy);
    print(_c);
    delay(_t);
#ifdef WDT
    wdt_reset();
#endif
  }
}


size_t Matrix::write(uint8_t c) {
  if (CharToInt(c) > 94 || CharToInt(c) < 0)
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