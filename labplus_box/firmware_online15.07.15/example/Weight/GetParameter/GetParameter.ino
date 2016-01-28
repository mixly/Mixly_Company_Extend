/**************************************************************************
  Copyright (C), 2014- ,  申议实业
  File name:      GetParameter.cpp
  Author: jiangzhaohui      Version: v1.0      Date: 2014.10.8
  Description: 称重传感器测试
		可利用本测试程序获取公式 实际重量=（AD转换值-偏移值）*修正系数 中的偏移值和修正系数，方法如下：
		1.a c 行代码码取消注释，b d e 行代码注释掉，通过串口分别读到1000g和500g的法码的AD采样值。
		  利用上面公式联立求得修正系数。
		2.a e d注释掉，b c取消注释，再利用串口读不加法码的空状态下的AD值。此值即为偏移值。
		3.a c注释掉，b d e去掉注释，即可通串口读到真实测量值。
		4.跟据实际情况修正偏移值和修下系数。
		5.本库函数是假定传感器形变跟重量值成线性关系编写，实际的上只是接近线性关系。如须更加精确，需要
		  改正，具体可参阅网上相关资料
  Others:         
  Function List:  
    1. 
	2. 
  History:  
                  
    1. Date: 2014.10.8       Author:
       Modification: 代码创建
    2. ...
****************************************************************************/
#include "Config.h"

//HX711 Weight(PIN_WEIGHT_DIO, PIN_WEIGHT_CLK);                                //a
HX711 Weight(PIN_WEIGHT_DIO, PIN_WEIGHT_CLK, 128, 0.00145433);                 //b
void setup(void)
{
  Serial.begin(9600);
  Weight.set_offset(-77020);                                                  //e
}

void loop(void){
    double sum = 0;    // 为了减小误差，一次取出10个值后求平均值。
    for (int i = 0; i < 10; i++) // 多次采样求平均值，以减少误差
//    sum += Weight.read();  // 累加                                         //c
    sum += Weight.bias_read();                                               //d
    Serial.println(sum/10); // 求平均值进行均差
}
