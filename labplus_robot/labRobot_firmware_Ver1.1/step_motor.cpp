#include "Arduino.h"
#include "step_motor.h"
#include <inttypes.h>

/***************************************************************************
  Function:       bspInit()
  Description:    
  Calls:          
  Called By:      
  Input:          
                 
  Output:         
  Return:         
  Others:   

xIN1 xIN2 xOUT1 xOUT2 FUNCTION
0 0 Z Z Coast/fast decay
0 1 L H Reverse
1 0 H L Forward
1 1 L L Brake/slow decay
8拍,电机走7.2度
***************************************************************************/
void right(char step)
{
  switch(step)
  {
  	case 0://A+:1,A-:0  B+:0,B-:0 
							PORTH |=  (1<<PH5);//左电机
							PORTH &= ~(1<<PH6);
							PORTH &= ~(1<<PH3);
							PORTH &= ~(1<<PH4);
						  
						  PORTC |= (1<< PC2);//右电机
						  PORTC &= ~(1<<PC3);
						  PORTC &= ~(1<<PC0);
						  PORTC &= ~(1<<PC1);
  			//Serial.println("1");
  		break;
  	case 1://A+:1,A-:0  B+:1,B-:0 
						  PORTC |= (1<< PC2);//右电机
						  PORTC &= ~(1<<PC3);
						  PORTC |=  (1<<PC0);
						  PORTC &= ~(1<<PC1);
						  
							PORTH |=  (1<<PH5);//左电机
							PORTH &= ~(1<<PH6);
							PORTH |=  (1<<PH3);
							PORTH &= ~(1<<PH4);						  
  			//Serial.println("2");
  		break;
  	case 2://A+:0,A-:0  B+:1,B-:0
							PORTH &= ~(1<<PH5);//左电机
							PORTH &= ~(1<<PH6);
							PORTH |= (1<<PH3);
							PORTH &= ~(1<<PH4);
  
						  PORTC &= ~(1<<PC2);//右电机
						  PORTC &= ~(1<<PC3);
						  PORTC |=  (1<<PC0);
						  PORTC &= ~(1<<PC1);
  			//Serial.println("3");      
  		break;
  	case 3://A+:0,A-:1  B+:1,B-:0 
						  PORTC &= ~(1<<PC2);//右电机
						  PORTC |=  (1<<PC3);
						  PORTC |=  (1<<PC0);
						  PORTC &= ~(1<<PC1);
						  
							PORTH &= ~(1<<PH5);//左电机
							PORTH |= (1<<PH6);
							PORTH |=  (1<<PH3);
							PORTH &= ~(1<<PH4);						  
  			//Serial.println("4");  
  		break;
  	case 4://A+:0,A-:1  B+:0,B-:0
							PORTH &= ~(1<<PH5);//左电机
							PORTH |=  (1<<PH6);
							PORTH &= ~(1<<PH3);
							PORTH &= ~(1<<PH4);
  
						  PORTC &= ~(1<<PC2);//右电机
						  PORTC |=  (1<<PC3);
						  PORTC &= ~(1<<PC0);
						  PORTC &= ~(1<<PC1);
  			//Serial.println("5");   
  		break;
  	case 5://A+:0,A-:1  B+:0,B-:1 	
						  PORTC &= ~(1<<PC2);//右电机
						  PORTC |=  (1<<PC3);
						  PORTC &= ~(1<<PC0);
						  PORTC |=  (1<<PC1);
						  
							PORTH &= ~(1<<PH5);//左电机
							PORTH |= (1<<PH6);
							PORTH &= ~(1<<PH3);
							PORTH |= (1<<PH4);						  
  			//Serial.println("6");   
  		break;
  	case 6://A+:0,A-:0  B+:0,B-:1
							PORTH &= ~(1<<PH5);//左电机
							PORTH &= ~(1<<PH6);
							PORTH &= ~(1<<PH3);
							PORTH |= (1<<PH4);
  
						  PORTC &= ~(1<<PC2);//右电机
						  PORTC &= ~(1<<PC3);
						  PORTC &= ~(1<<PC0);
						  PORTC |=  (1<<PC1);
  			//Serial.println("7");    
  		break;
  		case 7://A+:1,A-:0  B+:0,B-:1 
						  PORTC |= (1<<PC2);//右电机
						  PORTC &= ~(1<<PC3);
						  PORTC &= ~(1<<PC0);
						  PORTC |=  (1<<PC1);
						  
							PORTH |= (1<<PH5);//左电机
							PORTH &= ~(1<<PH6);
							PORTH &= ~(1<<PH3);
							PORTH |= (1<<PH4);						  
  			//Serial.println("8");    
  		break;	
  }	
}

