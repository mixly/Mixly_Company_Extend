'use strict';

goog.provide('Blockly.Blocks.makeblock');

goog.require('Blockly.Blocks');


Blockly.Blocks.makeblock.HUE = 120;

var MAKEBLOCK_PORTS =[["接口1", "1"],["接口2", "2"],["接口3", "3"],["接口4", "4"]];
var MAKEBLOCK_NUMBERS =[["1", "1"],["2", "2"],["3", "3"],["4", "4"]];
var MAKEBLOCK_MS=[["M1", "9"],["M2", "10"]];
var MAKEBLOCK_SLOTS=[["SLOT1", "SLOT1"],["SLOT2", "SLOT2"]];
var MAKEBLOCK_UNIT=[["cm", "Cm"],["inch", "Inch"]];
var MAKEBLOCK_SERVO=[["前进", "1"],["后退", "2"],["右转", "3"],["左转", "4"]];
var MAKEBLOCK_BOARDLED=[["全部", "0"],["左", "1"],["右", "3"]];
var MAKEBLOCK_PLUG=[["插头1", "1"],["插头2", "2"]];
Blockly.Blocks.mb_servo_move = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_SERVO)
		.appendField(new Blockly.FieldImage("../../media/makeblock/mb_servo.png", 39, 32))
        .appendField(new Blockly.FieldDropdown(MAKEBLOCK_SERVO), "Direction")
        .appendField(Blockly.MIXLY_SERVOSPEED);
    this.appendValueInput("Speed", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
  }
};

Blockly.Blocks.mb_servo_setAngle = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_SERVO)
        .appendField(new Blockly.FieldImage("../../media/makeblock/mb_servo.png", 39, 32))
        .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "port")
        .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PLUG), "plug");
    this.appendValueInput("angle", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
  }
};
Blockly.Blocks.mb_setBoradLED = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MAKEBLOCK_BOARDLED)
        .appendField(new Blockly.FieldDropdown(MAKEBLOCK_BOARDLED), "boradLED");
    this.appendValueInput("Rvalue", Number)
        .appendField(Blockly.MIXLY_MAKEBLOCK_RGB_R)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput("Gvalue", Number)
        .appendField(Blockly.MIXLY_MAKEBLOCK_RGB_G)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput("Bvalue", Number)
        .appendField(Blockly.MIXLY_MAKEBLOCK_RGB_B)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
  }
};


Blockly.Blocks.mb_setLED = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_LED)
        .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "LEDPort")
        .appendField(new Blockly.FieldDropdown(MAKEBLOCK_NUMBERS), "_sharp");
    this.appendValueInput("Rvalue", Number)
        .appendField(Blockly.MIXLY_MAKEBLOCK_RGB_R)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput("Gvalue", Number)
        .appendField(Blockly.MIXLY_MAKEBLOCK_RGB_G)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput("Bvalue", Number)
        .appendField(Blockly.MIXLY_MAKEBLOCK_RGB_B)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
  }
};

Blockly.Blocks.mb_LEDMTX_setNumber = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MAKEBLOCK_LEDMTX)
        .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "LEDPort");
    this.appendValueInput("Num", Number)
        .appendField(Blockly.MIXLY_MAKEBLOCK_DISPLAY_NUMBER)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
  }
};

Blockly.Blocks.mb_LEDMTX_setString = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MAKEBLOCK_LEDMTX)
        .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "LEDPort");
    this.appendValueInput("x", Number)
        .appendField("X:")
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput("y", Number)
        .appendField("Y:")
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput("Str", String)
        .appendField(Blockly.MIXLY_MAKEBLOCK_DISPLAY_STRING)
        .setCheck(String)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
  }
};

