'use strict';
goog.provide('Blockly.Blocks.maker17');
goog.require('Blockly.Blocks');
Blockly.Blocks.maker17.HUE = 0; //红色
Blockly.Blocks.maker17.HUE0 = 0; //红色
Blockly.Blocks.maker17.HUE1 = 60; //黄色
Blockly.Blocks.maker17.HUE2 = 120; //绿色
Blockly.Blocks.maker17.HUE3 = 180; //青色
Blockly.Blocks.maker17.HUE4 = 240; //蓝色
Blockly.Blocks.maker17.HUE5 = 300; //紫色
Blockly.Blocks.maker17.ICON_WIDTH = 20; //传感器图标宽度
Blockly.Blocks.maker17.ICON_HEIGHT = 20; //传感器图标高度
//蜂鸣器频率
var TONE_NOTES = [
   ["NOTE_C5", "532"],
  ["NOTE_D5", "587"],
  ["NOTE_E5", "659"],
  ["NOTE_F5", "698"],
  ["NOTE_G5", "784"],
  ["NOTE_A5", "880"],
  ["NOTE_B5", "988"],
  ["NOTE_C6", "1048"],
  ["NOTE_D6", "1176"],
  ["NOTE_E6", "1320"],
  ["NOTE_F6", "1396"],
  ["NOTE_G6", "1568"],
  ["NOTE_A6", "1760"],
  ["NOTE_B6", "1976"],
  ["NOTE_C7", "2096"],
  ["NOTE_D7", "2352"],
  ["NOTE_E7", "2640"],
  ["NOTE_F7", "2792"],
  ["NOTE_G7", "3136"],
  ["NOTE_A7", "3520"],
  ["NOTE_B7", "3952"]];

//执行器-蜂鸣器的频率选择
Blockly.Blocks.maker17_tone_notes = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE2);
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown(TONE_NOTES), 'STAT');
   this.setOutput(true, Number);
  }
};

//执行器-蜂鸣器模块
Blockly.Blocks.maker17_tone = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE2);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/buzzer.png",  Blockly.Blocks.maker17.ICON_WIDTH , Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_BUZZER);
    this.appendValueInput("PIN", Number).appendField(Blockly.MIXLY_PIN).setCheck(Number);
    this.appendValueInput('FREQUENCY').setCheck(Number).appendField(Blockly.MIXLY_FREQUENCY);
    this.appendValueInput('DURATION', Number).setCheck(Number).appendField(Blockly.MIXLY_DURATION).appendField("(ms)");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

//执行器-蜂鸣器停止模块
Blockly.Blocks.maker17_newNoTone = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE2);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/buzzer.png",  Blockly.Blocks.maker17.ICON_WIDTH , Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_NEWNOTONE);
    this.appendValueInput("PIN", Number).appendField(Blockly.MIXLY_PIN).setCheck(Number);
    this.appendValueInput("DELAY_TIME", Number).appendField(Blockly.MIXLY_DELAY).setCheck(Number).appendField("(ms)");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

//电机选择变量
var MAKER17_MOTERSELECT = [
  ["M1", "1"],
  ["M2", "2"]
];

//执行器-电机转速
Blockly.Blocks.maker17_motor = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE2);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/motor.png",  Blockly.Blocks.maker17.ICON_WIDTH , Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_MOTOR).appendField("#").appendField(new Blockly.FieldDropdown(MAKER17_MOTERSELECT), "PIN");
    this.appendValueInput('speed').setCheck(Number).appendField(Blockly.MAKER17_MOTOR_SPEED);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

//执行器-电机停止
Blockly.Blocks.maker17_motor_stop = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE2);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/motor.png",  Blockly.Blocks.maker17.ICON_WIDTH , Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_MOTOR).appendField("#").appendField(new Blockly.FieldDropdown(MAKER17_MOTERSELECT), "PIN").appendField(Blockly.MIXLY_STOP);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

//数字传感器-DHT11传感器
Blockly.Blocks.maker17_dht11 = {
  init: function() {
    var WHAT = [
      [Blockly.MIXLY_DHT11_T, 'temperature'],
      [Blockly.MIXLY_DHT11_H, 'humidity']
    ];
    this.setColour(Blockly.Blocks.maker17.HUE1);
    this.appendValueInput("PIN", Number).appendField(new Blockly.FieldImage("../../media/maker17/dht11.png", Blockly.Blocks.maker17.ICON_WIDTH , Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_DHT11).appendField(Blockly.MIXLY_PIN).setCheck(Number);
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown(WHAT), "WHAT");
    this.setOutput(true, Number);
  }
};

//数字传感器-DHT22传感器
Blockly.Blocks.maker17_dht22 = {
  init: function() {
    var WHAT = [
      [Blockly.MIXLY_DHT11_T, 'TemperatureC'],
      [Blockly.MIXLY_DHT11_H, 'Humidity']
    ];
    this.setColour(Blockly.Blocks.maker17.HUE1);
    this.appendValueInput("PIN", Number).appendField(new Blockly.FieldImage("../../media/maker17/dht11.png",  Blockly.Blocks.maker17.ICON_WIDTH , Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_DHT22).appendField(Blockly.MIXLY_PIN).setCheck(Number);
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown(WHAT), "WHAT");
    this.setOutput(true, Number);
  }
};

//加速度选择变量
var MAKER17_ADXL345_SELECT = [
  [Blockly.MAKER17_ADXL345_AX, "X"],
  [Blockly.MAKER17_ADXL345_AY, "Y"],
  [Blockly.MAKER17_ADXL345_AZ, "Z"]
];
//数字传感器-ADXL345
Blockly.Blocks.maker17_ADXL345 = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE1);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/adxl345.png",  Blockly.Blocks.maker17.ICON_WIDTH , Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_ADXL345).appendField("IIC接口").appendField(new Blockly.FieldDropdown(MAKER17_ADXL345_SELECT), "TYPE");
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MAKER17_ADXL345_TIP);
  }
};

