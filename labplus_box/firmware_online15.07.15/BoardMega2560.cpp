/**************************************************************************
  Copyright (C), 2014- ,  申议实业
  File name:      BoardMega2560.cpp
  Author: jiangzhaohui      Version: v1.0      Date: 2014.10.8
  Description: 主控板类成员定义
  Others:         
  Function List:  
    1. 
	2. 
  History:  
                  
    1. Date: 2014.10.8       Author:
       Modification: 代码创建
    2. ...
****************************************************************************/
#include "Config.h"

#define DEVICE_NUMBERS 12

extern volatile char timer2IntCount;
extern volatile boolean updateSensorVars;
extern int8_t IrVal;
long weightOffset;

RGBLed colorLed;
HumidityDHT11 dht11(PIN_HUMIDITY);
MBMotor motor;
TM1637 digitalDis;
HX711 Weight_hx711(PIN_WEIGHT_DIO, PIN_WEIGHT_CLK); //声明一个称重传感器实例。
OneWire MyOneWire(PIN_TEMPERATURE);  //创建一个单总线对象
DallasTemperature MySensors(&MyOneWire); //创建一个DS18B20对象
unsigned long getTempTime, getDistanceTime, getWeightTime, getHumidityTime;
long  weightVal, distanceVal;
LedControl MatrixLed(PIN_MATRIX_LED_DIN, PIN_MATRIX_LED_CLK, PIN_MATRIX_LED_CS,NumDevices_max7219); //创建一个LED点阵对象

/*以下两个数组定义LED点阵上显示的图形、数字、字母 */
//const static byte char_pic[8] = {0x00,0x66,0x99,0x81,0x81,0x42,0x24,0x18};  //显示桃心
/*字符数组*/
const static byte mychar[296] = {0x30,0x48,0x48,0x48,0x48,0x48,0x30,0x00, /* 0 */
                                 0x20,0x60,0x20,0x20,0x20,0x20,0x70,0x00, /* 1 */
                                 0x30,0x48,0x08,0x10,0x20,0x40,0x78,0x00, /* 2 */
                                 0x30,0x48,0x08,0x30,0x08,0x48,0x30,0x00, /* 3 */
                                 0x10,0x30,0x30,0x50,0x50,0x78,0x10,0x00, /* 4 */
                                 0x78,0x40,0x40,0x70,0x08,0x08,0x70,0x00, /* 5 */
                                 0x30,0x48,0x40,0x70,0x48,0x48,0x30,0x00, /* 6 */
                                 0x78,0x48,0x08,0x10,0x20,0x20,0x20,0x00, /* 7 */
                                 0x30,0x48,0x48,0x30,0x48,0x48,0x30,0x00, /* 8 */
                                 0x30,0x48,0x48,0x38,0x08,0x48,0x30,0x00, /* 9 */
                                 0x30,0x48,0x48,0x48,0x78,0x48,0x48,0x00, /* A */
                                 0x70,0x48,0x48,0x70,0x48,0x48,0x70,0x00, /* B */
                                 0x30,0x48,0x40,0x40,0x40,0x48,0x30,0x00, /* C */
                                 0x70,0x48,0x48,0x48,0x48,0x48,0x70,0x00, /* D */
                                 0x78,0x40,0x40,0x70,0x40,0x40,0x78,0x00, /* E */
                                 0x78,0x40,0x40,0x70,0x40,0x40,0x40,0x00, /* F */
                                 0x30,0x48,0x40,0x58,0x48,0x48,0x30,0x00, /* G */
                                 0x48,0x48,0x48,0x78,0x48,0x48,0x48,0x00, /* H */
                                 0x70,0x20,0x20,0x20,0x20,0x20,0x70,0x00, /* I */
                                 0x08,0x08,0x08,0x08,0x48,0x48,0x30,0x00, /* J */
                                 0x48,0x48,0x50,0x60,0x50,0x48,0x48,0x00, /* K */
                                 0x40,0x40,0x40,0x40,0x40,0x40,0x78,0x00, /* L */
                                 0x48,0x78,0x78,0x48,0x48,0x48,0x48,0x00, /* M */
                                 0x48,0x68,0x68,0x58,0x58,0x48,0x48,0x00, /* N */
                                 0x78,0x48,0x48,0x48,0x48,0x48,0x78,0x00, /* O */
                                 0x70,0x48,0x48,0x70,0x40,0x40,0x40,0x00, /* P */
                                 0x30,0x48,0x48,0x48,0x68,0x58,0x38,0x00, /* Q */
                                 0x70,0x48,0x48,0x70,0x60,0x50,0x48,0x00, /* R */
                                 0x30,0x48,0x40,0x30,0x08,0x48,0x30,0x00, /* S */
                                 0x78,0x20,0x20,0x20,0x20,0x20,0x20,0x00, /* T */
                                 0x48,0x48,0x48,0x48,0x48,0x48,0x30,0x00, /* U */
                                 0x48,0x48,0x48,0x48,0x30,0x30,0x30,0x00, /* V */
                                 0x48,0x48,0x48,0x48,0x78,0x78,0x48,0x00, /* W */
                                 0x48,0x48,0x30,0x30,0x30,0x48,0x48,0x00, /* X */
                                 0x88,0x88,0x50,0x20,0x20,0x20,0x20,0x00, /* Y */
                                 0x78,0x08,0x10,0x30,0x20,0x40,0x78,0x00,  /* Z */
								 0x00,0x66,0x99,0x81,0x81,0x42,0x24,0x18};  //显示桃心

