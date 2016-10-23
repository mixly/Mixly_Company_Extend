'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');


Blockly.Arduino.Microduino_ir_remote_begin = function() {
var btn_ir = this.getTitleValue('btn');
var ir_r_Pin = Blockly.Arduino.valueToCode(this, 'Pin', Blockly.Arduino.ORDER_ATOMIC)|| '0';
Blockly.Arduino.definitions_['IRremote'] = '#include <IRremote.h>';
Blockly.Arduino.definitions_['RECV_PIN'] = 'IRrecv irrecv('+ir_r_Pin+');';
Blockly.Arduino.definitions_['results'] = 'decode_results results;\n';
//Blockly.Arduino.setups_['setup_mCookie_Serial'] = 'Serial.begin(9600);';
Blockly.Arduino.setups_['setup_irrecv'] = 'irrecv.enableIRIn();';

var code='if (irrecv.decode(&results)) {\n'
+'irrecv.resume();\n'
+'Serial.println(results.value, HEX);\n'
+'}\n'

return [code, Blockly.Arduino.ORDER_ATOMIC]||'0';
};

Blockly.Arduino.Microduino_ir_remote = function() {
var btn_ir = this.getTitleValue('btn');
Blockly.Arduino.definitions_['IRremote'] = '#include <IRremote.h>';
Blockly.Arduino.definitions_['results'] = 'decode_results results;\n';
//Blockly.Arduino.setups_['setup_mCookie_Serial'] = 'Serial.begin(9600);';
Blockly.Arduino.setups_['setup_irrecv'] = 'irrecv.enableIRIn();';

var code="results.value=="+btn_ir;
/*
var code='if (irrecv.decode(&results)) {\n'
+'irrecv.resume();\n'
+'Serial.println(results.value, HEX);\n'
+'}\n'
*/
return [code, Blockly.Arduino.ORDER_ATOMIC]||'0';
};

Blockly.Arduino.IRSend = function() {
  var Type = this.getFieldValue('TYPE');
  var IRContent = this.getFieldValue('IRCONTENT');
  var IRLength = this.getFieldValue('IRLENGTH');

Blockly.Arduino.definitions_['IRremotes'] = '#include <IRremote.h>';
Blockly.Arduino.definitions_['IR define'] = 'IRsend irsend;\n';
//Blockly.Arduino.setups_['setup_Serial'] = 'Serial.begin(9600);';


var code='  if (Serial.read() != -1) {\n';
if(Type=='Sony')
	code+='      irsend.sendSony('+IRContent+', '+IRLength+'); \n      delay(100);\n';
else if(Type=='NEC')
	code+='      irsend.sendNEC('+IRContent+', '+IRLength+'); \n      delay(100);\n';
else if(Type=='RC5')
	code+='      irsend.sendRC5('+IRContent+', '+IRLength+'); \n      delay(100);\n';
else if(Type=='RC6')
	code+='      irsend.sendRC6('+IRContent+', '+IRLength+'); \n      delay(100);\n';
code+='}\n';
return [code, Blockly.Arduino.ORDER_ATOMIC]||'0';
};
