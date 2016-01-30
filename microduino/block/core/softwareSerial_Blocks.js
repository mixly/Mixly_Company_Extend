'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


Blockly.Blocks.Microduino.HUE=20;

//Blockly.Blocks.core.softwareSerial_Blocks.RED=20;


Blockly.Blocks.ws2812Begin = {
  init: function() {
    //this.setColour(Blockly.Blocks.Microduino.RED);
    this.setColour(Blockly.Blocks.Microduino.HUE);

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
//    this.setTooltip("test");  
    this.setInputsInline(true);
    },
};



Blockly.Blocks.ws2812Doing = {
  init: function() {
    //var FLIP = [['none', 'undoRotation'],['90', 'setRot90'],['180', 'setRot180'],['270', 'setRot270']];

    //this.setColour(Blockly.Blocks.Microduino.RED);
    this.setColour(Blockly.Blocks.Microduino.HUE);


    this.appendDummyInput("")
        .appendTitle(Blockly.ColorLEDControl)
        .appendField(new Blockly.FieldImage("../../media/Microduino/colorLEDCntrol.png", 40, 32))

    this.appendValueInput("LEDIndex", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.ColorLEDIndex);

    this.appendValueInput("R", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.ColorLEDRed);
    this.appendValueInput("G", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.ColorLEDGreen);
    this.appendValueInput("B", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.ColorLEDBlue);


    //this.appendStatementInput('DO')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
//    this.setTooltip("test");  
    this.setInputsInline(true);
    },
};