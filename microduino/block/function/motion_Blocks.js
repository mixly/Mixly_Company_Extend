'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


//var colorSet=65;
var colorSet='#e5b748';


Blockly.Blocks.motionAccGyro = {
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
        .appendField(new Blockly.FieldImage("../../media/Microduino/motion.png", 45, 32))
        .appendTitle(Blockly.motionInit);
        

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
//    this.setTooltip("test");  
    this.setInputsInline(true);
    },
};



Blockly.Blocks.getMotionValue={
init:function(){

    var getType =[[Blockly.accX, "accX"], 
                  [Blockly.accY, "accY"], 
                  [Blockly.accZ, "accZ"], 
                  [Blockly.gyroX, "gyroX"],
                  [Blockly.gyroY, "gyroY"],
                  [Blockly.gyroZ, "gyroZ"]
                ];

    this.setColour(colorSet);
    this.appendDummyInput("")
         .appendTitle(Blockly.GetMotion)
         .appendTitle(new Blockly.FieldDropdown(getType), "getType");
    this.setInputsInline(true);
    // this.setPreviousStatement(true);
    // this.setNextStatement(true);
    this.setOutput(true);
  }
};


Blockly.Blocks.motionDMP = {
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
        .appendField(new Blockly.FieldImage("../../media/Microduino/motion.png", 45, 32))
        .appendTitle(Blockly.motionDMP);
        

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
//    this.setTooltip("test");  
    this.setInputsInline(true);
    },
};

Blockly.Blocks.motionSoft = {
  init: function() {


    var getType =[[Blockly.motionNoMagic, '0'], 
                  [Blockly.motionMagic, '1']
                ];


    this.setColour(colorSet);

    this.appendDummyInput("")
        .appendField(new Blockly.FieldImage("../../media/Microduino/motion.png", 45, 32))
        .appendTitle(Blockly.motionSoft);
        

    this.appendDummyInput("")
         .appendTitle(Blockly.motionIsMagic)
         .appendTitle(new Blockly.FieldDropdown(getType), "getType");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("开启后需要旋转20秒用于磁极校准...");  
    this.setInputsInline(true);
    },
};


Blockly.Blocks.getMotionYawPitchRoll={
init:function(){

    var getType =[[Blockly.motionYaw, "ypr[0]"], 
                  [Blockly.motionPitch, "ypr[1]"], 
                  [Blockly.motionRoll, "ypr[2]"]
                ];

    this.setColour(colorSet);
    this.appendDummyInput("")
         .appendTitle(Blockly.GetMotionDegree)
         .appendTitle(new Blockly.FieldDropdown(getType), "getType");
    this.setInputsInline(true);
    // this.setPreviousStatement(true);
    // this.setNextStatement(true);
    this.setOutput(true);
  }
};