//模拟传感器-IIC地址查找
Blockly.Blocks.maker17_IICSCAN = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE1);
    this.appendDummyInput("").appendField(Blockly.maker17_IICSCAN);
    this.setInputsInline(true);
    this.setTooltip('');
  }
};
//模拟传感器-lm35温度传感器
Blockly.Blocks.maker17_LM35temp = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE1);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/LM35.png", Blockly.Blocks.maker17.ICON_WIDTH , Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_LM35TEMP);
    this.appendValueInput("PIN", Number).appendField(Blockly.MIXLY_PIN).setCheck(Number);
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};


//显示-TM1650-4位数码管清屏-开关
Blockly.Blocks.maker17_4digitdisplay_power = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/tm1650.png",  Blockly.Blocks.maker17.ICON_WIDTH , Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_4DIGITDISPLAY).appendField(new Blockly.FieldDropdown([
      [Blockly.MIXLY_LCD_STAT_ON, "displayOn"],
      [Blockly.MIXLY_LCD_STAT_OFF, "displayOff"],
      [Blockly.MIXLY_LCD_STAT_CLEAR, "clear"]
    ]), "STAT");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

//显示-TM1650-4位数码管显示字符串
Blockly.Blocks.maker17_4digitdisplay_displayString = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/tm1650.png",  Blockly.Blocks.maker17.ICON_WIDTH , Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_4DIGITDISPLAY);
    this.appendValueInput("VALUE").setCheck(String).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MAKER17_4DIGITDISPLAY_DISPLAYSTRING);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MAKER17_4DIGITDISPLAY_TOOLTIP);
  }
};

//显示-TM1650-4位数码管显示小数点
Blockly.Blocks.maker17_4digitdisplay_showDot = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/tm1650.png",  Blockly.Blocks.maker17.ICON_WIDTH , Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_4DIGITDISPLAY).appendField(Blockly.MAKER17_4DIGITDISPLAY_NOMBER1).appendField(new Blockly.FieldDropdown([
      ["1", "0"],
      ["2", "1"],
      ["3", "2"],
      ["4", "3"]
    ]), "NO").appendField(Blockly.MAKER17_4DIGITDISPLAY_NOMBER2).appendField(Blockly.MAKER17_4DIGITDISPLAY_DOT).appendField(new Blockly.FieldDropdown([
      [Blockly.MAKER17_4DIGITDISPLAY_ON, "true"],
      [Blockly.MAKER17_4DIGITDISPLAY_OFF, "false"]
    ]), "STAT");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

//显示-TM1650-4位数码管设置亮度
Blockly.Blocks.Maker17_4DigitDisplay_Brightness = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/tm1650.png",  Blockly.Blocks.maker17.ICON_WIDTH , Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_4DIGITDISPLAY);
    this.appendDummyInput("").appendField(Blockly.MAKER17_BRIGHTNESS).appendField(new Blockly.FieldDropdown([
      ["7", "7"],
      ["6", "6"],
      ["5", "5"],
      ["4", "4"],
      ["3", "3"],
      ["2", "2"],
      ["1", "1"]
    ]), "BRIGHTNESS");
    this.setTooltip(Blockly.MAKER17_4DIGITDISPLAY_BRIGHTNESS_TOOLTIP);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);

  }
};

//显示-TM1637初始化
Blockly.Blocks.Maker17_TM1637_init = {
  init: function() {
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/TM1637.png", 83,   Blockly.Blocks.maker17.ICON_HEIGHT));
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MAKER17_TM1637_INIT).appendField("CLK").appendField(Blockly.MIXLY_PIN);
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("DIO").appendField(Blockly.MIXLY_PIN);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MAKER17_TM1637_TIP);
    this.setHelpUrl('');
  }
};

//显示-TM1637-4位数码管显示字符串
Blockly.Blocks.maker17_TM1637_displayString = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/TM1637.png", 83,  Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_TM1637);
    this.appendValueInput("VALUE").setCheck(String).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MAKER17_TM1637_DISPLAYSTRING);
    this.appendValueInput("Speed").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MAKER17_SPEED);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MAKER17_TM1637_DISPLAYSTRING_TIP);
  }
};

//显示-TM1637-4位数码管显示时间
Blockly.Blocks.maker17_TM1637_displayTime = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/TM1637.png", 83,  Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_TM1637_DISPLAYTIME);
    this.appendValueInput("hour").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput("").appendField(Blockly.MAKER17_HOUR);
    this.appendValueInput("minute").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput("").appendField(Blockly.MAKER17_MINUTE);
    this.appendValueInput("second").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput("").appendField(Blockly.MAKER17_SECOND);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MAKER17_TM1637_DISPLAYTIME_TOOLTIP);
  }
};

//显示-TM1637-4位数码管停表
Blockly.Blocks.maker17_TM1637_Stopwatch = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/TM1637.png", 83,  Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_TM1637);
    this.appendDummyInput("").appendField(Blockly.MAKER17_STOPWATCH).appendField(new Blockly.FieldDropdown([
      [Blockly.MAKER17_STOPWATCH_START, "stopwatchStart"],
      [Blockly.MAKER17_STOPWATCH_PAUSE, "stopwatchPause"],
      [Blockly.MAKER17_STOPWATCH_RESET, "stopwatchReset"], ]), "STAT");
    this.setTooltip(Blockly.MAKER17_TM1637_STOPWATCH_TOOLTIP);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  }
};
//显示-TM1637-4位数码管设置亮度
Blockly.Blocks.Maker17_TM1637_Brightness = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/TM1637.png", 83,  Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_TM1637);
    this.appendDummyInput("").appendField(Blockly.MAKER17_BRIGHTNESS).appendField(new Blockly.FieldDropdown([
      ["7", "7"],
      ["6", "6"],
      ["5", "5"],
      ["4", "4"],
      ["3", "3"],
      ["2", "2"],
      ["1", "1"]
    ]), "BRIGHTNESS");
    this.setTooltip(Blockly.MAKER17_4DIGITDISPLAY_BRIGHTNESS_TOOLTIP);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  }
};

