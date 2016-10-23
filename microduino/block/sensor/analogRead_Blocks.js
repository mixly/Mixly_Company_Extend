'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


//var colorSet=518;
var colorSet='#efa752';



Blockly.Blocks.microduinoMicAnal = {
  init: function() {
    this.setColour(colorSet);

    //this.appendValueInput("intValue")
    this.appendDummyInput()
    .appendField(new Blockly.FieldImage("../../media/Microduino/MIC.png", 40, 30))
    .appendField(Blockly.Keyget_Pin)
    .appendField(new Blockly.FieldTextInput("A0"), "analogPin")
    .appendTitle(Blockly.MicSensor)
    .appendTitle(Blockly.MicSensorValue);

    var tip="获取一个模拟值\n";
    tip+="返回一个模拟值\n";
    tip+="模拟接口\n";
    this.setTooltip(tip);
    this.setOutput(true, Number);

  }
};

Blockly.Blocks.microduinoLightAnal = {
  init: function() {
    this.setColour(colorSet);

    //this.appendValueInput("intValue")
    this.appendDummyInput()
    .appendField(new Blockly.FieldImage("../../media/Microduino/ALight.png", 40, 30))
    .appendField(Blockly.Keyget_Pin)
    .appendField(new Blockly.FieldTextInput("A0"), "analogPin")
    .appendTitle(Blockly.LightSensor)
    .appendTitle(Blockly.LightSensorValue);

    var tip="获取一个模拟值\n";
    tip+="返回一个模拟值\n";
    tip+="模拟接口\n";
    this.setTooltip(tip);
    this.setOutput(true, Number);

  }
};


Blockly.Blocks.microduinoIRRactAnal = {
  init: function() {
    this.setColour(colorSet);

    //this.appendValueInput("intValue")
    this.appendDummyInput()
    .appendField(new Blockly.FieldImage("../../media/Microduino/gray.png", 40, 30))
    .appendField(Blockly.Keyget_Pin)
    .appendField(new Blockly.FieldTextInput("A0"), "analogPin")
    .appendTitle(Blockly.IRRaction)
    .appendTitle(new Blockly.FieldDropdown([[Blockly.IRRactionDistance, "distance"], [Blockly.IRRactionBlack, "gray"]]),'action');

    var tip="获取一个模拟值\n";
    tip+="返回一个模拟值\n";
    tip+="模拟接口\n";
    this.setTooltip(tip);
    this.setOutput(true, Number);

  }
};


Blockly.Blocks.MD_Potentiometer = {
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput()
    .appendField(new Blockly.FieldImage("../../media/Microduino/potentiometer.png", 40, 30))
    .appendField(Blockly.Keyget_Pin)
    .appendField(new Blockly.FieldTextInput("A0"), "analogPin")
    .appendTitle(Blockly.MicroduinoPotentiometer);


    var tip="获取一个模拟值\n";
    tip+="返回一个模拟值\n";
    tip+="模拟接口\n";
    this.setTooltip(tip);
    this.setOutput(true, Number);

  }
};