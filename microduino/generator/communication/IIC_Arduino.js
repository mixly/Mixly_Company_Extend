'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');



Blockly.Arduino.microduinoIICSendToSlaver = function() {

  var type = this.getFieldValue('TYPE');

  var numSlaver = Blockly.Arduino.valueToCode(this, 'numSlaver', Blockly.Arduino.ORDER_ATOMIC);
  var numByte = Blockly.Arduino.valueToCode(this, 'numByte', Blockly.Arduino.ORDER_ATOMIC);
  var arrayLength = Blockly.Arduino.valueToCode(this, 'arrayLength', Blockly.Arduino.ORDER_ATOMIC);
  

  Blockly.Arduino.definitions_['Wire'] = '#include <Wire.h>';
  Blockly.Arduino.setups_['Wire'] = 'Wire.begin();';

  var code='';
  code+='Wire.beginTransmission('+numSlaver+');\n';

  if(type=='string') {
    code+='Wire.write('+numByte+',String('+numByte+').length());\n';
  } else {
    code+='Wire.write('+numByte+',sizeof('+numByte+')/sizeof('+numByte+'[0]));\n';
  }

  code+='Wire.endTransmission();\n';
  return code;
};


Blockly.Arduino.microduinoIICRequest = function() {
  var success = Blockly.Arduino.statementToCode(this, 'success');
  var fail = Blockly.Arduino.statementToCode(this, 'fail');
  var numSlaver = Blockly.Arduino.valueToCode(this, 'numSlaver', Blockly.Arduino.ORDER_ATOMIC);
  var numByte = Blockly.Arduino.valueToCode(this, 'numByte', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['Wire'] = '#include <Wire.h>';
  var requireFun='';
  requireFun+='boolean request(int add,int num){\n';
  requireFun+='  boolean b=0;\n';
  requireFun+='  while(Wire.available()>0){\n';
  requireFun+='    int a=0;\n';
  requireFun+='    a=Wire.read();\n';
  requireFun+='  }\n';
  requireFun+='  Wire.requestFrom(add, num);\n';
  requireFun+='  for(int a=0;a<100;a++){\n';
  requireFun+='    if(Wire.available()==num){\n';
  requireFun+='      b=1;\n';
  requireFun+='      a=100;\n';
  requireFun+='    }\n';
  requireFun+='  }\n';
  requireFun+='  return b;\n';
  requireFun+='}\n';
  Blockly.Arduino.definitions_['IICrequireFun'] = requireFun;
  Blockly.Arduino.setups_['Wire'] = 'Wire.begin();';
  var code='';
  code+='  if(request('+numSlaver+','+numByte+')==1){\n';
  code+=success;
  code+='  }\n';
  code+='  else{\n';
  code+=fail;
  code+='  }\n';
  return code;
};


Blockly.Arduino.microduinoIICReadCache = function() {
  Blockly.Arduino.definitions_['Wire'] = '#include <Wire.h>';
  Blockly.Arduino.setups_['Wire'] = 'Wire.begin();';
  var code='';
  code+='Wire.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.microduinoIICCacheLen = function() {
  Blockly.Arduino.definitions_['Wire'] = '#include <Wire.h>';
  Blockly.Arduino.setups_['Wire'] = 'Wire.begin();';
  var code='';
  code+='Wire.available()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.microduinoIMIICSlaver = function() {
  var numSlaver = Blockly.Arduino.valueToCode(this, 'numSlaver', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['Wire'] = '#include <Wire.h>';
  Blockly.Arduino.setups_['WireSlaver'+numSlaver] = 'Wire.begin('+numSlaver+');';
  var code='';
  return code;
};



Blockly.Arduino.reciverIICMasterRequest = function() {
  var requireEventDo = Blockly.Arduino.statementToCode(this, 'requireEventDo');
  Blockly.Arduino.definitions_['Wire'] = '#include <Wire.h>';
  var requestEventFun='';
  requestEventFun+='void requestEvent(){\n';
  requestEventFun+=requireEventDo;
  requestEventFun+='}\n';
  Blockly.Arduino.definitions_['IICrequestEventFun'] = requestEventFun;
  Blockly.Arduino.setups_['WireRequestEvent'] = 'Wire.onRequest(requestEvent);';
  var code='';
  return code;
};


Blockly.Arduino.microduinoIICSendToMaster = function() {
  var type = this.getFieldValue('TYPE');

  var numByte = Blockly.Arduino.valueToCode(this, 'numByte', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['Wire'] = '#include <Wire.h>';
  var code='';
  
  if(type=='string') {
    code+='Wire.write('+numByte+',String('+numByte+').length());\n';
  } else {
    code+='Wire.write('+numByte+',sizeof('+numByte+')/sizeof('+numByte+'[0]));\n';
  }
  return code;
};


Blockly.Arduino.reciverIICMasterData = function() {
  var reciverEventDo = Blockly.Arduino.statementToCode(this, 'reciverEventDo');
  Blockly.Arduino.definitions_['Wire'] = '#include <Wire.h>';
  var reciverEventFun='';
  reciverEventFun+='void receiveEvent(int howMany){\n';
  reciverEventFun+=reciverEventDo;
  reciverEventFun+='}\n';
  Blockly.Arduino.definitions_['IICreciverEventFun'] = reciverEventFun;
  Blockly.Arduino.setups_['WireReciverEvent'] = 'Wire.onReceive(receiveEvent);';
  var code='';
  return code;
};