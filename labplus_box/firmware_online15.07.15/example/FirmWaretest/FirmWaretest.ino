/**************************************************************************
  Copyright (C), 2014- ,  申议科技
  File name:      FirmWare.ino
  Author: jiangzhaohui      Version: v1.0      Date: 2014.10.8
  Description: scratch固件
  Others:         
  Function List:  
    1. setup()：系统初始化函数
	2. loop()：系统主循环函数
  History:  
                  
    1. Date: 2014.10.8       Author:
       Modification: 代码创建
    2. ...
****************************************************************************/
#include "Config.h"
 #include <avr/wdt.h>
 
BoardMega2560 board2560;

IRrecv MyIrrecv(PIN_INFRARED); // an instance of the IR receiver object
decode_results MyResults; // container for received IR codes
int8_t IrVal;


void setup()
{
	Serial.begin(115200); 
	Serial.flush();      
//	MyIrrecv.enableIRIn();  //init infrared remote
//        wdt_enable(WDTO_2S);
	board2560.bspInit(); 
   
}

void loop()
{
//    if (MyIrrecv.decode(&MyResults)) {
//       if(MyResults.value==16712445)      //接收到VOL+编码
//      {
//         IrVal = 2;
//      }
//      else if(MyResults.value==16750695){   //接收到VOL-编
//	IrVal = 1;		
//      }
//      MyIrrecv.resume(); // 接收下一个值
//    }
   
    board2560.readSerialPort();  		//读串口数据
    board2560.writeSerialPort();		//向主机发送传感器数据
  // Serial.println(distanceCm(PIN_TRIG, PIN_ECHO));
//    wdt_reset();
//delay(5);
}
