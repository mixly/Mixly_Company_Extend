'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


// var colorSet=230;
var colorSet='#6c91ac';

var mCookie_PORTS =[[Blockly.newMicroduinoBT, "0"],[Blockly.oldmCookie, "1"], [Blockly.oldMicroduino, "2"]];

Blockly.Blocks.bluetoothMicroduinoBegin = {

  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
        .appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_BT.png", 45, 32))
        .appendTitle(Blockly.bluePrepare)
        .appendTitle(Blockly.productType)
        .appendTitle(new Blockly.FieldDropdown(mCookie_PORTS), "PIN");

    this.setPreviousStatement(true);
    this.setNextStatement(true);


  }
};


Blockly.Blocks.bluetoothMicroduinoReciver = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_BT.png", 45, 32))
        .appendTitle(Blockly.microduinoBlueReciver);
    
    this.appendStatementInput("reciverDataInput");

    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


Blockly.Blocks.btMicroduinoReciverData = {

  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendTitle(Blockly.BTReciverData);

	this.setOutput(true, String);
  }
};


Blockly.Blocks.btMicroduinoSenderData = {

  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendTitle(Blockly.BTSenderData);

    this.appendValueInput('senderText')
        .setCheck(String)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.BTSende);

    this.setPreviousStatement(true);
    this.setNextStatement(true);

  }
};

Blockly.Blocks.bluetoothmtankBegin = {

  init: function() {

    var Type_md_mc = [[Blockly.newMicroduinoBT, "0"],
                 [Blockly.oldmCookie, '1'],
                 [Blockly.oldMicroduino, '2'],
              ];

    this.setColour(colorSet);

    this.appendDummyInput("")
        .appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_BT.png", 45, 32))
        .appendTitle(Blockly.blueMtank)
        .appendTitle(Blockly.productType)
        .appendTitle(new Blockly.FieldDropdown(Type_md_mc), "Type_md_mc");

    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.bluetoothmTankReciver = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_BT.png", 45, 32))
        .appendTitle(Blockly.mTankBlueReciver);
        
    
    this.appendStatementInput("reciverDataInput");

    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.bluetoothmTankdata= {
  init: function() {

  var mTankchooseNumber = [
              [Blockly.mtankDIR1, '0'],
              [Blockly.mTankthr1, '1'],
              [Blockly.mtankDIR2, '2'],
              [Blockly.mTankthr2, '3'],
              ['aux1(1000,2000)', '4'],
              ['aux2(1000,2000)', '5'],
              ['aux3(1000,2000)', '6'],
              ['aux4(1000,2000)', '7'],
              ];


    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendTitle(Blockly.mTankchannel)
        .appendField(new Blockly.FieldDropdown(mTankchooseNumber), 'mTankchooseNumber');

    this.setOutput(true, Number);
  }
};

Blockly.Blocks.bluetoothcolorled = {

  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
        .appendTitle(Blockly.blueled)
        .appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_BT.png", 45, 32))
        .appendTitle(Blockly.ColorLEDControl)
        .appendField(new Blockly.FieldImage("../../media/Microduino/colorLEDBegin.png", 80, 32));

    this.setPreviousStatement(true);
    this.setNextStatement(true);


  }
};

