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
 * You can use this sketch as a debug tool that prints all incoming values
 * sent by a widget connected to a Virtual Pin 1 in the Blynk App.
 *
 * App dashboard setup:
 *   Slider widget (0...100) on V1
 *
 **************************************************************/

#define BLYNK_PRINT Serial
#include <ESP8266_HardSer.h>
#include <BlynkSimpleShieldEsp8266_HardSer.h>

// Set ESP8266 Serial object
#define EspSerial Serial1

ESP8266 wifi(EspSerial);

// You should get Auth Token in the Blynk App.
// Go to the Project Settings (nut icon).
char auth[] = "YourAuthToken";

void setup()
{
  Serial.begin(9600);
  // Set ESP8266 baud rate
  EspSerial.begin(115200);
  delay(10);

  Blynk.begin(auth, wifi, "Makermodule", "microduino");
}

// This function will be called every time
// when App writes value to Virtual Pin 1
BLYNK_WRITE(V1)
{
  BLYNK_LOG("Got a value: %s", param.asStr());
  // You can also use:
  // int i = param.asInt() or
  // double d = param.asDouble()
}

void loop()
{
  Blynk.run();
}

