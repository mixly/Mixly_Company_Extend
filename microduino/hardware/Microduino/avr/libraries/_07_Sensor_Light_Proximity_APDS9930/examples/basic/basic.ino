/*
 =================================
 本作品采用知识共享 署名-非商业性使用-相同方式共享 3.0 未本地化版本 许可协议进行许可
 访问 http://creativecommons.org/licenses/by-nc-sa/3.0/ 查看该许可协议
 版权所有：
 @老潘orz  wasdpkj@hotmail.com
 =================================

 Microduino wiki:
 http://wiki.microduino.cc
 */

#include <Wire.h>
#include <APDS9930.h>

APDS9930 Proximity;

void setup()
{
  Serial.begin(9600);

  //(LEDPW)LED Drive Strength:1x,2x,4x,8x
  //(PGAIN)Proximity Gain Control:1x,2x,4x,8x
  //(AGAIN)ALS Gain Control:1x,8x,16x,120x
  Proximity.init(APDS9930_LEDPW_2X, APDS9930_PGAIN_2X, APDS9930_AGAIN_8X);
}

void loop()
{
  //Power ON. This bit activates the internal oscillator to permit the timers and ADC channels to operate.
  //Writing a "PON" activates the oscillator. Writing a "POFF" disables the oscillator
  Proximity.power(PON);
  //get data
  Proximity.getdata();
  Proximity.power(POFF);

  Serial.println("");
  Serial.print("CH0_data: ");
  Serial.print(Proximity.ch0_data);
  Serial.print(" ,CH1_data: ");
  Serial.print(Proximity.ch1_data);
  Serial.print(" ,Prox_data: ");
  Serial.println(Proximity.prox_data);

  delay(200);
}
