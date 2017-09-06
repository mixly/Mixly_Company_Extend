'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.mCookie_Audio_Serial = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var DEVICE = this.getFieldValue('PIN1');
  var MODE = this.getFieldValue('PIN2');
  var Volce = Blockly.Arduino.valueToCode(this, 'Vol', Blockly.Arduino.ORDER_ATOMIC);

  Blockly.Arduino.definitions_['define_Software'] = '#include <SoftwareSerial.h>\n';
  Blockly.Arduino.definitions_['define_JQ6500'] = '#include "JQ6500.h"\n';

  
  if(dropdown_pin=='core+') {
      Blockly.Arduino.definitions_['define_audioSerial'] = 'JQ6500 AUDIO(&Serial1);';
  } else {
    Blockly.Arduino.definitions_['define_SoftwareSerial'] = 'SoftwareSerial audioSerial(2,3);';
    Blockly.Arduino.definitions_['define_audioSerial'] = 'JQ6500 AUDIO(&audioSerial);';
  }
  //Blockly.Arduino.setups_['setup_mCookie_Serial'] = 'Serial.begin(9600);';
  //Blockly.Arduino.setups_['setup_mCookie_MODE'] = 'AUDIO.init('+DEVICE+','+MODE+','+Volce+');';
  var AudioInit='AUDIO.init('+DEVICE+','+MODE+','+Volce+');\n';
  AudioInit+='AUDIO.choose(1);\n';
  AudioInit+='AUDIO.pause();\n';

  Blockly.Arduino.setups_['setup_Audio_Init'] = AudioInit;

  var code='';
  return code;
};

Blockly.Arduino.mCookie_Audio_Play = function() {
  var code='AUDIO.play();\n';
  return code;
};
Blockly.Arduino.mCookie_Audio_Pose = function() {
  var code='AUDIO.pause();\n';
  return code;
};
Blockly.Arduino.mCookie_Audio_Next = function() {
  var code='AUDIO.next();\n';
  return code;
};
Blockly.Arduino.mCookie_Audio_Prev = function() {
  var code='AUDIO.prev();\n';
  return code;
};
Blockly.Arduino.mCookie_Audio_VolUp = function() {
  var code='AUDIO.volUp();\n';
  return code;
};
Blockly.Arduino.mCookie_Audio_VolDown = function() {
  var code='AUDIO.volDown();\n';
  return code;
};



Blockly.Arduino.mCookie_Audio_Control = function() {

  var getType = this.getFieldValue('getType');

  var code='AUDIO.'+getType+';';

  return code;
};

Blockly.Arduino.mCookie_Audio_Choose = function() {
  var audioNumber = Blockly.Arduino.valueToCode(this, 'audioNumber', Blockly.Arduino.ORDER_ATOMIC);

  var code='';
  code+='AUDIO.choose('+audioNumber+');\n';

  return code;
};