'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');


Blockly.Arduino.IRSenderCode = function() {

  Blockly.Arduino.definitions_['define_ir_recv'] = '#include <IRremote.h>\n';
  Blockly.Arduino.definitions_['var_ir_send'] = 'IRsend irsend;\n';
  var data = Blockly.Arduino.valueToCode(this, 'data',Blockly.Arduino.ORDER_ATOMIC) || '0';
  var bits = Blockly.Arduino.valueToCode(this, 'bits',Blockly.Arduino.ORDER_ATOMIC) || '0';
  var type = this.getFieldValue('TYPE');
  var code='irsend.send'+type+'('+data+','+bits+');\n';
  return code;
};


Blockly.Arduino.IRSenderRaw = function() {

  Blockly.Arduino.definitions_['define_ir_recv'] = '#include <IRremote.h>\n';
  Blockly.Arduino.definitions_['var_ir_send'] = 'IRsend irsend;\n';
  var length = Blockly.Arduino.valueToCode(this, 'length',Blockly.Arduino.ORDER_ATOMIC) || '0';
  var freq = Blockly.Arduino.valueToCode(this, 'freq',Blockly.Arduino.ORDER_ATOMIC) || '0';
  var text = this.getFieldValue('TEXT');
  var code='unsigned int buf_raw['+length+']={'+text+'};\n'
  code=code+'irsend.sendRaw(buf_raw,'+length+','+freq+');\n';
  return code;
  
};

Blockly.Arduino.IRReciver = function() {
   var variable = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
   Blockly.Arduino.definitions_['var_declare'+variable] = 'long '+variable+';';
   var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
   var branch = Blockly.Arduino.statementToCode(this, 'DO');
   var branch2 = Blockly.Arduino.statementToCode(this, 'DO2');
   var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
   Blockly.Arduino.definitions_['define_ir_recv'] = '#include <IRremote.h>\n';
   //Blockly.Arduino.definitions_['var_declare'+varName] = 'long '+varName+';\n';
   Blockly.Arduino.definitions_['var_ir_recv'+dropdown_pin] = 'IRrecv irrecv_'+dropdown_pin+'('+dropdown_pin+');\ndecode_results results_'+dropdown_pin+';\n';
   Blockly.Arduino.setups_['setup_ir_recv_'+dropdown_pin] = 'irrecv_'+dropdown_pin+'.enableIRIn();';
   var code="if (irrecv_"+dropdown_pin+".decode(&results_"+dropdown_pin+")) {\n"
   code += '  '+variable+'=results_'+dropdown_pin+'.value;\n';
   code += '  String type="UNKNOWN";\n';
   ////////////////////////////////////////////////////////////////
   code += '  String typelist[14]={"UNKNOWN", "NEC", "SONY", "RC5", "RC6", "DISH", "SHARP", "PANASONIC", "JVC", "SANYO", "MITSUBISHI", "SAMSUNG", "LG", "WHYNTER"};\n';
   code += '  if(results_'+dropdown_pin+'.decode_type>=1&&results_'+dropdown_pin+'.decode_type<=13){\n';
   code += '    type=typelist[results_'+dropdown_pin+'.decode_type];\n'
   code += '  }\n';
   ////////////////////////////////////////////////////////////////
   //code += '  switch(results_'+dropdown_pin+'.decode_type) {\n';
   //code += '  case NEC:\n';
   //code += '    type="NEC";\n';
   //code += '    break;\n';
   //code += '  case WHYNTER:\n';
   //code += '    type="WHYNTER";\n';
   //code += '    break;\n';
   //code += '  case SONY:\n';
   //code += '    type="SONY";\n';
   //code += '    break;\n';
   //code += '  case RC5:\n';
   //code += '    type="RC5";\n';
   //code += '    break;\n';
   //code += '  case RC6:\n';
   //code += '    type="RC6";\n';
   //code += '    break;\n';
   //code += '  case DISH:\n';
   //code += '    type="DISH";\n';
   //code += '    break;\n';
   //code += '  case SHARP:\n';
   //code += '    type="SHARP";\n';
   //code += '    break;\n';
   //code += '  case SAMSUNG:\n';
   //code += '    type="SAMSUNG";\n';
   //code += '    break;\n';
   //code += '  default:\n';
   //code += '    type="UNKNOWN";\n';
   //code += '  }\n';
   ////////////////////////////////////////////////////////////////
   code += '  Serial.print("IR TYPE:"+type+"  ");\n';
   code += branch;
   code +='  irrecv_'+dropdown_pin+'.resume();\n'
   code +='} else {\n';
   code +=branch2;
   code +='}\n';
   return code;
};



Blockly.Arduino.IRReciverRaw = function() {
   var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
   Blockly.Arduino.definitions_['define_ir_recv'] = '#include <IRremote.h>\n';
   Blockly.Arduino.definitions_['var_ir_recv'+dropdown_pin] = 'IRrecv irrecv_'+dropdown_pin+'('+dropdown_pin+');\ndecode_results results_'+dropdown_pin+';\n';
   if(Blockly.Arduino.setups_['setup_serial_Serial'+profile.default.serial]){
   }else{
   Blockly.Arduino.setups_['setup_serial_Serial'+profile.default.serial] = 'Serial.begin('+profile.default.serial+');'; 
   }
   Blockly.Arduino.setups_['setup_ir_recv_'+dropdown_pin] = 'irrecv_'+dropdown_pin+'.enableIRIn();\n';
   var code="if (irrecv_"+dropdown_pin+".decode(&results_"+dropdown_pin+")) {\n"
   code += '  '+'dumpRaw(&results_'+dropdown_pin+');\n';
   code +='  irrecv_'+dropdown_pin+'.resume();\n'
   code +='}\n';
   var funcode='void dumpRaw(decode_results *results) {\n' 
  + '  int count = results->rawlen;\n'
  + '  Serial.print("RawData (");\n'
  + '  Serial.print(count, DEC);\n'
  + '  Serial.print("): ");\n'
  + '  for (int i = 0; i < count; i++) {\n'
  + '    Serial.print(results->rawbuf[i]*USECPERTICK, DEC);\n'
  + '    if(i!=count-1){\n'
  + '      Serial.print(",");\n'
  + '    }\n'
  + '  }\n'
  + '  Serial.println("");\n'
  + '}\n';
   Blockly.Arduino.definitions_['dumpRaw'] = funcode;
   return code;
};



Blockly.Arduino.IRReciverEnable = function() {
   var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
   var code='';
    code+='irrecv_'+dropdown_pin+'.enableIRIn(); \n';
   return code;
};