void stop_motor(void)
{
  PORTH &=~(1<<PH6);
  PORTH &=~(1<<PH5);
  PORTH &=~(1<<PH4);
  PORTH &=~(1<<PH3);
  PORTC &= 0xf0;
}

void left(char step)
{
  switch(step)
  {
  	case 0://A+:1,A-:0  B+:0,B-:0 
						PORTH |= (1<<PH5);//左电机
						PORTH &= ~(1<<PH6);
						PORTH &= ~(1<<PH3);
						PORTH |= (1<<PH4);

						PORTC |= (1<<PC2);//右电机
						PORTC &= ~(1<<PC3);
						PORTC &= ~(1<<PC0);
						PORTC |=  (1<<PC1);
  			//Serial.println("1");
  		break;
  	case 1://A+:1,A-:0  B+:1,B-:0 
						PORTC &= ~(1<<PC2);//右电机
						PORTC &= ~(1<<PC3);
						PORTC &= ~(1<<PC0);
						PORTC |=  (1<<PC1);
						
						PORTH &= ~(1<<PH5);//左电机
						PORTH &= ~(1<<PH6);
						PORTH &= ~(1<<PH3);
						PORTH |= (1<<PH4);						  
  			//Serial.println("2");
  		break;
  	case 2://A+:0,A-:0  B+:1,B-:0
						PORTH &= ~(1<<PH5);//左电机
						PORTH |= (1<<PH6);
						PORTH &= ~(1<<PH3);
						PORTH |= (1<<PH4);
	
						PORTC &= ~(1<<PC2);//右电机
						PORTC |=  (1<<PC3);
						PORTC &= ~(1<<PC0);
						PORTC |=  (1<<PC1);
  			//Serial.println("3");      
  		break;
  	case 3://A+:0,A-:1  B+:1,B-:0
						PORTC &= ~(1<<PC2);//右电机
						PORTC |=  (1<<PC3);
						PORTC &= ~(1<<PC0);
						PORTC &= ~(1<<PC1);
						
						PORTH &= ~(1<<PH5);//左电机
						PORTH |=  (1<<PH6);
						PORTH &= ~(1<<PH3);
						PORTH &= ~(1<<PH4);						  
  			//Serial.println("4");  
  		break;
  	case 4://A+:0,A-:1  B+:0,B-:0
						PORTH &= ~(1<<PH5);//左电机
						PORTH |= (1<<PH6);
						PORTH |=  (1<<PH3);
						PORTH &= ~(1<<PH4);

						PORTC &= ~(1<<PC2);//右电机
						PORTC |=  (1<<PC3);
						PORTC |=  (1<<PC0);
						PORTC &= ~(1<<PC1);
  			//Serial.println("5");   
  		break;
  	case 5://A+:0,A-:1  B+:0,B-:1
						PORTC &= ~(1<<PC2);//右电机
						PORTC &= ~(1<<PC3);
						PORTC |=  (1<<PC0);
						PORTC &= ~(1<<PC1);
						
						PORTH &= ~(1<<PH5);//左电机
						PORTH &= ~(1<<PH6);
						PORTH |= (1<<PH3);
						PORTH &= ~(1<<PH4);						  
  			//Serial.println("6");   
  		break;
  	case 6://A+:0,A-:0  B+:0,B-:1					  
						PORTH |=  (1<<PH5);//左电机
						PORTH &= ~(1<<PH6);
						PORTH |=  (1<<PH3);
						PORTH &= ~(1<<PH4);

						PORTC |= (1<< PC2);//右电机
						PORTC &= ~(1<<PC3);
						PORTC |=  (1<<PC0);
						PORTC &= ~(1<<PC1);
  			//Serial.println("7");    
  		break;
  		case 7://A+:1,A-:0  B+:0,B-:1						  
						PORTC |= (1<< PC2);//右电机
						PORTC &= ~(1<<PC3);
						PORTC &= ~(1<<PC0);
						PORTC &= ~(1<<PC1);
						
						PORTH |=  (1<<PH5);//左电机
						PORTH &= ~(1<<PH6);
						PORTH &= ~(1<<PH3);
						PORTH &= ~(1<<PH4);						  
  			//Serial.println("8");    
  		break;
  }
}
void forward(char step)
{
   switch(step)
  {
  	case 0://A+:1,A-:0  B+:0,B-:0 
					PORTH |= (1<<PH5);//左电机
					PORTH &= ~(1<<PH6);
					PORTH &= ~(1<<PH3);
					PORTH &= ~(1<<PH4);
					
					PORTC |= (1<<PC2);//右电机
					PORTC &= ~(1<<PC3);
					PORTC &= ~(1<<PC0);
					PORTC |=  (1<<PC1);
  			//Serial.println("1");
  		break;
  	case 1://A+:1,A-:0  B+:1,B-:0
					PORTC &= ~(1<<PC2);//右电机
					PORTC &= ~(1<<PC3);
					PORTC &= ~(1<<PC0);
					PORTC |=  (1<<PC1);
					
					PORTH |= (1<<PH5);//左电机
					PORTH &= ~(1<<PH6);						  
					PORTH |= (1<<PH3);
					PORTH &= ~(1<<PH4);						  
  			//Serial.println("2");
  		break;
  	case 2://A+:0,A-:0  B+:1,B-:0
					PORTH &= ~(1<<PH5);//左电机
					PORTH &= ~(1<<PH6);
					PORTH |= (1<<PH3);
					PORTH &= ~(1<<PH4);
					
					PORTC &= ~(1<<PC2);//右电机
					PORTC |=  (1<<PC3);
					PORTC &= ~(1<<PC0);
					PORTC |=  (1<<PC1); 
  			//Serial.println("3");      
  		break;
  	case 3://A+:0,A-:1  B+:1,B-:0
					PORTC &= ~(1<<PC2);//右电机
					PORTC |=  (1<<PC3);
					PORTC &= ~(1<<PC0);
					PORTC &= ~(1<<PC1);

					PORTH &= ~(1<<PH5);//左电机
					PORTH |=  (1<<PH6);
					PORTH |=  (1<<PH3);
					PORTH &= ~(1<<PH4);						  
  			//Serial.println("4");  
  		break;
  	case 4://A+:0,A-:1  B+:0,B-:0
					PORTH &= ~(1<<PH5);//左电机
					PORTH |=  (1<<PH6);
					PORTH &= ~(1<<PH3);
					PORTH &= ~(1<<PH4);

					PORTC &= ~(1<<PC2);//右电机
					PORTC |=  (1<<PC3);
					PORTC |=  (1<<PC0);
					PORTC &= ~(1<<PC1);						  
  			//Serial.println("5");   
  		break;
  	case 5://A+:0,A-:1  B+:0,B-:1 	
					PORTC &= ~(1<<PC2);//右电机
					PORTC &= ~(1<<PC3);
					PORTC |=  (1<<PC0);
					PORTC &= ~(1<<PC1);	

					PORTH &= ~(1<<PH5);//左电机
					PORTH |= (1<<PH6);
					PORTH &= ~(1<<PH3);
					PORTH |= (1<<PH4);						  
  			//Serial.println("6");   
  		break;
  	case 6://A+:0,A-:0  B+:0,B-:1
					PORTH &= ~(1<<PH5);//左电机
					PORTH &= ~(1<<PH6);
					PORTH &= ~(1<<PH3);
					PORTH |= (1<<PH4);

					PORTC |= (1<< PC2);//右电机
					PORTC &= ~(1<<PC3);
					PORTC |=  (1<<PC0);
					PORTC &= ~(1<<PC1);						  
  			//Serial.println("7");    
  		break;
  		case 7://A+:1,A-:0  B+:0,B-:1
					PORTC |= (1<< PC2);//右电机
					PORTC &= ~(1<<PC3);
					PORTC &= ~(1<<PC0);
					PORTC &= ~(1<<PC1);	

					PORTH |= (1<<PH5);//左电机
					PORTH &= ~(1<<PH6);
					PORTH &= ~(1<<PH3);
					PORTH |= (1<<PH4);						  
  			//Serial.println("8");    
  		break;
  }
}
void left_step_motor(char step)
{
  switch(step)
  {
  	case 0://A+:1,A-:0  B+:0,B-:0 
					PORTH |= (1<<PH5);//左电机
					PORTH &= ~(1<<PH6);
					PORTH &= ~(1<<PH3);
					PORTH &= ~(1<<PH4);						  
  			//Serial.println("1");
  		break;
  	case 1://A+:1,A-:0  B+:1,B-:0						  
					PORTH |= (1<<PH5);//左电机
					PORTH &= ~(1<<PH6);						  
					PORTH |= (1<<PH3);
					PORTH &= ~(1<<PH4);						  
  			//Serial.println("2");
  		break;
  	case 2://A+:0,A-:0  B+:1,B-:0
					PORTH &= ~(1<<PH5);//左电机
					PORTH &= ~(1<<PH6);
					PORTH |= (1<<PH3);
					PORTH &= ~(1<<PH4);
  			//Serial.println("3");      
  		break;
  	case 3://A+:0,A-:1  B+:1,B-:0
					PORTH &= ~(1<<PH5);//左电机
					PORTH |=  (1<<PH6);
					PORTH |=  (1<<PH3);
					PORTH &= ~(1<<PH4);						  
  			//Serial.println("4");  
  		break;
  	case 4://A+:0,A-:1  B+:0,B-:0
					PORTH &= ~(1<<PH5);//左电机
					PORTH |=  (1<<PH6);
					PORTH &= ~(1<<PH3);
					PORTH &= ~(1<<PH4);						  
  			//Serial.println("5");   
  		break;
  	case 5://A+:0,A-:1  B+:0,B-:1 	
					PORTH &= ~(1<<PH5);//左电机
					PORTH |= (1<<PH6);
					PORTH &= ~(1<<PH3);
					PORTH |= (1<<PH4);						  
  			//Serial.println("6");   
  		break;
  	case 6://A+:0,A-:0  B+:0,B-:1
					PORTH &= ~(1<<PH5);//左电机
					PORTH &= ~(1<<PH6);
					PORTH &= ~(1<<PH3);
					PORTH |= (1<<PH4);					  
  			//Serial.println("7");    
  		break;
  		case 7://A+:1,A-:0  B+:0,B-:1
					PORTH |= (1<<PH5);//左电机
					PORTH &= ~(1<<PH6);
					PORTH &= ~(1<<PH3);
					PORTH |= (1<<PH4);						  
  			//Serial.println("8");    
  		break;
  }
}
void right_step_motor(char step)
{
  switch(step)
  {
  	case 0://A+:1,A-:0  B+:0,B-:0 					  
					PORTC |= (1<<PC2);//右电机
					PORTC &= ~(1<<PC3);
					PORTC &= ~(1<<PC0);
					PORTC |=  (1<<PC1);
  			//Serial.println("1");
  		break;
  	case 1://A+:1,A-:0  B+:1,B-:0
					PORTC &= ~(1<<PC2);//右电机
					PORTC &= ~(1<<PC3);
					PORTC &= ~(1<<PC0);
					PORTC |=  (1<<PC1);					  
  			//Serial.println("2");
  		break;
  	case 2://A+:0,A-:0  B+:1,B-:0					  
					PORTC &= ~(1<<PC2);//右电机
					PORTC |=  (1<<PC3);
					PORTC &= ~(1<<PC0);
					PORTC |=  (1<<PC1); 
  			//Serial.println("3");      
  		break;
  	case 3://A+:0,A-:1  B+:1,B-:0
					PORTC &= ~(1<<PC2);//右电机
					PORTC |=  (1<<PC3);
					PORTC &= ~(1<<PC0);
					PORTC &= ~(1<<PC1);					  
  			//Serial.println("4");  
  		break;
  	case 4://A+:0,A-:1  B+:0,B-:0 
					PORTC &= ~(1<<PC2);//右电机
					PORTC |=  (1<<PC3);
					PORTC |=  (1<<PC0);
					PORTC &= ~(1<<PC1);						  
  			//Serial.println("5");   
  		break;
  	case 5://A+:0,A-:1  B+:0,B-:1 	
					PORTC &= ~(1<<PC2);//右电机
					PORTC &= ~(1<<PC3);
					PORTC |=  (1<<PC0);
					PORTC &= ~(1<<PC1);						  
  			//Serial.println("6");   
  		break;
  	case 6://A+:0,A-:0  B+:0,B-:1
					PORTC |= (1<< PC2);//右电机
					PORTC &= ~(1<<PC3);
					PORTC |=  (1<<PC0);
					PORTC &= ~(1<<PC1);						  
  			//Serial.println("7");    
  		break;
  		case 7://A+:1,A-:0  B+:0,B-:1
					PORTC |= (1<< PC2);//右电机
					PORTC &= ~(1<<PC3);
					PORTC &= ~(1<<PC0);
					PORTC &= ~(1<<PC1);							  
  			//Serial.println("8");    
  		break;
  }
}
//4 step
void forward_1(char step)
{
   switch(step)
  {
  	case 0://A+:1,A-:0  B+:0,B-:0 
					PORTH |= (1<<PH5);//左电机
					PORTH &= ~(1<<PH6);
					PORTH &= ~(1<<PH3);
					PORTH &= ~(1<<PH4);
					
					PORTC |= (1<<PC2);//右电机
					PORTC &= ~(1<<PC3);
					PORTC &= ~(1<<PC0);
					PORTC |=  (1<<PC1);
  			//Serial.println("1");
  		break;
  	case 1://A+:1,A-:0  B+:1,B-:0
					PORTC &= ~(1<<PC2);//右电机
					PORTC &= ~(1<<PC3);
					PORTC &= ~(1<<PC0);
					PORTC |=  (1<<PC1);
					
					PORTH |= (1<<PH5);//左电机
					PORTH &= ~(1<<PH6);						  
					PORTH |= (1<<PH3);
					PORTH &= ~(1<<PH4);						  
  			//Serial.println("2");
  		break;
  	case 2://A+:0,A-:0  B+:1,B-:0
					PORTH &= ~(1<<PH5);//左电机
					PORTH &= ~(1<<PH6);
					PORTH |= (1<<PH3);
					PORTH &= ~(1<<PH4);
					
					PORTC &= ~(1<<PC2);//右电机
					PORTC |=  (1<<PC3);
					PORTC &= ~(1<<PC0);
					PORTC |=  (1<<PC1); 
  			//Serial.println("3");      
  		break;
  	case 3://A+:0,A-:1  B+:1,B-:0
					PORTC &= ~(1<<PC2);//右电机
					PORTC |=  (1<<PC3);
					PORTC &= ~(1<<PC0);
					PORTC &= ~(1<<PC1);

					PORTH &= ~(1<<PH5);//左电机
					PORTH |=  (1<<PH6);
					PORTH |=  (1<<PH3);
					PORTH &= ~(1<<PH4);						  
  			//Serial.println("4");  
  		break;
  	case 4://A+:0,A-:1  B+:0,B-:0
					PORTH &= ~(1<<PH5);//左电机
					PORTH |=  (1<<PH6);
					PORTH &= ~(1<<PH3);
					PORTH &= ~(1<<PH4);

					PORTC &= ~(1<<PC2);//右电机
					PORTC |=  (1<<PC3);
					PORTC |=  (1<<PC0);
					PORTC &= ~(1<<PC1);						  
  			//Serial.println("5");   
  		break;
  	case 5://A+:0,A-:1  B+:0,B-:1 	
					PORTC &= ~(1<<PC2);//右电机
					PORTC &= ~(1<<PC3);
					PORTC |=  (1<<PC0);
					PORTC &= ~(1<<PC1);	

					PORTH &= ~(1<<PH5);//左电机
					PORTH |= (1<<PH6);
					PORTH &= ~(1<<PH3);
					PORTH |= (1<<PH4);						  
  			//Serial.println("6");   
  		break;
  	case 6://A+:0,A-:0  B+:0,B-:1
					PORTH &= ~(1<<PH5);//左电机
					PORTH &= ~(1<<PH6);
					PORTH &= ~(1<<PH3);
					PORTH |= (1<<PH4);

					PORTC |= (1<< PC2);//右电机
					PORTC &= ~(1<<PC3);
					PORTC |=  (1<<PC0);
					PORTC &= ~(1<<PC1);						  
  			//Serial.println("7");    
  		break;
  		case 7://A+:1,A-:0  B+:0,B-:1
					PORTC |= (1<< PC2);//右电机
					PORTC &= ~(1<<PC3);
					PORTC &= ~(1<<PC0);
					PORTC &= ~(1<<PC1);	

					PORTH |= (1<<PH5);//左电机
					PORTH &= ~(1<<PH6);
					PORTH &= ~(1<<PH3);
					PORTH |= (1<<PH4);						  
  			//Serial.println("8");    
  		break;
  }
}