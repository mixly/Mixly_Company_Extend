#include "ArduBits_Master.h"
#include <arduino.h>
//#include <stdio.h>

BTMaster::BTMaster(uint8_t tx_pin,uint8_t rx_pin):SetSerial(tx_pin,rx_pin)
{

}
void BTMaster::begin(unsigned long baud)
{
    SetSerial::begin(baud);  
}

void BTMaster:: Master_set(String BTSet)
{
     Serial.begin(9600);
     delay(500);
     Serial.println("ArduBits_Bluetooth Settings:");
     delay(500);
     SetSerial::print(BTSet);
     delay(500);
    // SetSerial::print("AT");
     delay(500);
     if ( SetSerial::available() > 0)
     {
         Serial.println(SetSerial::readString());
      }
     else
        Serial.println("Set Error !!!");
    delay(50); 
      
}


void BTMaster:: Master_RX_Data(void)
{
    if (SetSerial::available() > 0) 
    {
        _Master_RX_Schar = SetSerial::readStringUntil(':');
        _Master_RX_Snum  = String(SetSerial::readStringUntil('#')).toInt();
        SetSerial::flush(); 
       // delay(10); 
    }
}

String BTMaster:: Master_RX_Schar(void)
{
    Master_RX_Data();
    return  _Master_RX_Schar;       
}

int16_t BTMaster:: Master_RX_Snum(void)
{
    Master_RX_Data();
    return  _Master_RX_Snum;       
}


void BTMaster:: Master_TX_Data(String TX_Schar, int16_t RX_Snum)
{

    if(_TX_Schar != TX_Schar || _RX_Snum != RX_Snum)
    {
      //SetSerial::print(String(String(TX_Schar) + String(":")) + String(String(RX_Snum) + String("#")));
        SetSerial::print(TX_Schar);
        SetSerial::print("*");
        SetSerial::print(RX_Snum);
        SetSerial::print("#");
        SetSerial::flush();
         delay(10);
     }
     
    _TX_Schar = TX_Schar;
    _RX_Snum = RX_Snum;
    
}