//显示-MAX7219-初始化
Blockly.Blocks.MAX7219_init = {
  init: function() {
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/matrix44.png",  Blockly.Blocks.maker17.ICON_WIDTH,  Blockly.Blocks.maker17.ICON_HEIGHT));
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MAKER17_MAX7219_INIT).appendField("DIN").appendField(Blockly.MIXLY_PIN);
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("CS").appendField(Blockly.MIXLY_PIN);
    this.appendValueInput("PIN3").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("CLK").appendField(Blockly.MIXLY_PIN);
    this.appendValueInput("Intensity").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MAKER17_BRIGHTNESS);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MAKER17_MAX7219_INIT_TOOLTIP);
    this.setHelpUrl('');
  }
};

//显示-MAX7219-滚动字符串
Blockly.Blocks.MAX7219_putString = {
  init: function() {
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/matrix44.png", Blockly.Blocks.maker17.ICON_WIDTH,  Blockly.Blocks.maker17.ICON_HEIGHT));
    this.appendValueInput("String", String).setCheck([String, Number]).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MAKER17_MAX7219_PUTSTR);
    this.appendValueInput("Speed").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MAKER17_SPEED);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MAKER17_MAX7219_PUTSTR_TOOLTIP);
    this.setHelpUrl('');
  }
};

//显示-MAX7219-清除LED点阵
// Blockly.Blocks.Ledcontrol_clearDisplay = {
//   init: function() {
//     this.appendDummyInput().appendField("清除LED点阵显示").appendField(new Blockly.FieldTextInput("LC"), "VAR");
//     this.appendValueInput("NUM").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("点阵模块编号（1~8）");
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(Blockly.Blocks.maker17.HUE3);
//     this.setInputsInline(true);
//     this.setTooltip('清除LED点阵(Max7219)显示');
//     this.setHelpUrl('');
//   }
// };
//显示-MAX7219-LED点阵显示图案
Blockly.Blocks.MAX7219_DisplayChar = {
  init: function() {
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/matrix44.png", Blockly.Blocks.maker17.ICON_WIDTH,  Blockly.Blocks.maker17.ICON_HEIGHT));
    this.appendDummyInput().appendField(Blockly.MAKER17_MAX7219_DISPLAYCHAR);
    this.appendValueInput("Chars").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.setTooltip(Blockly.MAKER17_MAX7219_DISPLAYCHAR_TOOLTIP);
    this.setHelpUrl('');
  }
};

//显示-max7219点阵选择数组
Blockly.Blocks.LedArray = {
  init: function() {
    this.appendDummyInput("").appendField(Blockly.MAKER17_MAX7219_LEDARRAY).appendField(new Blockly.FieldTextInput("LedArray"), "VAR");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a11").appendField(new Blockly.FieldCheckbox("FALSE"), "a12").appendField(new Blockly.FieldCheckbox("FALSE"), "a13").appendField(new Blockly.FieldCheckbox("TRUE"), "a14").appendField(new Blockly.FieldCheckbox("TRUE"), "a15").appendField(new Blockly.FieldCheckbox("FALSE"), "a16").appendField(new Blockly.FieldCheckbox("FALSE"), "a17").appendField(new Blockly.FieldCheckbox("FALSE"), "a18");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a21").appendField(new Blockly.FieldCheckbox("FALSE"), "a22").appendField(new Blockly.FieldCheckbox("FALSE"), "a23").appendField(new Blockly.FieldCheckbox("TRUE"), "a24").appendField(new Blockly.FieldCheckbox("TRUE"), "a25").appendField(new Blockly.FieldCheckbox("FALSE"), "a26").appendField(new Blockly.FieldCheckbox("FALSE"), "a27").appendField(new Blockly.FieldCheckbox("FALSE"), "a28");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("TRUE"), "a31").appendField(new Blockly.FieldCheckbox("TRUE"), "a32").appendField(new Blockly.FieldCheckbox("TRUE"), "a33").appendField(new Blockly.FieldCheckbox("TRUE"), "a34").appendField(new Blockly.FieldCheckbox("TRUE"), "a35").appendField(new Blockly.FieldCheckbox("TRUE"), "a36").appendField(new Blockly.FieldCheckbox("TRUE"), "a37").appendField(new Blockly.FieldCheckbox("TRUE"), "a38");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("TRUE"), "a41").appendField(new Blockly.FieldCheckbox("FALSE"), "a42").appendField(new Blockly.FieldCheckbox("FALSE"), "a43").appendField(new Blockly.FieldCheckbox("TRUE"), "a44").appendField(new Blockly.FieldCheckbox("TRUE"), "a45").appendField(new Blockly.FieldCheckbox("FALSE"), "a46").appendField(new Blockly.FieldCheckbox("FALSE"), "a47").appendField(new Blockly.FieldCheckbox("TRUE"), "a48");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("TRUE"), "a51").appendField(new Blockly.FieldCheckbox("TRUE"), "a52").appendField(new Blockly.FieldCheckbox("TRUE"), "a53").appendField(new Blockly.FieldCheckbox("TRUE"), "a54").appendField(new Blockly.FieldCheckbox("TRUE"), "a55").appendField(new Blockly.FieldCheckbox("TRUE"), "a56").appendField(new Blockly.FieldCheckbox("TRUE"), "a57").appendField(new Blockly.FieldCheckbox("TRUE"), "a58");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a61").appendField(new Blockly.FieldCheckbox("FALSE"), "a62").appendField(new Blockly.FieldCheckbox("FALSE"), "a63").appendField(new Blockly.FieldCheckbox("TRUE"), "a64").appendField(new Blockly.FieldCheckbox("TRUE"), "a65").appendField(new Blockly.FieldCheckbox("FALSE"), "a66").appendField(new Blockly.FieldCheckbox("FALSE"), "a67").appendField(new Blockly.FieldCheckbox("FALSE"), "a68");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a71").appendField(new Blockly.FieldCheckbox("FALSE"), "a72").appendField(new Blockly.FieldCheckbox("FALSE"), "a73").appendField(new Blockly.FieldCheckbox("TRUE"), "a74").appendField(new Blockly.FieldCheckbox("TRUE"), "a75").appendField(new Blockly.FieldCheckbox("FALSE"), "a76").appendField(new Blockly.FieldCheckbox("FALSE"), "a77").appendField(new Blockly.FieldCheckbox("FALSE"), "a78");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a81").appendField(new Blockly.FieldCheckbox("FALSE"), "a82").appendField(new Blockly.FieldCheckbox("FALSE"), "a83").appendField(new Blockly.FieldCheckbox("TRUE"), "a84").appendField(new Blockly.FieldCheckbox("TRUE"), "a85").appendField(new Blockly.FieldCheckbox("FALSE"), "a86").appendField(new Blockly.FieldCheckbox("FALSE"), "a87").appendField(new Blockly.FieldCheckbox("FALSE"), "a88");
    this.setOutput(true, Number);
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

