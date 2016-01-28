/**************************************************************************
  Copyright (C), 2014- ,  申议实业
  File name:      infraredTest.ino
  Author: jiangzhaohui      Version: v1.0      Date: 2014.10.8
  Description: 红外接收测试
	 通过串口可打印出遥控任意键的编码. 获取编码后,用两个键控制D5的亮灭
	 VOL+ : 灯亮      VOL- :灯灭
  History:  
                  
    1. Date: 2014.10.8       Author:
       Modification: 代码创建
    2. ...
****************************************************************************/

#include "Config.h"
//#include "IRremoteTools.h"
//#include "IRremote.h"

IRrecv test_irrecv(PIN_INFRARED); // an instance of the IR receiver object
decode_results test_results; // container for received IR codes

void setup()
{
  Serial.begin(9600);   //串口初始化,波特率为9600
  test_irrecv.enableIRIn(); //初始化红外遥控
 pinMode(PIN_LED_B,OUTPUT);  //设置LED灯控制引脚模式为输出
}
 
void loop() {
  if (test_irrecv.decode(&test_results)) {
     Serial.println(test_results.value); //测试,用来读取遥控代码
     if(test_results.value==16712445)      //接收到VOL+编码
     {
       // Serial.println(results.value);
        digitalWrite(PIN_LED_B, HIGH);                //点亮LED
       // Serial.println("turn on LED"); //串口显示开灯
     }
     else if(test_results.value==16750695)   //接收到VOL-编码
     {
       digitalWrite(PIN_LED_B, LOW);            //熄灭LED
       // Serial.println("turn off LED");    //串口显示关灯
     }
     test_irrecv.resume(); // 接收下一个值
  }
}
