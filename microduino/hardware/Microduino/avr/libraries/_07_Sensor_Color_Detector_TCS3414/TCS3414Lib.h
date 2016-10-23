/****************************************************************************/
//
// TCS3414Lib is an Arduino library to communicate to and obtain values from
// the TCS3414 RGB color sensor.
//
// This work took minor parts (declarations)
// from the existing code by FrankieChu from www.seeedstudio.com
// available at https://github.com/Seeed-Studio/Grove_I2C_Color_Sensor

// Copyright (C) 2014, J.F. Omhover (jf.omhover@gmail.com)
//
// This file is part of TCS3414Lib
//
// TCS3414Lib is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// TCS3414Lib is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with TCS3414Lib.  If not, see <http://www.gnu.org/licenses/>.
//
/******************************************************************************/

#ifndef _TCS3414_H_
#define _TCS3414_H_

#define TCS3414_ADDR 0x39  //the I2C address for the TCS3414

// *** COMMAND REGISTER
// Commands
#define CMD_WRITE  0x80    // Command for writing bytes into registers
#define CMD_CLEARINT 0xE0  // Clear any pending interrupt and is a writeonce-to-clear field

// Selects type of transaction to follow in subsequent data transfer.
#define CMD_TRANSACTION_BYTE     0x00
#define CMD_TRANSACTION_WORD     0x20
#define CMD_TRANSACTION_BLOCK    0x40
#define CMD_TRANSACTION_INTCLEAR 0x60

// Registers
#define REG_CTL        0x00    // control register
#define REG_TIMING     0x01    // timing register
#define REG_INT        0x02    // interrupt control
#define REG_INT_SOURCE 0x03    // interrupt source
#define REG_ID         0x04    // id register
#define REG_GAIN       0x07    // gain register
#define REG_LOW_THRESH            0x08
#define REG_LOW_THRESH_LOW_BYTE   0x08  // ADC interrupt source lower byte of the low threshold.
#define REG_LOW_THRESH_HIGH_BYTE  0x09  // ADC interrupt source upper byte of the low threshold.
#define REG_HIGH_THRESH           0x0A
#define REG_HIGH_THRESH_LOW_BYTE  0x0A  // ADC interrupt source lower byte of the high threshold.
#define REG_HIGH_THRESH_HIGH_BYTE 0x0B  // ADC interrupt source upper byte of the high threshold.
#define REG_BLOCK_READ 0x0F    // write in this block to read the following registers in one block message
#define REG_GREEN_LOW  0x10    // green channel LSB
#define REG_GREEN_HIGH 0x11    // green channel MSB
#define REG_RED_LOW    0x12    // red channel LSB
#define REG_RED_HIGH   0x13    // red channel MSB
#define REG_BLUE_LOW   0x14    // blue channel LSB
#define REG_BLUE_HIGH  0x15    // blue channel MSB
#define REG_CLEAR_LOW  0x16    // clear channel LSB
#define REG_CLEAR_HIGH 0x17    // clear channel MSB


// *** REG_CTL : Control Register

#define CTL_ADC_EN     0x03  // This field enables the four ADC channels to begin integration.
#define CTL_ADC_VALID  0x10  // This read-only field indicates that the ADC channel has completed an integration cycle.
#define CTL_POWER      0x01  // Writing a 1 powers on the device, and writing a 0 turns it off.

//#define CLR_INT 0xE0


// *** REG_TIMING : Timing Register

#define SYNC_EDGE 0x40  // If SYNC_EDGE is low, the falling edge of the sync pin is used to stop an integration cycle when INTEG_MODE is 11. If SYNC_EDGE is high, the rising edge of the sync pin is used to stop an integration cycle when INTEG_MODE is 11.
#define INTEG_MODE_FREE 0x00  // the integrator is free-running and one of the three internally-generated Nominal Integration Times is selected for each conversion
#define INTEG_MODE_MANUAL 0x10  // Manually start/stop integration through serial bus using ADC_EN field in Control Register.
#define INTEG_MODE_SYN_SINGLE 0x20  // Synchronize exactly one internally-timed integration cycle as specified in the NOMINAL INTEGRATION TIME beginning 2.4 μs after being initiated by the SYNC IN pin.
#define INTEG_MODE_SYN_MULTI 0x30  // Integrate over specified number of pulses on SYNC IN pin (See SYNC IN PULSE COUNT table below). Minimum width of sync pulse is 50 μs. SYNC IN must be low at least 3.6 μs.

