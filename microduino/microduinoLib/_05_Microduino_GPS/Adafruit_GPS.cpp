/***********************************
This is our GPS library

Adafruit invests time and resources providing this open source code,
please support Adafruit and open-source hardware by purchasing
products from Adafruit!

Written by Limor Fried/Ladyada for Adafruit Industries.
BSD license, check license.txt for more information
All text above must be included in any redistribution
****************************************/

#include <Adafruit_GPS.h>

// how long are max NMEA lines to parse?
#define MAXLINELENGTH 120

// we double buffer: read one line in and leave one for the main program
volatile char line1[MAXLINELENGTH];
volatile char line2[MAXLINELENGTH];
// our index into filling the current line
volatile uint8_t lineidx=0;
// pointers to the double buffers
volatile char *currentline;
volatile char *lastline;
volatile boolean recvdflag;
volatile boolean inStandbyMode;


boolean Adafruit_GPS::parse(char *nmea) {
  // do checksum check

  // first look if we even have one
  if (nmea[strlen(nmea)-4] == '*') {
    uint16_t sum = parseHex(nmea[strlen(nmea)-3]) * 16;
    sum += parseHex(nmea[strlen(nmea)-2]);
    
    // check checksum 
    for (uint8_t i=1; i < (strlen(nmea)-4); i++) {
      sum ^= nmea[i];
    }
    if (sum != 0) {
      // bad checksum :(
      //return false;
    }
  }

  // look for a few common sentences
  if (strstr(nmea, "$GPGGA")) {
    // found GGA
    char *p = nmea;
    // get time
    p = strchr(p, ',')+1;
    float timef = atof(p);
    uint32_t time = timef;
    hour = time / 10000;
    minute = (time % 10000) / 100;
    seconds = (time % 100);

    milliseconds = fmod(timef, 1.0) * 1000;

    // parse out latitude
    p = strchr(p, ',')+1;
    latitude = atof(p);

    p = strchr(p, ',')+1;
    if (p[0] == 'N') lat = 'N';
    else if (p[0] == 'S') lat = 'S';
    else if (p[0] == ',') lat = 0;
    else return false;

    // parse out longitude
    p = strchr(p, ',')+1;
    longitude = atof(p);

    p = strchr(p, ',')+1;
    if (p[0] == 'W') lon = 'W';
    else if (p[0] == 'E') lon = 'E';
    else if (p[0] == ',') lon = 0;
    else return false;

    p = strchr(p, ',')+1;
    fixquality = atoi(p);

    p = strchr(p, ',')+1;
    satellites = atoi(p);

    p = strchr(p, ',')+1;
    HDOP = atof(p);

    p = strchr(p, ',')+1;
    altitude = atof(p);
    p = strchr(p, ',')+1;
    p = strchr(p, ',')+1;
    geoidheight = atof(p);
    return true;
  }
  if (strstr(nmea, "$GPRMC")) {
   // found RMC
    char *p = nmea;

    // get time
    p = strchr(p, ',')+1;
    float timef = atof(p);
    uint32_t time = timef;
    hour = time / 10000;
    minute = (time % 10000) / 100;
    seconds = (time % 100);

    milliseconds = fmod(timef, 1.0) * 1000;

    p = strchr(p, ',')+1;
    // Serial.println(p);
    if (p[0] == 'A') 
      fix = true;
    else if (p[0] == 'V')
      fix = false;
    else
      return false;

    // parse out latitude
    p = strchr(p, ',')+1;
    latitude = atof(p);

    p = strchr(p, ',')+1;
    if (p[0] == 'N') lat = 'N';
    else if (p[0] == 'S') lat = 'S';
    else if (p[0] == ',') lat = 0;
    else return false;

    // parse out longitude
    p = strchr(p, ',')+1;
    longitude = atof(p);

    p = strchr(p, ',')+1;
    if (p[0] == 'W') lon = 'W';
    else if (p[0] == 'E') lon = 'E';
    else if (p[0] == ',') lon = 0;
    else return false;

    // speed
    p = strchr(p, ',')+1;
    speed = atof(p);

    // angle
    p = strchr(p, ',')+1;
    angle = atof(p);

    p = strchr(p, ',')+1;
    uint32_t fulldate = atof(p);
    day = fulldate / 10000;
    month = (fulldate % 10000) / 100;
    year = (fulldate % 100);

    // we dont parse the remaining, yet!
    return true;
  }

  return false;
}