//extern byte direction1, direction2;
//extern int motor1Speed, motor2Speed;
//PortDevice PTDevice[11] = { 0 }; 
					
/***************************************************************************
  Function:       BoardMega2560()
  Description:    构造函数
  Calls:          
  Called By:      
  Input:          
                 
  Output:         
  Return:         
  Others:        
***************************************************************************/
BoardMega2560::BoardMega2560()
{

}

/***************************************************************************
  Function:       bspInit()
  Description:    主控板初始化
  Calls:          
  Called By:      
  Input:          
                 
  Output:         
  Return:         
  Others:        
***************************************************************************/
void BoardMega2560::bspInit(void)
{

	protocolData = false;
//	PortDevice PTDevice[11] = { 0 };
//	deviceNums = 0;
    uint8_t i;
	weightOffset = 0;  //自动实现称重清0
	
	for(i=0; i<8; i++)
		dataVal1.byteVal[i] = EEPROM.read(i); //从EEPROM中读出称重修正系数
	Weight_hx711.set_co(dataVal1.doubleVal); 
    for(i=0; i<5;i++)
	{
		weightOffset = weightOffset + Weight_hx711.read();
		delay(5);
	}
	weightOffset = (long)(weightOffset/5);
	Weight_hx711.set_offset(weightOffset);  //给称重传感器偏移值赋值
	
	MySensors.begin();    //温度传感器初始化
	digitalDis.set(3);
	digitalDis.init(PIN_DIG_LED_CLK, PIN_DIG_LED_DIO);
	
	pinMode(PIN_HUMAN_INFRARED, INPUT); //人体红外感应引脚初始化
	//init RGB LED pin
	pinMode(PIN_LED_R, OUTPUT);
	pinMode(PIN_LED_G, OUTPUT);
	pinMode(PIN_LED_B, OUTPUT);
	//key init
	pinMode(PIN_BT_UP, INPUT);
	pinMode(PIN_BT_DOWN, INPUT);
	pinMode(PIN_BT_LEFT, INPUT);
	pinMode(PIN_BT_RIGHT, INPUT);
	pinMode(PIN_BT_MID , INPUT);
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
	
	//init buzzer pin
	pinMode(PIN_BUZZER, OUTPUT);
	//init human infrared
	pinMode(PIN_HUMAN_INFRARED, INPUT);
	//init infrared key
	IrVal = 0;
	
	weightVal = 0;
	distanceVal = 0;
	servopulse(PIN_SERVO, 0);
	
	lastDataReceivedTime = millis(); //最后一次数据接收时间，此数值用来控制串口接收超时
	getTempTime = millis(); //温度采样时音间隔
	getDistanceTime =  millis();
	getWeightTime =  millis();
	getHumidityTime = millis();
}

