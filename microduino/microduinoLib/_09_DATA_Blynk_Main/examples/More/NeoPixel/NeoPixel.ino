/**************************************************************
   Blynk is a platform with iOS and Android apps to control
   Arduino, Raspberry Pi and the likes over the Internet.
   You can easily build graphic interfaces for all your
   projects by simply dragging and dropping widgets.

     Downloads, docs, tutorials: http://www.blynk.cc
     Blynk community:            http://community.blynk.cc
     Social networks:            http://www.fb.com/blynkapp
                                 http://twitter.com/blynk_app

   Blynk library is licensed under MIT license
   This example code is in public domain.

 **************************************************************
   Control a color gradient on NeoPixel strip using a slider!

   For this example you need NeoPixel library:
     https://github.com/adafruit/Adafruit_NeoPixel

   App dashboard setup:
     Slider widget (0...500) on V1

 **************************************************************/

#define BLYNK_PRINT Serial
#include <ESP8266_HardSer.h>
#include <BlynkSimpleShieldEsp8266_HardSer.h>
#include <Adafruit_NeoPixel.h>

// Set ESP8266 Serial object
#define EspSerial Serial1

ESP8266 wifi(EspSerial);

#define PIN A0

Adafruit_NeoPixel strip = Adafruit_NeoPixel(6, PIN, NEO_GRB + NEO_KHZ800);

// You should get Auth Token in the Blynk App.
// Go to the Project Settings (nut icon).
char auth[] = "2798b5c7be0b4c2280354afdac75f5ed";

void setup()
{
  Serial.begin(9600);
  // Set ESP8266 baud rate
  EspSerial.begin(115200);
  delay(10);

  Blynk.begin(auth, wifi, "Makermodule", "microduino");
  strip.begin();
  strip.show();
}

BLYNK_WRITE(V1)
{
  colorWipe(strip.Color(param[0].asInt(), param[1].asInt(), param[2].asInt()));
  strip.show();
}

void loop()
{
  Blynk.run();
}

// Fill the dots one after the other with a color
void colorWipe(uint32_t c)
{
  for (uint16_t i = 0; i < strip.numPixels(); i++)
  {
    strip.setPixelColor(i, c);
  }
  strip.show();
}