#include "Nova_Gyro.h"
#include <Arduino.h>



Gyro::Gyro(void)
{
    // uint8_t SCL_pin,SDA_pin;
	// switch(port)
	// {
		// case C0:
			// SCL_pin = C0_PIN_1;
			// SDA_pin = C0_PIN_0;
		// break;
		// case C1:
			// SCL_pin = C1_PIN_0;
			// SDA_pin = C1_PIN_1;
		// break;
		// case S4:
			// SCL_pin = S4_PIN_1;
			// SDA_pin = S4_PIN_0;
		// break;
		// case S5:
			// SCL_pin = S5_PIN_1;
			// SDA_pin = S5_PIN_0;
		// break;
        // case M0:
			// SCL_pin = M0_PIN_1;
			// SDA_pin = M0_PIN_0;
		// break;
        // case M1:
			// SCL_pin = M1_PIN_1;
			// SDA_pin = M1_PIN_0;
		// break;
	// }
      
    Device_Address = GYRO_DEFAULT_ADDRESS;
}

//#define GYRO_PORT_M0


// #if defined(GYRO_PORT_M0)
// //#error "test\n"   
    // #define SDA_PORT PORTD
    // #define SDA_PIN 5
    // #define SCL_PORT PORTD
    // #define SCL_PIN 7
    // #define I2C_FASTMODE 1
// #elif defined(GYRO_PORT_M1) 

    // #define SDA_PORT PORTD
    // #define SDA_PIN 6
    // #define SCL_PORT PORTB
    // #define SCL_PIN 0
    // #define I2C_FASTMODE 1
// #elif defined(GYRO_PORT_M2) 
// #error "test\n"   
    // #define SDA_PORT PORTB
    // #define SDA_PIN 3
    // #define SCL_PORT PORTB
    // #define SCL_PIN 4
    // #define I2C_FASTMODE 1
// #elif defined(GYRO_PORT_M3) 
// #error "test\n"   
    // #define SDA_PORT PORTD
    // #define SDA_PIN 3
    // #define SCL_PORT PORTD
    // #define SCL_PIN 4
    // #define I2C_FASTMODE 1
// #elif defined(GYRO_PORT_C0) 
// #error "test\n"   
    // #define SDA_PORT PORTD
    // #define SDA_PIN 0
    // #define SCL_PORT PORTD
    // #define SCL_PIN 1
    // #define I2C_FASTMODE 1    
// #else
// #error "test\n"   
    #define SDA_PORT PORTC
    #define SDA_PIN 4
    #define SCL_PORT PORTC
    #define SCL_PIN 5
    #define I2C_FASTMODE 1
// #endif


// You can set I2C_CPUFREQ independently of F_CPU if you 
// change the CPU frequency on the fly. If you do not define it,
// it will use the value of F_CPU
#pragma GCC diagnostic push

#pragma GCC diagnostic ignored "-Wunused-parameter"

#ifndef I2C_CPUFREQ
#define I2C_CPUFREQ F_CPU
#endif

// If I2C_FASTMODE is set to 1, then the highest possible frequency below 400kHz
// is selected. Be aware that not all slave chips may be able to deal with that!
#ifndef I2C_FASTMODE
#define I2C_FASTMODE 1
#endif

// If I2C_FASTMODE is not defined or defined to be 0, then you can set
// I2C_SLOWMODE to 1. In this case, the I2C frequency will not be higher 
// than 25KHz. This could be useful for problematic buses.
#ifndef I2C_SLOWMODE
#define I2C_SLOWMODE 0
#endif

// if I2C_NOINTERRUPT is 1, then the I2C routines are not interruptable.
// This is most probably only necessary if you are using a 1MHz system clock,
// you are communicating with a SMBus device, and you want to avoid timeouts.
// Be aware that the interrupt bit is enabled after each call. So the
// I2C functions should not be called in interrupt routines or critical regions.
#ifndef I2C_NOINTERRUPT
#define I2C_NOINTERRUPT 0
#endif

// I2C_TIMEOUT can be set to a value between 1 and 10000.
// If it is defined and nonzero, it leads to a timeout if the
// SCL is low longer than I2C_TIMEOUT milliseconds, i.e., max timeout is 10 sec
#ifndef I2C_TIMEOUT
#define I2C_TIMEOUT 0
#else 
#if I2C_TIMEOUT > 10000
#error I2C_TIMEOUT is too large
#endif
#endif