char Adafruit_GPS::read(void) {
  char c = 0;
  
  if (paused) return c;

    if(!gpsHwSerial->available()) return c;
    c = gpsHwSerial->read();

  //Serial.print(c);

  if (c == '$') {
    currentline[lineidx] = 0;
    lineidx = 0;
  }
  if (c == '\n') {
    currentline[lineidx] = 0;

    if (currentline == line1) {
      currentline = line2;
      lastline = line1;
    } else {
      currentline = line1;
      lastline = line2;
    }

    //Serial.println("----");
    //Serial.println((char *)lastline);
    //Serial.println("----");
    lineidx = 0;
    recvdflag = true;
  }

  currentline[lineidx++] = c;
  if (lineidx >= MAXLINELENGTH)
    lineidx = MAXLINELENGTH-1;

  return c;
}

// Constructor when using HardwareSerial
Adafruit_GPS::Adafruit_GPS(HardwareSerial *ser) {
  common_init();  // Set everything to common state, then...
  gpsHwSerial = ser; // ...override gpsHwSerial with value passed.
}

// Initialization code used by all constructor types
void Adafruit_GPS::common_init(void) {
  gpsHwSerial = NULL; // port pointer in corresponding constructor
  recvdflag   = false;
  paused      = false;
  lineidx     = 0;
  currentline = line1;
  lastline    = line2;

  hour = minute = seconds = year = month = day =
    fixquality = satellites = 0; // uint8_t
  lat = lon = mag = 0; // char
  fix = false; // boolean
  milliseconds = 0; // uint16_t
  latitude = longitude = geoidheight = altitude =
    speed = angle = magvariation = HDOP = 0.0; // float
}

void Adafruit_GPS::begin(uint16_t baud)
{
  gpsHwSerial->begin(4800);
  delay(20);
  set_baud(baud);

  gpsHwSerial->begin(9600);
  delay(20);
  set_baud(baud);

  gpsHwSerial->begin(19200);
  delay(20);
  set_baud(baud);

  gpsHwSerial->begin(38400);
  delay(20);
  set_baud(baud);

  gpsHwSerial->begin(57600);
  delay(20);
  set_baud(baud);

  gpsHwSerial->begin(115200);
  delay(20);
  set_baud(baud);
  
  gpsHwSerial->begin(baud);
  delay(20);
}

boolean Adafruit_GPS::newNMEAreceived(void) {
  return recvdflag;
}

void Adafruit_GPS::pause(boolean p) {
  paused = p;
}

char *Adafruit_GPS::lastNMEA(void) {
  recvdflag = false;
  return (char *)lastline;
}

// read a Hex value and return the decimal equivalent
uint8_t Adafruit_GPS::parseHex(char c) {
    if (c < '0')
      return 0;
    if (c <= '9')
      return c - '0';
    if (c < 'A')
       return 0;
    if (c <= 'F')
       return (c - 'A')+10;
}

void Adafruit_GPS::set_config(int _set_config)
{
  byte UBLOX_SET_CONFIG_DEFAULT[]={0xB5,0x62,0x06,0x09,0x0D,0x00,0xFF,0xFF,0x00,0x00,0x00,0x00,0x00,0x00,0xFF,0xFF,0x00,0x00,0x03,0x1B,0x9A};
  byte UBLOX_SET_CONFIG_SAVE[]={0xB5,0x62,0x06,0x09,0x0D,0x00,0x00,0x00,0x00,0x00,0xFF,0xFF,0x00,0x00,0x00,0x00,0x00,0x00,0x03,0x1D,0xAB};

  switch(_set_config)
  {
  case 0:
  gpsHwSerial->write(UBLOX_SET_CONFIG_DEFAULT,22);  
  break;
  case 1:
  gpsHwSerial->write(UBLOX_SET_CONFIG_SAVE,22);  
  break;
  }
  delay(100);
}

