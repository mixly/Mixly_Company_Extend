'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


//var colorSet = 518;
var colorSet='#efa752';

Blockly.Blocks.mCookie_AM2321 = {	
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/Microduino/AM2321.png", 40, 30))
	    .appendTitle(Blockly.BLE_AM2321)
	    .appendTitle("#")
	    .appendTitle(new Blockly.FieldDropdown([[Blockly.BLE_Tem, "1"], [Blockly.BLE_Hum, "2"]]),'direction')
		.appendTitle(Blockly.BLE_Hum_Tem);

    var tip="获取一个温湿度值\n";
    tip+="返回一个数字值\n";
    tip+="IIC接口\n";
    this.setTooltip(tip);

    this.setInputsInline(true);
    // this.setPreviousStatement(true);
    // this.setNextStatement(true);
    this.setOutput(true);
  }
};

Blockly.Blocks.mCookie_SHT2 = {   
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/Microduino/SHT2.png", 40, 30))
        .appendTitle(Blockly.BLE_AM2321)
        .appendTitle(new Blockly.FieldDropdown([[Blockly.BLE_Tem, "1"], [Blockly.BLE_Hum, "2"]]),'direction')
        .appendTitle(Blockly.BLE_Hum_Tem);

    var tip="获取一个温湿度值,采用SHT2芯片\n";
    tip+="返回一个数字值\n";
    tip+="IIC接口\n";
    this.setTooltip(tip);

    this.setInputsInline(true);
    // this.setPreviousStatement(true);
    // this.setNextStatement(true);
    this.setOutput(true);
  }
};