#include "Arduino.h"
#include <avr/io.h>
#include <avr/interrupt.h> 
#include "labRobot_API.h"

#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <avr/pgmspace.h>

#define value   600
#define value1  680

#define ULT_sensor_Pin 16

// Right-->Left
#define track_light1_threshold 800 
#define track_light2_threshold 800 
#define track_light3_threshold 800

#define busy 1
#define no_busy 0

typedef union
{
   uint8_t byteData[2];
   uint16_t intData;
}BYTE_INT;

uint16_t followLineParam[8];
BYTE_INT tempFollowLineParam[4];
BYTE_INT any_angle;
/*Right-->Left--above hardware Ver1.1*/
int tracking1_threshold;
int tracking2_threshold;
int tracking3_threshold;
int tracking4_threshold;

char Voice_module_mode;

extern int step_nu;
extern int step_nu1;

extern int step1_nu;
extern int step1_nu1;

extern char step_num;
extern char step_num1;
extern char step_num2;

extern byte Rx3_count;
extern byte Tx3_count;
extern byte proess_count;

extern Adafruit_8x16matrix matrix;
_voice_state voice_state;
extern _bluetooth_state bluetooth_state;

extern GroveColorSensor colorSensor;
extern COLOR mycolor;

VoiceRecognition Voice1; /*creat a voice object*/
												   					  						  					  
//   A0 = 54;//   A1 = 55;//   A2 = 56;//   A3 = 57;//   A4 = 58;//   A5 = 59;//   A6 = 60;//   A7 = 61;
//   A8 = 62;//   A9 = 63;//   A10 = 64;//  A11 = 65;//   A12 = 66;//   A13 = 67;//   A14 = 68;//   A15 = 69;
long (*sensor_getData_array[7][9])(void) = {/*creat an array for sensor_getData funcs*/
											{do_nothing,0,0,0,0,0,0,0,do_nothing},
											{do_nothing,sensor_ID1_NO1,sensor_ID1_NO2,sensor_ID1_NO3,sensor_ID1_NO4,sensor_ID1_NO5,sensor_ID1_NO6,sensor_ID1_NO7,sensor_ID1_NO8},
											{do_nothing,sensor_ID2_NO1,0,0,0,0,0,0,do_nothing},
											{do_nothing,0,0,0,0,0,0,0,do_nothing},
											{do_nothing,sensor_ID4_NO1,0,0,0,0,0,0,do_nothing},
											{do_nothing,sensor_ID5_NO1,sensor_ID5_NO2,sensor_ID5_NO3,sensor_ID5_NO4,0,0,0,do_nothing},
											{do_nothing,sensor_ID6_NO1,sensor_ID6_NO2,0,0,0,0,0,do_nothing}																						
										   };	
