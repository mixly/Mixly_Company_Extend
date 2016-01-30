/*
 =================================
 本作品采用知识共享 署名-非商业性使用-相同方式共享 3.0 未本地化版本 许可协议进行许可
 访问 http://creativecommons.org/licenses/by-nc-sa/3.0/ 查看该许可协议
 版权所有：
 @老潘orz  wasdpkj@hotmail.com
 =================================

 Microduino wiki:
 http://wiki.microduino.cc
 */

#ifndef _APDS9930_H_
#define _APDS9930_H_

#if ARDUINO >= 100
 #include <Arduino.h>
#else
 #include <WProgram.h>
#endif

#define I2C_ADDR_APDS9930 0x39

#define APDS9930_ATIME  0xff // 2.7 ms – minimum ALS integration time 
#define APDS9930_WTIME  0xff // 2.7 ms – minimum Wait time 
#define APDS9930_PTIME  0xff // 2.7 ms – minimum Prox integration time 
#define APDS9930_PPULSE 1

//LED Drive Strength
#define APDS9930_LEDPW_1X 3 //LED power,12.5ma
#define APDS9930_LEDPW_2X 2 //LED power,25ma
#define APDS9930_LEDPW_4X 1 //LED power,50ma
#define APDS9930_LEDPW_8X 0 //LED power,100ma

//Proximity Diode Select
#define  APDS9930_PDIODE_OFF  0 // Reserved
#define  APDS9930_PDIODE_ON  2 // Proximity uses the Ch1 diode
#define  APDS9930_PDIODE  APDS9930_PDIODE_ON

//Proximity Gain Control
#define  APDS9930_PGAIN_1X  0 //Prox gain,1x 
#define  APDS9930_PGAIN_2X  1 //Prox gain,2x 
#define  APDS9930_PGAIN_4X  2 //Prox gain,4x 
#define  APDS9930_PGAIN_8X  3 //Prox gain,8x 
//uint8_t  APDS9930_PGAIN = APDS9930_PGAIN_8X; //Prox gain,1x 2x 4x 8x

//ALS Gain Control
#define  APDS9930_AGAIN_1X  0 //ALS gain,1x
#define  APDS9930_AGAIN_8X  1 //ALS gain,8x 
#define  APDS9930_AGAIN_16X  2 //ALS gain,16x 
#define  APDS9930_AGAIN_120X  3 //ALS gain,120x
//uint8_t  APDS9930_AGAIN = APDS9930_AGAIN_120X;

#define WEN 1 //Wait
#define PEN 1 // Prox
#define AEN 1 // ALS

//Power ON. This bit activates the internal oscillator to permit the timers and ADC channels to operate.
//Writing a "PON" activates the oscillator. Writing a "POFF" disables the oscillator
#define PON 1 // power On
#define POFF 0 // power Off


class APDS9930
{
public:
    APDS9930();
    int ch0_data;
    int ch1_data;
    int prox_data;

	void init(uint8_t _APDS9930_PDRIVE, uint8_t _APDS9930_PGAIN, uint8_t _APDS9930_AGAIN);
    void power(bool _pw);
    void getdata();
    
//private:
void write8(uint8_t reg, uint8_t value);
uint16_t read16(uint8_t reg);

};


#endif
//
// END OF FILE
//