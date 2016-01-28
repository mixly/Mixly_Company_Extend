#ifndef labRobot_IO_Def_h
#define labRobot_IO_Def_h
#include <Arduino.h>
#include <math.h>

#include <Wire.h>
#include "EEPROM.h"
#include <avr/io.h>
#include <util/delay.h>
#include <avr/interrupt.h>

#include <stdio.h>
#include <avr/wdt.h>
#include <FlexiTimer2.h>
#include <avr/io.h> 
#include "labRobot_API.h"

#include "Adafruit_LEDBackpack.h"
#include "Adafruit_GFX.h"
#include "intelligent_car.h"
#include <step_motor.h>
#include "led8.c"

#include <MBUltrasonic.h>
#include <GroveColorSensor.h>//for RGB sensor

#include <audio_play.h>

#include <ld3320.h>

#define RedPin     3

#define GreenPin   2
#define BluePin    5

#define TRACKING_LED_PWM    12
#define RGB_LED_PWM         13

#define devce_NO1   1
#define devce_NO2   2
#define devce_NO3   3

#define button_NO1   1
#define button_NO2   2
#define button_NO3   3

#define button_LED_NO1 1

#define button_no   18
//11.8-->1
#define count_180   2114
#define count_90    1058
#define count_5     59
#define count_45    529

#define count1_180  2114
#define count1_90   1058
#define count1_5    59
#define count1_45   529

#define RGB_sensor_NO1   1

#define TRACKING_SENSE1  A0
#define TRACKING_SENSE2  A1
#define TRACKING_SENSE3  A2
#define TRACKING_SENSE4  A3 

#define FALL_PROTECTION_SENSE2  A4
#define FALL_PROTECTION_SENSE1  A5
#define FALL_PROTECTION_SENSE3  A6
#define FALL_PROTECTION_SENSE4  A7

#define BACK_AVOID_SENSE2   A8
#define BACK_AVOID_SENSE1   A9

#define Front_AVOID_SENSE    A10
#define Front_AVOID_SENSE2   A11

#define sensor_NO1   1
#define sensor_NO2   2
#define sensor_NO3   3
#define sensor_NO4   4
#define sensor_NO5   5
#define sensor_NO6   6
#define sensor_NO7   7
#define sensor_NO8   8

#define photistor_NO1   1
#define photistor_NO2   2
#define photistor_NO3   3
#define photistor_NO4   4

#define RGB_sensor_NO1  1

#define track_light_NO1  1
#define track_light_NO2  2
#define track_light_NO3  3

#define ULT_sensor_NO1   1

#define FOLLOW_LINE_PWR_EN   10 //for RGB Sensor

struct step_state
{
	unsigned char direction;
	unsigned char state_last;
  unsigned long count_left;
	unsigned long count_right;
	unsigned long r_count;
	unsigned long l_count;
	
	//unsigned long time_count;
	char time_count;
	unsigned long time1_count;
	unsigned char time1_out;
	
	unsigned long time2_count;	
	unsigned char time2_out;
	
	unsigned long time3_count;
	unsigned char time3_out;

	unsigned long time4_count;	
	unsigned char time4_out;
	
	unsigned long time5_count;
	unsigned char time5_out;
	
	unsigned long time6_count;
	unsigned char time6_out;
	
	unsigned char button_count;
	unsigned char button_scan_state;
	char button_state_last;
	char start_state;
	char step_speed_count;
	char step_speed;
	
	char step_num;
	
	int timer2_speed;//for step speed
	
	char Divi;
};
struct step_motor
{
	unsigned char step_dir;
	unsigned char step_divi;
	unsigned char step_number;
	unsigned char step_speed;
	unsigned long step_timer_count;
};
struct _voice_state
{
	unsigned char voice_mode;
	unsigned char voice_init;
};
struct _bluetooth_state
{
	unsigned char buletooth_init;
	byte bluetooth_proess_state;
	char bluetooth_mode;
	byte RX3_state;
	byte proess_buf[32];
	byte Tx3_buf[32];
	byte Rx3_buf[32];
};
typedef enum stepstate
{
	motor_start    = 1,
	motor_stop     = 2,
	motor_back     = 3,
  motor_left     = 4,
	motor_right    = 5,
	motor_idle     = 6,
	motor_left_45  = 7,
	motor_right_45 = 8,
}stepstate_type;

typedef enum controller_command
{
	m_right             = 1,
	m_left              = 2,	
	m_move              = 3,
	m_back              = 4,	
	m_stop              = 5,
	turn_around         = 6,
	m_right_any_angle   = 11,
	m_left_any_angle    = 12,
}controller_command_type;

typedef enum devce_ID
{
	devce_RGB_Light       = 1,
	devce_RGB             = 2,
	devce_8x16matrixLED   = 3,
}devce_ID_type;

typedef enum display_ID
{
	LED_8x8     = 1,
	LED_8x16    = 2,
	RGB_LED     = 3,
	button_LED  = 4,
}display_ID_type;

typedef enum display_command
{
  no_command      = 0,
	smile           = 1,
	left_dire       = 2,
  right_dire      = 3,
  close_eyes      = 4,
	tiaowen         = 5,
	zebra           = 6,
	no_smile        = 7,
	buttion_LED_on  = 8,
	buttion_LED_off = 9,
}display_command_type;

typedef enum sensor_ID
{
	IR_sensor     = 1,
	ULT_sensor    = 2,	
	Temp_sensor   = 3,
  RGB_sensor    = 4,
	photistor     = 5,
	light_sensor  = 6,		
}sensor_ID_type;

typedef enum controller_ID
{
	DC_motor      = 1,
	tw_robot      = 2,
	button        = 3,
  speaker       = 4,
}controller_ID_type;

// typedef enum
// {
	// WHITE = 0,
	// BLACK = 1,
	// RED   = 2,
	// GREEN = 3,
	// BLUE  = 4,
	// UNKNOW_COLOR = 5,
// }COLOR;

typedef enum Voice_module
{
	Voice_recognition           = 1,
	Voice_MP3                   = 2,  
	Voice_recognition_and_mp3   = 3,
}Voice_module_type;
#endif