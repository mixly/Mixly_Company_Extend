/**************************************************************************
  Copyright (C), 2014- ,  申议实业
  File name:      LedControl.cpp
  Author: jiangzhaohui      Version: v1.0      Date: 2014.12.26
  Description: 基于MAX7219的LED点阵驱动	
	驱动使用：
	1.定义一个LedControl对象实例
	2.调用shutdown()使芯片进入正常工作模式
	3.
	4.
	5.
	
  Others:   
    Function List:  
    1.  ：初始化
	2. 
	3. 
	
	4. 
	5. 
	6 
	7 
	8 
	9 
  History:  
                  
    1. Date: 2014.12.26       Author:
       Modification: 代码创建
    2. ...
****************************************************************************/
#include "Config.h"

//the opcodes for the MAX7221 and MAX7219
#define OP_NOOP   0
#define OP_DIGIT0 1
#define OP_DIGIT1 2
#define OP_DIGIT2 3
#define OP_DIGIT3 4
#define OP_DIGIT4 5
#define OP_DIGIT5 6
#define OP_DIGIT6 7
#define OP_DIGIT7 8
#define OP_DECODEMODE  9
#define OP_INTENSITY   10
#define OP_SCANLIMIT   11
#define OP_SHUTDOWN    12
#define OP_DISPLAYTEST 15

LedControl::LedControl(int dataPin, int clkPin, int csPin, int numDevices) {
    SPI_MOSI=dataPin;
    SPI_CLK=clkPin;
    SPI_CS=csPin;
    if(numDevices<=0 || numDevices>8 )
		numDevices=8;  //限制最大的MAX7219级联片数为8片
    maxDevices=numDevices;
    pinMode(SPI_MOSI,OUTPUT);
    pinMode(SPI_CLK,OUTPUT);
    pinMode(SPI_CS,OUTPUT);
    digitalWrite(SPI_CS,HIGH);
    SPI_MOSI=dataPin;
    for(int i=0;i<64;i++) 
	status[i]=0x00;
    for(int i=0;i<maxDevices;i++) { //对每片MAX7219初始化
	spiTransfer(i,OP_DISPLAYTEST,0);        //显示检测寄存器设置为正常工作模式
	//scanlimit is set to max on startup
	setScanLimit(i,7);                      //设置扫描位数为8位（最大扫描位数）
	//decode is done in source
	spiTransfer(i,OP_DECODEMODE,0);         //译码模式为不译码
	clearDisplay(i);                        //清屏
	//we go into shutdown-mode on startup
	shutdown(i,true);                      // 初始化进所有的max7219进入待机模式
    }
}

/***************************************************************************
  Function:       getDeviceCount()
  Description:    获取级联的MAX7219片数
  Calls:          
  Called By:      
  Input:         
                 
  Output:         
  Return:   maxDevices：级联的MAX7219片数      
  Others:        
***************************************************************************/
int LedControl::getDeviceCount() {  
    return maxDevices;
}

/***************************************************************************
  Function:       shutdown()
  Description:    掉电模式设置
  Calls:          
  Called By:      
  Input:  1.addr : 级联中的max7219地址
          2.b    : 模式 1：掉电模式 0：正常工作模式                  
  Output:         
  Return:     
  Others:        
***************************************************************************/
void LedControl::shutdown(int addr, bool b) { //指定相应的MAX7219进入待机或工作模式
    if(addr<0 || addr>=maxDevices)
	return;
    if(b)
	spiTransfer(addr, OP_SHUTDOWN,0);
    else
	spiTransfer(addr, OP_SHUTDOWN,1);
}