#define I2C_TIMEOUT_DELAY_LOOPS (I2C_CPUFREQ/1000UL)*I2C_TIMEOUT/4000UL
#if I2C_TIMEOUT_DELAY_LOOPS < 1
#define I2C_MAX_STRETCH 1
#else
#if I2C_TIMEOUT_DELAY_LOOPS > 60000UL
#define I2C_MAX_STRETCH 60000UL
#else
#define I2C_MAX_STRETCH I2C_TIMEOUT_DELAY_LOOPS
#endif
#endif

#if I2C_FASTMODE
#define I2C_DELAY_COUNTER (((I2C_CPUFREQ/400000L)/2-19)/3)
#else
#if I2C_SLOWMODE
#define I2C_DELAY_COUNTER (((I2C_CPUFREQ/25000L)/2-19)/3)
#else
#define I2C_DELAY_COUNTER (((I2C_CPUFREQ/100000L)/2-19)/3)
#endif
#endif

// Table of I2C bus speed in kbit/sec:
// CPU clock:           1MHz   2MHz    4MHz   8MHz   16MHz   20MHz
// Fast I2C mode          40     80     150    300     400     400
// Standard I2C mode      40     80     100    100     100     100
// Slow I2C mode          25     25      25     25      25      25     

// constants for reading & writing
#define I2C_READ    1
#define I2C_WRITE   0

// map the IO register back into the IO address space
#define SDA_DDR       	(_SFR_IO_ADDR(SDA_PORT) - 1)
#define SCL_DDR       	(_SFR_IO_ADDR(SCL_PORT) - 1)
#define SDA_OUT       	_SFR_IO_ADDR(SDA_PORT)
#define SCL_OUT       	_SFR_IO_ADDR(SCL_PORT)
#define SDA_IN		(_SFR_IO_ADDR(SDA_PORT) - 2)
#define SCL_IN		(_SFR_IO_ADDR(SCL_PORT) - 2)

#ifndef __tmp_reg__
#define __tmp_reg__ 0
#endif

 
// Internal delay functions.
void __attribute__ ((noinline)) i2c_delay_half(void) asm("ass_i2c_delay_half");
void __attribute__ ((noinline)) i2c_wait_scl_high(void) asm("ass_i2c_wait_scl_high");

void  i2c_delay_half(void)
{ // function call 3 cycles => 3C
#if I2C_DELAY_COUNTER < 1
  __asm__ __volatile__ (" ret");
  // 7 cycles for call and return
#else
  __asm__ __volatile__ 
    (
     " ldi      r25, %[DELAY]           ;load delay constant   ;; 4C \n\t"
     "_Lidelay: \n\t"
     " dec r25                          ;decrement counter     ;; 4C+xC \n\t"
     " brne _Lidelay                                           ;;5C+(x-1)2C+xC\n\t"
     " ret                                                     ;; 9C+(x-1)2C+xC = 7C+xC" 
     : : [DELAY] "M" I2C_DELAY_COUNTER : "r25");
  // 7 cycles + 3 times x cycles
#endif
}

void i2c_wait_scl_high(void)
{
#if I2C_TIMEOUT <= 0
  __asm__ __volatile__ 
    ("_Li2c_wait_stretch: \n\t"
     " sbis	%[SCLIN],%[SCLPIN]	;wait for SCL high \n\t" 
     " rjmp	_Li2c_wait_stretch \n\t"
     " cln                              ;signal: no timeout \n\t"
     " ret "
     : : [SCLIN] "I" (SCL_IN), [SCLPIN] "I" (SCL_PIN));
#else
  __asm__ __volatile__ 
    ( " ldi     r27, %[HISTRETCH]       ;load delay counter \n\t"
      " ldi     r26, %[LOSTRETCH] \n\t"
      "_Lwait_stretch: \n\t"
      " clr     __tmp_reg__             ;do next loop 255 times \n\t"
      "_Lwait_stretch_inner_loop: \n\t"
      " rcall   _Lcheck_scl_level       ;call check function   ;; 12C \n\t"
      " brpl    _Lstretch_done          ;done if N=0           ;; +1 = 13C\n\t"
      " dec     __tmp_reg__             ;dec inner loop counter;; +1 = 14C\n\t"
      " brne    _Lwait_stretch_inner_loop                      ;; +2 = 16C\n\t"
      " sbiw    r26,1                   ;dec outer loop counter \n\t"
      " brne    _Lwait_stretch          ;continue with outer loop \n\t"
      " sen                             ;timeout -> set N-bit=1 \n\t"
      " rjmp _Lwait_return              ;and return with N=1\n\t"
      "_Lstretch_done:                  ;SCL=1 sensed \n\t"            
      " cln                             ;OK -> clear N-bit \n\t"
      " rjmp _Lwait_return              ; and return with N=0 \n\t"

      "_Lcheck_scl_level:                                      ;; call = 3C\n\t"
      " cln                                                    ;; +1C = 4C \n\t"
      " sbic	%[SCLIN],%[SCLPIN]      ;skip if SCL still low ;; +2C = 6C \n\t"
      " rjmp    _Lscl_high                                     ;; +0C = 6C \n\t"
      " sen                                                    ;; +1 = 7C\n\t "
      "_Lscl_high: "
      " nop                                                    ;; +1C = 8C \n\t"
      " ret                             ;return N-Bit=1 if low ;; +4 = 12C\n\t"

      "_Lwait_return:"
      : : [SCLIN] "I" (SCL_IN), [SCLPIN] "I" (SCL_PIN), 
	[HISTRETCH] "M" (I2C_MAX_STRETCH>>8), 
	[LOSTRETCH] "M" (I2C_MAX_STRETCH&0xFF)
      : "r26", "r27");
#endif
}


