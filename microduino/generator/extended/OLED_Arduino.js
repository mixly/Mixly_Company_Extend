'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.group_lcd_begin = function() {
  var branch = Blockly.Arduino.statementToCode(this, 'DO');

  Blockly.Arduino.definitions_['define_oled'] = '#include "U8glib.h"';

  var defineOled='U8GLIB_SSD1306_128X64 u8g(U8G_I2C_OPT_NONE);\n';
  defineOled+='#define setFont_L u8g.setFont(u8g_font_fur25)\n';
  defineOled+='#define setFont_M u8g.setFont(u8g_font_fixed_v0r)\n';
  defineOled+='#define setFont_S u8g.setFont(u8g_font_chikitar)\n';

  
  Blockly.Arduino.definitions_['var_oled'] = defineOled;


  var flip = this.getFieldValue('FLIP');
  var code='u8g.'+flip+'();\n';
  code+='u8g.firstPage();\n'
  code+='do {\n';
  code+=branch;
  code+='} while( u8g.nextPage() );\n';
  return code;
};

Blockly.Arduino.group_lcd_print = function() {
  var str = Blockly.Arduino.valueToCode(this, 'text', Blockly.Arduino.ORDER_ATOMIC) || 'String(\"\")'
  var x = Blockly.Arduino.valueToCode(this, 'x', Blockly.Arduino.ORDER_ATOMIC)
  var y = Blockly.Arduino.valueToCode(this, 'y', Blockly.Arduino.ORDER_ATOMIC)
  //Blockly.Arduino.definitions_['define_oled'] = '#include "U8glib.h"';
  //Blockly.Arduino.definitions_['var_oled'] = 'U8GLIB_SSD1306_128X64 oled(U8G_I2C_OPT_NONE);';
//  Blockly.Arduino.setups_['setup_oled'] = 'df_lcd.init();';
//  Blockly.Arduino.setups_['setup_oled'] = 'df_lcd.backlight();';
  var type = this.getFieldValue('TYPE');
  //var code='oled.setFont('+type+');\n';
  var code=type+';\n';
	code+='u8g.setPrintPos('+x+', '+y+');\n';
	code+='u8g.print('+str+');\n';
  return code;
};
