/**************************************************************************
  Copyright (C), 2014- ,  申议实业
  File name:      Button.ino
  Author: jiangzhaohui      Version: v1.0      Date: 2014.10.8
  Description: 
	 按键测试
  History:  
                  
    1. Date: 2014.10.8       Author:
       Modification: 代码创建
    2. ...
****************************************************************************/

#include "Config.h"

typedef enum
{
  KEY_UP,   
  KEY_DOWN,   
  KEY_LEFT,
  KEY_RIGHT,
  KEY_MID,
  KEY_NONE
} keyCode_t;

 typedef struct{
	 int8_t x;
	 int8_t y;
 } POINT;

uint8_t i;
keyCode_t key;
uint8_t task;
long key_delay;

uint8_t onesPlace1, tensPlace1;
TM1637 digitalDis1;

OneWire MyOneWire1(PIN_TEMPERATURE);  //创建一个单总线对象
DallasTemperature MyTemp(&MyOneWire1); //创建一个DS18B20对象
long getTempTime1;
int temp1,temp2;

/*snake task*/
int speedS=800; //贪吃蛇的初始速度
int socre=0; //游戏起始得分
POINT food;  //食物坐标
POINT snakeHead; //蛇头的坐标
POINT snake[3] =  {0,2,1,2,2,2}; //由3个点组成的贪食蛇，并赋初值。

Adafruit_max7219matrix matrix; //声明一个点阵对象

uint8_t traffic_delay;

static const uint8_t __attribute__ ((progmem)) z[]={B01111110,B00000010,B00000100,B00001000,B00010000,B00100000,B01000000,B01111110};
static const uint8_t __attribute__ ((progmem)) arrow1[] = {0x18,0x3C,0x7E,0xFF,0x18,0x18,0x18,0x18};
static const uint8_t __attribute__ ((progmem)) arrow2[] = {0x08,0x0C,0x0E,0xFF,0xFF,0x0E,0x0C,0x08};


keyCode_t getKeycode(void);
void task_traffic_led(void);
void task_snake(void);
void task_temperature(void);
void task_ultrasoni(void);
void task_pot(void);
void task_infrared(void);

void RANDOM(void);           //随机食物坐标生成
void displayFood(void);      //闪烁显示食物
void gameover(void);         //显示游戏结束
void task_snake_init(void);

void task_traffic_init(void);

void setup()
{
   Serial.begin(9600);
  task = 1;
	//key init
  pinMode(PIN_BT_UP, INPUT);
  pinMode(PIN_BT_DOWN, INPUT);
  pinMode(PIN_BT_LEFT, INPUT);
  pinMode(PIN_BT_RIGHT, INPUT);
  pinMode(PIN_BT_MID , INPUT);
  
  delay(100);
  MyTemp.begin();    //温度传感器初始化
  MyTemp.requestTemperatures();
  temp1 = (int)MyTemp.getTempCByIndex(0); // 
  
  digitalDis1.set(3);
  digitalDis1.init(PIN_DIG_LED_CLK, PIN_DIG_LED_DIO);
  
  matrix.shutdown(0, false);  //指定max7219从待机模式进入正常工作模式
  matrix.clearDisplay(0);
  
  key_delay = millis();
  getTempTime1 = millis(); //温度采样时音间隔
  
  delay(100);
}

void loop() {
   Serial.println(task);
   digitalDis1.clearDisplay();
   
   matrix.clear();
   matrix.setCursor(0,0);
   matrix.print(task);
   matrix.setDisplay(0);
   delay(1000);
   switch(task){   
     case 1:     //
       task_traffic_led();						
       break;
     case 2:
       task_snake();
     break;
     case 3:
        task_temperature();
     break;
     case 4:
       task_ultrasoni();
     break;
     case 5:
      task_pot();
     break;
     case 6:
       task_infrared();
     break;
     default:
     break;
   }
   delay(100);
}

