'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


//var colorSet=0;
var colorSet='#e36a69';

Blockly.Blocks.serialBegin = {
  init: function() {

        var FLIP = [['9600 baud', '9600'],
                    ['38400 baud', '38400'],
                    ['57600 baud', '57600'],
                    ['115200 baud', '115200'],
                    ['300 baud', '300'],
                    ['1200 baud', '1200'],
                    ['2400 baud', '2400'],
                    ['4800 baud', '4800'],
                    ['19200 baud', '19200'],
                    ['230400 baud', '230400'],
                    ['250000 baud', '250000']];

    //this.setColour(Blockly.Blocks.Microduino.HUE);
    this.setColour(colorSet);

    this.appendDummyInput("")
        //.appendField(new Blockly.FieldImage("../../media/Microduino/CoreUSB.png", 60, 90))
        .appendTitle(Blockly.serialSetup)
        
        .appendField(new Blockly.FieldDropdown(FLIP), 'FLIP')


    //this.appendStatementInput('DO')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
//    this.setTooltip("test");  
    this.setInputsInline(true);
    },
};



Blockly.Blocks.serialPrint = {
  init: function() {
    this.setColour(colorSet);
    
    this.appendValueInput("serialData")
    .appendTitle(Blockly.serialPrint);

    // this.appendDummyInput("")
    //     .appendTitle(Blockly.serialPrint)

    //this.appendStatementInput('DO')
    // this.setPreviousStatement(true, null);
    // this.setNextStatement(true, null);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
//    this.setTooltip("test");  
    //this.setInputsInline(true);
    },
};


Blockly.Blocks.serialPrintln = {
  init: function() {
    this.setColour(colorSet);
    
    this.appendValueInput("serialData")
    .appendTitle(Blockly.serialPrintln);

    this.setPreviousStatement(true);
    this.setNextStatement(true);
//    this.setTooltip("test");  
    //this.setInputsInline(true);
    },
};


Blockly.Blocks.microduinoAnaloyWrite = { 
  init: function() {

  var mCookie_pwmPin =[["3", "3"], ["4", "4"], ["5", "5"],
                    ["6", "6"], ["7", "7"], ["8", "8"], 
                    ["9", "9"], ["10", "10"], ["11", "11"]];


    this.setColour(colorSet);


    this.appendDummyInput("")
    .appendTitle(Blockly.MIXLY_ANALOGWRITE_PIN)
    .appendTitle(new Blockly.FieldDropdown(mCookie_pwmPin), "mCookie_pwmPin")
    .appendTitle(Blockly.MIXLY_VALUE2);
    
    this.appendValueInput("pwmNumber", Number)
      .setCheck(Number)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendTitle(Blockly.LKL_VALUE2);


    var tip="设置指定管脚值(0~255)\n";
    //tip+="数字接口\n";
    this.setTooltip(tip);

    this.setPreviousStatement(true,null);
    this.setNextStatement(true,null);
    this.setInputsInline(true);
  },
};


Blockly.Blocks.microduinoWatting = { 
  init: function() {

    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendTitle(Blockly.microduinoWatting)
    this.appendValueInput('wait')
        .setCheck([Number,Boolean]);

    var tip="符合条件时等待...\n";
    this.setTooltip(tip);

    this.setPreviousStatement(true,null);
    this.setNextStatement(true,null);
    this.setInputsInline(true);
  }
};

Blockly.Blocks.microduinoWhile = { 
  init: function() {

    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendTitle(Blockly.microduinoWhile);
    this.appendValueInput('wait')
        .setCheck([Number,Boolean]);
    this.appendDummyInput("")
        .appendTitle(Blockly.microduinoSo);

    this.appendStatementInput('DO')
    .appendTitle(Blockly.microduinoRepeatDoing);

    var tip="当满足条件时重复执行...\n";
    this.setTooltip(tip);

    this.setPreviousStatement(true,null);
    this.setNextStatement(true,null);
    this.setInputsInline(true);
  }
};


Blockly.Blocks.microduinoFor = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput()
        .appendTitle(Blockly.MicroduinoForPerTime)
        .appendTitle(new Blockly.FieldTextInput('i'), 'VAR');
    this.appendValueInput('FROM')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LANG_CONTROLS_FOR_INPUT_FROM);
    this.appendValueInput('TO')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LANG_CONTROLS_FOR_INPUT_TO);
    this.appendDummyInput()
        .appendTitle(Blockly.MicroduinoEvery)
        .appendTitle(new Blockly.FieldTextInput('1',
        Blockly.FieldTextInput.math_number_validator), 'STEP');
    this.appendDummyInput()
        .appendTitle(Blockly.MicroduinoStep);
    this.appendStatementInput('DO')
        .appendTitle(Blockly.LANG_CONTROLS_FOR_INPUT_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    var thisBlock = this;
    this.setTooltip(function() {
      return Blockly.Msg.CONTROLS_FOR_TOOLTIP.replace('%1',
          thisBlock.getFieldValue('VAR'));
    });
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
};


Blockly.Blocks.microduinoAnaloyRead = {
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput()
    .appendField(Blockly.MIXLY_ANALOGREAD_PIN)
    .appendField(new Blockly.FieldTextInput("A6"), "analogPin");

    var tip="获取一个模拟值\n";
    tip+="返回一个模拟值\n";
    tip+="模拟接口\n";
    this.setTooltip(tip);
    this.setOutput(true, Number);

  }
};


Blockly.Blocks.microduinoSerailAvailable = {
  init: function() {



  var serailType =[["Serial", "Serial"], 
    ["SoftwareSerial", "mySerial"]];


    this.setColour(colorSet);

    this.appendDummyInput()
    .appendTitle(new Blockly.FieldDropdown(serailType), "serailType")
    .appendTitle(Blockly.serailAvalibleLength);

    var tip="获取串口数据长度\n";
    tip+="返回一个数字值\n";
    this.setTooltip(tip);
    this.setOutput(true, Number);

  }
};