long do_nothing(void)
{
}										   
long sensor_ID1_NO1(void)
{
	if(analogRead(A6)>value1)
	{
		return 1;
	}
	else
	{
		return 0;
	}	
}
long sensor_ID1_NO2(void)
{
	if(analogRead(A7)>value1)
	{
		return 1;
	}
	else
	{
		return 0;
	}	
}
long sensor_ID1_NO3(void)
{
	if(analogRead(A4)>value1)
	{
		return 1;
	}
	else
	{
		return 0;
	}	
}
long sensor_ID1_NO4(void)
{
	if(analogRead(A5)>value1)
	{
		return 1;
	}
	else
	{
		return 0;
	}	
}
long sensor_ID1_NO5(void)
{
	if(analogRead(A9)>value)
	{
	  return 1;
	}
	else
	{
	  return 0;
	}	
}
long sensor_ID1_NO6(void)
{
	if(analogRead(A8)>value)
	{
	  return 1;
	}
	else
	{
	  return 0;
	}	
}
long sensor_ID1_NO7(void)
{
	if(analogRead(A10)>value)
	{
	  return 1;
	}
	else
	{
	  return 0;
	}	
}
long sensor_ID1_NO8(void)
{
	if(analogRead(A11)>value)
	{
	  return 1;
	}
	else
	{
	  return 0;
	}	
}
long sensor_ID2_NO1(void)//ULT_sensor
{
	return (distanceCm(ULT_sensor_Pin));	
}
long sensor_ID4_NO1(void)
{
	return (long)colorSensor.getColor();	
}
long sensor_ID5_NO1(void)
{
	//Serial.println(analogRead(A3));
	if(analogRead(A3)>tracking3_threshold)//Q7
	{
	  return 0;
	}
	else
	{
	  return 1;						
	}	
}
long sensor_ID5_NO2(void)
{
	//Serial.println(analogRead(A2));
	if(analogRead(A2)>tracking2_threshold)//Q5
	{
	  return 0;
	}
	else
	{
	  return 1;						
	}	
}
long sensor_ID5_NO3(void)
{
	//Serial.println(analogRead(A0));
	if(analogRead(A0)>tracking4_threshold)//Q8
	{
	  return 0;
	}
	else
	{
	  return 1;						
	}	
}
long sensor_ID5_NO4(void)
{
	//Serial.println(analogRead(A1));
	if(analogRead(A1)>tracking1_threshold)//Q6
	{
	  return 0;
	}
	else
	{
	  return 1;						
	}	
}	
long sensor_ID6_NO1(void)//light_sensor
{
	return (analogRead(A12));
}	
long sensor_ID6_NO2(void)//light_sensor
{
	return (analogRead(A13));
}																				 
long sensor_getData(byte sensor_ID, byte sensor_NO, byte sensor_command)
{
  long value0 = 0;
  byte cm = sensor_command;

  return sensor_getData_array[sensor_ID][sensor_NO]();
}
 extern step_state step_state1;
 long count;
 long controller_read(byte controller_ID, byte controller_NO, unsigned long Value)
 {
		unsigned long va1;
		unsigned long va2 = Value;
		if(digitalRead(button_no)==0)
		 {
			delay(5);
			if(digitalRead(button_no)==0)
			{
				while(digitalRead(button_no)==0);
				step_state1.button_count++;
				if(step_state1.button_count==1) 
				{
				 step_state1.button_state_last = 1;
				 return 1;
				}
				if(step_state1.button_count==2) 
				{
					step_state1.button_state_last = 2;
					step_state1.button_count = 0;  
					return 1;
				}		  
			}
		 }
		else
		{
			return 0;
		}
 }
 void step_thread(void) 
{
    step_state1.state_last = step_state1.direction;
    switch(step_state1.direction)
    {
      case motor_back:/*robot back off*/
      {
        forward(step_nu);
        step_nu++;
        if(step_nu==8) step_nu=0;
      }
      break;
      case motor_start:/*robot move*/
      {
        forward(step_nu1);
        --step_nu1;
        if(step_nu1==0) step_nu1=7;              
      }
      break;
      default:/*robot stop*/
      {		  
        stop_motor();
      }
    }
    if(step_state1.time1_count>0)
	 {
	   step_state1.time1_count--;
	   if(step_state1.time1_count==0) step_state1.time1_out = 1;
	 } 
}
 void step_thread1(void) 
{
	step_state1.time_count++;
	if(step_state1.time_count == step_state1.Divi)
	{
		step_state1.time_count = 0;
		switch(step_state1.direction)
		{
		  case motor_back:/*robot back off*/
		  {
				forward(step_nu);
				step_nu++;
				if(step_nu==8) step_nu=0;
		  }
		  break;
		  case motor_start:/*robot move*/
		  {
				forward(step_nu1);
				--step_nu1;
				if(step_nu1==0) step_nu1=7;              
		  }
		  break;
		  case motor_left:/*robot turn left*/
		  {
			  if(step_state1.count_right>0)
			  {
					step_state1.count_right--;
					right(step_state1.step_num);
					step_state1.step_num++;
					if(step_state1.step_num==8) step_state1.step_num =0;    
			  }
			  else
			  {
					step_state1.direction = motor_idle;  
			  }
		  }
		  break;
		  case motor_right:/*robot turn right*/
		  {  
			  if(step_state1.count_left>0)
			  {
					step_state1.count_left--;
					left(step_state1.step_num);
					step_state1.step_num++;
					if(step_state1.step_num==8) step_state1.step_num =0;    
			  }
			  else
			  {
					step_state1.direction = motor_idle;  
			  }		  
		  }		  
		  break;
		  default:/*robot stop*/
		  {
			 stop_motor();
		  }
		}		
	}
    if(step_state1.time1_count>0)
	 {
	   step_state1.time1_count--;
	   if(step_state1.time1_count==0) 
	   {
		   step_state1.direction = motor_idle;
	   }
	 } 
    if(step_state1.time2_count>0)
	 {
	   step_state1.time2_count--;
	   if(step_state1.time2_count==0) 
	   {
		   voice_state.voice_init = 0;
	   }
	 }	 
}

 step_motor step_motor_left,step_motor_right;
 void step_thread2(void) 
{
	step_motor_left.step_timer_count++;
	step_motor_right.step_timer_count++;
	if(step_motor_left.step_timer_count == step_motor_left.step_divi)/*step_motor_left action*/
	{
		step_motor_left.step_timer_count = 0;
		switch(step_motor_left.step_dir)
		{
		  case motor_back:/*step_motor_left back off*/
		  {
				left_step_motor(step_nu);
				step_nu++;
				if(step_nu==8) step_nu=0;
		  }
		  break;
		  case motor_start:/*step_motor_left move*/
		  {
				left_step_motor(step_nu1);
				--step_nu1;
				if(step_nu1==0) step_nu1=7;              
		  }  
		  break;
		  default:/*step_motor_left stop*/
		  {
			  PORTH &=~(1<<PH6);
			  PORTH &=~(1<<PH5);
			  PORTH &=~(1<<PH4);
			  PORTH &=~(1<<PH3);
		  }
		}		
	}
	
	if(step_motor_right.step_timer_count == step_motor_right.step_divi)/*step_motor_right action*/
	{
		step_motor_right.step_timer_count = 0;
		switch(step_motor_right.step_dir)
		{
		  case motor_back:/*step_motor_right back off*/
		  {
				right_step_motor(step_nu);
				step1_nu++;
				if(step1_nu==8) step1_nu=0;
		  }
		  break;
		  case motor_start:/*step_motor_right move*/
		  {
				right_step_motor(step1_nu1);
				--step1_nu1;
				if(step1_nu1==0) step1_nu1=7;              
		  }  
		  break;
		  default:/*step_motor_right stop*/
		  {
				PORTC &= 0xf0;
		  }
		}		
	}
	
    if(step_state1.time1_count>0)
	 {
	   step_state1.time1_count--;
	   if(step_state1.time1_count==0) 
	   {
	   }
	 } 
    if(step_state1.time2_count>0)
	 {
	   step_state1.time2_count--;
	   if(step_state1.time2_count==0) 		   	   
	   {
		   voice_state.voice_init = 0;
	   }
	 }	 
}
void Hal_Init(void)
{
	matrix.clear();
	matrix.writeDisplay();	
  matrix.begin(0x70);
	matrix.clear();
	matrix.writeDisplay();
  char i;
	for(i=16;i>-49;i--)
	{		
		matrix.clear();
		matrix.drawBitmap(0, i, bmp_welcome, 8, 48, LED_ON);
		matrix.writeDisplay();
		delay(45);	
	}
	for(i=8;i>-1;i--)
	{		
		matrix.clear();
		matrix.drawBitmap(i, 4, smile_bmp1, 8, 8, LED_ON);
		matrix.writeDisplay();
		delay(30);	
	}

  step_state1.button_count = 0;
  step_state1.button_scan_state = 0;
	step_state1.step_speed = 0;
	step_state1.time1_out = 0;
	step_state1.time1_count = 1;
	
  step_state1.start_state = 0;
	step_state1.step_speed = 0;
	step_state1.timer2_speed = 0;
	step_state1.step_num = 0;
	
	step_state1.Divi = 2;
	Rx3_count = 0;
	Tx3_count = 0;
	
	bluetooth_state.bluetooth_proess_state = no_busy;
	bluetooth_state.bluetooth_mode = 0;
	bluetooth_state.RX3_state = 0;
	bluetooth_state.buletooth_init = 0;
	
	voice_state.voice_init = 0;	
	
	step_motor_left.step_divi = 2;
  step_motor_right.step_divi = 2;
   
	step_motor_left.step_divi = 1;
	step_motor_right.step_divi = 1;
	
	delay(5);
	matrix.clear();
	matrix.drawBitmap(0, 4, close_eyes_bmp, 8, 8, LED_ON);
	matrix.writeDisplay();	
	
	DDRA |=(1<<PA2);
	DDRA |=(1<<PA3);
	DDRA |=(1<<PA4);

	PORTA &=~(1<<PA2);
	PORTA &=~(1<<PA3);
	PORTA &=~(1<<PA4);

	DDRK |=(1<<PK7);
	PORTK &=~(1<<PK7);
			
	PORTB &=~(1<<PB4);

	DDRE=_BV(PE5)|_BV(PE4)|_BV(PE3);
	DDRB=_BV(PB6)|_BV(PB5)|_BV(PB4);
	DDRC=_BV(PC3)|_BV(PC2)|_BV(PC1)|_BV(PC0);
	DDRH=_BV(PH6)|_BV(PH5)|_BV(PH4)|_BV(PH3);

	Serial.begin(115200);
	Serial.flush();

	Serial3.begin(115200);
	Serial3.flush();
	
	PORTB &=~(1<<PB5);
	PORTB |= (1<<PB6);

	PORTE &=~(1<<PE5);
	PORTE &=~(1<<PE4);
	PORTE &=~(1<<PE3);
		
	PORTH &=~(1<<PH6);
	PORTH &=~(1<<PH5);
	PORTH &=~(1<<PH4);
	PORTH &=~(1<<PH3);
	PORTE &=~(1<<PE5);
	PORTE &=~(1<<PE4);
	PORTE &=~(1<<PE3);
 
	PORTC &= 0xf0;
	PORTB &=~(1<<PB5);

	DDRA &=~(1<<PA1);

	pinMode(A0,INPUT);
	pinMode(A1,INPUT);
	pinMode(A2,INPUT);
	pinMode(A3,INPUT);
	pinMode(A4,INPUT);
	pinMode(A4,INPUT);
	pinMode(A6,INPUT);
	pinMode(A7,INPUT);
	
	pinMode(A8,INPUT);
	pinMode(A9,INPUT);
	pinMode(A10,INPUT);
	pinMode(A11,INPUT);
	pinMode(A12,INPUT);
	pinMode(A13,INPUT);
	pinMode(A14,INPUT);
	pinMode(A15,INPUT); 

	DDRB=_BV(PB5)|_BV(PB4);
	PORTB &=~(1<<PB5);

	pinMode(18,INPUT_PULLUP);    
	
	FlexiTimer2::set(2, step_thread);
  //FlexiTimer2::set(1, step_thread1);
	//FlexiTimer2::set(1, step_thread2);
	TIMSK2 |= (1<<TOIE2);

	DDRB |=(1<<PB6); //for tracking LED
	PORTB &=~(1<<PB6);
	
	DDRK |=(1<<PK7);   
	PORTK &=~(1<<PK7);
	DDRA |=(1<<PA4);
	PORTA &=~(1<<PA4);

	DDRB |=(1<<PK5);
	DDRD |=(1<<PK7);

	pinMode(3, INPUT);
	pinMode(17,INPUT);   
	
  int j;
	for(j=0; j<4; j++)
	{ 
		tempFollowLineParam[j].byteData[0] = EEPROM.read(j*2+14);
		tempFollowLineParam[j].byteData[1] = EEPROM.read(j*2+14+1);	
	}
	tracking4_threshold = tempFollowLineParam[0].intData;//a0->Q6
	tracking1_threshold = tempFollowLineParam[1].intData;//a1->Q4
	tracking2_threshold = tempFollowLineParam[2].intData;//a2->Q3
	tracking3_threshold = tempFollowLineParam[3].intData;//a3->Q5
	
	colorSensor.GroveColorInit();

	audio_play_init();
	Voice_module_mode = 0;

	delay(30);
	matrix.drawBitmap(0, 4, smile_bmp1, 8, 8, LED_ON);
	matrix.writeDisplay();

	unsigned long button_num = millis();
  if(digitalRead(button_no)==0)/*if press the button untill play a sound,and then into Voice_module_mode*/
  {
    delay(10);
    if(digitalRead(button_no)==0)
    {
      while(digitalRead(button_no)==0)
      {
        if((millis()-button_num)>=2000) 
        {
					Voice_module_mode = 1;
          three_lines(0);
          break;
        }
      }
    }
  }
}

