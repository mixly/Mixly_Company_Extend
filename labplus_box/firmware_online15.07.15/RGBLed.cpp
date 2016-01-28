/**************************************************************************
  Copyright (C), 2014- ,  申议科技
  File name:      RGBLed.cpp
  Author: jiangzhaohui      Version: v1.0      Date: 2014.10.8
  Description: 三色LED驱动
		驱动使用：
		1、创建一个RGBLed对象
		2、调用setColorAt()设置亮度值
		3、调用show()显示
  Others: 1. WB2812B采用类类似单总线操作，一个WB2812控制一个三色灯，各灯串联起来，芯片采用消耗方式处理数据，
             即前一个LED灯消耗3bytes数据，再把剩下的数据传给下一个灯，依此类推，直到数据消耗完毕。
          2. 不同的芯片，如WS2812 WS2811的时序有些不一样，因此需根据使用的芯片修改。		  
  Function List:  
    1. RGBLed() 构造函数
	2. reset()  复位
	3. setNumber(uint8_t num_leds) 设置灯号
	4. getColorAt(uint8_t index)获得当前操作的灯值
	5. getNumber() 获得当前操作的灯号
	6. setColorAt(uint8_t index, long value) 设置给定LED灯值
	7. show() 显示
	8. setPort() 把板上端口号转换成AVR端口及引脚号
	
	9. rgbled_sendarray_mask() :私有函数，控制WS2812B执行点亮操作
  History:  
                  
    1. Date: 2014.10.8       Author:
       Modification: 代码创建
    2. ...
****************************************************************************/
#include "Config.h"

extern PortPin PortPin2ArduinoPin[11];

 RGBLed:: RGBLed(){
	setNumber(15);
}
 RGBLed:: RGBLed(uint8_t port){ //port为端口号
	int arduinoPin = PortPin2ArduinoPin[port].pin2; //端口引脚号转成arduino引脚号，如果调用本构造函数，输出引脚设定为板上端口第2脚。
	pinMask = digitalPinToBitMask(arduinoPin);      //arduino引脚号转成AVR端口引脚号，如PD3
	ws2812_port = portOutputRegister(digitalPinToPort(arduinoPin)); //arduino引脚号转成AVR端口号,如PD
	ws2812_port_reg = portModeRegister(digitalPinToPort(arduinoPin)); //由arduino引脚号计算出该引脚号的模式选择寄存器位
//	*ws2812_port_reg |= pinMask; //set pinMode OUTPUT
        pinMode(arduinoPin,OUTPUT);
	setNumber(15); //设定led个数
}
 RGBLed:: RGBLed(uint8_t port,uint8_t portPin){
	int arduinoPin;
	if( portPin == 1){
		arduinoPin = PortPin2ArduinoPin[port].pin1;
	}
	else{
		arduinoPin = PortPin2ArduinoPin[port].pin2;
	}
	pinMask = digitalPinToBitMask(arduinoPin);
	ws2812_port = portOutputRegister(digitalPinToPort(arduinoPin));
	ws2812_port_reg = portModeRegister(digitalPinToPort(arduinoPin));
    pinMode(arduinoPin,OUTPUT);

	//*ws2812_port_reg |= pinMask; // set pinMode OUTPUT
	setNumber(15);
}

/***************************************************************************
  Function:       setPort()
  Description:    把板上端口号转换成AVR端口及引脚号
  Calls:          
  Called By:      
  Input:  
		uint8_t port：板上端口号             
  Output:         
  Return:         
  Others:        
***************************************************************************/
 void RGBLed:: setPort(uint8_t port){ //port为端口号
	int arduinoPin = PortPin2ArduinoPin[port].pin2; //端口引脚号转成arduino引脚号，如果调用本构造函数，输出引脚设定为板上端口第2脚。
	pinMask = digitalPinToBitMask(arduinoPin);      //arduino引脚号转成AVR端口引脚号，如PD3
	ws2812_port = portOutputRegister(digitalPinToPort(arduinoPin)); //arduino引脚号转成AVR端口号,如PD
	ws2812_port_reg = portModeRegister(digitalPinToPort(arduinoPin)); //由arduino引脚号计算出该引脚号的模式选择寄存器位
//	*ws2812_port_reg |= pinMask; //set pinMode OUTPUT
        pinMode(arduinoPin,OUTPUT);
}
/***************************************************************************
  Function:       reset()
  Description:    复位
  Calls:          
  Called By:      
  Input:  
		uint8_t port：板上端口号
		uint8_t portPin  板上端口内引脚号              
  Output:         
  Return:         
  Others:        
***************************************************************************/
void  RGBLed::reset(uint8_t port, uint8_t portPin){
	int arduinoPin;
	if( portPin == 1){
		arduinoPin = PortPin2ArduinoPin[port].pin1;
	}
	else{
		arduinoPin = PortPin2ArduinoPin[port].pin2;
	}
	pinMask = digitalPinToBitMask(arduinoPin);
	ws2812_port = portOutputRegister(digitalPinToPort(arduinoPin));
	ws2812_port_reg = portModeRegister(digitalPinToPort(arduinoPin));
        //*ws2812_port_reg |= pinMask;
    pinMode(arduinoPin,OUTPUT);
}

