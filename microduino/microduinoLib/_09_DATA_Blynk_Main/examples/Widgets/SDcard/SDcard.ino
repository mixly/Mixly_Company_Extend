/**************************************************************
 * Blynk is a platform with iOS and Android apps to control
 * Arduino, Raspberry Pi and the likes over the Internet.
 * You can easily build graphic interfaces for all your
 * projects by simply dragging and dropping widgets.
 *
 *   Downloads, docs, tutorials: http://www.blynk.cc
 *   Blynk community:            http://community.blynk.cc
 *   Social networks:            http://www.fb.com/blynkapp
 *                               http://twitter.com/blynk_app
 *
 * Blynk library is licensed under MIT license
 * This example code is in public domain.
 *
 **************************************************************
 * Browse SD card from phone App
 *
 * App dashboard setup:
 *   SD widget on V1
 *
 **************************************************************/

#define BLYNK_PRINT Serial
#include <ESP8266_HardSer.h>
#include <BlynkSimpleShieldEsp8266_HardSer.h>
#include <SD.h>
#include <WidgetSD.h>

// Set ESP8266 Serial object
#define EspSerial Serial1

ESP8266 wifi(EspSerial);

// You should get Auth Token in the Blynk App.
// Go to the Project Settings (nut icon).
char auth[] = "YourAuthToken";

WidgetSD sd;

BLYNK_ATTACH_WIDGET(sd, 1)

void setup()
{
  Serial.begin(9600);

  // Arduino Ethernet shield: pin 4
  // Adafruit SD shields and modules: pin 10
  // Sparkfun SD shield: pin 8
  // Microduino SD module: pin 7
  const int sdChipSelect = 7;

  // Pin 10 (or 53 on Mega) should stay output - read SD examples for details
  //pinMode(SS, OUTPUT);

  // Disable the W5100 and init SD
  //digitalWrite(10, HIGH);
  if (!SD.begin(sdChipSelect)) {
    BLYNK_FATAL("SD init failed!");
  }

  // Set ESP8266 baud rate
  EspSerial.begin(115200);
  delay(10);

  Blynk.begin(auth, wifi, "Makermodule", "microduino");
}

void loop()
{
  Blynk.run();
}

