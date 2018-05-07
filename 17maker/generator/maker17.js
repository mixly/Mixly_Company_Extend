'use strict';
goog.provide('Blockly.Arduino.MAKER17');
goog.require('Blockly.Arduino');

//dht11温湿度传感器
Blockly.Arduino.MAKER17_dht11 = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var what = this.getFieldValue('WHAT');
  Blockly.Arduino.definitions_['define_dht11'] = '#include <dht11.h>';
  Blockly.Arduino.definitions_['var_dht11' + dropdown_pin] = 'dht11 myDHT_' + dropdown_pin + ';';
  var funcName = 'dht_' + dropdown_pin + '_get' + what;
  var code = 'int' + ' ' + funcName + '() {\n' + '  int chk = myDHT_' + dropdown_pin + '.read(' + dropdown_pin + ');\n' + '  int value = myDHT_' + dropdown_pin + '.' + what + ';\n' + '  return value;\n' + '}\n';
  Blockly.Arduino.definitions_[funcName] = code;
  return [funcName + '()', Blockly.Arduino.ORDER_ATOMIC];
};

//dht22温湿度传感器
Blockly.Arduino.MAKER17_dht22 = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var what = this.getFieldValue('WHAT');
  Blockly.Arduino.definitions_['define_dht22'] = '#include "DHT22.h"';
  Blockly.Arduino.setups_['setup_delay2000'] = ' delay(2000);';
  Blockly.Arduino.definitions_['var_dht22' + dropdown_pin] = 'DHT22 myDHT22(' + dropdown_pin + ');';
  var code = 'myDHT22.get' + what + '()';
  return code;
};

