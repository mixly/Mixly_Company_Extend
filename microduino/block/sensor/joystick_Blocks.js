'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


var colorSet=518;



Blockly.Blocks.xJoystick = {
  init: function() {
    this.setColour(colorSet);

    //this.appendValueInput("intValue")
    this.appendDummyInput()
    .appendField(Blockly.joyStickX)
    //.setCheck(String)
    .appendField(new Blockly.FieldTextInput("A0"), "xName");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setOutput(true, String);

  }
};


Blockly.Blocks.yJoystick = {
  init: function() {
    this.setColour(colorSet);

    //this.appendValueInput("intValue")
    this.appendDummyInput()
    .appendField(Blockly.joyStickY)
    //.setCheck(String)
    .appendField(new Blockly.FieldTextInput("A1"), "yName");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setOutput(true, String);

  }
};