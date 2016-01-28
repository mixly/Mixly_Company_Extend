/**************************************************************************
  Copyright (C), 2014- ,  申议科技
  File name:      HumidityDHT11.h
  Author: jiangzhaohui      Version: v1.0      Date: 2014.10.8
  Description: DHT11、DHT22温湿度传感器

  History:  
                  
    1. Date: 2014.10.8       Author:
       Modification: 代码创建
    2. ...
****************************************************************************/   
    #ifndef HumidityDHT11_H
    #define HumidityDHT11_H
      
    #if ARDUINO < 100  
    #include <WProgram.h>  
    #else  
    #include <Arduino.h>  
    #endif  
      
    #define DHT_LIB_VERSION "0.1.01"  
      
    class HumidityDHT11  
    {  
    public:  
		HumidityDHT11(uint8_t pin);
        int read11();  
        int read22();  
        double humidity;  
        double temperature; 
		uint8_t DataPin;
      
    private:  
        uint8_t bits[5];  // buffer to receive data  
        int read();  
    };  
    #endif  
 