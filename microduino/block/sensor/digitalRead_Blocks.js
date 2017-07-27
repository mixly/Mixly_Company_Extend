'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


//var colorSet=518;
var colorSet='#efa752';


Blockly.Blocks.microduinoCrash = {
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
        .appendField(new Blockly.FieldImage("../../media/Microduino/Crash.png", 40, 30))
        .appendField(Blockly.Keyget_Pin)
    this.appendValueInput("digitalPin", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT);


    this.appendDummyInput()
    .appendField(Blockly.crashButton)
    
    .appendField(new Blockly.FieldDropdown([[Blockly.KeyInputPRESS, "down"], [Blockly.KeyInputRELEASE, "up"]]),'action');


    this.setInputsInline(true);
    var tip="获取一个数字值\n";
    tip+="返回一个数字值\n";
    tip+="数字接口\n";
    this.setTooltip(tip);
    this.setOutput(true, Boolean);

  }
};



Blockly.Blocks.microduinoTuch = {
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/Microduino/Touch.png", 40, 30))
        .appendField(Blockly.Keyget_Pin)
    this.appendValueInput("digitalPin", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT);


    this.appendDummyInput()
    .appendField(Blockly.touchButton)
    .appendField(new Blockly.FieldDropdown([[Blockly.KeyInputPRESS, "down"], [Blockly.KeyInputRELEASE, "up"]]),'action');

    this.setInputsInline(true);
    var tip="获取一个数字值\n";
    tip+="返回一个数字值\n";
    tip+="数字接口\n";
    this.setTooltip(tip);
    this.setOutput(true, Boolean);

  }
};


Blockly.Blocks.microduinoPIR = {
  init: function() {
    this.setColour(colorSet);


    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/Microduino/PIR.png", 40, 30))
    .appendField(Blockly.Keyget_Pin)
    this.appendValueInput("digitalPin", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT);

    this.appendDummyInput()
    .appendField(Blockly.PIRSensor)
    .appendField(new Blockly.FieldDropdown([[Blockly.personAction, "high"], [Blockly.personNoAction, "low"]]),'action');

    this.setInputsInline(true);
    var tip="获取一个数字值\n";
    tip+="返回一个数字值\n";
    tip+="数字接口\n";
    this.setTooltip(tip);
    this.setOutput(true, Boolean);

  }
};


Blockly.Blocks.microduinoMic = {
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/Microduino/MIC.png", 40, 30))
    .appendField(Blockly.Keyget_Pin)
        
    this.appendValueInput("digitalPin", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT);

    this.appendDummyInput()
    .appendField(Blockly.MicSensor)
    .appendField(new Blockly.FieldDropdown([[Blockly.sonudHigh, "high"], [Blockly.noSound, "low"]]),'action');

    this.setInputsInline(true);
    var tip="获取一个数字值\n";
    tip+="返回一个数字值\n";
    tip+="数字接口\n";
    this.setTooltip(tip);
    this.setOutput(true, Boolean);

  }
};

Blockly.Blocks.microduinoLight = {
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/Microduino/ALight.png", 40, 30))
    .appendField(Blockly.Keyget_Pin)
        
    this.appendValueInput("digitalPin", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT);

    this.appendDummyInput()
    .appendField(Blockly.LightSensor)
    .appendField(new Blockly.FieldDropdown([[Blockly.lightHigh, "high"], [Blockly.lightLow, "low"]]),'action');

    this.setInputsInline(true);
    var tip="获取一个数字值\n";
    tip+="返回一个数字值\n";
    tip+="数字接口\n";
    this.setTooltip(tip);
    this.setOutput(true, Boolean);

  }
};