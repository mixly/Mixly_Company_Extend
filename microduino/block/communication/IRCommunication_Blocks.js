'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


//var colorSet=230;
var colorSet='#6c91ac';


Blockly.Blocks.IRSenderCode = {

  init: function() {
    
    var TYPE = [['NEC', 'NEC'],['Whynter', 'Whynter'],['Sony', 'Sony'],['RC5', 'RC5'],['RC6', 'RC6'],['DISH', 'DISH'],['SharpRaw', 'SharpRaw'],['SAMSUNG', 'SAMSUNG']];
    this.setColour(colorSet);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/Microduino/IR_S.png", 40, 30))
      .appendTitle(Blockly.MIXLY_IR_SEND_NEC1)
      .appendField(new Blockly.FieldDropdown(TYPE), 'TYPE')
      // .appendTitle(Blockly.LKL_IR_SEND_NEC2)
      // .appendTitle(new Blockly.FieldDropdown([["3", "3"],["6", "6"],["8", "8"]]), "PIN");
    this.appendValueInput('data')
      .setCheck(Number)
      .appendTitle(' '+Blockly.MIXLY_DATA);
    this.appendValueInput('bits')
      .setCheck(Number)
      .appendTitle(' '+Blockly.MIXLY_BITS);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_IR_SEND_NEC_TOOLTIP);

  }
};


Blockly.Blocks.IRSenderRaw = {
  init: function() {
    this.setColour(colorSet);

  this.appendDummyInput("")
  .appendField(new Blockly.FieldImage("../../media/Microduino/IR_S.png", 40, 30))
      .appendTitle(Blockly.MIXLY_IR_SEND_RAW);
  //     .appendTitle(new Blockly.FieldDropdown([["3", "3"],["6", "6"],["8", "8"]]), "PIN");
    this.appendDummyInput("")
        .appendTitle(' '+Blockly.MIXLY_LIST_NAME)
        .appendTitle(new Blockly.FieldTextInput('0,0,0'), 'TEXT');
  this.appendValueInput('length')
        .setCheck(Number)
        .appendTitle(' '+Blockly.MIXLY_LIST_LENGTH);
  this.appendValueInput('freq')
        .setCheck(Number)
        .appendTitle(' '+Blockly.MIXLY_FREQUENCY);
  this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  this.setTooltip(Blockly.MIXLY_IR_SEND_RAW_TOOLTIP);

  }
};


Blockly.Blocks.IRReciver = {
  init: function() {
    this.setColour(colorSet);
  this.appendValueInput("PIN", Number)
  .appendField(new Blockly.FieldImage("../../media/Microduino/IR_R.png", 40, 30))
    .appendTitle(new Blockly.FieldTextInput('ir_item'), 'VAR')
        .appendTitle(Blockly.MIXLY_IR_RECEIVE)
        .setCheck(Number);
  this.appendStatementInput('DO')
        .appendTitle(Blockly.MIXLY_IR_RECEIVE_YES);
  this.appendStatementInput('DO2')
        .appendTitle(Blockly.MIXLY_IR_RECEIVE_NO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  this.setTooltip(Blockly.MIXLY_IR_RECIEVE_TOOLTIP);
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
};


Blockly.Blocks.IRReciverRaw = {
  init: function() {
    this.setColour(colorSet);
  this.appendValueInput("PIN", Number)
  .appendField(new Blockly.FieldImage("../../media/Microduino/IR_R.png", 40, 30))
        .appendTitle(Blockly.MIXLY_IR_RECEIVE_RAW)
        .setCheck(Number);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  this.setTooltip(Blockly.MIXLY_IR_RECIEVE_RAW_TOOLTIP);
  }
};


Blockly.Blocks.IRReciverEnable = {
  init: function() {
    this.setColour(colorSet);
  this.appendValueInput("PIN", Number)
  .appendField(new Blockly.FieldImage("../../media/Microduino/IR_R.png", 40, 30))
        .appendTitle(Blockly.IRReciverEnable)
        .setCheck(Number);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  this.setTooltip(Blockly.MIXLY_IR_RECIEVE_RAW_TOOLTIP);
  }
};