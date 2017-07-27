'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');

//var colorSet=230;
var colorSet='#6c91ac';

Blockly.Blocks.nRF_Init = {
  init: function() {

    this.setColour(colorSet);
    this.appendDummyInput("")
         .appendField(Blockly.nRF_Init)
         .appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_nRF24.png", 45, 32))
         .appendField(Blockly.nRF_Interval)
         .appendField(new Blockly.FieldTextInput('200'), 'INTERVAL')
         .appendField(Blockly.nRF_Channel)
         .appendField(new Blockly.FieldTextInput('70'),'CHANNEL');
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.nRF_Send = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
         .appendField(Blockly.nRF_Send)
         .appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_nRF24.png", 45, 32));
   // this.setInputsInline(true);
    this.appendStatementInput("DO");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.nRF_Read = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
         .appendField(Blockly.nRF_Read)
         .appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_nRF24.png", 45, 32));
         // .appendField("#")
         // .appendField(Blockly.Read_INFO)
         // .appendField(new Blockly.FieldTextInput('Structure name'),'Struct_Name');
   // this.setInputsInline(true);
   this.appendStatementInput("DO");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