void display(byte display_ID, byte devce_NO, byte displayer_command, long data1, long data2, long data3)
{
	byte a = devce_NO;
  switch(display_ID)
  {
    case 2:
    {
		    matrix.clear();
        switch(displayer_command)
        {
          case 1:
            matrix.drawBitmap(0, 4, smile_bmp1, 8, 8, LED_ON);
          break;
          case 2:
            matrix.drawBitmap(0, 2, right_bmp, 8, 16, LED_ON);
          break;
          case 3:
            matrix.drawBitmap(0, 2,left_bmp, 8, 16, LED_ON);     
          break;
          case 4:
            matrix.drawBitmap(0, 4, close_eyes_bmp, 8, 8, LED_ON);        
          break;
					case 5:
            matrix.drawBitmap(0, 0, tiaowen_bmp, 8, 16, LED_ON);       
          break;
					case 6:
            matrix.drawBitmap(0, 0, zebra_bmp, 8, 16, LED_ON);          
          break;
					case 7:
            matrix.drawBitmap(0, 4, no_smile_bmp, 8, 8, LED_ON);			
          break;
          default:
          break;					
        }
					matrix.writeDisplay(); 
    }
    break;
    case 3:
    {
		 analogWrite(RedPin,data1);
		 analogWrite(GreenPin,data2);
		 analogWrite(BluePin,data3);   
    }
    break;
	  case 4:
	  if(displayer_command==8)//button_LED_on
	  {				  
	   PORTK &=~(1<<PK7);				  
	  }
	  else if(displayer_command==9)//button_LED_off
	  {	
	   PORTK |=1<<PK7;			  
	  }	
      break;	  
  }
}

