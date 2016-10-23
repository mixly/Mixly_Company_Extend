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

uint8_t Addr[MatrixPix_X][MatrixPix_Y] = {  //1x1
  { 64}
};

Matrix display = Matrix(Addr, TYPE_S2); //TYPE_COLOR or TYPE_S2

static const uint8_t logoA[] PROGMEM = {   //低位在前 逐行
  0x00, 0x66, 0x66, 0xDB, 0xDB, 0xDB, 0xDB, 0x00
};

static const uint8_t logoB[] PROGMEM = {  //BMP File
  0x42, 0x4D, 0xF8, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x36, 0x00, 0x00, 0x00, 0x28, 0x00,
  0x00, 0x00, 0x08, 0x00, 0x00, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x18, 0x00, 0x00, 0x00,
  0x00, 0x00, 0xC2, 0x00, 0x00, 0x00, 0x20, 0x2E, 0x00, 0x00, 0x20, 0x2E, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xEE, 0xEE, 0xEE, 0xEE, 0xEE, 0xEE, 0xFF, 0xEE, 0xEE, 0xEE,
  0xEE, 0xEE, 0xFF, 0xEE, 0xEE, 0xEE, 0xEE, 0xEE, 0xFF, 0xEE, 0xEE, 0xEE, 0xEE, 0xDD, 0xEE, 0xEE,
  0xEE, 0x4D, 0x8E, 0x65, 0x26, 0x94, 0x50, 0x26, 0x94, 0x50, 0x26, 0x94, 0x50, 0x26, 0x94, 0x50,
  0x24, 0x60, 0x51, 0xEE, 0xEE, 0xDD, 0xEE, 0xEE, 0xEE, 0xDD, 0xBB, 0x99, 0xDD, 0xBB, 0x99, 0x4B,
  0x94, 0xD4, 0x2B, 0x69, 0x96, 0xCC, 0xBB, 0x84, 0xCC, 0xAA, 0x88, 0xFF, 0xEE, 0xDD, 0xFF, 0xEE,
  0xEE, 0xC7, 0xBB, 0x99, 0x50, 0xB2, 0x70, 0x26, 0x94, 0x50, 0x26, 0x94, 0x50, 0x47, 0x94, 0x4D,
  0xCC, 0xAA, 0x88, 0xEE, 0xEE, 0xDD, 0xEE, 0xEE, 0xEE, 0xDB, 0xCC, 0xB3, 0x53, 0xBB, 0x88, 0x53,
  0xBB, 0x88, 0x53, 0xBB, 0x88, 0x26, 0x94, 0x50, 0xB5, 0xAA, 0x92, 0xEE, 0xEE, 0xDD, 0xFF, 0xEE,
  0xEE, 0xDD, 0xDD, 0xCC, 0x53, 0xBB, 0x88, 0x3A, 0xD5, 0x95, 0x53, 0xBB, 0x88, 0x48, 0xAF, 0x50,
  0xCC, 0xAA, 0x99, 0xEE, 0xEE, 0xDD, 0xEE, 0xEE, 0xEE, 0xE2, 0xCB, 0xCD, 0x53, 0xBB, 0x88, 0x53,
  0xBB, 0x88, 0x3A, 0xD5, 0x95, 0x50, 0xB2, 0x70, 0xD6, 0xBB, 0xB1, 0xFF, 0xEE, 0xDD, 0xDD, 0xEE,
  0xEE, 0xEE, 0xEE, 0xEE, 0xFF, 0xFF, 0xEE, 0xEE, 0xEE, 0xEE, 0xFF, 0xEE, 0xEE, 0xEE, 0xEE, 0xEE,
  0xEE, 0xEE, 0xEE, 0xEE, 0xEE, 0xDD, 0x00, 0x00,
};

void setup() {
  Serial.begin(115200); // See the connection status in Serial Monitor
  Wire.begin();

  //display.clearFastMode();
  //display.setFastMode();
  display.setBrightness(255);

  //getDeviceAddr
  for (int a = 0; a < display.getMatrixNum(); a++) {
    Serial.print(display.getDeviceAddr(a));
    Serial.print(" ");
  }
  Serial.println("");

  display.clearDisplay();
  //setLedColor
  for (int y = 0; y < display.getHeight() * 8; y++) {
    for (int x = 0; x < display.getWidth() * 8; x++) {
      randomSeed(analogRead(A0));
      display.setLedBrightness(x, y, random(0, 255));   //x, y, brightness
      delay(5);
    }
  }
  delay(1000);

  //setLed
  display.clearDisplay();
  for (int y = 0; y < display.getHeight() * 8; y++) {
    for (int x = 0; x < display.getWidth() * 8; x++) {
      display.setLed(x, y, true);   //x, y, sta
      delay(5);
    }
  }
  delay(1000);

  display.clearDisplay();
  display.drawBMP(0, 0, 8, 8, logoA);  //x,y,w,h,data
  delay(2000);

  display.clearDisplay();
  //Windows Bitmap (BMP) file,24bit
  display.drawBMP(0, 0, logoB);   //x,y,data
  delay(2000);

  //clearColor
  display.clearColor();
  display.writeString("Microduino", 20, 0); //string, time ,y
  display.clearDisplay();
}

int i;
void loop() {
  display.drawBox(0, 0, 8, 8);  //x,y,w,h
  delay(2000);
  display.clearDisplay();

  display.drawRBox(0, 0, 8, 8, 2);  //x,y,w,h,r
  delay(2000);
  display.clearDisplay();

  display.drawFrame(0, 0, 8, 8);  //x,y,w,h
  delay(2000);
  display.clearDisplay();

  display.drawRFrame(0, 0, 8, 8, 2);  //x,y,w,h,r
  delay(2000);
  display.clearDisplay();

  display.drawCircle(3, 3, 3);  //x,y,r
  delay(2000);
  display.clearDisplay();

  display.drawDisc(3, 3, 3);  //x,y,r
  delay(2000);
  display.clearDisplay();

  display.drawLine(0, 0, 7, 7); //x,y,x1,y1
  delay(2000);
  display.clearDisplay();

  i = display.getStringWidth("mCookie!");
  for (int a = display.getWidth() * 8; a > -i - display.getWidth() * 8; a--) {
    display.setCursor(a, 0);   //x, y
    display.print("mCookie!");
    delay(20);
  }
  display.clearDisplay();


  //Print
  unsigned long timer = millis();
  while (millis() - timer < 5000) {
    display.setCursor(0, 0);   //x, y
    display.print((millis() - timer) / 100);
    delay(20);
  }
  display.clearDisplay();

  //String to char*
  String _buffer_data = "Analog(A0):";
  _buffer_data +=  analogRead(A0);

  char buffer_data[128];
  for (int a = 0; a < 128; a++) {
    buffer_data[a] = NULL;
  }

  for (int a = 0; a < _buffer_data.length(); a++) {
    buffer_data[a] = _buffer_data[a];
  }

  display.clearDisplay();
  display.writeString(buffer_data, 50, 1);
}