/***************************************************************************
  Function:       setScanLimit( ) 
  Description:    设置扫描的数码管个数
     每片MAX7219最多可接8个数码管，实际上我们可能少于8个，比如接了3个，我们只需扫描3个。
  Calls:          
  Called By:      
  Input:  1.int addr, : 级联中的max7219地址
          2.int limit    : 模式 1：掉电模式 0：正常工作模式                  
  Output:         
  Return:     
  Others:        
***************************************************************************/	
void LedControl::setScanLimit(int addr, int limit) { 
    if(addr<0 || addr>=maxDevices)
	return;
    if(limit>=0 || limit<8)
    	spiTransfer(addr, OP_SCANLIMIT,limit);
}

/***************************************************************************
  Function:       setIntensity()
  Description:    设置相应MAX7219亮度值
     
  Calls:          
  Called By:      
  Input:  1.int addr       : 级联中的max7219地址
          2.iint intensity : 亮度值                
  Output:         
  Return:     
  Others:        
***************************************************************************/
void LedControl::setIntensity(int addr, int intensity) {
    if(addr<0 || addr>=maxDevices)
	return;
    if(intensity>=0 || intensity<16)	
	spiTransfer(addr, OP_INTENSITY,intensity);
    
}

/***************************************************************************
  Function:       clearDisplay() 
  Description:    相应MAX7219清屏
     
  Calls:          
  Called By:      
  Input:  1.int addr       : 级联中的max7219地址              
  Output:         
  Return:     
  Others:        
***************************************************************************/
void LedControl::clearDisplay(int addr) {
    int offset;

    if(addr<0 || addr>=maxDevices)
	return;
    offset=addr*8;
    for(int i=0;i<8;i++) {
	status[offset+i]=0;
	spiTransfer(addr, i+1,status[offset+i]);
    }
}

/***************************************************************************
  Function:       clear() 
  Description:    清除显示缓存
     
  Calls:          
  Called By:      
  Input:  1.int addr       : 级联中的max7219地址              
  Output:         
  Return:     
  Others:        
***************************************************************************/
void LedControl::clear(void) {
   for (uint8_t i=0; i<8; i++) {
      displaybuffer[i] = 0;
   }
}
/***************************************************************************
  Function:       setLed()
  Description:    设置LED亮灭
     对于LED点阵来说，一个字节可存储8个LED灯状态，它们在同一行，一片max7219可
	 驱动64个LED，因此需8个字节，本驱动最多支持8片LED级联，所以要记录它们要64个
	 字节，我们用status[64]这个数组来记录。
  Calls:          
  Called By:      
  Input:  1.int addr       : 级联中的max7219地址 
          2.int row, int   ：LED所在行
		  3.column         ：LED所在列
		  4.boolean state  ：LED状态值 0：灭 1：亮
  Output:         
  Return:     
  Others:        
***************************************************************************/
void LedControl::setLed(int addr, int row, int column, boolean state) {
    int offset;
    byte val=0x00;

    if(addr<0 || addr>=maxDevices)
	return;
    if(row<0 || row>7 || column<0 || column>7)
	return;
    offset=addr*8; //开始计算灯在status[]数组中的位置，一个芯片8字节
    val=B10000000 >> column;
    if(state)
	status[offset+row]=status[offset+row]|val; //亮
    else {                                     //灭
	val=~val;
	status[offset+row]=status[offset+row]&val;
    }
    spiTransfer(addr, row+1,status[offset+row]);
}

/***************************************************************************
  Function:       setRow()
  Description:    更新一行LED状态
  Calls:          
  Called By:      
  Input:  1.int addr       : 级联中的max7219地址 
          2.int row        ：LED所在行
		  3.byte value     ：该行LED状态
  Output:         
  Return:     
  Others:        
***************************************************************************/	
void LedControl::setRow(int addr, int row, byte value) {
    int offset;
    if(addr<0 || addr>=maxDevices)
	return;
    if(row<0 || row>7)
	return;
    offset=addr*8;
    status[offset+row]=value;
    spiTransfer(addr, row+1,status[offset+row]);
}

