'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.microduinoServoMove = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var value_degree = Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);
  var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '0'

  Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>\n';
  Blockly.Arduino.definitions_['var_servo'+dropdown_pin] = 'Servo servo_'+dropdown_pin+';\n';

  var funForServo='';

  funForServo+='void servo'+dropdown_pin+'_move(int target_angle,int move_speed){\n';
  funForServo+='  int servo_angle;\n';
  funForServo+='  servo_angle=servo_'+dropdown_pin+'.read();\n';
  funForServo+='  if (move_speed >= 1000) {\n';
  funForServo+='      servo_'+dropdown_pin+'.write(target_angle);\n';
  funForServo+='  }\n';
  funForServo+='  else {\n';
  funForServo+='  if(target_angle-servo_angle>0){\n';
  funForServo+='    for(int a=0;a<target_angle-servo_angle;a++){\n';
  funForServo+='      servo_'+dropdown_pin+'.write(servo_angle+a);\n';
  funForServo+='      delay(1000/move_speed);\n';
  funForServo+='    }\n';
  funForServo+='  }\n';
  funForServo+='  else if(target_angle-servo_angle<0){\n';
  funForServo+='    for(int a=0;a<servo_angle-target_angle;a++){\n';
  funForServo+='      servo_'+dropdown_pin+'.write(servo_angle-a);\n';
  funForServo+='      delay(1000/move_speed);\n';
  funForServo+='    }\n';
  funForServo+='  } else {\n';
  funForServo+='      servo_'+dropdown_pin+'.write(target_angle);\n';
  funForServo+='    }\n';
  funForServo+='  }\n';
  funForServo+='}\n';

  Blockly.Arduino.definitions_['funForServo'+dropdown_pin] = funForServo;

  Blockly.Arduino.setups_['setup_servo_'+dropdown_pin] = 'servo_'+dropdown_pin+'.attach('+dropdown_pin+');\n';

  var code = 'servo'+dropdown_pin+'_move('+value_degree+','+delay_time+');\n';
  return code;
};