boolean i2c_init(void)
{
  __asm__ __volatile__ 
    (" cbi      %[SDADDR],%[SDAPIN]     ;release SDA \n\t" 
     " cbi      %[SCLDDR],%[SCLPIN]     ;release SCL \n\t" 
     " cbi      %[SDAOUT],%[SDAPIN]     ;clear SDA output value \n\t" 
     " cbi      %[SCLOUT],%[SCLPIN]     ;clear SCL output value \n\t" 
     " clr      r24                     ;set return value to false \n\t"
     " clr      r25                     ;set return value to false \n\t"
     " sbis     %[SDAIN],%[SDAPIN]      ;check for SDA high\n\t"
     " ret                              ;if low return with false \n\t"  
     " sbis     %[SCLIN],%[SCLPIN]      ;check for SCL high \n\t"
     " ret                              ;if low return with false \n\t" 
     " ldi      r24,1                   ;set return value to true \n\t"
     " ret "
     : :
       [SCLDDR] "I"  (SCL_DDR), [SCLPIN] "I" (SCL_PIN), 
       [SCLIN] "I" (SCL_IN), [SCLOUT] "I" (SCL_OUT),
       [SDADDR] "I"  (SDA_DDR), [SDAPIN] "I" (SDA_PIN), 
       [SDAIN] "I" (SDA_IN), [SDAOUT] "I" (SDA_OUT)); 
  return true;
}

bool  i2c_start(uint8_t addr)
{
  __asm__ __volatile__ 
    (
#if I2C_NOINTERRUPT
     " cli                              ;clear IRQ bit \n\t"
#endif
     " sbis     %[SCLIN],%[SCLPIN]      ;check for clock stretching slave\n\t"
     " rcall    ass_i2c_wait_scl_high   ;wait until SCL=H\n\t" 
     " sbi      %[SDADDR],%[SDAPIN]     ;force SDA low  \n\t" 
     " rcall    ass_i2c_delay_half      ;wait T/2 \n\t"
     " rcall    ass_i2c_write           ;now write address \n\t"
     " ret"
     : : [SDADDR] "I"  (SDA_DDR), [SDAPIN] "I" (SDA_PIN),
       [SCLIN] "I" (SCL_IN),[SCLPIN] "I" (SCL_PIN)); 
  return true; // we never return here!
}

bool  i2c_rep_start(uint8_t addr)
{
  __asm__ __volatile__ 

    (
#if I2C_NOINTERRUPT
     " cli \n\t"
#endif
     " sbi	%[SCLDDR],%[SCLPIN]	;force SCL low \n\t" 
     " rcall 	ass_i2c_delay_half	;delay  T/2 \n\t" 
     " cbi	%[SDADDR],%[SDAPIN]	;release SDA \n\t" 
     " rcall	ass_i2c_delay_half	;delay T/2 \n\t" 
     " cbi	%[SCLDDR],%[SCLPIN]	;release SCL \n\t" 
     " rcall 	ass_i2c_delay_half	;delay  T/2 \n\t" 
     " sbis     %[SCLIN],%[SCLPIN]      ;check for clock stretching slave\n\t"
     " rcall    ass_i2c_wait_scl_high   ;wait until SCL=H\n\t" 
     " sbi 	%[SDADDR],%[SDAPIN]	;force SDA low \n\t" 
     " rcall 	ass_i2c_delay_half	;delay	T/2 \n\t" 
     " rcall    ass_i2c_write       \n\t"
     " ret"
     : : [SCLDDR] "I"  (SCL_DDR), [SCLPIN] "I" (SCL_PIN),[SCLIN] "I" (SCL_IN),
         [SDADDR] "I"  (SDA_DDR), [SDAPIN] "I" (SDA_PIN)); 
  return true; // just to fool the compiler
}

