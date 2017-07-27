'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


//var colorSet = 518;
var colorSet='#70bd94';


Blockly.Blocks.MicroduinoTimer = {
  init: function() {

  this.setColour(colorSet);
  this.appendDummyInput("")
    .appendField(Blockly.interalTime)
    .appendField(Blockly.timerName)
    .appendField(new Blockly.FieldTextInput('timer1'),'timerName');
		// .appendField("interval")
  //       .appendField(new Blockly.FieldTextInput('2000'),'intervalTime');

  	this.appendValueInput("intervalTime", Number)
  		.setCheck(Number)
  		.setAlign(Blockly.ALIGN_RIGHT)
  		.appendField(Blockly.interval);

  	this.appendDummyInput("")
		.appendField(Blockly.interalMILLIS);


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
    .appendField(Blockly.timeOutBegin)
    .appendField(Blockly.timerName)
    .appendField(new Blockly.FieldTextInput('timer1'),'timerName');

    // this.appendValueInput("intervalTime", Number)
    //   .setCheck(Number)
    //   .setAlign(Blockly.ALIGN_RIGHT)
    //   .appendField(Blockly.interval);

    // this.appendDummyInput("")
    // .appendField(Blockly.interalMILLIS);



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
    .appendField(Blockly.timeOutDoing)
    .appendField(Blockly.timerName)
        .appendField(new Blockly.FieldTextInput('timer1'),'timerName');
    this.appendValueInput("intervalTime", Number)
      .setCheck(Number)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.timeOutDuration);

    this.appendDummyInput("")
    .appendField(Blockly.interalMILLIS);

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
    .appendField(Blockly.MIXLY_DURATION)
    .appendField(Blockly.timerName)
    .appendField(new Blockly.FieldTextInput('timer1'),'timerName');

    this.setOutput(true, Number);

    var tip="获取持续时间\n";
    tip+="\n";
    this.setTooltip(tip);

    this.setInputsInline(true);
    },
};