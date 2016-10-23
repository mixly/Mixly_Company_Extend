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
/*
  [head,2byte,0xAA 0xBB] [type,1byte,TYPE_NUM] [data,16byte] [body,1byte,getChecksum()]
  Example:
  AA BB C8 DC 05 DC 05 D0 07 EF 03 DC 05 DC 05 DC 05 DC 05 E3
*/

#include <Microduino_Protocol_SoftSer.h>
#include <SoftwareSerial.h>
SoftwareSerial mySerial(4, 5); // RX, TX
Protocol ProtocolA(&mySerial, TYPE_NUM);

uint16_t Data[8];

void setup() {
  Serial.begin(9600);

  ProtocolA.begin(9600);  //9600/19200/38400
}

void loop() {
  int sta = ProtocolA.parse(Data, MODE_WHILE);
  if (sta != P_NONE) {
    switch (sta) {
      case P_FINE:
        for (int a = 0; a < CHANNEL_NUM; a++) {
          Serial.print(Data[a]);
          Serial.print(" ");
        }
        Serial.println(" \t DATA OK");
        break;
      case P_ERROR:
        Serial.println(" \t DATA ERROR");
        mySerial.stopListening();
        mySerial.listen();
        break;
      case P_TIMEOUT:
        Serial.println(" \t DATA TIMEOUT");
        break;
    }
  }

  delay(10);
//  Serial.println("loop!");
}