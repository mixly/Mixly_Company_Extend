'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.ColorDetPrepare_TCS3414 = function() {

  var TCS3414Include="#include <TCS3414Lib.h>\n";
  TCS3414Include+="#include <Wire.h>\n";
  TCS3414Include+="#define colorSUM 3\n";

  Blockly.Arduino.definitions_['var_TCS3414Include'] = TCS3414Include;

  var TCS3414Var='';
  TCS3414Var+='uint8_t redColor,greenColor,blueColor;\n';
  TCS3414Var+='uint16_t redValue, greenValue, blueValue, maxLight;\n';
  TCS3414Var+='TCS3414 tcs;\n';

  Blockly.Arduino.definitions_['var_TCS3414defineVar'] = TCS3414Var;


  var TCS3414Init='';
  TCS3414Init+='Wire.begin();\n';
  TCS3414Init+='tcs.init(TCS3414_FREEMODE);\n';
  TCS3414Init+='tcs.setIntegrationTime(INTEG_PARAM_INTTIME_12MS);\n';
  TCS3414Init+='tcs.setGain(GAIN_1, PRESCALER_1);\n';
  TCS3414Init+='tcs.start();\n';
  Blockly.Arduino.setups_['setup_TCS3414Init'] = TCS3414Init;

  var code='\n';

  code+='tcs.getRGB(&redValue, &greenValue, &blueValue, &maxLight);\n';
  code+='redColor = map(redValue, 0, maxLight * colorSUM, 0, 255);\n';
  code+='greenColor = map(greenValue, 0, maxLight * colorSUM, 0, 255);\n';
  code+='blueColor = map(blueValue, 0, maxLight * colorSUM, 0, 255);\n';
  return code;
};


Blockly.Arduino.ColorGet_TCS3414 = function() {
  var getType = this.getTitleValue('getType');
  var code=getType;

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};