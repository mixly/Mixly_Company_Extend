'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


var colorSet=120;


Blockly.Blocks.MotorBegin = {
   init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendTitle(Blockly.CubeCar)
        .appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_Motor.jpg", 45, 32))
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    }
};

Blockly.Blocks.mCookie_Motor = {
   init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.carSpeed)
        .appendField(new Blockly.FieldTextInput("255"), "speed")
        .appendField(Blockly.carAngle)
        .appendField(new Blockly.FieldTextInput("0"), "angle");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setInputsInline(true);
    }
};