//ADXL345传感器
Blockly.Arduino.MAKER17_ADXL345 = function() {

  var type = this.getFieldValue('TYPE');
  Blockly.Arduino.definitions_['define_i2cdev'] = '#include <I2Cdev.h>';
  Blockly.Arduino.definitions_['include_WIRE'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_ADXL345'] = '#include <ADXL345.h>';
  Blockly.Arduino.definitions_['var_adxl345'] = 'ADXL345 accel;';
  Blockly.Arduino.definitions_['int16_tax_ay_az'] = 'int16_t ax, ay, az;';
  Blockly.Arduino.setups_['setups'] = 'Wire.begin();\nSerial.begin(38400);\nSerial.println("Initializing I2C devices...");\naccel.initialize();\nSerial.println("Testing device connections...");\nSerial.println(accel.testConnection() ? "ADXL345 connection successful":"ADXL345 connection failed");';
  var code = 'accel.getAcceleration' + type + '()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//模拟传感器-LM35温度传感器
Blockly.Arduino.MAKER17_LM35temp = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var code = 'analogRead(' + dropdown_pin + ')*0.488';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//执行器-电机转动
Blockly.Arduino.MAKER17_motorA = function() {
  var SPEED_PIN = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var DIR_PIN = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var speed = Blockly.Arduino.valueToCode(this, 'speed', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var code = 'setMotor(' + SPEED_PIN + ', '+DIR_PIN+',' + speed + ');\n';
  Blockly.Arduino.setups_['setup_output_A_S'] = 'pinMode('+SPEED_PIN+', OUTPUT);';
  Blockly.Arduino.setups_['setup_output_A_D'] = 'pinMode('+DIR_PIN+', OUTPUT);';
  Blockly.Arduino.setups_['setup_output_A_S_W'] = 'digitalWrite('+SPEED_PIN+', LOW);';
  Blockly.Arduino.setups_['setup_output_A_D_W'] = 'digitalWrite('+DIR_PIN+', LOW);';
  var funcName = 'setMotor';
  var code2 =' void setMotor(int speedpin,int dirpin, int speed)\n {\nif (speed == 0)\n{\n   digitalWrite(speedpin, LOW);\n  } else if (speed > 0)\n{\n   digitalWrite(dirpin, LOW);\nanalogWrite(speedpin, speed);\n  } \nelse \n{\n digitalWrite(dirpin, HIGH);\n   analogWrite(speedpin, (0-speed));  \n}\n}\n';
  Blockly.Arduino.definitions_[funcName] = code2;
  return code;
};
Blockly.Arduino.MAKER17_motorB = function() {
  var SPEED_PIN = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var DIR_PIN = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var speed = Blockly.Arduino.valueToCode(this, 'speed', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var code = 'setMotor(' + SPEED_PIN + ', '+DIR_PIN+',' + speed + ');\n';
  Blockly.Arduino.setups_['setup_output_B_S'] = 'pinMode('+SPEED_PIN+', OUTPUT);';
  Blockly.Arduino.setups_['setup_output_B_D'] = 'pinMode('+DIR_PIN+', OUTPUT);';
  Blockly.Arduino.setups_['setup_output_B_S_W'] = 'digitalWrite('+SPEED_PIN+', LOW);';
  Blockly.Arduino.setups_['setup_output_B_D_W'] = 'digitalWrite('+DIR_PIN+', LOW);';
  var funcName = 'setMotor';
  var code2 =' void setMotor(int speedpin,int dirpin, int speed)\n {\nif (speed == 0)\n{\n   digitalWrite(speedpin, LOW);\n  } else if (speed > 0)\n{\n   digitalWrite(dirpin, LOW);\nanalogWrite(speedpin, speed);\n  } \nelse \n{\n digitalWrite(dirpin, HIGH);\n   analogWrite(speedpin, (0-speed));  \n}\n}\n';
  Blockly.Arduino.definitions_[funcName] = code2;
  return code;
};


//执行器-电机转动
Blockly.Arduino.MAKER17_8833motorA = function() {
  var SPEED_PIN = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var DIR_PIN = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var speed = Blockly.Arduino.valueToCode(this, 'speed', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  Blockly.Arduino.definitions_['define_8833LIB'] = '#include <DRV8833.h>';
  Blockly.Arduino.definitions_['define8833driver'] = 'DRV8833 driver = DRV8833();';
  Blockly.Arduino.setups_['setup_output_A'] = 'driver.attachMotorA('+SPEED_PIN+', '+DIR_PIN+');';
  var code;
  if(speed>0)
    code ='driver.motorAForward('+speed+');\n';
  else if(speed<0)
    code ='driver.motorAReverse('+(0-speed)+');\n';
  else
    code ='driver.motorAStop();\n';
  return code;
};
Blockly.Arduino.MAKER17_8833motorB = function() {
   var SPEED_PIN = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var DIR_PIN = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var speed = Blockly.Arduino.valueToCode(this, 'speed', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  Blockly.Arduino.definitions_['define_8833LIB'] = '#include <DRV8833.h>';
  Blockly.Arduino.definitions_['define8833driver'] = 'DRV8833 driver = DRV8833();';
  Blockly.Arduino.setups_['setup_output_B'] = 'driver.attachMotorB('+SPEED_PIN+', '+DIR_PIN+');';
  var code;
  if(speed>0)
    code ='driver.motorBForward('+speed+');\n';
  else if(speed<0)
    code ='driver.motorBReverse('+(0-speed)+');\n';
  else
    code ='driver.motorBStop();\n';
  return code;
};
//执行器-蜂鸣器频率选择列表
Blockly.Arduino.MAKER17_tone_notes = function() {
  var code = this.getFieldValue('STAT');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//执行器-蜂鸣器
Blockly.Arduino.MAKER17_tone = function() {
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
Blockly.Arduino.MAKER17_newNoTone = function() {
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
// var lc_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
var lc_num = 1;
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
  var code = '';
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

//显示-max7219-显示图案 
Blockly.Arduino.MAX7219_DisplayChar = function() {
//var lc_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
//  var lc_num=1;
var code;
var lc_chars = Blockly.Arduino.valueToCode(this, 'Chars', Blockly.Arduino.ORDER_ATOMIC);
code = 'for (int i = 0; i < 8; i++)\n';
code += ' m.setColumn(i, ' + lc_chars + '[i]);\n';
return code;
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
  var code = '{';
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
Blockly.Arduino.MAKER17_oled_init = function() {
  var CLK = Blockly.Arduino.valueToCode(this, 'CLK', Blockly.Arduino.ORDER_ATOMIC);
  var DIN = Blockly.Arduino.valueToCode(this, 'DIN', Blockly.Arduino.ORDER_ATOMIC);
  var DC = Blockly.Arduino.valueToCode(this, 'DC', Blockly.Arduino.ORDER_ATOMIC);
  var CS1 = Blockly.Arduino.valueToCode(this, 'CS1', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['define_U8glib'] = '#include <U8glib.h>';
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
Blockly.Arduino.MAKER17_oled_init2 = function() {
  var CLK = Blockly.Arduino.valueToCode(this, 'CLK', Blockly.Arduino.ORDER_ATOMIC);
  var DIN = Blockly.Arduino.valueToCode(this, 'DIN', Blockly.Arduino.ORDER_ATOMIC);
  var DC = Blockly.Arduino.valueToCode(this, 'DC', Blockly.Arduino.ORDER_ATOMIC);
  var CS1 = Blockly.Arduino.valueToCode(this, 'CS1', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['define_U8g2lib'] = '#include <U8g2lib.h>';
  Blockly.Arduino.definitions_['define_u8g2'] = ' U8G2_SSD1306_128X64_NONAME_F_SW_I2C u8g2(U8G2_R0, /* clock=*/ SCL, /* data=*/ SDA, /* reset=*/ U8X8_PIN_NONE);';
  Blockly.Arduino.definitions_['define_u8gspi'] ='#ifdef U8X8_HAVE_HW_SPI\n#include <SPI.h>\n#endif\n #ifdef U8X8_HAVE_HW_I2C\n#include <Wire.h>\n#endif'; 
  var oled_setup = "u8g2.begin();\n\n";
// oled_setup += "u8g2.enableUTF8Print();\n";
Blockly.Arduino.setups_['setup_setup'] = oled_setup;
var code = '';
return code;
};
//显示-OLED-oled获取高度/宽度
Blockly.Arduino.MAKER17_oled_getHeight_or_Width = function() {
  var what = this.getFieldValue('WHAT');
  var funcName = 'u8g2.get' + what + '()';
  return [funcName, Blockly.Arduino.ORDER_ATOMIC];
}
//OLED显示多行文本
Blockly.Arduino.MAKER17_oled_draw4Str = function() {
  var value_text_line1 = Blockly.Arduino.valueToCode(this, 'Text_line1', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
  var value_text_line2 = Blockly.Arduino.valueToCode(this, 'Text_line2', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
  var value_text_line3 = Blockly.Arduino.valueToCode(this, 'Text_line3', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
  var value_text_line4 = Blockly.Arduino.valueToCode(this, 'Text_line4', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
  var code = 'u8g2.drawStr(0, 12, ' + value_text_line1 + ');\n'
  code += 'u8g2.drawStr(0, 28, ' + value_text_line2 + ');\n'
  code += 'u8g2.drawStr(0, 44, ' + value_text_line3 + ');\n'
  code += 'u8g2.drawStr(0, 60, ' + value_text_line4 + ');\n'
  return code;
};

//显示-OLED-oled画点
Blockly.Arduino.MAKER17_oled_drawPixe = function() {
  var pos_x = Blockly.Arduino.valueToCode(this, 'POS_X', Blockly.Arduino.ORDER_ATOMIC);
  var pos_y = Blockly.Arduino.valueToCode(this, 'POS_Y', Blockly.Arduino.ORDER_ATOMIC);
  var code = "";
//x和y可以是变量也可以是数字，对此做判断
if ((!isNaN(pos_x) && pos_x < 128 && pos_x >= 0) || (isNaN(pos_x))) {
  code += 'u8g2.drawPixel(' + pos_x + ',';
}
if ((!isNaN(pos_y) && pos_y < 64 && pos_y >= 0) || (isNaN(pos_y))) {
  code += pos_y + ');\n';
}
if (code.split(",").length == 2 && code.split(")").length == 2) return code;
else return "";
};

//oled新建页面
Blockly.Arduino.MAKER17_oled_page = function() {
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
branch = branch.replace(/(^\s*)|(\s*$)/g, ""); //去除两端空格
if (branch) {
  var code = "  u8g2.firstPage();\n do {\n" + branch + "\n} \nwhile (u8g2.nextPage());\n";
  return code;
}
};

//显示-OLED-显示汉字/图案
Blockly.Arduino.MAKER17_oled_showBitmap = function() {
  var start_x = Blockly.Arduino.valueToCode(this, 'START_X', Blockly.Arduino.ORDER_ATOMIC);
  var start_y = Blockly.Arduino.valueToCode(this, 'START_Y', Blockly.Arduino.ORDER_ATOMIC);
  var Height = this.getFieldValue('HEIGHT');
  var WIDTH = this.getFieldValue('WIDTH');
  var data_name = Blockly.Arduino.valueToCode(this, 'bitmap_name', Blockly.Arduino.ORDER_ATOMIC);
data_name = data_name.replace(/\"/g, ""); //过滤引号
var code = "";
//x和y可以是变量也可以是数字，对此做判断
if ((!isNaN(start_x) && start_x < 128 && start_x >= 0) || (isNaN(start_x))) {
  code = 'u8g2.drawXBM(' + start_x + ',';
}
if ((!isNaN(start_y) && start_y < 64 && start_y >= 0) || (isNaN(start_y))) {
  code += start_y + ',' + parseInt(WIDTH) + ' ,' + parseInt(Height) + ', ' + data_name + ');\n';
}
if (code.split(",").length == 5 && code.split(")").length == 2) 
  return code;
else return "";
};

//显示-oled-定义字模名称和数据
Blockly.Arduino.MAKER17_oled_define_bitmap_data = function() {
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var text = this.getFieldValue('TEXT');
  Blockly.Arduino.definitions_['var_lists' + varName] = 'static unsigned char ' + varName + '[]={' + text + ' };\n';
  return '';
};

//显示-OLED-oled画线
Blockly.Arduino.MAKER17_oled_drawLine = function() {
  var start_x = Blockly.Arduino.valueToCode(this, 'START_X', Blockly.Arduino.ORDER_ATOMIC);
  var start_y = Blockly.Arduino.valueToCode(this, 'START_Y', Blockly.Arduino.ORDER_ATOMIC);
  var end_x = Blockly.Arduino.valueToCode(this, 'END_X', Blockly.Arduino.ORDER_ATOMIC);
  var end_y = Blockly.Arduino.valueToCode(this, 'END_Y', Blockly.Arduino.ORDER_ATOMIC);
  var code = "";
//x和y可以是变量也可以是数字，对此做判断
if ((!isNaN(start_x) && start_x < 128 && start_x >= 0) || (isNaN(start_x))) {
  code = 'u8g2.drawLine(' + start_x + ',';
}
if ((!isNaN(start_y) && start_y < 64 && start_y >= 0) || (isNaN(start_y))) {
  code += start_y + ',';
}
if ((!isNaN(end_x) && end_x < 128 && end_x >= 0) || (isNaN(end_x))) {
  code += end_x + ',';
}
if ((!isNaN(end_y) && end_y < 64 && end_y >= 0) || (isNaN(end_y))) {
  code += end_y + ');\n';
}
if (code.split(",").length == 4 && code.split(")").length == 2) return code;
else return "";
};

//显示-OLED-oled画水平/垂直直线
Blockly.Arduino.MAKER17_oled_draw_Str_Line = function() {
  var start_x = Blockly.Arduino.valueToCode(this, 'START_X', Blockly.Arduino.ORDER_ATOMIC);
  var start_y = Blockly.Arduino.valueToCode(this, 'START_Y', Blockly.Arduino.ORDER_ATOMIC);
  var length = Blockly.Arduino.valueToCode(this, 'LENGTH', Blockly.Arduino.ORDER_ATOMIC);
  var TYPE = this.getFieldValue('TYPE');
  var code = "";
//x和y可以是变量也可以是数字，对此做判断
if ((!isNaN(start_x) && start_x < 128 && start_x >= 0) || (isNaN(start_x))) {
  code = "u8g2.draw" + TYPE + "Line(" + start_x + ',';
}
if ((!isNaN(start_y) && start_y < 64 && start_y >= 0) || (isNaN(start_y))) {
  code += start_y + ',';
}
if ((!isNaN(length) && length < 129 && length > 0) || (isNaN(length))) {
  code += length + ');\n';
}
if (code.split(",").length == 3 && code.split(")").length == 2) return code;
else return "";

};

//显示-OLED-oled画三角形
Blockly.Arduino.MAKER17_oled_drawTriangle = function() {
  var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X', Blockly.Arduino.ORDER_ATOMIC);
  var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y', Blockly.Arduino.ORDER_ATOMIC);
  var D1_x = Blockly.Arduino.valueToCode(this, 'D1_X', Blockly.Arduino.ORDER_ATOMIC);
  var D1_y = Blockly.Arduino.valueToCode(this, 'D1_Y', Blockly.Arduino.ORDER_ATOMIC);
  var D2_x = Blockly.Arduino.valueToCode(this, 'D2_X', Blockly.Arduino.ORDER_ATOMIC);
  var D2_y = Blockly.Arduino.valueToCode(this, 'D2_Y', Blockly.Arduino.ORDER_ATOMIC);
  var code = "";
//x和y可以是变量也可以是数字，对此做判断
if ((!isNaN(D0_x) && D0_x < 128 && D0_x >= 0) || (isNaN(D0_x))) {
  code = 'u8g2.drawTriangle(' + D0_x + ',';
}
if ((!isNaN(D0_y) && D0_y < 64 && D0_y >= 0) || (isNaN(D0_y))) {
  code += D0_y + ',';
}
if ((!isNaN(D1_x) && D1_x < 128 && D1_x >= 0) || (isNaN(D1_x))) {
  code += D1_x + ',';
}
if ((!isNaN(D1_y) && D1_y < 64 && D1_y >= 0) || (isNaN(D1_y))) {
  code += D1_y + ',';
}
if ((!isNaN(D2_x) && D2_x < 128 && D2_x >= 0) || (isNaN(D2_x))) {
  code += D2_x + ',';
}
if ((!isNaN(D2_y) && D2_y < 64 && D2_y >= 0) || (isNaN(D2_y))) {
  code += D2_y + ');\n';
}
if (code.split(",").length == 6 && code.split(")").length == 2) return code;
else return "";
};

//显示-OLED-oled画矩形（实心、空心）
Blockly.Arduino.MAKER17_oled_drawFrame = function() {
  var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X', Blockly.Arduino.ORDER_ATOMIC);
  var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y', Blockly.Arduino.ORDER_ATOMIC);
  var Width = Blockly.Arduino.valueToCode(this, 'WIDTH', Blockly.Arduino.ORDER_ATOMIC);
  var Height = Blockly.Arduino.valueToCode(this, 'HEIGHT', Blockly.Arduino.ORDER_ATOMIC);
  var type = this.getFieldValue('TYPE');
  var code = "";

//x和y可以是变量也可以是数字，对此做判断
if ((!isNaN(D0_x) && D0_x < 128 && D0_x >= 0) || (isNaN(D0_x))) 
  code = 'u8g2.'+type+'(' + D0_x + ',';
if ((!isNaN(D0_y) && D0_y < 64 && D0_y >= 0) || (isNaN(D0_y))) 
  code += D0_y + ',';
if ((!isNaN(Width) && Width < 128 && Width >= 0) || (isNaN(Width))) 
  code += Width + ',';
if ((!isNaN(Height) && Height < 64 && Height >= 0) || (isNaN(Height))) 
  code += Height + ');\n';
if (code.split(",").length == 4 && code.split(")").length == 2) return code;
else return "";
};

//显示-OLED-oled画圆角矩形（实心、空心）
Blockly.Arduino.MAKER17_oled_drawRFrame = function() {
  var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X', Blockly.Arduino.ORDER_ATOMIC);
  var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y', Blockly.Arduino.ORDER_ATOMIC);
  var Width = Blockly.Arduino.valueToCode(this, 'WIDTH', Blockly.Arduino.ORDER_ATOMIC);
  var Height = Blockly.Arduino.valueToCode(this, 'HEIGHT', Blockly.Arduino.ORDER_ATOMIC);
  var Rauius = Blockly.Arduino.valueToCode(this, 'RADIUS', Blockly.Arduino.ORDER_ATOMIC);
  var type = this.getFieldValue('TYPE');
  var code = "";
//x和y可以是变量也可以是数字，对此做判断
if ((!isNaN(D0_x) && D0_x < 128 && D0_x >= 0) || (isNaN(D0_x))) 
  code = 'u8g2.'+type+'(' + D0_x + ',';
if ((!isNaN(D0_y) && D0_y < 64 && D0_y >= 0) || (isNaN(D0_y))) 
  code += D0_y + ',';
if ((!isNaN(Width) && Width < 128 && Width >= 0) || (isNaN(Width))) 
  code += Width + ',';
if ((!isNaN(Height) && Height < 64 && Height >= 0) || (isNaN(Height))) 
  code += Height + ',';
if ((!isNaN(Rauius) && Rauius < 64 && Rauius >= 0) || (isNaN(Rauius))) 
  code += Rauius + ');\n';
if (code.split(",").length == 5 && code.split(")").length == 2) return code;
else return "";
};

//显示-OLED-oled画圆（实心、空心）
Blockly.Arduino.MAKER17_oled_drawCircle = function() {
  var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X', Blockly.Arduino.ORDER_ATOMIC);
  var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y', Blockly.Arduino.ORDER_ATOMIC);
  var Rauius = Blockly.Arduino.valueToCode(this, 'RADIUS', Blockly.Arduino.ORDER_ATOMIC);
  var type = this.getFieldValue('TYPE');
  var opt = this.getFieldValue('OPT');
  var code = "";
//x和y可以是变量也可以是数字，对此做判断
if ((!isNaN(D0_x) && D0_x < 128 && D0_x >= 0) || (isNaN(D0_x))) 
  code = 'u8g2.'+type+'(' + D0_x + ',';
if ((!isNaN(D0_y) && D0_y < 64 && D0_y >= 0) || (isNaN(D0_y))) 
  code += D0_y + ',';
if ((!isNaN(Rauius) && Rauius < 64 && Rauius >= 0) || (isNaN(Rauius))) 
  code += Rauius + "," + opt + "); \n";
if (code.split(",").length == 4 && code.split(")").length == 2) return code;
else return "";
};

//显示-OLED-oled画椭圆（实心、空心）
Blockly.Arduino.MAKER17_oled_drawEllipse = function() {
  var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X', Blockly.Arduino.ORDER_ATOMIC);
  var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y', Blockly.Arduino.ORDER_ATOMIC);
  var Rauius_X = Blockly.Arduino.valueToCode(this, 'RADIUS_X', Blockly.Arduino.ORDER_ATOMIC);
  var Rauius_Y = Blockly.Arduino.valueToCode(this, 'RADIUS_Y', Blockly.Arduino.ORDER_ATOMIC);
  var type = this.getFieldValue('TYPE');
  var opt = this.getFieldValue('OPT');
  var code = "";
//x和y可以是变量也可以是数字，对此做判断
if ((!isNaN(D0_x) && D0_x < 128 && D0_x >= 0) || (isNaN(D0_x))) 
  code = 'u8g2.'+type+'(' + D0_x + ',';
if ((!isNaN(D0_y) && D0_y < 64 && D0_y >= 0) || (isNaN(D0_y))) 
  code += D0_y + ',';
if ((!isNaN(Rauius_X) && Rauius_X < 64 && Rauius_X >= 0) || (isNaN(Rauius_X))) 
  code += Rauius_X + "," ;
if ((!isNaN(Rauius_Y) && Rauius_Y < 64 && Rauius_Y >= 0) || (isNaN(Rauius_Y))) 
  code += Rauius_Y + "," + opt + "); \n";
if (code.split(",").length == 5 && code.split(")").length == 2) return code;
else return "";
};

//显示-OLED-oled显示字符串
Blockly.Arduino.MAKER17_oled_drawStr = function() {
  var POS_x = Blockly.Arduino.valueToCode(this, 'POS_X', Blockly.Arduino.ORDER_ATOMIC);
  var POS_y = Blockly.Arduino.valueToCode(this, 'POS_Y', Blockly.Arduino.ORDER_ATOMIC);
  var TEXT = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC);

  var code = "";
//x和y可以是变量也可以是数字，对此做判断
if ((!isNaN(POS_x) && POS_x < 128 && POS_x >= 0) || (isNaN(POS_x))) 
  code = 'u8g2.drawStr(' + POS_x + ',';
if ((!isNaN(POS_y) && POS_y < 64 && POS_y >= 0) || (isNaN(POS_y))) 
  code += POS_y + ','+ TEXT + "); \n";
if (code.split(",").length == 3&& code.split(")").length == 2) return code;
else return "";
};

//显示-OLED-显示变量（字符串，整型）
Blockly.Arduino.MAKER17_oled_print = function() {
  var POS_x = Blockly.Arduino.valueToCode(this, 'POS_X', Blockly.Arduino.ORDER_ATOMIC);
  var POS_y = Blockly.Arduino.valueToCode(this, 'POS_Y', Blockly.Arduino.ORDER_ATOMIC);
  var TEXT = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC);
  var code = "";
//x和y可以是变量也可以是数字，对此做判断
if ((!isNaN(POS_x) && POS_x < 128 && POS_x >= 0) || (isNaN(POS_x))) 
  code = 'u8g2.setFontPosTop();\nu8g2.setCursor(' + POS_x + ',';
if ((!isNaN(POS_y) && POS_y < 64 && POS_y >= 0) || (isNaN(POS_y))) 
  code += POS_y + "); \n";
code += "u8g2.print(" + TEXT + "); \n";
return code;
};

//显示-OLED-oled设置字体
Blockly.Arduino.MAKER17_oled_setFont = function() {
  var type = this.getFieldValue('TYPE');
  var code = "u8g2.setFont(u8g2_font_"+type+");\nu8g2.setFontPosTop();\n";
// if (type == "Adobe" && size == "11") {
//   code = "u8g2.setFont(u8g2_font_" + style.toUpperCase() + "14);\n";
// } else if (type == "Adobe" && size == "20") {
//   code = "u8g2.setFont(u8g2_font_cour" + style.toUpperCase() + "24);\n";
// } else if (type == "Adobe" && size == "25") {
//   code = "u8g2.setFont(u8g2_font_helv" + style.toUpperCase() + "24);\n";
// } else code = "u8g2.setFont(u8g2_font_" + type + style + size + ");\n";
return code;
};

//显示-TM1650-开关，清屏
Blockly.Arduino.MAKER17_4digitdisplay_power = function() {
  var stat = this.getFieldValue("STAT");
  Blockly.Arduino.definitions_['include_WIRE'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_tm1650'] = '#include "TM1650.h"';
  Blockly.Arduino.definitions_['var_tm_4display'] = 'TM1650 tm_4display;';
  Blockly.Arduino.setups_['setup_wire_begin'] = 'Wire.begin();';
  Blockly.Arduino.setups_['setup_tm_4display_init'] = 'tm_4display.init();';
  return 'tm_4display.' + stat + '();\n';
};

//显示-TM1650-显示字符串（字符，数值、变量）
Blockly.Arduino.MAKER17_4digitdisplay_displayString = function() {
  var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_WIRE'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_tm1650'] = '#include "TM1650.h"';
  Blockly.Arduino.definitions_['var_tm_4display'] = 'TM1650 tm_4display;';
  Blockly.Arduino.setups_['setup_wire_begin'] = 'Wire.begin();';
  Blockly.Arduino.setups_['setup_tm_4display_init'] = 'tm_4display.init();';
  return 'tm_4display.displayString(' + value + ');\n';
};

//显示-TM1650-显示小数点
Blockly.Arduino.MAKER17_4digitdisplay_showDot = function() {
  var no = this.getFieldValue("NO");
  var stat = this.getFieldValue("STAT");
  Blockly.Arduino.definitions_['include_WIRE'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_tm1650'] = '#include "TM1650.h"';
  Blockly.Arduino.definitions_['var_tm_4display'] = 'TM1650 tm_4display;';
  Blockly.Arduino.setups_['setup_wire_begin'] = 'Wire.begin();';
  Blockly.Arduino.setups_['setup_tm_4display_init'] = 'tm_4display.init();';
  var code = 'tm_4display.setDot(' + no + ',' + stat + ');\n';
  return code;
};

//显示-TM1650-设置亮度
Blockly.Arduino.MAKER17_4DigitDisplay_Brightness = function() {
  var BRIGHTNESS = this.getFieldValue('BRIGHTNESS');
  Blockly.Arduino.definitions_['include_WIRE'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_tm1650'] = '#include "TM1650.h"';
  Blockly.Arduino.definitions_['var_tm_4display'] = 'TM1650 tm_4display;';
  Blockly.Arduino.setups_['setup_wire_begin'] = 'Wire.begin();';
  Blockly.Arduino.setups_['setup_tm_4display_init'] = 'tm_4display.init();';
  var code = ' tm_4display.setBrightness(' + BRIGHTNESS + ');\n';
  return code;
};
//显示-TM1637-初始化
Blockly.Arduino.MAKER17_TM1637_init = function() {
  var CLK = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var DIO = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_tm1637'] = '#include "SevenSegmentTM1637.h"';
  Blockly.Arduino.definitions_['var_tm1637'] = 'SevenSegmentTM1637 display(' + CLK + ',' + DIO + ');';
  Blockly.Arduino.setups_['setup_tm1637_init'] = '  display.begin();\ndelay(1000); ';
  return '';
};


//显示-TM1637-显示字符串（字符，数值、变量）
Blockly.Arduino.MAKER17_TM1637_displayString = function() {

  var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);
  var code = 'display.clear();\n display.print('+value+');\n ';
  return code;
};

//显示-TM1637-显示时间
Blockly.Arduino.MAKER17_TM1637_displayTime = function() {
  var CLK = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var DIO = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);
  var hour = Blockly.Arduino.valueToCode(this, 'hour', Blockly.Arduino.ORDER_ATOMIC);
  var minute = Blockly.Arduino.valueToCode(this, 'minute', Blockly.Arduino.ORDER_ATOMIC);

//  Blockly.Arduino.definitions_['var_tm1637'] = 'SevenSegmentExtended display(' + CLK + ',' + DIO + ');';
var code = '  byte hours ='+hour+';\n';
code+='  byte minutes  = '+ minute+';\n';
code+='  byte second  = 0;\n';
code+='for (; hours < 24; hours++)\n{\nfor ( ; minutes < 60; minutes++)\n{\nfor ( ; second < 60; second++)\n{\ndisplay.printTime(hours, minutes, true);\n}\nsecond=0;\n}\nminutes = 0;\n}\n';
return code;
};

//显示-TM1637-设置亮度
Blockly.Arduino.MAKER17_TM1637_Brightness = function() {
  var BRIGHTNESS = Blockly.Arduino.valueToCode(this, 'BRIGHTNESS', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
// var BRIGHTNESS = this.getFieldValue('BRIGHTNESS');
var code = '  display.setBacklight(' + BRIGHTNESS + ');\n';
return code;
};
//时间-DS1307初始化
// Blockly.Arduino.DS1307_init = function() {
//   Blockly.Arduino.definitions_['include_WIRE'] = '#include <Wire.h>';
//   Blockly.Arduino.definitions_['include_ds1307'] = '#include <DS1307.h>';
//   Blockly.Arduino.definitions_['define_clock'] = 'DS1307 clock;';
// };
//时间-DS1307-获取时间
Blockly.Arduino.DS1307_start_get_time = function() {
  Blockly.Arduino.definitions_['include_WIRE'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_ds1307'] = '#include <DS1307RTC.h>';
  Blockly.Arduino.definitions_['include_TimeLib'] = '#include <TimeLib.h>';
  Blockly.Arduino.setups_['setup_ds1307'] = '  Serial.begin(9600);  while (!Serial) ;  \ndelay(200);  \n';
  Blockly.Arduino.definitions_['tmElements_t'] = 'tmElements_t tm;\n';
  var code = 'RTC.read(tm); ';
  return code;
};
//时间-DS1307-获取时间
Blockly.Arduino.DS1307_get_time = function() {
  Blockly.Arduino.definitions_['include_WIRE'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_ds1307'] = '#include <DS1307RTC.h>';
  Blockly.Arduino.definitions_['include_TimeLib'] = '#include <TimeLib.h>';
  Blockly.Arduino.setups_['setup_ds1307'] = '  Serial.begin(9600);  while (!Serial) ;  \ndelay(200);  \n';
  Blockly.Arduino.definitions_['tmElements_t'] = 'tmElements_t tm;\n';
  var dropdown_type = this.getFieldValue('TIME_TYPE');
  var code = '  ';
  if (dropdown_type == "Year") code += 'tmYearToCalendar(tm.Year);';
  else code += 'tm.' + dropdown_type;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
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
//hour、minute、second可以是变量也可以是数字，对此做判断
if ((!isNaN(hour) && hour < 25 && hour > 0) || (isNaN(hour))) {
  code += 'clock.fillByHMS(' + hour + ',';
}
if ((!isNaN(minute) && minute < 61 && minute > 0) || (isNaN(minute))) {
  code += minute + ',';
}
if ((!isNaN(second) && second < 61 && second > 0) || (isNaN(second))) {
  code += second + ');\n';
}
if (code.split(",").length == 3 && code.split(")").length == 2) return code;
else return "";
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
  if ((!isNaN(year) && year > 0) || (isNaN(year))) {
    code += 'clock.fillByYMD(' + year + ',';
  }
  if ((!isNaN(month) && month < 13 && month > 0) || (isNaN(month))) {
    code += month + ',';
  }
  if ((!isNaN(day) && day < 32 && day > 0) || (isNaN(day))) {
    code += day + ');\n';
  }
  if (code.split(",").length == 3 && code.split(")").length == 2) return code;
  else return "";
};

//IIC地址查找
Blockly.Arduino.MAKER17_IICSCAN = function() {
  Blockly.Arduino.definitions_['include_WIRE'] = '#include <Wire.h>';
  Blockly.Arduino.setups_['setup_delay2000'] = '  Wire.begin();\nSerial.begin(9600);\nSerial.println("I2C Scanner");\n';
  var code = 'byte error, address;\nint nDevices;\nSerial.println("Scanning...");\nnDevices = 0;\nfor (address = 1; address < 127; address++ )\n{\n Wire.beginTransmission(address);\nerror = Wire.endTransmission();\nif (error == 0){\nSerial.print("I2C device found at address 0x");\nif (address < 16)\nSerial.print("0"); \nSerial.print(address, HEX);  \nSerial.println(" !");\nnDevices++;\n}\nelse if (error == 4){\nSerial.print("Unknow error at address 0x");\nif (address < 16)Serial.print("0"); \nSerial.println(address, HEX);  }\n}\nif (nDevices == 0)\nSerial.println("No I2C devices found");\nelse \nSerial.println("done");\ndelay(5000); ';
  return code;
};

//MP3
Blockly.Arduino.MAKER17_MP3_VOL = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var VOL = Blockly.Arduino.valueToCode(this, 'VOLUME', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  Blockly.Arduino.definitions_['include_MAKER17_MP3'] = '#include "MAKER17_MP3.h"';
  Blockly.Arduino.definitions_['var_MAKER17_MP3_PLAY' + dropdown_pin] = 'MP3  MP3_' + dropdown_pin + '' + '(' + dropdown_pin + ');';
  var code = 'MP3_' + dropdown_pin + '.volume(map(' + VOL + ', 0, 100, 0, 30));\n'
  return code;
};
Blockly.Arduino.MAKER17_MP3_PLAY = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var Num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  Blockly.Arduino.definitions_['include_MAKER17_MP3'] = '#include "MAKER17_MP3.h"';
  Blockly.Arduino.definitions_['var_MAKER17_MP3_PLAY' + dropdown_pin] = 'MP3  MP3_' + dropdown_pin + '' + '(' + dropdown_pin + ');';
  Blockly.Arduino.setups_['setup_MP3_PLAY' + dropdown_pin] = 'MP3_' + dropdown_pin + '.begin(9600);\n';
  var code = 'MP3_' + dropdown_pin + '.play(' + Num + ');\n'
  return code;
};

Blockly.Arduino.MAKER17_MP3_STATE = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_stat = this.getFieldValue('STAT');
  Blockly.Arduino.definitions_['include_MAKER17_MP3'] = '#include "MAKER17_MP3.h"';
  Blockly.Arduino.definitions_['var_nova_MP3_PLAY' + dropdown_pin] = 'MP3  MP3_' + dropdown_pin + '' + '(' + dropdown_pin + ');';
  Blockly.Arduino.setups_['setup_MP3_PLAY' + dropdown_pin] = 'MP3_' + dropdown_pin + '.begin(9600);\n';
  var code = 'MP3_' + dropdown_pin + '.' + dropdown_stat + ';\n'
  return code;
};
// DS3231
//时间-DS3231-获取时间
Blockly.Arduino.DS3231_get_time = function() {
  Blockly.Arduino.definitions_['include_WIRE'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_ds3231'] = '#include "Sodaq_DS3231.h"';
  Blockly.Arduino.setups_['setup_init_rtc'] = 'Wire.begin();\n  rtc.begin();';
  var dropdown_type = this.getFieldValue('TIME_TYPE');
  var code = '';
  code += 'rtc.now().' + dropdown_type + '()';
// return code;
return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//时间-DS3231-设置时间
Blockly.Arduino.DS3231_set_datetime = function() {

  Blockly.Arduino.definitions_['include_WIRE'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_ds3231'] = '#include "Sodaq_DS3231.h"';
  Blockly.Arduino.setups_['setup_init_rtc'] = 'Wire.begin();\n  rtc.begin();\n';
  var year = Blockly.Arduino.valueToCode(this, 'year', Blockly.Arduino.ORDER_ATOMIC);
  var month = Blockly.Arduino.valueToCode(this, 'month', Blockly.Arduino.ORDER_ATOMIC);
  var day = Blockly.Arduino.valueToCode(this, 'day', Blockly.Arduino.ORDER_ATOMIC);
  var dayOfWeek = Blockly.Arduino.valueToCode(this, 'dayOfWeek', Blockly.Arduino.ORDER_ATOMIC);
  var hour = Blockly.Arduino.valueToCode(this, 'hour', Blockly.Arduino.ORDER_ATOMIC);
  var minute = Blockly.Arduino.valueToCode(this, 'minute', Blockly.Arduino.ORDER_ATOMIC);
  var second = Blockly.Arduino.valueToCode(this, 'second', Blockly.Arduino.ORDER_ATOMIC);
//Blockly.Arduino.definitions_['define_dt'] = 'DateTime dt('+ year +', '+ month +', '+ day +', '+ hour +', '+ minute +', '+ second +', 1);';
var code = '';
// if (year > 0 && month < 13 && month > 0 && day < 32 && day > 0 
//   && dayOfWeek < 8 && dayOfWeek > 0 
//   && hour < 25 && hour > 0 && minute < 60 && minute > 0 && second < 60 && second > 0){
//   code += 'DateTime dt('+ year +', '+ month +', '+ day +', '+ hour +', '+ minute +', '+ second +', '+ dayOfWeek +');\n';
//   code += 'rtc.setDateTime(dt);\n';    
// }
code += 'DateTime dt(' + year + ', ' + month + ', ' + day + ', ' + hour + ', ' + minute + ', ' + second + ', ' + dayOfWeek + ');\n';
code += 'rtc.setDateTime(dt);\n';

return code;
};