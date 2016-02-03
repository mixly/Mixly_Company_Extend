#include <Adafruit_GPS.h>
#include <SoftwareSerial.h>
Adafruit_GPS GPS(&Serial1);

void setup()
{
  Serial.begin(115200);

  GPS.begin(38400);  //9600/19200/38400/57600/115200
  //GPS.set_cnssmode(GPS_SBAS);  //GPS_SBAS/BEIDOU_SBAS(only NEO-M8N)/QZSS_SBAS/GLONASS_SBAS
  //GPS.set_powermode(CONTINUOUS);  //CONTINUOUS/POWERSAVE
  GPS.set_updata(UPDATE_2HZ);  //UPDATE_1HZ/UPDATE_2HZ/UPDATE_4HZ/UPDATE_5HZ
  GPS.set_config(CONFIG_SAVE);  //CONFIG_DEFAULT/CONFIG_SAVE
}

void loop() // run over and over again
{
  if (Serial1.available()) {
    char c = Serial1.read();
    Serial.write(c);
  }
}

