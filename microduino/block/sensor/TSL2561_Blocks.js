'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


//var colorSet=518;
var colorSet='#efa752';


Blockly.Blocks.TSL2561LightReady = {
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput()
    .appendField(Blockly.TSL2561Ready);

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);

    var tip="获取一个光照值\n";
    tip+="返回一个数字值\n";
    tip+="IIC接口\n";
    this.setTooltip(tip);
    //this.setHelpUrl('https://www.microduino.cn/wiki/index.php/Main_Page/zh');

  }
};


Blockly.Blocks.TSL2561Light = {
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput()
    .appendField(Blockly.TSL2561)
    this.setOutput(true, Number);

    var tip="获取一个光照值\n";
    tip+="返回一个数字值\n";
    tip+="IIC接口\n";
    this.setTooltip(tip);
    //this.setHelpUrl('https://www.microduino.cn/wiki/index.php/Main_Page/zh');

  }
};