// Uses single, multipurpose bitmapped field to select one of three predefined integration times or set the number of SYNC IN pulses to count when the INTEG_MODE accumulate mode (11) is selected.
// NOTE: INTEG_MODE and TIME/COUNTER fields should be written before ADC_EN is asserted.
// Below, NOMINAL INTEGRATION TIME
#define INTEG_PARAM_INTTIME_12MS   0x00
#define INTEG_PARAM_INTTIME_100MS  0x01
#define INTEG_PARAM_INTTIME_400MS  0x02

// Below, SYNC IN PULSE COUNT
#define INTEG_PARAM_PULSE_COUNT1   0x00
#define INTEG_PARAM_PULSE_COUNT2   0x01
#define INTEG_PARAM_PULSE_COUNT4   0x02
#define INTEG_PARAM_PULSE_COUNT8   0x03
#define INTEG_PARAM_PULSE_COUNT16  0x04
#define INTEG_PARAM_PULSE_COUNT32  0x05
#define INTEG_PARAM_PULSE_COUNT64  0x06
#define INTEG_PARAM_PULSE_COUNT128 0x07


// *** REG_INT : Interrupt Control Register

#define INTR_STOP 0x40  // Stop ADC integration on interrupt. When high, ADC integration will stop once an interrupt is asserted. To resume operation (1) de-assert ADC_EN using CONTROL register, (2) clear interrupt using COMMAND register, and (3) re-assert ADC_EN using CONTROL register. Note: Use this bit to isolate a particular condition when the sensor is continuously integrating.

// INTR Control Select. This field determines mode of interrupt logic according to the table below:
#define INTR_CTL_DISABLE  0x00  // Interrupt output disabled.
#define INTR_CTL_LEVEL    0x10  // Level Interrupt.
#define INTR_CTL_SMB      0x20  // SMB-Alert compliant.
#define INTR_CTL_SETINTR  0x30  // Sets an interrupt and functions as mode 10.

// Interrupt persistence. Controls rate of interrupts to the host processor:
#define INTR_PERSIST_EVERY  0x00 // Every ADC cycle generates interrupt
#define INTR_PERSIST_SINGLE 0x01 // Any value outside of threshold range.
#define INTR_PERSIST_01SEC  0x02 // Consecutively out of range for 0.1 second
#define INTR_PERSIST_1SEC   0x03 // Consecutively out of range for 1 second


// *** REG_INT_SOURCE : Interrupt Souce Register
// Interrupt Source. Selects which ADC channel to use to generate an interrupt:
#define INT_SOURCE_GREEN 0x00
#define INT_SOURCE_RED   0x01
#define INT_SOURCE_BLUE  0x10
#define INT_SOURCE_CLEAR 0x03


// *** REG_GAIN : Gain Register
// Analog Gain Control. This field switches the common analog gain of the four ADC channels. Four gain modes are provided:
#define GAIN_1 0x00
#define GAIN_4 0x10
#define GAIN_16 0x20
#define GAIN_64 0x30

// Prescaler. This field controls a 6-bit digital prescaler and divider. The prescaler reduces the sensitivity of each ADC integrator as shown in the table below:
#define PRESCALER_1 0x00
#define PRESCALER_2 0x01
#define PRESCALER_4 0x02
#define PRESCALER_8 0x03
#define PRESCALER_16 0x04
#define PRESCALER_32 0x05
#define PRESCALER_64 0x06

void _writeReg(byte reg, byte val);

class TCS3414 {
  //    int gain;  // TODO : thought maybe we could compute some measure in uW/cm^2 using that...
  //    byte itime;
  //    int prescaler;

public:

#define TCS3414_FREEMODE  0            // typical mode, runs free every 12MS/100MS/400MS and outputs results in registers
#define TCS3414_LEVELINTERRUPTMODE  1

  void init(int mode = TCS3414_FREEMODE);
  void start();
  void stop();
  void getRGB(uint16_t * red, uint16_t * green, uint16_t * blue, uint16_t * clr);
  void getValues(uint16_t * values);
  void disableADC();
  void enableADC();
  void powerOn();
  void setLevelThreshold(byte reg, uint16_t thresh);
  void setIntegrationTime(byte itime);
  void setGain(byte gain, byte prescaler);
  void clearInterrupt();
};

#endif /* _TCS3414_H_ */