//显示-MAX7219-LED点阵图案
Blockly.Blocks.Max7219_img = {
  init: function() {
    this.appendDummyInput("").appendField(Blockly.MAKER17_MAX7219_IMG).appendField(new Blockly.FieldDropdown([
      ["↑", "183c7edb18181818"],
      ["↓", "18181818db7e3c18"],
      ["←", "103060ffff603010"],
      ["→", "080c06ffff060c08"],
      ["♥", "42e7ffffff7e3c18"],
      ["▲", "183c7eff00000000"],
      ["▼", "00000000ff7e3c18"],
      ["◄", "103070f0f0703010"],
      ["►", "080c0e0f0f0e0c08"],
      ["△", "182442ff00000000"],
      ["▽", "00000000ff422418"],
      ["☺", "3c42a581a599423c"],
      ["○", "3c4281818181423c"],
      ["◑", "3c4e8f8f8f8f4e3c"],
      ["◐", "3c72f1f1f1f1723c"],
      ["￥", "4224ff08ff080808"],
      ["Χ", "8142241818244281"],
      ["✓", "0000010204885020"],
      ["□", "007e424242427e00"],
      ["▣", "007e425a5a427e00"],
      ["◇", "1824428181422418"],
      ["♀", "3844444438107c10"],
      ["♂", "0f030579d888d870"],
      ["♪", "0c0e0b080878f860"],
      ["✈", "203098ffff983020"],
      ["卍", "00f21212fe90909e"],
      ["卐", "009e9090fe1212f2"],
      ["︱", "1010101010101010"],
      ["—", "000000ff00000000"],
      ["╱", "0102040810204080"],
      ["＼", "8040201008040201"],
      ["大", "1010fe1010284482"],
      ["中", "1010fe9292fe1010"],
      ["小", "1010105454921070"],
      ["米", "00925438fe385492"],
      ["正", "00fe10105e5050fc"],
      ["囧", "ffa5a5c3bda5a5ff"]
    ]), "img_");
    this.setOutput(true);
    this.setTooltip('');
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.setHelpUrl('');
  }
};

//显示-OLED-变量
var WorH = [
  [Blockly.MAKER17_OLED_HEIGHT, 'Height'],
  [Blockly.MAKER17_OLED_WIDTH, 'Width']
];

var MAKER17_LINESELECT = [
  [Blockly.MAKER17_OLED_HOR, "H"],
  [Blockly.MAKER17_OLED_VER, "V"]
];
var MAKER17_FRAMESELECT = [
  [Blockly.MAKER17_OLED_HOLLOW, "drawFrame"],
  [Blockly.MAKER17_OLED_SOLID, "drawBox"]
];
var MAKER17_CIRCLESELECT = [
  [Blockly.MAKER17_OLED_HOLLOW, "drawCircle"],
  [Blockly.MAKER17_OLED_SOLID, "drawDisc"]
];
//
var MAKER17_RADSELECT = [
  [Blockly.MAKER17_OLED_HOLLOW, "drawRFrame"],
  [Blockly.MAKER17_OLED_SOLID, "drawRBox"]
];
//圆选择
var MAKER17_CIRCLEOPTELECT = [
  [Blockly.MAKER17_OLED_WHOLE_CICILE, "U8G_DRAW_ALL"],
  [Blockly.MAKER17_OLED_UP_R, "U8G_DRAW_UPPER_RIGHT"],
  [Blockly.MAKER17_OLED_UP_L, "U8G_DRAW_UPPER_LEFT"],
  [Blockly.MAKER17_OLED_LOW_R, "U8G_DRAW_LOWER_RIGHT"],
  [Blockly.MAKER17_OLED_LOW_L, "U8G_DRAW_LOWER_LEFT"]
];
//空心、实心椭圆
var MAKER17_ELLIPSESELECT = [
  [Blockly.MAKER17_OLED_HOLLOW, "drawEllipse"],
  [Blockly.MAKER17_OLED_SOLID, "drawFilledEllipse"]
];
//文字选择方向
var MAKER17_STR_SELECT = [
  [Blockly.MAKER17_OLED_DEGREE0, "drawStr"],
  [Blockly.MAKER17_OLED_DEGREE90, "drawStr90"],
  [Blockly.MAKER17_OLED_DEGREE180, "drawStr180"],
  [Blockly.MAKER17_OLED_DEGREE270, "drawStr270"]
];
//字体选择
var MAKER17_FONT_TYPE_SELECT = [
  ["Free-Universal", "fu"],
  ["Gentium", "gd"],
  ["Adobe X11", "Adobe"]
];
//设置字体粗细
var MAKER17_FONT_STYLE_SELECT = [
  [Blockly.MAKER17_OLED_normal, "r"],
  [Blockly.MAKER17_OLED_bold, "b"]
];
//设置字体大小
var MAKER17_FONT_SIZE_SELECT = [
  [Blockly.MAKER17_SMALL, "11"],
  [Blockly.MAKER17_MIDDLE, "20"],
  [Blockly.MAKER17_BIG, "25"]
];

