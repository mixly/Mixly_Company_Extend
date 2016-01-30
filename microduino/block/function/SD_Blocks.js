'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Blocks.Microduino.HUE = 318;

Blockly.Blocks.SD_Write={
init:function(){
    this.setColour(Blockly.Blocks.Microduino.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.SD_Write)
        .appendField(new Blockly.FieldImage("../../media/Microduino/SD.jpg", 60, 32))
    this.appendValueInput('File_Name')
		.setCheck(String)
		.setAlign(Blockly.ALIGN_RIGHT)
		.appendTitle(Blockly.File_Name);
    this.appendValueInput('Content')
		.setCheck(String)
		.setAlign(Blockly.ALIGN_RIGHT)
		.appendTitle(Blockly.Content);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setOutput(true, Boolean);
	this.setInputsInline(true);
  }
};


Blockly.Blocks.SD_Read={
init:function(){
    this.setColour(Blockly.Blocks.Microduino.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.SD_Read)
        .appendField(new Blockly.FieldImage("../../media/Microduino/SD.jpg", 60, 32))
    this.appendValueInput('File_Name')
        .setCheck(String)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.File_Name);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setOutput(true, Boolean);
    this.setInputsInline(true);
  }
};