void  i2c_start_wait(uint8_t addr)
{
 __asm__ __volatile__ 
   (
    " push	r24                     ;save original parameter \n\t"
    "_Li2c_start_wait1: \n\t"
    " pop       r24                     ;restore original parameter\n\t"
    " push      r24                     ;and save again \n\t"
#if I2C_NOINTERRUPT
    " cli                               ;disable interrupts \n\t"
#endif
    " sbis     %[SCLIN],%[SCLPIN]      ;check for clock stretching slave\n\t"
    " rcall    ass_i2c_wait_scl_high   ;wait until SCL=H\n\t" 
    " sbi 	%[SDADDR],%[SDAPIN]	;force SDA low \n\t" 
    " rcall 	ass_i2c_delay_half	;delay T/2 \n\t" 
    " rcall 	ass_i2c_write	        ;write address \n\t" 
    " tst	r24		        ;if device not busy -> done \n\t" 
    " brne	_Li2c_start_wait_done \n\t" 
    " rcall	ass_i2c_stop	        ;terminate write & enable IRQ \n\t" 
    " rjmp	_Li2c_start_wait1	;device busy, poll ack again \n\t" 
    "_Li2c_start_wait_done: \n\t"
    " pop       __tmp_reg__             ;pop off orig argument \n\t"
    " ret "
    : : [SDADDR] "I"  (SDA_DDR), [SDAPIN] "I" (SDA_PIN),
      [SCLIN] "I" (SCL_IN),[SCLPIN] "I" (SCL_PIN)); 
}

void  i2c_stop(void)
{
  __asm__ __volatile__ 
    (
     " sbi      %[SCLDDR],%[SCLPIN]     ;force SCL low \n\t" 
     " sbi      %[SDADDR],%[SDAPIN]     ;force SDA low \n\t" 
     " rcall    ass_i2c_delay_half      ;T/2 delay \n\t"
     " cbi      %[SCLDDR],%[SCLPIN]     ;release SCL \n\t" 
     " rcall    ass_i2c_delay_half      ;T/2 delay \n\t"
     " sbis     %[SCLIN],%[SCLPIN]      ;check for clock stretching slave\n\t"
     " rcall    ass_i2c_wait_scl_high   ;wait until SCL=H\n\t" 
     " cbi      %[SDADDR],%[SDAPIN]     ;release SDA \n\t" 
     " rcall    ass_i2c_delay_half \n\t"
#if I2C_NOINTERRUPT
     " sei                              ;enable interrupts again!\n\t"
#endif
     : : [SCLDDR] "I"  (SCL_DDR), [SCLPIN] "I" (SCL_PIN), [SCLIN] "I" (SCL_IN),
         [SDADDR] "I"  (SDA_DDR), [SDAPIN] "I" (SDA_PIN)); 
}

