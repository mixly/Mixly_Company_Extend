'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');

var colorSet = 518;

Blockly.Blocks.Microduino_KEYGET = {
  init: function() {
  	 var INPUTTYPE = [['INPUT', 'INPUT'],
                    ['INPUTPULLUP', 'INPUTPULLUP']];
   	 var CHECK = [['RELEASE', 'RELEASE'],
                    ['PRESS', 'PRESS'],
                    ['ANALOG', 'ANALOG']];                   
    this.setColour(colorSet);
    this.appendDummyInput("")
		.appendTitle(Blockly.Keyget)
        .appendTitle(Blockly.Keyget_Pin)
        .appendTitle(new Blockly.FieldTextInput('4'),'KPin')
        .appendTitle(Blockly.Keyget_InputType)
        .appendTitle(new Blockly.FieldDropdown(INPUTTYPE), "INPUTTYPE")
        .appendTitle(Blockly.Keyget_Check)
        .appendTitle(new Blockly.FieldDropdown(CHECK), "CHECK")
        .appendTitle(Blockly.Keyget_Or)
        .appendTitle(Blockly.Keyget_Analog)
        .appendTitle(new Blockly.FieldTextInput('0'),'MIN')
        .appendTitle(Blockly.Keyget_To)
        .appendTitle(new Blockly.FieldTextInput('1023'),'MAX');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    },
};
