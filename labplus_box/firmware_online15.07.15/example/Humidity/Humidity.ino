/**************************************************************************
  Copyright (C), 2014- ,  申议实业
  File name:      Humidity.ino
  Version: v1.0      Date: 2014.10.8
  Description: 湿度传感器测试				 
  Others:         
  History:  
                  
    1. Date: 2014.10.8       Author:
       Modification: 代码创建
    2. ...
****************************************************************************/
#include "Config.h"
HumidityDHT11 DHT11Test(PIN_HUMIDITY);
void setup() {
  // put your setup code here, to run once:
 Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
	DHT11Test.read11();
	Serial.println(DHT11Test.temperature);
        Serial.println(DHT11Test.humidity);
	delay(10);
}
