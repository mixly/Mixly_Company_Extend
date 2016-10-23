#include <AT24Cxx.h>

AT24Cxx at24c32;
uint8_t buf;

void setup (void){
  //初始化串口
  Serial.begin(9600);
  //初始化I2C
  at24c32.begin();

}

void loop() {
  //判断是否有新串口数据
  Serial.println("please input a char:");
  while(!Serial.available());
  while (Serial.available() > 0) {
    char c = Serial.read();
    Serial.print(c);
    Serial.println(" write into the at24c32");
    at24c32.writeMem(0, c);
    delay(200);
    at24c32.readMem(0, &buf, 1);
    Serial.print(buf);
    Serial.println(" read from the at24c32");   
  }
}