void turn_right_5(unsigned long data)
{
	  unsigned long b = data;
	  TIMSK2 &= ~(1<<TOIE2);
	  step_state1.direction = motor_idle;
	  step_num = 0;
	  step_state1.count_left = count1_5;
	  while(step_state1.count_left--)
	  {
		left(step_num);
		delay(2);
		step_num++;
		if(step_num==8) step_num=0;    
	  }
	  TIMSK2 |= (1<<TOIE2);
}
void turn_left_5(unsigned long data)
{
	  unsigned long b = data;
	  TIMSK2 &= ~(1<<TOIE2);
	  step_state1.direction = motor_idle;
	  step_num = 0;
	  step_state1.count_right = count1_5;
	  while(step_state1.count_right--)
	  {
		right(step_num);
		delay(2);
		step_num++;
		if(step_num==8) step_num=0;    
	  }
	  TIMSK2 |= (1<<TOIE2);
}
void move(unsigned long data)
{
	  step_state1.direction = motor_start;
	  step_state1.step_speed = data;
	  FlexiTimer2::time_units = data;			  
	  TIMSK2 |= (1<<TOIE2);
}
void back(unsigned long data)
{
	  step_state1.direction=motor_back;
	  FlexiTimer2::time_units = data;	
	  TIMSK2 |= (1<<TOIE2);	
}
void stop(unsigned long data)
{
	  unsigned long b = data;
	  step_state1.direction=motor_idle;
	  TIMSK2 &= ~(1<<TOIE2);
	  PORTH &=~(1<<PH6);
	  PORTH &=~(1<<PH5);
	  PORTH &=~(1<<PH4);
	  PORTH &=~(1<<PH3);
	  PORTC &= 0xf0;
}
void round_180(unsigned long data)
{
	  TIMSK2 &= ~(1<<TOIE2);
	  step_state1.direction=motor_idle;
	  step_num = 0;
	  step_state1.count_right = count1_180;
	  while(step_state1.count_right--)
	  {
			right(step_num);
			delay(data);
			step_num++;
			if(step_num==8) step_num=0;    
	  }
	  TIMSK2 |= (1<<TOIE2);	
}
void right_90(unsigned long data)
{
	  TIMSK2 &= ~(1<<TOIE2);
		step_state1.direction=motor_idle;
	  step_num = 0;
	  step_state1.count_left = count1_90;
	  while(step_state1.count_left--)
	  {
			left(step_num);
			delay(data);
			step_num++;
			if(step_num==8) step_num=0;    
	  }
	  TIMSK2 |= (1<<TOIE2);	
}
void left_90(unsigned long data)
{
	  TIMSK2 &= ~(1<<TOIE2);
		step_state1.direction=motor_idle;
	  step_num = 0;
	  step_state1.count_right = count1_90;
	  while(step_state1.count_right--)
	  {
			right(step_num);
			delay(data);
			step_num++;
			if(step_num==8) step_num=0;    
	  }
		TIMSK2 |= (1<<TOIE2);
}
void right_45(unsigned long data)
{
	  TIMSK2 &= ~(1<<TOIE2);
		step_state1.direction=motor_idle;
	  step_num = 0;
	  step_state1.count_left = count1_45;
	  while(step_state1.count_left--)
	  {
			left(step_num);
			delay(data);
			step_num++;
			if(step_num==8) step_num=0;    
	  }
		TIMSK2 |= (1<<TOIE2);	
}
void left_45(unsigned long data)
{
	  TIMSK2 &= ~(1<<TOIE2);
		step_state1.direction=motor_idle;
	  step_num = 0;
	  step_state1.count_right = count1_45;
	  while(step_state1.count_right--)
	  {
			right(step_num);
			delay(data);
			step_num++;
			if(step_num==8) step_num=0;    
	  }
		TIMSK2 |= (1<<TOIE2);	
}
//
void right_anyAngle(unsigned long data)
{
	  double angle = (2114/180)*data;
	  TIMSK2 &= ~(1<<TOIE2);
		step_state1.direction=motor_idle;
	  step_num = 0;
	  step_state1.count_left = angle;
	  while(step_state1.count_left--)
	  {
			left(step_num);
			delay(1);
			step_num++;
			if(step_num==8) step_num=0;    
	  }
		TIMSK2 |= (1<<TOIE2);	
}
void left_anyAngle(unsigned long data)
{
	  double angle = (2114/180)*data;
	  TIMSK2 &= ~(1<<TOIE2);
		step_state1.direction=motor_idle;
	  step_num = 0;
	  step_state1.count_right = angle;
	  while(step_state1.count_right--)
	  {
			right(step_num);
			delay(1);
			step_num++;
			if(step_num==8) step_num=0;    
	  }
		TIMSK2 |= (1<<TOIE2);	
}
//

