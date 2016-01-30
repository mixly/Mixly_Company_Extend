'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');

var colorSet=230;

Blockly.Blocks.NFC_Format = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
         .appendTitle(Blockly.NFC)
         .appendField(new Blockly.FieldImage("../../media/Microduino/NFC.jpg", 45, 32))
         .appendTitle(Blockly.NFC_Format_Classic);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.NFC_Read = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
         .appendTitle(Blockly.NFC)
         .appendField(new Blockly.FieldImage("../../media/Microduino/NFC.jpg", 45, 32))
         .appendTitle(Blockly.NFC_Read);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};