bool i2c_write(uint8_t value)
{
  __asm__ __volatile__ 
    (
     " sec                              ;set carry flag \n\t"
     " rol      r24                     ;shift in carry and shift out MSB \n\t"
     " rjmp _Li2c_write_first \n\t"
     "_Li2c_write_bit:\n\t"
     " lsl      r24                     ;left shift into carry ;; 1C\n\t"
     "_Li2c_write_first:\n\t"
     " breq     _Li2c_get_ack           ;jump if TXreg is empty;; +1 = 2C \n\t"
     " sbi      %[SCLDDR],%[SCLPIN]     ;force SCL low         ;; +2 = 4C \n\t"
     " nop \n\t"
     " nop \n\t"
     " nop \n\t"
     " brcc     _Li2c_write_low                                ;;+1/+2=5/6C\n\t"
     " nop                                                     ;; +1 = 7C \n\t"
     " cbi %[SDADDR],%[SDAPIN]	        ;release SDA           ;; +2 = 9C \n\t"
     " rjmp      _Li2c_write_high                              ;; +2 = 11C \n\t"
     "_Li2c_write_low: \n\t"
     " sbi	%[SDADDR],%[SDAPIN]	;force SDA low         ;; +2 = 9C \n\t"
     " rjmp	_Li2c_write_high                               ;;+2 = 11C \n\t"
     "_Li2c_write_high: \n\t"
#if I2C_DELAY_COUNTER >= 1
     " rcall 	ass_i2c_delay_half	;delay T/2             ;;+X = 11C+X\n\t"
#endif
     " cbi	%[SCLDDR],%[SCLPIN]	;release SCL           ;;+2 = 13C+X\n\t"
     " cln                              ;clear N-bit           ;;+1 = 14C+X\n\t"
     " nop \n\t"
     " nop \n\t"
     " nop \n\t"
     " sbis	%[SCLIN],%[SCLPIN]	;check for SCL high    ;;+2 = 16C+X\n\t"
     " rcall    ass_i2c_wait_scl_high \n\t"
     " brpl     _Ldelay_scl_high                              ;;+2 = 18C+X\n\t"
     "_Li2c_write_return_false: \n\t"
     " clr      r24                     ; return false because of timeout \n\t"
     " rjmp     _Li2c_write_return \n\t"
     "_Ldelay_scl_high: \n\t"
#if I2C_DELAY_COUNTER >= 1
     " rcall	ass_i2c_delay_half	;delay T/2             ;;+X= 18C+2X\n\t"
#endif
     " rjmp	_Li2c_write_bit \n\t"
     "              ;; +2 = 20C +2X for one bit-loop \n\t"
     "_Li2c_get_ack: \n\t"
     " sbi	%[SCLDDR],%[SCLPIN]	;force SCL low ;; +2 = 5C \n\t"
     " nop \n\t"
     " nop \n\t"
     " cbi	%[SDADDR],%[SDAPIN]	;release SDA ;;+2 = 7C \n\t"
#if I2C_DELAY_COUNTER >= 1
     " rcall	ass_i2c_delay_half	;delay T/2 ;; +X = 7C+X \n\t"
#endif
     " clr	r25                                            ;; 17C+2X \n\t"
     " clr	r24		        ;return 0              ;; 14C + X \n\t"
     " cbi	%[SCLDDR],%[SCLPIN]	;release SCL ;; +2 = 9C+X\n\t"
     "_Li2c_ack_wait: \n\t"
     " cln                              ; clear N-bit          ;; 10C + X\n\t" 
     " nop \n\t"
     " sbis	%[SCLIN],%[SCLPIN]	;wait SCL high         ;; 12C + X \n\t"
     " rcall    ass_i2c_wait_scl_high \n\t"
     " brmi     _Li2c_write_return_false                       ;; 13C + X \n\t "
     " sbis	%[SDAIN],%[SDAPIN]      ;if SDA hi -> return 0 ;; 15C + X \n\t"
     " ldi	r24,1                   ;return true           ;; 16C + X \n\t"
#if I2C_DELAY_COUNTER >= 1
     " rcall	ass_i2c_delay_half	;delay T/2             ;; 16C + 2X \n\t"
#endif
     "_Li2c_write_return: \n\t"
     " nop \n\t "
     " nop \n\t "
     " sbi	%[SCLDDR],%[SCLPIN]	;force SCL low so SCL=H is short\n\t"
     " ret \n\t"
     "              ;; + 4 = 17C + 2X for acknowldge bit"
     ::
      [SCLDDR] "I"  (SCL_DDR), [SCLPIN] "I" (SCL_PIN), [SCLIN] "I" (SCL_IN),
      [SDADDR] "I"  (SDA_DDR), [SDAPIN] "I" (SDA_PIN), [SDAIN] "I" (SDA_IN)); 
  return true; // fooling the compiler
}

