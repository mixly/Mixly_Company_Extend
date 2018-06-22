'use strict';

goog.provide('Blockly.Arduino.makeblock');

goog.require('Blockly.Arduino');

Blockly.Arduino.mb_servo_move = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var dropdown_pin2 = this.getFieldValue('PIN2');
  var value_degree = Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);
  var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '0'
  Blockly.Arduino.definitions_['define_Arduino'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_makeblock_meorion'] = '#include <MeOrion.h>';
  Blockly.Arduino.definitions_['var_servo'+dropdown_pin+dropdown_pin2] = 'Servo servo_'+dropdown_pin+'_'+dropdown_pin2+';';
  Blockly.Arduino.definitions_['var_MePort'+dropdown_pin] = 'MePort port_'+dropdown_pin+'('+dropdown_pin+');';
  Blockly.Arduino.setups_['setup_servo_'+dropdown_pin+dropdown_pin2] = 'servo_'+dropdown_pin+'_'+dropdown_pin2+'.attach(port_'+dropdown_pin+'.pin'+dropdown_pin2+'());\n';
  var code = 'servo_'+dropdown_pin+'_'+dropdown_pin2+'.write('+value_degree+');\n'+'delay(' + delay_time + ');\n';
  return code;
};

Blockly.Arduino.mb_bluetooth_readString = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.definitions_['define_Arduino'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_makeblock_meorion'] = '#include <MeOrion.h>';
  Blockly.Arduino.definitions_['var_makeblock_bluetooth'+dropdown_pin] = 'MeBluetooth myBluetooth_'+dropdown_pin+'('+dropdown_pin+');';
  Blockly.Arduino.setups_['setup_makeblock_bluetooth'+dropdown_pin] = 'myBluetooth_'+dropdown_pin+'.begin(9600);';
  var code = 'myBluetooth_'+dropdown_pin+'.readString()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_bluetooth_available = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.definitions_['define_Arduino'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_makeblock_meorion'] = '#include <MeOrion.h>';
  Blockly.Arduino.definitions_['var_makeblock_bluetooth'+dropdown_pin] = 'MeBluetooth myBluetooth_'+dropdown_pin+'('+dropdown_pin+');';
  Blockly.Arduino.setups_['setup_makeblock_bluetooth'+dropdown_pin] = 'myBluetooth_'+dropdown_pin+'.begin(9600);';
  var code = 'myBluetooth_'+dropdown_pin+'.available()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_display = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var num = Blockly.Arduino.valueToCode(this, 'num',Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Arduino.definitions_['define_Arduino'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_makeblock_meorion'] = '#include <MeOrion.h>';
  Blockly.Arduino.definitions_['var_makeblock_display'+dropdown_pin] = 'Me7SegmentDisplay seg7_'+dropdown_pin+'('+dropdown_pin+');';
  var code = 'seg7_'+dropdown_pin+'.display((float)('+num+'));\n';
  return code;
};

