#include "Config.h"

typedef enum  //定义一些按键值
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

Adafruit_max7219matrix matrix; //声明一个点阵对象
 
int speedS=800; //贪吃蛇的初始速度
int socre=0; //游戏起始得分
POINT food;  //食物坐标
POINT snakeHead; //蛇头的坐标
keyCode_t key;   //按键值变量

POINT snake[3] =  {0,2,1,2,2,2}; //由3个点组成的贪食蛇，并赋初值。

keyCode_t getKeycode(void);  //获取按键值
void RANDOM(void);           //随机食物坐标生成
void displayFood(void);      //闪烁显示食物
void gameover(void);         //显示游戏结束
 
void setup() {
   Serial.begin(9600); 
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
 
void loop() {
  key = getKeycode(); //获得键值
  Serial.println(key);
  
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
     RANDOM();
     speedS = speedS - 25; //根据得分加快蛇的速度
     if(speedS<=0)
       speedS = 0;
  }

 Serial.println(speedS);
 
 delay(speedS);
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
