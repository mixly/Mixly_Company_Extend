'use strict';
goog.provide('Blockly.Blocks.ruilong');
goog.require('Blockly.Blocks');

Blockly.Blocks.ruilong.HUE = 120;

Blockly.Blocks.ruilong_lamp = {
  init: function() {
    this.setColour(Blockly.Blocks.ruilong.HUE);
    this.appendDummyInput("")
	    .appendField(Blockly.MIXLY_RUILONG_LAMP)
		.appendField(new Blockly.FieldImage("../../media/ruilong/lamp.png", 41, 32));
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_PIN)
        .setCheck(Number);
	this.appendDummyInput("")
		.appendField(Blockly.MIXLY_STAT)
      	.appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_ON, "HIGH"], [Blockly.MIXLY_OFF, "LOW"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks.ruilong_buzzer = {
  init: function() {
    this.setColour(Blockly.Blocks.ruilong.HUE);
    this.appendDummyInput("")
	    .appendField(Blockly.MIXLY_RUILONG_BUZZER)
		.appendField(new Blockly.FieldImage("../../media/ruilong/buzzer.png", 41, 32));   	
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_PIN)
        .setCheck(Number);
	this.appendDummyInput("")
		.appendField(Blockly.MIXLY_STAT)
      	.appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_ON, "HIGH"], [Blockly.MIXLY_OFF, "LOW"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks.ruilong_relay = {
  init: function() {
    this.setColour(Blockly.Blocks.ruilong.HUE);
    this.appendDummyInput("")
	    .appendField(Blockly.MIXLY_RUILONG_RELAY)
		.appendField(new Blockly.FieldImage("../../media/ruilong/relay.png", 35, 32));   	
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_PIN)
        .setCheck(Number);
	this.appendDummyInput("")
		.appendField(Blockly.MIXLY_STAT)
      	.appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_ON, "HIGH"], [Blockly.MIXLY_OFF, "LOW"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks.ruilong_magnetic = {
  init: function() {
    this.setColour(Blockly.Blocks.ruilong.HUE);
    this.appendDummyInput("")
	    .appendField(Blockly.MIXLY_RUILONG_MAGNETIC)
		.appendField(new Blockly.FieldImage("../../media/ruilong/magnetic.png", 41, 32));
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_PIN)
        .setCheck(Number);
    this.setOutput(true, Boolean);
	this.setInputsInline(true);
    this.setTooltip('');
  }
};

Blockly.Blocks.ruilong_vibration = {
  init: function() {
    this.setColour(Blockly.Blocks.ruilong.HUE);
    this.appendDummyInput("")
	    .appendField(Blockly.MIXLY_RUILONG_VIBRATION)
		.appendField(new Blockly.FieldImage("../../media/ruilong/vibration.png", 42, 32));
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_PIN)
        .setCheck(Number);
    this.setOutput(true, Boolean);
	this.setInputsInline(true);
    this.setTooltip('');
  }
};

Blockly.Blocks.ruilong_tilt = {
  init: function() {
    this.setColour(Blockly.Blocks.ruilong.HUE);
    this.appendDummyInput("")
	    .appendField(Blockly.MIXLY_RUILONG_TILT)
		.appendField(new Blockly.FieldImage("../../media/ruilong/tilt.png", 38, 32));
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_PIN)
        .setCheck(Number);
    this.setOutput(true, Boolean);
	this.setInputsInline(true);
    this.setTooltip('');
  }
};

Blockly.Blocks.ruilong_touch = {
  init: function() {
    this.setColour(Blockly.Blocks.ruilong.HUE);
    this.appendDummyInput("")
	    .appendField(Blockly.MIXLY_RUILONG_TOUCH)
		.appendField(new Blockly.FieldImage("../../media/ruilong/touch.png", 41, 32));
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_PIN)
        .setCheck(Number);
    this.setOutput(true, Boolean);
	this.setInputsInline(true);
    this.setTooltip('');
  }
};

Blockly.Blocks.ruilong_collision = {
  init: function() {
    this.setColour(Blockly.Blocks.ruilong.HUE);
    this.appendDummyInput("")
	    .appendField(Blockly.MIXLY_RUILONG_COLLISION)
		.appendField(new Blockly.FieldImage("../../media/ruilong/collision.png", 38, 32));
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_PIN)
        .setCheck(Number);
    this.setOutput(true, Boolean);
	this.setInputsInline(true);
    this.setTooltip('');
  }
};