void Adafruit_GPS::set_updata(int _set_updata)
{
  // different commands to set the update rate from once a second (1 Hz) to 10 times a second (10Hz)
  byte UBLOX_SET_UPDATE_1HZ[]={0xB5,0x62,0x06,0x08,0x06,0x00,0xE8,0x03,0x01,0x00,0x01,0x00,0x01,0x39};
  byte UBLOX_SET_UPDATE_2HZ[]={0xB5,0x62,0x06,0x08,0x06,0x00,0xF4,0x01,0x01,0x00,0x01,0x00,0x0B,0x77};
  byte UBLOX_SET_UPDATE_4HZ[]={0xB5,0x62,0x06,0x08,0x06,0x00,0xFA,0x00,0x01,0x00,0x01,0x00,0x10,0x96};
  byte UBLOX_SET_UPDATE_5HZ[]={0xB5,0x62,0x06,0x08,0x06,0x00,0xC8,0x00,0x01,0x00,0x01,0x00,0xDE,0x6A};

  switch(_set_updata)
  {
  case 0:
	gpsHwSerial->write(UBLOX_SET_UPDATE_1HZ,15);
	break;
  case 1:
	gpsHwSerial->write(UBLOX_SET_UPDATE_2HZ,15);
	break;
  case 2:
	gpsHwSerial->write(UBLOX_SET_UPDATE_4HZ,15);
	break;
  case 3:
	gpsHwSerial->write(UBLOX_SET_UPDATE_5HZ,15);
	break;  
  }
  delay(50);
}

void Adafruit_GPS::set_baud(int _set_baud)
{
  byte UBLOX_SET_BAUD_9600[]={0xB5,0x62,0x06,0x00,0x14,0x00,0x01,0x00,0x00,0x00,0xD0,0x08,0x00,0x00,0x80,0x25,0x00,0x00,0x07,0x00,0x03,0x00,0x00,0x00,0x00,0x00,0xA2,0xB5};
  byte UBLOX_SET_BAUD_19200[]={0xB5,0x62,0x06,0x00,0x14,0x00,0x01,0x00,0x00,0x00,0xD0,0x08,0x00,0x00,0x00,0x4B,0x00,0x00,0x07,0x00,0x03,0x00,0x00,0x00,0x00,0x00,0x48,0x57};
  byte UBLOX_SET_BAUD_38400[]={0xB5,0x62,0x06,0x00,0x14,0x00,0x01,0x00,0x00,0x00,0xD0,0x08,0x00,0x00,0x00,0x96,0x00,0x00,0x07,0x00,0x03,0x00,0x00,0x00,0x00,0x00,0x93,0x90};
  byte UBLOX_SET_BAUD_57600[]={0xB5,0x62,0x06,0x00,0x14,0x00,0x01,0x00,0x00,0x00,0xD0,0x08,0x00,0x00,0x00,0xE1,0x00,0x00,0x07,0x00,0x03,0x00,0x00,0x00,0x00,0x00,0xDE,0xC9};
  byte UBLOX_SET_BAUD_115200[]={0xB5,0x62,0x06,0x00,0x14,0x00,0x01,0x00,0x00,0x00,0xD0,0x08,0x00,0x00,0x00,0xC2,0x01,0x00,0x07,0x00,0x03,0x00,0x00,0x00,0x00,0x00,0xC0,0x7E};

  switch(_set_baud)
  {
  case 9600:
	gpsHwSerial->write(UBLOX_SET_BAUD_9600,28);
	break;
  case 19200:
	gpsHwSerial->write(UBLOX_SET_BAUD_19200,28);
	break;
  case 38400:
	gpsHwSerial->write(UBLOX_SET_BAUD_38400,28);
	break;
  case 57600:
	gpsHwSerial->write(UBLOX_SET_BAUD_57600,28);
	break;  
  case 115200:
	gpsHwSerial->write(UBLOX_SET_BAUD_115200,28);
	break;  
  }  
  delay(50);
}

