#include "Nova_4DigitDisplay.h"

//                           0    1     2   3    4    5     6   7    8    9    A    B    C    D    E    F
unsigned char tab[]=       {0x3F,0x06,0x5B,0x4F,0x66,0x6D,0x7D,0x07,0x7F,0x6F,0x77,0x7C,0x39,0x5E,0x79,0x71};
// 180°颠倒
unsigned char mirror_tab[]={0x3F,0x30,0x5B,0x79,0x74,0x6D,0x6F,0x38,0x7F,0x7D,0x7E,0x67,0x0F,0x73,0x4F,0x4E};

DigitDisplay::DigitDisplay(uint8_t port)
{
	switch(port)
	{
		case C0:
			SCL_pin = C0_PIN_1;
			SDA_pin = C0_PIN_0;
		break;
		case C1:
			SCL_pin = C1_PIN_0;
			SDA_pin = C1_PIN_1;
		break;
		case S4:
			SCL_pin = S4_PIN_1;
			SDA_pin = S4_PIN_0;
		break;
		case S5:
			SCL_pin = S5_PIN_1;
			SDA_pin = S5_PIN_0;
		break;
        case M0:
			SCL_pin = M0_PIN_1;
			SDA_pin = M0_PIN_0;
		break;
        case M1:
			SCL_pin = M1_PIN_1;
			SDA_pin = M1_PIN_0;
		break;
	}
	pinMode(SCL_pin,OUTPUT);
	pinMode(SDA_pin,OUTPUT);
	Write_DATA(0x48,0x31);     // 开显示、8段显示方式、3级亮度
}

void DigitDisplay::displayTime(uint16_t num)
{
	// static unsigned long last_time = 0;
	// uint8_t state = 0x00;

    // hour = hour > 23 ? 23 : hour;
    // min = min > 59 ? 59 : min;

	// // 1. 显示小时
	// Write_DATA(0x68, tab[hour/10]);
	// //Write_DATA(0x6A, tab[hour%10]);

	// // 2. 显示分
    // Write_DATA(0x6C, tab[min/10]);
	// Write_DATA(0x6E, tab[min%10]);

	// // 3. 时间冒号闪烁
	// if ((millis() - last_time) > 1000)
	// {
       // // 冒号状态改变
		// state ^=0x01;

		// last_time = millis();
	// }

    // if (state == 0x01)
    // {
    	// Write_DATA(0x6A, tab[hour%10] |= 0x80);
    // }
    // else
    // {
    	// Write_DATA(0x6A, tab[hour%10] &= ~(0X80));
    // }
    
    uint8_t a,b,c,d;
	uint8_t bit;
	d = num%10;if(d != 0)bit = 1;
	c = num%100/10;if(c != 0)bit = 2;
	b = num%1000/100;if(b != 0)bit = 3;
	a = num/1000;if(a != 0)bit = 4;
	//switch(bit)
	{
		//case 4:
			Write_DATA(0x68,tab[a]);
		//case 3:
			Write_DATA(0x68+2,tab[b]|= 0x80);
		//case 2:
			Write_DATA(0x68+4,tab[c]);
		//case 1:
			Write_DATA(0x68+6,tab[d]);
		//break;
	}
}