//显示-OLED-初始化
Blockly.Blocks.maker17_oled_init = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/oled.png", Blockly.Blocks.maker17.ICON_WIDTH,  Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_OLED_INIT);
    this.appendValueInput("CLK", Number).appendField("CLK").setCheck(Number);
    this.appendValueInput("DIN", Number).appendField("DIN").setCheck(Number);
    this.appendValueInput("DC", Number).appendField("D/C").setCheck(Number);
    this.appendValueInput("CS1", Number).appendField("CS1").setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MAKER17_OLED_INIT_TOOLTIP)
  }
};

//显示-OLED-初始化2(iic)
Blockly.Blocks.maker17_oled_init2 = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/oled.png",  Blockly.Blocks.maker17.ICON_WIDTH,  Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_OLED_INIT2);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MAKER17_OLED_INIT2_TOOLTIP);
  }
};

//显示-OLED-获取高度/宽度
Blockly.Blocks.maker17_oled_getHeight_or_Width = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE3);

    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/oled.png",  Blockly.Blocks.maker17.ICON_WIDTH,  Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_OLEDGET).appendField(new Blockly.FieldDropdown(WorH), "WHAT");
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MAKER17_OLED_GET_HEIGHT_TOOLTIP);
  }
};

//显示-OLED-图像（汉字）高度选择
var MAKER17_OLED_BITMAP_HEIGHT_SELECT = [
  ["16", "16"],
  ["8", "8"],
  ["24", "24"],
  ["32", "32"],
  ["40", "40"],
  ["48", "48"],
  ["56", "56"],
  ["64", "64"]
];

//显示-OLED-图像（汉字）宽度选择
var MAKER17_OLED_BITMAP_WIDTH_SELECT = [
  ["16", "16"],
  ["8", "8"],
  ["24", "24"],
  ["32", "32"],
  ["40", "40"],
  ["48", "48"],
  ["56", "56"],
  ["64", "64"],
  ["72", "72"],
  ["80", "80"],
  ["88", "88"],
  ["96", "96"],
  ["104", "104"],
  ["112", "112"],
  ["120", "120"],
  ["128", "128"]
];

//显示-oled-定义字模名称和数据
Blockly.Blocks['maker17_oled_define_bitmap_data'] = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.appendDummyInput("").appendField(Blockly.MAKER17_OLED_BITMAP_NAME).appendField(new Blockly.FieldTextInput('bitmap1'), 'VAR').appendField(Blockly.MAKER17_OLED_BITMAP_DATA).appendField(new Blockly.FieldTextInput('0x00,0x00,0x01,0x80,0x11,0x8C,0x19,0x98,0x0D,0x90,0x09,0x90,0x01,0x80,0x7F,0xFE,0x03,0xC0,0x07,0xE0,0x05,0xB0,0x0D,0x98,0x39,0x8E,0x61,0x82,0x01,0x80,0x01,0x80'), 'TEXT');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MAKER17_OLED_DEF_BMP_DATA_TOOLTIP);
  }
}

//显示-OLED-显示位图（汉字）
Blockly.Blocks.maker17_oled_showBitmap = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/oled.png",  Blockly.Blocks.maker17.ICON_WIDTH,  Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_OLED_BITMAP);
    this.appendValueInput("START_X", Number).appendField(Blockly.MAKER17_OLED_POSX).setCheck(Number);
    this.appendValueInput("START_Y", Number).appendField(Blockly.MAKER17_OLED_POSY).setCheck(Number);
    this.appendDummyInput("").appendField(Blockly.MAKER17_OLED_WIDTH).appendField(new Blockly.FieldDropdown(MAKER17_OLED_BITMAP_WIDTH_SELECT), "WIDTH");
    this.appendDummyInput("").appendField(Blockly.MAKER17_OLED_HEIGHT).appendField(new Blockly.FieldDropdown(MAKER17_OLED_BITMAP_HEIGHT_SELECT), "HEIGHT");
    this.appendValueInput("bitmap_name", String).appendField(Blockly.MAKER17_OLED_BITMAP_NAME).setCheck(String);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MAKER17_OLED_SHOW_BMP_TOOLTIP);
  }
};
//显示-OLED-画点
Blockly.Blocks.maker17_oled_drawPixe = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/oled.png",  Blockly.Blocks.maker17.ICON_WIDTH,  Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_OLED_DRAWPIXE);
    this.appendValueInput("POS_X", Number).appendField(Blockly.MAKER17_OLED_POSX).setCheck(Number);
    this.appendValueInput("POS_Y", Number).appendField(Blockly.MAKER17_OLED_POSY).setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MAKER17_OLED_DRAW_PIXE_TOOLTIP);
  }
};

