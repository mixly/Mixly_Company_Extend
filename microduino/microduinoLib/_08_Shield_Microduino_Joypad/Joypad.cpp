/*
  Joypad.cpp - Arduino Joypad board library
  Written by Enrico Gueli
  Copyright (c) 2012 Arduino(TM)  All right reserved.

  This library is free software; you can redistribute it and/or
  modify it under the terms of the GNU Lesser General Public
  License as published by the Free Software Foundation; either
  version 2.1 of the License, or (at your option) any later version.

  This library is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
  Lesser General Public License for more details.

  You should have received a copy of the GNU Lesser General Public
  License along with this library; if not, write to the Free Software
  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/


#include "Joypad.h"

_Joypad Joypad;

/*
 * The following constants tell, for each accelerometer
 * axis, which values are returned when the axis measures
 * zero acceleration.
 */

#define CLR(x,y) (x&=(~(1<<y)))
#define SET(x,y) (x|=(1<<y))

const byte MUX_ADDR_PINS[] = { A0, A1, A2, A3 };
const byte MUX_COM_PIN = A6;

const int JOYSTICK_DEAD_ZONE = 200;

const byte BUZZER_PIN = 6;
const byte MOTOR_PIN = 8;

// non-multiplexer Joypad pins:
// External outputs: D3, D11
// Buzzer: A8

_Joypad::_Joypad() {
  for (byte p=0; p<4; p++) {
    pinMode(MUX_ADDR_PINS[p], OUTPUT);
  }
}

unsigned int _Joypad::readChannel(byte channel) {
#if defined(__AVR_ATmega1284P__) || defined(__AVR_ATmega644P__)
  (channel & 1) ? SET(PORTA, 7) : CLR(PORTA, 7);
  (channel & 2) ? SET(PORTA, 6) : CLR(PORTA, 6);
  (channel & 4) ? SET(PORTA, 5) : CLR(PORTA, 5);
  (channel & 8) ? SET(PORTA, 4) : CLR(PORTA, 4);
#elif  defined(__AVR_ATmega32U4__) || defined(__AVR_ATmega128RFA1__)
  (channel & 1) ? SET(PORTF, 7) : CLR(PORTF, 7);
  (channel & 2) ? SET(PORTF, 6) : CLR(PORTF, 6);
  (channel & 4) ? SET(PORTF, 5) : CLR(PORTF, 5);
  (channel & 8) ? SET(PORTF, 4) : CLR(PORTF, 4);
#else
  (channel & 1) ? SET(PORTC, 0) : CLR(PORTC, 0);
  (channel & 2) ? SET(PORTC, 1) : CLR(PORTC, 1);
  (channel & 4) ? SET(PORTC, 2) : CLR(PORTC, 2);
  (channel & 8) ? SET(PORTC, 3) : CLR(PORTC, 3);	
#endif

/*  digitalWrite(MUX_ADDR_PINS[0], (channel & 1) ? HIGH : LOW);
	digitalWrite(MUX_ADDR_PINS[1], (channel & 2) ? HIGH : LOW);
	digitalWrite(MUX_ADDR_PINS[2], (channel & 4) ? HIGH : LOW);
	digitalWrite(MUX_ADDR_PINS[3], (channel & 8) ? HIGH : LOW); */
  // workaround to cope with lack of pullup resistor on joystick switch
  /*
  if (channel == CH_JOYSTICK_SW || channel == CH_JOYSTICK1_SW) {
    pinMode(MUX_COM_PIN, INPUT_PULLUP); 
    unsigned int joystickSwitchState = (digitalRead(MUX_COM_PIN) == HIGH) ? 1023 : 0;
    digitalWrite(MUX_COM_PIN, LOW);
    return joystickSwitchState;
  }
  
  else if (channel >= 0 && channel <= 3) {
    pinMode(MUX_COM_PIN, INPUT_PULLUP); 
    unsigned int joystickSwitchState = (digitalRead(MUX_COM_PIN) == HIGH) ? 1023 : 0;
    digitalWrite(MUX_COM_PIN, LOW);
    return joystickSwitchState;
  }
  else
  */
//analogInputToDigitalPin(TEMP_0_PIN);

    return analogRead(MUX_COM_PIN);
}

boolean _Joypad::joyLowHalf(byte joyCh) {
  return (readChannel(joyCh) < 512 - JOYSTICK_DEAD_ZONE)
    ? LOW : HIGH;
}

boolean _Joypad::joyHighHalf(byte joyCh) {
  return (readChannel(joyCh) > 512 + JOYSTICK_DEAD_ZONE)
    ? LOW : HIGH;
}

boolean _Joypad::readButton(byte ch) {
  
  switch(ch) {
  case JOYSTICK_RIGHT:
    return joyLowHalf(CH_JOYSTICK_X);
  case JOYSTICK_LEFT:
    return joyHighHalf(CH_JOYSTICK_X);
  case JOYSTICK_UP:
    return joyLowHalf(CH_JOYSTICK_Y);
  case JOYSTICK_DOWN:
    return joyHighHalf(CH_JOYSTICK_Y);
  case JOYSTICK1_RIGHT:
    return joyLowHalf(CH_JOYSTICK1_X);
  case JOYSTICK1_LEFT:
    return joyHighHalf(CH_JOYSTICK1_X);
  case JOYSTICK1_UP:
    return joyLowHalf(CH_JOYSTICK1_Y);
  case JOYSTICK1_DOWN:
    return joyHighHalf(CH_JOYSTICK1_Y);
  }
    
  unsigned int val = readChannel(ch);
  return (val > 512) ? HIGH : LOW;
}

void _Joypad::tone(unsigned int freq) {
  if (freq > 0)
    ::tone(BUZZER_PIN, freq);
  else
    ::noTone(BUZZER_PIN);
}

void _Joypad::tone(unsigned int freq, unsigned long duration) {
  if (freq > 0)
    ::tone(BUZZER_PIN, freq, duration);
  else
    ::noTone(BUZZER_PIN);
}

void _Joypad::noTone() {
  ::noTone(BUZZER_PIN);
}

void _Joypad::motor(unsigned int motor_vol){
pinMode(MOTOR_PIN,OUTPUT);
#if defined(__AVR_ATmega1284P__)  || defined(__AVR_ATmega644P__)  || defined(__AVR_ATmega128RFA1__)   || defined(__AVR_ATmega32U4__) 
analogWrite(MOTOR_PIN,motor_vol);
#else
if(motor_vol>0)
digitalWrite(MOTOR_PIN,1);
else
digitalWrite(MOTOR_PIN,0);
#endif
}