uint8_t i2c_read(bool last)
{
  __asm__ __volatile__ 
    (
     " ldi	r23,0x01 \n\t"
     "_Li2c_read_bit: \n\t"
     " sbi	%[SCLDDR],%[SCLPIN]	;force SCL low         ;; 2C \n\t" 
     " cbi	%[SDADDR],%[SDAPIN]	;release SDA(prev. ACK);; 4C \n\t" 
     " nop \n\t"
     " nop \n\t"
     " nop \n\t"
#if I2C_DELAY_COUNTER >= 1
     " rcall	ass_i2c_delay_half	;delay T/2             ;; 4C+X \n\t" 
#endif
     " cbi	%[SCLDDR],%[SCLPIN]	;release SCL           ;; 6C + X \n\t" 
#if I2C_DELAY_COUNTER >= 1
     " rcall	ass_i2c_delay_half	;delay T/2             ;; 6C + 2X \n\t" 
#endif
     " cln                              ; clear N-bit          ;; 7C + 2X \n\t"
     " nop \n\t "
     " nop \n\t "
     " nop \n\t "
     " sbis     %[SCLIN], %[SCLPIN]     ;check for SCL high    ;; 9C +2X \n\t" 
     " rcall    ass_i2c_wait_scl_high \n\t"
     " brmi     _Li2c_read_return       ;return if timeout     ;; 10C + 2X\n\t"
     " clc		  	        ;clear carry flag      ;; 11C + 2X\n\t" 
     " sbic	%[SDAIN],%[SDAPIN]	;if SDA is high        ;; 11C + 2X\n\t" 
     " sec			        ;set carry flag        ;; 12C + 2X\n\t" 
     " rol	r23		        ;store bit             ;; 13C + 2X\n\t" 
     " brcc	_Li2c_read_bit	        ;while receiv reg not full \n\t"
     "                         ;; 15C + 2X for one bit loop \n\t" 
     
     "_Li2c_put_ack: \n\t" 
     " sbi	%[SCLDDR],%[SCLPIN]	;force SCL low         ;; 2C \n\t" 
     " cpi	r24,0                                          ;; 3C \n\t" 
     " breq	_Li2c_put_ack_low	;if (ack=0) ;; 5C \n\t" 
     " cbi	%[SDADDR],%[SDAPIN]	;release SDA \n\t" 
     " rjmp	_Li2c_put_ack_high \n\t" 
     "_Li2c_put_ack_low:                ;else \n\t" 
     " sbi	%[SDADDR],%[SDAPIN]	;force SDA low         ;; 7C \n\t" 
     "_Li2c_put_ack_high: \n\t" 
     " nop \n\t "
     " nop \n\t "
     " nop \n\t "
#if I2C_DELAY_COUNTER >= 1
     " rcall	ass_i2c_delay_half	;delay T/2             ;; 7C + X \n\t" 
#endif
     " cbi	%[SCLDDR],%[SCLPIN]	;release SCL           ;; 9C +X \n\t" 
     " cln                              ;clear N               ;; +1 = 10C\n\t"
     " nop \n\t "
     " nop \n\t "
     " sbis	%[SCLIN],%[SCLPIN]	;wait SCL high         ;; 12C + X\n\t" 
     " rcall    ass_i2c_wait_scl_high \n\t"
#if I2C_DELAY_COUNTER >= 1
     " rcall	ass_i2c_delay_half	;delay T/2             ;; 11C + 2X\n\t" 
#endif
     "_Li2c_read_return: \n\t"
     " nop \n\t "
     " nop \n\t "
     "sbi	%[SCLDDR],%[SCLPIN]	;force SCL low so SCL=H is short\n\t"
     " mov	r24,r23                                        ;; 12C + 2X \n\t"
     " clr	r25                                            ;; 13 C + 2X\n\t"
     " ret                                                     ;; 17C + X"
     ::
      [SCLDDR] "I"  (SCL_DDR), [SCLPIN] "I" (SCL_PIN), [SCLIN] "I" (SCL_IN),
      [SDADDR] "I"  (SDA_DDR), [SDAPIN] "I" (SDA_PIN), [SDAIN] "I" (SDA_IN) 
     ); 
  return ' '; // fool the compiler!
}


#pragma GCC diagnostic pop





/**
 * \par Function
 *   begin
 * \par Description
 *   Initialize the Gyro.
 * \param[in]
 *   None
 * \par Output
 *   None
 * \return
 *   None
 * \par Others
 *   You can check the MPU6050 datasheet for the registor address.
 */
void Gyro::begin(void)
{
  gSensitivity = 65.5; //for 500 deg/s, check data sheet
  gx = 0;
  gy = 0;
  gz = 0;
  gyrX = 0;
  gyrY = 0;
  gyrZ = 0;
  accX = 0;
  accY = 0;
  accZ = 0;
  gyrXoffs = 0;
  gyrYoffs = 0;
  gyrZoffs = 0;
  
  i2c_init();
  
  delay(800);
  writeReg(0x6b, 0x00);//close the sleep mode
  writeReg(0x1a, 0x01);//configurate the digital low pass filter
  writeReg(0x1b, 0x08);//set the gyro scale to 500 deg/s
  
  
  deviceCalibration();
}