Blockly.Blocks.mb_LEDMTX_setTime = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MAKEBLOCK_LEDMTX)
        .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "LEDPort");
    this.appendValueInput("h", Number)
        .appendField(Blockly.MIXLY_HOUR)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput("m", Number)
        .appendField(Blockly.MIXLY_MINUTE)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
  }
};
/*
Blockly.Blocks.mb_LEDMTX_freeSet = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MAKEBLOCK_LEDMTX)
        .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "LEDPort");
    this.appendValueInput("x", Number)
        .appendField("X:")
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput("y", Number)
        .appendField("Y:")
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput("").appendField(Blockly.MIXLY_DISPLAY_MATRIX_ARRAYVAR).appendField(new Blockly.FieldTextInput("LedArray1"), "VAR");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a80").appendField(new Blockly.FieldCheckbox("FALSE"), "a81").appendField(new Blockly.FieldCheckbox("FALSE"), "a82").appendField(new Blockly.FieldCheckbox("FALSE"), "a83").appendField(new Blockly.FieldCheckbox("FALSE"), "a84").appendField(new Blockly.FieldCheckbox("FALSE"), "a85").appendField(new Blockly.FieldCheckbox("FALSE"), "a86").appendField(new Blockly.FieldCheckbox("FALSE"), "a87".appendField(new Blockly.FieldCheckbox("FALSE"), "a88".appendField(new Blockly.FieldCheckbox("FALSE"), "a89".appendField(new Blockly.FieldCheckbox("FALSE"), "a8a".appendField(new Blockly.FieldCheckbox("FALSE"), "a8b".appendField(new Blockly.FieldCheckbox("FALSE"), "a8c".appendField(new Blockly.FieldCheckbox("FALSE"), "a8d",.appendField(new Blockly.FieldCheckbox("FALSE"), "a8e");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a70").appendField(new Blockly.FieldCheckbox("FALSE"), "a71").appendField(new Blockly.FieldCheckbox("FALSE"), "a72").appendField(new Blockly.FieldCheckbox("FALSE"), "a73").appendField(new Blockly.FieldCheckbox("FALSE"), "a74").appendField(new Blockly.FieldCheckbox("FALSE"), "a75").appendField(new Blockly.FieldCheckbox("FALSE"), "a76").appendField(new Blockly.FieldCheckbox("FALSE"), "a77".appendField(new Blockly.FieldCheckbox("FALSE"), "a78".appendField(new Blockly.FieldCheckbox("FALSE"), "a79".appendField(new Blockly.FieldCheckbox("FALSE"), "a7a".appendField(new Blockly.FieldCheckbox("FALSE"), "a7b".appendField(new Blockly.FieldCheckbox("FALSE"), "a7c".appendField(new Blockly.FieldCheckbox("FALSE"), "a7d",.appendField(new Blockly.FieldCheckbox("FALSE"), "a7e");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a60").appendField(new Blockly.FieldCheckbox("FALSE"), "a61").appendField(new Blockly.FieldCheckbox("FALSE"), "a62").appendField(new Blockly.FieldCheckbox("FALSE"), "a63").appendField(new Blockly.FieldCheckbox("FALSE"), "a64").appendField(new Blockly.FieldCheckbox("FALSE"), "a65").appendField(new Blockly.FieldCheckbox("FALSE"), "a66").appendField(new Blockly.FieldCheckbox("FALSE"), "a67".appendField(new Blockly.FieldCheckbox("FALSE"), "a68".appendField(new Blockly.FieldCheckbox("FALSE"), "a69".appendField(new Blockly.FieldCheckbox("FALSE"), "a6a".appendField(new Blockly.FieldCheckbox("FALSE"), "a5b".appendField(new Blockly.FieldCheckbox("FALSE"), "a6c".appendField(new Blockly.FieldCheckbox("FALSE"), "a6d",.appendField(new Blockly.FieldCheckbox("FALSE"), "a6e");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a50").appendField(new Blockly.FieldCheckbox("FALSE"), "a51").appendField(new Blockly.FieldCheckbox("FALSE"), "a52").appendField(new Blockly.FieldCheckbox("FALSE"), "a53").appendField(new Blockly.FieldCheckbox("FALSE"), "a54").appendField(new Blockly.FieldCheckbox("FALSE"), "a55").appendField(new Blockly.FieldCheckbox("FALSE"), "a56").appendField(new Blockly.FieldCheckbox("FALSE"), "a57".appendField(new Blockly.FieldCheckbox("FALSE"), "a58".appendField(new Blockly.FieldCheckbox("FALSE"), "a59".appendField(new Blockly.FieldCheckbox("FALSE"), "a5a".appendField(new Blockly.FieldCheckbox("FALSE"), "a5b".appendField(new Blockly.FieldCheckbox("FALSE"), "a5c".appendField(new Blockly.FieldCheckbox("FALSE"), "a5d",.appendField(new Blockly.FieldCheckbox("FALSE"), "a5e");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a40").appendField(new Blockly.FieldCheckbox("FALSE"), "a41").appendField(new Blockly.FieldCheckbox("FALSE"), "a42").appendField(new Blockly.FieldCheckbox("FALSE"), "a43").appendField(new Blockly.FieldCheckbox("FALSE"), "a44").appendField(new Blockly.FieldCheckbox("FALSE"), "a45").appendField(new Blockly.FieldCheckbox("FALSE"), "a46").appendField(new Blockly.FieldCheckbox("FALSE"), "a47".appendField(new Blockly.FieldCheckbox("FALSE"), "a48".appendField(new Blockly.FieldCheckbox("FALSE"), "a49".appendField(new Blockly.FieldCheckbox("FALSE"), "a4a".appendField(new Blockly.FieldCheckbox("FALSE"), "a4b".appendField(new Blockly.FieldCheckbox("FALSE"), "a4c".appendField(new Blockly.FieldCheckbox("FALSE"), "a4d",.appendField(new Blockly.FieldCheckbox("FALSE"), "a4e");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a30").appendField(new Blockly.FieldCheckbox("FALSE"), "a31").appendField(new Blockly.FieldCheckbox("FALSE"), "a32").appendField(new Blockly.FieldCheckbox("FALSE"), "a33").appendField(new Blockly.FieldCheckbox("FALSE"), "a34").appendField(new Blockly.FieldCheckbox("FALSE"), "a35").appendField(new Blockly.FieldCheckbox("FALSE"), "a36").appendField(new Blockly.FieldCheckbox("FALSE"), "a37".appendField(new Blockly.FieldCheckbox("FALSE"), "a38".appendField(new Blockly.FieldCheckbox("FALSE"), "a39".appendField(new Blockly.FieldCheckbox("FALSE"), "a3a".appendField(new Blockly.FieldCheckbox("FALSE"), "a3b".appendField(new Blockly.FieldCheckbox("FALSE"), "a3c".appendField(new Blockly.FieldCheckbox("FALSE"), "a3d",.appendField(new Blockly.FieldCheckbox("FALSE"), "a3e");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a20").appendField(new Blockly.FieldCheckbox("FALSE"), "a21").appendField(new Blockly.FieldCheckbox("FALSE"), "a22").appendField(new Blockly.FieldCheckbox("FALSE"), "a23").appendField(new Blockly.FieldCheckbox("FALSE"), "a24").appendField(new Blockly.FieldCheckbox("FALSE"), "a25").appendField(new Blockly.FieldCheckbox("FALSE"), "a26").appendField(new Blockly.FieldCheckbox("FALSE"), "a27".appendField(new Blockly.FieldCheckbox("FALSE"), "a28".appendField(new Blockly.FieldCheckbox("FALSE"), "a29".appendField(new Blockly.FieldCheckbox("FALSE"), "a2a".appendField(new Blockly.FieldCheckbox("FALSE"), "a2b".appendField(new Blockly.FieldCheckbox("FALSE"), "a2c".appendField(new Blockly.FieldCheckbox("FALSE"), "a2d",.appendField(new Blockly.FieldCheckbox("FALSE"), "a2e");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a10").appendField(new Blockly.FieldCheckbox("FALSE"), "a11").appendField(new Blockly.FieldCheckbox("FALSE"), "a12").appendField(new Blockly.FieldCheckbox("FALSE"), "a13").appendField(new Blockly.FieldCheckbox("FALSE"), "a14").appendField(new Blockly.FieldCheckbox("FALSE"), "a15").appendField(new Blockly.FieldCheckbox("FALSE"), "a16").appendField(new Blockly.FieldCheckbox("FALSE"), "a17".appendField(new Blockly.FieldCheckbox("FALSE"), "a18".appendField(new Blockly.FieldCheckbox("FALSE"), "a19".appendField(new Blockly.FieldCheckbox("FALSE"), "a1a".appendField(new Blockly.FieldCheckbox("FALSE"), "a1b".appendField(new Blockly.FieldCheckbox("FALSE"), "a1c".appendField(new Blockly.FieldCheckbox("FALSE"), "a1d",.appendField(new Blockly.FieldCheckbox("FALSE"), "a1e");
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
		.appendField(new Blockly.FieldImage("../../media/makeblock/mb_bluetooth.png", 45, 32))
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
		.appendField(new Blockly.FieldImage("../../media/makeblock/mb_bluetooth.png", 45, 32))
		.appendField("#")
	    .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "PIN")
		.appendField(Blockly.MIXLY_AVAILABLE);
    this.setOutput(true, Boolean);
	this.setInputsInline(true);
  }
};
*/
Blockly.Blocks.mb_display = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
	    .appendField(Blockly.MIXLY_7S_DISPLAY)
		.appendField(new Blockly.FieldImage("../../media/makeblock/mb_display.png", 40, 32))
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
		.appendField(new Blockly.FieldImage("../../media/makeblock/mb_motor.png", 40, 32))
		.appendField("#")
	    .appendField(new Blockly.FieldDropdown(MAKEBLOCK_MS), "PIN");
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
		    .appendField(new Blockly.FieldImage("../../media/makeblock/mb_sound.png", 48, 32));
    this.appendValueInput('tone')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_FREQUENCY);
    this.appendValueInput('duration')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_DURATION);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  }
};

