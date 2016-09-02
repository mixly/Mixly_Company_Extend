 /*
Nova_DHTxx

Serial port will print Humidity and Temperature.

Created 15 Dec 2015
By Blue

http://easy.cc
*/

#include <Nova.h>

DHT dht = DHT(A0); // A0、A1、A2、A3、S0、S1、S2、S3 

void setup() {
Serial.begin(9600);
Serial.println("DHTxx test!");
}

void loop() {
    float h = dht.readHumidity(); //get Humidity 
    float t = dht.readTemperature(); //get Temperature
    if (isnan(t) || isnan(h))
    {
        Serial.println("Failed to read from DHT");
    }
    else
    {
        Serial.print("Humidity: ");
        Serial.print(h);
        Serial.print(" %\t");
        Serial.print("Temperature: ");
        Serial.print(t);
        Serial.println(" *C");
    }
}
