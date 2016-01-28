/**************************************************************************
  Copyright (C), 2014- ,  申议实业
  File name:      GetParameter.cpp
  Author: jiangzhaohui      Version: v1.0      Date: 2014.10.8
  Description: 称重传感器测试
		可利用本测试程序获取公式 实际重量=（AD转换值-偏移值）*修正系数 中的偏移值和修正系数，方法如下：
		分别注释掉步聚1 2 3中的其它两步，得到想到的参数。
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

 /*1.计算修正系数
 ·	利用Weight.read()分别读得100g和200克的法码AD采样值，在串口输出。联立求得修正系数和偏移量*/
 HX711 Weight(PIN_WEIGHT_DIO, PIN_WEIGHT_CLK);                                //a
 void setup(void)
 {
   Serial.begin(9600);
 }

 void loop(void){
     double sum = 0;    // 为了减小误差，一次取出10个值后求平均值。
     for (int i = 0; i < 10; i++) // 多次采样求平均值，以减少误差
    sum += Weight.read();  // 累加                                             //c
     Serial.println(sum/10); // 求平均值进行均差
 }

// /* 2.计算偏移值，其实在第1步已可以求出偏移值，但为了保证不放东西时称重值显示0，加多这一步，
     // 做法：不放任何东西读AD采样修值，此值即为偏移值
	 // 实际应用中温度呀其它因素可能影响空载称得归0，我们需要实现归0操作。方法很简单，利用本步
	 // 聚重新获得偏移值。*/
// HX711 Weight(PIN_WEIGHT_DIO, PIN_WEIGHT_CLK, 128);             //b
// void setup(void)
// {
  // Serial.begin(9600);
// }

// void loop(void){
    // double sum = 0;    // 为了减小误差，一次取出10个值后求平均值。
    // for (int i = 0; i < 10; i++) // 多次采样求平均值，以减少误差
   // sum += Weight.read();  // 累加                                             //c
    // Serial.println(sum/10); // 求平均值进行均差
// }

/* 3.利用获取的修正系数和偏移值，验证放上法码后的数据。此时利用Weight.bias_read()(此函数利用
     称重公式计算实际重量）读出法码实际重量
*/
//HX711 Weight(PIN_WEIGHT_DIO, PIN_WEIGHT_CLK, 128, 0.001355271);   
//void setup(void)
//{
//  Serial.begin(9600);
//  Weight.set_offset(669406);                                               
//}
//
//void loop(void){
//    double sum = 0;    // 为了减小误差，一次取出10个值后求平均值。
//    for (int i = 0; i < 10; i++) // 多次采样求平均值，以减少误差
//    sum += Weight.bias_read();                                              
//    Serial.println(sum/10); // 求平均值进行均差
//}
