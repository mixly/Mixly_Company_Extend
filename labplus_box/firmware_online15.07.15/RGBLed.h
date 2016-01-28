/**************************************************************************
  Copyright (C), 2014- ,  申议科技
  File name:      RGBLed.h
  Author: jiangzhaohui      Version: v1.0      Date: 2014.10.8
  Description: 三色LED驱动		
  Others:         
 
  History:  
                  
    1. Date: 2014.10.8       Author:
       Modification: 代码创建
    2. ...
****************************************************************************/
#ifndef  RGBLed_h
#define  RGBLed_h 

class  RGBLed{
public: 
	 RGBLed();
	 RGBLed(uint8_t port);
	 RGBLed(uint8_t port,uint8_t portPin);
	~ RGBLed();
	void setPort(uint8_t port);
	void reset(uint8_t port, uint8_t portPin);
	void setNumber(uint8_t num_led); //设置LED个数
	uint8_t getNumber(); //获取LED个数
	bool setColorAt(uint8_t index, uint8_t red,uint8_t green,uint8_t blue);//设置相应索引的LED的各颜色值
	bool setColorAt(uint8_t index, long value);//设置相应索引的LED灯的亮度值
	bool setColorAt(long value); ////设置相应索引的LED灯的亮度值,灯号索引值包含在value中
	void show(); //使设置值生效
	
private:
	uint16_t count_led;
	uint8_t *pixels;
	//struct cRGB { uint8_t g; uint8_t r; uint8_t b};
	
	void rgbled_sendarray_mask(uint8_t *array,uint16_t length, uint8_t pinmask,uint8_t *port);

	const volatile uint8_t *ws2812_port;
	volatile uint8_t *ws2812_port_reg;
	uint8_t pinMask; 
//public:	
 //   cRGB getColorAt(uint8_t index); //获取相应LED灯索引的亮度值
};
#endif
