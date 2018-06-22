'use strict';

goog.provide('Blockly.Blocks.makeblock');

goog.require('Blockly.Blocks');


Blockly.Blocks.makeblock.HUE = 120;

var MAKEBLOCK_PORTS =[["PORT_1", "1"],["PORT_2", "2"],["PORT_3", "3"],["PORT_4", "4"],["PORT_5", "5"],["PORT_6", "6"],["PORT_7", "7"],["PORT_8", "8"]];
var MAKEBLOCK_MS=[["M1", "M1"],["M2", "M2"]];
var MAKEBLOCK_SLOTS=[["SLOT1", "1"],["SLOT2", "2"]];
var MAKEBLOCK_UNIT=[["cm", "Cm"],["inch", "Inch"]];

Blockly.Blocks.mb_servo_move = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_SERVO)
		.appendField(new Blockly.FieldImage("../../media/makeblock_orion/mb_servo.png", 39, 32))
        .appendField("#")
        .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "PIN")
		.appendField("#")
        .appendField(new Blockly.FieldDropdown(MAKEBLOCK_SLOTS), "PIN2");
    this.appendValueInput("DEGREE", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_DEGREE_0_180);
    this.appendValueInput("DELAY_TIME", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_DELAY+'('+Blockly.MIXLY_DELAY_MS+')');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
  }
};

Blockly.Blocks.mb_bluetooth_readString = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
	    .appendField(Blockly.MIXLY_BLUETOOTH)
		.appendField(new Blockly.FieldImage("../../media/makeblock_orion/mb_bluetooth.png", 45, 32))
		.appendField("#")
	    .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "PIN")
		.appendField(Blockly.MIXLY_BLUETOOTH_READ_STR);
    this.setOutput(true, String);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.mb_bluetooth_available = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
	    .appendField(Blockly.MIXLY_BLUETOOTH)
		.appendField(new Blockly.FieldImage("../../media/makeblock_orion/mb_bluetooth.png", 45, 32))
		.appendField("#")
	    .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "PIN")
		.appendField(Blockly.MIXLY_AVAILABLE);
    this.setOutput(true, Boolean);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.mb_display = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
	    .appendField(Blockly.MIXLY_7S_DISPLAY)
		.appendField(new Blockly.FieldImage("../../media/makeblock_orion/mb_display.png", 40, 32))
		.appendField("#")
	    .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "PIN");
	this.appendValueInput('num')
		.setCheck(Number)
		.appendField(Blockly.MIXLY_NUMBER);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.mb_motor = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
	    .appendField(Blockly.MIXLY_MB_LIGHT_MOTOR)
		.appendField(new Blockly.FieldImage("../../media/makeblock_orion/mb_motor.png", 40, 32))
		.appendField("#")
	    .appendField(new Blockly.FieldDropdown([["M1", "9"],["M2", "10"],["PORT_1", "1"],["PORT_2", "2"]]), "PIN");
	this.appendValueInput('speed')
		.setCheck(Number)
		.appendField(Blockly.MIXLY_MB_LIGHT_MOTOR_SPEED);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.mb_sound = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_SOUND)
		.appendField(new Blockly.FieldImage("../../media/makeblock_orion/mb_sound.png", 48, 32))
		.appendField("#")
        .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "PIN");
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.mb_temperature = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_TEMPERATURE)
		.appendField(new Blockly.FieldImage("../../media/makeblock_orion/mb_temperature.png", 59, 32))
		.appendField("#")
        .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "PIN")
		.appendField("#")
        .appendField(new Blockly.FieldDropdown(MAKEBLOCK_SLOTS), "PIN2");
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.mb_joystick = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_JOYSTICK)
		.appendField(new Blockly.FieldDropdown([["x", "1"], ["y", "2"]]), "STAT")
		.appendField(new Blockly.FieldImage("../../media/makeblock_orion/mb_joystick.png", 38, 32))
		.appendField("#")
        .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "PIN");
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.mb_potentiometer = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_POTENTIOMETER)
		.appendField(new Blockly.FieldImage("../../media/makeblock_orion/mb_potentiometer.png", 40, 32))
		.appendField("#")
        .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "PIN");
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.mb_pyroelectric_infrared = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
	      .appendField(Blockly.MIXLY_MB_PYROELECTRIC_INFRARED)
		  .appendField(new Blockly.FieldImage("../../media/makeblock_orion/mb_pir_motion.png", 42, 32))
		  .appendField("#")
	      .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "PIN");
    this.setOutput(true, Boolean);
  }
};