//显示-OLED-画线
Blockly.Blocks.maker17_oled_drawLine = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/oled.png",  Blockly.Blocks.maker17.ICON_WIDTH,  Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_OLED_DRAWLINE);
    this.appendValueInput("START_X", Number).appendField(Blockly.MAKER17_OLED_START_X).setCheck(Number);
    this.appendValueInput("START_Y", Number).appendField(Blockly.MAKER17_OLED_START_Y).setCheck(Number);
    this.appendValueInput("END_X", Number).appendField(Blockly.MAKER17_OLED_END_X).setCheck(Number);
    this.appendValueInput("END_Y", Number).appendField(Blockly.MAKER17_OLED_END_Y).setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MAKER17_OLED_DRAW_LINE_TOOLTIP);
  }
};

//显示-OLED-画直线
Blockly.Blocks.maker17_oled_draw_Str_Line = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/oled.png",  Blockly.Blocks.maker17.ICON_WIDTH,  Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_OLED_DRAWSTRLINE);
    this.appendValueInput("START_X", Number).appendField(Blockly.MAKER17_OLED_START_X).setCheck(Number);
    this.appendValueInput("START_Y", Number).appendField(Blockly.MAKER17_OLED_START_Y).setCheck(Number);
    this.appendValueInput("LENGTH", Number).appendField(Blockly.MAKER17_OLED_LENGTH).setCheck(Number);
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown(MAKER17_LINESELECT), "TYPE");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("x(0~127),y(0~63)");
  }
};

//显示-OLED-新建页面
Blockly.Blocks.maker17_oled_page = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.appendDummyInput().appendField(Blockly.MAKER17_OLED_PAGE);
    this.appendStatementInput('DO').appendField('');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MAKER17_oled_page_tooltip);
  }
};

//显示-OLED-画三角
Blockly.Blocks.maker17_oled_drawTriangle = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/oled.png",  Blockly.Blocks.maker17.ICON_WIDTH,  Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_OLED_DRAW_TRIANGLE);
    this.appendValueInput("D0_X", Number).appendField(Blockly.MAKER17_OLED_D0_X).setCheck(Number);
    this.appendValueInput("D0_Y", Number).appendField(Blockly.MAKER17_OLED_D0_Y).setCheck(Number);
    this.appendValueInput("D1_X", Number).appendField(Blockly.MAKER17_OLED_D1_X).setCheck(Number);
    this.appendValueInput("D1_Y", Number).appendField(Blockly.MAKER17_OLED_D1_Y).setCheck(Number);
    this.appendValueInput("D2_X", Number).appendField(Blockly.MAKER17_OLED_D2_X).setCheck(Number);
    this.appendValueInput("D2_Y", Number).appendField(Blockly.MAKER17_OLED_D2_Y).setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("");
  }
};

//显示-OLED-画长方形
Blockly.Blocks.maker17_oled_drawFrame = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/oled.png",  Blockly.Blocks.maker17.ICON_WIDTH,  Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_OLED_DRAW_RECTANGLE);
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown(MAKER17_FRAMESELECT), "TYPE");
    this.appendValueInput("D0_X", Number).appendField(Blockly.MAKER17_OLED_L_U_X).setCheck(Number);
    this.appendValueInput("D0_Y", Number).appendField(Blockly.MAKER17_OLED_L_U_Y).setCheck(Number);
    this.appendValueInput("WIDTH", Number).appendField(Blockly.MAKER17_OLED_WIDTH).setCheck(Number);
    this.appendValueInput("HEIGHT", Number).appendField(Blockly.MAKER17_OLED_HEIGHT).setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("x(0~127),y(0~63)");
  }
};

//显示-OLED-画圆角矩形
Blockly.Blocks.maker17_oled_drawRFrame = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/oled.png",  Blockly.Blocks.maker17.ICON_WIDTH,  Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_OLED_DRAW_RAD_RECTANGLE);
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown(MAKER17_RADSELECT), "TYPE");
    this.appendValueInput("D0_X", Number).appendField(Blockly.MAKER17_OLED_L_U_X).setCheck(Number);
    this.appendValueInput("D0_Y", Number).appendField(Blockly.MAKER17_OLED_L_U_Y).setCheck(Number);
    this.appendValueInput("WIDTH", Number).appendField(Blockly.MAKER17_OLED_WIDTH).setCheck(Number);
    this.appendValueInput("HEIGHT", Number).appendField(Blockly.MAKER17_OLED_HEIGHT).setCheck(Number);
    this.appendValueInput("RADIUS", Number).appendField(Blockly.MAKER17_OLED_RADIUS).setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("x(0~127),y(0~63)");
  }
};

//显示-OLED-画圆（空心，实心）
Blockly.Blocks.maker17_oled_drawCircle = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/oled.png",  Blockly.Blocks.maker17.ICON_WIDTH,  Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_OLED_DRAW_CIRCLE);
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown(MAKER17_CIRCLESELECT), "TYPE");
    this.appendValueInput("D0_X", Number).appendField(Blockly.MAKER17_OLED_CENTER_CIRCLE_X).setCheck(Number);
    this.appendValueInput("D0_Y", Number).appendField(Blockly.MAKER17_OLED_CENTER_CIRCLE_Y).setCheck(Number);
    this.appendValueInput("RADIUS", Number).appendField(Blockly.MAKER17_OLED_CIRCLE_RADIUS).setCheck(Number);
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown(MAKER17_CIRCLEOPTELECT), "OPT");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("x(0~127),y(0~63)");
  }
};

