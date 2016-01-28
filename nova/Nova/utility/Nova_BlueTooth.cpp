#include "Nova_BlueTooth.h"
BlueTooth::BlueTooth(uint8_t port)
{
	switch(port)
	{
		case C0:
			Serial.begin(9600);
		break;
	}
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
uint8_t BlueTooth::readRC(void)
{
  uint8_t i = 0;
  char comdata[2];
  while(Serial.available() > 0)  
  {
      comdata[i]= Serial.read();
      i++;
      delay(2);
      if(i == 2)
      {
      	if(stringcmp(comdata, "SS")==true)
		{
			return SS;
		}
		else if(stringcmp(comdata, "UL")==true)
		{
			return UL;
		}
		else if(stringcmp(comdata, "US")==true)
		{
			return US;
		}
		else if(stringcmp(comdata, "UR")==true)
		{
			return UR;
		}
		else if(stringcmp(comdata, "LS")==true)
		{
			return LS;
		}
		else if(stringcmp(comdata, "RS")==true)
		{
			return RS;
		}
		else if(stringcmp(comdata, "DL")==true)
		{
			return DL;
		}
		else if(stringcmp(comdata, "DS")==true)
		{
			return DS;
		}
		else if(stringcmp(comdata, "DR")==true)
		{
			return DR;
		}
		else if(stringcmp(comdata, "AA")==true)
		{
			return AA;
		}
		else if(stringcmp(comdata, "BB")==true)
		{
			return BB;
		}
		else if(stringcmp(comdata, "CC")==true)
		{
			return CC;
		}
		else if(stringcmp(comdata, "DD")==true)
		{
			return DD;
		}
		else if(stringcmp(comdata, "ON")==true)
		{
			return 14;
		}
		else if(stringcmp(comdata, "OF")==true)
		{
			return 15;
		}
		else
			return 0;
      }
  }
  return 0;
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