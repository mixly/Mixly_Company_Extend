'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


//var colorSet=518;
var colorSet='#efa752';


Blockly.Blocks.xyJoystick = {
  init: function() {
    this.setColour(colorSet);

    //this.appendValueInput("intValue")
    this.appendDummyInput()
    .appendField(new Blockly.FieldImage("../../media/Microduino/Joystick.png", 40, 30))
    .appendField(Blockly.Keyget_Pin)
    .appendField(new Blockly.FieldTextInput("A0"), "analogPin")
    .appendField(Blockly.KeygetJoystic)
    .appendField(new Blockly.FieldDropdown([[Blockly.Horizontal, "x"], [Blockly.Vertical, "y"]]),'direction')
    .appendField(Blockly.coordinate);


    var tip="获取一个模拟值\n";
    tip+="返回一个模拟值\n";
    tip+="模拟接口\n";
    this.setTooltip(tip);

    // this.setPreviousStatement(true, null);
    // this.setNextStatement(true, null);
    this.setOutput(true, Number);

  }
};




Blockly.Blocks.microduinoJoystick = {
  init: function() {
    this.setColour(colorSet);

    //this.appendValueInput("intValue")
    this.appendDummyInput()
    .appendField(new Blockly.FieldImage("../../media/Microduino/Joystick.png", 40, 30))
    .appendField(Blockly.Keyget_Pin)
    .appendField(new Blockly.FieldTextInput("A0"), "analogPin")
    .appendField(Blockly.KeygetJoystic)
    .appendField(new Blockly.FieldDropdown([[Blockly.KeyInputPRESS, "0"], 
                                            [Blockly.KeyDownDir, "1"],
                                            [Blockly.KeyLeftDir, "2"],
                                            [Blockly.KeyUpDir, "3"],
                                            [Blockly.KeyRightDir, "4"],
                                            [Blockly.KeyInputRELEASE, "5"]]),'type');
    // .appendField(Blockly.KeyJoysticState);


    var tip="获取一个摇杆状态\n";
    // tip+="返回一个模拟值\n";
    // tip+="模拟接口\n";
    this.setTooltip(tip);

    // this.setPreviousStatement(true, null);
    // this.setNextStatement(true, null);
    this.setOutput(true, Number);

  }
};