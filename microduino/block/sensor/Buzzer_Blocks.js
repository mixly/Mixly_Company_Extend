'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


//var colorSet = 518;
var colorSet='#70bd94';


Blockly.Blocks.BuzzerTone = {	
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
        .appendField(new Blockly.FieldImage("../../media/Microduino/Buzzer.png", 40, 30))
        .appendField(Blockly.Buzzer)
		
    // .appendField(Blockly.BuzzerNum)
    // .appendField(new Blockly.FieldTextInput("1"), "buzzerNumber")
  	
  	this.appendValueInput("BuzzerPin", Number)
  		.setCheck(Number)
  		.setAlign(Blockly.ALIGN_RIGHT)
  		.appendField(Blockly.BuzzerPin);
  	this.appendValueInput("Frequency", Number)
  		.setCheck(Number)
  		.setAlign(Blockly.ALIGN_RIGHT)
  		.appendField(Blockly.Frequency);

    var tip="定义控制蜂鸣器的引脚\n";
    tip+="数字接口\n";
    this.setTooltip(tip);

    this.setPreviousStatement(true,null);
    this.setNextStatement(true,null);
    this.setInputsInline(true);
  },
};



Blockly.Blocks.BuzzerToneMelody = { 
  init: function() {

    var buzzerMelody =[[Blockly.low1DO, "262"], [Blockly.low2RE, "294"], [Blockly.low3MI, "330"],
                       [Blockly.low4FA, "349"], [Blockly.low5SO, "392"], [Blockly.low6LA, "440"],
                       [Blockly.low7XI, "494"], [Blockly.midlle1DO, "523"], [Blockly.midlle2RE, "587"], 
                       [Blockly.midlle3MI, "659"],[Blockly.midlle4FA, "698"], [Blockly.midlle5SO, "784"], 
                       [Blockly.midlle6LA, "880"],[Blockly.midlle7XI, "988"], [Blockly.high1DO, "1046"], 
                       [Blockly.high2RE, "1175"], [Blockly.high3MI, "1318"],[Blockly.high4FA, "1397"], 
                       [Blockly.high5SO, "1568"], [Blockly.high6LA, "1760"],[Blockly.high7XI, "1967"]
                      ];
    this.setColour(colorSet);

    this.appendDummyInput("")
        .appendField(new Blockly.FieldImage("../../media/Microduino/Buzzer.png", 40, 30))
        .appendField(Blockly.Buzzer)
    

    this.appendValueInput("BuzzerPin", Number)
      .setCheck(Number)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.BuzzerPin);

    this.appendDummyInput("")
    .appendField(Blockly.BuzzerMelody)
    .appendField(new Blockly.FieldDropdown(buzzerMelody), "buzzerMelody")

    var tip="定义控制蜂鸣器的引脚和旋律\n";
    tip+="数字接口\n";
    this.setTooltip(tip);

    this.setPreviousStatement(true,null);
    this.setNextStatement(true,null);
    this.setInputsInline(true);
  },
};


Blockly.Blocks.BuzzerToneSong = {
  init: function() {

    var buzzerSong =[[Blockly.BuzzerSong1, "1"], [Blockly.BuzzerSong2, "2"], [Blockly.BuzzerSong3, "3"],
                      [Blockly.BuzzerSong4, "4"], [Blockly.BuzzerSong5, "5"], [Blockly.BuzzerSong6, "6"],
                      [Blockly.BuzzerSong7, "7"], [Blockly.BuzzerSong8, "8"], [Blockly.BuzzerSong9, "9"],
                      [Blockly.BuzzerSong10, "10"]];
    this.setColour(colorSet);

    this.appendDummyInput("")
        .appendField(new Blockly.FieldImage("../../media/Microduino/Buzzer.png", 40, 30))
        .appendField(Blockly.Buzzer)
    

    this.appendValueInput("BuzzerPin", Number)
      .setCheck(Number)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.BuzzerPin);

    this.appendDummyInput("")
    .appendField(Blockly.BuzzerSong)
    .appendField(new Blockly.FieldDropdown(buzzerSong), "buzzerSong")

    var tip="定义控制蜂鸣器的引脚和曲目\n";
    tip+="数字接口\n";
    this.setTooltip(tip);

    this.setPreviousStatement(true,null);
    this.setNextStatement(true,null);
    this.setInputsInline(true);
  },
};





Blockly.Blocks.BuzzerNoTone = { 
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
        .appendField(new Blockly.FieldImage("../../media/Microduino/Buzzer.png", 40, 30))
        .appendField(Blockly.BuzzerNoTone)
    
    // .appendField(Blockly.BuzzerNum)
    // .appendField(new Blockly.FieldTextInput("1"), "buzzerNumber")
    
    this.appendValueInput("BuzzerPin", Number)
      .setCheck(Number)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.BuzzerPin);

    var tip="定义控制蜂鸣器的引脚\n";
    tip+="数字接口\n";
    this.setTooltip(tip);

    this.setPreviousStatement(true,null);
    this.setNextStatement(true,null);
    this.setInputsInline(true);
  },
};