void speak_player(unsigned long data)
{
		byte a = (byte)data;
		three_lines(a);
}
void (*controller_write_array[6][13])(unsigned long val) = {/*creat an array for sensor_getData funcs*/
															{stop,0,0,0,0,0,0,0,0,0,0,0,stop},
															{stop,0,0,0,0,0,0,0,0,0,0,0,stop},
															{stop,turn_right_5,turn_left_5,move,back,stop,round_180,right_90,left_90,right_45,left_45,right_anyAngle,left_anyAngle},
															{stop,0,0,0,0,0,0,0,0,0,0,0,stop},
															{speak_player,0,0,0,0,0,0,0,0,0,0,0,stop},																						
															{stop,0,0,0,0,0,0,0,0,0,0,0,stop}
														   };	
void controller_write(byte controller_ID, byte controller_NO,byte controller_command, unsigned long Value)
{
   byte a = controller_NO;
   controller_write_array[controller_ID][controller_command](Value);
}
void Voice_module(byte mode)
{
	byte a = mode;
	if(voice_state.voice_init==0)
	{
		FlexiTimer2::time_units = 1;
		FlexiTimer2::func = step_thread1;//add callback to T2
		voice_state.voice_init = 1;
		Voice1.init();  //init VoiceRecognition
		Voice1.addCommand("xiao bai",0); 
		Voice1.addCommand("kai deng",5); 
		Voice1.addCommand("guan deng",6); 
		Voice1.addCommand("qian jin",7); 
		Voice1.addCommand("hou tui",8);  
		Voice1.addCommand("zuo zhuan",9);  
		Voice1.addCommand("you zhuan",10);  
		Voice1.addCommand("zhuan shen",11);  
		Voice1.addCommand("ting",12);  
		Voice1.addCommand("da bai",13);   
		Voice1.addCommand("da",14);  
			
		Voice1.addCommand("zhuan",15); 
		Voice1.addCommand("qian",16);  
		Voice1.addCommand("jin",17);   
		Voice1.addCommand("kai",18); 
		Voice1.addCommand("deng",19); 
		Voice1.addCommand("a",20);  
		Voice1.addCommand("ye",21);  
		Voice1.addCommand("da da",22); 
		Voice1.addCommand("du",23);  
		Voice1.addCommand("di",24);  
		Voice1.addCommand("de",25);  
		Voice1.addCommand("zuo",26);  
		Voice1.addCommand("ke yi ya",27);    
		Voice1.start();//start ASR
		step_state1.time2_count = 20000;

	}
  switch(Voice1.read())  //check the Value for ASR result
  {
		case 5:                                     
				analogWrite(GreenPin,255);
        break;
    case 6:                                     
				analogWrite(GreenPin,0);
        break;  
    case 7:                                     
        //Serial.println("qian jin");
				step_state1.time2_count = 20000;
				step_state1.direction = motor_start;
				step_state1.time_count = 0;	
				step_state1.time1_count	= 3500;	
        break;
    case 8:                                     
        //Serial.println("hou tui");
				step_state1.time2_count = 20000;
				step_state1.direction = motor_back;
				step_state1.time_count = 0;	
				step_state1.time1_count	= 3500;
        break;  
    case 9:                                    
        //Serial.println("zuo zhuan");
				step_state1.time2_count = 20000;
				step_state1.step_num =0;
				step_state1.direction = motor_left;
				step_state1.count_right = count_45;
				step_state1.time_count = 0;			
        break;
    case 10:                                     
       //Serial.println("you zhuan");
			 step_state1.time2_count = 20000;
			 step_state1.step_num =0;				
			 step_state1.direction = motor_right;
			 step_state1.count_left = count_45;
			 step_state1.time_count = 0;	 
     break;
    case 11:                                     
       //Serial.println("zhuan shen"); 
			 step_state1.time2_count = 20000;
			 step_state1.step_num =0;				
			 step_state1.direction = motor_right;
			 step_state1.count_left = count_180;
			 step_state1.time_count = 0;	 
			 break; 
   case 12:                                     
			 step_state1.time2_count = 20000;
			 step_state1.direction = motor_idle;
			 step_state1.time_count = 0;
			 break;            
   default:
       break;
  }
}