keyCode_t getKeycode(void)
{
  	if(!digitalRead(PIN_BT_UP))
            return KEY_UP;
	if(!digitalRead(PIN_BT_DOWN))
	    return KEY_DOWN;
	if(!digitalRead(PIN_BT_LEFT))
	    return KEY_LEFT;
	if(!digitalRead(PIN_BT_RIGHT))
            return KEY_RIGHT;
	if(!digitalRead(PIN_BT_MID))
	    return KEY_MID;
        return KEY_NONE;
}

void task_traffic_led(void)
{ 
  /*init something*/
  boolean go_out = true;
  task_traffic_init();

  /* task loop, if key middle pressed,end the task.*/
  while(go_out)
  {   
     matrix.clear();
     traffic_delay = 9;
     digitalDis1.display(0, traffic_delay);
     matrix.drawBitmap(0,0,arrow1,8,8,1);
     matrix.setDisplay(0);
     while(traffic_delay){ 
        delay(1000);
        traffic_delay--;
        digitalDis1.display(0, traffic_delay);
        if(traffic_delay<4){
          digitalWrite(PIN_NORTH_LED_G, LOW);
          digitalWrite(PIN_SOUTH_LED_G, LOW);
          digitalWrite(PIN_NORTH_LED_Y, HIGH);
          digitalWrite(PIN_SOUTH_LED_Y, HIGH);
          digitalWrite(PIN_WEST_LED_R, LOW);
          digitalWrite(PIN_EAST_LED_R, LOW);
          digitalWrite(PIN_WEST_LED_Y, HIGH);
          digitalWrite(PIN_EAST_LED_Y, HIGH);
           matrix.clear();
           matrix.setDisplay(0);
           delay(70);
           matrix.drawBitmap(0,0,arrow1,8,8,1);
           matrix.setDisplay(0);
           digitalWrite(PIN_WEST_LED_Y, LOW);
           digitalWrite(PIN_EAST_LED_Y, LOW);
           digitalWrite(PIN_NORTH_LED_Y, LOW);
           digitalWrite(PIN_SOUTH_LED_Y, LOW);
           delay(00);
        }
     }
     digitalWrite(PIN_NORTH_LED_R, HIGH);
     digitalWrite(PIN_SOUTH_LED_R, HIGH);
     digitalWrite(PIN_WEST_LED_G, HIGH);
     digitalWrite(PIN_EAST_LED_G, HIGH);
     digitalWrite(PIN_WEST_LED_Y, LOW);
     digitalWrite(PIN_EAST_LED_Y, LOW);
     digitalWrite(PIN_NORTH_LED_Y, LOW);
     digitalWrite(PIN_SOUTH_LED_Y, LOW);
     matrix.clear();
     traffic_delay = 9;
     digitalDis1.display(0, traffic_delay);
     matrix.drawBitmap(0,0,arrow2,8,8,1);
     matrix.setDisplay(0);
     while(traffic_delay){ 
        delay(1000);
        traffic_delay--;
        digitalDis1.display(0, traffic_delay);
        if(traffic_delay<4){
          digitalWrite(PIN_NORTH_LED_R, LOW);
          digitalWrite(PIN_SOUTH_LED_R, LOW);
          digitalWrite(PIN_NORTH_LED_Y, HIGH);
          digitalWrite(PIN_SOUTH_LED_Y, HIGH);
          digitalWrite(PIN_WEST_LED_G, LOW);
          digitalWrite(PIN_EAST_LED_G, LOW);
          digitalWrite(PIN_WEST_LED_Y, HIGH);
          digitalWrite(PIN_EAST_LED_Y, HIGH);
           matrix.clear();
           matrix.setDisplay(0);
           delay(70);
           matrix.drawBitmap(0,0,arrow2,8,8,1);
           matrix.setDisplay(0);
           digitalWrite(PIN_WEST_LED_Y, LOW);
           digitalWrite(PIN_EAST_LED_Y, LOW);
           digitalWrite(PIN_NORTH_LED_Y, LOW);
           digitalWrite(PIN_SOUTH_LED_Y, LOW);
           delay(00);
        }
     }
     digitalWrite(PIN_NORTH_LED_G, HIGH);
     digitalWrite(PIN_SOUTH_LED_G, HIGH);
     digitalWrite(PIN_NORTH_LED_Y, LOW);
     digitalWrite(PIN_SOUTH_LED_Y, LOW);
     digitalWrite(PIN_WEST_LED_R, HIGH);
     digitalWrite(PIN_EAST_LED_R, HIGH);
     digitalWrite(PIN_WEST_LED_Y, LOW);
     digitalWrite(PIN_EAST_LED_Y, LOW);     
     
     key = getKeycode();    
     if(key == KEY_MID)
     {
       delay(1000);
       key = getKeycode();
       if(key == KEY_MID)
       {
         task++;
         task = task % 7;
         go_out = false;
         digitalWrite(PIN_NORTH_LED_R, LOW);
         digitalWrite(PIN_NORTH_LED_Y, LOW);
         digitalWrite(PIN_NORTH_LED_G, LOW);
         digitalWrite(PIN_SOUTH_LED_R, LOW);
         digitalWrite(PIN_SOUTH_LED_Y, LOW);
         digitalWrite(PIN_SOUTH_LED_G, LOW);
         digitalWrite(PIN_WEST_LED_R, LOW);
         digitalWrite(PIN_WEST_LED_Y, LOW);
         digitalWrite(PIN_WEST_LED_G, LOW);
         digitalWrite(PIN_EAST_LED_R, LOW);
         digitalWrite(PIN_EAST_LED_Y, LOW);
         digitalWrite(PIN_EAST_LED_G, LOW);
       }
     }
  }
}

