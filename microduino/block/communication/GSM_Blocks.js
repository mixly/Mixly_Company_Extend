'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');

//var colorSet=230;
var colorSet='#6c91ac';

Blockly.Blocks.GSM_SMS = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
         .appendTitle(Blockly.GSM)
         .appendField(new Blockly.FieldImage("../../media/Microduino/GSM.jpg", 45, 32))
         .appendTitle(Blockly.GSM_SMS)
         .appendTitle(new Blockly.FieldTextInput('xxxxxxxxxxx'),'TELNUM')
         .appendTitle(Blockly.GSM_Read);
    this.appendValueInput('text')
        .setCheck(String)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.GSM_CONTENT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};