void serialEvent3() 
{
	Rx3_count = 0;
	byte time_out = 0;
	unsigned long old_time = millis();
	while (Serial3.available()) 
	{
	 bluetooth_state.Rx3_buf[Rx3_count] = Serial3.read();//Receive packet length
	 Rx3_count++;	
	 while (!Serial3.available())
	 {
		if(bluetooth_state.Rx3_buf[1]==Rx3_count) goto finish;
		if(Rx3_count>32) break;
		if((millis()-old_time)>=50)
		{
			time_out = 1;
			goto timeout;/*timeout leave*/
		}				
	 }      
	}
	finish:
	if((bluetooth_state.Rx3_buf[0] == 0xa5)&&(bluetooth_state.Rx3_buf[Rx3_count-1] == 0x5a))
	{
		if(Rx3_count>=4)
		{
			if(!(Rx3_count>32))
			{
			  proess_count = Rx3_count;				  
			}
			else
			{
			  proess_count = 32;
			}
			if(bluetooth_state.Rx3_buf[2] == 0xff) 		
			{
				FlexiTimer2::time_units = 1;
				FlexiTimer2::func = step_thread1;			
				bluetooth_state.bluetooth_mode = 1;//activate for the bluetooth of labRobot
				Voice_module_mode = 0;/*unable Voice_module_mode*/
				voice_state.voice_init = 0;
			}
			memcpy(bluetooth_state.proess_buf,bluetooth_state.Rx3_buf,sizeof(byte)*proess_count);
			bluetooth_state.RX3_state = 1;//Receive data packet succesful
      Serial3.write(0x79);//ack=0x79 			
		}	
	}
	else
	{
		Serial3.write(0x78);//Not successful ack=0x78			
	}	
	timeout:
  if(time_out ==1) 
	{
		time_out = 0;
		Serial3.write(0x78);//if timeout,ack=0x78	
	}	
	memset(bluetooth_state.Rx3_buf,0,Rx3_count); 
	Rx3_count = 0;	 
	Serial3.flush();	
}
                                   /*0         1           2           3        4       5            6            7         8            9*/
