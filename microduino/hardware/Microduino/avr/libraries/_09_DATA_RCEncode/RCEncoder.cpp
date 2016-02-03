// RCencoder.cpp
//

#include "RCEncoder.h"
//#define DEBUG
/* variables for Encoder */
volatile  byte Channel = 0;  // the channel being pulsed
static byte OutputPin;	 // the digital pin to use

/* processing states */
enum pulseStates {stateDISABLED, stateHIGH, stateLOW};
static byte pulseState = stateDISABLED;  

typedef struct {
  unsigned int ticks;  // we use 16 bit timer here so just store value to be compared as int
} Channel_t;

Channel_t Channels[NBR_OF_CHANNELS + 1];  // last entry is for sync pulse delay
unsigned long RunningPulseWidth = 0;

ISR(TIMER1_COMPA_vect) {

   if( pulseState == stateLOW ) {
     	  digitalWrite(OutputPin, LOW); //change to HIGH for invert was LOW  
	  OCR1A = Channels[Channel].ticks;
          
          pulseState = stateHIGH;
   }
  
   else if(pulseState == stateHIGH)
   {
	   OCR1A = MS_TO_TICKS(INTER_CHAN_DELAY);
           if( Channel < NBR_OF_CHANNELS)
           {
             RunningPulseWidth += Channels[Channel].ticks + INTER_CHAN_DELAY_TICKS;
	     digitalWrite(OutputPin, HIGH); //change to LOW for invert was HIGH
           }
	   pulseState = stateLOW;
	   
           Channel++;
           if(Channel == NBR_OF_CHANNELS)
           {
             Channels[NBR_OF_CHANNELS].ticks = (unsigned int)(FRAME_RATE_TICKS - RunningPulseWidth);
             RunningPulseWidth = 0;
           }

           if(Channel > NBR_OF_CHANNELS) {// note that NBR_OF_CHANNELS+1 is the sync pulse
	     Channel = 0;
             digitalWrite(OutputPin, HIGH); //needed to make the Futaba Trainer string look right
	   }
   }    
}

// private functions
// -----------------------------------------------------------------------------
// convert microseconds to timer cycles + ticks, and store in the Channels array
static void ChannelStorePulseWidth(byte Channel, int microseconds) {
  cli();  
  Channels[Channel].ticks = MS_TO_TICKS(microseconds) ;
  sei();		 // enable interrupts
#ifdef DEBUG  
   Serial.print(Channel,DEC);
   Serial.print("=\t");
   Serial.print(Channels[Channel].ticks,DEC);
   Serial.print(" RunningPulseWidth= ");
   Serial.print(RunningPulseWidth);
   Serial.print("\r\n");
#endif
}

// user api
// -----------------------------------------------------------------------------
// turns on a Channels pulse of the specified length, on the specified pin
void encoderWrite(byte channel, int microseconds) {
/*
    if ( microseconds > MAX_CHANNEL_PULSE ) {
	   microseconds = MAX_CHANNEL_PULSE;
    }
    else if ( microseconds < MIN_CHANNEL_PULSE ) {
	   microseconds = MIN_CHANNEL_PULSE;
    }
*/
    ChannelStorePulseWidth(channel, microseconds+FIX_CHANNEL_PULSE);
}

// start the encoder with output on the given pin
void encoderBegin(byte pin) {
  byte i;
  OutputPin = pin;
  pinMode(OutputPin,OUTPUT);
  
  // initialize pulse width data in Channel array.
  for (i=0; i < NBR_OF_CHANNELS; ++i)
     ChannelStorePulseWidth(i, MID_CHANNEL_PULSE+FIX_CHANNEL_PULSE);
    
  ChannelStorePulseWidth(NBR_OF_CHANNELS, SYNC_PULSE_WIDTH);  // store sync pulse width

  TIMSK1 |= (1<<OCIE1A); //Enable compare interrupt
  TCCR1A = _BV(WGM10) | _BV(WGM11);   //Timer 1 is Phase-correct 10-bit PWM.
  TCCR1A |= _BV(COM1A1);		  //Clear OC1A on compare match when up-counting, set OC1A on compare match when down-counting.

   TCCR1B = _BV(WGM13) | _BV(WGM12) | _BV(CS11); /* div 8 clock prescaler */
    
  Channel = 0;
  pulseState = stateLOW; // flag ISR we are ready to pulse the channels
} 


