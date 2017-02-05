'use strict';
goog.provide('Blockly.Arduino.maker17');
goog.require('Blockly.Arduino');

//执行器-播放音乐函数-设置每拍时长
Blockly.Arduino.set_tone_duration = function() {
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var num = this.getFieldValue('NUMBER');
  Blockly.Arduino.definitions_['var_long' + varName] = 'long ' + varName + '=' + num + ';\n';
  return '';
};

//执行器-播放音乐函数-设置音符
Blockly.Arduino.set_musiclist = function() {
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var size = window.parseFloat(this.getFieldValue('SIZE'));
  var text = this.getFieldValue('TEXT');
  Blockly.Arduino.definitions_['var_lists' + varName] = 'long ' + varName + '[' + size + ']' + '=' + '{' + text + '};\n';
  return '';
};

//执行器-播放音乐函数-设置时值
Blockly.Arduino.set_rhythmlist = function() {
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var size = window.parseFloat(this.getFieldValue('SIZE'));
  var text = this.getFieldValue('TEXT');
  Blockly.Arduino.definitions_['var_lists' + varName] = 'float ' + varName + '[' + size + ']' + '=' + '{' + text + '};\n';
  return '';
};

//执行器-播放音乐函数-设置基准音调频率
Blockly.Arduino.set_tonelist = function() {
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var text = this.getFieldValue('TEXT');
  Blockly.Arduino.definitions_['var_lists' + varName] = 'float ' + varName + '[7]' + '=' + '{' + text + '};\n';
  return '';
};

Blockly.Arduino.set_rhythmlist = Blockly.Arduino.set_musiclist;
Blockly.Arduino.set_highlist = Blockly.Arduino.set_musiclist;

//dht11温湿度传感器
Blockly.Arduino.maker17_dht11 = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var what = this.getFieldValue('WHAT');
  Blockly.Arduino.definitions_['define_dht11'] = '#include <dht11.h>';
  Blockly.Arduino.definitions_['var_dht11' + dropdown_pin] = 'dht11 myDHT_' + dropdown_pin + ';';
  var funcName = 'dht_' + dropdown_pin + '_get' + what;
  var code = 'int' + ' ' + funcName + '() {\n' + '  int chk = myDHT_' + dropdown_pin + '.read(' + dropdown_pin + ');\n' + '  int value = myDHT_' + dropdown_pin + '.' + what + ';\n' + '  return value;\n' + '}\n';
  Blockly.Arduino.definitions_[funcName] = code;
  return [funcName + '()', Blockly.Arduino.ORDER_ATOMIC];
};

//dht11温湿度传感器
Blockly.Arduino.maker17_dht22 = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var what = this.getFieldValue('WHAT');
  Blockly.Arduino.definitions_['define_dht22'] = '#include "DHT22.h"';
  Blockly.Arduino.setups_['setup_delay2000'] = ' delay(2000);';
  Blockly.Arduino.definitions_['var_dht22' + dropdown_pin] = 'DHT22 myDHT22(' + dropdown_pin + ');';
  var code = 'myDHT22.get'+what+'()';
  return code;
};

//模拟传感器-LM35温度传感器
Blockly.Arduino.maker17_LM35temp = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var code = 'analogRead(' + dropdown_pin + ')*0.488';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//显示-1602LCD显示
Blockly.Arduino.maker17_lcd_print = function() {
  var str1 = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || '\"\"';
  var str2 = Blockly.Arduino.valueToCode(this, 'TEXT2', Blockly.Arduino.ORDER_ATOMIC) || '\"\"';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_df_lcd'] = '#include <LiquidCrystal_I2C.h>';
  Blockly.Arduino.definitions_['var_df_lcd'] = 'LiquidCrystal_I2C df_lcd(0x20,16,2);';
  Blockly.Arduino.setups_['setup_df_lcd1'] = 'df_lcd.init();';
  Blockly.Arduino.setups_['setup_df_lcd2'] = 'df_lcd.backlight();';
  var code = 'df_lcd.setCursor(0, 0);\n'
  code += 'df_lcd.print(' + str1 + ');\n';
  code += 'df_lcd.setCursor(0, 1);\n';
  code += 'df_lcd.print(' + str2 + ');\n';
  return code;
};

//显示-1602开关
Blockly.Arduino.maker17_lcd_power = function() {
  var dropdown_stat = this.getTitleValue('STAT');
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_df_lcd'] = '#include <LiquidCrystal_I2C.h>';
  Blockly.Arduino.definitions_['var_df_lcd'] = 'LiquidCrystal_I2C df_lcd(0x20,16,2);';
  Blockly.Arduino.setups_['setup_df_lcd1'] = 'df_lcd.init();';
  Blockly.Arduino.setups_['setup_df_lcd2'] = 'df_lcd.backlight();';
  var code = 'df_lcd.' + dropdown_stat + '();\n'
  return code;
};

//执行器-电机转动
Blockly.Arduino.maker17_romeo_motor = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var speed = Blockly.Arduino.valueToCode(this, 'speed', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var code = 'setRomeoMotor(' + dropdown_pin + ', ' + speed + ');\n';
  Blockly.Arduino.setups_['setup_output_4'] = 'pinMode(4, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_5'] = 'pinMode(5, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_6'] = 'pinMode(6, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_7'] = 'pinMode(7, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_w4'] = 'digitalWrite(4, LOW);';
  Blockly.Arduino.setups_['setup_output_w5'] = 'digitalWrite(5, LOW);';
  Blockly.Arduino.setups_['setup_output_w6'] = 'digitalWrite(6, LOW);';
  Blockly.Arduino.setups_['setup_output_w7'] = 'digitalWrite(7, LOW);';
  var funcName = 'setRomeoMotor';
  var code2 = 'void ' + funcName + '(int motorId, int speed) {\n' + '  int speedPin, directionPin;\n' + '  if (motorId == 1){\n' + '   speedPin = 5;\n' + '   directionPin = 4;\n' + '  } else {\n' + '   if (motorId == 2){\n' + '     speedPin = 6;\n' + '     directionPin = 7;\n' + '   } else {\n' + '     return;\n' + '   }\n' + '  }\n' + '  if (speed == 0){\n' + '   digitalWrite(speedPin, LOW);\n' + '  }\n' + '  if (speed > 0){\n' + '   digitalWrite(directionPin, HIGH);\n' + '   analogWrite(speedPin, speed);\n' + '  } else {\n' + '   digitalWrite(directionPin, LOW);\n' + '   analogWrite(speedPin, -speed);\n' + '  }\n' + '}\n';
  Blockly.Arduino.definitions_[funcName] = code2;
  return code;
};