//显示-OLED-画椭圆（空心，实心）
Blockly.Blocks.maker17_oled_drawEllipse = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/oled.png",  Blockly.Blocks.maker17.ICON_WIDTH,  Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_OLED_DRAW_ELLIPSE);
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown(MAKER17_ELLIPSESELECT), "TYPE");
    this.appendValueInput("D0_X", Number).appendField(Blockly.MAKER17_OLED_CENTER_CIRCLE_X).setCheck(Number);
    this.appendValueInput("D0_Y", Number).appendField(Blockly.MAKER17_OLED_CENTER_CIRCLE_Y).setCheck(Number);
    this.appendValueInput("RADIUS_X", Number).appendField(Blockly.MAKER17_OLED_ELLIPSE_RADIUS_X).setCheck(Number);
    this.appendValueInput("RADIUS_Y", Number).appendField(Blockly.MAKER17_OLED_ELLIPSE_RADIUS_Y).setCheck(Number);
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown(MAKER17_CIRCLEOPTELECT), "OPT");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MAKER17_OLED_DRAW_ELLIPSE_TOOLTIP);
  }
};

//显示-OLED-显示字符串
Blockly.Blocks.maker17_oled_drawStr = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/oled.png",  Blockly.Blocks.maker17.ICON_WIDTH,  Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_OLED_DRAWSTR);
    this.appendValueInput("POS_X", Number).appendField(Blockly.MAKER17_OLED_START_X).setCheck(Number);
    this.appendValueInput("POS_Y", Number).appendField(Blockly.MAKER17_OLED_START_Y).setCheck(Number);
    this.appendValueInput("TEXT", String).appendField(Blockly.MAKER17_OLED_STRING).setCheck([Number, String]);
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown(MAKER17_STR_SELECT), "RAD");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("x(0~127),y(0~63)");
  }
};

//显示-OLED-设置字体
Blockly.Blocks.maker17_oled_setFont = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/oled.png", Blockly.Blocks.maker17.ICON_WIDTH,  Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_OLED_SET_FONT);
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown(MAKER17_FONT_TYPE_SELECT), "TYPE");
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown(MAKER17_FONT_STYLE_SELECT), "STYLE");
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown(MAKER17_FONT_SIZE_SELECT), "SIZE");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MAKER17_oled_setFont_tooltip);
  }
};

//显示-OLED-显示字符串
Blockly.Blocks.maker17_oled_print = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/oled.png",  Blockly.Blocks.maker17.ICON_WIDTH,  Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_OLED_PRINT_VAR);
    this.appendValueInput("POS_X", Number).appendField(Blockly.MAKER17_OLED_START_X).setCheck(Number);
    this.appendValueInput("POS_Y", Number).appendField(Blockly.MAKER17_OLED_START_Y).setCheck(Number);
    this.appendValueInput("TEXT", String).appendField(Blockly.MAKER17_OLED_STRING).setCheck([Number, String]);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MAKER17_oled_print_tooltip);
  }
};

//显示-OLED-显示多行文本
Blockly.Blocks.maker17_oled_draw4Str = {
  init: function() {
    this.appendDummyInput().appendField(new Blockly.FieldImage("../../media/maker17/oled.png",  Blockly.Blocks.maker17.ICON_WIDTH,  Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_oled_draw4Str);
    this.appendDummyInput().appendField(Blockly.MAKER17_OLED_PRINT);
    this.appendValueInput("Text_line1", 'String').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MAKER17_OLED_LINE1);
    this.appendValueInput("Text_line2", 'String').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MAKER17_OLED_LINE2);
    this.appendValueInput("Text_line3", 'String').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MAKER17_OLED_LINE3);
    this.appendValueInput("Text_line4", 'String').setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MAKER17_OLED_LINE4);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};



//时间-DS1307获取时间变量
var MAKER17_DS1307_TIME_TYPE = [
  ["年", "Year"],
  ["月", "Month"],
  ["日", "Day"],
  ["时", "Hour"],
  ["分", "Minute"],
  ["秒", "Second"],
  ["星期", "dayOfWeek"]
];

//时间-DS1307开始获取时间
Blockly.Blocks.DS1307_start_get_time = {
  init: function() {
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/RTC.png", Blockly.Blocks.maker17.ICON_WIDTH , Blockly.Blocks.maker17.ICON_HEIGHT));
    this.appendDummyInput("").appendField("开始获取时间");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.setTooltip(Blockly.MAKER17_IIC);
    this.setHelpUrl('');
  }
};
//时间-DS1307获取时间
Blockly.Blocks.DS1307_get_time = {
  init: function() {
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/RTC.png",  Blockly.Blocks.maker17.ICON_WIDTH , Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_DS1307_GET_TIME);
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown(MAKER17_DS1307_TIME_TYPE), "TIME_TYPE");
    this.setInputsInline(true);
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.setTooltip(Blockly.MAKER17_IIC);
    this.setHelpUrl('');
    this.setOutput(true, Number);
  }
};

