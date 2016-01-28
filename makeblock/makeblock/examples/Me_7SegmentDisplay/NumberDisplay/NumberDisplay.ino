#include "Makeblock.h"
#include <Wire.h>
#include <SoftwareSerial.h>

Me7SegmentDisplay disp(PORT_6);
int i=0;
void setup() {
  
}
void loop() {
	if(i>100){
		i=0;
	}
	disp.display(i++);
}

