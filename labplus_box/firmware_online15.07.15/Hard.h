/**************************************************************************
  Copyright (C), 2014- ,  
  File name:      Hard.h
  Author: jiangzhaohui      Version: v1.0      Date: 2014.10.8
  Description: 板载资源定义

  History:  
                  
    1. Date: 2014.10.8       Author:
       Modification:
    2. ...
****************************************************************************/
#ifndef Hard_h
#define Hard_h

/*device arduino pin define*/
//RGB LED pin
#define  PIN_LED_R 6
#define  PIN_LED_G 8
#define  PIN_LED_B 7
//Ultrasonic pin
#define  PIN_TRIG 16
#define  PIN_ECHO 17
//Button pin
#define  PIN_BT_UP      42
#define  PIN_BT_DOWN    43
#define  PIN_BT_LEFT    44
#define  PIN_BT_RIGHT   45
#define  PIN_BT_MID     46
//traffic light pin
//traffic led
#define PIN_NORTH_LED_R 30
#define PIN_NORTH_LED_Y 31
#define PIN_NORTH_LED_G 32
#define PIN_SOUTH_LED_R 33
#define PIN_SOUTH_LED_Y 34
#define PIN_SOUTH_LED_G 35
#define PIN_WEST_LED_R  36
#define PIN_WEST_LED_Y  37
#define PIN_WEST_LED_G  25
#define PIN_EAST_LED_R  24
#define PIN_EAST_LED_Y  23
#define PIN_EAST_LED_G  22
//Motor pin 
#define  PIN_MOTOR_DIR  13
#define  PIN_MOTOR_PWM  12
//Sound pin
#define PIN_SOUND   A8
//Light pin
#define PIN_LIGHT   A9
//potentiometer pin
#define PIN_POT     A10
//Infrared pin
#define   PIN_INFRARED 29
//Temperature pin
#define   PIN_TEMPERATURE 28
//Servo pin
#define PIN_SERVO 27
//Humidity pin
#define PIN_HUMIDITY 26
//Buzzer
#define PIN_BUZZER 53
//Digital LED pin
#define PIN_DIG_LED_DIO 14
#define PIN_DIG_LED_CLK 15
//Weight pin
#define PIN_WEIGHT_DIO A14
#define PIN_WEIGHT_CLK A15
//Matrix LED pin
#define PIN_MATRIX_LED_DIN 47
#define PIN_MATRIX_LED_CLK 48
#define PIN_MATRIX_LED_CS  49
//Human infrared pin
#define PIN_HUMAN_INFRARED A13 

/*device part*/
//RGB LED
#define RGB_R 1
#define RGB_G 2
#define RGB_B 3

//定义LED 点阵的级联片数
#define NumDevices_max7219  1 //定义板上LED点阵的设备数,本板只有一个点阵,因此为1

#endif