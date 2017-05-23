'use strict';

goog.provide('Blockly.Blocks.imkedu');

goog.require('Blockly.Blocks');


Blockly.Blocks.imkedu.HUE = 0;






Blockly.Blocks['imkedu_task'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("任务名")
        .appendField(new Blockly.FieldTextInput("task1"), "IMKEDU_TASK_NAME");
    this.appendStatementInput("IMKEDU_TASK_STATEMENT")
        .setCheck(null);
    this.setColour(0);
    this.setTooltip('定义任务，名字必须以字母开头');
    this.setHelpUrl('http://www.imkedu.com/forum-42-1.html');
  }
};

Blockly.Blocks['imkedu_delay'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("任务延时毫秒")
        .appendField(new Blockly.FieldNumber(10, 0, 10000), "IMKEDU_DELAY_VALUE");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip('任务延时毫秒（仅可以在任务中调用）');
    this.setHelpUrl('http://www.imkedu.com/forum-42-1.html');
  }
};

Blockly.Blocks['imkedu_start_task'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("任务开始");
    this.setColour(0);
    this.setTooltip('开始任务，只需要调用一次');
    this.setHelpUrl('');
  }
};
