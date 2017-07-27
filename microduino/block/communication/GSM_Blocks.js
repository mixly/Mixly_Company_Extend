'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');

//var colorSet=230;
var colorSet='#6c91ac';

Blockly.Blocks.GSM_SMS = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
         .appendField(Blockly.GSM)
         .appendField(new Blockly.FieldImage("../../media/Microduino/GSM.jpg", 45, 32))
         .appendField(Blockly.GSM_SMS)
         .appendField(new Blockly.FieldTextInput('xxxxxxxxxxx'),'TELNUM')
         .appendField(Blockly.GSM_Read);
    this.appendValueInput('text')
        .setCheck(String)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.GSM_CONTENT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};