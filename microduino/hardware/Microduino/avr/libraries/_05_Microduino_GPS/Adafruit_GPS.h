/***********************************
This is the Adafruit GPS library - the ultimate GPS library
for the ultimate GPS module!

Tested and works great with the Adafruit Ultimate GPS module
using MTK33x9 chipset
    ------> http://www.adafruit.com/products/746
Pick one up today at the Adafruit electronics shop 
and help support open source hardware & software! -ada

Adafruit invests time and resources providing this open source code, 
please support Adafruit and open-source hardware by purchasing 
products from Adafruit!

Written by Limor Fried/Ladyada  for Adafruit Industries.  
BSD license, check license.txt for more information
All text above must be included in any redistribution
****************************************/

#ifndef _ADAFRUIT_GPS_H
#define _ADAFRUIT_GPS_H

#if ARDUINO >= 100
 #include "Arduino.h"
#else
 #include "WProgram.h"
#endif

#define CONFIG_DEFAULT 0
#define CONFIG_SAVE 1

#define UPDATE_1HZ 0
#define UPDATE_2HZ 1
#define UPDATE_4HZ 2
#define UPDATE_5HZ 3

#define GPS_SBAS 1
#define BEIDOU_SBAS 2
#define QZSS_SBAS 3
#define GLONASS_SBAS 4

#define CONTINUOUS 0
#define POWERSAVE 1

// how long to wait when we're looking for a response
#define MAXWAITSENTENCE 5


class Adafruit_GPS {
 public:
  void begin(uint16_t baud); 

  Adafruit_GPS(HardwareSerial *ser); // Constructor when using HardwareSerial

  char *lastNMEA(void);
  boolean newNMEAreceived();
  void common_init(void);
  void pause(boolean b);

  uint8_t parseHex(char c);

  char read(void);
  boolean parse(char *);

//  boolean wakeup(void);
// boolean standby(void);

  uint8_t hour, minute, seconds, year, month, day;
  uint16_t milliseconds;
  float latitude, longitude, geoidheight, altitude;
  float speed, angle, magvariation, HDOP;
  char lat, lon, mag;
  boolean fix;
  uint8_t fixquality, satellites;


  uint16_t LOCUS_serial, LOCUS_records;
  uint8_t LOCUS_type, LOCUS_mode, LOCUS_config, LOCUS_interval, LOCUS_distance, LOCUS_speed, LOCUS_status, LOCUS_percent;
  
  void set_config(int set_config);
  void set_updata(int _set_updata);
  void set_baud(int _set_baud);
  void set_cnssmode(int _set_cnssmode);
  void set_powermode(int _set_powermode);

 private:
  boolean paused;
  
  uint8_t parseResponse(char *response);
  HardwareSerial *gpsHwSerial;
};


#endif