Blockly.Blocks.ruilong_button = {
  init: function() {
    this.setColour(Blockly.Blocks.ruilong.HUE);
    this.appendDummyInput("")
	    .appendField(Blockly.MIXLY_RUILONG_BUTTON)
		.appendField(new Blockly.FieldImage("../../media/ruilong/button.png", 42, 32));
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_PIN)
        .setCheck(Number);
    this.setOutput(true, Boolean);
	this.setInputsInline(true);
    this.setTooltip('');
  }
};

//DHT11传感器
Blockly.Blocks.ruilong_dht11={
	init: function() {
	var WHAT = [[Blockly.MIXLY_DHT11_T, 'temperature'],[Blockly.MIXLY_DHT11_H, 'humidity']];
    this.setColour(Blockly.Blocks.ruilong.HUE);
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_RUILONG_DHT11)
		.appendField(new Blockly.FieldImage("../../media/ruilong/dht11.png", 41, 32))
		.appendField(Blockly.MIXLY_PIN)
        .setCheck(Number);
	this.appendDummyInput("")
	    .appendField(new Blockly.FieldDropdown(WHAT), "WHAT");
	this.setOutput(true, Number);
  }
};

Blockly.Blocks.ruilong_resistor_scratch = {
  init: function() {
    this.setColour(Blockly.Blocks.ruilong.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_RUILONG_RESISTOR_SCRATCH)
		.appendField(new Blockly.FieldImage("../../media/ruilong/resistor_scratch.png", 48, 32));
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_PIN)
        .setCheck(Number);
	this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.ruilong_temp = {
  init: function() {
    this.setColour(Blockly.Blocks.ruilong.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_RUILONG_TEMP)
		.appendField(new Blockly.FieldImage("../../media/ruilong/temp.png", 40, 32));
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_PIN)
        .setCheck(Number);
	this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.ruilong_sound = {
  init: function() {
    this.setColour(Blockly.Blocks.ruilong.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_RUILONG_SOUND)
		.appendField(new Blockly.FieldImage("../../media/ruilong/sound.png", 41, 32));
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_PIN)
        .setCheck(Number);
	this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.ruilong_moisture = {
  init: function() {
    this.setColour(Blockly.Blocks.ruilong.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_RUILONG_MOISTURE)
		.appendField(new Blockly.FieldImage("../../media/ruilong/moisture.png", 40, 32));
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_PIN)
        .setCheck(Number);
	this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.ruilong_steam = {
  init: function() {
    this.setColour(Blockly.Blocks.ruilong.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_RUILONG_STEAM)
		.appendField(new Blockly.FieldImage("../../media/ruilong/steam.png", 46, 32));
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_PIN)
        .setCheck(Number);
	this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.ruilong_linefinder = {
  init: function() {
    this.setColour(Blockly.Blocks.ruilong.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_RUILONG_LINEFINDER)
		.appendField(new Blockly.FieldImage("../../media/ruilong/linefinder.png", 33, 32));
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_PIN)
        .setCheck(Number);
	this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.ruilong_obstacle = {
  init: function() {
    this.setColour(Blockly.Blocks.ruilong.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_RUILONG_OBSTACLE)
		.appendField(new Blockly.FieldImage("../../media/ruilong/obstacle.png", 39, 32));
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_PIN)
        .setCheck(Number);
	this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.ruilong_knob = {
  init: function() {
    this.setColour(Blockly.Blocks.ruilong.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_RUILONG_KNOB)
		.appendField(new Blockly.FieldImage("../../media/ruilong/knob.png", 34, 32));
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_PIN)
        .setCheck(Number);
	this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.ruilong_slider = {
  init: function() {
    this.setColour(Blockly.Blocks.ruilong.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_RUILONG_SLIDER)
		.appendField(new Blockly.FieldImage("../../media/ruilong/slider.png", 34, 32));
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_PIN)
        .setCheck(Number);
	this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.ruilong_light = {
  init: function() {
    this.setColour(Blockly.Blocks.ruilong.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_RUILONG_LIGHT)
		.appendField(new Blockly.FieldImage("../../media/ruilong/light.png", 44, 32));
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_PIN)
        .setCheck(Number);
	this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};


Blockly.Blocks.ruilong_lcd_print = {
  init: function() {
    this.setColour(Blockly.Blocks.ruilong.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_RUILONG_LCD1602)
        .appendField(new Blockly.FieldImage("../../media/ruilong/lcd.png", 69, 32));
    this.appendValueInput("TEXT", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_LCD_PRINT1);
    this.appendValueInput("TEXT2", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_LCD_PRINT2)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks.ruilong_lcd_power = {
  init: function() {
    this.setColour(Blockly.Blocks.ruilong.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_RUILONG_LCD1602)
        .appendField(new Blockly.FieldImage("../../media/ruilong/lcd.png", 69, 32))
		.appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_LCD_STAT_ON, "display"], [Blockly.MIXLY_LCD_STAT_OFF, "noDisplay"], [Blockly.MIXLY_LCD_STAT_CURSOR, "cursor"], [Blockly.MIXLY_LCD_STAT_NOCURSOR, "noCursor"], [Blockly.MIXLY_LCD_STAT_BLINK, "blink"], [Blockly.MIXLY_LCD_STAT_NOBLINK, "noBlink"], [Blockly.MIXLY_LCD_STAT_CLEAR, "clear"]]), "STAT");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

//RGB
Blockly.Blocks.ruilong_rgb= {
  init: function() {
    this.setColour(Blockly.Blocks.ruilong.HUE);
	this.appendDummyInput("")
		.appendField(Blockly.MIXLY_RUILONG_RGB)
		.appendField(new Blockly.FieldImage("../../media/ruilong/rgb.png", 33, 32));		
	this.appendValueInput("PIN", Number)
		.setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_PIN);
    this.appendValueInput("_LED_")
		.setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
		.appendField(Blockly.MIXLY_RUILONG_RGB_NUM);	
	this.appendValueInput("RVALUE")
		.setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
		.appendField(Blockly.MIXLY_RUILONG_RGB_R);  
	this.appendValueInput("GVALUE")
		.setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
		.appendField(Blockly.MIXLY_RUILONG_RGB_G);	
	this.appendValueInput("BVALUE")
		.setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
		.appendField(Blockly.MIXLY_RUILONG_RGB_B);
	this.setInputsInline(true);
	this.setPreviousStatement(true, null);
	this.setNextStatement(true, null);
	this.setTooltip('');
  }
};
Blockly.Blocks.ruilong_rgb2 = {
	init: function() {
	this.setColour(Blockly.Blocks.ruilong.HUE);
	this.appendDummyInput("")
		.appendField(Blockly.MIXLY_RUILONG_RGB)
		.appendField(new Blockly.FieldImage("../../media/ruilong/rgb.png", 33, 32));			
	this.appendValueInput("PIN", Number)
		.setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_PIN);
    this.appendValueInput("_LED_")
        .setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
		.appendField(Blockly.MIXLY_RUILONG_RGB_NUM);
    this.appendDummyInput("")
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendField(new Blockly.FieldColour("#ff0000"), "RGB_LED_color");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks.ruilong_4digitdisplay_power = {
  init: function() {
    this.setColour(Blockly.Blocks.ruilong.HUE);
    this.appendDummyInput()
		.appendField(Blockly.MIXLY_RUILONG_4DIGITDISPLAY)
		.appendField(new Blockly.FieldImage("../../media/ruilong/4digitdisplay.png", 88, 32))
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_LCD_STAT_ON, "displayOn"], [Blockly.MIXLY_LCD_STAT_OFF, "displayOff"], [Blockly.MIXLY_LCD_STAT_CLEAR, "clear"]]), "STAT");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks.ruilong_4digitdisplay_displayString = {
  init: function() {
    this.setColour(Blockly.Blocks.ruilong.HUE);
    this.appendDummyInput()
		.appendField(Blockly.MIXLY_RUILONG_4DIGITDISPLAY)
		.appendField(new Blockly.FieldImage("../../media/ruilong/4digitdisplay.png", 88, 32));
	this.appendValueInput("VALUE")
        .setCheck(String)
		.setAlign(Blockly.ALIGN_RIGHT)
		.appendField(Blockly.MIXLY_RUILONG_4DIGITDISPLAY_DISPLAYSTRING);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks.ruilong_4digitdisplay_showDot = {
  init: function() {
    this.setColour(Blockly.Blocks.ruilong.HUE);
    this.appendDummyInput()
		.appendField(Blockly.MIXLY_RUILONG_4DIGITDISPLAY)
		.appendField(new Blockly.FieldImage("../../media/ruilong/4digitdisplay.png", 88, 32))
		.appendField(Blockly.MIXLY_RUILONG_4DIGITDISPLAY_NOMBER1)
		.appendField(new Blockly.FieldDropdown([["1","0"],["2","1"],["3","2"],["4","3"]]),"NO")
		.appendField(Blockly.MIXLY_RUILONG_4DIGITDISPLAY_NOMBER2)
		.appendField(Blockly.MIXLY_RUILONG_4DIGITDISPLAY_DOT)
		.appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_RUILONG_4DIGITDISPLAY_ON,"true"],[Blockly.MIXLY_RUILONG_4DIGITDISPLAY_OFF,"false"]]),"STAT");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

