/****************************************************************************/
//
// This sketch demonstrates the main functions of the TCS3414 library.
// TCS3414Lib is an Arduino library to communicate to and obtain values from
// the TCS3414 RGB color sensor.
//
// Copyright (C) 2014, J.F. Omhover (jf.omhover@gmail.com)
//
// This file is part of TCS3414Lib
//
// TCS3414Lib is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// TCS3414Lib is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with TCS3414Lib.  If not, see <http://www.gnu.org/licenses/>.
//
/******************************************************************************/

#include <Arduino.h>
#include <Wire.h>
#include "TCS3414Lib.h"

//uint16_t values[4];
uint16_t red,green,blue,clr;

TCS3414 tcs;

void setup() {
  Serial.begin(57600);
  Serial.print("RED\tGREEN\tBLUE\tCLEAR\n");

  Wire.begin();

  tcs.init(TCS3414_FREEMODE);
  tcs.setIntegrationTime(INTEG_PARAM_INTTIME_12MS);
  tcs.setGain(GAIN_1, PRESCALER_1);
  tcs.start();
}

void loop() {
  delay(100);  // normally you should wait at least the equivalent of integration time (set at 12MS above)
  tcs.getRGB(&red, &green, &blue, &clr);
  Serial.print(red, DEC);
  Serial.print("\t");
  Serial.print(green, DEC);
  Serial.print("\t");
  Serial.print(blue, DEC);
  Serial.print("\t");
  Serial.print(clr, DEC);
  Serial.write('\n');
}

