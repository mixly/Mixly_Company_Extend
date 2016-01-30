'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');





Blockly.Arduino.MotorBegin = function() {
  var defineMotorBegin='#include <Microduino_Motor.h>\n';
  defineMotorBegin+='#if defined(__AVR_ATmega32U4__) || (__AVR_ATmega1284P__) || defined(__AVR_ATmega644P__) || defined(__AVR_ATmega128RFA1__)\n';
  defineMotorBegin+='#define motor_pin0A 8\n';
  defineMotorBegin+='#define motor_pin0B 6\n';
  defineMotorBegin+='#define motor_pin1A 7\n';
  defineMotorBegin+='#define motor_pin1B 5\n';
  defineMotorBegin+='#else\n';
  defineMotorBegin+='#define motor_pin0A 6\n';
  defineMotorBegin+='#define motor_pin0B 8\n';
  defineMotorBegin+='#define motor_pin1A 5\n';
  defineMotorBegin+='#define motor_pin1B 7\n';
  defineMotorBegin+='#endif\n';
  defineMotorBegin+='Motor MotorLeft(motor_pin0A, motor_pin0B);\n';
  defineMotorBegin+='Motor MotorRight(motor_pin1A, motor_pin1B);\n';
  defineMotorBegin+='#define MAX_THROTTLE 255\n';
  defineMotorBegin+='#define MAX_STEERING 200\n';
  defineMotorBegin+='int16_t throttle = 0;\n';
  defineMotorBegin+='int16_t steering = 0;\n';


  Blockly.Arduino.definitions_['define_motorBegin'] = defineMotorBegin;

  var motorSetup='MotorLeft.Fix(1);\n';
  motorSetup+='MotorRight.Fix(1);\n';
  motorSetup+='delay(1000);\n';

  Blockly.Arduino.setups_['setup_mCookie_bluetooth'] = motorSetup;


  var code='';
  return code;
};



Blockly.Arduino.mCookie_Motor = function() {


  var throttle = this.getFieldValue('speed');
  var steering = this.getFieldValue('angle');

  var code='throttle = '+throttle+';\n';
  code+='steering = '+steering+';\n';

  code+='MotorLeft.Driver(MotorLeft.GetData(throttle, steering, CHAN_LEFT));\n';
  code+='MotorRight.Driver(MotorRight.GetData(throttle, steering, CHAN_RIGHT));\n';
  return code;
};










Blockly.Arduino.mCookie_bluetooth_Robot_Direction = function() {
  var dropdown_pin = this.getTitleValue('PIN')
  var BLE_Run_stye = this.getTitleValue('direction')
  var code='BLE_Joystick('+BLE_Run_stye+')';

  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  if(dropdown_pin=='Serial'||dropdown_pin=='Serial1')
  Blockly.Arduino.definitions_['define_mySerial'] = '#define my_Serial '+dropdown_pin;
  else
  {
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = 'SoftwareSerial '+ dropdown_pin+';';
  Blockly.Arduino.definitions_['define_mySerial'] = '#define my_Serial  mySerial';  
  }

  Blockly.Arduino.definitions_['define_stiring'] = 'String currentInfo;';
  Blockly.Arduino.definitions_['define_data'] = 'char senderData[100];';
  Blockly.Arduino.definitions_['define_as'] = 'int angle = 90, angle1 = 90, angle2 = 90;';
  Blockly.Arduino.definitions_['define_sp'] = 'int speed = 0, speed1 = 0, speed2 = 0;';
  Blockly.Arduino.definitions_['define_lage'] = '#define lage 20\n';

  Blockly.Arduino.setups_['setup_mCookie_bluetooth'] = 'my_Serial.begin(9600);';
  Blockly.Arduino.setups_['setup_mCookie_Serial'] = 'Serial.begin(9600);';

  var joyName='BLE_Joystick';
  var min='\''+'\\'+'n'+'\'';
  var code1 = 'int ' +joyName+'(int num){\n'
  +'if('+dropdown_pin+'.available() > 0) \n'
  +'currentInfo = my_Serial.readStringUntil('+min+');\n'
  +'if (currentInfo != NULL) {\n'
  +'currentInfo.toCharArray(senderData, sizeof(senderData));\n'
  +'sscanf((char *)strstr((char *)senderData, "D:"), "D:%d,%d", &angle, &speed);\n'
  +'}\n'
  +  'if (0 < angle && angle < 90 - lage || 90 + lage < angle && angle < 180){\n'
  +  'if (0 < angle && angle < 90 - lage)\n'
  +    'angle1 = map(angle, 0, 90 - lage, 255, 0);\n'
  +  'else if (90 + lage < angle && angle < 180)\n'
  +   'angle2 = map(angle, 90 + lage, 180 , 0, 255);}\n'
  +'if (-255 < speed && speed < -lage || lage < speed && speed < 255){\n'
  +  'if (-255 < speed && speed < -lage)\n'
  +    'speed1 = map(speed, -255, -lage , 255, 0);\n'
  +  'else if (lage < speed && speed < 255)\n'
  +    'speed2 = map(speed, lage, 255, 0, 255);}\n'
  +'if (num == 1)\n'
  +  'return angle1;\n'
  +'else if (num == 2)\n'
  +  'return angle2;\n'
  +'else if (num == 3)\n'
  +  'return speed1;\n'
  +'else if (num == 4)\n'
  +  'return speed2;}\n'
  Blockly.Arduino.definitions_[joyName] = code1;
  return [code, Blockly.Arduino.ORDER_ATOMIC]|| '0';
 };
