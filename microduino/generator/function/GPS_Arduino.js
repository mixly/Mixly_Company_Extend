'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');



Blockly.Arduino.GPS = function() {
  var GPSUPDATE = this.getFieldValue('GPSUPDATE');

  var branch = Blockly.Arduino.statementToCode(this, 'GPSInput');

  var gpsDefine='#include <Adafruit_GPS.h>\n';
  gpsDefine+='#include <SoftwareSerial.h>\n';
  gpsDefine+='Adafruit_GPS GPS(&Serial1);\n';
  gpsDefine+='#define GPSUPDATE '+GPSUPDATE+'\n';
  gpsDefine+='uint32_t gpsTimer = millis();\n';

  Blockly.Arduino.definitions_['var_GPSDefine'] = gpsDefine;

  var gpsInit='GPS.begin(38400);\n';
  gpsInit+='GPS.set_powermode(CONTINUOUS);\n';
  gpsInit+='GPS.set_updata(UPDATE_2HZ);\n';
  gpsInit+='GPS.set_config(CONFIG_SAVE);\n';

  Blockly.Arduino.setups_['setup_GPSInit'] = gpsInit;



  var code="char c = GPS.read();\n";
  code+='if (GPS.newNMEAreceived()) {\n';
  code+='	if (!GPS.parse(GPS.lastNMEA()))\n';
  code+='		return;\n';
  code+='}\n';
  code+='\n';
  code+='if (gpsTimer > millis()) gpsTimer = millis();\n';
  code+='if (millis() - gpsTimer > GPSUPDATE*1000) {\n';
  code+='gpsTimer = millis();\n';


  code+=branch;


  code+='}\n';
  code+='\n';
  code+='\n';
  

  //return [code, Blockly.Arduino.ORDER_ATOMIC];
  return code;
};



Blockly.Arduino.GPSShow = function() {

  var GPSHour = Blockly.Arduino.valueToCode(this, 'GPSHour', Blockly.Arduino.ORDER_ATOMIC)
  var GPSMinute = Blockly.Arduino.valueToCode(this, 'GPSMinute', Blockly.Arduino.ORDER_ATOMIC)
  var GPSSeconds = Blockly.Arduino.valueToCode(this, 'GPSSeconds', Blockly.Arduino.ORDER_ATOMIC)
  var GPSDay = Blockly.Arduino.valueToCode(this, 'GPSDay', Blockly.Arduino.ORDER_ATOMIC)
  var GPSMonth = Blockly.Arduino.valueToCode(this, 'GPSMonth', Blockly.Arduino.ORDER_ATOMIC)
  var GPSYear = Blockly.Arduino.valueToCode(this, 'GPSYear', Blockly.Arduino.ORDER_ATOMIC)
  var GPSFix = Blockly.Arduino.valueToCode(this, 'GPSFix', Blockly.Arduino.ORDER_ATOMIC)
  var GPSQuality = Blockly.Arduino.valueToCode(this, 'GPSQuality', Blockly.Arduino.ORDER_ATOMIC)
  var GPSLatitude = Blockly.Arduino.valueToCode(this, 'GPSLatitude', Blockly.Arduino.ORDER_ATOMIC)
  var GPSLat = Blockly.Arduino.valueToCode(this, 'GPSLat', Blockly.Arduino.ORDER_ATOMIC)
  var GPSLongitude = Blockly.Arduino.valueToCode(this, 'GPSLongitude', Blockly.Arduino.ORDER_ATOMIC)
  var GPSLon = Blockly.Arduino.valueToCode(this, 'GPSLon', Blockly.Arduino.ORDER_ATOMIC)
  var GPSSpeed = Blockly.Arduino.valueToCode(this, 'GPSSpeed', Blockly.Arduino.ORDER_ATOMIC)
  var GPSAngle = Blockly.Arduino.valueToCode(this, 'GPSAngle', Blockly.Arduino.ORDER_ATOMIC)
  var GPSAltitude = Blockly.Arduino.valueToCode(this, 'GPSAltitude', Blockly.Arduino.ORDER_ATOMIC)
  var GPSSatellites = Blockly.Arduino.valueToCode(this, 'GPSSatellites', Blockly.Arduino.ORDER_ATOMIC)




  var code='Serial.println();\n';

  code+='Serial.print("Time: ");\n';
  code+='Serial.print('+GPSHour+', DEC); \n';
  code+='Serial.print(":");\n';
  code+='Serial.print('+GPSMinute+', DEC); \n';
  code+='Serial.print(":");\n';
  code+='Serial.println('+GPSSeconds+', DEC); \n';
  code+='Serial.print("Date: ");\n';
  code+='Serial.print('+GPSDay+', DEC); \n';
  code+='Serial.print("/");\n';
  code+='Serial.print('+GPSMonth+', DEC); \n';
  code+='Serial.print("/20");\n';
  code+='Serial.println('+GPSYear+', DEC);\n';
  code+='Serial.print("Fix: ");\n';
  code+='Serial.print((int)'+GPSFix+');\n';
  code+='Serial.print(" quality: "); \n';
  code+='Serial.println((int)'+GPSQuality+');\n';
  code+='if ('+GPSFix+') {\n';
  code+=' Serial.print("Location: ");\n';
  code+=' Serial.print('+GPSLatitude+', 4);\n';
  code+=' Serial.print('+GPSLat+');\n';
  code+=' Serial.print(", ");\n';
  code+=' Serial.print('+GPSLongitude+', 4);\n';
  code+=' Serial.println('+GPSLon+');\n';
  code+=' Serial.print("Speed (knots): "); \n';
  code+=' Serial.println('+GPSSpeed+');\n';
  code+=' Serial.print("Angle: "); \n';
  code+=' Serial.println('+GPSAngle+');\n';
  code+=' Serial.print("Altitude: ");\n';
  code+=' Serial.println('+GPSAltitude+');\n';
  code+=' Serial.print("Satellites: "); \n';
  code+=' Serial.println((int)'+GPSSatellites+');\n';
  code+='}\n';

  return code;
};




Blockly.Arduino.GPSHour = function() {
  var code="GPS.hour";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.GPSMinute = function() {
  var code="GPS.minute";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.GPSSeconds = function() {
  var code="GPS.seconds";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.GPSDay = function() {
  var code="GPS.day";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.GPSMonth = function() {
  var code="GPS.month";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.GPSYear = function() {
  var code="GPS.year";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.GPSFix = function() {
  var code="GPS.fix";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.GPSQuality = function() {
  var code="GPS.fixquality";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.GPSLatitude = function() {
  var code="GPS.latitude";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.GPSLat = function() {
  var code="GPS.lat";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.GPSLongitude = function() {
  var code="GPS.longitude";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.GPSLon = function() {
  var code="GPS.lon";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.GPSSpeed = function() {
  var code="GPS.speed";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.GPSAngle = function() {
  var code="GPS.angle";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.GPSAltitude = function() {
  var code="GPS.altitude";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.GPSSatellites = function() {
  var code="GPS.satellites";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};