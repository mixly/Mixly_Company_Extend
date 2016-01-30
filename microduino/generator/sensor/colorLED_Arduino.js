'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');


function hexToRgb(hex) {
    if ( hex.charAt(0) == '#' ) {
      hex = hex.substr(1);
    }
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return r + "," + g + "," + b;
}

Blockly.Arduino.ws2812Begin = function() {
  //var branch = Blockly.Arduino.statementToCode(this, 'DO');

  var LEDNumber = Blockly.Arduino.valueToCode(this, 'LEDNumber', Blockly.Arduino.ORDER_ATOMIC)
  var LEDPin = Blockly.Arduino.valueToCode(this, 'LEDPin', Blockly.Arduino.ORDER_ATOMIC)

  Blockly.Arduino.definitions_['define_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
  Blockly.Arduino.definitions_['var_Adafruit_NeoPixel'] = 'Adafruit_NeoPixel strip = Adafruit_NeoPixel('+LEDNumber+', '+LEDPin+', NEO_GRB + NEO_KHZ800);';
  
  Blockly.Arduino.setups_['setup_stripBegin'] = 'strip.begin();';
  Blockly.Arduino.setups_['setup_stripShow'] ='strip.show();';

  //var flip = this.getFieldValue('FLIP');
  var code='';
  //code+='strip.show();\n'
  // code+='do {\n';
  //code+=branch;
  // code+='} while( oled.nextPage() );\n';

  return code;
};


Blockly.Arduino.ws2812Doing = function() {
  //var branch = Blockly.Arduino.statementToCode(this, 'DO');


  var LEDNumber = Blockly.Arduino.valueToCode(this, 'LEDIndex', Blockly.Arduino.ORDER_ATOMIC)

  var colorRGB = this.getFieldValue('colorRGB');

  var code='strip.setPixelColor('+LEDNumber+', strip.Color('+hexToRgb(colorRGB)+'));\n';
  code+='strip.show();\n'

  return code;
};



