'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');

var colorSet=230;

Blockly.Blocks.nRF_Init = {
  init: function() {
            var BAUD = [['9600 baud', '9600'],
                    ['38400 baud', '38400'],
                    ['57600 baud', '57600'],
                    ['115200 baud', '115200'],
                    ['300 baud', '300'],
                    ['1200 baud', '1200'],
                    ['2400 baud', '2400'],
                    ['4800 baud', '4800'],
                    ['19200 baud', '19200'],
                    ['230400 baud', '230400'],
                    ['250000 baud', '250000']];
    this.setColour(colorSet);
    this.appendDummyInput("")
         .appendTitle(Blockly.nRF_Init)
         .appendField(new Blockly.FieldImage("../../media/Microduino/nRF24.jpg", 45, 32))
         .appendTitle("#")
         .appendTitle(Blockly.Zigbee_Baud)
         .appendField(new Blockly.FieldDropdown(BAUD), 'BAUD')
         .appendTitle(Blockly.nRF_Interval)
         .appendField(new Blockly.FieldTextInput('200'), 'INTERVAL')
         .appendTitle(Blockly.nRF_Channel)
         .appendTitle(new Blockly.FieldTextInput('70'),'CHANNEL');
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.nRF_Send = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
         .appendTitle(Blockly.nRF_Send)
         .appendField(new Blockly.FieldImage("../../media/Microduino/nRF24.jpg", 45, 32))
         .appendTitle("#")
         .appendTitle(Blockly.nRF_Interval)
         .appendTitle(new Blockly.FieldTextInput('150'),'INTERVAL')
         .appendTitle(Blockly.ms)
         .appendTitle(Blockly.Send_INFO)
         .appendTitle(new Blockly.FieldTextInput('Structure name'),'Struct_Name');
   // this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.nRF_Read = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
         .appendTitle(Blockly.nRF_Read)
         .appendField(new Blockly.FieldImage("../../media/Microduino/nRF24.jpg", 45, 32))
         .appendTitle("#")
         .appendTitle(Blockly.Read_INFO)
         .appendTitle(new Blockly.FieldTextInput('Structure name'),'Struct_Name');
   // this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