void DigitDisplay::displayNum(uint16_t num)
{
	uint8_t a,b,c,d;
	uint8_t bit;
	d = num%10;if(d != 0)bit = 1;
	c = num%100/10;if(c != 0)bit = 2;
	b = num%1000/100;if(b != 0)bit = 3;
	a = num/1000;if(a != 0)bit = 4;
	switch(bit)
	{
		case 4:
			Write_DATA(0x68,tab[a]);
		case 3:
			Write_DATA(0x68+2,tab[b]);
		case 2:
			Write_DATA(0x68+4,tab[c]);
		case 1:
			Write_DATA(0x68+6,tab[d]);
		break;
	}
}
void DigitDisplay::displayNum(uint16_t num,bool dir)
{
	uint8_t a[4];
	uint8_t bit;
	a[3] = num%10;if(a[3] != 0)bit = 1;
	a[2] = num%100/10;if(a[2] != 0)bit = 2;
	a[1] = num%1000/100;if(a[1] != 0)bit = 3;
	a[0] = num/1000;if(a[0] != 0)bit = 4;
	if(dir == true)
	switch(bit)
	{
		case 4:
			Write_DATA(0x68,tab[a[0]]);
		case 3:
			Write_DATA(0x68+2,tab[a[1]]);
		case 2:
			Write_DATA(0x68+4,tab[a[2]]);
		case 1:
			Write_DATA(0x68+6,tab[a[3]]);
		break;
	}
	else
	{
		for(int i = 0; i < bit; i++)
		{
			Write_DATA(0x68+2*i,tab[a[4-bit+i]]);
		}
	}
}
void DigitDisplay::displayFloat(float f)
{
	uint8_t a[4];
	uint8_t b[4];
	uint8_t disp_buf[4],piont_bit=0;
	uint8_t int_bit,float_bit;
	uint16_t int_part,float_part;

	clear();

	if(f == 0)
	{
		Write_DATA(0x68+6,tab[0]);
	}
	else
	{
		if(f > 10000){clear();return;}
		if((f*10000) < 1){clear();return;}
		int_part = (uint16_t)f/1;
		if(int_part < 1)int_bit = 0;
		else
		{
			a[3] = int_part%10;if(a[3] != 0)int_bit = 1;//最低位
			a[2] = int_part%100/10;if(a[2] != 0)int_bit = 2;
			a[1] = int_part%1000/100;if(a[1] != 0)int_bit = 3;
			a[0] = int_part/1000;if(a[0] != 0)int_bit = 4;
		}

		float_part = (uint32_t)(f*10000)%10000;
		b[0] = float_part/1000;if(b[0] != 0)float_bit = 1;
		b[1] = float_part%1000/100;if(b[1] != 0)float_bit = 2;
		b[2] = float_part%100/10;if(b[2] != 0)float_bit = 3;
		b[3] = float_part%10;if(b[3] != 0)float_bit = 4;
		
		if(int_bit == 4)
		{
			displayNum(int_part);
//			Write_DATA(0x68+6,tab[a[3]]|0X80);
		}
		if(int_bit == 3)
		{
			if(b[0] == 0)
			{
				displayNum(int_part);
//				Write_DATA(0x68+6,tab[a[3]]|0X80);
			}
			else
			{
				displayNum(int_part,0);
				Write_DATA(0x68+4,tab[a[3]]|0X80);
				Write_DATA(0x68+6,tab[b[0]]);
			}
		}
		if(int_bit == 2)
		{
			if(b[1] == 0)
			{
				if(b[0] == 0)
				{
					displayNum(int_part);
//					Write_DATA(0x68+6,tab[a[3]]|0X80);
				}
				else
				{
					Write_DATA(0x68+2,tab[int_part/10]);
					Write_DATA(0x68+4,tab[int_part%10]|0X80);
					Write_DATA(0x68+6,tab[b[0]]);
				}
			}
			else//小数点后第二为不为零
			{
				displayNum(int_part,0);
				Write_DATA(0x68+2,tab[a[3]]|0X80);
				Write_DATA(0x68+4,tab[b[0]]);
				Write_DATA(0x68+6,tab[b[1]]);
			}
		}
		if(int_bit == 1)//整数只有一位
		{
			if(b[2] == 0)
			{
				if(b[1] == 0)
				{
					if(b[0] == 0)
					{
						Write_DATA(0x68+6,tab[int_part]);
//						Write_DATA(0x68+6,tab[int_part]|0X80);
					}
					else
					{
						Write_DATA(0x68+4,tab[int_part]|0X80);
						Write_DATA(0x68+6,tab[b[0]]);
					}
				}
				else
				{
					Write_DATA(0x68+2,tab[int_part]|0X80);
					Write_DATA(0x68+4,tab[b[0]]);
					Write_DATA(0x68+6,tab[b[1]]);
				}
			}
			else//小数点第三位不为零
			{
				displayNum(int_part,0);
				Write_DATA(0x68,tab[a[3]]|0X80);
				Write_DATA(0x68+2,tab[b[0]]);
				Write_DATA(0x68+4,tab[b[1]]);
				Write_DATA(0x68+6,tab[b[2]]);
			}
		}
		if(int_bit == 0)
		{
			if(float_bit > 3)float_bit=3;
			for(int i=0; i<float_bit; i++)
				Write_DATA(0x68+6-i*2, tab[b[(float_bit-1)-i]]);
			Write_DATA(0x68+6-2*float_bit, tab[0]|0x80);
		}
	}
}
void DigitDisplay::displayNum(uint8_t one, uint8_t two, uint8_t three, uint8_t four)
{
	Write_DATA(0x68+6,tab[one]);
	Write_DATA(0x68+4,tab[two]);
	Write_DATA(0x68+2,tab[three]);
	Write_DATA(0x68,tab[four]);
}
void DigitDisplay::displayBit(uint8_t num, uint8_t bit)
{
	if(num > 9)return;
	Write_DATA((0x6E)-(2*(bit-1)),tab[num]);
}
void DigitDisplay::displayABCDEF(const String &s, uint8_t bit)
{ 
    uint8_t i = 0;
    
    if(s.compareTo("a") == 0)
    {
        i = 1;
    }
    else if(s.compareTo("b") == 0)
    {
        i = 2;
    }
    else if(s.compareTo("c") == 0)
    {
        i = 3;
    }
    else if(s.compareTo("d") == 0)
    {
        i = 4;
    }
    else if(s.compareTo("e") == 0)
    {
        i = 5;
    }
    else if(s.compareTo("f") == 0)
    {
        i = 6;
    }
    
    //Serial.println(i);
    
	switch(i)
	{
		case 1:
			Write_DATA((0x6E)-(2*(bit-1)),tab[10]);
		break;

		case 2:
			Write_DATA((0x6E)-(2*(bit-1)),tab[11]);
		break;

		case 3:
			Write_DATA((0x6E)-(2*(bit-1)),tab[12]);
		break;

		case 4:
			Write_DATA((0x6E)-(2*(bit-1)),tab[13]);
		break;

		case 5:
			Write_DATA((0x6E)-(2*(bit-1)),tab[14]);
		break;
        
		case 6:
			Write_DATA((0x6E)-(2*(bit-1)),tab[15]);
		break;
	}
}
void DigitDisplay::clear(void)
{
	for(int a=0; a<4;a++)
	{
		Write_DATA(0x68+a*2,0);
	}
}
void DigitDisplay::clearBit(uint8_t bit)
{
	if(bit < 1)return;
	Write_DATA((0x6E)-(2*(bit-1)),0);
}
//**************************************
void DigitDisplay::TM1650_start(void)
{
	pinMode(SDA_pin,OUTPUT);	//set SDA_pin output
	digitalWrite(SCL_pin,HIGH);
	digitalWrite(SDA_pin,HIGH);
	_delay_us(1);
	digitalWrite(SDA_pin,LOW);
	_delay_us(1);
}
void DigitDisplay::TM1650_stop(void)
{
	pinMode(SDA_pin,OUTPUT);
	digitalWrite(SCL_pin,HIGH);
	digitalWrite(SDA_pin,LOW);
	_delay_us(1);
	digitalWrite(SDA_pin,HIGH);
	_delay_us(1);
}
void DigitDisplay::TM1650_ACK(void)
{
	digitalWrite(SCL_pin,HIGH);
	pinMode(SDA_pin,INPUT);			//set SDA_pin input
	_delay_us(1);
	digitalWrite(SCL_pin,LOW);
	_delay_us(1);
	pinMode(SDA_pin,OUTPUT);
	_delay_us(1);
}
void DigitDisplay::TM1650_Write(unsigned char	DATA)
{
	unsigned char i;
	pinMode(SDA_pin,OUTPUT);
	_delay_us(1);
	digitalWrite(SCL_pin,LOW);
	for(i=0;i<8;i++)
	{
		if(DATA&0X80)
			digitalWrite(SDA_pin,HIGH);
		else
			digitalWrite(SDA_pin,LOW);
		DATA<<=1;
		digitalWrite(SCL_pin,LOW);
		_delay_us(1);
		digitalWrite(SCL_pin,HIGH);
		_delay_us(1);
		digitalWrite(SCL_pin,LOW);
		_delay_us(1);
	}	
}
void DigitDisplay::Write_DATA(unsigned char add,unsigned char DATA)		//指定地址写入数据
{
	TM1650_start();
	TM1650_Write(add);
	TM1650_ACK();
	TM1650_Write(DATA);
	TM1650_ACK();
	TM1650_stop();
}