/**
 * \par Function
 *   update
 * \par Description
 *   Update some calculated angle values to the variable.
 * \param[in]
 *   None
 * \par Output
 *   None
 * \return
 *   None
 * \par Others
 *   The angle values are calculated by complementary filter.
 *   The time constant of filter is set to 0.5 second, but period dt is not a constant, 
 *   so the filter coefficient will be calculated dynamically.
 */
void Gyro::update(void)
{
  static unsigned long	last_time = 0;
  int8_t return_value;
  double dt, filter_coefficient;
  /* read imu data */
  readData(0x3b, i2cData, 14);

   
   Serial.println("hello");
   
  double ax, ay, az;
  /* assemble 16 bit sensor data */
  accX = ( (i2cData[0] << 8) | i2cData[1] );
  accY = ( (i2cData[2] << 8) | i2cData[3] );
  accZ = ( (i2cData[4] << 8) | i2cData[5] );  
  gyrX = ( ( (i2cData[8] << 8) | i2cData[9] ) - gyrXoffs) / gSensitivity;
  gyrY = ( ( (i2cData[10] << 8) | i2cData[11] ) - gyrYoffs) / gSensitivity;
  gyrZ = ( ( (i2cData[12] << 8) | i2cData[13] ) - gyrZoffs) / gSensitivity;  
  ax = atan2(accX, sqrt( pow(accY, 2) + pow(accZ, 2) ) ) * 180 / 3.1415926;
  ay = atan2(accY, sqrt( pow(accX, 2) + pow(accZ, 2) ) ) * 180 / 3.1415926;  

  dt = (double)(millis() - last_time) / 1000;
  last_time = millis();

  if(accZ > 0)
  {
    gx = gx - gyrY * dt;
    gy = gy + gyrX * dt;
  }
  else
  {
    gx = gx + gyrY * dt;
    gy = gy - gyrX * dt;
  }
  gz += gyrZ * dt;
  /*
     complementary filter
     set 0.5sec = tau = dt * A / (1 - A)
     so A = tau / (tau + dt)
  */
  filter_coefficient = 0.5 / (0.5 + dt);
  gx = gx * filter_coefficient + ax * (1 - filter_coefficient);
  gy = gy * filter_coefficient + ay * (1 - filter_coefficient);   
}

/**
 * \par Function
 *   fast_update
 * \par Description
 *   Fast update some calculated angle values to the variable.
 * \param[in]
 *   None
 * \par Output
 *   None
 * \return
 *   None
 * \par Others
 *   The angle values are calculated by complementary filter.
 *   The time constant of filter is set to 0.5 second, but period dt is not a constant, 
 *   so the filter coefficient will be calculated dynamically.
 */
void Gyro::fast_update(void)
{
  static unsigned long	last_time = 0;
  int8_t return_value;
  double dt, filter_coefficient;

  dt = (double)(millis() - last_time) / 1000.0;
  last_time = millis();

  /* read imu data */
  readData(0x3b, i2cData, 14);
 

  double ax, ay, az;
  /* assemble 16 bit sensor data */
  accX = ( (i2cData[0] << 8) | i2cData[1] );
  accY = ( (i2cData[2] << 8) | i2cData[3] );
  accZ = ( (i2cData[4] << 8) | i2cData[5] );  
  gyrX = ( ( (i2cData[8] << 8) | i2cData[9] ) - gyrXoffs) / gSensitivity;
  gyrY = ( ( (i2cData[10] << 8) | i2cData[11] ) - gyrYoffs) / gSensitivity;
  gyrZ = ( ( (i2cData[12] << 8) | i2cData[13] ) - gyrZoffs) / gSensitivity;  
  ax = atan2(accX, sqrt( pow(accY, 2) + pow(accZ, 2) ) ) * 180 / 3.1415926;
  ay = atan2(accY, sqrt( pow(accX, 2) + pow(accZ, 2) ) ) * 180 / 3.1415926;  

  if(accZ > 0)
  {
    gx = gx - gyrY * dt;
    gy = gy + gyrX * dt;
  }
  else
  {
    gx = gx + gyrY * dt;
    gy = gy - gyrX * dt;
  }
  gz += gyrZ * dt;

  gy = 0.98 * gy + 0.02 * ay;
  gx = 0.98 * gx + 0.02 * ax; 
}

/**
 * \par Function
 *   getDevAddr
 * \par Description
 *   Get the device address of Gyro.
 * \param[in]
 *   None
 * \par Output
 *   None
 * \return
 *   The device address of Gyro
 * \par Others
 *   None
 */
uint8_t Gyro::getDevAddr(void)
{
  return Device_Address;
}

