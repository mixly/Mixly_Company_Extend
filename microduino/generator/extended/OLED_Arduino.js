'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.OLED_begin = function() {
  var branch = Blockly.Arduino.statementToCode(this, 'DO');

  Blockly.Arduino.definitions_['define_oled'] = '#include "U8glib.h"';

  var defineOled='U8GLIB_SSD1306_128X64 u8g(U8G_I2C_OPT_NONE);\n';
  defineOled+='#define setFont_L u8g.setFont(u8g_font_fur20)\n';
  defineOled+='#define setFont_S u8g.setFont(u8g_font_fixed_v0r)\n';
  defineOled+='#define setFont_M u8g.setFont(u8g_font_9x18)\n';


  Blockly.Arduino.definitions_['var_oled'] = defineOled;

  var flip = this.getFieldValue('FLIP');
  var code='u8g.'+flip+'();\n';
  code+='u8g.firstPage();\n'
  code+='do {\n';
  code+=branch;
  code+='} while( u8g.nextPage() );\n';
  return code;
};

Blockly.Arduino.OLED_print = function() {
  var str = Blockly.Arduino.valueToCode(this, 'text', Blockly.Arduino.ORDER_ATOMIC) || 'String(\"\")';
  var x = Blockly.Arduino.valueToCode(this, 'x', Blockly.Arduino.ORDER_ATOMIC);
  var y = Blockly.Arduino.valueToCode(this, 'y', Blockly.Arduino.ORDER_ATOMIC);
  var type = this.getFieldValue('TYPE');
  //var code='oled.setFont('+type+');\n';
  var code=type+';\n';
	code+='u8g.setPrintPos('+x+', '+y+');\n';
	code+='u8g.print('+str+');\n';
  return code;
};

Blockly.Arduino.OLED_print_roll = function() {
  var str = Blockly.Arduino.valueToCode(this, 'text', Blockly.Arduino.ORDER_ATOMIC) || 'String(\"\")';
  var y = Blockly.Arduino.valueToCode(this, 'y', Blockly.Arduino.ORDER_ATOMIC);
  var x = Blockly.Arduino.valueToCode(this, 'x', Blockly.Arduino.ORDER_ATOMIC);
  var type = this.getFieldValue('TYPE');

  Blockly.Arduino.definitions_['define_oled_x'] = 'long x_coordinate;';
  Blockly.Arduino.definitions_['define_oled_xtime'] = 'unsigned long timer_x_coordinate = millis();';

var code='if (timer_x_coordinate > millis()) timer_x_coordinate = millis();\n';
  code+=' if(millis()-timer_x_coordinate>'+x+') {\n';
  code+='    x_coordinate = x_coordinate - 4;\n';
  code+='    timer_x_coordinate = millis();\n';
  code+='  }\n';
  code+=type+';\n';
  code+='u8g.setPrintPos(x_coordinate,'+ y+');\n';
  code+='u8g.print('+str+');\n';
  return code;
};


Blockly.Arduino.OLED_simplePrint = function() {
  var str = Blockly.Arduino.valueToCode(this, 'text', Blockly.Arduino.ORDER_ATOMIC) || 'String(\"\")'
  var code ='';
  code+='u8g.print('+str+');\n';
  return code;
};


Blockly.Arduino.MD_OLED_GeometryLine = function() {
  var type = this.getFieldValue('TYPE');

  var x0 = Blockly.Arduino.valueToCode(this, 'x0', Blockly.Arduino.ORDER_ATOMIC);
  var y0 = Blockly.Arduino.valueToCode(this, 'y0', Blockly.Arduino.ORDER_ATOMIC);
  var x1w = Blockly.Arduino.valueToCode(this, 'x1w', Blockly.Arduino.ORDER_ATOMIC);
  var y1h = Blockly.Arduino.valueToCode(this, 'y1h', Blockly.Arduino.ORDER_ATOMIC);
  // var x2r = Blockly.Arduino.valueToCode(this, 'x2r', Blockly.Arduino.ORDER_ATOMIC);
  // var y2 = Blockly.Arduino.valueToCode(this, 'y2', Blockly.Arduino.ORDER_ATOMIC);

  var code='';

  if(type=='point') {
    code+='u8g.drawPixel('+x0+','+y0+');\n';
  } else if(type=='line') {
    code+='u8g.drawLine('+x0+','+y0+','+x1w+','+y1h+');\n';
  } else if(type=='HLine') {
    code+='u8g.drawHLine('+x0+','+y0+','+x1w+');\n';
  } else if(type=='VLine') {
    code+='u8g.drawVLine('+x0+','+y0+','+y1h+');\n';
  } 
  // else if(type=='triangle') {
  //   code+='u8g.drawTriangle('+x0+','+y0+','+x1w+','+y1h+','+x2r+','+y2+');\n';
  // } 
  else if(type=='frame') {
    code+='u8g.drawFrame('+x0+','+y0+','+x1w+','+y1h+');\n';
  } 
  // else if(type=='RFrame') {
  //   code+='u8g.drawRFrame('+x0+','+y0+','+x1w+','+y1h+','+x2r+');\n';
  // } 
  else if(type=='box') {
    code+='u8g.drawBox('+x0+','+y0+','+x1w+','+y1h+');\n';
  } 
  // else if(type=='RBox') {
  //   code+='u8g.drawRBox('+x0+','+y0+','+x1w+','+y1h+','+x2r+');\n';
  // }

  return code;
};


Blockly.Arduino.MD_OLED_GeometryCircle = function() {


  var type = this.getFieldValue('TYPE');
  var ArcType = this.getFieldValue('ArcType');

  var x = Blockly.Arduino.valueToCode(this, 'x', Blockly.Arduino.ORDER_ATOMIC);
  var y = Blockly.Arduino.valueToCode(this, 'y', Blockly.Arduino.ORDER_ATOMIC);
  var rw = Blockly.Arduino.valueToCode(this, 'rw', Blockly.Arduino.ORDER_ATOMIC);
  // var h = Blockly.Arduino.valueToCode(this, 'h', Blockly.Arduino.ORDER_ATOMIC);

  var code='';

  if(type=='circle') {
    code+='u8g.drawCircle('+x+','+y+','+rw+','+ArcType+');\n';
  } else if(type=='disc') {
    code+='u8g.drawDisc('+x+','+y+','+rw+','+ArcType+');\n';
  } 

  // else if(type=='ellipse') {
  //   code+='u8g.drawEllipse('+x+','+y+','+rw+','+h+','+ArcType+');\n';
  // } else if(type=='filledEllipse') {
  //   code+='u8g.drawFilledEllipse('+x+','+y+','+rw+','+h+','+ArcType+');\n';
  // } 

  return code;
};


Blockly.Arduino.MD_OLED_getWidthHigh = function() {

  var type = this.getFieldValue('TYPE');

  var code = '';

  if(type=='width') {
    code +='u8g.getWidth()';
  } else {
    code +='u8g.getHeight()';
  }
 
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
