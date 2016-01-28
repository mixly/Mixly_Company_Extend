/**************************************************************************
  Copyright (C), 2014- ,  申议实业
  File name:      HX711.cpp
  Author: jiangzhaohui      Version: v1.0      Date: 2014.10.8
  Description: 主控板类成员定义
  Others:         
  Function List:  
    1. 
	2. 
	驱动使用：
	    1、定义一个对象实例：HX711 MyHx711(pin_clk, pin_dout);
		2、写一代码，利用串口获取read()函数读到的AD值，以计算偏移值和修正值。
		   分别放1000克和500克法码，读出其AD值，联立求解 实际重量=（AD转换值-偏移值）*修正系数，以计算出修正值和编移值。
		   为保证准确可多读几次求平均获得AD值。
		3、获得这两个值后，就可以在以后的应用中的初始化代码中设定好这两个值了。
		   HX711 MyHx711(pin_clk, pin_dout, 128, 计算出的修正值)
		   初始化代码中，调用set_offset(计算出的偏移值)。
		4、以后就可以调用bias_read()读实际重量了。
  History:  
                  
    1. Date: 2014.10.8       Author:
       Modification: 代码创建
    2. ...
****************************************************************************/
//#include <Arduino.h>
//#include <HX711.h>
#include "Config.h"

/***************************************************************************
  Function:       HX711()
  Description:    构造函数
  Calls:          
  Called By:      
  Input:      byte sck: 时钟引脚
              byte dout:数据引脚  
              byte amp: 设置的放大倍数 默认值128 可选值：32 64 128 此值同时同时也选择通道
			  double co: 修正系数  默认为1
  Output:         
  Return:         
  Others:        
***************************************************************************/
HX711::HX711(byte sck, byte dout, byte amp, double co) {
    SCK = sck;
    DOUT = dout;
    set_amp(amp);
    COEFFICIENT = co;
    pinMode(SCK, OUTPUT);
    pinMode(DOUT, INPUT);
    digitalWrite(SCK, LOW);
    read();
}

/***************************************************************************
  Function:      set_amp()
  Description:   设置增益和选择通道
                
  Calls:          
  Called By:      
  Input:    
		byte amp: 设置的放大倍数 默认值128，可选值：32 64 128 此值同时同时也选择通道
  Output:         
  Return:         
  Others:        
***************************************************************************/
void HX711::set_amp(byte amp) {
    switch (amp) {
        case 32: AMP = 2; break;
        case 64: AMP = 3; break;
        case 128: AMP = 1; break;
    }
}

/***************************************************************************
  Function:      is_ready()
  Description:   判定芯片AD转换是否成功
                通过分析DOUT引脚电平判定
  Calls:          
  Called By:      
  Input:    

  Output: 0：AD转换成功，MCU可在CLK引脚输入25-27个时钟脉冲，并从DOUT引脚读取数据        
  Return:         
  Others:        
***************************************************************************/
bool HX711::is_ready() {
    return digitalRead(DOUT) == LOW;
}

/***************************************************************************
  Function:      read()
  Description:   
                
  Calls:          
  Called By:      
  Input:    

  Output:      
  Return:         
  Others:        
***************************************************************************/
long HX711::read() {
    long val = 0;
    while (!is_ready());
    for (int i = 0; i < 24; i++) {
        pulse(SCK);
        val <<= 1;
        if (digitalRead(DOUT) == HIGH) val++;
    }
    for (int i = 0; i < AMP; i++) { //跟据AMP值，决定发送25、26还是27个脉冲，以确定下一次读哪个通道及该通道增益
        pulse(SCK);
    }
    return val & (1L << 23) ? val | ((-1L) << 24) : val;
}

double HX711::bias_read() {
    return (read() - OFFSET) * COEFFICIENT;
}

/***************************************************************************
  Function:      tare()
  Description:   实现去皮功能
                 关于偏移值，理想状态下，没有重量时，read()读出的AD值为0，实际上读出的不是0，这个就是偏移值。减掉偏移值后，
				 乘以一个比例系数（修正值），就得到重量值（因为AD值和真实重量值成正比，同样的，放大容器后的AD值读出的的值
				 也是偏移值，减掉它后，计算出来的重量也就不包含皮重了。
  Calls:          
  Called By:      
  Input:    int t: 采样次数，多次采样求平均

  Output:      
  Return:         
  Others:        
***************************************************************************/
void HX711::tare(int t) {
    double sum = 0;
    for (int i = 0; i < t; i++) {
        sum += read();
    }
    set_offset(sum / t);
}

/***************************************************************************
  Function:      set_offset()
  Description:   设定偏移值
                 公式：实际重量=（AD转换值-偏移值）*修正系数
				 偏移量和修正系数的计算：用read()函数分别读出1000克和500克的法码的AD转换值。联立方程求解，
				 再调用本函数和下面的set_offset(long offset)，设定好偏移值和修正系数值。这样就可以利用
				 bias_read()获取实际重量。
  Calls:          
  Called By:      
  Input:    long offset: 计算得到的偏移值

  Output:      
  Return:         
  Others:        
***************************************************************************/
void HX711::set_offset(long offset) {
    OFFSET = offset;
}

/***************************************************************************
  Function:     set_co(double co)
  Description:   设定修正系数
                
  Calls:          
  Called By:      
  Input:    double co: 计算出来的修正系数

  Output:      
  Return:         
  Others:        
***************************************************************************/
void HX711::set_co(double co) {
    COEFFICIENT = co;
}