/**
 * \par Function
 *   getHeadingX
 * \par Description
 *   Get the angle value of X-axis.
 * \param[in]
 *   None
 * \par Output
 *   None
 * \return
 *   The angle value of X-axis
 * \par Others
 *   X-axis angle value is calculated by complementary filter.
 */
double Gyro::getAngleX(void)
{
  return gx;
}

/**
 * \par Function
 *   getHeadingY
 * \par Description
 *   Get the angle value of Y-axis.
 * \param[in]
 *   None
 * \par Output
 *   None
 * \return
 *   The angle value of Y-axis
 * \par Others
 *   Y-axis angle value is calculated by complementary filter.
 */
double Gyro::getAngleY(void)
{
  return gy;
}

/**
 * \par Function
 *   getHeadingZ
 * \par Description
 *   Get the angle value of Z-axis.
 * \param[in]
 *   None
 * \par Output
 *   None
 * \return
 *   The angle value of Z-axis
 * \par Others
 *   Z-axis angle value is integral of Z-axis angular velocity.
 */
double Gyro::getAngleZ(void)
{
  return gz;
}

/**
 * \par Function
 *   getGyroX
 * \par Description
 *   Get the data of gyroXrate.
 * \param[in]
 *   None
 * \par Output
 *   None
 * \return
 *   The data of gyroXrate
 * \par Others
 *   None
 */
double Gyro::getGyroX(void)
{
  return gyrX;
}

/**
 * \par Function
 *   getGyroY
 * \par Description
 *   Get the data of gyroYrate.
 * \param[in]
 *   None
 * \par Output
 *   None
 * \return
 *   The data of gyroYrate
 * \par Others
 *   None
 */
double Gyro::getGyroY(void)
{
  return gyrY;
}

double Gyro::getGyroZ(void)
{
  return gyrZ;
}

/**
 * \par Function
 *   getHeadingZ
 * \par Description
 *   Get the angle value of setting axis.
 * \param[in]
 *   index - Axis settings(1:X-axis, 2:Y-axis, 3:Z-axis)
 * \par Output
 *   None
 * \return
 *   The angle value of setting axis
 * \par Others
 *   Z-axis angle value is integral of Z-axis angular velocity.
 */
double Gyro::getAngle(uint8_t index)
{
  if(index == 1)
  {
    return gx;
  }
  else if(index == 2)
  {
    return gy;
  }
  else if(index == 3)
  {
    return gz;
  }
} 

/**
 * \par Function
 *   deviceCalibration
 * \par Description
 *   Calibration function for the Gyro. 
 * \param[in]
 *   None
 * \par Output
 *   None
 * \return
 *   None.
 * \par Others
 *   The calibration function will be called in initial process, please keep the 
 *   device in a rest status at that time.
 */
void Gyro::deviceCalibration(void)
{
  uint16_t x = 0;
  uint16_t num = 500;
  long xSum	= 0, ySum = 0, zSum = 0;
  for(x = 0; x < num; x++)
  {
	  readData(0x43, i2cData, 6);
	  xSum += ( (i2cData[0] << 8) | i2cData[1] );
	  ySum += ( (i2cData[2] << 8) | i2cData[3] );
	  zSum += ( (i2cData[4] << 8) | i2cData[5] );
  }
  gyrXoffs = xSum / num;
  gyrYoffs = ySum / num;
  gyrZoffs = zSum / num;
}

int8_t Gyro::writeReg(uint8_t reg, uint8_t data)
{
  uint8_t add = Device_Address;
  add <<= 1;
  i2c_start(add+I2C_WRITE);

  i2c_write(reg);

  i2c_write(data);

  i2c_stop();
}

uint8_t Gyro::readReg(uint8_t reg)
{
  uint8_t data = 0;
  uint8_t add = Device_Address;
  add <<= 1;
  i2c_start(add+I2C_WRITE);
  i2c_write(reg);
  // read
  i2c_rep_start(add+I2C_READ);

  data= i2c_read(true);          
  i2c_stop();  
  return data;
}

int8_t Gyro::readData(uint8_t start, uint8_t *buffer, uint8_t size)
{
  uint8_t i;
  uint8_t add = Device_Address;
  add <<= 1;
  i2c_start(add+I2C_WRITE);
  i2c_write(start);
  // read
  i2c_rep_start(add+I2C_READ);
  for (i=0;i<size-1;i++)
  {
    buffer[i] = i2c_read(false);
  }
  buffer[i]= i2c_read(true);          
  i2c_stop();  
}
