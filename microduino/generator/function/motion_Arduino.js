'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');


Blockly.Arduino.motionBegin = function() {
  //var branch = Blockly.Arduino.statementToCode(this, 'DO');

  Blockly.Arduino.definitions_['define_Wire'] = '#include "Wire.h"';
  Blockly.Arduino.definitions_['define_I2Cdev'] = '#include "I2Cdev.h"';
  Blockly.Arduino.definitions_['define_MPU6050'] = '#include "MPU6050.h"';


  Blockly.Arduino.definitions_['var_accelgyro'] = 'MPU6050 accelgyro;';

  Blockly.Arduino.setups_['setup_wireBegin'] = 'Wire.begin();';

  Blockly.Arduino.setups_['setup_printInitI2C'] ='Serial.println("Initializing I2C devices...");';
  Blockly.Arduino.setups_['setup_accInit'] ='accelgyro.initialize();';
  Blockly.Arduino.setups_['setup_testDevice'] ='Serial.println("Testing device connections...");';
  Blockly.Arduino.setups_['setup_printTest'] ='Serial.println(accelgyro.testConnection() ? "MPU6050 connection successful" : "MPU6050 connection failed");';

  //var flip = this.getFieldValue('FLIP');
  var code='';
  //code+='strip.show();\n'
  // code+='do {\n';
  //code+=branch;
  // code+='} while( oled.nextPage() );\n';

  return code;
};




Blockly.Arduino.accX = function() {
	Blockly.Arduino.definitions_['var_accelX'] = 'int16_t ax;';

	var code='ax';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
}
Blockly.Arduino.accY = function() {
	Blockly.Arduino.definitions_['var_accelY'] = 'int16_t ay;';

	var code='ay';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
}
Blockly.Arduino.accZ = function() {
	Blockly.Arduino.definitions_['var_accelZ'] = 'int16_t az;';

	var code='az';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.gyroX = function() {
  Blockly.Arduino.definitions_['var_gyroX'] = 'int16_t gx;';

  var code='gx';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}
Blockly.Arduino.gyroY = function() {
  Blockly.Arduino.definitions_['var_gyroY'] = 'int16_t gy;';

  var code='gy';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}
Blockly.Arduino.gyroZ = function() {
  Blockly.Arduino.definitions_['var_gyroZ'] = 'int16_t gz;';

  var code='gz';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.tabSpace = function() {
  var code='"\\t"';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}


Blockly.Arduino.motionDoing = function() {

  var accX = Blockly.Arduino.valueToCode(this, 'ax', Blockly.Arduino.ORDER_ATOMIC)
  var accY = Blockly.Arduino.valueToCode(this, 'ay', Blockly.Arduino.ORDER_ATOMIC)
  var accZ = Blockly.Arduino.valueToCode(this, 'az', Blockly.Arduino.ORDER_ATOMIC)

  var gyroX = Blockly.Arduino.valueToCode(this, 'gx', Blockly.Arduino.ORDER_ATOMIC)
  var gyroY = Blockly.Arduino.valueToCode(this, 'gy', Blockly.Arduino.ORDER_ATOMIC)
  var gyroZ = Blockly.Arduino.valueToCode(this, 'gz', Blockly.Arduino.ORDER_ATOMIC)

  //var flip = this.getFieldValue('FLIP');
  //var code='accelgyro.getMotion6(&'+accX+', &'+accY+', &'+accZ+', &gx, &gy, &gz);\n';
  var code='accelgyro.getMotion6(&'+accX+', &'+accY+', &'+accZ+', &'+gyroX+', &'+gyroY+', &'+gyroZ+');\n';

  //code+='strip.show();\n'
  // code+='do {\n';
  // code+=branch;
  // code+='} while( oled.nextPage() );\n';


  return code;
};