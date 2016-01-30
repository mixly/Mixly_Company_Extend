/*
 Copyright © 2014 José Luis Zabalza  License LGPLv3+: GNU
 LGPL version 3 or later <http://www.gnu.org/copyleft/lgpl.html>.
 This is free software: you are free to change and redistribute it.
 There is NO WARRANTY, to the extent permitted by law.
*/

#ifndef TempI2C_LM75_h
#define TempI2C_LM75_h


#include <inttypes.h>


class TempI2C_LM75 {
	
public: 
	
    typedef enum {nine_bits = 0, ten_bits, eleven_bits, twelve_bits } Resolution;
    typedef enum {comparator_mode=0, interrupt_mode } TermostatMode;
    typedef enum {one_samples = 0, two_samples, four_samples, six_samples } TermostatFaultTolerance;
    typedef enum {active_low = 0, active_high } OSPolarity;

    TempI2C_LM75( uint8_t i2c_addr, Resolution resolution);

    void init();

// Temperature and temperature ranges in degrees centigrade
    float getTemp();

    void setTHyst(float newTHyst);
    void setTOS(float newTOS);

    float getTHyst(void);
    float getTOS(void);

    TermostatMode getTermostatMode();
    void setTermostatMode(TermostatMode newMode);

    TermostatFaultTolerance getTermostatFaultTolerance();
    void setTermostatFaultTolerance(TermostatFaultTolerance newFaultTolerance);

    Resolution getResolution();
    void setResolution(Resolution newResolution);

    OSPolarity getOSPolarity();
    void setOSPolarity(OSPolarity newOSPolarity);

private:

    typedef enum  {temp_reg=0, config_reg, THyst_reg, TOS_reg } LM75Register;

    typedef union _CfgRegister
    {
        struct
        {
            uint8_t shutdown:1;
            uint8_t termostat_mode:1;
            uint8_t termostat_output_polarity:1;
            uint8_t termostat_fault_tolerance:2;
            uint8_t resolution:2;
            uint8_t reserved:1;
        } mbits;

        uint8_t mbyte;

    } CfgRegister;

    unsigned getReg(LM75Register reg);
    void setReg(LM75Register reg,unsigned newValue);

    uint8_t m_u8I2CAddr;
	
};

#endif