//时间-DS1307设置时间
Blockly.Blocks.DS1307_set_time = {
  init: function() {
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/RTC.png", Blockly.Blocks.maker17.ICON_WIDTH , Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_DS1307_SET_TIME);
    this.setInputsInline(true);
    this.appendValueInput("hour").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput("").appendField(Blockly.MAKER17_HOUR);
    this.appendValueInput("minute").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput("").appendField(Blockly.MAKER17_MINUTE);
    this.appendValueInput("second").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput("").appendField(Blockly.MAKER17_SECOND);
    this.setOutput(false, Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.setTooltip(Blockly.MAKER17_IIC);
    this.setHelpUrl('');
  }
};

//时间-DS1307设置日期
Blockly.Blocks.DS1307_set_date = {
  init: function() {
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/RTC.png",  Blockly.Blocks.maker17.ICON_WIDTH , Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_DS1307_SET_DATE);
    this.setInputsInline(true);
    this.appendValueInput("year").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput("").appendField(Blockly.MAKER17_YEAR);
    this.appendValueInput("month").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput("").appendField(Blockly.MAKER17_MONTH);
    this.appendValueInput("day").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput("").appendField(Blockly.MAKER17_DAY);
    this.setOutput(false, Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.setTooltip(Blockly.MAKER17_IIC);
    this.setHelpUrl('');
  }
};

//时间-DS1307设置时间
Blockly.Blocks.title1 = {
  init: function() {
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/title1.png", Blockly.Blocks.maker17.ICON_WIDTH , Blockly.Blocks.maker17.ICON_HEIGHT));
    this.setInputsInline(true);
    this.appendValueInput("year").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
    this.setOutput(true, Number);
    this.appendValueInput('NUM').setCheck(Number);
    // this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.setTooltip(Blockly.MAKER17_IIC);
    this.setHelpUrl('');
  }
};

Blockly.Blocks['math_trig1'] = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE);
    this.setOutput(true, Number);
    this.appendValueInput('year').setCheck(Number).appendField("1");
  }
};

////////////////////////////////
//时间-DS3231获取时间变量
var MAKER17_DS3231_TIME_TYPE = [
  ["年", "year"],
  ["月", "month"],
  ["日", "date"],
  ["时", "hour"],
  ["分", "minute"],
  ["秒", "second"],
  ["星期", "dayOfWeek"]
];

//时间-DS3231获取时间
Blockly.Blocks.DS3231_get_time = {
  init: function() {
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/RTC.png",  Blockly.Blocks.maker17.ICON_WIDTH , Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_DS3231_GET_TIME);
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown(MAKER17_DS3231_TIME_TYPE), "TIME_TYPE");
    this.setInputsInline(true);
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.setTooltip(Blockly.MAKER17_IIC);
    this.setHelpUrl('');
    this.setOutput(true, Number);
  }
};
//时间-DS3231设置日期时间
Blockly.Blocks.DS3231_set_datetime = {
  init: function() {
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/maker17/RTC.png",  Blockly.Blocks.maker17.ICON_WIDTH , Blockly.Blocks.maker17.ICON_HEIGHT)).appendField(Blockly.MAKER17_DS3231_SET_TIME);
    this.setInputsInline(true);
    this.appendValueInput("year").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput("").appendField(Blockly.MAKER17_YEAR);
    this.appendValueInput("month").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput("").appendField(Blockly.MAKER17_MONTH);
    this.appendValueInput("day").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput("").appendField(Blockly.MAKER17_DAY);
    this.appendDummyInput("").appendField(Blockly.MAKER17_DAY_OF_WEEK);
    this.appendValueInput("dayOfWeek").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);    
    this.appendDummyInput("").appendField("  ");
    this.appendValueInput("hour").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput("").appendField(Blockly.MAKER17_HOUR);
    this.appendValueInput("minute").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput("").appendField(Blockly.MAKER17_MINUTE);
    this.appendValueInput("second").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput("").appendField(Blockly.MAKER17_SECOND);
    this.setOutput(false, Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.maker17.HUE3);
    this.setTooltip(Blockly.MAKER17_IIC);
    this.setHelpUrl('');
  }
};

//显示-OLED-新建页面
Blockly.Blocks.maker17_page = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE3);
    //this.appendDummyInput().appendField("第一单元");
    this.appendStatementInput('DO').appendField('');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['text1'] = {
  init: function() {
    //this.setHelpUrl(Blockly.Msg.TEXT_TEXT_HELPURL);
    this.setColour(Blockly.Blocks.texts.HUE);
    this.appendDummyInput().appendField(this.newQuote_(true)).appendField(new Blockly.FieldTextInput(''), 'TEXT').appendField(this.newQuote_(false));
    // this.setOutput(true, String);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.TEXT_TEXT_TOOLTIP);
  },
  newQuote_: function(open) {
    if (open == this.RTL) {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==';
    } else {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC';
    }
    return new Blockly.FieldImage(file, 12, 12, '"');
  }
};

//MP3
Blockly.Blocks.maker17_MP3_VOL = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE2);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/Maker17/MP3.png", 32, 32)).appendField(Blockly.MAKER17_MP3);
    this.appendValueInput("PIN").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MIXLY_PIN);
    this.appendValueInput('VOLUME', Number).setCheck(Number).appendField(Blockly.MAKER17_MP3_VOL);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.maker17_MP3_PLAY = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE2);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/Maker17/MP3.png", 32, 32)).appendField(Blockly.MAKER17_MP3);
    this.appendValueInput("PIN").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MIXLY_PIN);
    this.appendValueInput('NUM', Number).setCheck(Number).appendField(Blockly.MAKER17_MP3_PLAY);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.maker17_MP3_STATE = {
  init: function() {
    this.setColour(Blockly.Blocks.maker17.HUE2);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/Maker17/MP3.png", 32, 32)).appendField(Blockly.MAKER17_MP3).appendField(Blockly.MAKER17_MP3_STATE);
    this.appendValueInput("PIN").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MIXLY_PIN);
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown([
      [Blockly.MAKER17_MP3_ONPLAY, "play()"],
      [Blockly.MAKER17_MP3_LOOPPLAY, "loop_play()"],
      [Blockly.MAKER17_MP3_RANDPLAY, "random_play()"],
      [Blockly.MAKER17_MP3_PAUSE, "pause()"],
      [Blockly.MAKER17_MP3_STOP, "stop()"]
    ]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

