'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');

var colorSet=220;

Blockly.Blocks.Defination = {
  init: function() {
        var FLIP = [['uint16_t', 'uint16_t'],     //announce menu
                    ['uint32_t', 'uint32_t'],
                    ['double', 'double']];
    this.setColour(colorSet);  //module color
    this.appendValueInput('VALUE') 
         .setCheck(Number)                          //as string
         .setAlign(Blockly.ALIGN_RIGHT)             //right side
         .appendTitle(Blockly.GLOBAL_DECLARE)
         .appendTitle(new Blockly.FieldTextInput('item'),'NAME')//put a text label
         .appendTitle(Blockly.LKL_AS)
     // .appendField(new Blockly.FieldImage("../../media/Microduino/CoreUSB.png", 60, 90))
         .appendTitle(new Blockly.FieldDropdown(FLIP), 'FLIP')//put a menu label
         .appendTitle(Blockly.LKL_VALUE);
    //this.appendStatementInput('DO')
    this.setPreviousStatement(true, null);    
    this.setNextStatement(true, null);
//    this.setTooltip("test");  
    this.setOutput(true);
    //this.setInputsInline(true);
    },
};

Blockly.Blocks.Structure = {
  init: function() {
    this.setColour(colorSet);  //module color
      this.appendDummyInput("")
         .setAlign(Blockly.ALIGN_RIGHT)             //right side
         .appendTitle(Blockly.LKL_DECLARE)
         .appendTitle(new Blockly.FieldTextInput('item'),'Struct_NAME')//put a text label
         .appendTitle(Blockly.Struct)
         .appendTitle(Blockly.Struct_DEF)
         .appendTitle(new Blockly.FieldTextInput('ite_m'),'Struct_DEF');//put a text label
     // .appendField(new Blockly.FieldImage("../../media/Microduino/CoreUSB.png", 60, 90))
    this.appendStatementInput('DO');
    this.setPreviousStatement(true, null);    
    this.setNextStatement(true, null);
//    this.setTooltip("test");  
 //   this.setOutput(true);
    //this.setInputsInline(true);
    },
};

Blockly.Blocks.Var_Definations = {
  init: function() {
        var FLIP = [['uint16_t', 'uint16_t'],     //announce menu
                    ['uint32_t', 'uint32_t'],
                    ['uint8_t','uint8_t'],
                    ['long','long'],
                    ['int','int'],
                    ['char','char'],
                    ['String','String'],
                    ['double', 'double']];
    this.setColour(colorSet);  //module color
    this.appendValueInput('VALUE') 
         .setCheck(Number)                          //as string
         .setAlign(Blockly.ALIGN_RIGHT)             //right side
         .appendTitle(Blockly.LKL_DECLARE_STRUCT)
         .appendTitle(new Blockly.FieldTextInput('item'),'NAME')//put a text label
         .appendTitle(Blockly.LKL_AS)
     // .appendField(new Blockly.FieldImage("../../media/Microduino/CoreUSB.png", 60, 90))
         .appendTitle(new Blockly.FieldDropdown(FLIP), 'FLIP')//put a menu label
         .appendTitle(Blockly.LKL_VALUE);
    //this.appendStatementInput('DO')
    this.setPreviousStatement(true, null);    
    this.setNextStatement(true, null);
    //this.setInputsInline(true);
    },
};


Blockly.Blocks.Struct_Var_Definations = {
  init: function() {
    this.setColour(colorSet);  //module color
      this.appendValueInput("VARI")
         .appendTitle(Blockly.STRUCT_CLASS)
         .appendTitle(new Blockly.FieldTextInput('item'),'Struct_NAME')//put a text label
         .appendTitle(Blockly.Struct_TEMP)
         .appendTitle(new Blockly.FieldTextInput('ite_m'),'Struct_Member')//put a text label
         .appendTitle(Blockly.Struct_IS);
    this.setPreviousStatement(true, null);    
    this.setNextStatement(true, null);
//    this.setTooltip("test");  
 //   this.setOutput(true);
    //this.setInputsInline(true);
    },
};


Blockly.Blocks.IntDefine = {
  init: function() {
    this.setColour(colorSet);

    this.appendValueInput("intValue")
    .appendTitle(Blockly.INT)
    .setCheck(Number)
    .appendField(new Blockly.FieldTextInput("a"), "intName");

    //this.setOutput(true, Number);
    this.setOutput(true, Number);
  }
};
