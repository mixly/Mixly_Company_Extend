'use strict';

goog.provide('Blockly.Arduino.imkedu');

goog.require('Blockly.Arduino');



Blockly.Arduino['imkedu_task'] = function(block) {
  var text_imkedu_task_name = block.getFieldValue('IMKEDU_TASK_NAME');
  var statements_imkedu_task_statement = Blockly.Arduino.statementToCode(block, 'IMKEDU_TASK_STATEMENT');
  // TODO: Assemble Arduino into code variable.
  Blockly.Arduino.definitions_['define_i2c'] = '#include \"SCoop.h\"';
  var code = 'defineTaskLoop' +'('+text_imkedu_task_name + ') {\n' + statements_imkedu_task_statement + '}\n';
  Blockly.Arduino.definitions_[text_imkedu_task_name] = code;
  if(Blockly.Arduino.taskflag==false)
  {
    Blockly.Arduino.taskflag=true;
  }
  return '';
};

Blockly.Arduino['imkedu_delay'] = function(block) {
  var number_imkedu_delay_value = block.getFieldValue('IMKEDU_DELAY_VALUE');
  // TODO: Assemble Arduino into code variable.
  Blockly.Arduino.definitions_['define_i2c'] = '#include \"SCoop.h\"';
  var code = 'sleep('+number_imkedu_delay_value+');\n';
  return code;
};

Blockly.Arduino['imkedu_start_task'] = function(block) {
  Blockly.Arduino.definitions_['define_i2c'] = '#include \"SCoop.h\"';
  Blockly.Arduino.setups_['imkedu_task_start'] = 'mySCoop.start();';
  var code = 'yield();\n';
  return code;
};

