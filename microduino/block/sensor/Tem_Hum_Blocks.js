'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


var colorSet = 518;

Blockly.Blocks.mCookie_AM2321 = {	
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
	    .appendTitle(Blockly.BLE_AM2321)
		.appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_AM2321.jpg", 45, 32))
	    .appendTitle("#")
	    .appendTitle(new Blockly.FieldDropdown([[Blockly.BLE_Tem, "1"], [Blockly.BLE_Hum, "2"]]),'direction')
		.appendTitle(Blockly.BLE_Hum_Tem);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setOutput(true);
  }
};