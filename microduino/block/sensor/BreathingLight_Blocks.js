'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


//var colorSet = 518;
var colorSet='#70bd94';


Blockly.Blocks.BreathingLightH = {
  init: function() {

    var PWMPin =[["3", "3"], ["4", "4"], ["5", "5"], 
                 ["6", "6"], ["7", "7"], ["8", "8"], 
                 ["9", "9"]
                ];

    this.setColour(colorSet);

    this.appendDummyInput("")
        //.appendField(Blockly.BreathingLight)
        .appendField(Blockly.BreathingLightH)
        .appendField(Blockly.ColorLEDPin)
        .appendField(new Blockly.FieldDropdown(PWMPin), "LEDPinNumber");


    this.appendValueInput("LEDFrequency", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.LEDBreathingTime);

    this.appendDummyInput("")
        .appendField(Blockly.GPSSeconds);


    var tip="定义LED灯的引脚号和呼吸频率\n";
    tip+="数字接口\n";
    this.setTooltip(tip);

    //this.appendStatementInput('DO')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
   // this.setTooltip("test");  
    this.setInputsInline(true);
    },
};


Blockly.Blocks.BreathingLightX = {
  init: function() {

    var PWMPin =[["3", "3"], ["4", "4"], ["5", "5"], 
                 ["6", "6"], ["7", "7"], ["8", "8"], 
                 ["9", "9"]
                ];

    this.setColour(colorSet);

    this.appendDummyInput("")
        //.appendField(Blockly.BreathingLight)
        .appendField(Blockly.BreathingLightX)
        .appendField(Blockly.ColorLEDPin)
        .appendField(new Blockly.FieldDropdown(PWMPin), "LEDPinNumber");


    this.appendValueInput("LEDFrequency", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.LEDBreathingTime);

    this.appendDummyInput("")
        .appendField(Blockly.GPSSeconds);


    var tip="定义LED灯的引脚号和呼吸频率\n";
    tip+="数字接口\n";
    this.setTooltip(tip);

    //this.appendStatementInput('DO')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
   // this.setTooltip("test");  
    this.setInputsInline(true);
    },
};