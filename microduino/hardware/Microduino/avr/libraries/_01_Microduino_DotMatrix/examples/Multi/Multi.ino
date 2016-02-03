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

uint8_t Addr[MatrixPix_X][MatrixPix_Y] = {  //2x2
  { 64, 63},
  { 62, 61}
};

/*
  uint8_t Addr[MatrixPix_X][MatrixPix_Y] = {  //1x4
  { 64, 63, 62 , 61}
  };
*/

/*
uint8_t Addr[MatrixPix_X][MatrixPix_Y] = {  //3x2
  { 64, 63, 62},
  { 61, 60, 59}
};
*/

/*
uint8_t Addr[MatrixPix_X][MatrixPix_Y] = {  //4x4
  { 64, 63, 62, 61},
  { 60, 59, 58, 57},
  { 56, 55, 54, 53},
  { 52, 51, 50, 49}
};
*/

Matrix display = Matrix(Addr);

void setup() {
  Serial.begin(115200); // See the connection status in Serial Monitor
  Wire.begin();

  //getDeviceAddr
  for (int a = 0; a < display.getMatrixNum(); a++) {
    Serial.print(display.getDeviceAddr(a));
    Serial.print(" ");
  }
  Serial.println("");

  //setLedColor
  for (int y = 0; y < display.getHeight() * 8; y++) {
    for (int x = 0; x < display.getWidth() * 8; x++) {
      randomSeed(analogRead(A0));
      display.setLedColor(x, y, random(0, 255), random(0, 255), random(0, 255));   //x, y, r, g, b
      delay(5);
    }
  }
  delay(1000);
  display.clearDisplay();

  //clearColor
  display.clearColor();
  //writeString H
  display.writeString("Microduino", MODE_H, 20, 0); //string, MODE, time ,y
  display.clearDisplay();
  //writeString V
  display.writeString("Microduino", MODE_V, 20, 0); //string, MODE, time ,x
  display.clearDisplay();
}

int i;
void loop() {
  i = display.getStringWidth("mCookie!");
  display.setColor(255, 255, 0);
  display.setFontMode(MODE_H);
  for (int a = display.getWidth() * 8; a > -i - display.getWidth() * 8; a--) {
    display.setCursor(a, 0);   //x, y
    display.print("mCookie!");
    delay(20);
  }
  display.clearDisplay();

  i = display.getStringHeight("mCookie!");
  display.setColor(255, 0, 255);
  display.setFontMode(MODE_V);
  for (int a = display.getHeight() * 8; a > -i - display.getHeight() * 8; a--) {
    display.setCursor(0, a);   //x, y
    display.print("mCookie!");
    delay(20);
  }
  display.clearDisplay();

  unsigned long timer = millis();
  display.setColor(0, 255, 255);
  display.setFontMode(MODE_H);
  while (millis() - timer < 5000) {
    display.setCursor(0, 0);   //x, y
    display.print((millis() - timer) / 100);
    delay(20);
  }
  display.clearDisplay();
}