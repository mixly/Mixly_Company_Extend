#include "Nova_BlueTooth.h"

BlueTooth::BlueTooth(uint8_t port) : SoftwareSerial(11, 12, false)
{
	switch(port)
	{
		case C0:
        _port = HARDWARE;
		break;
        
        case M2:
        _port = SOFTWARE;
        
		break;
        
        default:

        break;
	}
}

void BlueTooth::begin(long baud)
{
    if (_port == HARDWARE)
    {
        Serial.begin(baud);
           
        Serial.write("AT+NAMENova BT"); 
    }
    else if (_port == SOFTWARE)
    {
        SoftwareSerial::begin(baud);
           
        SoftwareSerial::write("AT+NAMENova BT"); 
    }
    delay(500);
}


int16_t BlueTooth::available(void)
{
    if (_port == HARDWARE)
    {
        return Serial.available();
    }
    else if (_port == SOFTWARE)
    {
        return SoftwareSerial::available();
    }
	
}

String BlueTooth::readString(void)
{
    if (_port == HARDWARE)
    {
        return Serial.readString();
    }
    else if (_port == SOFTWARE)
    {
        return SoftwareSerial::readString();
    }
}

size_t BlueTooth::write(uint8_t byte)
{
    if (_port == HARDWARE)
    {
        Serial.write(byte);
    }
    else if (_port == SOFTWARE)
    {
        SoftwareSerial::write(byte);
    }   
}

void BlueTooth::write(const char *str)
{
    if (_port == HARDWARE)
    {
        Serial.write(str);
    }
    else if (_port == SOFTWARE)
    {
        SoftwareSerial::write(str);
    }
}

void BlueTooth::write(byte *buffer, int length)
{
    if (_port == HARDWARE)
    {
        Serial.write(buffer, length);
    }
    else if (_port == SOFTWARE)
    {
        SoftwareSerial::write(buffer, length);
    }
}

void BlueTooth::readBytes(byte *buffer, int length)
{
    if (_port == HARDWARE)
    {
        Serial.readBytes(buffer, length);
    }
    else if (_port == SOFTWARE)
    {
        SoftwareSerial::readBytes(buffer, length);
    }
}

uint8_t BlueTooth::readAppKey(void)
{
    if (_port == HARDWARE)
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
    }
    else if (_port == SOFTWARE)
    {
        if(SoftwareSerial::available())  
        {
            _BtComData[_BtLen]= SoftwareSerial::read();
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