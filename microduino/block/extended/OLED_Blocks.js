'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


//Blockly.Blocks.Microduino.HUE = 120;
Blockly.Blocks.Microduino.GRE = 120;


Blockly.Blocks.group_lcd_begin = {
  init: function() {
	var FLIP = [['none', 'undoRotation'],['90', 'setRot90'],['180', 'setRot180'],['270', 'setRot270']];

    //this.setColour(Blockly.Blocks.Microduino.HUE);
    this.setColour(Blockly.Blocks.Microduino.GRE);
    this.appendDummyInput("")
        .appendTitle("OLED-loop")
    this.appendDummyInput("")
		.appendTitle("flip screen")
		.appendField(new Blockly.FieldDropdown(FLIP), 'FLIP')
	this.appendStatementInput('DO')
	this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
//    this.setTooltip("test");
	this.setInputsInline(true);
	},
};

Blockly.Blocks.group_lcd_print = {
  init: function() {
	var TYPE = [['Small', 'setFont_S'],['Middle', 'setFont_M'],['Large', 'setFont_L']];

    // this.setColour(Blockly.Blocks.Microduino.HUE);
    this.setColour(Blockly.Blocks.Microduino.GRE);
    this.appendDummyInput("")
        .appendTitle("OLED-print")
    this.appendDummyInput("")
		.appendTitle("font")
		.appendField(new Blockly.FieldDropdown(TYPE), 'TYPE')
	this.appendValueInput("x", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle("x:");
	this.appendValueInput("y", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle("y:");
	this.appendValueInput("text", String)
        .setCheck([Number,String])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle("Text:");
		//pkj
		/*
	this.appendDummyInput()
		.appendTitle(Blockly.LKL_SHOW_FACE_TEXT)
        .appendField(this.newQuote_(true))
        .appendField(new Blockly.FieldTextInput(''), 'text')
        .appendField(this.newQuote_(false));
		*/

	this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
//    this.setTooltip("test");	
	this.setInputsInline(true);

		/*
		this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
*/
	},
};

