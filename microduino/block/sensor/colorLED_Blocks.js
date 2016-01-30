'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


var colorSet = 518;


Blockly.Blocks.ws2812Begin = {
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
        .appendTitle(Blockly.ColorLEDInit)
        .appendField(new Blockly.FieldImage("../../media/Microduino/colorLEDBegin.png", 80, 32))

    this.appendValueInput("LEDNumber", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.ColorLEDNumber);
    this.appendValueInput("LEDPin", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.ColorLEDPin);

    //this.appendStatementInput('DO')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
   // this.setTooltip("test");  
    this.setInputsInline(true);
    },
};



Blockly.Blocks.ws2812Doing = {
  init: function() {


    this.setColour(colorSet);

    this.appendDummyInput("")
        .appendTitle(Blockly.ColorLEDControl)
        .appendField(new Blockly.FieldImage("../../media/Microduino/colorLEDCntrol.png", 40, 32))

    this.appendValueInput("LEDIndex", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.ColorLEDIndex);


    this.appendDummyInput("")
        .appendTitle(Blockly.ColorSet)
        .appendField(new Blockly.FieldColour("#FF0000"), "colorRGB");


    //this.appendStatementInput('DO')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
//    this.setTooltip("test");  
    this.setInputsInline(true);
    },
};