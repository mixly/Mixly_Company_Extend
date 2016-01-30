'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


var colorSet = 120;



Blockly.Blocks.DotMatrix = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput()
        .appendTitle(Blockly.DotMatrix)
        //.appendField(new Blockly.FieldImage("../../media/dfrobot/df_lcd.png", 70, 32));


    this.appendDummyInput()
    .appendTitle(Blockly.DotMatrixName)
    .appendField(new Blockly.FieldTextInput("1"), "dotName");


    this.appendValueInput("row0", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MatrixRow0);
    this.appendValueInput("row1", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MatrixRow1)
    this.appendValueInput("row2", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MatrixRow2);
    this.appendValueInput("row3", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MatrixRow3)
    this.appendValueInput("row4", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MatrixRow4);
    this.appendValueInput("row5", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MatrixRow5)
    this.appendValueInput("row6", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MatrixRow6);
    this.appendValueInput("row7", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MatrixRow7)

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};


Blockly.Blocks.DotMatrixRow = {
  init: function() {

    this.setColour(colorSet);

    this.appendDummyInput("")
    	.appendTitle(" ")
        .appendField(new Blockly.FieldColour("#000000"), "Dot0");
    this.appendDummyInput("")
    	.appendTitle(" ")
        .appendField(new Blockly.FieldColour("#000000"), "Dot1");
    this.appendDummyInput("")
    	.appendTitle(" ")
        .appendField(new Blockly.FieldColour("#000000"), "Dot2");
    this.appendDummyInput("")
    	.appendTitle(" ")
        .appendField(new Blockly.FieldColour("#000000"), "Dot3");
    this.appendDummyInput("")
    	.appendTitle(" ")
        .appendField(new Blockly.FieldColour("#000000"), "Dot4");
    this.appendDummyInput("")
    	.appendTitle(" ")
        .appendField(new Blockly.FieldColour("#000000"), "Dot5");
    this.appendDummyInput("")
    	.appendTitle(" ")
        .appendField(new Blockly.FieldColour("#000000"), "Dot6");
    this.appendDummyInput("")
    	.appendTitle(" ")
        .appendField(new Blockly.FieldColour("#000000"), "Dot7");

    //this.appendStatementInput('DO')
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);
//    this.setTooltip("test");  
    this.setInputsInline(true);
    this.setOutput(true, String);
    },
};