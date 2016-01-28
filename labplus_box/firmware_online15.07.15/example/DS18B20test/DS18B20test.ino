/**************************************************************************
  Copyright (C), 2014- ,  申议实业
  File name:      Display_Temperature.ino
  Author: jiangzhaohui      Version: v1.0      Date: 2014.12.26
  Description: 在LCD上显示从DS18B20上采集到的温度
  Others:         
  Function List:  
  History:  
                  
    1. Date: 2014.12.26       Author:
       Modification: 代码创建
    2. ...
****************************************************************************/
//包含要用到的库头文件
#include <Config.h>
 
// 初始连接在单总线上的单总线设备
OneWire oneWire(PIN_TEMPERATURE);  //创建一个单总线对象
DallasTemperature sensors(&oneWire); //创建一个DS18B20对象

void setup()
{
  sensors.begin();    //温度传感器初始化
  Serial.begin(9600);
}

void loop()
{
  sensors.requestTemperatures(); // 发送命令获取温度
  Serial.println((long)sensors.getTempCByIndex(0)); //显示温度值
//  lcd.print("°C");
  delay(1000);      //延时1000毫秒
}


