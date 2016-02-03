/**
 * @example UDPClientMultiple.ino
 * @brief The UDPClientMultiple demo of library WeeESP8266.
 * @author Wu Pengfei<pengfei.wu@itead.cc>
 * @date 2015.02
 *
 * @par Copyright:
 * Copyright (c) 2015 ITEAD Intelligent Systems Co., Ltd. \n\n
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; either version 2 of
 * the License, or (at your option) any later version. \n\n
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

#include "ESP8266.h"

#define SSID        "Makermodule"
#define PASSWORD    "microduino"
#define HOST_NAME   "pool.ntp.org"
#define HOST_PORT   (123)

ESP8266 wifi(Serial1);

void setup(void)
{
  Serial.begin(115200);
  while (!Serial); // wait for Leonardo enumeration, others continue immediately
  Serial.print("setup begin\r\n");

  Serial.print("FW Version:");
  Serial.println(wifi.getVersion().c_str());

  if (wifi.setOprToStationSoftAP()) {
    Serial.print("to station + softap ok\r\n");
  } else {
    Serial.print("to station + softap err\r\n");
  }

  if (wifi.joinAP(SSID, PASSWORD)) {
    Serial.print("Join AP success\r\n");
    Serial.print("IP: ");
    Serial.println(wifi.getLocalIP().c_str());
  } else {
    Serial.print("Join AP failure\r\n");
  }

  if (wifi.enableMUX()) {
    Serial.print("multiple ok\r\n");
  } else {
    Serial.print("multiple err\r\n");
  }

  Serial.print("setup end\r\n");
}

void loop(void)
{
  uint8_t buffer[128] = {0};
  static uint8_t mux_id = 0;

  if (wifi.registerUDP(mux_id, HOST_NAME, HOST_PORT)) {
    Serial.print("register udp ");
    Serial.print(mux_id);
    Serial.println(" ok");
  } else {
    Serial.print("register udp ");
    Serial.print(mux_id);
    Serial.println(" err");
  }

  static const char PROGMEM
  timeReqA[] = { 227,  0,  6, 236 },
               timeReqB[] = {  49, 78, 49,  52 };
  // Assemble and issue request packet
  uint8_t       buf[48];
  memset(buf, 0, sizeof(buf));
  memcpy_P( buf    , timeReqA, sizeof(timeReqA));
  memcpy_P(&buf[12], timeReqB, sizeof(timeReqB));


  //    char *buf = "Hello, this is client!";
  wifi.send(mux_id, (const uint8_t*)buf, 48);

  uint32_t len = wifi.recv(mux_id, buffer, sizeof(buffer), 10000);
  if (len > 0) {
    Serial.print("Received:[");
    for (uint32_t i = 0; i < len; i++) {
      Serial.print((char)buffer[i]);
      unsigned long t = (((unsigned long)buffer[40] << 24) |
                         ((unsigned long)buffer[41] << 16) |
                         ((unsigned long)buffer[42] <<  8) |
                         (unsigned long)buffer[43]) - 2208988800UL;

      Serial.println(t);
      Serial.print(F("OK\r\n"));

    }
    Serial.print("]\r\n");
  }

  if (wifi.unregisterUDP(mux_id)) {
    Serial.print("unregister udp ");
    Serial.print(mux_id);
    Serial.println(" ok");
  } else {
    Serial.print("unregister udp ");
    Serial.print(mux_id);
    Serial.println(" err");
  }
  delay(5000);
  mux_id++;
  if (mux_id >= 5) {
    mux_id = 0;
  }
}