Blockly.Blocks.mb_soundsensor = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
    	.appendField(Blockly.MIXLY_MAKEBLOCK_SOUND)
        .appendField("#")
        .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "port");
    this.setInputsInline(true);
    this.setOutput(true, Number);
  }
};


Blockly.Blocks.mb_temperature = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_TEMPERATURE)
		.appendField(new Blockly.FieldImage("../../media/makeblock/mb_temperature.png", 59, 32))
		.appendField("#")
        .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "port")
		.appendField("#")
        .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PLUG), "plug");
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
		.appendField(new Blockly.FieldImage("../../media/makeblock/mb_joystick.png", 38, 32))
		.appendField("#")
        .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "port");
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.mb_gyro = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MAKEBLOCK_GYRO)
		.appendField(new Blockly.FieldDropdown([["x", "1"], ["y", "2"],["z", "3"]]), "STAT");
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.mb_potentiometer = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_POTENTIOMETER)
		.appendField(new Blockly.FieldImage("../../media/makeblock/mb_potentiometer.png", 40, 32))
		.appendField("#")
        .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "port");
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.mb_pyroelectric_infrared = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
	      .appendField(Blockly.MIXLY_MB_PYROELECTRIC_INFRARED)
		  .appendField(new Blockly.FieldImage("../../media/makeblock/mb_pir_motion.png", 42, 32))
		  .appendField("#")
	      .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "port");
    this.setOutput(true, Boolean);
  }
};

