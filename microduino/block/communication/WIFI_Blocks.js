'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


//var colorSet=230;
var colorSet='#6c91ac';



Blockly.Blocks.WiFi = {
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput()
    .appendField(Blockly.WiFi);


    this.appendDummyInput()
    .appendField(Blockly.WiFiSSID)
    .appendField(new Blockly.FieldTextInput(Blockly.typeSSID), "SSID")

    this.appendDummyInput()
    .appendField(Blockly.WiFiPass)
    .appendField(new Blockly.FieldTextInput(Blockly.typePass), "WiFiPASS")

    this.appendDummyInput()
    .appendField(Blockly.HOST_NAME)
    .appendField(new Blockly.FieldTextInput("www.baidu.com"), "HOST_NAME")

    this.appendDummyInput()
    .appendField(Blockly.HOST_PORT)
    .appendField(new Blockly.FieldTextInput("80"), "HOST_PORT")

    this.appendDummyInput()
    .appendField(Blockly.WEBPAGE)
    .appendField(new Blockly.FieldTextInput("/"), "WEBPAGE")

    this.appendStatementInput("WiFiInput");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    //this.setOutput(true, String);

  }
};




Blockly.Blocks.WiFiBlynk = {
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput()
    .appendField(Blockly.WiFi);


    this.appendDummyInput()
    .appendField(Blockly.WiFiSSID)
    .appendField(new Blockly.FieldTextInput(Blockly.typeSSID), "SSID")

    this.appendDummyInput()
    .appendField(Blockly.WiFiPass)
    .appendField(new Blockly.FieldTextInput(Blockly.typePass), "WiFiPASS")

    this.appendDummyInput()
    .appendField(Blockly.AuthToken)
    .appendField(new Blockly.FieldTextInput(Blockly.TypeAuthToken), "authToken")


    //this.appendStatementInput("WiFiInput");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    //this.setOutput(true, String);

  }
};



Blockly.Blocks.BLYNK_READ = {
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput()
    .appendField(Blockly.BLYNK_READ);

    this.appendDummyInput()
    .appendField(Blockly.virtualPort)
    .appendField(new Blockly.FieldTextInput("V0"), "virtualPort")

    this.appendValueInput("blynkReadInput", [Number,String])
    .setCheck([Number,String])
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendTitle(Blockly.inputValue);

    var tip="发送数据到Blynk\n";
    tip+="发送频率请在你的APP中设置\n";
    this.setTooltip(tip);

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    //this.setOutput(true, String);

  }
};


Blockly.Blocks.BLYNK_WRITE = {
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput()
    .appendField(Blockly.BLYNK_WRITE);


    this.appendDummyInput()
    .appendField(Blockly.virtualPort)
    .appendField(new Blockly.FieldTextInput("V0"), "virtualPort")


    this.appendStatementInput("blynkWriteInput");

    // this.appendValueInput("blynkReadInput", [Number,String])
    // .setCheck([Number,String])
    // .setAlign(Blockly.ALIGN_RIGHT)
    // .appendTitle("inputValue");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    //this.setOutput(true, String);

  }
};


Blockly.Blocks.BLYNKParamOne = {   
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendTitle(Blockly.SoloParam)
        .appendTitle(Blockly.paramType)
        .appendTitle(new Blockly.FieldDropdown([[Blockly.BLYNKString, "asStr()"], 
            [Blockly.BLYNKInt, "asInt()"], [Blockly.BLYNKDouble, "asDouble()"]]),'paramType');


    var tip="获取一个来自Blynk的值\n";
    tip+="返回一个值\n";
    this.setTooltip(tip);

    this.setInputsInline(true);
    // this.setPreviousStatement(true);
    // this.setNextStatement(true);
    this.setOutput(true);
  }
};


Blockly.Blocks.BLYNKParamArray = {   
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
        .appendTitle(Blockly.ArrayParam)
        .appendTitle(Blockly.paramType)
        .appendTitle(new Blockly.FieldDropdown([[Blockly.BLYNKString, "asStr()"], 
            [Blockly.BLYNKInt, "asInt()"], [Blockly.BLYNKDouble, "asDouble()"]]),'paramType');


    this.appendValueInput("paramNum", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.paramIndex);



    var tip="获取来自Blynk的数组值中的一个元素\n";
    tip+="返回一个值\n";
    this.setTooltip(tip);

    this.setInputsInline(true);
    // this.setPreviousStatement(true);
    // this.setNextStatement(true);
    this.setOutput(true);
  }
};


Blockly.Blocks.WiFiBlynkTimer = {   
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
        .appendTitle(Blockly.BlynkTimer)
        .appendTitle(Blockly.timerName)
        .appendTitle(new Blockly.FieldTextInput("tempture"), "timerName")
        .appendTitle(Blockly.interval)
        .appendTitle(new Blockly.FieldTextInput("1000"), "duration");

    this.appendStatementInput("blynkTimerDoing");

    var tip="设置一个定时器用来上传数据到Blynk\n";
    tip+="\n";
    this.setTooltip(tip);

    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    //this.setOutput(true);
  }
};


Blockly.Blocks.WiFiBlynkVirtualWrite = {   
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
        .appendTitle(Blockly.BLYNK_READ)
        .appendTitle(Blockly.virtualPort)
        .appendTitle(new Blockly.FieldTextInput("V0"), "virtualPort");


    this.appendValueInput("senderDataToBlynk", [Number,String])
        .setCheck([Number,String])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.inputValue);


    var tip="上传数据到Blynk\n";
    tip+="\n";
    this.setTooltip(tip);

    //this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    //this.setOutput(true);
  }
};