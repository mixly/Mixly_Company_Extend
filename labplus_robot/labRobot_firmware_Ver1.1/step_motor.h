#ifndef step_motor_h
#define step_motor_h
#include "Arduino.h"
#include "labRobot_IO_Def.h"

#define AIN1_A 10
#define AIN2_A 11

#define BIN1_B 2
#define BIN2_B 3

#define AIN11_A 7
#define AIN22_A 6

#define BIN11_B 5
#define BIN22_B 4

void forward(char speed);
void stop_motor(void);
void left(char speed);
void right(char speed);
void left_step_motor(char step);
void right_step_motor(char step);
#endif
