/*
        Author Ilya ilyxa Tyshchenko
        Site: http://www.nest.org.ru/tag/Arduino
        e-mail: arduino@nest.org.ru
*/

#include <PPMint.h>

//BEGIN
// only one instance allowed - some hack here
static PPMint *pclass = 0;
void ppmInterrupt() {// dummy function
  if (pclass) 
		pclass->PPMinterrupt();
}
//END

PPMint::PPMint() {
} //PPMint

void PPMint::setup() {
        realRaw[_CHA_NUM];
        prevRealRaw[_CHA_NUM];
        currentChannel=0;
        lastms = 0;
        sync = false;

        pinMode(_PPM_PIN,INPUT);
        pclass=this; //create an pointer to func
        attachInterrupt(_PPM_INT,ppmInterrupt,RISING);
        while(!sync) {
                delay(100);
        }
}


void PPMint::PPMinterrupt() { //here real work to come ;)
	long nowms = micros();
	diffms = nowms - lastms;
	if(lastms>0) {
		if(diffms>5000) {
			sync = true;
			currentChannel = 0;
		} 
	else {
		if(sync) {
				if(diffms<=2000 && diffms>=1000) {
					realRaw[currentChannel] = diffms;
				}
			currentChannel++;
			}
		}
	}
	lastms = nowms;
}//PPMinterrupt
