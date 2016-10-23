'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


// var colorSet=230;
var colorSet='#6c91ac';

Blockly.Blocks.microduinoIICSendToSlaver = {
  init: function() {

    var TYPE = [[Blockly.IICMasterSendTypeString, 'string'],
                [Blockly.IICMasterSendTypeVar, 'var']
                ];

    this.setColour(colorSet);

    this.appendValueInput("numSlaver", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.IICMasterSendToSlaver);

    this.appendDummyInput("")
        .appendTitle(Blockly.IICMasterSendType)
        .appendField(new Blockly.FieldDropdown(TYPE), 'TYPE');

    this.appendValueInput("numByte", String)
        .setCheck(String)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.IICMasterSendData);

    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


Blockly.Blocks.microduinoIICRequest = {
  init: function() {
    this.setColour(colorSet);

    this.appendValueInput("numSlaver", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.IICMasterTo);

    this.appendValueInput("numByte", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.NumberSlaverRequest);

    this.appendDummyInput("")
        .appendTitle(Blockly.IICByteData);

    this.appendStatementInput("success")
        .appendTitle(Blockly.IICIfSuccess);

    this.appendStatementInput("fail")
        .appendTitle(Blockly.IICIfFail);

    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


Blockly.Blocks.microduinoIICReadCache = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendTitle(Blockly.IICReadByte);
    this.setInputsInline(true);
    this.setOutput(true, String);
  }
};


Blockly.Blocks.microduinoIICCacheLen = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendTitle(Blockly.IICCacheLen);
    this.setInputsInline(true);
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.microduinoIMIICSlaver = {
  init: function() {
    this.setColour(colorSet);

    this.appendValueInput("numSlaver", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.IAMIIC);

    this.appendDummyInput("")
        .appendTitle(Blockly.IICNumberSlaver);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};



Blockly.Blocks.reciverIICMasterRequest = {
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
        .appendTitle(Blockly.IICReciverMasterRequest);

    this.appendStatementInput("requireEventDo");

    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.microduinoIICSendToMaster = {
  init: function() {

    var TYPE = [[Blockly.IICMasterSendTypeString, 'string'],
                [Blockly.IICMasterSendTypeVar, 'var']
                ];

    this.setColour(colorSet);

    this.appendDummyInput("")
        .appendTitle(Blockly.IICMasterSendType)
        .appendField(new Blockly.FieldDropdown(TYPE), 'TYPE');

    this.appendValueInput("numByte", String)
        .setCheck(String)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.IICSendtoMaster);

    //this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.reciverIICMasterData = {
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
        .appendTitle(Blockly.reciverIICMasterData);

    this.appendStatementInput("reciverEventDo");

    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};