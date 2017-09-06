'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');


Blockly.Arduino.motionAccGyro = function() {

  Blockly.Arduino.definitions_['define_Wire'] = '#include "Wire.h"';
  Blockly.Arduino.definitions_['define_I2Cdev'] = '#include "I2Cdev.h"';
  Blockly.Arduino.definitions_['define_MPU6050'] = '#include "MPU6050.h"';
  Blockly.Arduino.definitions_['var_accelgyro'] = 'MPU6050 accelgyro;';

  var accGyroVar='';
  accGyroVar+='int16_t accX, accY, accZ;\n';
  accGyroVar+='int16_t gyroX, gyroY, gyroZ;\n';
  Blockly.Arduino.definitions_['var_accelGyro'] = accGyroVar;


  Blockly.Arduino.setups_['setup_wireBegin'] = 'Wire.begin();';

  //Blockly.Arduino.setups_['setup_printInitI2C'] ='Serial.println("Initializing I2C devices...");';
  Blockly.Arduino.setups_['setup_accInit'] ='accelgyro.initialize();';
  //Blockly.Arduino.setups_['setup_testDevice'] ='Serial.println("Testing device connections...");';
  //Blockly.Arduino.setups_['setup_printTest'] ='Serial.println(accelgyro.testConnection() ? "MPU6050 connection successful" : "MPU6050 connection failed");';

  Blockly.Arduino.setups_['setup_printAccGyroTest'] ='accelgyro.testConnection();';

  var code='accelgyro.getMotion6(&accX, &accY, &accZ, &gyroX, &gyroY, &gyroZ);\n';

  return code;
};


Blockly.Arduino.getMotionValue = function() {

  var getType = this.getFieldValue('getType');

  var code=getType;

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.motionDMP = function() {

  Blockly.Arduino.definitions_['define_MPU6050_6Axis_Microduino'] = '#include "MPU6050_6Axis_Microduino.h"';
  Blockly.Arduino.definitions_['var_MPU6050'] = 'MPU6050 mpu;';

  var motionDMP='';
  motionDMP+='Quaternion q;\n';
  motionDMP+='float ypr[3];\n';
  motionDMP+='uint8_t mpuMode;\n';
  motionDMP+='bool mpuReady;\n';
  Blockly.Arduino.definitions_['var_motionDMP'] = motionDMP;


  var setupMotionDMP='';
  setupMotionDMP+='mpuMode = MODE_DMP;\n';
  setupMotionDMP+='mpuReady = mpu.begin(mpuMode);\n';
  Blockly.Arduino.setups_['setup_motionDMP'] = setupMotionDMP;


  var code='';
  code+='if (!mpuReady) return;\n';
  code+='mpu.getYawPitchRoll(ypr);\n';
  code+='if (!mpuReady) return;\n';
  code+='mpu.getYawPitchRoll(ypr);\n';
  return code;
};


Blockly.Arduino.motionSoft = function() {

  var getType = this.getFieldValue('getType');

  Blockly.Arduino.definitions_['define_MPU6050_6Axis_Microduino'] = '#include "MPU6050_6Axis_Microduino.h"';
  Blockly.Arduino.definitions_['define_HMC5883L'] = '#include "HMC5883L.h"';
  Blockly.Arduino.definitions_['var_MPU6050'] = 'MPU6050 mpu;';

  if(getType=='1') {
    Blockly.Arduino.definitions_['define_AXIS_9'] = '#define AXIS_9';
  }


  var defHMC5883L='';
  defHMC5883L+='#ifdef AXIS_9\n';
  defHMC5883L+='  HMC5883L mag;\n';
  defHMC5883L+='#endif\n';


  Blockly.Arduino.definitions_['var_HMC5883L'] = defHMC5883L;


  var motionSoft='';
  motionSoft+='Quaternion q;\n';
  motionSoft+='float ypr[3];\n';
  motionSoft+='float mx, my, mz;\n';
  motionSoft+='uint8_t mpuMode;\n';
  motionSoft+='bool mpuReady;\n';
  Blockly.Arduino.definitions_['var_motionSoft'] = motionSoft;


  var setupMotionSoft='';
  setupMotionSoft+='mpuMode = MODE_SW;\n';
  setupMotionSoft+='mpuReady = mpu.begin(mpuMode);\n';
  
  setupMotionSoft+='#ifdef AXIS_9\n';
  setupMotionSoft+='  mag.begin();\n';
  setupMotionSoft+='  mag.calibrateMag(0);\n';
  setupMotionSoft+='  mag.xOffset;\n';
  setupMotionSoft+='  mag.yOffset;\n';
  setupMotionSoft+='  mag.zOffset;\n';
  setupMotionSoft+='#endif \n';


  Blockly.Arduino.setups_['setup_motionDMP'] = setupMotionSoft;

  var code='';
  code+='if (!mpuReady) return;\n';

  code+='#ifdef AXIS_9\n';
  code+=' mag.getMagneto(&mx, &my, &mz);\n';
  code+='#endif\n';

  code+='#ifdef AXIS_9\n';
  code+=' mpu.getYawPitchRoll(ypr, mx, my, mz);\n';
  code+='#else\n';
  code+=' mpu.getYawPitchRoll(ypr);\n';
  code+='#endif\n';

  return code;
};



Blockly.Arduino.getMotionYawPitchRoll = function() {
  var getType = this.getFieldValue('getType');

  var code='';
  if(getType=='ypr\[2\]') {
    code='(ypr[2]>=0?180-ypr[2]:(ypr[2]*-1)-180)';
  } else {
    code=getType;
  }

  //var code=getType;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};