Blockly.Blocks.mb_Ultrasonic = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
	      .appendField(Blockly.MIXLY_MB_CHAOSHENGBO)
		  .appendField(new Blockly.FieldImage("../../media/makeblock/mb_ultrasonic.png", 37, 32))
		  .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "port");
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.mb_LineFollower = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
          .appendField(Blockly.MIXLY_MAKEBLOCK_LINEFOLLOWER)
          .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "port");
    this.setOutput(true, Number);
  }
};

/*
Blockly.Blocks.mb_light_grayscale = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
	      .appendField(Blockly.MIXLY_MB_LIGHT_GRAYSCALE)
		  .appendField(new Blockly.FieldImage("../../media/makeblock/mb_light_grayscale.png", 35, 32))
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
		  .appendField(new Blockly.FieldImage("../../media/makeblock/mb_light_grayscale.png", 35, 32))
		  .appendField("#")
	      .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "PIN")
		  .appendField(Blockly.MIXLY_MB_LIGHT_GRAYSCALE_LED)
		  .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_ON, "lightOn"], [Blockly.MIXLY_OFF, "lightOff"]]), "STAT");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

*/
Blockly.Blocks.mb_setLightsensor = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
          .appendField(Blockly.MIXLY_MAKEBLOCK_LIGHTSENSOR)
          .appendField("#")
          .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "LEDPort")
          .appendField(Blockly.MIXLY_MAKEBLOCK_LEDSTATE)
          .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_ON, "1"], [Blockly.MIXLY_OFF, "0"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
  }
};


