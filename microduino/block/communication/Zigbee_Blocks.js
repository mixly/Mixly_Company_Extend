'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


//var colorSet=230;
var colorSet='#6c91ac';


var mCookie_PORTS =[["Serial0", "Serial"],["Serial1", "Serial1"],["SoftwareSerial(2,3)", "mySerial(2, 3)"],["SoftwareSerial(4,5)", "mySerial(4, 5)"]];

Blockly.Blocks.Zigbee_AT = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
      .appendField(Blockly.Zigbee)
    .appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_Zigbee.png", 45, 32))
    .appendField("#")
      .appendField(new Blockly.FieldDropdown(mCookie_PORTS), "PIN")
    .appendField(Blockly.Zigbee_SetAT);
  this.setInputsInline(true);
  }
};

Blockly.Blocks.Zigbee_Init = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
         .appendField(Blockly.Zigbee_Init)
         .appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_Zigbee.png", 45, 32))
         .appendField("#")
          .appendField(new Blockly.FieldDropdown(mCookie_PORTS), "PIN")
    this.appendValueInput("BRate", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Zigbee_Baud);
  this.setInputsInline(true);
      this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};


Blockly.Blocks.Zigbee_Available = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
      .appendField(Blockly.Zigbee)
    .appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_Zigbee.png", 45, 32))
    .appendField("#")
    .appendField(Blockly.Zigbee_Available);
    this.setOutput(true, Boolean);
  this.setInputsInline(true);
  }
};

Blockly.Blocks.Zigbee_Send = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
      .appendField(Blockly.Zigbee)
    .appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_Zigbee.png", 45, 32))
    .appendField("#")
    .appendField(Blockly.Zigbee_Send);
  this.appendValueInput('text')
        .setCheck(String)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Text:");
    //this.setOutput(true, Boolean);
    //  this.setInputsInline(true);
      this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks.Zigbee_Read = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
      .appendField(Blockly.Zigbee)
      .appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_Zigbee.png", 45, 32))
      .appendField("#")
      .appendField(Blockly.Zigbee_Read);
  this.setOutput(true,String);
  }
};


Blockly.Blocks.VariableIs = {
  init: function() {
    this.setColour(colorSet);

    this.appendValueInput('VariableName', String)
        .setCheck([Number,String])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.VariableName);
  this.appendValueInput('VariableIs', String)
        .setCheck([Number,String])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.VariableIs);
    this.setOutput(true, Boolean);
  this.setInputsInline(true);
  }
};