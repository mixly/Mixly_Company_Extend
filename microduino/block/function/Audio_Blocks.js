'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


Blockly.Blocks.Microduino.HUE = 65;

var mCookie_PORTS =[["Serial0", "Serial"],["Serial1", "Serial1"],["SoftwareSerial(2,3)", "mySerial(2, 3)"],["SoftwareSerial(4,5)", "mySerial(4, 5)"]];


Blockly.Blocks.mCookie_Audio_Serial={
init:function(){
    var mCookie_MODE =[["MODE_ALL", "MODE_ALL"],["MODE_FOL", "MODE_FOL"],["MODE_ONE", "MODE_ONE"],["MODE_RAM", "MODE_RAM"],["MODE_ONE_STOP", "MODE_ONE_STOP"]];

    var mCookie_DEVICE =[["DEVICE_TF", "DEVICE_TF"],["DEVICE_FLASH", "DEVICE_FLASH"]];
    this.setColour(Blockly.Blocks.Microduino.HUE);
    this.appendDummyInput("")
        .appendTitle('Choose_Audio_Serial')
        .appendTitle("#")
        .appendTitle(new Blockly.FieldDropdown(mCookie_PORTS), "PIN")
        .appendTitle(" #")
        .appendTitle(new Blockly.FieldDropdown(mCookie_DEVICE), "PIN1")
        .appendTitle(" #")
        .appendTitle(new Blockly.FieldDropdown(mCookie_MODE), "PIN2")
    this.appendValueInput("Vol", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle("Vol:");
    //this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.mCookie_Audio_Play={
init:function(){
    this.setColour(Blockly.Blocks.Microduino.HUE);
    this.appendDummyInput("")
         .appendTitle('Audio_Play')
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks.mCookie_Audio_Pose={
init:function(){
    this.setColour(Blockly.Blocks.Microduino.HUE);
    this.appendDummyInput("")
         .appendTitle('Audio_Pause')
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks.mCookie_Audio_Next={
init:function(){
    this.setColour(Blockly.Blocks.Microduino.HUE);
    this.appendDummyInput("")
         .appendTitle('Audio_Next')
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks.mCookie_Audio_Prev={
init:function(){
    this.setColour(Blockly.Blocks.Microduino.HUE);
    this.appendDummyInput("")
         .appendTitle('Audio_Prev')
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks.mCookie_Audio_VolUp={
init:function(){
    this.setColour(Blockly.Blocks.Microduino.HUE);
    this.appendDummyInput("")
         .appendTitle('Audio_VolUp')
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks.mCookie_Audio_VolDown={
init:function(){
    this.setColour(Blockly.Blocks.Microduino.HUE);
    this.appendDummyInput("")
         .appendTitle('Audio_VolDown')
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};