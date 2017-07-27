'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');

//var colorSet = 518;
var colorSet='#efa752';

Blockly.Blocks.Microduino_KEYDigital = {
  init: function() {
   	 var CHECK = [[Blockly.shortPress, 'SHORT_PRESS'],
                    [Blockly.longPress, 'LONG_PRESS']];                   
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldImage("../../media/Microduino/Crash.png", 40, 30))
		.appendField(Blockly.Keyget)
        .appendField(Blockly.Keyget_Pin)
        .appendField(new Blockly.FieldTextInput('4'),'KPin');
    this.appendDummyInput("")
        .appendField(Blockly.Keyget_Check)
        .appendField(new Blockly.FieldDropdown(CHECK), "CHECK");

    //this.setOutput(true, Boolean);

    var tip="定义控制按钮的引脚和事件类型\n";
    tip+="数字接口\n";
    this.setTooltip(tip);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.appendStatementInput('DO');
    },
};


Blockly.Blocks.Microduino_KEYAnalog = {
  init: function() {
    var CHECK = [[Blockly.shortPress, 'SHORT_PRESS'],
            [Blockly.longPress, 'LONG_PRESS']]; 

    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldImage("../../media/Microduino/Joystick.png", 40, 30))
        .appendField(new Blockly.FieldTextInput('left'),'joyStickAction')
        .appendField(Blockly.KeygetJoystic)
        .appendField(Blockly.Keyget_Pin)
        .appendField(new Blockly.FieldTextInput('A0'),'KPin');
    this.appendDummyInput("")
        .appendField(Blockly.Keyget_Analog)
        .appendField(new Blockly.FieldTextInput('0'),'MIN')
        .appendField(Blockly.Keyget_To)
        .appendField(new Blockly.FieldTextInput('1023'),'MAX');
    this.appendDummyInput("")
        .appendField(Blockly.Keyget_Check)
        .appendField(new Blockly.FieldDropdown(CHECK), "CHECK");

    //this.setOutput(true, Boolean);

    var tip="定义控制按钮的引脚和事件类型\n";
    tip+="模拟接口\n";
    this.setTooltip(tip);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.appendStatementInput('DO');
    },
};



Blockly.Blocks.oldKEYDigital = {
  init: function() {
     var CHECK = [[Blockly.KeyInputRELEASE, 'RELEASE'],
                    [Blockly.KeyInputPRESS, 'PRESS']];                   
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.Keyget)
        .appendField(Blockly.Keyget_Pin)
        .appendField(new Blockly.FieldTextInput('4'),'KPin')
        .appendField(Blockly.Keyget_Check)
        .appendField(new Blockly.FieldDropdown(CHECK), "CHECK");

    this.setOutput(true, Boolean);

    var tip="定义控制按钮的引脚和事件类型\n";
    tip+="数字接口\n";
    this.setTooltip(tip);
    // this.setPreviousStatement(true, null);
    // this.setNextStatement(true, null);
    },
};


Blockly.Blocks.oldKEYAnalog = {
  init: function() {                  
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.Keyget)
        .appendField(Blockly.Keyget_Pin)
        .appendField(new Blockly.FieldTextInput('A0'),'KPin')
        .appendField(Blockly.Keyget_Analog)
        .appendField(new Blockly.FieldTextInput('0'),'MIN')
        .appendField(Blockly.Keyget_To)
        .appendField(new Blockly.FieldTextInput('1023'),'MAX');

    this.setOutput(true, Boolean);

    var tip="定义控制按钮的引脚和事件类型\n";
    tip+="数字接口\n";
    this.setTooltip(tip);
    // this.setPreviousStatement(true, null);
    // this.setNextStatement(true, null);
    },
};