Blockly.Blocks.mb_camera = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
          .appendField(Blockly.MIXLY_MAKEBLOCK_CAMERA)
          .appendField("#")
          .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "port")
          .appendField(Blockly.MIXLY_MAKEBLOCK_STATE)
          .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_ON, "1"], [Blockly.MIXLY_OFF, "0"], [Blockly.MIXLY_MAKEBLOCK_CAMERA_STOPFOUCSING, "2"], [Blockly.MIXLY_MAKEBLOCK_CAMERA_STARTFOUCSING, "3"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(''); 
  }
};

Blockly.Blocks.mb_fan = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
          .appendField(Blockly.MIXLY_MAKEBLOCK_FAN)
          .appendField("#")
          .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "port")
          .appendField(Blockly.MIXLY_MAKEBLOCK_STATE)
          .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MAKEBLOCK_CLOCKWISE, "1"], [Blockly.MIXLY_OFF, "0"], [Blockly.MIXLY_MAKEBLOCK_CLOCKWISE, "-1"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    }
};

Blockly.Blocks.mb_limitSwitch = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MAKEBLOCK_LIMITSWITCH)
        .appendField("#")
        .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "port")
        .appendField("#")
        .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PLUG), "plug");
    this.setOutput(true, Boolean);
    this.setTooltip('');
  }
};

Blockly.Blocks.mb_DHT11 = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MAKEBLOCK_DHT11)
        .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "port")
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_GETTEMPERATUE,'0'],[Blockly.MIXLY_GETHUMIDITY,'1']]), "STAT");
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.mb_flamesensor = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MAKEBLOCK_FLAMESENSOR)
        .appendField("#")
        .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "port");
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.mb_gasSensor = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MAKEBLOCK_GASSENSOR)
        .appendField("#")
        .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "port");
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.mb_touchSensor = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MAKEBLOCK_TOUCHSENSOR)
        .appendField("#")
        .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "port");
    this.setOutput(true, Boolean);
  }
};

Blockly.Blocks.mb_compass = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MAKEBLOCK_COMPASS)
        .appendField("#")
        .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "port");
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.mb_button = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MAKEBLOCK_BUTTON)
        .appendField("#")
        .appendField(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "port");
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.mb_ir_send = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_SEND_MBOT_MESSAGE);
     this.appendValueInput("CONTENT", String)
        .setCheck(String)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
  }
};

Blockly.Blocks.mb_ir_receive = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MBOT_MESSAGE_RECEIVED);
    this.setOutput(true, String);
  }
};