Blockly.Blocks.mb_chaoshengbo = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
	      .appendField(Blockly.MIXLY_MB_CHAOSHENGBO)
		  .appendField(new Blockly.FieldDropdown(MAKEBLOCK_UNIT), "PIN2")
		  .appendField(new Blockly.FieldImage("../../media/makeblock_orion/mb_ultrasonic.png", 37, 32))
		  .appendField("#")
	      .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "PIN");
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.mb_light_grayscale = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
	      .appendField(Blockly.MIXLY_MB_LIGHT_GRAYSCALE)
		  .appendField(new Blockly.FieldImage("../../media/makeblock_orion/mb_light_grayscale.png", 35, 32))
		  .appendField("#")
	      .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "PIN");
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.mb_light_grayscale_led = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
	      .appendField(Blockly.MIXLY_MB_LIGHT_GRAYSCALE)
		  .appendField(new Blockly.FieldImage("../../media/makeblock_orion/mb_light_grayscale.png", 35, 32))
		  .appendField("#")
	      .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "PIN")
		  .appendField(Blockly.MIXLY_MB_LIGHT_GRAYSCALE_LED)
		  .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_ON, "1"], [Blockly.MIXLY_OFF, "0"]]), "STAT");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.mb_rgb_led = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_SENSE_RGBLED)
		.appendField(new Blockly.FieldImage("../../media/makeblock_orion/Me-RGB-LED.jpg", 39, 32))
    .appendField("#")
        .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "PIN")
    .appendField("#")
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_ALL, "0"],["1", "1"],["2", "2"],["3", "3"],["4", "4"]]), "PIN2");;
    this.appendValueInput("RED", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.COLOUR_RGB_RED);
    this.appendValueInput("GREEN", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.COLOUR_RGB_GREEN);
    this.appendValueInput("BLUE", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.COLOUR_RGB_BLUE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
	this.setInputsInline(true);
  }
};

Blockly.Blocks.mb_rgb_ledstrip = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.Makeblock_RGBLedStrip)
		//.appendField(new Blockly.FieldImage("../../media/makeblock_orion/Me-RGB-LED.jpg", 39, 32))
    .appendField("#")
        .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "PIN")
	.appendField("#")
        .appendField(new Blockly.FieldDropdown(MAKEBLOCK_SLOTS), "PIN1");
	this.appendValueInput("PIN2", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("(0=all,input 1 to 30)");
    this.appendValueInput("RED", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.COLOUR_RGB_RED);
    this.appendValueInput("GREEN", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.COLOUR_RGB_GREEN);
    this.appendValueInput("BLUE", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.COLOUR_RGB_BLUE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
	this.setInputsInline(true);
  }
};

Blockly.Blocks.MeLineFollower = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
	      .appendField(Blockly.MIXLY_MBOT_LINE_FOLLOWER)
		  //.appendField(new Blockly.FieldImage("../../media/makeblock_orion/mb_light_grayscale.png", 35, 32))
		  .appendField("#")
	      .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "PIN");
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.MeInfraredReceiver = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
	      .appendField(Blockly.MIXLY_NOVA_IR_REC)
		  //.appendField(new Blockly.FieldImage("../../media/makeblock_orion/mb_pir_motion.png", 42, 32))
		  .appendField("#")
	      .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "PIN");
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.mb_gyro = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.Makeblock_GYRO)
		.appendField(new Blockly.FieldDropdown([["x", "1"], ["y", "2"], ["z", "3"]]), "STAT");
		//.appendField(new Blockly.FieldImage("../../media/makeblock_orion/mb_joystick.png", 38, 32));
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.mb_gyro_update = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.Makeblock_GYRO_UPDATE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
  }
};

Blockly.Blocks.mb_xiaofengshan = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
	      .appendField(Blockly.Makeblock_MiniFan)
		  //.appendField(new Blockly.FieldImage("../../media/makeblock_orion/mb_light_grayscale.png", 35, 32))
		  .appendField("#")
	      .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "PIN")
		  .appendField(new Blockly.FieldDropdown([[Blockly.Makeblock_MOTOR_FORWARD, "1"], [Blockly.Makeblock_MOTOR_REVERSE, "-1"], [Blockly.Makeblock_MOTOR_STOP, "0"]]), "STAT");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};