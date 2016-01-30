'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


var colorSet=230;


var mCookie_PORTS =[["Serial0", "Serial"],["Serial1", "Serial1"],["SoftwareSerial(2,3)", "mySerial(2, 3)"],["SoftwareSerial(4,5)", "mySerial(4, 5)"]];

Blockly.Blocks.mCookie_bluetooth_readString = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
	    .appendTitle(Blockly.LKL_BLUETOOTH)
		.appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_BT.jpg", 45, 32))
		.appendTitle("#")
	    .appendTitle(new Blockly.FieldDropdown(mCookie_PORTS), "PIN")
		.appendTitle(Blockly.LKL_BLUETOOTH_READ_STR);
    this.setOutput(true, String);
	this.setInputsInline(true);
  }
};
Blockly.Blocks.mCookie_bluetooth_Robot_Direction = {	
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
	    .appendTitle(Blockly.LKL_BLUETOOTH_Car)
		.appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_BT.jpg", 45, 32))
		.appendTitle("#")
	    .appendTitle(new Blockly.FieldDropdown(mCookie_PORTS), "PIN")
	    .appendTitle("#")
	    .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_Run_f, "1"], [Blockly.LKL_Run_b, "2"], [Blockly.LKL_Run_l, "3"], [Blockly.LKL_Run_r, "4"]]),'direction')
		.appendTitle(Blockly.LKL_Run_Direction);
    //this.setInputsInline(true);
    //this.setPreviousStatement(true);
    //this.setNextStatement(true);
    this.setInputsInline(true);
    this.setOutput(true);
  }
};
Blockly.Blocks.mCookie_bluetooth_available = {

  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
	    .appendTitle(Blockly.LKL_BLUETOOTH)
		.appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_BT.jpg", 45, 32))
		.appendTitle("#")
	    .appendTitle(new Blockly.FieldDropdown(mCookie_PORTS), "PIN")
		.appendTitle(Blockly.LKL_AVAILABLE);
    this.setOutput(true, Boolean);
	this.setInputsInline(true);
  }
};