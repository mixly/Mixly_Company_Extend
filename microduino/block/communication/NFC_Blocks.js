'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');

//var colorSet=230;
var colorSet='#6c91ac';

Blockly.Blocks.NFC_Format = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
         .appendField(Blockly.NFC)
         .appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_NFC.png", 45, 32))
         .appendField(Blockly.NFC_Format_Classic);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.NFC_Read = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
         .appendField(Blockly.NFC)
         .appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_NFC.png", 45, 32))
         .appendField(Blockly.NFC_Read);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};