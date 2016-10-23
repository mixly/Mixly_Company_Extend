'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


//var colorSet = 518;
var colorSet='#70bd94';


Blockly.Blocks.MicroduinoTimer = {
  init: function() {

  this.setColour(colorSet);
  this.appendDummyInput("")
    .appendTitle(Blockly.interalTime)
    .appendTitle(Blockly.timerName)
    .appendTitle(new Blockly.FieldTextInput('timer1'),'timerName');
		// .appendTitle("interval")
  //       .appendTitle(new Blockly.FieldTextInput('2000'),'intervalTime');

  	this.appendValueInput("intervalTime", Number)
  		.setCheck(Number)
  		.setAlign(Blockly.ALIGN_RIGHT)
  		.appendTitle(Blockly.interval);

  	this.appendDummyInput("")
		.appendTitle(Blockly.interalMILLIS);


    var tip="定义执行的间隔时间\n";
    tip+="\n";
    this.setTooltip(tip);

    this.appendStatementInput('TimerDOing')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    },
};


Blockly.Blocks.MicroduinoTimerBegin = {
  init: function() {

    this.setColour(colorSet);
  this.appendDummyInput("")
    .appendTitle(Blockly.timeOutBegin)
    .appendTitle(Blockly.timerName)
    .appendTitle(new Blockly.FieldTextInput('timer1'),'timerName');

    // this.appendValueInput("intervalTime", Number)
    //   .setCheck(Number)
    //   .setAlign(Blockly.ALIGN_RIGHT)
    //   .appendTitle(Blockly.interval);

    // this.appendDummyInput("")
    // .appendTitle(Blockly.interalMILLIS);



    var tip="定义执行定时时间\n";
    tip+="\n";
    this.setTooltip(tip);

    //this.appendStatementInput('TimerDOing')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    },
};


Blockly.Blocks.MicroduinoTimerOut = {
  init: function() {

    this.setColour(colorSet);
  this.appendDummyInput("")
    .appendTitle(Blockly.timeOutDoing)
    .appendTitle(Blockly.timerName)
        .appendTitle(new Blockly.FieldTextInput('timer1'),'timerName');
    this.appendValueInput("intervalTime", Number)
      .setCheck(Number)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendTitle(Blockly.timeOutDuration);

    this.appendDummyInput("")
    .appendTitle(Blockly.interalMILLIS);

    this.setOutput(true, Boolean);

    var tip="定义超时执行时间\n";
    tip+="\n";
    this.setTooltip(tip);

    //this.appendStatementInput('TimerDOing')
    // this.setPreviousStatement(true, null);
    // this.setNextStatement(true, null);
    this.setInputsInline(true);
    },
};


Blockly.Blocks.MicroduinoTimerDuration = {
  init: function() {

    this.setColour(colorSet);
  this.appendDummyInput("")
    .appendTitle(Blockly.MIXLY_DURATION)
    .appendTitle(Blockly.timerName)
    .appendTitle(new Blockly.FieldTextInput('timer1'),'timerName');

    this.setOutput(true, Number);

    var tip="获取持续时间\n";
    tip+="\n";
    this.setTooltip(tip);

    this.setInputsInline(true);
    },
};