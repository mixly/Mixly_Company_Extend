'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


//var colorSet=518;
var colorSet='#efa752';


Blockly.Blocks.ColorDetPrepare_TCS3414 = {
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput()
    .appendField(Blockly.TCS3414Ready);

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);

    var tip="获取一个颜色值\n";
    tip+="返回一个数字值\n";
    tip+="IIC接口\n";
    this.setTooltip(tip);
    //this.setHelpUrl('https://www.microduino.cn/wiki/index.php/Main_Page/zh');

  }
};


Blockly.Blocks.ColorGet_TCS3414 = {
  init: function() {


    var getType =[[Blockly.ColorLEDRed, "redColor"], 
                  [Blockly.ColorLEDGreen, "greenColor"], 
                  [Blockly.ColorLEDBlue, "blueColor"]
                ];

    this.setColour(colorSet);

    this.appendDummyInput()
    .appendField(Blockly.TCS3414Get)
    .appendField(new Blockly.FieldDropdown(getType), "getType");


    this.setOutput(true, Number);

    var tip="获取一个颜色值\n";
    tip+="返回一个数字值\n";
    tip+="IIC接口\n";
    this.setTooltip(tip);
    //this.setHelpUrl('https://www.microduino.cn/wiki/index.php/Main_Page/zh');

  }
};
