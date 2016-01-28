/*************************************************** 
  This is a library for our I2C LED Backpacks

  Designed specifically to work with the Adafruit LED Matrix backpacks 
  ----> http://www.adafruit.com/products/872
  ----> http://www.adafruit.com/products/871
  ----> http://www.adafruit.com/products/870

  These displays use I2C to communicate, 2 pins are required to 
  interface. There are multiple selectable I2C addresses. For backpacks
  with 2 Address Select pins: 0x70, 0x71, 0x72 or 0x73. For backpacks
  with 3 Address Select pins: 0x70 thru 0x77

  Adafruit invests time and resources providing this open source code, 
  please support Adafruit and open-source hardware by purchasing 
  products from Adafruit!

  Written by Limor Fried/Ladyada for Adafruit Industries.  
  BSD license, all text above must be included in any redistribution
 ****************************************************/
#include "Config.h"

Adafruit_max7219matrix Matrix;

void setup() {
  Serial.begin(9600);
  Serial.println("8x8 LED Matrix Test");
  
  Matrix.shutdown(0, false);  //指定max7219从待机模式进入正常工作模式
  Matrix.clearDisplay(0);
}

static const uint8_t PROGMEM
  smile_bmp[] =
  { B00111100,
    B01000010,
    B10100101,
    B10000001,
    B10100101,
    B10011001,
    B01000010,
    B00111100 };

void loop() {
  Matrix.clearDisplay(1);
  Matrix.drawBitmap(0, 0, smile_bmp, 8, 8, 1);
  Matrix.setDisplay(0);
  delay(500);
}
