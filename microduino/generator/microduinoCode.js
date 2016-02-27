'use strict';
goog.provide('Blockly.Arduino.microduino');
goog.require('Blockly.Arduino');


Blockly.Arduino.ws2812Begin = function() {
  var LEDNumber = Blockly.Arduino.valueToCode(this, 'LEDNumber', Blockly.Arduino.ORDER_ATOMIC)
  var LEDPin = Blockly.Arduino.valueToCode(this, 'LEDPin', Blockly.Arduino.ORDER_ATOMIC)

  Blockly.Arduino.definitions_['define_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
  Blockly.Arduino.definitions_['var_Adafruit_NeoPixel'] = 'Adafruit_NeoPixel strip = Adafruit_NeoPixel('+LEDNumber+', '+LEDPin+', NEO_GRB + NEO_KHZ800);';
  
  Blockly.Arduino.setups_['setup_stripBegin'] = 'strip.begin();';
  Blockly.Arduino.setups_['setup_stripShow'] ='strip.show();';

  var code='';

  return code;
};


Blockly.Arduino.ws2812Doing = function() {

  var LEDNumber = Blockly.Arduino.valueToCode(this, 'LEDIndex', Blockly.Arduino.ORDER_ATOMIC)

  var colorRGB = this.getFieldValue('colorRGB');

  var code='strip.setPixelColor('+LEDNumber+', strip.Color('+hexToRgb(colorRGB)+'));\n';
  code+='strip.show();\n'

  return code;
};