/***************************************************************************
  Function:       readSerialPort()
  Description:    从串口读上位机数据并处理
	1.本函数在主循环中用来读串口数据，实际上是读串口环形缓冲的数据，如果在一定的时间间隔缓冲无数据则执行超时复位。
	  串口缓冲中的数据是在串口中断中送入的。详见arduino内核源码中串口代码，在HardwareSerial.c中。
	2.读到包头后，本函数会继续一直读下去，直到把一个协议包数据读完，并处理完毕。
	3.通过超时设置保障动作机构在通信中断时复位，避免失控。
  Calls:          
  Called By:      
  Input:          
                 
  Output:         
  Return:         
  Others:        
***************************************************************************/		
void BoardMega2560::readSerialPort(void)
{
	int pin, sensorHighByte;
	byte i, inByte, command, port, device, portPin;
	byte onesPlace, tensPlace;
	weightOffset = 0;  //自动实现称重清0
    double sum1, sum2;
	
	lastDataReceivedTime = millis(); //记录当前时间戳,用作超时判断。

	if (Serial.available()) //判断缓冲区中是否有数据
	{
		inByte = Serial.read();
		if(inByte == 0xAA){
			while (!Serial.available()); 				
			if(Serial.read() == 0x55){
				while (!Serial.available());
				inByte = Serial.read(); //数据包长
				while (!Serial.available());
				command = Serial.read(); //指令码
				switch(command){
					/*case 0x01: //设置指令
						inByte = (inByte-1)/2;
						deviceNums = inByte;  //记录挂接的设备数
						for(i=0; i<inByte; i++) //把上位机发过来的外设及位置保存
						{
							while (!Serial.available());
							PTDevice[i].port = Serial.read();
							while (!Serial.available());
							PTDevice[i].device = Serial.read();
						}
						while (!Serial.available());
						inByte = Serial.read(); //读校验位
						//必要时这里加入较验码！！！！！！！！！！！！！！！！！！！！！！！！！
					    
					break; */
					case 0x02: //动作指令
					//	inByte = (inByte-1)/5;
					//	for(i=0; i<inByte; i++) //把上位机发过来的外设及位置保存
					//	{
							//while (!Serial.available());
							//port = Serial.read(); //端口号
							while (!Serial.available());
							device = Serial.read(); //设备号
							while (!Serial.available());
							dataVal.byteVal[0]=Serial.read();  //读入数据值
							while (!Serial.available());
							dataVal.byteVal[1]=Serial.read(); 
							while (!Serial.available());
							dataVal.byteVal[2]=Serial.read(); 
							while (!Serial.available());
							dataVal.byteVal[3]=Serial.read(); 
							switch(device){
								case RGBLED: //8 三色LED灯
									analogWrite(PIN_LED_R, dataVal.byteVal[0]);
									analogWrite(PIN_LED_G, dataVal.byteVal[1]);
									analogWrite(PIN_LED_B, dataVal.byteVal[2]);
								break;
								case SEVSEG: //9 数码管			
									if(dataVal.longVal == -1)
										digitalDis.clearDisplay();
									else{
										onesPlace = dataVal.byteVal[0]%10;
										tensPlace = dataVal.byteVal[0]/10;
										digitalDis.display(0, onesPlace);
										digitalDis.display(1, tensPlace);
									}
								break;
								case MOTOR: //10 DC马达
									motor.MotorDriver(PIN_MOTOR_DIR, PIN_MOTOR_PWM, dataVal.longVal);
								break;
								case SERVO: //11 伺服（舵机）
									servopulse(PIN_SERVO, (int)dataVal.longVal);
								break;							
								case TRAFFIC_LED: //25 交通灯
									switch(dataVal.byteVal[0]){
										case 1: //北灯
											digitalWrite(PIN_NORTH_LED_R, dataVal.byteVal[1]);
											digitalWrite(PIN_NORTH_LED_Y, dataVal.byteVal[2]);
											digitalWrite(PIN_NORTH_LED_G, dataVal.byteVal[3]);
										break;
										case 2:   //南灯
											digitalWrite(PIN_SOUTH_LED_R, dataVal.byteVal[1]);
											digitalWrite(PIN_SOUTH_LED_Y, dataVal.byteVal[2]);
											digitalWrite(PIN_SOUTH_LED_G, dataVal.byteVal[3]);
										break;
										case 3:  //西灯
											digitalWrite(PIN_WEST_LED_R, dataVal.byteVal[1]);
											digitalWrite(PIN_WEST_LED_Y, dataVal.byteVal[2]);
											digitalWrite(PIN_WEST_LED_G, dataVal.byteVal[3]);
										break;
										case 4: //东灯
											digitalWrite(PIN_EAST_LED_R, dataVal.byteVal[1]);
											digitalWrite(PIN_EAST_LED_Y, dataVal.byteVal[2]);
											digitalWrite(PIN_EAST_LED_G, dataVal.byteVal[3]);
										break;
										default: //否则关闭所有的LED
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
								break; 
								case BUZZER: //26 蜂鸣器  工作代码放在loop循环中
									if(dataVal.byteVal[0] == 1)
										digitalWrite(PIN_BUZZER, 1);
									else
										digitalWrite(PIN_BUZZER, 0);
								break;
								case MATRIX_LED: //19 LED点阵
									MatrixLed.shutdown(0, false);  //指定max7219从待机模式进入正常工作模式
									if(dataVal.longVal == -1)
										MatrixLed.clearDisplay(0);
									else{
										for(i=0; i<37; i++){
											MatrixLed.setRow(0, i, mychar[dataVal.byteVal[0]*8+i]);  //从数组中取数据显示
										}
									}
								break;
								case WEIGHT_CALLIBRATION: //255 调整称重传感器修正系数 指令码：aa 55 06 02 ff 00 00 00 00 00
									sum1 = 0;
									sum2 = 0;
									weightOffset = 0;
								    /*1. 亮北红灯，等待100g法码放上去，法码放上，稳定一段时间后，按UP键 */
                                    digitalWrite(PIN_NORTH_LED_R, HIGH);    
									while(digitalRead(PIN_BT_UP));
									for (i = 0; i < 10; i++){ // 放100g法码。
										sum1 += Weight_hx711.read(); 
										delay(200);
									} 
									sum1 = sum1/10;
									 /*2. 100g法码采样结束，亮北黄灯，等待200g法码放上去，法码放上，稳定一段时间后，按DOWN键 */
									digitalWrite(PIN_NORTH_LED_Y, HIGH);
									digitalWrite(PIN_NORTH_LED_R, LOW);
									while(digitalRead(PIN_BT_DOWN));
									for (i = 0; i < 10; i++){ // 放200g法码。
										sum2 += Weight_hx711.read(); 
										delay(200);
									}										
									sum2 = sum2/10;
									dataVal1.doubleVal = 100/(sum2 -sum1); //计算修正系数
									Serial.println(dataVal1.doubleVal);
									Weight_hx711.set_co(dataVal1.doubleVal);
									for(i=0; i<8; i++)
										EEPROM.write(i, dataVal1.byteVal[i]); //保存修正系数
									 /*3. 200g法码采样结束，亮北绿灯，等待移去所有法码，以计算偏移值，计算完成后亮南红灯，称重传感器校正结束*/
									digitalWrite(PIN_NORTH_LED_G, HIGH);
									digitalWrite(PIN_NORTH_LED_Y, LOW);
									while(digitalRead(PIN_BT_LEFT));
									for(i=0; i<5;i++)
									{
										weightOffset = weightOffset + Weight_hx711.read();
										delay(200);
									}
									weightOffset = (long)(weightOffset/5);
									
									Weight_hx711.set_offset(weightOffset);  //给称重传感器偏移值赋值
									digitalWrite(PIN_SOUTH_LED_R, HIGH);
									digitalWrite(PIN_NORTH_LED_G, LOW);
								break;
							//	default:
							}
					//	}
						while (!Serial.available());
						inByte = Serial.read(); //读校验位
						//必要时这里加入较验码！！！！！！！！！！！！！！！！！！！！！！！！！
					break;
					case 0x04: //reset
						bspInit(); 
					break;
					case 0x05: //start
				
					break; 
					//default:
				}	
			 
			}
		}
	}
	else{  //超时则复位，这时的超时设定是假定上位机发送数据的时间间隔不会超过1s, 无线连接时需要这个。
		if (millis() - lastDataReceivedTime > 1000) 
	    reset(); //超时时间为1秒
	}	
}

/***************************************************************************
  Function:    writeSerialPort()
  Description: 向上位机发送传感器数据
			   
  Calls:          
  Called By:      
  Input:          
                 
  Output:         
  Return:         
  Others:        
***************************************************************************/ 		
void BoardMega2560::writeSerialPort(void)
{
	byte i, command, port, portPin;
	long sensorData, dataSum;
	double sum;
	byte sendBuffer[65] = {0};
	byte key[5] = {0};
	
	//if(deviceNums > 0){ //挂了外设才执行传感器数据上传
	  sendBuffer[0] = 0xAA;
	  sendBuffer[1] = 0x55;
	  sendBuffer[2] = DEVICE_NUMBERS*5 + 1; //数据段字节数，一个设备5个字节+一个命令字节
	  sendBuffer[3] = 0x03;
	/*按顺序获取传感器数据并存入缓冲区	*/
	//超声波传感器 值范围: 0-1023
	  sendBuffer[4] = ULTRASONIC_SENSOR;
	  if((millis() - getDistanceTime)> 500)
	  {
		distanceVal = (long)(distanceCm(PIN_TRIG, PIN_ECHO)*1.3018);  
		getDistanceTime = millis();
	  }
	  sendDataVal.longVal =	distanceVal;  
	  sendBuffer[5] = sendDataVal.byteVal[0];
	  sendBuffer[6] = sendDataVal.byteVal[1];
	  sendBuffer[7] = sendDataVal.byteVal[2];
	  sendBuffer[8] = sendDataVal.byteVal[3];    
	//声音传感器 值范围: 0-1023
	  sendBuffer[9] = SOUND_SENSOR;
	  sendDataVal.longVal = loudness(PIN_SOUND);
	  sendBuffer[10] = sendDataVal.byteVal[0];
	  sendBuffer[11] = sendDataVal.byteVal[1];
	  sendBuffer[12] = sendDataVal.byteVal[2];
	  sendBuffer[13] = sendDataVal.byteVal[3];
	  //温度传感器,值范围－55℃～+125℃
	  sendBuffer[14] = TEMPERATURE_SENSOR;
	  if((millis() - getTempTime)> 94)
	  {
		MySensors.requestTemperatures();
		getTempTime = millis();
	  }
	  sendDataVal.longVal = (long)(MySensors.getTempCByIndex(0)+0.5); //显示温度值
	  sendBuffer[15] = sendDataVal.byteVal[0];
	  sendBuffer[16] = sendDataVal.byteVal[1];
	  sendBuffer[17] = sendDataVal.byteVal[2];
	  sendBuffer[18] = sendDataVal.byteVal[3];  
	//湿度传感器 值范围0-100
	  sendBuffer[19] = HUMIDITY;
	  if((millis() - getHumidityTime)> 300)
	  {
		dht11.read11();
		getHumidityTime = millis();
	  }
	  sendBuffer[20] = (byte)dht11.humidity;
	//光线传感器 值范围0-1023
	  sendBuffer[24] = LIGHT_SENSOR;	
	  sendDataVal.longVal = lightVal(PIN_LIGHT);
	  sendBuffer[25] = sendDataVal.byteVal[0];
	  sendBuffer[26] = sendDataVal.byteVal[1];
	  sendBuffer[27] = sendDataVal.byteVal[2];
	  sendBuffer[28] = sendDataVal.byteVal[3];	  
	//按键
	  sendBuffer[29] = BUTTON;
	  key[0] = digitalRead(PIN_BT_UP);
	  key[1] = digitalRead(PIN_BT_DOWN);
	  key[2] = digitalRead(PIN_BT_LEFT);
	  key[3] = digitalRead(PIN_BT_RIGHT);
	  key[4] = digitalRead(PIN_BT_MID);
	  for(i = 0; i<5; i++)
	  {
		  if(key[i] == LOW)
		  {
			  sendBuffer[30] = i+1;
		  }
	  }   
	//直滑电位器 值范围 0-1023
	  sendBuffer[34] = POTENTIONMETER;
	  sendDataVal.longVal = map(analogRead(PIN_POT),0 ,1023, 0, 110);
	  sendBuffer[35] = sendDataVal.byteVal[0];
	  sendBuffer[36] = sendDataVal.byteVal[1];
	  sendBuffer[37] = sendDataVal.byteVal[2];
	  sendBuffer[38] = sendDataVal.byteVal[3];
	//红外遥控接收
	  sendBuffer[39] = INFRARED;
	  sendBuffer[40] = IrVal;
	//称重传感器
	  sendBuffer[44] = WEIGHT;
	  if((millis() - getWeightTime)> 750)
	  {
		weightVal =  Weight_hx711.bias_read();
	    weightVal = weightVal<0? 0: weightVal;
		getWeightTime = millis();
	  }	  
	  sendDataVal.longVal = weightVal;
	  sendBuffer[45] = sendDataVal.byteVal[0];
	  sendBuffer[46] = sendDataVal.byteVal[1];
	  sendBuffer[47] = sendDataVal.byteVal[2];
	  sendBuffer[48] = sendDataVal.byteVal[3];
	//人体红外感应。
	  sendBuffer[49] = PIRMOTION;
	  sendBuffer[50] = (byte)digitalRead(PIN_HUMAN_INFRARED); 
    //扩展板 
	
	//计算校验码
	  dataSum = 0;
	  for(i=0; i< 61; i++)
		dataSum += sendBuffer[i+3];
	  sendBuffer[64] = (byte)(dataSum & 0xff); //较验位
	//写入发送缓冲
	  for(i=0; i<65; i++){     //65
		Serial.write(sendBuffer[i]);
	  } 
	//}
}

/***************************************************************************
  Function:    updateActuator()
  Description: 驱动外设，这个函数是需要跟实际情况修改的。大体工作思路是，给出引脚号，调用外设驱动。
			   
  Calls:          
  Called By:      
  Input:          
                 
  Output:         
  Return:         
  Others:        
***************************************************************************/
void BoardMega2560::updateActuator(int pinNumber)
{

}

/***************************************************************************
  Function:    reset()
  Description: 如果距最后一次收到数据的时间差超过1秒（1000毫秒），则需要复位操作。
			   特别是无线连接的arduino,更需要。上位机收到不下位机的数据时会停止
			   发送数据，所以复位时我们要发送传感器数据。
  Calls:          
  Called By:      
  Input:          
                 
  Output:         
  Return:         
  Others:        
***************************************************************************/
void BoardMega2560::reset(void)
{
  for (int pos = 0; pos < 10; pos++)  //停止所有外设
  {
//    controlData[pos] = 0; //所有处设数据清0
    digitalWrite(pos + 2, LOW);
  }

  //reset servomotors
 // updateSensorVars = false;
  protocolData = false;

  //protocol handshaking
  writeSerialPort();
  lastDataReceivedTime = millis();
}


