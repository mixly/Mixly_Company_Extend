'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


//var colorSet = 120;
var colorSet='#27b6ac';


Blockly.Blocks.DotMatrix = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("../../media/Microduino/DotMatrix.png", 50, 38))
        .appendTitle(Blockly.DotMatrix);

    this.appendDummyInput()
    .appendTitle(Blockly.DotMatrixName)
    .appendField(new Blockly.FieldTextInput("1"), "dotName")
    .appendTitle(Blockly.DotMatrixAddress)
    .appendField(new Blockly.FieldTextInput("64"), "dotAddress");


    this.appendValueInput("row0", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MatrixRow0);
    this.appendValueInput("row1", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MatrixRow1)
    this.appendValueInput("row2", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MatrixRow2);
    this.appendValueInput("row3", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MatrixRow3)
    this.appendValueInput("row4", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MatrixRow4);
    this.appendValueInput("row5", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MatrixRow5)
    this.appendValueInput("row6", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MatrixRow6);
    this.appendValueInput("row7", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MatrixRow7)

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};


Blockly.Blocks.DotMatrixRow = {
  init: function() {

    this.setColour(colorSet);

    this.appendDummyInput("")
    	.appendTitle(" ")
        .appendField(new Blockly.FieldColour("#000000"), "Dot0");
    this.appendDummyInput("")
    	.appendTitle(" ")
        .appendField(new Blockly.FieldColour("#000000"), "Dot1");
    this.appendDummyInput("")
    	.appendTitle(" ")
        .appendField(new Blockly.FieldColour("#000000"), "Dot2");
    this.appendDummyInput("")
    	.appendTitle(" ")
        .appendField(new Blockly.FieldColour("#000000"), "Dot3");
    this.appendDummyInput("")
    	.appendTitle(" ")
        .appendField(new Blockly.FieldColour("#000000"), "Dot4");
    this.appendDummyInput("")
    	.appendTitle(" ")
        .appendField(new Blockly.FieldColour("#000000"), "Dot5");
    this.appendDummyInput("")
    	.appendTitle(" ")
        .appendField(new Blockly.FieldColour("#000000"), "Dot6");
    this.appendDummyInput("")
    	.appendTitle(" ")
        .appendField(new Blockly.FieldColour("#000000"), "Dot7");

    //this.appendStatementInput('DO')
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);
//    this.setTooltip("test");  
    this.setInputsInline(true);
    this.setOutput(true, String);
    },
};