void Adafruit_GPS::set_cnssmode(int _set_cnssmode)
{
  //GPS+SBAS
  byte UBLOX_SET_CNSSMODE_1[]={0xB5,0x62,0x06,0x3E,0x2C,0x00,0x00,0x00,0x20,0x05,0x00,0x08,0x10,0x00,0x01,0x00,0x01,0x01,0x01,0x01,0x03,0x00,0x01,0x00,0x01,0x01,0x03,0x08,0x10,0x00,0x00,0x00,0x01,0x01,0x05,0x00,0x03,0x00,0x00,0x00,0x01,0x01,0x06,0x08,0x0E,0x00,0x00,0x00,0x01,0x01,0xFD,0x2D};
  //BEIDOU+SBAS
  byte UBLOX_SET_CNSSMODE_2[]={0xB5,0x62,0x06,0x3E,0x2C,0x00,0x00,0x00,0x20,0x05,0x00,0x08,0x10,0x00,0x00,0x00,0x01,0x01,0x01,0x01,0x03,0x00,0x01,0x00,0x01,0x01,0x03,0x08,0x10,0x00,0x01,0x00,0x01,0x01,0x05,0x00,0x03,0x00,0x00,0x00,0x01,0x01,0x06,0x08,0x0E,0x00,0x00,0x00,0x01,0x01,0xFD,0x1D};
  //QZSS+SBAS
  byte UBLOX_SET_CNSSMODE_3[]={0xB5,0x62,0x06,0x3E,0x2C,0x00,0x00,0x00,0x20,0x05,0x00,0x08,0x10,0x00,0x00,0x00,0x01,0x01,0x01,0x01,0x03,0x00,0x01,0x00,0x01,0x01,0x03,0x08,0x10,0x00,0x00,0x00,0x01,0x01,0x05,0x00,0x03,0x00,0x01,0x00,0x01,0x01,0x06,0x08,0x0E,0x00,0x00,0x00,0x01,0x01,0xFD,0x15};
  //GLONASS+SBAS
  byte UBLOX_SET_CNSSMODE_4[]={0xB5,0x62,0x06,0x3E,0x2C,0x00,0x00,0x00,0x20,0x05,0x00,0x08,0x10,0x00,0x00,0x00,0x01,0x01,0x01,0x01,0x03,0x00,0x01,0x00,0x01,0x01,0x03,0x08,0x10,0x00,0x00,0x00,0x01,0x01,0x05,0x00,0x03,0x00,0x00,0x00,0x01,0x01,0x06,0x08,0x0E,0x00,0x01,0x00,0x01,0x01,0xFD,0x0D};

  switch(_set_cnssmode)
  {
  case 1:
	gpsHwSerial->write(UBLOX_SET_CNSSMODE_1,52);
	break;
  case 2:
	gpsHwSerial->write(UBLOX_SET_CNSSMODE_2,52);
	break;
  case 3:
	gpsHwSerial->write(UBLOX_SET_CNSSMODE_3,52);
	break;
  case 4:
	gpsHwSerial->write(UBLOX_SET_CNSSMODE_4,52);
	break;  
  }
  delay(50);
}


void Adafruit_GPS::set_powermode(int _set_powermode)
{
  byte UBLOX_SET_POWERMODE_0[]={0xB5,0x62,0x06,0x11,0x02,0x00,0x08,0x00,0x21,0x91,0xB5,0x62,0x06,0x09,0x0D,0x00,0x00,0x00,0x00,0x00,0xFF,0xFF,0x00,0x00,0x00,0x00,0x00,0x00,0x07,0x21,0xAF};
  byte UBLOX_SET_POWERMODE_1[]={0xB5,0x62,0x06,0x11,0x02,0x00,0x08,0x01,0x22,0x92,0xB5,0x62,0x06,0x09,0x0D,0x00,0x00,0x00,0x00,0x00,0xFF,0xFF,0x00,0x00,0x00,0x00,0x00,0x00,0x07,0x21,0xAF};

  switch(_set_powermode)
  {
  case 0:
	gpsHwSerial->write(UBLOX_SET_POWERMODE_0,31);
	break;
  case 1:
	gpsHwSerial->write(UBLOX_SET_POWERMODE_1,31);
	break;
  }
  delay(50);
}