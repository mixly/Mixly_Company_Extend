'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

//var colorSet=65;
var colorSet='#e5b748';

Blockly.Blocks.mCookie_RTC_set = {
  init: function() {
    this.setColour(colorSet);
	this.appendValueInput('Year')
		.setCheck(Number)
    .appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_RTC.png", 45, 32))
		.appendTitle(Blockly.SetRTCTime)
		.appendTitle(Blockly.RTCYear);
	this.appendValueInput('Mouth')
		.setCheck(Number)
		.appendTitle(Blockly.RTCMouth);
	this.appendValueInput('Day')
		.setCheck(Number)
		.appendTitle(Blockly.RTCDay);
	this.appendValueInput('Week')
		.setCheck(Number)
		.appendTitle(Blockly.RTCWeek);
    this.appendValueInput('Hour')
		.setCheck(Number)
		.appendTitle(Blockly.RTCHour);
	this.appendValueInput('Minute')
		.setCheck(Number)
		.appendTitle(Blockly.RTCMinute);
    this.appendValueInput('Second')
		.setCheck(Number)
		.appendTitle(Blockly.RTCSecond);	
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	//this.setInputsInline(true);
  }
};


Blockly.Blocks.mCookie_RTC_time={
init:function(){
    this.setColour(colorSet);
    this.appendDummyInput("")
         .appendTitle(Blockly.RTCFormatTime)
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    //this.setOutput(true, String);
  }
};


Blockly.Blocks.mCookie_RTC_date={
init:function(){
    this.setColour(colorSet);
    this.appendDummyInput("")
	     .appendTitle(Blockly.RTCFormatDate)
    this.setOutput(true, String);
    this.setInputsInline(true);
  }
};



Blockly.Blocks.mCookie_RTC_Week={
init:function(){
    this.setColour(colorSet);
    this.appendDummyInput("")
	     .appendTitle(Blockly.RTCFormatWeek)
    this.setInputsInline(true);
    this.setOutput(true);
  }
};

Blockly.Blocks.mCookie_RTC_Hour={
init:function(){
    this.setColour(colorSet);
    this.appendDummyInput("")
	     .appendTitle(Blockly.RTCFormatHour)
    this.setInputsInline(true);
    this.setOutput(true);
  }
};

Blockly.Blocks.mCookie_RTC_Minute={
init:function(){
    this.setColour(colorSet);
    this.appendDummyInput("")
	     .appendTitle(Blockly.RTCFormatMinute)
    this.setInputsInline(true);
    this.setOutput(true);
  }
};

Blockly.Blocks.mCookie_RTC_Second={
init:function(){
    this.setColour(colorSet);
    this.appendDummyInput("")
	     .appendTitle(Blockly.RTCFormatSecond)
    this.setInputsInline(true);
    this.setOutput(true);
  }
};



Blockly.Blocks.mCookie_RTC_Output={
init:function(){


  var getType =[
                [Blockly.RTCYear, "year"],
                [Blockly.RTCMouth, "month"],
                [Blockly.RTCDay, "day"], 
                [Blockly.RTCHour, "hour"], 
                [Blockly.RTCMinute, "minute"], 
                [Blockly.RTCSecond, "second"]
              ];

    this.setColour(colorSet);
    this.appendDummyInput("")
         .appendTitle(Blockly.RTCFormatGetInfo)
         .appendTitle(new Blockly.FieldDropdown(getType), "getType");
    this.setInputsInline(true);
    this.setOutput(true);
  }
};



