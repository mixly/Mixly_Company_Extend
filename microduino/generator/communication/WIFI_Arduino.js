'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');



Blockly.Arduino.WiFi = function() {
  var SSID = this.getFieldValue('SSID');
  var WiFiPASS = this.getFieldValue('WiFiPASS');
  var HOST_NAME = this.getFieldValue('HOST_NAME');
  var HOST_PORT = this.getFieldValue('HOST_PORT');
  var WEBPAGE = this.getFieldValue('WEBPAGE');


  var branch = Blockly.Arduino.statementToCode(this, 'WiFiInput');

  var WiFiDefine='#include "ESP8266.h"\n';
  WiFiDefine+='#define SSID "'+SSID+'"\n';
  WiFiDefine+='#define PASSWORD "'+WiFiPASS+'"\n';
  WiFiDefine+='#define HOST_NAME "'+HOST_NAME+'"\n';
  WiFiDefine+='#define HOST_PORT ('+HOST_PORT+')\n';
  WiFiDefine+='#define WEBPAGE "'+WEBPAGE+'"\n';
  WiFiDefine+='ESP8266 wifi(Serial1);\n';
  WiFiDefine+='String postString;\n';

  Blockly.Arduino.definitions_['var_WiFiDefine'] = WiFiDefine;





  var WiFiInit='Serial.println("setup begin");\n';
  WiFiInit+='Serial.print("FW Version:");\n';
  WiFiInit+='Serial.println(wifi.getVersion().c_str());\n';
  WiFiInit+='if (wifi.setOprToStationSoftAP()) {\n';
  WiFiInit+=' Serial.println("to station + softap ok");\n';
  WiFiInit+='} else {\n';
  WiFiInit+=' Serial.println("to station + softap err");\n';
  WiFiInit+='}\n';
  WiFiInit+='if (wifi.joinAP(SSID, PASSWORD)) {\n';
  WiFiInit+=' Serial.println("Join AP success");\n';
  WiFiInit+=' Serial.print("IP:");\n';
  WiFiInit+=' Serial.println( wifi.getLocalIP().c_str());\n';
  WiFiInit+='} else {\n';
  WiFiInit+=' Serial.println("Join AP failure");\n';
  WiFiInit+='}\n';
  WiFiInit+='if (wifi.disableMUX()) {\n';
  WiFiInit+=' Serial.println("single ok");\n';
  WiFiInit+='} else {\n';
  WiFiInit+=' Serial.println("single err");\n';
  WiFiInit+='}\n';
  WiFiInit+='Serial.println("setup end");\n';

  Blockly.Arduino.setups_['setup_WiFiInit'] = WiFiInit;






  var code="uint8_t buffer[1024] = {0};\n";
  code+='if (wifi.createTCP(HOST_NAME, HOST_PORT)) {\n';
  code+=' Serial.println("create tcp ok");\n';
  code+='} else {\n';
  code+=' Serial.println("create tcp err");\n';
  code+='}\n';

  code+='postString="GET ";\n';
  code+='postString+=WEBPAGE;\n';
  code+='postString+=" HTTP/1.1";\n';
  code+='postString+="\\r\\n";\n';
  code+='postString+="Host: "; \n';
  code+='postString+=HOST_NAME;\n';
  code+='postString+="\\r\\n";\n';
  code+='postString+="Connection: close";\n';
  code+='postString+="\\r\\n\\r\\n";\n';


  //code+=branch;


  code+='const char *postArray = postString.c_str();\n';
  code+='Serial.println(postArray);\n';
  code+='wifi.send((const uint8_t*)postArray, strlen(postArray));\n';
  code+='uint32_t len = wifi.recv(buffer, sizeof(buffer), 10000);\n';
  code+='if (len > 0) {\n';
  code+=' Serial.print("Received:[");\n';
  code+=' for(uint32_t i = 0; i < len; i++) {\n';
  code+='   Serial.print((char)buffer[i]);\n';
  code+=' }\n';
  code+=' Serial.println("]");\n';
  code+='}\n';
  code+='if (wifi.releaseTCP()) {\n';
  code+=' Serial.println("release tcp ok");\n';
  code+='} else {\n';
  code+=' Serial.println("release tcp err");\n';
  code+='}\n';
  code+='while(1);\n';
  

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