/***************************************************************************
  Function:       setNumber()
  Description:    设置LED灯个数，并为LED亮度数据存储分配内存。一个LED有RGB三色，
				  因此要三个字节。
  Calls:          
  Called By:      
  Input:  
		uint8_t num_leds：LED灯个数                    
  Output:         
  Return:         
  Others:        
***************************************************************************/
void  RGBLed::setNumber(uint8_t num_leds){
	count_led = num_leds;
	pixels = (uint8_t*)malloc(count_led*3);
        for(int i=0;i<count_led*3;i++){
          pixels[i] = 0;
        }
}

/***************************************************************************
  Function:       getColorAt(uint8_t index)
  Description:    获得相应LED灯的亮度值，包含RGB三色数据
  Calls:          
  Called By:      
  Input:  
		uint8_t index：LED灯索引号（第几颗灯），从0开始                   
  Output:         
  Return:         
  Others:        
***************************************************************************/
/*cRGB  RGBLed::getColorAt(uint8_t index) {
	
	cRGB px_value;
	
	if(index < count_led) {
		
		uint8_t tmp;
		tmp = index * 3;
		
		px_value.g = pixels[tmp];
		px_value.r = pixels[tmp+1];
		px_value.b = pixels[tmp+2];
	}
	
	return px_value;
} */

/***************************************************************************
  Function:       getNumber()
  Description:    获得LED灯的索引号（第几颗灯）
  Calls:          
  Called By:      
  Input:           
  Output:         
  Return:         
  Others:        
***************************************************************************/
uint8_t  RGBLed::getNumber(){
	return count_led;
}

/***************************************************************************
  Function:       setColorAt()
  Description:    设定相关LED灯亮度值
				这里只是对相关变量赋值，赋完值后调用show()才显示
  Calls:          
  Called By:      
  Input:   
  Output:         
  Return:         
  Others:        
***************************************************************************/
bool  RGBLed::setColorAt(uint8_t index, uint8_t red,uint8_t green,uint8_t blue) {
	if(index < count_led) {
		uint8_t tmp = index * 3;
		pixels[tmp] = green;
		pixels[tmp+1] = red;
		pixels[tmp+2] = blue;
		
		return true;
	} 
	return false;
}

/***************************************************************************
  Function:       setColorAt()
  Description:    设定相关LED灯亮度值
				这里只是对相关变量赋值，赋完值后调用show()才显示
  Calls:          
  Called By:      
  Input:   
		uint8_t index：LED灯索引号（第几颗灯），从0开始
		long value  ：亮度值
  Output:         
  Return:         
  Others:        
***************************************************************************/
bool  RGBLed::setColorAt(uint8_t index, long value) {
	if(index < count_led) {
		uint8_t tmp = index * 3;
		uint8_t red = (value&0xff0000)>>16;
		uint8_t green = (value&0xff00)>>8;
		uint8_t blue = value&0xff;
		pixels[tmp] = green;
		pixels[tmp+1] = red;
		pixels[tmp+2] = blue;
		return true;
	} 
	return false;
}

/***************************************************************************
  Function:       setColorAt()
  Description:    设定相关LED灯亮度值
				这里只是对相关变量赋值，赋完值后调用show()才显示
  Calls:          
  Called By:      
  Input:   
		long value  ：亮度值 ：从高字节开始：1：灯号 2. R值 3.G值 4.B值
  Output:         
  Return:         
  Others:        
***************************************************************************/
bool  RGBLed::setColorAt(long value) {
	uint8_t index;
	index = ((value&0xff000000)>>24)-1; //灯号索引,灯号从1开始计数，但index从0开始。
	if(index < count_led) {
		uint8_t red = (value&0xff0000)>>16;
		uint8_t green = (value&0xff00)>>8;
		uint8_t blue = value&0xff;
		index = index*3;
		pixels[index] = green;
		pixels[index+1] = red;
		pixels[index+2] = blue;
		return true;
	} 
	return false;
}
/*
  This routine writes an array of bytes with RGB values to the Dataout pin
  using the fast 800kHz clockless WS2811/2812 protocol.
*/

// Timing in ns
#define w_zeropulse   350 //0高电平时长，低电平=1250-350
#define w_onepulse    900 //1高电平时长，低电平=1250-900
#define w_totalperiod 1250 //TH+TL=1.25μs

// Fixed cycles used by the inner loop
#define w_fixedlow    3
#define w_fixedhigh   6
#define w_fixedtotal  10   

// Insert NOPs to match the timing, if possible 插入的空操作数，以适应时序，一个空操作就是一个振荡周期。
#define w_zerocycles    (((F_CPU/1000)*w_zeropulse          )/1000000) //0的高脉冲个数
#define w_onecycles     (((F_CPU/1000)*w_onepulse    +500000)/1000000) //1的高脉冲个数
#define w_totalcycles   (((F_CPU/1000)*w_totalperiod +500000)/1000000) //1bit脉冲个数

