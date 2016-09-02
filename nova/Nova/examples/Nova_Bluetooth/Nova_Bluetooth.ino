 /*
Nova_Bluetooth

Use Bluetooth to connect Android App.

Created 20 Jan 2016
By Blue

http://easy.cc
*/

#include "Nova.h"

BlueTooth myBlueTooth(C0);// C0、M2
DigitDisplay dis =DigitDisplay(M1);// C0、C1、M0、M1、M2、M3

void setup()
{
  myBlueTooth.begin(9600);
}

void loop(){
  switch(myBlueTooth.readAppKey())
  {
   case SS:
   dis.displayFloat(1);
   break; 
   
   case UL:
   dis.displayFloat(2);
   break; 
   
   case US:
   dis.displayFloat(3);
   break; 
   
   case UR:
   dis.displayFloat(4);
   break; 
   
   case LS:
   dis.displayFloat(5);
   break; 
   
   case RS:
   dis.displayFloat(6);
   break; 
   
   case DL:
   dis.displayFloat(7);
   break; 
   
   case DS:
   dis.displayFloat(8);
   break; 
   
   case DR:
   dis.displayFloat(9);
   break; 
   
   case AA:
   dis.displayABCDEF(String("a"), 1);//only Display a,b,c,d,e,f
   break; 
   
   case BB:
   dis.displayABCDEF(String("b"), 1);//only Display a,b,c,d,e,f
   break; 
   
   case CC:
   dis.displayABCDEF(String("c"), 1);//only Display a,b,c,d,e,f
   break; 
   
   case DD:
   dis.displayABCDEF(String("d"), 1);//only Display a,b,c,d,e,f
   break; 
   
   case ON:
   dis.displayFloat(10);
   break; 
   
   case OFF:
   dis.displayFloat(11);
   break; 
  }
}
