'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.Defination = function() {
  //var branch = Blockly.Arduino.statementToCode(this, 'DO');
  var varName = this.getFieldValue('NAME');
  var flip = this.getFieldValue('FLIP');
  var argument0 = Blockly.Arduino.valueToCode(this, 'VALUE',Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  Blockly.Arduino.definitions_['define_NewVariable'+varName+flip] = ''+flip+' '+varName+';';
  Blockly.Arduino.setups_['setup_VariableIs'] = varName + '=' + argument0 + ';\n';

  //var flip = this.getFieldValue('FLIP');
  var code='';
  //code+='strip.show();\n'
  // code+='do {\n';
  //code+=branch;
  // code+='} while( oled.nextPage() );\n';

  return code;
};

Blockly.Arduino.Structure = function() {
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
  var varName = this.getFieldValue('Struct_NAME');
  var varName2 = this.getFieldValue('Struct_DEF');
  Blockly.Arduino.definitions_['define_Struct'] = 'struct '+''+varName+'\n'
  +'{\n'
  +branch
  +'}';


  //var flip = this.getFieldValue('FLIP');
  var code=''+varName+' '+varName2+';\n';
  //code+='strip.show();\n'
  // code+='do {\n';
  //code+=branch;
  // code+='} while( oled.nextPage() );\n';

  return code;
};


Blockly.Arduino.Var_Definations = function() {
  //var branch = Blockly.Arduino.statementToCode(this, 'DO');
  var varName = this.getFieldValue('NAME');
  var flip = this.getFieldValue('FLIP');
  //var flip = this.getFieldValue('FLIP');
  var code=flip +' '+ varName+';\n';
  //code+='strip.show();\n'
  // code+='do {\n';
  //code+=branch;
  // code+='} while( oled.nextPage() );\n';

  return code;
};

Blockly.Arduino.Struct_Var_Definations = function() {
  var VARI = Blockly.Arduino.valueToCode(this, 'VARI',Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var Struct_NAME = this.getFieldValue('Struct_NAME');
  var Struct_Member = this.getFieldValue('Struct_Member');

  var code=Struct_NAME +'.'+ Struct_Member+'='+ VARI +';\n';
  //code+='strip.show();\n'
  // code+='do {\n';
  //code+=branch;
  // code+='} while( oled.nextPage() );\n';

  return code;
};

Blockly.Arduino.IntDefine = function() {
  var text_intName = this.getFieldValue('intName');
  // var intValue = Blockly.Arduino.valueToCode(this, 'intValue', Blockly.Arduino.ORDER_ATOMIC) || 'undefined';
  var intValue = Blockly.Arduino.valueToCode(this, 'intValue', Blockly.Arduino.ORDER_ATOMIC);

  Blockly.Arduino.definitions_['var_Int'+text_intName] = 'int '+text_intName+'=0;';

  var code='';
  return code;
};


Blockly.Arduino.BooleanDefine = function() {
  var text_boolName = this.getFieldValue('booleanName');
  // var boolValue = Blockly.Arduino.valueToCode(this, 'booleanValue', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var boolValue = Blockly.Arduino.valueToCode(this, 'booleanValue', Blockly.Arduino.ORDER_ATOMIC);
  
  Blockly.Arduino.definitions_['var_bool'+text_boolName] = 'boolean '+text_boolName+'=false;';

  var code=text_boolName+'='+boolValue;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.melodyBuzzer = function() {

  var melodyFraqance = this.getFieldValue('melodyFraqance');
  var code=melodyFraqance;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.rhythmBuzzer = function() {

  var rhythmNumber = this.getFieldValue('rhythmNumber');
  var code=rhythmNumber;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};




Blockly.Arduino.nrfDataStructDefine = function() {
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
  var define_nrfDataStruct='';
  define_nrfDataStruct+='struct payload_t {\n';
  define_nrfDataStruct+=branch;
  define_nrfDataStruct+='};\n';
  Blockly.Arduino.definitions_['define_nrfDataStruct'] = define_nrfDataStruct;
  var code='';
  return code;
};


Blockly.Arduino.nrfDataMemberDefine = function() {
  var varName = this.getFieldValue('NAME');
  var VALUE = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);
  var flip = this.getFieldValue('FLIP');
  var code=flip +' '+ varName+';\n';
  return code;
};


Blockly.Arduino.nrfDataSender = function() {
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
  var code='';
  code+='payload_t payload = {\n';
  code+=branch;
  code+='};\n';
  return code;
};

Blockly.Arduino.nrfDataMemberSender = function() {
  var VALUE = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);
  var code=VALUE+',\n';
  return code;
};

Blockly.Arduino.nrfDataMemberReciver = function() {
  var Struct_Member = this.getFieldValue('Struct_Member');
  var code='payload.'+ Struct_Member;

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};