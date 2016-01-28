#include "Arduino.h"
#ifndef audio_play_h
#define audio_play_h

//#define Busy 46

#define A_DATA 45//PL4
#define A_CS 46//PL3
#define A_CL 47//PL2
#define A_RESET 48//PL1

/*commands for address 0x01-0x0f*/

#define command_play_back      0x00
#define command_play_1_do      0x01
#define command_play_2_re      0x02
#define command_play_3_mi      0x03
#define command_play_4_fa      0x04
#define command_play_5_sol     0x05
#define command_play_6_la      0x06
#define command_play_7_si      0x07
#define command_play_speed     0x08
#define command_play_stop      0x09
#define command_play_jingyin   0x0a

#define command_play_section_11 0x0b
#define command_play_section_12 0x0c
#define command_play_section_13 0x0d
#define command_play_section_14 0x0e
#define command_play_section_15 0x0f

#define sound_vol_level_1    0xe0
#define sound_vol_level_2    0xe1
#define sound_vol_level_3    0xe2
#define sound_vol_level_4    0xe3
#define sound_vol_level_5    0xe4
#define sound_vol_level_6    0xe5
#define sound_vol_level_7    0xe6
#define sound_vol_level_8    0xe7

#define play_stop_command    0xfe
#define play_start_command   0xf2
  
void audio_play_init(void);
void three_lines(unsigned char addr);
void play_stop(void);
#endif
/**/