// w1 - nops between rising edge and falling edge - low
#define w1 (w_zerocycles-w_fixedlow)    //0的低脉冲个数
// w2   nops between fe low and fe high
#define w2 (w_onecycles-w_fixedhigh-w1)
// w3   nops to complete loop
#define w3 (w_totalcycles-w_fixedtotal-w1-w2)

#if w1>0
  #define w1_nops w1
#else
  #define w1_nops  0
#endif

// The only critical timing parameter is the minimum pulse length of the "0"
// Warn or throw error if this timing can not be met with current F_CPU settings.
#define w_lowtime ((w1_nops+w_fixedlow)*1000000)/(F_CPU/1000)
#if w_lowtime>550
   #error "Light_ws2812: Sorry, the clock speed is too low. Did you set F_CPU correctly?"
#elif w_lowtime>450
   #warning "Light_ws2812: The timing is critical and may only work on WS2812B, not on WS2812(S)."
   #warning "Please consider a higher clockspeed, if possible"
#endif   

#if w2>0
#define w2_nops w2
#else
#define w2_nops  0
#endif

#if w3>0
#define w3_nops w3
#else
#define w3_nops  0
#endif

#define w_nop1  "nop      \n\t"
#define w_nop2  "rjmp .+0 \n\t"
#define w_nop4  w_nop2 w_nop2
#define w_nop8  w_nop4 w_nop4
#define w_nop16 w_nop8 w_nop8

/***************************************************************************
  Function:       rgbled_sendarray_mask()
  Description:    LED点亮操作
		用户通过setColor()等函数完成相关变量（存储着相关位灯的亮灭信息）赋值后，调用show函数执行显示，
		show()又调用本函数完成对ws2812B的操作。
  Calls:          
  Called By:      
  Input:  uint8_t *data, 指向存储各位LED亮度数值数组。
		  uint16_t datlen, 数据长，实际上是LED个数
		  uint8_t maskhi, AVR端口内位号：如PD3
		  uint8_t *port   AVR端口，如：PD PA PB                    
  Output:         
  Return:         
  Others:        
***************************************************************************/
void   RGBLed::rgbled_sendarray_mask(uint8_t *data,uint16_t datlen,uint8_t maskhi,uint8_t *port)
{
  	uint8_t curbyte,ctr,masklo;
	uint8_t oldSREG = SREG;
	cli();  //Disables all interrupts
	
  masklo = *port & ~maskhi;
  maskhi = *port | 	maskhi;
  
  while (datlen--) {
    curbyte=*data++;
    
    asm volatile(
    "       ldi   %0,8  \n\t"
    "loop%=:            \n\t"
    "       st    X,%3 \n\t"    //  '1' [02] '0' [02] - re
#if (w1_nops&1)
w_nop1
#endif
#if (w1_nops&2)
w_nop2
#endif
#if (w1_nops&4)
w_nop4
#endif
#if (w1_nops&8)
w_nop8
#endif
#if (w1_nops&16)
w_nop16
#endif
    "       sbrs  %1,7  \n\t"    //  '1' [04] '0' [03]
    "       st    X,%4 \n\t"     //  '1' [--] '0' [05] - fe-low
    "       lsl   %1    \n\t"    //  '1' [05] '0' [06]
#if (w2_nops&1)
  w_nop1
#endif
#if (w2_nops&2)
  w_nop2
#endif
#if (w2_nops&4)
  w_nop4
#endif
#if (w2_nops&8)
  w_nop8
#endif
#if (w2_nops&16)
  w_nop16 
#endif
    "       brcc skipone%= \n\t"    //  '1' [+1] '0' [+2] - 
    "       st   X,%4      \n\t"    //  '1' [+3] '0' [--] - fe-high
    "skipone%=:               "     //  '1' [+3] '0' [+2] - 

#if (w3_nops&1)
w_nop1
#endif
#if (w3_nops&2)
w_nop2
#endif
#if (w3_nops&4)
w_nop4
#endif
#if (w3_nops&8)
w_nop8
#endif
#if (w3_nops&16)
w_nop16
#endif

    "       dec   %0    \n\t"    //  '1' [+4] '0' [+3]
    "       brne  loop%=\n\t"    //  '1' [+5] '0' [+4]
    :	"=&d" (ctr)
//    :	"r" (curbyte), "I" (_SFR_IO_ADDR(ws2812_PORTREG)), "r" (maskhi), "r" (masklo)
    :	"r" (curbyte), "x" (port), "r" (maskhi), "r" (masklo)
    );
  }
  
  SREG = oldSREG;
}

/***************************************************************************
  Function:       show()
  Description:    点亮相关LED灯
  Calls:          
  Called By:      
  Input:   
		uint8_t index：LED灯索引号（第几颗灯），从0开始
		long value  ：亮度值
  Output:         
  Return:         
  Others:        
***************************************************************************/
void  RGBLed::show() {
//	*ws2812_port_reg |= pinMask; // Enable DDR
	rgbled_sendarray_mask(pixels,3*count_led,pinMask,(uint8_t*) ws2812_port);	
}

 RGBLed::~ RGBLed() {
		
}
