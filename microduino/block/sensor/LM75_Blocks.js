'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


var colorSet=518;



Blockly.Blocks.lm75 = {
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput()
    .appendField("LM75")
    this.setOutput(true, Number);

    var tip="获取一个温度值\n";
    tip+="输出一个数字值\n";
    tip+="IIC接口\n";
    this.setTooltip(tip);
    //this.setHelpUrl('https://www.microduino.cn/wiki/index.php/Main_Page/zh');

  }
};


