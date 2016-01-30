'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


Blockly.Blocks.Microduino.HUE = 65;


Blockly.Blocks.motionBegin = {
  init: function() {
    this.setColour(Blockly.Blocks.Microduino.HUE);

    this.appendDummyInput("")
        .appendTitle(Blockly.motionInit)
        .appendField(new Blockly.FieldImage("../../media/Microduino/motion.png", 63, 70))

    //this.appendStatementInput('DO')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
//    this.setTooltip("test");  
    this.setInputsInline(true);
    },
};




Blockly.Blocks.accX = {
  init: function() {
    this.setColour(Blockly.Blocks.Microduino.HUE);
    this.appendDummyInput()
        .appendTitle(Blockly.accX);
    //this.setOutput(true, Number);
    this.setOutput(true, String);
  }
};
Blockly.Blocks.accY = {
  init: function() {
    this.setColour(Blockly.Blocks.Microduino.HUE);
    this.appendDummyInput()
        .appendTitle(Blockly.accY);
    //this.setOutput(true, Number);
    this.setOutput(true, String);
  }
};
Blockly.Blocks.accZ = {
  init: function() {
    this.setColour(Blockly.Blocks.Microduino.HUE);
    this.appendDummyInput()
        .appendTitle(Blockly.accZ);
    //this.setOutput(true, Number);
    this.setOutput(true, String);
  }
};

Blockly.Blocks.gyroX = {
  init: function() {
    this.setColour(Blockly.Blocks.Microduino.HUE);
    this.appendDummyInput()
        .appendTitle(Blockly.gyroX);
    //this.setOutput(true, Number);
    this.setOutput(true, String);
  }
};
Blockly.Blocks.gyroY = {
  init: function() {
    this.setColour(Blockly.Blocks.Microduino.HUE);
    this.appendDummyInput()
        .appendTitle(Blockly.gyroY);
    //this.setOutput(true, Number);
    this.setOutput(true, String);
  }
};
Blockly.Blocks.gyroZ = {
  init: function() {
    this.setColour(Blockly.Blocks.Microduino.HUE);
    this.appendDummyInput()
        .appendTitle(Blockly.gyroZ);
    //this.setOutput(true, Number);
    this.setOutput(true, String);
  }
};
Blockly.Blocks.tabSpace = {
  init: function() {
    this.setColour(Blockly.Blocks.Microduino.HUE);
    this.appendDummyInput()
        .appendTitle(Blockly.tabSpace);
    //this.setOutput(true, Number);
    this.setOutput(true, String);
  }
};



Blockly.Blocks.motionDoing = {
  init: function() {
    //var FLIP = [['none', 'undoRotation'],['90', 'setRot90'],['180', 'setRot180'],['270', 'setRot270']];

    this.setColour(Blockly.Blocks.Microduino.HUE);


    this.appendDummyInput("")
        .appendTitle(Blockly.motionDo)
        .appendField(new Blockly.FieldImage("../../media/Microduino/motion.png", 63, 70))

    this.appendValueInput("ax", String)
        .setCheck(String)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.accX);
    this.appendValueInput("ay", String)
        .setCheck(String)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.accY);
    this.appendValueInput("az", String)
        .setCheck(String)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.accZ);

    this.appendValueInput("gx", String)
        .setCheck(String)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.gyroX);
    this.appendValueInput("gy", String)
        .setCheck(String)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.gyroY);
    this.appendValueInput("gz", String)
        .setCheck(String)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.gyroZ);




    //this.appendStatementInput('DO')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
//    this.setTooltip("test");  
    //this.setInputsInline(true);
    },
};