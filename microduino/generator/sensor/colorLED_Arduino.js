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

  var code='strip.setPixelColor('+LEDNumber+'-1, '+hexToRgb(colorRGB)+');\n';
  code+='strip.show();\n'

  return code;
};


Blockly.Arduino.ws2812DoingRGB = function() {

  var LEDNumber = Blockly.Arduino.valueToCode(this, 'LEDIndex', Blockly.Arduino.ORDER_ATOMIC)

  var red = Blockly.Arduino.valueToCode(this, 'red', Blockly.Arduino.ORDER_ATOMIC)
  var green = Blockly.Arduino.valueToCode(this, 'green', Blockly.Arduino.ORDER_ATOMIC)
  var blue = Blockly.Arduino.valueToCode(this, 'blue', Blockly.Arduino.ORDER_ATOMIC)

  var code='strip.setPixelColor('+LEDNumber+'-1, '+red+','+green+','+blue+');\n';
  code+='strip.show();\n'

  return code;
};


Blockly.Arduino.ws2812BreathRGB= function() {

  var LEDNumber = Blockly.Arduino.valueToCode(this, 'LEDIndex', Blockly.Arduino.ORDER_ATOMIC)

  var red = Blockly.Arduino.valueToCode(this, 'red', Blockly.Arduino.ORDER_ATOMIC)
  var green = Blockly.Arduino.valueToCode(this, 'green', Blockly.Arduino.ORDER_ATOMIC)
  var blue = Blockly.Arduino.valueToCode(this, 'blue', Blockly.Arduino.ORDER_ATOMIC)

Blockly.Arduino.definitions_['define_pos_num'] = 'int led_pos = 0,led_num = 1;\n';
Blockly.Arduino.definitions_['define_led_time'] = 'unsigned long led_time = 0;\n';
Blockly.Arduino.definitions_['define_val_max'] = '#define val_max 255\n';
Blockly.Arduino.definitions_['define_val_min'] = '#define val_min 0\n';

var setColor='void colorSet(uint32_t c, int i) {\n';
    setColor+='strip.setPixelColor(i, c);\n';
    setColor+='strip.show();}\n';
Blockly.Arduino.definitions_['define_setColor'] = setColor;

var breath='void breath(int r, int g, int b, int i){\n';
  breath+='if (millis() < led_time) led_time = millis();\n';
  breath+='if (millis() - led_time > 10) {\n';
  breath+='  led_pos += led_num;\n';
  breath+='  if (led_pos >= 255 || led_pos <= 0)\n';
  breath+='    led_num = -led_num;\n';
  breath+='  led_time = millis();}\n';
  breath+='colorSet(strip.Color(map(led_pos, val_min, val_max, 0, r), map(led_pos, val_min, val_max, 0, g), map(led_pos, val_min, val_max, 0, b)), i);}\n';
Blockly.Arduino.definitions_['define_setbreath'] = breath;

var code='breath('+red+','+green+','+blue+','+LEDNumber+'-1);\n';

  return code;
};