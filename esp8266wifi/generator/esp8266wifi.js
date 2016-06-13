'use strict';
goog.provide('Blockly.Arduino.esp8266wifi');
goog.require('Blockly.Arduino');

Blockly.Arduino.esp8266wifi_begin = function() {
  var ssid = Blockly.Arduino.valueToCode(this, 'ssid',Blockly.Arduino.ORDER_ATOMIC);
  var password = Blockly.Arduino.valueToCode(this, 'password', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['define_ESP8266WiFi'] = '#include <ESP8266WiFi.h>';
  Blockly.Arduino.definitions_['var_WiFiClient_wificlient'] = 'WiFiClient wificlient;';
  var code = "WiFi.begin(" + ssid + "," + password +");\n";
  return code;
};

Blockly.Arduino.esp8266wifi_local_ip = function() {
  Blockly.Arduino.definitions_['define_ESP8266WiFi'] = '#include <ESP8266WiFi.h>';
  var code = "WiFi.localIP()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.esp8266wifi_client_connect_host = function() {
  var PORT = Blockly.Arduino.valueToCode(this, 'PORT',Blockly.Arduino.ORDER_ATOMIC);
  var SERVER = Blockly.Arduino.quote_(this.getFieldValue('HOST'));
  var code='wificlient.connect('+SERVER+','+PORT+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.esp8266wifi_client_connected = function() {
  var code = "wificlient.connected()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.esp8266wifi_client_available = function() {
  var code = "wificlient.available()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.esp8266wifi_client_read = function() {
  var code = "wificlient.read()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.esp8266wifi_client_print = function() {
  var TEXT = Blockly.Arduino.valueToCode(this, 'TEXT',Blockly.Arduino.ORDER_ATOMIC)|| '\"\"';
  var code = 'wificlient.print('+TEXT+');\n';
  return code;
};

Blockly.Arduino.esp8266wifi_client_println = function() {
  var TEXT = Blockly.Arduino.valueToCode(this, 'TEXT',Blockly.Arduino.ORDER_ATOMIC)|| '\"\"';
  var code = 'wificlient.println('+TEXT+');\n';
  return code;
};
