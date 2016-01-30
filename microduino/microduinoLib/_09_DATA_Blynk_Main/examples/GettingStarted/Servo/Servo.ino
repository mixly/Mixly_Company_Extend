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
 * Rotate a servo using a slider!
 *
 * App dashboard setup:
 *   Slider widget (0...180) on V3
 *
 **************************************************************/

#define BLYNK_PRINT Serial
#include <ESP8266_HardSer.h>
#include <BlynkSimpleShieldEsp8266_HardSer.h>
#include <Servo.h>

// Set ESP8266 Serial object
#define EspSerial Serial1

ESP8266 wifi(EspSerial);

// You should get Auth Token in the Blynk App.
// Go to the Project Settings (nut icon).
char auth[] = "YourAuthToken";

Servo servo;

void setup()
{
  Serial.begin(9600); // See the connection status in Serial Monitor
  // Set ESP8266 baud rate
  EspSerial.begin(115200);
  delay(10);

  Blynk.begin(auth, wifi, "Makermodule", "microduino");
  servo.attach(9);
}

BLYNK_WRITE(V3)
{
  servo.write(param.asInt());
}

void loop()
{
  Blynk.run();
}

