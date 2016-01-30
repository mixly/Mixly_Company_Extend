'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.mCookie_RTC_set = function() {
	var Year = Blockly.Arduino.valueToCode(this, 'Year', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var Mouth = Blockly.Arduino.valueToCode(this, 'Mouth', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var Day = Blockly.Arduino.valueToCode(this, 'Day', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var Week = Blockly.Arduino.valueToCode(this, 'Week', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var Hour = Blockly.Arduino.valueToCode(this, 'Hour', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var Minute = Blockly.Arduino.valueToCode(this, 'Minute', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var Second = Blockly.Arduino.valueToCode(this, 'Second', Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Arduino.definitions_['define_RTC'] = '#include <Rtc_Pcf8563.h>\n'+'Rtc_Pcf8563 rtc;\n';
  Blockly.Arduino.definitions_['define_Wire'] = '#include "Wire.h"\n';
  Blockly.Arduino.setups_['setup_RTC_data'] = 'rtc.initClock();\n'+'rtc.setDate('+Day+','+Week+','+Mouth+',0,'+Year+');';
  Blockly.Arduino.setups_['setup_RTC_time'] = 'rtc.setTime('+Hour+','+Minute+','+Second+');\n'+'Serial.begin(9600);\n';

	};
Blockly.Arduino.mCookie_RTC_date = function() {

  Blockly.Arduino.definitions_['define_RTC'] = '#include <Rtc_Pcf8563.h>\n'+'Rtc_Pcf8563 rtc;\n';
  Blockly.Arduino.definitions_['define_Wire'] = '#include "Wire.h"\n';
  Blockly.Arduino.setups_['setup_Serial'] ='Serial.begin(9600);\n';
  var code='rtc.formatDate(RTCC_DATE_US)'
  return [code, Blockly.Arduino.ORDER_ATOMIC]|| 'String(\"\")';
};

Blockly.Arduino.mCookie_RTC_time = function() {

  Blockly.Arduino.definitions_['define_RTC'] = '#include <Rtc_Pcf8563.h>\n'+'Rtc_Pcf8563 rtc;\n';
  Blockly.Arduino.definitions_['define_Wire'] = '#include "Wire.h"\n';
  Blockly.Arduino.setups_['setup_Serial'] ='Serial.begin(9600);\n';
  var code='rtc.formatTime(RTCC_TIME_HMS)'
  return [code, Blockly.Arduino.ORDER_ATOMIC]|| 'String(\"\")';
};

Blockly.Arduino.mCookie_RTC_Week = function() {

  Blockly.Arduino.definitions_['define_RTC'] = '#include <Rtc_Pcf8563.h>\n'+'Rtc_Pcf8563 rtc;\n';
  Blockly.Arduino.definitions_['define_Wire'] = '#include "Wire.h"\n';
  Blockly.Arduino.setups_['setup_Serial'] ='Serial.begin(9600);\n';
  var code='rtc.getWeekday()'
  return [code, Blockly.Arduino.ORDER_ATOMIC]|| '0';
};

Blockly.Arduino.mCookie_RTC_Hour = function() {

  Blockly.Arduino.definitions_['define_RTC'] = '#include <Rtc_Pcf8563.h>\n'+'Rtc_Pcf8563 rtc;\n';
  Blockly.Arduino.definitions_['define_Wire'] = '#include "Wire.h"\n';
  Blockly.Arduino.setups_['setup_Serial'] ='Serial.begin(9600);\n';
  var code='rtc.getHour()'
  return [code, Blockly.Arduino.ORDER_ATOMIC]|| '0';
};

Blockly.Arduino.mCookie_RTC_Minute = function() {

  Blockly.Arduino.definitions_['define_RTC'] = '#include <Rtc_Pcf8563.h>\n'+'Rtc_Pcf8563 rtc;\n';
  Blockly.Arduino.definitions_['define_Wire'] = '#include "Wire.h"\n';
  Blockly.Arduino.setups_['setup_Serial'] ='Serial.begin(9600);\n';
  var code='rtc.getMinute()'
  return [code, Blockly.Arduino.ORDER_ATOMIC]|| '0';
};

Blockly.Arduino.mCookie_RTC_Second = function() {

  Blockly.Arduino.definitions_['define_RTC'] = '#include <Rtc_Pcf8563.h>\n'+'Rtc_Pcf8563 rtc;\n';
  Blockly.Arduino.definitions_['define_Wire'] = '#include "Wire.h"\n';
  Blockly.Arduino.setups_['setup_Serial'] ='Serial.begin(9600);\n';
  var code='rtc.getSecond()'
  return [code, Blockly.Arduino.ORDER_ATOMIC]|| '0';
};
