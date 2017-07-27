'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


//var colorSet=120;
var colorSet='#27b6ac';

Blockly.Blocks.mdStepperBegin = {
   init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.MDStpperBegin);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    }
};


Blockly.Blocks.mdStepperControl = {


   init: function() {

    var StepperChoice = [
                 ['A', 'A'],
                 ['B', 'B'],
                 ['C', 'C'],
                 ['D', 'D']
              ];

    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.StepperChoice)
        .appendField(new Blockly.FieldDropdown(StepperChoice), 'StepperChoice');

  	this.appendValueInput('speed')
        .setCheck(Number)
        .appendField(Blockly.StepperSpeed);

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    }
};
