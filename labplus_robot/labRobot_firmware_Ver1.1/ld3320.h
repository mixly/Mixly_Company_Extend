#ifndef LD3320_H
#define LD3320_H
#include <Arduino.h>

#define uint8 unsigned char
#define SPI_MODE_MASK 0x0C  // CPOL = bit 3, CPHA = bit 2 on SPCR
#define MIC 0x0b
#define MONO 0x23
#define uint8 unsigned char
#define CLK_IN   	     22.1184///ÆµÂÊ
//#define CLK_IN   	     24///ÆµÂÊ
#define PLL_11			(uint8)((CLK_IN/2.0)-1)
#define PLL_ASR_19 		(uint8)(CLK_IN*32.0/(PLL_11+1) - 0.51)
#define PLL_ASR_1B 		0x48
#define PLL_ASR_1D 		0x1f


#define MEGA_SOFT_SPI 0
#if MEGA_SOFT_SPI && (defined(__AVR_ATmega1280__)||defined(__AVR_ATmega2560__))
#define SOFTWARE_SPI
#endif  // MEGA_SOFT_SPI
//------------------------------------------------------------------------------
// SPI pin definitions
//
#ifndef SOFTWARE_SPI
// hardware pin defs

uint8_t const  LD_CHIP_SELECT_PIN = 32;
// The following three pins must not be redefined for hardware SPI.
/** SPI Master Out Slave In pin */
uint8_t const  SPI_MOSI_PIN = MOSI;
/** SPI Master In Slave Out pin */
uint8_t const  SPI_MISO_PIN = MISO;
/** SPI Clock pin */
uint8_t const  SPI_SCK_PIN = SCK;
/** optimize loops for hardware SPI */
/** optimize loops for hardware SPI */
#define OPTIMIZE_HARDWARE_SPI

#else  // SOFTWARE_SPI
// define software SPI pins 
/** SPI chip select pin */
// uint8_t const LD_CHIP_SELECT_PIN = 10;
// /** SPI Master Out Slave In pin */
// uint8_t const SPI_MOSI_PIN = 11;
// /** SPI Master In Slave Out pin */
// uint8_t const SPI_MISO_PIN = 12;
// /** SPI Clock pin */
// uint8_t const SPI_SCK_PIN = 13;

#endif  // SOFTWARE_SPI




class VoiceRecognition
{

public:
	VoiceRecognition();

	void reset();
	void init(uint8_t mic=MIC);
	void ASR_init();
	unsigned char start();
	void addCommand(char *pass,int num);
	int read();
	
	void micVol(uint8_t vol);
	void speechEndpoint(uint8_t speech_endpoint_);
	void speechStartTime(uint8_t speech_start_time_);
	void speechEndTime(uint8_t speech_end_time_);
	void voiceMaxLength(uint8_t voice_max_length_);
	void noiseTime(uint8_t noise_time_);
 private:

};

	void writeReg(unsigned char address,unsigned char value);
	unsigned char readReg(unsigned char address);
	void cSHigh(void); 
	void cSLow(void);
	void update();
	int check_b2();
#endif