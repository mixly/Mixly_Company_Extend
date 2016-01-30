/****************************************************************
 * ReadSHT2x
 *  An example sketch that reads the sensor and prints the
 *  relative humidity to the PC's serial port
 *
 *  Tested with:
 *    - SHT21-Breakout Humidity sensor from Modern Device
 *    - SHT2x-Breakout Humidity sensor from MisensO Electronics
 ***************************************************************/

#include <Wire.h>
#include <SHT2x.h>


void setup()
{
  Wire.begin();
  Serial.begin(9600);
}

void loop()
{
  Serial.print("Humidity(%RH): ");
  Serial.print(SHT2x.GetHumidity());
  Serial.print("     Temperature(C): ");
  Serial.println(SHT2x.GetTemperature());
  
  delay(1000);
}

