'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


//var colorSet = 518;
var colorSet='#70bd94';


Blockly.Blocks.ws2812Begin = {
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
        .appendField(new Blockly.FieldImage("../../media/Microduino/colorLEDBegin.png", 40, 30))
        .appendField(Blockly.ColorLEDInit)
        

    this.appendValueInput("LEDNumber", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.ColorLEDNumber);
    this.appendValueInput("LEDPin", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.ColorLEDPin);


    var tip="定义彩灯所需的库函数和对象\n";
    tip+="数字接口\n";
    this.setTooltip(tip);

    //this.appendStatementInput('DO')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
   // this.setTooltip("test");  
    this.setInputsInline(true);
    },
};



Blockly.Blocks.ws2812Doing = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldImage("../../media/Microduino/colorLEDCntrol.png", 40, 30))
        .appendField(Blockly.ColorLEDControl)
    this.appendValueInput("LEDIndex", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.ColorLEDIndex);
    this.appendDummyInput("")
        .appendField(Blockly.ColorSet)
        .appendField(new Blockly.FieldColour("#FF0000"), "colorRGB");
    var tip="定义彩灯序号和颜色\n";
    tip+="数字接口\n";
    this.setTooltip(tip);
    //this.appendStatementInput('DO')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
//    this.setTooltip("test");  
    this.setInputsInline(true);
    },
};


Blockly.Blocks.ws2812DoingRGB = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldImage("../../media/Microduino/colorLEDCntrol.png", 40, 30))
        .appendField(Blockly.ColorLEDControl)
    this.appendValueInput("LEDIndex", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.ColorLEDIndex);
    this.appendValueInput("red", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.ColorLEDRed);
    this.appendValueInput("green", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.ColorLEDGreen);
    this.appendValueInput("blue", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.ColorLEDBlue);


    var tip="定义彩灯序号和颜色\n";
    tip+="数字接口\n";
    tip+="红,绿,蓝颜色值在0~255之间\n";
    this.setTooltip(tip);
    //this.appendStatementInput('DO')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
//    this.setTooltip("test");  
    this.setInputsInline(true);
    },
};

Blockly.Blocks.ws2812BreathRGB = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldImage("../../media/Microduino/colorLEDCntrol.png", 40, 30))
        .appendField(Blockly.ColorLEDBreath)
    this.appendValueInput("LEDIndex", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.ColorLEDIndex);
    this.appendValueInput("red", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.ColorLEDRed);
    this.appendValueInput("green", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.ColorLEDGreen);
    this.appendValueInput("blue", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.ColorLEDBlue);


    var tip="定义彩灯序号和颜色\n";
    tip+="数字接口\n";
    tip+="红,绿,蓝颜色值在0~255之间\n";
    this.setTooltip(tip);
    //this.appendStatementInput('DO')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
//    this.setTooltip("test");  
    this.setInputsInline(true);
    },
};