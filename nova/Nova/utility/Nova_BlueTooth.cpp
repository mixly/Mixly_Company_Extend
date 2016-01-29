#include "Nova_BlueTooth.h"


BlueTooth::BlueTooth(uint8_t port)
{
	switch(port)
	{
		case C0:

		break;
	}
}

void BlueTooth::begin(unsigned long baud)
{
    Serial.begin(baud);
       
    Serial.write("AT+NAMENova BT"); 
    delay(500);
}


uint8_t BlueTooth::available(void)
{
	return Serial.available();
}

String BlueTooth::readString(void)
{
	return Serial.readString();
}

void BlueTooth::write(byte val)
{
	Serial.write(val);
}

void BlueTooth::write(const char *str)
{
	Serial.write(str);
}

void BlueTooth::write(byte *buffer, int length)
{
	Serial.write(buffer, length);
}

void BlueTooth::readBytes(byte *buffer, int length)
{
	 Serial.readBytes(buffer, length);
}

uint8_t BlueTooth::readAppKey(void)
{
    if(Serial.available())  
    {
        _BtComData[_BtLen]= Serial.read();
        _BtLen++;

        if(_BtLen == 3)
        {
            if (_BtComData[2] == '\r')
            {
                if(stringcmp(_BtComData, "SS")==true)
                {
                    _appKey = SS;
                }
                else if(stringcmp(_BtComData, "UL")==true)
                {
                    _appKey = UL;
                }
                else if(stringcmp(_BtComData, "US")==true)
                {
                    _appKey = US;
                }
                else if(stringcmp(_BtComData, "UR")==true)
                {
                    _appKey = UR;
                }
                else if(stringcmp(_BtComData, "LS")==true)
                {
                    _appKey = LS;
                }
                else if(stringcmp(_BtComData, "RS")==true)
                {
                    _appKey = RS;
                }
                else if(stringcmp(_BtComData, "DL")==true)
                {
                    _appKey = DL;
                }
                else if(stringcmp(_BtComData, "DS")==true)
                {
                    _appKey = DS;
                }
                else if(stringcmp(_BtComData, "DR")==true)
                {
                    _appKey = DR;
                }
                else if(stringcmp(_BtComData, "AA")==true)
                {
                    _appKey = AA;
                }
                else if(stringcmp(_BtComData, "BB")==true)
                {
                    _appKey = BB;
                }
                else if(stringcmp(_BtComData, "CC")==true)
                {
                    _appKey = CC;
                }
                else if(stringcmp(_BtComData, "DD")==true)
                {
                    _appKey = DD;
                }
                else if(stringcmp(_BtComData, "ON")==true)
                {
                    _appKey = ON;
                }
                else if(stringcmp(_BtComData, "OF")==true)
                {
                    _appKey = OFF;
                }
            }
                    
        _BtLen = 0;
        
        }
    }
    
    return _appKey;
}

bool BlueTooth::stringcmp(char *str1, String str2)
{
  if(*str1 == str2[0])
  {
    if(*(str1+1) == str2[1])
    {
      return true;
    }
    else
      return false;
  }
  else 
    return false;
}