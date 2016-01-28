/**************************************************************************
  Copyright (C), 2014- ,  申议科技
  File name:      HumidityDHT11.cpp
  Author: jiangzhaohui      Version: v1.0      Date: 2014.10.8
  Description: 读DHT11、DHT22温湿度传感器温湿度数据
           驱动使用：1. 创建HumidityDHT11对象实例。
					 2. 利用成员函数read11()或read22()读传感器数据，函数会把读到的数据存入
						对象成员变量humidity和temperature中
					 3、应用程序处理读到的数据。
			说明：对于总线型数据传输，时序很重要，建议使用示波器检测时序。
  History:  
                  
    1. Date: 2014.10.8       Author:
       Modification: 代码创建
    2. ...
****************************************************************************/ 
#include "Config.h"  
      
#define TIMEOUT 10000  
/***************************************************************************
  Function:    HumidityDHT11()
  Description: 构造函数
			   
  Calls:          
  Called By:      
  Input:   uint8_t pin : 数据引脚号       
                 
  Output:         
  Return:  
  Others:        
***************************************************************************/
HumidityDHT11::HumidityDHT11(uint8_t pin)
{
	DataPin = pin;
}

/***************************************************************************
  Function:    read11()
  Description: 读传感器数据,不带小数点
			   
  Calls:          
  Called By:      
  Input:   uint8_t pin : 数据引脚号       
                 
  Output:         
  Return: 0 : OK  -1 : checksum error  -2 : timeout  
  Others:        
***************************************************************************/      
    int HumidityDHT11::read11()  
    {  
        // READ VALUES  
        int rv = read();  
        if (rv != 0) return rv;  
      
        // CONVERT AND STORE  
        humidity    = bits[0];  // 当前小数点后的数据为0，可不管它 bit[1] == 0;  
        temperature = bits[2];  // bits[3] == 0;  
      
        // TEST CHECKSUM  
        uint8_t sum = bits[0] + bits[2]; // bits[1] && bits[3] both 0  
        if (bits[4] != sum) return -1;  
      
        return 0;  
    }  
 
/***************************************************************************
  Function:    read22()
  Description: 读传感器数据，带小数点
			   
  Calls:          
  Called By:      
  Input:  uint8_t pin  : 数据引脚号       
                 
  Output:         
  Return: 0 : OK  -1 : checksum error  -2 : timeout  
  Others:        
***************************************************************************/  
    int HumidityDHT11::read22()  
    {  
        // READ VALUES  
        int rv = read();  
        if (rv != 0) return rv;  
      
        // CONVERT AND STORE  
        humidity    = word(bits[0], bits[1]) * 0.1;  
      
        int sign = 1;  
        if (bits[2] & 0x80) // negative temperature  
        {  
            bits[2] = bits[2] & 0x7F;  
            sign = -1;  
        }  
        temperature = sign * word(bits[2], bits[3]) * 0.1;  
      
      
        // TEST CHECKSUM  
        uint8_t sum = bits[0] + bits[1] + bits[2] + bits[3];  
        if (bits[4] != sum) return -1;  
      
        return 0;  
    }  

/***************************************************************************
  Function:    read()
  Description: 把传感器数据读入bit[5],一次读5字节
			   
  Calls:          
  Called By:      
  Input:   uint8_t pin  : 数据引脚号      
                 
  Output:         
  Return: 0 : OK   -2 : timeout  
  Others:        
***************************************************************************/ 	
    int HumidityDHT11::read()  
    {  
        // INIT BUFFERVAR TO RECEIVE DATA  
        uint8_t cnt = 7;  
        uint8_t idx = 0;  
      
        // EMPTY BUFFER  
        for (int i=0; i< 5; i++) bits[i] = 0;  
      
        /*1. 主机发开始信号：拉低20ms,再拉高40us */ 
        pinMode(DataPin, OUTPUT);  
        digitalWrite(DataPin, LOW);  
        delay(20);  
        digitalWrite(DataPin, HIGH);  
        delayMicroseconds(40);  
        pinMode(DataPin, INPUT);  
      
        /* 2.从机应答：从机收到主机开始信号后，会拉低80us再拉高80us应答，主机用延时等待方式检测 */ 
        unsigned int loopCnt = TIMEOUT;  
        while(digitalRead(DataPin) == LOW)  
            if (loopCnt-- == 0) return -2;  
      
        loopCnt = TIMEOUT;  
        while(digitalRead(DataPin) == HIGH)  
            if (loopCnt-- == 0) return -2;  
      
        /* 3.从机发送40bit = 5bytes数据给主机 
             数据0: 50us低+16-28us高  数据1：50us低+70us高
			 数据格式： 1byte温度整数位 + 1byte温度小数位 + 
			 1byteijo湿度整数位 + 1byte湿度小数位 + 1byte校验和 */
        for (int i=0; i<40; i++)  
        {  
            loopCnt = TIMEOUT;  
            while(digitalRead(DataPin) == LOW)  
                if (loopCnt-- == 0) return -2;  
      
            unsigned long t = micros();  
      
            loopCnt = TIMEOUT;  
            while(digitalRead(DataPin) == HIGH)  
                if (loopCnt-- == 0) return -2;  
      
            if ((micros() - t) > 40) bits[idx] |= (1 << cnt);  
            if (cnt == 0)   // next byte?  
            {  
                cnt = 7;     
                idx++;        
            }  
            else cnt--;  
        }  
      
        return 0;  
    }  
  