/***************************************************************************
  Function:       setColumn()
  Description:    更新一列LED状态
  Calls:          
  Called By:      
  Input:  1.int addr       : 级联中的max7219地址 
          2.int col        ：LED所在列
		  3.byte value     ：该列LED状态
  Output:         
  Return:     
  Others:        
***************************************************************************/    
void LedControl::setColumn(int addr, int col, byte value) {
    byte val;

    if(addr<0 || addr>=maxDevices)
	return;
    if(col<0 || col>7) 
	return;
    for(int row=0;row<8;row++) {
	val=value >> (7-row);
	val=val & 0x01;
	setLed(addr,row,col,val);
    }
}

/***************************************************************************
  Function:       setDisplay()
  Description:    更新整个点阵屏
  Calls:          
  Called By:      
  Input:  1.int addr       : 级联中的max7219地址 
  Output:         
  Return:     
  Others:        
***************************************************************************/
void LedControl::setDisplay(int addr){
	byte i;
	for(i=0; i<8; i++){
        setRow(0, i, (byte)(displaybuffer[i]));  //从数组中取数据显示
   }	
}

/***************************************************************************
  Function:       setDigit()
  Description:    数码管显示一个数字
  Calls:          
  Called By:      
  Input:  1.int addr       : 级联中的max7219地址 
          2.int digit      ：数码管号（0-7）
		  3.byte value     ：数码管值
		  4.boolean dp     ：小数点显示与否
  Output:         
  Return:     
  Others:        
***************************************************************************/
void LedControl::setDigit(int addr, int digit, byte value, boolean dp) {
    int offset;
    byte v;

    if(addr<0 || addr>=maxDevices)
	return;
    if(digit<0 || digit>7 || value>15)
	return;
    offset=addr*8;
    v=charTable[value]; //查表求取值
    if(dp)
	v|=B10000000;
    status[offset+digit]=v;
    spiTransfer(addr, digit+1,v);
    
}

/***************************************************************************
  Function:       setChar()
  Description:    数码管显示一个字符
  Calls:          
  Called By:      
  Input:  1.int addr       : 级联中的max7219地址 
          2.int digit      ：数码管号（0-7）
		  3.byte value     ：数码管值
		  4.boolean dp     ：小数点显示与否
  Output:         
  Return:     
  Others:        
***************************************************************************/
void LedControl::setChar(int addr, int digit, char value, boolean dp) {
    int offset;
    byte index,v;

    if(addr<0 || addr>=maxDevices)
	return;
    if(digit<0 || digit>7)
 	return;
    offset=addr*8;
    index=(byte)value;
    if(index >127) { //索引值大于127，则显示空字符
	//no defined beyond index 127, so we use the space char
	index=32;
    }
    v=charTable[index];
    if(dp)
	v|=B10000000;
    status[offset+digit]=v;
    spiTransfer(addr, digit+1,v);
}

/***************************************************************************
  Function:       spiTransfer()
  Description:    数据发送
     
  Calls:          
  Called By:      
  Input:  1.int addr       : 级联中的max7219地址 
          2.byte opcode    ：操作码
          3.byte data      ：操作数
  Output:         
  Return:     
  Others:        
***************************************************************************/
void LedControl::spiTransfer(int addr, volatile byte opcode, volatile byte data) {
    //Create an array with the data to shift out
    int offset=addr*2;
    int maxbytes=maxDevices*2;

    for(int i=0;i<maxbytes;i++) //所有级连的MAX7219先设置为无操作
	spidata[i]=(byte)0;
    //put our device data into the array
    spidata[offset+1]=opcode;  //要操作的芯片设置操作码
    spidata[offset]=data;      //操作数据
    //enable the line 
    digitalWrite(SPI_CS,LOW);
    //Now shift out the data 
    for(int i=maxbytes;i>0;i--)  //发送数据
 	shiftOut(SPI_MOSI,SPI_CLK,MSBFIRST,spidata[i-1]);
    //latch the data onto the display
    digitalWrite(SPI_CS,HIGH);
}    


