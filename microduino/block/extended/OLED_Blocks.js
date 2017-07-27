'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


//var colorSet=120;
var colorSet='#27b6ac';


Blockly.Blocks.OLED_begin = {
  init: function() {
	var FLIP = [['none', 'undoRotation'],['90', 'setRot90'],['180', 'setRot180'],['270', 'setRot270']];

    //this.setColour(Blockly.Blocks.Microduino.HUE);
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.OLEDBegin)
    this.appendDummyInput("")
		.appendField(Blockly.OLEDFlip)
		.appendField(new Blockly.FieldDropdown(FLIP), 'FLIP')
        .appendField(Blockly.OLEDBeginEnd)
	this.appendStatementInput('DO')
	this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
//    this.setTooltip("test");
	this.setInputsInline(true);
	},
};

Blockly.Blocks.OLED_print = {
  init: function() {
	var TYPE = [['Small', 'setFont_S'],['Middle', 'setFont_M'],['Large', 'setFont_L']];

    // this.setColour(Blockly.Blocks.Microduino.HUE);
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.OLEDPrint)
    this.appendDummyInput("")
		.appendField(Blockly.OLEDFont)
		.appendField(new Blockly.FieldDropdown(TYPE), 'TYPE')
	this.appendValueInput("x", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("x:");
	this.appendValueInput("y", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("y:");
	this.appendValueInput("text", String)
        .setCheck([Number,String])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.OLEDContext);
	this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
//    this.setTooltip("test");	
	this.setInputsInline(true);

	},
};

Blockly.Blocks.OLED_print_roll = {
  init: function() {
    var TYPE = [['Small', 'setFont_S'],['Middle', 'setFont_M'],['Large', 'setFont_L']];

    // this.setColour(Blockly.Blocks.Microduino.HUE);
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.OLEDRoll)
    this.appendDummyInput("")
        .appendField(Blockly.OLEDFont)
        .appendField(new Blockly.FieldDropdown(TYPE), 'TYPE')
    this.appendValueInput("y", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("y:");
    this.appendValueInput("x", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.startMatrixT);
    this.appendValueInput("text", String)
        .setCheck([Number,String])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.OLEDContext);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
//    this.setTooltip("test");  
    this.setInputsInline(true);

    },
};


Blockly.Blocks.OLED_simplePrint = {
  init: function() {

    // this.setColour(Blockly.Blocks.Microduino.HUE);
    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.OLEDPrint)

    this.appendValueInput("text", String)
        .setCheck([Number,String])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.OLEDContext);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
//    this.setTooltip("test");  
    this.setInputsInline(true);

    },
};


Blockly.Blocks.MD_OLED_GeometryLine = {
  init: function() {
    var TYPE = [[Blockly.MD_OLEDPointer, 'point'],
                [Blockly.MD_OLEDLine, 'line'],
                // [Blockly.MD_OLEDHLine, 'HLine'],
                // [Blockly.MD_OLEDVLine, 'VLine'],
                //[Blockly.MD_OLEDTriangle, 'triangle'],
                [Blockly.MD_OLEDFrame, 'frame'],
                //[Blockly.MD_OLEDRFrame, 'RFrame'],
                [Blockly.MD_OLEDBox, 'box'],
                //[Blockly.MD_OLEDRBox, 'RBox']
                ];

    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.OLEDGeomPointLineArea)
        .appendField(new Blockly.FieldDropdown(TYPE), 'TYPE');

    this.appendValueInput("x0", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("x0:");
    this.appendValueInput("y0", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("y0:");

    this.appendValueInput("x1w", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("x1(w):");
    this.appendValueInput("y1h", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("y1(h):");

    // this.appendValueInput("x2r", Number)
    //     .setCheck(Number)
    //     .setAlign(Blockly.ALIGN_RIGHT)
    //     .appendField("x2(r):");
    // this.appendValueInput("y2", Number)
    //     .setCheck(Number)
    //     .setAlign(Blockly.ALIGN_RIGHT)
    //     .appendField("y2:");


    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
//    this.setTooltip("test");  
    this.setInputsInline(true);

    },
};



Blockly.Blocks.MD_OLED_GeometryCircle = {
  init: function() {
    var TYPE = [[Blockly.MD_OLEDCircle, 'circle'],
                [Blockly.MD_OLEDDisc, 'disc']
                // [Blockly.MD_OLEDEllipse, 'ellipse'],
                // [Blockly.MD_OLEDFilledEllipse, 'filledEllipse']
                ];

    var ArcType = [[Blockly.MD_OLEDAllCircle, 'U8G_DRAW_ALL'],
                [Blockly.MD_OLEDTopRightCircle, 'U8G_DRAW_UPPER_RIGHT'],
                [Blockly.MD_OLEDTopLeftCircle, 'U8G_DRAW_UPPER_LEFT'],
                [Blockly.MD_OLEDLowLeftCircle, 'U8G_DRAW_LOWER_LEFT'],
                [Blockly.MD_OLEDLowRightCircle, 'U8G_DRAW_LOWER_RIGHT']
                ];

    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendField(Blockly.OLEDGeomCircle)
        .appendField(new Blockly.FieldDropdown(TYPE), 'TYPE');


    this.appendDummyInput("")
        .appendField(Blockly.MD_OLEDArc)
        .appendField(new Blockly.FieldDropdown(ArcType), 'ArcType');

    this.appendValueInput("x", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("x:");
    this.appendValueInput("y", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("y:");
    this.appendValueInput("rw", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("r:");
    // this.appendValueInput("h", Number)
    //     .setCheck(Number)
    //     .setAlign(Blockly.ALIGN_RIGHT)
    //     .appendField("h:");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
//    this.setTooltip("test");  
    this.setInputsInline(true);

    },
};


Blockly.Blocks.MD_OLED_getWidthHigh = {
  init: function() {
    var TYPE = [[Blockly.OLEDWidth, 'width'],
            [Blockly.OLEDHigh, 'high']
            ];
    this.setColour(colorSet);
    this.appendDummyInput("")
    .appendField(Blockly.getOLEDWidthHigh)
    .appendField(new Blockly.FieldDropdown(TYPE), 'TYPE');
    this.setOutput(true, Number);
    this.setTooltip("");
  }
};

