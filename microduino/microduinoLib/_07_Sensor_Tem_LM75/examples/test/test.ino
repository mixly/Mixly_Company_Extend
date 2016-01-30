/*
 Copyright © 2014 José Luis Zabalza  License LGPLv3+: GNU
 LGPL version 3 or later <http://www.gnu.org/copyleft/lgpl.html>.
 This is free software: you are free to change and redistribute it.
 There is NO WARRANTY, to the extent permitted by law.
*/


#define VERSION "1.1"

#include <inttypes.h>
#include <Wire.h>

#include <lm75.h>

TempI2C_LM75 termo = TempI2C_LM75(0x48,TempI2C_LM75::nine_bits);


void setup()
{
    Serial.begin(9600);
    Serial.println("Start");

    Serial.print("Actual temp ");
    Serial.print(termo.getTemp());
    Serial.println(" oC");

    Serial.print("Set resolution to ten bits ");
    termo.setResolution(TempI2C_LM75::ten_bits);
    delay(2000);

    Serial.print("Actual temp ");
    Serial.print(termo.getTemp());
    Serial.println(" oC");

    Serial.print("Set resolution to eleven bits ");
    termo.setResolution(TempI2C_LM75::eleven_bits);
    delay(2000);

    Serial.print("Actual temp ");
    Serial.print(termo.getTemp());
    Serial.println(" oC");

    Serial.print("Set resolution to twelve bits ");
    termo.setResolution(TempI2C_LM75::twelve_bits);
    delay(2000);

    Serial.print("Actual temp ");
    Serial.print(termo.getTemp());
    Serial.println(" oC");

    Serial.print("Set resolution to nine bits ");
    termo.setResolution(TempI2C_LM75::nine_bits);
    delay(2000);

    Serial.print("Actual temp ");
    Serial.print(termo.getTemp());
    Serial.println(" oC");

    Serial.print("Initial termostat range [");

    Serial.print("THyst = ");
    Serial.print(termo.getTHyst());
    Serial.print(" oC  TOS = ");
    Serial.print(termo.getTOS());
    Serial.println(" oC]");

    Serial.print("Set THyst to 25 oC [");
    termo.setTHyst(25);

    Serial.print("THyst = ");
    Serial.print(termo.getTHyst());
    Serial.print(" oC TOS = ");
    Serial.print(termo.getTOS());
    Serial.println(" oC]");

    Serial.print("Set TOS to 30 oC [");
    termo.setTOS(30);

    Serial.print("THyst = ");
    Serial.print(termo.getTHyst());
    Serial.print(" oC TOS = ");
    Serial.print(termo.getTOS());
    Serial.println(" oC]");

    Serial.print("Actual Termostat mode = ");
    Serial.println(termo.getTermostatMode());

    Serial.print("Set to interrumpt mode = ");
    termo.setTermostatMode(TempI2C_LM75::interrupt_mode);
    Serial.println(termo.getTermostatMode());

    Serial.print("Turn to comparation mode = ");
    termo.setTermostatMode(TempI2C_LM75::comparator_mode);
    Serial.println(termo.getTermostatMode());


    Serial.print("Actual Termostat Fault tolerance = ");
    Serial.println(termo.getTermostatFaultTolerance());

    Serial.print("Set Fault tolerance to  four samples = ");
    termo.setTermostatFaultTolerance(TempI2C_LM75::four_samples);
    Serial.println(termo.getTermostatFaultTolerance());

    Serial.print("Turn Fault tolerance to one sample = ");
    termo.setTermostatFaultTolerance(TempI2C_LM75::one_samples);
    Serial.println(termo.getTermostatFaultTolerance());


    Serial.print("Actual OS Polarity = ");
    Serial.println(termo.getOSPolarity());

    Serial.print("Set OS Polarity to active High = ");
    termo.setOSPolarity(TempI2C_LM75::active_high);
    Serial.println(termo.getOSPolarity());

    Serial.print("Turn OS Polarity to active low = ");
    termo.setOSPolarity(TempI2C_LM75::active_low);
    Serial.println(termo.getOSPolarity());

}

void loop()
{
    Serial.print(termo.getTemp());
    Serial.println(" oC");
    delay(5000);
}
