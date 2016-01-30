'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Blocks.Microduino.HUE = 318;

Blockly.Blocks.mCookie_RTC_set = {
  init: function() {
    this.setColour(Blockly.Blocks.Microduino.HUE);
	this.appendValueInput('Year')
		.setCheck(Number)
		.appendTitle('Set RTC Time ')
		.appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_RTC.jpg", 45, 32))
		.appendTitle(' Year');
	this.appendValueInput('Mouth')
		.setCheck(Number)
		.appendTitle('Mouth');
	this.appendValueInput('Day')
		.setCheck(Number)
		.appendTitle('Day');
	this.appendValueInput('Week')
		.setCheck(Number)
		.appendTitle('Week');
    this.appendValueInput('Hour')
		.setCheck(Number)
		.appendTitle('Hour');
	this.appendValueInput('Minute')
		.setCheck(Number)
		.appendTitle('Minute');
    this.appendValueInput('Second')
		.setCheck(Number)
		.appendTitle('Second');	
    this.setPreviousStatement(true);
    this.setNextStatement(false);
	//this.setInputsInline(true);
  }
};

Blockly.Blocks.mCookie_RTC_date={
init:function(){
    this.setColour(Blockly.Blocks.Microduino.HUE);
    this.appendDummyInput("")
	     .appendTitle('FormatDate')
    this.setOutput(true, String);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.mCookie_RTC_time={
init:function(){
    this.setColour(Blockly.Blocks.Microduino.HUE);
    this.appendDummyInput("")
	     .appendTitle('FormatTime')
    this.setInputsInline(true);
    this.setOutput(true, String);
  }
};

Blockly.Blocks.mCookie_RTC_Week={
init:function(){
    this.setColour(Blockly.Blocks.Microduino.HUE);
    this.appendDummyInput("")
	     .appendTitle('FormatWeek')
    this.setInputsInline(true);
    this.setOutput(true);
  }
};

Blockly.Blocks.mCookie_RTC_Hour={
init:function(){
    this.setColour(Blockly.Blocks.Microduino.HUE);
    this.appendDummyInput("")
	     .appendTitle('FormatHour')
    this.setInputsInline(true);
    this.setOutput(true);
  }
};

Blockly.Blocks.mCookie_RTC_Minute={
init:function(){
    this.setColour(Blockly.Blocks.Microduino.HUE);
    this.appendDummyInput("")
	     .appendTitle('FormatMinute')
    this.setInputsInline(true);
    this.setOutput(true);
  }
};

Blockly.Blocks.mCookie_RTC_Second={
init:function(){
    this.setColour(Blockly.Blocks.Microduino.HUE);
    this.appendDummyInput("")
	     .appendTitle('FormatSecond')
    this.setInputsInline(true);
    this.setOutput(true);
  }
};