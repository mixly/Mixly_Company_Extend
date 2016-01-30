'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.GSM_SMS = function() {
  var TELNUM = this.getFieldValue('TELNUM');
  var str = Blockly.Arduino.valueToCode(this, 'text', Blockly.Arduino.ORDER_ATOMIC) || 'String(\"\")'
  Blockly.Arduino.definitions_['define_include'] = '#include "SIM900.h"\n'
	+'#include <SoftwareSerial.h>\n'
	+'#include "sms.h"\n';
  Blockly.Arduino.definitions_['define_option'] = 'SMSGSM sms;\n'
 	 +'int numdata;\n' 
 	 +'boolean started=false;\n'
 	 +'char smsbuffer[160];\n'
 	 +'char n[20];\n'
 	 +'boolean sendflag=false;\n'
 	 +'char number[20]="+86'+TELNUM+'";';
  Blockly.Arduino.setups_['setup_option'] = 'Serial.begin(9600);\n'
 	 +'Serial.println("GSM Shield testing.");\n';
 
  var code = '     if (gsm.begin(2400)) {\n'
  +'          Serial.println("\nstatus=READY");\n'
  +'          started=true;\n'
  +'     } else Serial.println("\nstatus=IDLE");\n'
  +'    if(Serial.available())\n'
  +'    {\n'
  +'      char c = Serial.read();\n'
  +'      if(c==\'a\')sendflag=true;\n'
  +'    }\n'
  +'     if(started&&sendflag) {\n'
  +'          if (sms.SendSMS(number, "'+str+'"))\n'
  +'          Serial.println("\nSMS sent OK");\n'
  +'          sendflag=0;\n'
  +'          delay(1000);\n'
  +'     }\n'
  +'     if(started) {\n'
  +'          if(gsm.readSMS(smsbuffer, 160, n, 20)) {\n'
  +'               Serial.println(n);\n'
  +'               Serial.println(smsbuffer);\n'
  +'          }\n'
  +'          delay(1000);\n'
  +'     }\n';
  return code;
};