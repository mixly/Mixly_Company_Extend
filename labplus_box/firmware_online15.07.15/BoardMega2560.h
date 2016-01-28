/**************************************************************************
  Copyright (C), 2014- ,  申议科技
  File name:      BoardMega2560.h
  Author: jiangzhaohui      Version: v1.0      Date: 2014.10.8
  Description: 定义一个类，代表主控板

  History:  
                  
    1. Date: 2014.10.8       Author:
       Modification: 代码创建
    2. ...
****************************************************************************/
#ifndef BoardMega2560_h
#define BoardMega2560_h

#include "TypeDef.h"

class BoardMega2560{
	public:
		BoardMega2560();
		void bspInit(void);         //初始化
		void readSerialPort(void);  
		void writeSerialPort(void); 
		void updateMotors(void);   
		
	private:
		union{
				byte byteVal[4];
				float floatVal;
				long longVal;
			}dataVal,sendDataVal;
		union{
				byte byteVal[8];
				double doubleVal;
			}dataVal1;
//		PortPin PortPin2ArduinoPin[11]; //端口引脚到arduin引脚的映射
//		PortDevice PTDevice[11];
		boolean protocolData;
		unsigned long lastDataReceivedTime; //用作超时处理
//        unsigned char deviceNums; //记录挂载的传感器数

		void updateActuator(int pinNumber);   //根据上位机送来数据，控制外设
		void reset(void); //超时复位函数
};

#endif