void (*bluetooth_fun[64])(void) = {blu_stop,blu_right_5,blu_left_5,blu_move,blu_back,blu_right_90,blu_left_90,blu_round_180,blu_stop,blu_buttLED_off,
																	/*10                    11                  12             131415    16             17         18           19*/
                                   blu_buttLED_on,blu_left_any_angle,blu_right_any_angle,blu_stop,blu_stop,blu_stop,blu_display_smile,blu_stop,blu_display_close_eye,blu_display_right_bmp,
																  /*20                        21                         22              23        24        25      26                 27            28           29*/																	 
																	 blu_display_left_bmp,blu_display_tiaowen_bmp,blu_display_zebra_bmp,blu_stop,blu_stop,blu_stop,blu_display_RGB_LED,blu_right_45,blu_left_45,blu_display_nothing,
																	 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,blu_stop};
void blu_right_5(void)
{
	step_state1.step_num =0;				
	step_state1.Divi = bluetooth_state.proess_buf[3];
	step_state1.direction = motor_right;
	step_state1.count_left = count_5;
	step_state1.time_count = 0;	
}
void blu_left_5(void)
{
  step_state1.step_num =0;
  step_state1.Divi = bluetooth_state.proess_buf[3];
  step_state1.direction = motor_left;
  step_state1.count_right = count_5;
  step_state1.time_count = 0;	
}
void blu_move(void)
{
	step_state1.Divi = bluetooth_state.proess_buf[3];
	step_state1.direction = motor_start;
	step_state1.time_count = 0;
}
void blu_back(void)
{
	step_state1.Divi = bluetooth_state.proess_buf[3];
	step_state1.direction = motor_back;
	step_state1.time_count = 0;					
}
void blu_right_90(void)
{
	step_state1.step_num =0;				
	step_state1.Divi = bluetooth_state.proess_buf[3];
	step_state1.direction = motor_right;
	step_state1.count_left = count_90;
	step_state1.time_count = 0;	
}
void blu_left_90(void)
{
	step_state1.step_num =0;
	step_state1.Divi = bluetooth_state.proess_buf[3];
	step_state1.direction = motor_left;
	step_state1.count_right = count_90;
	step_state1.time_count = 0;	
}
void blu_round_180(void)
{
	step_state1.step_num =0;				
	step_state1.Divi = bluetooth_state.proess_buf[3];
	step_state1.direction = motor_right;
	step_state1.count_left = count_180;
	step_state1.time_count = 0;
}
void blu_stop(void)
{
	step_state1.direction=motor_idle;
}
void blu_buttLED_off(void)
{
  PORTK |=(1<<PK7);
}
void blu_buttLED_on(void)
{
  PORTK &=~(1<<PK7);
}
void blu_display_smile(void)
{
	matrix.clear();
	matrix.drawBitmap(0, 4, smile_bmp1, 8, 8, LED_ON);
	matrix.writeDisplay();
}
void blu_display_nosmile(void)
{
	matrix.clear();
	matrix.drawBitmap(0, 4, no_smile_bmp, 8, 8, LED_ON);
	matrix.writeDisplay(); 
}
void blu_display_close_eye(void)
{
	matrix.clear();
	matrix.drawBitmap(0, 4, close_eyes_bmp, 8, 8, LED_ON);
	matrix.writeDisplay();
}
void blu_display_right_bmp(void)
{
	matrix.clear();
	matrix.drawBitmap(0, 2, right_bmp, 8, 16, LED_ON);
	matrix.writeDisplay();
}
void blu_display_left_bmp(void)
{
	matrix.clear();
	matrix.drawBitmap(0, 2, left_bmp, 8, 16, LED_ON);
	matrix.writeDisplay(); 
}
void blu_display_tiaowen_bmp(void)
{
	matrix.clear();
	matrix.drawBitmap(0, 0, tiaowen_bmp, 8, 16, LED_ON);
	matrix.writeDisplay();
}
void blu_display_zebra_bmp(void)
{
	matrix.clear();
	matrix.drawBitmap(0, 0, zebra_bmp, 8, 16, LED_ON);
	matrix.writeDisplay(); 
}
void blu_display_RGB_LED(void)
{
	analogWrite(RedPin,bluetooth_state.proess_buf[3]);
	analogWrite(GreenPin,bluetooth_state.proess_buf[4]);
	analogWrite(BluePin,bluetooth_state.proess_buf[5]);
}
void blu_right_45(void)
{
	step_state1.step_num =0;				
	step_state1.Divi = bluetooth_state.proess_buf[3];
	step_state1.direction = motor_right;
	step_state1.count_left = count_45;
	step_state1.time_count = 0;	
}
void blu_left_45(void)
{
	step_state1.step_num =0;
	step_state1.Divi = bluetooth_state.proess_buf[3];
	step_state1.direction = motor_left;
	step_state1.count_right = count_45;
	step_state1.time_count = 0;		
}
void blu_display_nothing(void)
{
	matrix.clear();
	matrix.writeDisplay(); 			
}
void blu_left_any_angle(void)
{
  double angle = (2114/180)*bluetooth_state.proess_buf[4];
 	step_state1.step_num =0;
	step_state1.Divi = bluetooth_state.proess_buf[3];
	step_state1.direction = motor_left;
	step_state1.count_right = angle;
	step_state1.time_count = 0;		
}
void blu_right_any_angle(void)
{
	double angle = (2114/180)*bluetooth_state.proess_buf[4];
	step_state1.step_num =0;				
	step_state1.Divi = bluetooth_state.proess_buf[3];
	step_state1.direction = motor_right;
	step_state1.count_left = angle;
	step_state1.time_count = 0;	
}
void bluetooth_proess(void)//process data for bluetooth
{////use step_thread1()
	if(bluetooth_state.RX3_state == 1)
	{
		bluetooth_state.RX3_state = 0;
		if(bluetooth_state.proess_buf[2]<0xff)
		{
			bluetooth_fun[bluetooth_state.proess_buf[2]]();					
		}
	}
	memset(bluetooth_state.proess_buf,0,proess_count);	
	proess_count = 0;		
}
