#ifndef _NOVA_H_
#define _NOVA_H_

//#define GYRO_PORT_M0

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
#define M2	S4
#define M3	S5

//pin define
#define C0_PIN_0	0
#define C0_PIN_1	1

// 位置后面需要改回来
#define C1_PIN_0	A5	//SCL
#define C1_PIN_1	A4	//SDA

#define S0_PIN	2
#define S1_PIN	9
#define S2_PIN	10
#define S3_PIN	13

#define S4_PIN_0	11
#define S4_PIN_1	12
#define S5_PIN_0	3
#define S5_PIN_1	4

#define M0_PIN_0	5
#define M0_PIN_1	7
#define M1_PIN_0	6
#define M1_PIN_1	8

#define M2_PIN_0	S4_PIN_0
#define M2_PIN_1	S4_PIN_1
#define M3_PIN_0	S5_PIN_0
#define M3_PIN_1	S5_PIN_1

#define M0_S1   M0_PIN_1
#define M0_S2   M0_PIN_0

#define M1_S1   M1_PIN_1
#define M1_S2   M1_PIN_0

#define M2_S1   M2_PIN_1
#define M2_S2   M2_PIN_0

#define M3_S1   M3_PIN_1
#define M3_S2   M3_PIN_0

#define C0_S1   C0_PIN_1
#define C0_S2   C0_PIN_0

// 位置后面需要改回来
#define C1_S1   C1_PIN_0
#define C1_S2   C1_PIN_1


#include <utility/Servo.h>
#include <utility/Wire.h>
#include <utility/EEPROM.h>
#include <utility/SoftwareSerial.h>
#include <utility/SPI.h>

#include "Arduino.h"
#include "Nova_LED.h"
#include "Nova_Relay.h"
#include "Nova_Button.h"
#include "Nova_RGB.h"
#include "Nova_TiltSwitch.h"
#include "Nova_Vibration.h"
#include "Nova_ITR.h"
#include "Nova_Hall.h"
#include "Nova_LimitSwitch.h"
#include "Nova_Sound.h"
#include "Nova_Light.h"
#include "Nova_Potentiometer.h"
#include "Nova_MQ.h"
#include "Nova_Flame.h"
#include "Nova_4ADButton.h"
#include "Nova_Ultrasonic.h"
#include "Nova_Buzzer.h"
#include "Nova_DHTxx.h"
#include "Nova_LineFinder.h"
#include "Nova_4DigitDisplay.h"
#include "Nova_Motor.h"
#include "Nova_Dual_Motor.h"
#include "Nova_IRSendRev.h"
#include "Nova_RTC.h"
#include "Nova_BlueTooth.h"
#include "Nova_Joystick.h"
#include "Nova_Gyro.h"
#include "Nova_Port.h"
#include "Nova_MP3.h"
#include "Nova_Touch.h"

#include "Nova_Stepper.h"
#include "Nova_Matrix.h"

#define STRING_VERSION_CONFIG_H __DATE__ " " __TIME__ //Get system time
//


#endif