void task_snake(void)
{ 
  /*init something*/
  byte onesPlace, tensPlace;
  boolean go_out = true;
  task_snake_init();

  /* task loop, if key middle pressed,end the task.*/
  while(go_out)
  {    
      key = getKeycode(); //获得键值
      matrix.clear();
  
     switch(key){
	  case KEY_UP: //上移
		snake[0].x = snake[1].x; snake[0].y = snake[1].y; snake[1].x = snake[2].x; snake[1].y = snake[2].y; snake[2].y = snake[2].y - 1;
	  break;
	  case KEY_DOWN: //下移
		snake[0].x = snake[1].x; snake[0].y = snake[1].y; snake[1].x = snake[2].x; snake[1].y = snake[2].y; snake[2].y = snake[2].y + 1;	  
	  break;
	  case KEY_LEFT: //左移
		snake[0].x = snake[1].x; snake[0].y = snake[1].y; snake[1].x = snake[2].x; snake[1].y = snake[2].y; snake[2].x = snake[2].x - 1;	  
	  break;
	  case KEY_RIGHT: //右移
		snake[0].x = snake[1].x; snake[0].y = snake[1].y; snake[1].x = snake[2].x; snake[1].y = snake[2].y; snake[2].x = snake[2].x + 1;	  
	  break;
	  default:
	  break;
      }  
     key = KEY_NONE;
   
     //根据按键来移动蛇的身体
    for(int i=0;i<3;i++)
    { 
       matrix.drawPixel(snake[i].x, snake[i].y, 1);
    }
    matrix.setDisplay(0);
  
    displayFood(); //显示食物
  
    //判断是否超出边框，超出就跳转到GameOver
    snakeHead.x = snake[2].x; //获取蛇头的坐标
    snakeHead.y = snake[2].y; 
    if((snakeHead.x < 0) || (snakeHead.x > 7) || (snakeHead.y < 0) || (snakeHead.y > 7))
        gameover();
  
    //判断是否吃到了食物~吃到了就会加分和重新随机生成食物~
    if((snakeHead.x == food.x) && (snakeHead.y == food.y)){
        socre=socre+1;
    onesPlace = socre%10;
    tensPlace = socre/10;
    digitalDis1.display(0, onesPlace);
    digitalDis1.display(1, tensPlace);
       RANDOM();
       speedS = speedS - 25; //根据得分加快蛇的速度
       if(speedS<=0)
       speedS = 0;
    }
    Serial.println(speedS);
    delay(speedS);
 
     key = getKeycode();    
     if(key == KEY_MID)
     {
       delay(1000);
       key = getKeycode();
       if(key == KEY_MID)
       {
         task++;
         task = task % 7;
         go_out = false;
       }
     }
  }
}