Blockly.Blocks.DotMatrixAddArray = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
      .appendTitle(Blockly.dotMatrixAddVarArray)
        // .appendTitle(new Blockly.FieldTextInput('Addr'), 'arrayVAR')
        .appendTitle('[]')
        //.appendTitle(new Blockly.FieldTextInput('3',Blockly.FieldTextInput.math_number_validator), 'SIZE')
        .appendTitle('[]');
    this.itemCount_ = 1;
    this.updateShape_();
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
    this.setTooltip("为矩阵点阵屏设置地址");
  },
  /**
   * Create XML to represent list inputs.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock =
        Blockly.Block.obtain(workspace, 'lists_create_with_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = Blockly.Block.obtain(workspace, 'lists_create_with_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    var connections = [];
    var i = 0;
    while (itemBlock) {
      connections[i] = itemBlock.valueConnection_;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
      i++;
    }
    this.itemCount_ = i;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      if (connections[i]) {
        this.getInput('ADD' + i).connection.connect(connections[i]);
      }
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('ADD' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    // Delete everything.
    if (this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else {
      var i = 0;
      while (this.getInput('ADD' + i)) {
        this.removeInput('ADD' + i);
        i++;
      }
    }
    // Rebuild block.
    if (this.itemCount_ == 0) {
      this.appendDummyInput('EMPTY')
          .appendField(Blockly.Msg.LISTS_CREATE_EMPTY_TITLE);
    } else {
      for (var i = 0; i < this.itemCount_; i++) {
        var input = this.appendValueInput('ADD' + i);
        if (i == 0) {
          input.appendField(Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH);
        }
      }
    }
  }
};


Blockly.Blocks.DotMatrixAddNum = {
  init: function() {
    this.setColour(colorSet);
    this.appendValueInput('addInput') 
     .setCheck(Number)
     .setAlign(Blockly.ALIGN_RIGHT)
     .appendTitle(Blockly.dotMatrixAddVar)
     .appendTitle(new Blockly.FieldTextInput('64'),'NUM');
    this.setOutput(true, Number);
    this.setTooltip(Blockly.Msg.MATH_NUMBER_TOOLTIP);
  }
};


Blockly.Blocks.getMatrixNum = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
    .appendTitle(Blockly.getMatrixNum);
    this.setOutput(true, Number);
    this.setTooltip("得到一共级联了几个点阵屏");
  }
};


Blockly.Blocks.getMatrixDeviceAddr = {
  init: function() {
    this.setColour(colorSet);
    this.appendValueInput("MatrixIndex", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.getDeviceAddr);
    var tip="得到指定点阵屏的地址\n";
    this.setTooltip(tip);
    this.setInputsInline(true);
    this.setOutput(true, Number);
    },
};


Blockly.Blocks.getMatrixHeight = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
    .appendTitle(Blockly.getMatrixHeight);
    this.setOutput(true, Number);
    this.setTooltip("得到级联点阵屏的竖排个数");
  }
};

Blockly.Blocks.getMatrixWidth = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput("")
    .appendTitle(Blockly.getMatrixWidth);
    this.setOutput(true, Number);
    this.setTooltip("得到级联点阵屏的横排个数");
  }
};


Blockly.Blocks.setMatrixLedColor = {
  init: function() {
    this.setColour(colorSet);

    this.appendValueInput("MatrixIndexX", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.MatrixIndexX);

    this.appendValueInput("MatrixIndexY", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.MatrixIndexY);

    this.appendValueInput("MatrixIndexRed", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.MatrixIndexRed);

    this.appendValueInput("MatrixIndexGreen", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.MatrixIndexGreen);

    this.appendValueInput("MatrixIndexBlue", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.MatrixIndexBlue);

    var tip="设置点阵屏中指定LED的颜色\n";
    this.setTooltip(tip);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    //this.setOutput(true, Number);
    },
};


Blockly.Blocks.clearMatrixDisplay = {
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
    .appendTitle(Blockly.clearMatrixDisplay);


    var tip="清屏\n";
    this.setTooltip(tip);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    //this.setOutput(true, Number);
    },
};



Blockly.Blocks.setMatrixColor = {
  init: function() {
    this.setColour(colorSet);

    this.appendValueInput("MatrixRed", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.MatrixIndexRed);

    this.appendValueInput("MatrixGreen", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.MatrixIndexGreen);

    this.appendValueInput("MatrixBlue", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.MatrixIndexBlue);

    var tip="设置点阵屏显示颜色\n";
    this.setTooltip(tip);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    //this.setOutput(true, Number);
    },
};



Blockly.Blocks.clearMatrixColor = {
  init: function() {
    this.setColour(colorSet);

    this.appendDummyInput("")
    .appendTitle(Blockly.clearMatrixColor);


    var tip="清除颜色\n";
    this.setTooltip(tip);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    //this.setOutput(true, Number);
    },
};



Blockly.Blocks.MatrixWriteString = {
  init: function() {

    //var MatrixShowMode =[['MODE_H', 'MODE_H'], ['MODE_V', 'MODE_V']];

    this.setColour(colorSet);

    this.appendDummyInput("")
      // .appendTitle(Blockly.MatrixShowMode)
      // .appendField(new Blockly.FieldDropdown(MatrixShowMode), 'MatrixShowMode')
      .appendTitle(Blockly.stringVar)
      .appendField(new Blockly.FieldTextInput('microduino'),'stringVar');


    this.appendValueInput("startMatrixT", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.startMatrixT);

    this.appendValueInput("startMatrixXY", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.startMatrixXY);


    var tip="在点阵屏上显示字符串\n";
    this.setTooltip(tip);

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);

    this.setInputsInline(true);
    },
};



Blockly.Blocks.MD_Matrix_GeometryLine = {
  init: function() {
    var TYPE = [[Blockly.MD_OLEDPointer, 'point'],
                [Blockly.MD_OLEDLine, 'line'],
                [Blockly.MD_OLEDFrame, 'frame'],
                [Blockly.MD_OLEDBox, 'box'],
                ];

    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendTitle(Blockly.OLEDGeomPointLineArea)
        .appendField(new Blockly.FieldDropdown(TYPE), 'TYPE');

    this.appendValueInput("x0", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle("x0:");
    this.appendValueInput("y0", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle("y0:");

    this.appendValueInput("x1w", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle("x1(w):");
    this.appendValueInput("y1h", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle("y1(h):");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
//    this.setTooltip("test");  
    this.setInputsInline(true);

    },
};



Blockly.Blocks.MD_Matrix_GeometryCircle = {
  init: function() {
    var TYPE = [[Blockly.MD_OLEDCircle, 'circle'],
                [Blockly.MD_OLEDDisc, 'disc']
                ];

    // var ArcType = [[Blockly.MD_OLEDAllCircle, 'U8G_DRAW_ALL'],
    //             [Blockly.MD_OLEDTopRightCircle, 'U8G_DRAW_UPPER_RIGHT'],
    //             [Blockly.MD_OLEDTopLeftCircle, 'U8G_DRAW_UPPER_LEFT'],
    //             [Blockly.MD_OLEDLowLeftCircle, 'U8G_DRAW_LOWER_LEFT'],
    //             [Blockly.MD_OLEDLowRightCircle, 'U8G_DRAW_LOWER_RIGHT']
    //             ];

    this.setColour(colorSet);
    this.appendDummyInput("")
        .appendTitle(Blockly.OLEDGeomCircle)
        .appendField(new Blockly.FieldDropdown(TYPE), 'TYPE');


    // this.appendDummyInput("")
    //     .appendTitle(Blockly.MD_OLEDArc)
    //     .appendField(new Blockly.FieldDropdown(ArcType), 'ArcType');

    this.appendValueInput("x", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle("x:");
    this.appendValueInput("y", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle("y:");
    this.appendValueInput("rw", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle("r:");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
//    this.setTooltip("test");  
    this.setInputsInline(true);

    },
};