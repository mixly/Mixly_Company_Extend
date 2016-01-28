#ifndef _NOVA_H_
#define _NOVA_H_
#include "Arduino.h"
#include "utility/Nova_LED.h"
#include "utility/Nova_Button.h"
#include "utility/Nova_4ADButton.h"
#include "utility/Nova_TiltSwitch.h"
#include "utility/Nova_Sound.h"
#include "utility/Nova_LimitSwitch.h"
#include "utility/Nova_Light.h"
#include "utility/Nova_Ultrasonic.h"
#include "utility/Nova_Buzzer.h"
#include "utility/Nova_DHTxx.h"
#include "utility/Nova_LineFinder.h"
#include "utility/Nova_4DigitDisplay.h"
#include "utility/Nova_Motor.h"
#include "utility/Nova_IRSendRev.h"
#include "utility/Nova_RTC.h"
#include "utility/Nova_BlueTooth.h"

#define STRING_VERSION_CONFIG_H __DATE__ " " __TIME__ //Get system time
//
#define USER	0x80
#define C0	USER+1
#define C1	USER+2

#define S0	USER+11
#define S1	USER+12
#define S2	USER+13
#define S3	USER+14
#define S4	USER+15
#define S5	USER+16

#define M0	USER+21
#define M1	USER+22
//pin define
#define C0_PIN_0	0
#define C0_PIN_1	1
#define C1_PIN_0	A5	//SCL
#define C1_PIN_1	A4	//SDA

#define S0_PIN	2
#define S1_PIN	3
#define S2_PIN	4
#define S3_PIN	5

#define S4_PIN_0	7
#define S4_PIN_1	8
#define S5_PIN_0	12
#define S5_PIN_1	13

#define M0_PIN_0	6
#define M0_PIN_1	9
#define M1_PIN_0	10
#define M1_PIN_1	11

#endif