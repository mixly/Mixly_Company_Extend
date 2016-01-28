/**************************************************************************
  Copyright (C), 2014- ,  
  File name:      BoardMega328p.h
  Author: jiangzhaohui      Version: v1.0      Date: 2014.10.8
  Description: 

  History:  
                  
    1. Date: 2014.10.8       Author:
       Modification:
    2. ...
****************************************************************************/
#ifndef TypeDef_h
#define TypeDef_h

#include <Arduino.h>

#define NC -1
/* DEVICE define */
#define VERSION 0
#define ULTRASONIC_SENSOR 1
#define TEMPERATURE_SENSOR 2
#define LIGHT_SENSOR 3
#define POTENTIONMETER 4
#define JOYSTICK 5
#define GYRO 6
#define SOUND_SENSOR 7
#define RGBLED 8
#define SEVSEG 9
#define MOTOR 10
#define SERVO 11
#define ENCODER 12
#define SPEAK  13
#define DIRECT_LED 14
#define PIRMOTION 15
#define INFRARED 16
#define LINEFOLLOWER 17
#define BAUDRATE 18
#define MATRIX_LED 19
#define SHUTTER 20
#define LIMITSWITCH 21
#define HUMIDITY 22
#define BUTTON 23
#define WEIGHT 24
#define TRAFFIC_LED 25
#define BUZZER 26
#define DIGITAL 30
#define ANALOG 31
#define PWM 32
#define ANGLE 33
#define TONE 34
#define WEIGHT_CALLIBRATION 255

typedef struct
{
    byte pin1;
    byte pin2;
}PortPin;

typedef struct
{
	byte port;
	byte device;
}PortDevice;  

typedef struct
{
    byte device;
    byte port;
    byte param;
    float values;
}Module;

#endif