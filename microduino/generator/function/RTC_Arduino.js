'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');




Blockly.Arduino.mCookie_RTC_time = function() {

  var rtcDefineInit='';
  rtcDefineInit+='#include <Rtc_Pcf8563.h>\n';
  rtcDefineInit+='Rtc_Pcf8563 rtc;\n';
  Blockly.Arduino.definitions_['define_RTC_Init'] = rtcDefineInit;

  var rtcBegin='';
  rtcBegin+='rtc.begin();\n';

  Blockly.Arduino.setups_['setup_RTC_time_begin'] = rtcBegin;

  var code='';
  code+='rtc.formatTime();\n';
  code+='rtc.formatDate();\n';
  code+='dateTime = rtc.getDateTime();\n';

  return code;
};




Blockly.Arduino.mCookie_RTC_set = function() {
	var Year = Blockly.Arduino.valueToCode(this, 'Year', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var Mouth = Blockly.Arduino.valueToCode(this, 'Mouth', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var Day = Blockly.Arduino.valueToCode(this, 'Day', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var Week = Blockly.Arduino.valueToCode(this, 'Week', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var Hour = Blockly.Arduino.valueToCode(this, 'Hour', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var Minute = Blockly.Arduino.valueToCode(this, 'Minute', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var Second = Blockly.Arduino.valueToCode(this, 'Second', Blockly.Arduino.ORDER_ATOMIC) || '0';


  var rtcDefineSetInit='';
  // rtcDefineSetInit+='#include <Rtc_Pcf8563.h>\n';
  // rtcDefineSetInit+='Rtc_Pcf8563 rtc;\n';
  rtcDefineSetInit+='DateTime dateTime = {'+Year+', '+Mouth+', '+Day+', '+Week+', '+Hour+', '+Minute+', '+Second+'};\n';
  Blockly.Arduino.definitions_['define_RTC_SetInit'] = rtcDefineSetInit;


  var rtcSetup='';
  // rtcSetup+='rtc.begin();\n';
  rtcSetup+='rtc.clearAll();\n';
  rtcSetup+='rtc.setDateTime(dateTime);\n';

  Blockly.Arduino.setups_['setup_RTC_time'] = rtcSetup;


  var code='';
  // code+='rtc.formatTime();\n';
  // code+='rtc.formatDate();\n';
  // code+='dateTime = rtc.getDateTime();\n';

  return code;
};




Blockly.Arduino.mCookie_RTC_date = function() {

  var code='rtc.formatDate()';
  return [code, Blockly.Arduino.ORDER_ATOMIC]|| 'String(\"\")';
  //return code;
};



Blockly.Arduino.mCookie_RTC_Week = function() {
  var code='rtc.getWeekday()';
  return [code, Blockly.Arduino.ORDER_ATOMIC]|| '0';
};

Blockly.Arduino.mCookie_RTC_Hour = function() {
  var code='rtc.getHour()';
  return [code, Blockly.Arduino.ORDER_ATOMIC]|| '0';
};

Blockly.Arduino.mCookie_RTC_Minute = function() {
  var code='rtc.getMinute()';
  return [code, Blockly.Arduino.ORDER_ATOMIC]|| '0';
};

Blockly.Arduino.mCookie_RTC_Second = function() {
  var code='rtc.getSecond()';
  return [code, Blockly.Arduino.ORDER_ATOMIC]|| '0';
};


Blockly.Arduino.mCookie_RTC_Output = function() {

  var getType = this.getFieldValue('getType');
  var code='dateTime.'+getType;
  return [code, Blockly.Arduino.ORDER_ATOMIC]|| '0';
};