void task_temperature(void)
{ 
  /*init something*/
  boolean go_out = true;
  MBMotor motor1;
  
  /* task loop, if key middle pressed,end the task.*/
  while(go_out)
  {      
     if((millis() - getTempTime1)> 750)
     {
	 MyTemp.requestTemperatures();
	 getTempTime1 = millis();
     }
    temp2 = (int)MyTemp.getTempCByIndex(0); //显示温度值
    onesPlace1 = temp2%10;
    tensPlace1 = temp2/10;
    digitalDis1.display(0, onesPlace1);
    digitalDis1.display(1, tensPlace1);
    if(temp2 >= 30)
    {
        motor1.MotorDriver(PIN_MOTOR_DIR, PIN_MOTOR_PWM, 255);
     }
     else{
        motor1.MotorDriver(PIN_MOTOR_DIR, PIN_MOTOR_PWM, 0);
     }
     
     key = getKeycode();
     if(key == KEY_MID)
     {
       delay(1000);
       key = getKeycode();
       if(key == KEY_MID)
       {
         task++;
         task = task % 7;
         go_out = false;
         motor1.MotorDriver(PIN_MOTOR_DIR, PIN_MOTOR_PWM, 0);
       }
     }
  }
}

void task_ultrasoni(void)
{ 
  /*init something*/
  boolean go_out = true;  
  uint16_t distanceVal1; 
  servopulse(PIN_SERVO, 0);

  /* task loop, if key middle pressed,end the task.*/
  while(go_out)
  {  
     distanceVal1 = distanceCm(PIN_TRIG, PIN_ECHO);
     distanceVal1 = distanceVal1>18? 18:distanceVal1;
     servopulse(PIN_SERVO, distanceVal1*20);
     key = getKeycode();    
     if(key == KEY_MID)
     {
       delay(1000);
       key = getKeycode();
       if(key == KEY_MID)
       {
         task++;
         task = task % 7;
         go_out = false;
       }
     }
  }
}

void task_pot(void)
{ 
  /*init something*/
  boolean go_out = true;
  
  uint8_t potVal;
  
  /* task loop, if key middle pressed,end the task.*/
  while(go_out)
  {   
       potVal = map(analogRead(PIN_POT),0 ,1023, 0, 110);
       if(potVal < 50){
           analogWrite(PIN_LED_R, potVal);       //红灯由暗变亮
           analogWrite(PIN_LED_G, 50-potVal);   //绿灯由亮变暗
       }
       else{
	   analogWrite(PIN_LED_R, 100-potVal);   //红灯由亮变暗
	   analogWrite(PIN_LED_B, potVal-50);   //蓝灯由暗变亮
      }
    
     key = getKeycode();    
     if(key == KEY_MID)
     {
       delay(1000);
       key = getKeycode();
       if(key == KEY_MID)
       {
         task++;
         task = task % 7;
         go_out = false;
         analogWrite(PIN_LED_R, 0);   
	 analogWrite(PIN_LED_B, 0);
         analogWrite(PIN_LED_G, 0);
       }
     }
  }
}

void task_infrared(void)
{ 
  /*init something*/
  boolean go_out = true;
  uint8_t infraredVal;
  infraredVal = 0;
   //init buzzer pin
  pinMode(PIN_BUZZER, OUTPUT);
  //init human infrared
  pinMode(PIN_HUMAN_INFRARED, INPUT);
  digitalWrite(PIN_BUZZER, 0);

  /* task loop, if key middle pressed,end the task.*/
  while(go_out)
  {    
      infraredVal = digitalRead(PIN_HUMAN_INFRARED);
      if(infraredVal == 1){
          digitalWrite(PIN_BUZZER, 1);
          delay(2000);
          digitalWrite(PIN_BUZZER, 0);
      }
          
     key = getKeycode();    
     if(key == KEY_MID)
     {
       delay(1000);
       key = getKeycode();
       if(key == KEY_MID)
       {
         task++;
         task = task % 7;
         if(task==0)
           task += 1;
         go_out = false;
       }
     }
  }
}