//执行器-电机停止
Blockly.Arduino.maker17_romeo_motor_stop = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var code = 'setRomeoMotor(' + dropdown_pin + ', 0);\n';
  Blockly.Arduino.setups_['setup_output_4'] = 'pinMode(4, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_5'] = 'pinMode(5, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_6'] = 'pinMode(6, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_7'] = 'pinMode(7, OUTPUT);';
  Blockly.Arduino.setups_['setup_output_w4'] = 'digitalWrite(4, LOW);';
  Blockly.Arduino.setups_['setup_output_w5'] = 'digitalWrite(5, LOW);';
  Blockly.Arduino.setups_['setup_output_w6'] = 'digitalWrite(6, LOW);';
  Blockly.Arduino.setups_['setup_output_w7'] = 'digitalWrite(7, LOW);';
  var funcName = 'setRomeoMotor';
  var code2 = 'void ' + funcName + '(int motorId, int speed) {\n' + '  int speedPin, directionPin;\n' + '  if (motorId == 1){\n' + '   speedPin = 5;\n' + '   directionPin = 4;\n' + '  } else {\n' + '   if (motorId == 2){\n' + '     speedPin = 6;\n' + '     directionPin = 7;\n' + '   } else {\n' + '     return;\n' + '   }\n' + '  }\n' + '  if (speed == 0){\n' + '   digitalWrite(speedPin, LOW);\n' + '  }\n' + '  if (speed > 0){\n' + '   digitalWrite(directionPin, HIGH);\n' + '   analogWrite(speedPin, speed);\n' + '  } else {\n' + '   digitalWrite(directionPin, LOW);\n' + '   analogWrite(speedPin, -speed);\n' + '  }\n' + '}\n';
  Blockly.Arduino.definitions_[funcName] = code2;
  return code;
};