Blockly.Arduino.mb_motor = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var speed = Blockly.Arduino.valueToCode(this, 'speed',Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Arduino.definitions_['define_Arduino'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_makeblock_meorion'] = '#include <MeOrion.h>';
  Blockly.Arduino.definitions_['var_makeblock_motor'+dropdown_pin] = 'MeDCMotor myMotor_'+dropdown_pin+'('+dropdown_pin+');';
  var code = 'myMotor_'+dropdown_pin+'.run('+speed+');\n';
  return code;
};

Blockly.Arduino.mb_sound = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.definitions_['define_Arduino'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_makeblock_meorion'] = '#include <MeOrion.h>';
  Blockly.Arduino.definitions_['var_makeblock_sound'+dropdown_pin] = 'MeSoundSensor mySound_'+dropdown_pin+'('+dropdown_pin+');';
  var code = 'mySound_'+dropdown_pin+'.strength()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_temperature = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var dropdown_pin2 = this.getFieldValue('PIN2');
  Blockly.Arduino.definitions_['define_Arduino'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_makeblock_meorion'] = '#include <MeOrion.h>';
  Blockly.Arduino.definitions_['var_makeblock_temperature'+dropdown_pin+dropdown_pin2] = 'MeTemperature myTemperature_'+dropdown_pin+'_'+dropdown_pin2+'('+dropdown_pin+','+dropdown_pin2+');';
  var code = 'myTemperature_'+dropdown_pin+'_'+dropdown_pin2+'.temperature()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_joystick = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var dropdown_stat = this.getFieldValue('STAT');
  Blockly.Arduino.definitions_['define_Arduino'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_makeblock_meorion'] = '#include <MeOrion.h>';
  Blockly.Arduino.definitions_['var_makeblock_joystick'+dropdown_pin] = 'MeJoystick myJoystick_'+dropdown_pin+'('+dropdown_pin+');';
  var code = 'myJoystick_'+dropdown_pin+'.read('+dropdown_stat+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_potentiometer = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.definitions_['define_Arduino'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_makeblock_meorion'] = '#include <MeOrion.h>';
  Blockly.Arduino.definitions_['var_makeblock_potentiometer'+dropdown_pin] = 'MePotentiometer myPotentiometer_'+dropdown_pin+'('+dropdown_pin+');';
  var code = 'myPotentiometer_'+dropdown_pin+'.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_pyroelectric_infrared = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.definitions_['define_Arduino'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_makeblock_meorion'] = '#include <MeOrion.h>';
  Blockly.Arduino.definitions_['var_makeblock_infrared'+dropdown_pin] = 'MePIRMotionSensor myPIRMotionSensor_'+dropdown_pin+'('+dropdown_pin+');';
  var code = 'myPIRMotionSensor_'+dropdown_pin+'.isHumanDetected()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_chaoshengbo = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var dropdown_pin2 = this.getFieldValue('PIN2');
  Blockly.Arduino.definitions_['define_Arduino'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_makeblock_meorion'] = '#include <MeOrion.h>';
  Blockly.Arduino.definitions_['var_makeblock_chaoshengbo'+dropdown_pin] = 'MeUltrasonicSensor myUltraSensor_'+dropdown_pin+'('+dropdown_pin+');';
  var code = 'myUltraSensor_'+dropdown_pin+'.distance'+dropdown_pin2+'()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_light_grayscale = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.definitions_['define_Arduino'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_makeblock_meorion'] = '#include <MeOrion.h>';
  Blockly.Arduino.definitions_['var_makeblock_light_grayscale'+dropdown_pin] = 'MeLightSensor myLightSensor_'+dropdown_pin+'('+dropdown_pin+');';
  var code = 'myLightSensor_'+dropdown_pin+'.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_light_grayscale_led = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var dropdown_stat = this.getFieldValue('STAT');
  Blockly.Arduino.definitions_['define_Arduino'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_makeblock_meorion'] = '#include <MeOrion.h>';
  Blockly.Arduino.definitions_['var_makeblock_light_grayscale'+dropdown_pin] = 'MeLightSensor myLightSensor_'+dropdown_pin+'('+dropdown_pin+');';
  var code = 'myLightSensor_'+dropdown_pin+'.dWrite1('+dropdown_stat+');\n';
  return code;
};

Blockly.Arduino.mb_rgb_led = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var dropdown_pin2 = this.getFieldValue('PIN2');
  var red = Blockly.Arduino.valueToCode(this, 'RED', Blockly.Arduino.ORDER_ATOMIC);
  var green = Blockly.Arduino.valueToCode(this, 'GREEN', Blockly.Arduino.ORDER_ATOMIC);
  var blue = Blockly.Arduino.valueToCode(this, 'BLUE', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['define_Arduino'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_makeblock_meorion'] = '#include <MeOrion.h>';
  Blockly.Arduino.definitions_['var_MeRGBLed'+dropdown_pin] = 'MeRGBLed rgbled_'+dropdown_pin+'('+dropdown_pin+', 4);';
  var code = 'rgbled_'+dropdown_pin+'.setColor('+dropdown_pin2+','+red+','+green+','+blue+');\n'+'rgbled_'+dropdown_pin+'.show();\n';
  return code;
};

Blockly.Arduino.mb_rgb_ledstrip = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var dropdown_pin1 = this.getFieldValue('PIN1');
  var dropdown_pin2 = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_pin2 = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var red = Blockly.Arduino.valueToCode(this, 'RED', Blockly.Arduino.ORDER_ATOMIC);
  var green = Blockly.Arduino.valueToCode(this, 'GREEN', Blockly.Arduino.ORDER_ATOMIC);
  var blue = Blockly.Arduino.valueToCode(this, 'BLUE', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['define_Arduino'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_makeblock_meorion'] = '#include <MeOrion.h>';
  Blockly.Arduino.definitions_['var_MeRGBLed'+dropdown_pin] = 'MeRGBLed rgbled_'+dropdown_pin+'_2('+dropdown_pin+', '+dropdown_pin1+', 32);';
  var code = 'rgbled_'+dropdown_pin+'_2.setColor('+dropdown_pin2+','+red+','+green+','+blue+');\n'+'rgbled_'+dropdown_pin+'_2.show();\n';
  return code;
};

Blockly.Arduino.MeLineFollower = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.definitions_['define_Arduino'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_makeblock_meorion'] = '#include <MeOrion.h>';
  Blockly.Arduino.definitions_['var_MeLineFollower'+dropdown_pin] = 'MeLineFollower linefollower_'+dropdown_pin+'('+dropdown_pin+');';
  var code = 'linefollower_'+dropdown_pin+'.readSensors()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.MeInfraredReceiver = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.definitions_['define_Arduino'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_makeblock_meorion'] = '#include <MeOrion.h>';
  Blockly.Arduino.definitions_['var_makeblock_ir'+dropdown_pin] = 'MeInfraredReceiver ir_'+dropdown_pin+'('+dropdown_pin+');';
  var code = 'ir_'+dropdown_pin+'.getCode()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_gyro = function() {
  var dropdown_stat = this.getFieldValue('STAT');
  Blockly.Arduino.definitions_['define_Arduino'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_makeblock_meorion'] = '#include <MeOrion.h>';
  Blockly.Arduino.definitions_['var_makeblock_gyro'] = 'MeGyro gyro;';
  Blockly.Arduino.setups_['setup_var_MeGyro_gyro'] = 'gyro.begin();\n';
  //gyro.update();\n
  var code = 'gyro.getAngle('+dropdown_stat+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_gyro_update = function() {
  Blockly.Arduino.definitions_['define_Arduino'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_makeblock_meorion'] = '#include <MeOrion.h>';
  Blockly.Arduino.definitions_['var_makeblock_gyro'] = 'MeGyro gyro;';
  Blockly.Arduino.setups_['setup_var_MeGyro_gyro'] = 'gyro.begin();\n';
  var code = 'gyro.update();\n';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_xiaofengshan = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var dropdown_stat = this.getFieldValue('STAT');
  Blockly.Arduino.definitions_['define_Arduino'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_makeblock_meorion'] = '#include <MeOrion.h>';
  Blockly.Arduino.definitions_['var_MePort'+dropdown_pin] = 'MePort dc130('+dropdown_pin+');';
  Blockly.Arduino.setups_['setup_var_MePort_dc130'] = 'pinMode(dc130.pin1(),OUTPUT);\npinMode(dc130.pin2(),OUTPUT);\n';
  var code = '';
  if(dropdown_stat > 0){
	  code='digitalWrite(dc130.pin1(),1);\ndigitalWrite(dc130.pin2(),0);\n'
  }
  else if(dropdown_stat < 0){
	  code='digitalWrite(dc130.pin1(),0);\ndigitalWrite(dc130.pin2(),1);\n'
  }
  else{
	  code='digitalWrite(dc130.pin1(),0);\ndigitalWrite(dc130.pin2(),0);\n'
  }
  return code;
};
