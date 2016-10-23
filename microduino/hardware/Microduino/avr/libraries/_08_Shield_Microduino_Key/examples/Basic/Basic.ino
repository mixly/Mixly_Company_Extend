#include <Microduino_Key.h>

Key KeyA(A0, INPUT_PULLUP);
Key KeyB(A2, INPUT);

void setup(){
  Serial.begin(9600);
}

void loop(){
	switch(KeyA.read()){
		case SHORT_PRESS:
		Serial.println("KEY A(digital) SHORT_PRESS"); 	//短按
		break;
		case LONG_PRESS:
		Serial.println("KEY A(digital) LONG_PRESS");    //长按
		break;
	}

	switch(KeyB.read(500, 530)){
		case SHORT_PRESS:
		Serial.println("KEY B(analog) SHORT_PRESS"); 	//短按
		break;
		case LONG_PRESS:
		Serial.println("KEY B(analog) LONG_PRESS");    //长按
		break;
	}

	delay(15);
}