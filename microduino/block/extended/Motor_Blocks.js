'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


//var colorSet=120;
var colorSet='#27b6ac';


Blockly.Blocks.MotorBegin = {
   init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_Motor.png", 45, 32))
        .appendField(Blockly.CubeCar)
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    }
};

Blockly.Blocks.MotorBeginchange = {
   init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_Motor.png", 45, 32))
        .appendField(Blockly.N20begin)
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    }
};

Blockly.Blocks.Motor_run = {
   init: function() {

    var Break_left_right = [
                 [Blockly.motor_left, '1'],
                 [Blockly.motor_right, '2'],
              ];

    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.N20choose)
        .appendField(new Blockly.FieldDropdown(Break_left_right), 'Break_left_right');
    // this.appendDummyInput("")
    //     .appendField(Blockly.motor_ctrl)
    //     .appendField(new Blockly.FieldTextInput("255"), "motor_ctrl")

          this.appendValueInput('speed')
        .setCheck(Number)
        .appendField(' '+Blockly.carSpeed);



    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    }
};

Blockly.Blocks.MotorBreak = {
  init: function() {

  var Break_left_right = [
                 [Blockly.motor_left, '1'],
                 [Blockly.motor_right, '2'],
              ];

    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.N20Break)
        .appendField(new Blockly.FieldDropdown(Break_left_right), 'Break_left_right');

    //this.setOutput(true, Number);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  }
};

Blockly.Blocks.MotorFree = {
  init: function() {

  var Free_left_right = [
                 [Blockly.motor_left, '1'],
                 [Blockly.motor_right, '2'],
              ];

    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.N20Free)
        .appendField(new Blockly.FieldDropdown(Free_left_right), 'Free_left_right');

    //this.setOutput(true, Number);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  }
};




Blockly.Blocks.microduinoCarControl = {
  init: function() {

    this.setColour(colorSet);
        this.appendDummyInput("")
        .appendField(Blockly.motor_ctrl);

  this.appendValueInput('leftSpeed')
        .setCheck(Number)
        .appendField(' '+Blockly.leftSpeed);
  this.appendValueInput('rightSpeed')
        .setCheck(Number)
        .appendField(' '+Blockly.rightSpeed);
        
    //this.setOutput(true, Number);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  }
};










// Blockly.Blocks.Car_MotorBegin = {
//   init: function() {
//     this.setColour(colorSet);

//   this.setInputsInline(true);
//     this.setPreviousStatement(true);
//     this.setNextStatement(true);
//   this.setTooltip(Blockly.LKL_IR_SEND_RAW_TOOLTIP);
//   }
// };

// Blockly.Blocks.mCookie_Motor = {
//    init: function() {
//     this.setColour(colorSet);
//     this.appendDummyInput("")
//         .appendField(Blockly.carSpeed)
//         .appendField(new Blockly.FieldTextInput("255"), "speed")
//         .appendField(Blockly.carAngle)
//         .appendField(new Blockly.FieldTextInput("0"), "angle");
//     this.setPreviousStatement(true);
//     this.setNextStatement(true);
// 	this.setInputsInline(true);
//     }
// };
