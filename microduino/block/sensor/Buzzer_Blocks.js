'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


var colorSet = 518;


Blockly.Blocks.BuzzerTone = {	
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
	    .appendTitle(Blockly.Buzzer)
		.appendField(new Blockly.FieldImage("../../media/Microduino/Buzzer.jpg", 45, 32))
    .appendField(Blockly.BuzzerNum)
    .appendField(new Blockly.FieldTextInput("1"), "buzzerNumber")
  	
  	this.appendValueInput("BuzzerPin", Number)
  		.setCheck(Number)
  		.setAlign(Blockly.ALIGN_RIGHT)
  		.appendTitle(Blockly.BuzzerPin);
  	this.appendValueInput("Frequency", Number)
  		.setCheck(Number)
  		.setAlign(Blockly.ALIGN_RIGHT)
  		.appendTitle(Blockly.Frequency);

    this.setPreviousStatement(true,null);
    this.setNextStatement(true,null);
    this.setInputsInline(true);
  },
};


Blockly.Blocks.BuzzerNoTone = { 
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
      .appendTitle(Blockly.BuzzerNoTone)
    .appendField(new Blockly.FieldImage("../../media/Microduino/Buzzer.jpg", 45, 32))
    .appendField(Blockly.BuzzerNum)
    .appendField(new Blockly.FieldTextInput("1"), "buzzerNumber")
    
    this.appendValueInput("BuzzerPin", Number)
      .setCheck(Number)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendTitle(Blockly.BuzzerPin);

    this.setPreviousStatement(true,null);
    this.setNextStatement(true,null);
    this.setInputsInline(true);
  },
};





