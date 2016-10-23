'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');


Blockly.Arduino.mdStepperBegin = function() {
  var defineStepperBegin='#include <Microduino_Stepper.h>\n';

  Blockly.Arduino.definitions_['define_stepperBegin'] = defineStepperBegin;
  var code='';
  return code;
};



Blockly.Arduino.mdStepperControl = function() {
	var StepperChoice = this.getFieldValue('StepperChoice');
	var speed = Blockly.Arduino.valueToCode(this, 'speed', Blockly.Arduino.ORDER_ATOMIC) || '';

	switch (StepperChoice) {
	case 'A':
	  Blockly.Arduino.definitions_['define_stepper'+StepperChoice] = 'Stepper stepperA(PIN_DIRA, PIN_STEPA);';
	  Blockly.Arduino.setups_['setup_stepper'+StepperChoice] = 'stepperA.begin();';
	  break;
	case 'B':
	  Blockly.Arduino.definitions_['define_stepper'+StepperChoice] = 'Stepper stepperB(PIN_DIRB, PIN_STEPB);';
	  Blockly.Arduino.setups_['setup_stepper'+StepperChoice] = 'stepperB.begin();';
	  break;
	case 'C':
	  Blockly.Arduino.definitions_['define_stepper'+StepperChoice] = 'Stepper stepperC(PIN_DIRC, PIN_STEPC);';
	  Blockly.Arduino.setups_['setup_stepper'+StepperChoice] = 'stepperC.begin();';
	  break;
	case 'D':
	  Blockly.Arduino.definitions_['define_stepper'+StepperChoice] = 'Stepper stepperD(PIN_DIRD, PIN_STEPD);';
	  Blockly.Arduino.setups_['setup_stepper'+StepperChoice] = 'stepperD.begin();';
	  break;
	}


	var code='';
	code+='stepper'+StepperChoice+'.setSpeed('+speed+');\n';

	return code;
};