void task_snake_init(void)
{
   pinMode(PIN_BT_UP, INPUT);   
   pinMode(PIN_BT_DOWN, INPUT);
   pinMode(PIN_BT_LEFT, INPUT);
   pinMode(PIN_BT_RIGHT, INPUT);
   pinMode(PIN_BT_MID , INPUT);
   RANDOM(); //获取一个随机食物坐标

   matrix.shutdown(0, false);  //指定max7219从待机模式进入正常工作模式
   matrix.clear();  //屏幕清屏
 
   //matrix.setTextSize(2); //设置字体大小
   matrix.setDisplay(0);
   delay(1000);
 
   matrix.setTextWrap(false);  //设置字体平滑模式
   matrix.setTextSize(1); //设置字体大小
 
  //循环绘制文字，获得滚动效果
   for (int8_t x=7; x>=-59; x--) {
      matrix.clear();
      matrix.setCursor(x,0);
      matrix.print("READY! GO");
      matrix.setDisplay(0);
      delay(70);
   }
   
   //画蛇
   matrix.clear(); 
   for(int i=0;i<3;i++){
      matrix.drawPixel(snake[i].x, snake[i].y, 1);
   }
   matrix.setDisplay(0);
   delay(400);
}

//随机食物坐标获取函数 
void RANDOM(void)  //产生随机坐标，坐标范围0-7，因为是8*8的点阵
{ 
   food.x = random(0, 7); 
   food.y = random(0, 7);
}

void displayFood(void){
     matrix.drawPixel(food.x, food.y, 1);
     matrix.setDisplay(0);
     delay(50);
     matrix.drawPixel(food.x, food.y, 0);
     matrix.setDisplay(0);
     delay(50);
}
//操作失败，游戏结束
void gameover(void)
{
   for (int8_t x=7; x>=-125; x--) { //显示游戏结束
      matrix.clear();
      matrix.setCursor(x,0);
      matrix.print("GAME OVER!");
      matrix.setDisplay(0);
      delay(50);
   }
 
   for (int8_t x=7; x>=-39; x--) { //显示得分
      matrix.clear();
      matrix.setCursor(x,0);
      matrix.print(socre);
      matrix.setDisplay(0);
      delay(50);
   }
   
   speedS=800; //贪吃蛇的初始速度
   socre=0; //游戏起始得分
   RANDOM(); //获取一个随机食物坐标
   snake[0].x = 1; snake[0].y = 4;
   snake[1].x = 2; snake[1].y = 4;
   snake[2].x = 3; snake[2].y = 4; 
}

void task_traffic_init(void){
  	//init traffic led
    pinMode(PIN_NORTH_LED_R, OUTPUT);
    pinMode(PIN_NORTH_LED_Y, OUTPUT);
    pinMode(PIN_NORTH_LED_G, OUTPUT);
    pinMode(PIN_SOUTH_LED_R, OUTPUT);
    pinMode(PIN_SOUTH_LED_Y, OUTPUT);
    pinMode(PIN_SOUTH_LED_G, OUTPUT);
    pinMode(PIN_WEST_LED_R, OUTPUT);
    pinMode(PIN_WEST_LED_Y, OUTPUT);
    pinMode(PIN_WEST_LED_G, OUTPUT);
    pinMode(PIN_EAST_LED_R, OUTPUT);
    pinMode(PIN_EAST_LED_Y, OUTPUT);
    pinMode(PIN_EAST_LED_G, OUTPUT);
    digitalWrite(PIN_NORTH_LED_R, LOW);
    digitalWrite(PIN_NORTH_LED_Y, LOW);
    digitalWrite(PIN_NORTH_LED_G, HIGH);
    digitalWrite(PIN_SOUTH_LED_R, LOW);
    digitalWrite(PIN_SOUTH_LED_Y, LOW);
    digitalWrite(PIN_SOUTH_LED_G, HIGH);
    digitalWrite(PIN_WEST_LED_R, HIGH);
    digitalWrite(PIN_WEST_LED_Y, LOW);
    digitalWrite(PIN_WEST_LED_G, LOW);
    digitalWrite(PIN_EAST_LED_R, HIGH);
    digitalWrite(PIN_EAST_LED_Y, LOW);
    digitalWrite(PIN_EAST_LED_G, LOW);
        
}