//执行器-RGB灯
Blockly.Arduino.maker17_rgb = function() {
  var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var value__led_ = Blockly.Arduino.valueToCode(this, '_LED_', Blockly.Arduino.ORDER_ATOMIC);
  var value_rvalue = Blockly.Arduino.valueToCode(this, 'RVALUE', Blockly.Arduino.ORDER_ATOMIC);
  var value_gvalue = Blockly.Arduino.valueToCode(this, 'GVALUE', Blockly.Arduino.ORDER_ATOMIC);
  var value_bvalue = Blockly.Arduino.valueToCode(this, 'BVALUE', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_maker17'] = '#include "Maker17.h"';
  Blockly.Arduino.definitions_['var_rgb_maker17' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_maker17_' + dropdown_rgbpin + '' + '(4);';
  Blockly.Arduino.setups_['setup_rgb_maker17_begin_' + dropdown_rgbpin] = 'rgb_maker17_' + dropdown_rgbpin + '.begin();';
  Blockly.Arduino.setups_['setup_rgb_maker17_setpin' + dropdown_rgbpin] = 'rgb_maker17_' + dropdown_rgbpin + '.setPin(' + dropdown_rgbpin + ');';
  var code = 'rgb_maker17_' + dropdown_rgbpin + '.setPixelColor(' + value__led_ + '-1, ' + value_rvalue + ',' + value_gvalue + ',' + value_bvalue + ');\n';
  code += 'rgb_maker17_' + dropdown_rgbpin + '.show();\n';
  return code;
};

//执行器-RGB2
Blockly.Arduino.maker17_rgb2 = function() {
  var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var value__led_ = Blockly.Arduino.valueToCode(this, '_LED_', Blockly.Arduino.ORDER_ATOMIC);
  var colour_rgb_led_color = this.getFieldValue('RGB_LED_color');
  var color = colour_rgb_led_color.colorRgb();
  Blockly.Arduino.definitions_['include_maker17'] = '#include "Maker17.h"';
  Blockly.Arduino.definitions_['var_rgb_maker17' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_maker17_' + dropdown_rgbpin + '' + '(4);';
  Blockly.Arduino.setups_['setup_rgb_maker17_begin_' + dropdown_rgbpin] = 'rgb_maker17_' + dropdown_rgbpin + '.begin();';
  Blockly.Arduino.setups_['setup_rgb_maker17_setpin' + dropdown_rgbpin] = 'rgb_maker17_' + dropdown_rgbpin + '.setPin(' + dropdown_rgbpin + ');';

  var code = 'rgb_maker17_' + dropdown_rgbpin + '.setPixelColor(' + value__led_ + '-1, rgb_maker17_' + dropdown_rgbpin + '.Color' + color + ');\n';
  code += 'rgb_maker17_' + dropdown_rgbpin + '.show();\n';
  return code;
};

//执行器-蜂鸣器频率选择列表
Blockly.Arduino.maker17_tone_notes = function() {
  var code = this.getFieldValue('STAT');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//执行器-蜂鸣器
Blockly.Arduino.maker17_tone = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var fre = Blockly.Arduino.valueToCode(this, 'FREQUENCY', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var dur = Blockly.Arduino.valueToCode(this, 'DURATION', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  Blockly.Arduino.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
  Blockly.Arduino.definitions_['newtone0'] = 'float period;\nfloat pulse;';
  Blockly.Arduino.definitions_['newtone1'] = 'void newtone(int tonePin, int frequency, int duration)';
  Blockly.Arduino.definitions_['newtone2'] = '{\nfloat period = 1000000.0 /frequency;';
  Blockly.Arduino.definitions_['newtone3'] = 'float pulse = period / 2.0;';
  Blockly.Arduino.definitions_['newtone4'] = 'for (int i=1; i<=((duration * 1000.0)/period);i=i+1)';
  Blockly.Arduino.definitions_['newtone5'] = ' {\npinMode(tonePin, OUTPUT);\n digitalWrite(tonePin,HIGH);';
  Blockly.Arduino.definitions_['newtone6'] = 'delayMicroseconds(pulse);';
  Blockly.Arduino.definitions_['newtone7'] = 'pinMode(tonePin, OUTPUT);\n digitalWrite(tonePin,LOW);';
  Blockly.Arduino.definitions_['newtone8'] = ' delayMicroseconds(pulse);\n}\n}\n';
  var code = "newtone(" + dropdown_pin + "," + fre + "," + dur + ");\n";
  return code;
};

//执行器-蜂鸣器结束声音
Blockly.Arduino.maker17_newNoTone = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var Delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
  var code = "digitalWrite(" + dropdown_pin + ", LOW);\n";
  code += 'delay(' + Delay_time + ');';
  return code;
};

//显示-MAX7219-初始化
Blockly.Arduino.MAX7219_init = function() {
  var pin_din = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var pin_cs = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var pin_clk = Blockly.Arduino.valueToCode(this, 'PIN3', Blockly.Arduino.ORDER_ATOMIC);
  var lc_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  var Intensity = Blockly.Arduino.valueToCode(this, 'Intensity', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['define0_MaxMatrix'] = '#include "MaxMatrix.h"';
  Blockly.Arduino.definitions_['define1_MaxMatrix'] = '#include <avr/pgmspace.h>';
  Blockly.Arduino.definitions_['define_LIST'] = 'PROGMEM const unsigned char LIST[]{\n';
  Blockly.Arduino.definitions_['define_LIST'] += '3,8,B00000000,B00000000,B00000000,B00000000,B00000000,//space\n';
  Blockly.Arduino.definitions_['define_LIST'] += '1,8,B01011111,B00000000,B00000000,B00000000,B00000000,//!\n';
  Blockly.Arduino.definitions_['define_LIST'] += '3,8,B00000011,B00000000,B00000011,B00000000,B00000000,// \n';
  Blockly.Arduino.definitions_['define_LIST'] += '5,8,B00010100,B00111110,B00010100,B00111110,B00010100,//# \n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00100100,B01101010,B00101011,B00010010,B00000000,//$ \n';
  Blockly.Arduino.definitions_['define_LIST'] += '5,8,B01100011,B00010011,B00001000,B01100100,B01100011,//% \n';
  Blockly.Arduino.definitions_['define_LIST'] += '5,8,B00110110,B01001001,B01010110,B00100000,B01010000,//& \n';
  Blockly.Arduino.definitions_['define_LIST'] += '1,8,B00000011,B00000000,B00000000,B00000000,B00000000,//\n';
  Blockly.Arduino.definitions_['define_LIST'] += '3,8,B00011100,B00100010,B01000001,B00000000,B00000000,//( \n';
  Blockly.Arduino.definitions_['define_LIST'] += '3,8,B01000001,B00100010,B00011100,B00000000,B00000000,//) \n';
  Blockly.Arduino.definitions_['define_LIST'] += '5,8,B00101000,B00011000,B00001110,B00011000,B00101000,//* \n';
  Blockly.Arduino.definitions_['define_LIST'] += '5,8,B00001000,B00001000,B00111110,B00001000,B00001000,//+ \n';
  Blockly.Arduino.definitions_['define_LIST'] += '2,8,B10110000,B01110000,B00000000,B00000000,B00000000,//, \n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00001000,B00001000,B00001000,B00001000,B00000000,//- \n';
  Blockly.Arduino.definitions_['define_LIST'] += '2,8,B01100000,B01100000,B00000000,B00000000,B00000000,//. \n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01100000,B00011000,B00000110,B00000001,B00000000,/// \n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111110,B01000001,B01000001,B00111110,B00000000,//0\n';
  Blockly.Arduino.definitions_['define_LIST'] += '3,8,B01000010,B01111111,B01000000,B00000000,B00000000,//1\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01100010,B01010001,B01001001,B01000110,B00000000,//2\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00100010,B01000001,B01001001,B00110110,B00000000,//3\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00011000,B00010100,B00010010,B01111111,B00000000,//4\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00100111,B01000101,B01000101,B00111001,B00000000,//5\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111110,B01001001,B01001001,B00110000,B00000000,//6\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01100001,B00010001,B00001001,B00000111,B00000000,//7\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00110110,B01001001,B01001001,B00110110,B00000000,//8\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00000110,B01001001,B01001001,B00111110,B00000000,//9\n';
  Blockly.Arduino.definitions_['define_LIST'] += '2,8,B01010000,B00000000,B00000000,B00000000,B00000000,//: \n';
  Blockly.Arduino.definitions_['define_LIST'] += '2,8,B10000000,B01010000,B00000000,B00000000,B00000000,//; \n';
  Blockly.Arduino.definitions_['define_LIST'] += '3,8,B00010000,B00101000,B01000100,B00000000,B00000000,//< \n';
  Blockly.Arduino.definitions_['define_LIST'] += '3,8,B00010100,B00010100,B00010100,B00000000,B00000000,//= \n';
  Blockly.Arduino.definitions_['define_LIST'] += '3,8,B01000100,B00101000,B00010000,B00000000,B00000000,//> \n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00000010,B01011001,B00001001,B00000110,B00000000,//? \n';
  Blockly.Arduino.definitions_['define_LIST'] += '5,8,B00111110,B01001001,B01010101,B01011101,B00001110,//@ \n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111110,B00010001,B00010001,B01111110,B00000000,//A\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B01001001,B01001001,B00110110,B00000000,//B\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111110,B01000001,B01000001,B00100010,B00000000,//C\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B01000001,B01000001,B00111110,B00000000,//D\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B01001001,B01001001,B01000001,B00000000,//E\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B00001001,B00001001,B00000001,B00000000,//F\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111110,B01000001,B01001001,B01111010,B00000000,//G\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B00001000,B00001000,B01111111,B00000000,//H\n';
  Blockly.Arduino.definitions_['define_LIST'] += '3,8,B01000001,B01111111,B01000001,B00000000,B00000000,//I\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00110000,B01000000,B01000001,B00111111,B00000000,//J\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B00001000,B00010100,B01100011,B00000000,//K\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B01000000,B01000000,B01000000,B00000000,//L\n';
  Blockly.Arduino.definitions_['define_LIST'] += '5,8,B01111111,B00000010,B00001100,B00000010,B01111111,//M\n';
  Blockly.Arduino.definitions_['define_LIST'] += '5,8,B01111111,B00000100,B00001000,B00010000,B01111111,//N\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111110,B01000001,B01000001,B00111110,B00000000,//O\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B00001001,B00001001,B00000110,B00000000,//P\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111110,B01000001,B01000001,B10111110,B00000000,//Q\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B00001001,B00001001,B01110110,B00000000,//R\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01000110,B01001001,B01001001,B00110010,B00000000,//S\n';
  Blockly.Arduino.definitions_['define_LIST'] += '5,8,B00000001,B00000001,B01111111,B00000001,B00000001,//T\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111111,B01000000,B01000000,B00111111,B00000000,//U\n';
  Blockly.Arduino.definitions_['define_LIST'] += '5,8,B00001111,B00110000,B01000000,B00110000,B00001111,//V\n';
  Blockly.Arduino.definitions_['define_LIST'] += '5,8,B00111111,B01000000,B00111000,B01000000,B00111111,//W\n';
  Blockly.Arduino.definitions_['define_LIST'] += '5,8,B01100011,B00010100,B00001000,B00010100,B01100011,//X\n';
  Blockly.Arduino.definitions_['define_LIST'] += '5,8,B00000111,B00001000,B01110000,B00001000,B00000111,//Y\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01100001,B01010001,B01001001,B01000111,B00000000,//Z\n';
  Blockly.Arduino.definitions_['define_LIST'] += '2,8,B01111111,B01000001,B00000000,B00000000,B00000000,//[ \n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00000001,B00000110,B00011000,B01100000,B00000000,//\backslash\n';
  Blockly.Arduino.definitions_['define_LIST'] += '2,8,B01000001,B01111111,B00000000,B00000000,B00000000,//] \n';
  Blockly.Arduino.definitions_['define_LIST'] += '3,8,B00000010,B00000001,B00000010,B00000000,B00000000,//hat\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01000000,B01000000,B01000000,B01000000,B00000000,//_ \n';
  Blockly.Arduino.definitions_['define_LIST'] += '2,8,B00000001,B00000010,B00000000,B00000000,B00000000,//` \n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00100000,B01010100,B01010100,B01111000,B00000000,//a\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B01000100,B01000100,B00111000,B00000000,//b\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111000,B01000100,B01000100,B00101000,B00000000,//c\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111000,B01000100,B01000100,B01111111,B00000000,//d\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111000,B01010100,B01010100,B00011000,B00000000,//e\n';
  Blockly.Arduino.definitions_['define_LIST'] += '3,8,B00000100,B01111110,B00000101,B00000000,B00000000,//f\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B10011000,B10100100,B10100100,B01111000,B00000000,//g\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B00000100,B00000100,B01111000,B00000000,//h\n';
  Blockly.Arduino.definitions_['define_LIST'] += '3,8,B01000100,B01111101,B01000000,B00000000,B00000000,//i\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01000000,B10000000,B10000100,B01111101,B00000000,//j\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B00010000,B00101000,B01000100,B00000000,//k\n';
  Blockly.Arduino.definitions_['define_LIST'] += '3,8,B01000001,B01111111,B01000000,B00000000,B00000000,//l\n';
  Blockly.Arduino.definitions_['define_LIST'] += '5,8,B01111100,B00000100,B01111100,B00000100,B01111000,//m\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111100,B00000100,B00000100,B01111000,B00000000,//n\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111000,B01000100,B01000100,B00111000,B00000000,//o\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B11111100,B00100100,B00100100,B00011000,B00000000,//p\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00011000,B00100100,B00100100,B11111100,B00000000,//q\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111100,B00001000,B00000100,B00000100,B00000000,//r\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01001000,B01010100,B01010100,B00100100,B00000000,//s\n';
  Blockly.Arduino.definitions_['define_LIST'] += '3,8,B00000100,B00111111,B01000100,B00000000,B00000000,//t\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111100,B01000000,B01000000,B01111100,B00000000,//u\n';
  Blockly.Arduino.definitions_['define_LIST'] += '5,8,B00011100,B00100000,B01000000,B00100000,B00011100,//v\n';
  Blockly.Arduino.definitions_['define_LIST'] += '5,8,B00111100,B01000000,B00111100,B01000000,B00111100,//w\n';
  Blockly.Arduino.definitions_['define_LIST'] += '5,8,B01000100,B00101000,B00010000,B00101000,B01000100,//x\n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B10011100,B10100000,B10100000,B01111100,B00000000,//y\n';
  Blockly.Arduino.definitions_['define_LIST'] += '3,8,B01100100,B01010100,B01001100,B00000000,B00000000,//z\n';
  Blockly.Arduino.definitions_['define_LIST'] += '3,8,B00001000,B00110110,B01000001,B00000000,B00000000,//{ \n';
  Blockly.Arduino.definitions_['define_LIST'] += '1,8,B01111111,B00000000,B00000000,B00000000,B00000000,//| \n';
  Blockly.Arduino.definitions_['define_LIST'] += '3,8,B01000001,B00110110,B00001000,B00000000,B00000000,//} \n';
  Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00001000,B00000100,B00001000,B00000100,B00000000,//~ \n';
  Blockly.Arduino.definitions_['define_LIST'] += '};'
  Blockly.Arduino.definitions_['define2_MaxMatrix'] = 'MaxMatrix m(' + pin_din + ',' + pin_cs + ',' + pin_clk + ',' + lc_num + ');\nbyte buffer[100];';
  Blockly.Arduino.setups_['setup_init'] = ' m.init(); ';
  Blockly.Arduino.setups_['setup_Intensity'] = 'm.setIntensity(' + Intensity + ');';
  var code = '';
  return code;
};

//显示-MAX7219-显示字符串
Blockly.Arduino.MAX7219_putString = function() {
  var str = Blockly.Arduino.valueToCode(this, 'String', Blockly.Arduino.ORDER_ATOMIC) || '\"\"';
  var speed = Blockly.Arduino.valueToCode(this, 'Speed', Blockly.Arduino.ORDER_ATOMIC);
  var code;
  if (str.charAt(0) == '"') {
    Blockly.Arduino.definitions_['define_message'] = 'char message[] = ' + str + ';';
  } else {
    Blockly.Arduino.definitions_['define_message'] = 'char message[100];';
    code = str + '.toCharArray(message,100);\n';
  }
  Blockly.Arduino.definitions_['define_putChar'] = 'void putChar(char c, int scrollspeed)\n{\nif (c < 32 || c > 127) \nreturn;\nc -= 32;\nmemcpy_P(buffer, LIST + 7*c, 7);\n  m.writeSprite(64, 0, buffer);\nm.setColumn(64 + buffer[0], 0);\nfor (int i=0; i<buffer[0]+1; i++)\n {\ndelay(scrollspeed);\nm.shiftLeft(false, false);\n}\n}';
  Blockly.Arduino.definitions_['define_putString'] = 'void putString(char* s, int scrollspeed)\n{\nwhile (*s != 0)\n{\nputChar(*s, scrollspeed);\ns++;\n}\n}';
  code += 'putString(message, ' + speed + ');\n';
  return code;
};

//显示-max7219 清除LED点阵显示
Blockly.Arduino.Ledcontrol_clearDisplay = function() {
  var varName = this.getFieldValue('VAR');
  var lc_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  var code = varName + '.clearDisplay(' + (lc_num - 1) + ');\n';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//显示-max7219-显示图案 
Blockly.Arduino.MAX7219_DisplayChar = function() {

  var lc_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  var lc_chars = Blockly.Arduino.valueToCode(this, 'Chars', Blockly.Arduino.ORDER_ATOMIC);
  code = 'for (int i = 0; i < 8; i++)\n';
  code += ' m.setColumn(i, ' + lc_chars + '[i]);\n';
  return code;
};

//显示-max7219-移动图案 
Blockly.Arduino.Max7219_MoveChar = function() {
  // var varName = this.getFieldValue('VAR');
  //var lc_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  var lc_chars = Blockly.Arduino.valueToCode(this, 'Chars', Blockly.Arduino.ORDER_ATOMIC);
  var lc_dir = this.getFieldValue('DIR');
  var lc_gird = Blockly.Arduino.valueToCode(this, 'Gird', Blockly.Arduino.ORDER_ATOMIC);
  var code = '';
  if ((lc_dir == "Left") || (lc_dir == "Right")) {
    funcName = 'RightShift';
    code = 'void ' + funcName + '(byte a[],char n) {\n' + '  n %= 8;\n' + '  for (int i = 0; i < 8; i++)\n' + '    a[i] = n < 0 ? a[i] >> (8 + n) | a[i] << -n : a[i] << (8 - n) | a[i] >> n;\n' + '}\n';
    Blockly.Arduino.definitions_[funcName] = code;
    if (lc_dir == "Left") {
      code = funcName + '(' + lc_chars + ',' + '-' + lc_gird + ');\n';
    } else {
      code = funcName + '(' + lc_chars + ',' + lc_gird + ');\n';
    }
    code += 'for (int i = 0; i < 8; i++)\n';
    code += ' m.setColumn(i, ' + lc_chars + '[i]);\n';
    return code;
  } else {
    funcName = 'Reverse';
    code = 'void ' + funcName + '(byte A[],byte b,byte e) {\n' + '  for (; b < e; b++, e--){\n' + '    byte temp = A[b];\n' + '    A[b] = A[e];\n' + '    A[e] = temp;\n' + '  }\n' + '}\n';
    Blockly.Arduino.definitions_[funcName] = code;
    funcName = 'DownShift';
    code = 'void ' + funcName + '(byte A[],byte k) {\n' + '  byte n = 8;\n' + '  k %= n;\n' + '  Reverse(A, 0, n - k - 1);\n' + '  Reverse(A, n - k, n - 1);\n' + '  Reverse(A, 0, n - 1);\n' + '}\n';
    Blockly.Arduino.definitions_[funcName] = code;
    if (lc_dir == "Up") {
      code = funcName + '(' + lc_chars + ',' + '-' + lc_gird + ');\n';
    } else {
      code = funcName + '(' + lc_chars + ',' + lc_gird + ');\n';
    }
    code = 'for (int i = 0; i < 8; i++)\n';
    code += ' m.setColumn(i, ' + lc_chars + '[i]);\n';
    return code;
  }
};

//显示-max7219点阵选择数组
Blockly.Arduino.LedArray = function() {
  var varName = this.getFieldValue('VAR');
  var a = new Array();
  for (var i = 1; i < 9; i++) {
    a[i] = new Array();
    for (var j = 1; j < 9; j++) {
      a[i][j] = (this.getFieldValue('a' + i + j) == "TRUE") ? 1 : 0;
    }
  }
  var code = "{";
  for (var i = 1; i < 9; i++) {
    var tmp = ""
    for (var j = 1; j < 9; j++) {
      tmp += a[i][j];
    }
    tmp = (parseInt(tmp, 2)).toString(16)
    if (tmp.length == 1) tmp = "0" + tmp;
    code += '0x' + tmp + ((i != 8) ? ',' : '');
  }
  code += '};\n';
  //Blockly.Arduino.definitions_[this.id] = "byte LedArray_"+clearString(this.id)+"[]="+code;
  Blockly.Arduino.definitions_[varName] = "byte " + varName + "[]=" + code;
  //return ["LedArray_"+clearString(this.id), Blockly.Arduino.ORDER_ATOMIC];
  return [varName, Blockly.Arduino.ORDER_ATOMIC];
};

//显示-max7219-选择图案
Blockly.Arduino.Max7219_img = function() {
  var dropdown_img_ = this.getFieldValue('img_');
  var code = '"' + dropdown_img_ + '"';
  code = '{';
  for (var i = 0; i < 15; i += 2) {
    code += '0x' + dropdown_img_.substr(i, 2) + ((i != 14) ? ',' : '');
  }
  code += '};\n';
  Blockly.Arduino.definitions_['max7219_img_' + dropdown_img_] = "byte " + 'max7219_img_' + dropdown_img_ + "[]=" + code;
  return ['max7219_img_' + dropdown_img_, Blockly.Arduino.ORDER_ATOMIC];
};


//显示-OLED-oled初始化
Blockly.Arduino.maker17_oled_init = function() {
  var CLK = Blockly.Arduino.valueToCode(this, 'CLK', Blockly.Arduino.ORDER_ATOMIC);

  var DIN = Blockly.Arduino.valueToCode(this, 'DIN', Blockly.Arduino.ORDER_ATOMIC);

  var DC = Blockly.Arduino.valueToCode(this, 'DC', Blockly.Arduino.ORDER_ATOMIC);

  var CS1 = Blockly.Arduino.valueToCode(this, 'CS1', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['define_U8glib'] = '#include "U8glib.h"';
  Blockly.Arduino.definitions_['define_u8g'] = ' U8GLIB_SSD1306_128X64 u8g(' + CLK + ',' + DIN + ',' + CS1 + ',' + DC + ');';
  var oled_setup = " if ( u8g.getMode() == U8G_MODE_R3G3B2 )\nu8g.setColorIndex(255);\n";
  oled_setup += " else if ( u8g.getMode() == U8G_MODE_GRAY2BIT )\n";
  oled_setup += " u8g.setColorIndex(3);\n ";
  oled_setup += " else if ( u8g.getMode() == U8G_MODE_BW )\n";
  oled_setup += " u8g.setColorIndex(1);\n";
  Blockly.Arduino.setups_['setup_setup'] = oled_setup;
  var code = '';
  return code;
};

//显示-OLED-oled初始化2(iic)
Blockly.Arduino.maker17_oled_init2 = function() {
  var CLK = Blockly.Arduino.valueToCode(this, 'CLK', Blockly.Arduino.ORDER_ATOMIC);

  var DIN = Blockly.Arduino.valueToCode(this, 'DIN', Blockly.Arduino.ORDER_ATOMIC);

  var DC = Blockly.Arduino.valueToCode(this, 'DC', Blockly.Arduino.ORDER_ATOMIC);

  var CS1 = Blockly.Arduino.valueToCode(this, 'CS1', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['define_U8glib'] = '#include "U8glib.h"';
  Blockly.Arduino.definitions_['define_u8g'] = ' U8GLIB_SSD1306_128X64 u8g(U8G_I2C_OPT_NONE);';
  var oled_setup = " if ( u8g.getMode() == U8G_MODE_R3G3B2 )\nu8g.setColorIndex(255);\n";
  oled_setup += " else if ( u8g.getMode() == U8G_MODE_GRAY2BIT )\n";
  oled_setup += " u8g.setColorIndex(3);\n ";
  oled_setup += " else if ( u8g.getMode() == U8G_MODE_BW )\n";
  oled_setup += " u8g.setColorIndex(1);\n";
  Blockly.Arduino.setups_['setup_setup'] = oled_setup;
  var code = '';
  return code;

};
//显示-OLED-oled获取高度/宽度
Blockly.Arduino.maker17_oled_getHeight_or_Width = function() {
  var what = this.getFieldValue('WHAT');
  var funcName = 'u8g.get' + what + '()';
  return [funcName, Blockly.Arduino.ORDER_ATOMIC];
}
Blockly.Arduino.maker17_oled_draw4Str = function() {
  var value_text_line1 = Blockly.Arduino.valueToCode(this, 'Text_line1', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
  var value_text_line2 = Blockly.Arduino.valueToCode(this, 'Text_line2', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
  var value_text_line3 = Blockly.Arduino.valueToCode(this, 'Text_line3', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
  var value_text_line4 = Blockly.Arduino.valueToCode(this, 'Text_line4', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
  var code = 'u8g.drawStr(0, 12, ' + value_text_line1 + ');\n'
  code += 'u8g.drawStr(0, 28, ' + value_text_line2 + ');\n'
  code += 'u8g.drawStr(0, 44, ' + value_text_line3 + ');\n'
  code += 'u8g.drawStr(0, 60, ' + value_text_line4 + ');\n'
  return code;
};

//显示-OLED-oled画点
Blockly.Arduino.maker17_oled_drawPixe = function() {
  var pos_x = Blockly.Arduino.valueToCode(this, 'POS_X', Blockly.Arduino.ORDER_ATOMIC);
  var pos_y = Blockly.Arduino.valueToCode(this, 'POS_Y', Blockly.Arduino.ORDER_ATOMIC);
  var code = "u8g.drawPixel(" + pos_x + "," + pos_y + " ); ";
  return code;
};
Blockly.Arduino.maker17_oled_page = function() { //oled新建页面
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
  branch = branch.replace(/(^\s*)|(\s*$)/g, ""); //去除两端空格
  if (branch) {
    var code = "  u8g.firstPage();\n do {\n" + branch + "\n} \nwhile (u8g.nextPage());\n";
    return code;
  }

};

//显示-OLED-oled画直线
Blockly.Arduino.maker17_oled_drawLine = function() {
  var start_x = Blockly.Arduino.valueToCode(this, 'START_X', Blockly.Arduino.ORDER_ATOMIC);
  var start_y = Blockly.Arduino.valueToCode(this, 'START_Y', Blockly.Arduino.ORDER_ATOMIC);
  var end_x = Blockly.Arduino.valueToCode(this, 'END_X', Blockly.Arduino.ORDER_ATOMIC);
  var end_y = Blockly.Arduino.valueToCode(this, 'END_Y', Blockly.Arduino.ORDER_ATOMIC);
  var code = "u8g.drawLine(" + start_x + "," + start_y + "," + end_x + "," + end_y + "); \n";
  return code;
};

//显示-OLED-oled画水平/垂直直线
Blockly.Arduino.maker17_oled_draw_Str_Line = function() {
  var start_x = Blockly.Arduino.valueToCode(this, 'START_X', Blockly.Arduino.ORDER_ATOMIC);
  var start_y = Blockly.Arduino.valueToCode(this, 'START_Y', Blockly.Arduino.ORDER_ATOMIC);
  var length = Blockly.Arduino.valueToCode(this, 'LENGTH', Blockly.Arduino.ORDER_ATOMIC);
  var TYPE = this.getTitleValue('TYPE');
  var code = "u8g.draw" + TYPE + "Line(" + start_x + "," + start_y + "," + length + "); \n";
  return code;
};
//显示-OLED-oled画三角形
Blockly.Arduino.maker17_oled_drawTriangle = function() {
  var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X', Blockly.Arduino.ORDER_ATOMIC);
  var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y', Blockly.Arduino.ORDER_ATOMIC);
  var D1_x = Blockly.Arduino.valueToCode(this, 'D1_X', Blockly.Arduino.ORDER_ATOMIC);
  var D1_y = Blockly.Arduino.valueToCode(this, 'D1_Y', Blockly.Arduino.ORDER_ATOMIC);
  var D2_x = Blockly.Arduino.valueToCode(this, 'D2_X', Blockly.Arduino.ORDER_ATOMIC);
  var D2_y = Blockly.Arduino.valueToCode(this, 'D2_Y', Blockly.Arduino.ORDER_ATOMIC);
  var code = "u8g.drawTriangle(" + D0_x + "," + D0_y + "," + D1_x + "," + D1_y + "," + D2_x + "," + D2_y + "); \n";
  return code;
};

//显示-OLED-oled画矩形（实心、空心）
Blockly.Arduino.maker17_oled_drawFrame = function() {
  var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X', Blockly.Arduino.ORDER_ATOMIC);
  var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y', Blockly.Arduino.ORDER_ATOMIC);
  var Width = Blockly.Arduino.valueToCode(this, 'WIDTH', Blockly.Arduino.ORDER_ATOMIC);
  var Height = Blockly.Arduino.valueToCode(this, 'HEIGHT', Blockly.Arduino.ORDER_ATOMIC);
  var type = this.getTitleValue('TYPE');
  var code = "u8g." + type + "(" + D0_x + "," + D0_y + "," + Width + "," + Height + "); \n";
  return code;
};

////显示-OLED-oled画圆角矩形（实心、空心）
Blockly.Arduino.maker17_oled_drawRFrame = function() {
  var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X', Blockly.Arduino.ORDER_ATOMIC);
  var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y', Blockly.Arduino.ORDER_ATOMIC);
  var Width = Blockly.Arduino.valueToCode(this, 'WIDTH', Blockly.Arduino.ORDER_ATOMIC);
  var Height = Blockly.Arduino.valueToCode(this, 'HEIGHT', Blockly.Arduino.ORDER_ATOMIC);
  var Rauius = Blockly.Arduino.valueToCode(this, 'RADIUS', Blockly.Arduino.ORDER_ATOMIC);
  var type = this.getTitleValue('TYPE');
  var code = "u8g." + type + "(" + D0_x + "," + D0_y + "," + Width + "," + Height + "," + Rauius + "); \n";
  return code;
};
//显示-OLED-oled画圆（实心、空心）
Blockly.Arduino.maker17_oled_drawCircle = function() {
  var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X', Blockly.Arduino.ORDER_ATOMIC);
  var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y', Blockly.Arduino.ORDER_ATOMIC);
  var Rauius = Blockly.Arduino.valueToCode(this, 'RADIUS', Blockly.Arduino.ORDER_ATOMIC);
  var type = this.getTitleValue('TYPE');
  var opt = this.getTitleValue('OPT');
  var code = "u8g." + type + "(" + D0_x + "," + D0_y + "," + Rauius + "," + opt + "); \n";
  return code;
};
//显示-OLED-oled画椭圆（实心、空心）
Blockly.Arduino.maker17_oled_drawEllipse = function() {
  var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X', Blockly.Arduino.ORDER_ATOMIC);
  var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y', Blockly.Arduino.ORDER_ATOMIC);
  var Rauius_X = Blockly.Arduino.valueToCode(this, 'RADIUS_X', Blockly.Arduino.ORDER_ATOMIC);
  var Rauius_Y = Blockly.Arduino.valueToCode(this, 'RADIUS_Y', Blockly.Arduino.ORDER_ATOMIC);

  var type = this.getTitleValue('TYPE');
  var opt = this.getTitleValue('OPT');
  var code = "u8g." + type + "(" + D0_x + "," + D0_y + "," + Rauius_X + "," + Rauius_Y + "," + opt + "); \n";
  return code;
};
//显示-OLED-oled显示字符串
Blockly.Arduino.maker17_oled_drawStr = function() {
  var POS_x = Blockly.Arduino.valueToCode(this, 'POS_X', Blockly.Arduino.ORDER_ATOMIC);
  var POS_y = Blockly.Arduino.valueToCode(this, 'POS_Y', Blockly.Arduino.ORDER_ATOMIC);
  var TEXT = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC);
  var rad = this.getTitleValue('RAD');
  var code = "u8g." + rad + "(" + POS_x + "," + POS_y + "," + TEXT + "); \n";
  return code;
};
//显示-OLED-显示变量（字符串，整型）
Blockly.Arduino.maker17_oled_print = function() {
  var POS_x = Blockly.Arduino.valueToCode(this, 'POS_X', Blockly.Arduino.ORDER_ATOMIC);
  var POS_y = Blockly.Arduino.valueToCode(this, 'POS_Y', Blockly.Arduino.ORDER_ATOMIC);
  var TEXT = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC);
  // var rad = this.getTitleValue('RAD');
  var code = "u8g.setFont(u8g_font_osb18);\n";
  code += "u8g.setPrintPos(" + POS_x + "," + POS_y + ");\n";
  code += "u8g.print(" + TEXT + "); \n";
  return code;
};
//显示-OLED-oled设置字体
Blockly.Arduino.maker17_oled_setFont = function() {
  var type = this.getTitleValue('TYPE');
  var style = this.getTitleValue('STYLE');
  var size = this.getTitleValue('SIZE');
  // var rad = this.getTitleValue('RAD');
  var code = "u8g.setFont(u8g_font_" + type + style + size + ");\n";
  return code;
};

//显示-TM1650-开关，清屏
Blockly.Arduino.maker17_4digitdisplay_power = function() {
  var stat = this.getFieldValue("STAT");
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_tm1650'] = '#include "TM1650.h"';
  Blockly.Arduino.definitions_['var_tm_4display'] = 'TM1650 tm_4display;';
  Blockly.Arduino.setups_['setup_wire_begin'] = 'Wire.begin();';
  Blockly.Arduino.setups_['setup_tm_4display_init'] = 'tm_4display.init();';
  return 'tm_4display.' + stat + '();\n';
};

//显示-TM1650-显示字符串（字符，数值、变量）
Blockly.Arduino.maker17_4digitdisplay_displayString = function() {
  var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_tm1650'] = '#include "TM1650.h"';
  Blockly.Arduino.definitions_['var_tm_4display'] = 'TM1650 tm_4display;';
  Blockly.Arduino.setups_['setup_wire_begin'] = 'Wire.begin();';
  Blockly.Arduino.setups_['setup_tm_4display_init'] = 'tm_4display.init();';
  return 'tm_4display.displayString(' + value + ');\n';
};

//显示-TM1650-显示小数点
Blockly.Arduino.maker17_4digitdisplay_showDot = function() {
  var no = this.getFieldValue("NO");
  var stat = this.getFieldValue("STAT");
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_tm1650'] = '#include "TM1650.h"';
  Blockly.Arduino.definitions_['var_tm_4display'] = 'TM1650 tm_4display;';
  Blockly.Arduino.setups_['setup_wire_begin'] = 'Wire.begin();';
  Blockly.Arduino.setups_['setup_tm_4display_init'] = 'tm_4display.init();';
  var code = 'tm_4display.setDot(' + no + ',' + stat + ');\n';
  return code;
};

//显示-TM1650-设置亮度
Blockly.Arduino.Maker17_4DigitDisplay_Brightness = function() {
  var BRIGHTNESS = this.getTitleValue('BRIGHTNESS');
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_tm1650'] = '#include "TM1650.h"';
  Blockly.Arduino.definitions_['var_tm_4display'] = 'TM1650 tm_4display;';
  Blockly.Arduino.setups_['setup_wire_begin'] = 'Wire.begin();';
  Blockly.Arduino.setups_['setup_tm_4display_init'] = 'tm_4display.init();';
  var code = ' tm_4display.setBrightness(' + BRIGHTNESS + ');\n';
  return code;
};


//时间-DS1307初始化
// Blockly.Arduino.DS1307_init = function() {
//   Blockly.Arduino.definitions_['include_WIRE'] = '#include <Wire.h>';
//   Blockly.Arduino.definitions_['include_ds1307'] = '#include <DS1307.h>';
//   Blockly.Arduino.definitions_['define_clock'] = 'DS1307 clock;';
// };

//时间-DS1307-获取时间
Blockly.Arduino.DS1307_get_time = function() {
  Blockly.Arduino.definitions_['include_WIRE'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_ds1307'] = '#include <DS1307.h>';
  Blockly.Arduino.definitions_['define_clock'] = 'DS1307 clock;';
  var dropdown_type = this.getTitleValue('TIME_TYPE');
  var code = '';
  if (dropdown_type == "year") code += 'clock.' + dropdown_type + '+' + 2000;
  else code += 'clock.' + dropdown_type;
  // return 'tm_4display.' + stat + '();\n';
  return code;
};

//时间-DS1307-设置时间
Blockly.Arduino.DS1307_set_time = function() {
  Blockly.Arduino.definitions_['include_WIRE'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_ds1307'] = '#include <DS1307.h>';
  Blockly.Arduino.definitions_['define_clock'] = 'DS1307 clock;';
  var hour = Blockly.Arduino.valueToCode(this, 'hour', Blockly.Arduino.ORDER_ATOMIC);
  var minute = Blockly.Arduino.valueToCode(this, 'minute', Blockly.Arduino.ORDER_ATOMIC);
  var second = Blockly.Arduino.valueToCode(this, 'second', Blockly.Arduino.ORDER_ATOMIC);
  var code = '';
  if (hour < 25 && hour > 0 && minute < 60 && minute > 0 && second < 60 && second > 0) code += 'clock.fillByHMS(' + hour + ',' + minute + ',' + second + ');\n';
  return code;
};

//时间-DS1307-设置日期
Blockly.Arduino.DS1307_set_date = function() {
  Blockly.Arduino.definitions_['include_WIRE'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_ds1307'] = '#include <DS1307.h>';
  Blockly.Arduino.definitions_['define_clock'] = 'DS1307 clock;';
  var year = Blockly.Arduino.valueToCode(this, 'year', Blockly.Arduino.ORDER_ATOMIC);
  var month = Blockly.Arduino.valueToCode(this, 'month', Blockly.Arduino.ORDER_ATOMIC);
  var day = Blockly.Arduino.valueToCode(this, 'day', Blockly.Arduino.ORDER_ATOMIC);
  var code = '';
  if (year > 0 && month < 13 && month > 0 && day < 32 && day > 0) code += 'clock.fillByYMD(' + year + ',' + month + ',' + day + ');\n';
  return code;
};