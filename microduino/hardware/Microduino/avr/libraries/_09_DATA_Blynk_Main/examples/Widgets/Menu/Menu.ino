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
 * This example shows how to use the Menu Widget.
 *
 * App project setup:
 *   Menu widget attached to V1 (put 3 items in it)
 *
 **************************************************************/

#define BLYNK_PRINT Serial    // Comment this out to disable prints and save space
#include <ESP8266_HardSer.h>
#include <BlynkSimpleShieldEsp8266_HardSer.h>
#include <SimpleTimer.h>

// Set ESP8266 Serial object
#define EspSerial Serial1

ESP8266 wifi(EspSerial);

char auth[] = "YourAuthToken"; // Put your Auth Token here. (see Step 3 above)

void setup()
{
  Serial.begin(9600); // See the connection status in Serial Monitor
  // Set ESP8266 baud rate
  EspSerial.begin(115200);
  delay(10);

  Blynk.begin(auth, wifi, "Makermodule", "microduino");

  while (Blynk.connect() == false) {
    // Wait until connected
  }
  Blynk.begin(auth);
}

BLYNK_WRITE(V1) {
  switch (param.asInt())
  {
    case 1: { // Item 1
      Serial.println("Item 1 selected");
      break;
    }
    case 2: { // Item 2
      Serial.println("Item 2 selected");
      break;
    }
    case 3: { // Item 3
      Serial.println("Item 3 selected");
      break;
    }
    default: {
      Serial.println("Unknown item selected");
    }
  }
}

void loop()
{
  Blynk.run(); // All the Blynk Magic happens here...

  // You can inject your own code or combine it with other sketches.
  // Check other examples on how to communicate with Blynk. Remember
  // to avoid delay() function!
}

