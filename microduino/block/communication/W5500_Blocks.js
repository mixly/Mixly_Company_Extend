'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');

//var colorSet=230;
var colorSet='#6c91ac';

Blockly.Blocks.W5500_Init = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
      .appendTitle(Blockly.W5500)
    .appendField(new Blockly.FieldImage("../../media/Microduino/Zigbee.jpg", 45, 32))
    .appendTitle("#")
    .appendTitle(Blockly.W5500_Init);
    this.setOutput(true, Boolean);
  this.setInputsInline(true);
 // this.setPreviousStatement(true, null);
 //   this.setNextStatement(true, null);
  }
};