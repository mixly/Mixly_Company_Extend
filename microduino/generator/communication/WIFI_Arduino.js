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



Blockly.Arduino.WiFiBlynk = function() {
  var SSID = this.getFieldValue('SSID');
  var WiFiPASS = this.getFieldValue('WiFiPASS');
  var authToken = this.getFieldValue('authToken');

  //var branch = Blockly.Arduino.statementToCode(this, 'WiFiInput');

  // var WiFiDefine='#define BLYNK_PRINT Serial\n';
  // WiFiDefine+='#include <ESP8266_HardSer.h>\n';
  // WiFiDefine+='#include <BlynkSimpleShieldEsp8266_HardSer.h>\n';
  
  // WiFiDefine+='#define EspSerial Serial1\n';
  // WiFiDefine+='ESP8266 wifi(EspSerial);\n';
  // WiFiDefine+='char auth[] = "'+authToken+'";\n';
  // WiFiDefine+='\n';
  // WiFiDefine+='\n';

    /*********************test******************************/
  var  WiFiDefine='#include <ESP8266_HardSer.h>\n';
  WiFiDefine+='#include <BlynkSimpleShieldEsp8266_HardSer.h>\n';
  WiFiDefine+='#if defined(__AVR_ATmega32U4__)\n';
  WiFiDefine+='#define BLYNK_PRINT Serial\n';
  WiFiDefine+='#define EspSerial Serial1\n';
  WiFiDefine+='#else if defined(__AVR_ATmega328P__) || (__AVR_ATmega1284P__) || defined(__AVR_ATmega644P__) || defined(__AVR_ATmega128RFA1__)\n';
  WiFiDefine+='#include <SoftwareSerial.h>\n';
  WiFiDefine+='SoftwareSerial mySerial(2, 3); // RX, TX\n';
  WiFiDefine+='#define BLYNK_PRINT mySerial\n';
  WiFiDefine+='#define EspSerial Serial\n';
  WiFiDefine+='#endif\n';
  WiFiDefine+='ESP8266 wifi(EspSerial);\n';
  WiFiDefine+='char auth[] = "'+authToken+'";\n';
  WiFiDefine+='\n';
  WiFiDefine+='\n';
  /*********************test^*****************************/

  Blockly.Arduino.definitions_['var_WiFiBlynkDefine'] = WiFiDefine;

  var WiFiInit='EspSerial.begin(115200);\n';
  WiFiInit+='delay(10);\n';
  WiFiInit+='Blynk.begin(auth, wifi, "'+SSID+'", "'+WiFiPASS+'");\n';
  Blockly.Arduino.setups_['setup_WiFiBlynkInit'] = WiFiInit;


  var code='Blynk.run();\n';
  code+='\n';
  //code+=branch;
  code+='\n';
  
  //return [code, Blockly.Arduino.ORDER_ATOMIC];
  return code;
};


Blockly.Arduino.BLYNK_READ = function() {
  var virtualPort = this.getFieldValue('virtualPort');
  var blynkReadInput = Blockly.Arduino.valueToCode(this, 'blynkReadInput', Blockly.Arduino.ORDER_ATOMIC)
  var BlynkRead='';
  BlynkRead+='BLYNK_READ('+virtualPort+') {\n';
  BlynkRead+='\n';
  BlynkRead+='  Blynk.virtualWrite('+virtualPort+', '+blynkReadInput+');\n';
  BlynkRead+='}\n';
  Blockly.Arduino.definitions_['var_BlynkRead'+virtualPort] = BlynkRead;
  var code='';
  return code;
};

Blockly.Arduino.BLYNK_WRITE = function() {
  var virtualPort = this.getFieldValue('virtualPort');
  //var blynkReadInput = Blockly.Arduino.valueToCode(this, 'blynkReadInput', Blockly.Arduino.ORDER_ATOMIC)
  var branch = Blockly.Arduino.statementToCode(this, 'blynkWriteInput');

  var BlynkWrite='';
  BlynkWrite+='BLYNK_WRITE('+virtualPort+') {\n';
  BlynkWrite+=branch;
  BlynkWrite+='\n';
  BlynkWrite+='}\n';
  Blockly.Arduino.definitions_['var_BlynkWrite'+virtualPort] = BlynkWrite;
  var code='';
  return code;
};

Blockly.Arduino.BLYNKParamOne = function() {
  var paramType = this.getTitleValue('paramType');
  var code='';
  code+='param.'+paramType;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.BLYNKParamArray = function() {
  var paramNum = Blockly.Arduino.valueToCode(this, 'paramNum', Blockly.Arduino.ORDER_ATOMIC)
  var paramType = this.getTitleValue('paramType');
  var code='';
  code+='param['+paramNum+'].'+paramType;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.WiFiBlynkTimer = function() {

  var branch = Blockly.Arduino.statementToCode(this, 'blynkTimerDoing');
  Blockly.Arduino.definitions_['BlynkTimerInclude'] = '#include <SimpleTimer.h>';
  var timerName = this.getTitleValue('timerName');
  var duration = this.getTitleValue('duration');
  
  Blockly.Arduino.definitions_['BlynkTimerDefine'+timerName] = 'SimpleTimer '+timerName+'Timer;';

  Blockly.Arduino.setups_['setup_BlynkTimer'+timerName+'Timer'] = timerName+'Timer.setInterval('+duration+'L, Sender'+timerName+');';

  var timerFun='';
  timerFun+='void Sender'+timerName+'() {\n';
  timerFun+=branch;
  timerFun+='}\n';

  Blockly.Arduino.definitions_['BlynkTimerFunction'+timerName] = timerFun;


  var code='';
  code+=timerName+'Timer.run();\n';
  //return [code, Blockly.Arduino.ORDER_ATOMIC];
  return code;
};



Blockly.Arduino.WiFiBlynkVirtualWrite = function() {
  var virtualPort = this.getFieldValue('virtualPort');
  var senderDataToBlynk = Blockly.Arduino.valueToCode(this, 'senderDataToBlynk', Blockly.Arduino.ORDER_ATOMIC)

  var code='';
  code+='Blynk.virtualWrite('+virtualPort+', '+senderDataToBlynk+');\n';
  return code;
};