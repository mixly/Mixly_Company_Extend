'use strict';
goog.provide('Blockly.Blocks.ArduBits');
goog.require('Blockly.Blocks');
Blockly.Blocks.ArduBits.HUE = 0; //红色
Blockly.Blocks.ArduBits.HUE0 = 0; //红色
Blockly.Blocks.ArduBits.HUE1 = 40; //黄色
Blockly.Blocks.ArduBits.HUE2 = 120; //绿色
Blockly.Blocks.ArduBits.HUE3 = 180; //青色
Blockly.Blocks.ArduBits.HUE4 = 240; //蓝色
Blockly.Blocks.ArduBits.HUE5 = 300; //紫色

//----------------------------------------------------
////----------------------------------------------------
/////----------------------------------------------------

//遥控器_蓝牙遥控器_方向行程
Blockly.Blocks.ArduBits_BTYK_FXDS = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE2);
    this.appendDummyInput("").appendField("蓝牙遥控器").appendField(new Blockly.FieldImage("../../media/ArduBits/B01.png", 32, 32)); 
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("TX#");
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("RX#");
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(" 移动行程");
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip("ArduBits_B_01_蓝牙遥控器(需配蓝牙数传从设置使用,摇杆拨动方位，四个方位行程范围0-255)");
    this.setHelpUrl('www.ardubits.com');
  }
};

//遥控器_蓝牙遥控器_方向布尔
var ArduBits_BTYK_FXZ = [
  ["前", "w"],
  ["后", "s"],
  ["左", "a"],
  ["右", "d"],
  ["中", "t"]
];

//遥控器_蓝牙遥控器_方向布尔
Blockly.Blocks.ArduBits_BTYK_FX = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE2);
    this.appendDummyInput("").appendField("蓝牙遥控器").appendField(new Blockly.FieldImage("../../media/ArduBits/B01.png", 32, 32)); 
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("TX#");
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("RX#");
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(" 摇杆").appendField(new Blockly.FieldDropdown(ArduBits_BTYK_FXZ), "BTYK_FXZ");
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(" 移动？");
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip("ArduBits_B_01_蓝牙遥控器(需配蓝牙数传从设置使用,摇杆拨动方位，四个方位及中间停止)");
    this.setHelpUrl('www.ardubits.com');
  }
};

//遥控器_蓝牙遥控器_按键数值
var ArduBits_BTYK_BUT = [
  ["A", "A"],
  ["B", "B"],
  ["C", "C"],
  ["D", "D"],
  ["E", "E"],
  ["F", "F"]
];

//遥控器_蓝牙遥控器_按键数值
Blockly.Blocks.ArduBits_BTYK_Button = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE2);
    this.appendDummyInput("").appendField("蓝牙遥控器").appendField(new Blockly.FieldImage("../../media/ArduBits/B01.png", 32, 32)); 
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("TX#");
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("RX#");
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(" 按键").appendField(new Blockly.FieldDropdown(ArduBits_BTYK_BUT), "BTYK_BUT");
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(" 按下？");
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip("ArduBits_B_01_蓝牙遥控器(需配蓝牙数传从设置使用,按下为真,松开为假)");
    this.setHelpUrl('www.ardubits.com');
  }
};

//遥控器_蓝牙遥控器_配对密码
var ArduBits_BTYK_NUM = [
  ["A", "0"],
  ["B", "1"],
  ["C", "2"],
  ["D", "3"]
];

//遥控器_蓝牙遥控器_配对密码
Blockly.Blocks.ArduBits_BTYK_PIN = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE2);
    this.appendDummyInput("").appendField("蓝牙遥控器").appendField(new Blockly.FieldImage("../../media/ArduBits/B01.png", 32, 32)); 
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("TX#");
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("RX#");
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(" 设配对码").appendField(new Blockly.FieldDropdown(ArduBits_BTYK_NUM), "BTYK_NUM1").appendField(new Blockly.FieldDropdown(ArduBits_BTYK_NUM), "BTYK_NUM2").appendField(new Blockly.FieldDropdown(ArduBits_BTYK_NUM), "BTYK_NUM3").appendField(new Blockly.FieldDropdown(ArduBits_BTYK_NUM), "BTYK_NUM4");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip("ArduBits_B_01_蓝牙遥控器(需配蓝牙数传从设置使用,配对码一定要主从一致及波特率一定38400)");
    this.setHelpUrl('www.ardubits.com');
  }
};

//辅块器_蓝牙数传主_接收数据
var ArduBits_BTMaster_RXNUM = [
  ["接收码", "Master_RX_Schar"],
  ["接收数", "Master_RX_Snum"]
];

//辅块器_蓝牙数传从_接收数据
Blockly.Blocks.ArduBits_BTMaster_RX = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE2);
    this.appendDummyInput("").appendField("蓝牙数传主").appendField(new Blockly.FieldImage("../../media/ArduBits/KW5.png", 32, 32)); 
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("TX#");
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("RX#");
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(" 获取").appendField(new Blockly.FieldDropdown(ArduBits_BTMaster_RXNUM), "BTMaster_RXNUM");
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip("ArduBits_逐日_K_W5_蓝牙数传主");
    this.setHelpUrl('www.ardubits.com');
  }
};

//辅块器_蓝牙数传主_发射数据
Blockly.Blocks.ArduBits_BTMaster_TX = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE2);
    this.appendDummyInput("").appendField("蓝牙数传主").appendField(new Blockly.FieldImage("../../media/ArduBits/KW5.png", 32, 32)); 
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("TX#");
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("RX#");
    this.appendValueInput("TEXT", String).setCheck([Number, String]).setAlign(Blockly.ALIGN_RIGHT).appendField(" 发射码");
    this.appendValueInput('NUM').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(" 发射数"); 
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip("ArduBits_逐日_K_W5_蓝牙数传主");
    this.setHelpUrl('www.ardubits.com');
  }
};

//辅块器_蓝牙数传主_波特率为
Blockly.Blocks.ArduBits_BTMaster_BAUD = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE2);
    this.appendDummyInput("").appendField("蓝牙数传主").appendField(new Blockly.FieldImage("../../media/ArduBits/KW5.png", 32, 32)); 
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("TX#");
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("RX#");
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(" 波特率").appendField(new Blockly.FieldDropdown(ArduBits_BTSlave_BAUDA), "BTSlave_BAUDA");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip("ArduBits_逐日_K_W5_蓝牙数传主");
    this.setHelpUrl('www.ardubits.com');
  }
};

//辅块器_蓝牙数传主_蓝牙设置
var ArduBits_BTMaster_SETNUM = [
  ["主机", "AT+ROLE=M"],
  ["从机", "AT+ROLE=S"]
];

//辅块器_蓝牙数传主_蓝牙设置
Blockly.Blocks.ArduBits_BTMaster_SET = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE2);
    this.appendDummyInput("").appendField("蓝牙数传主").appendField(new Blockly.FieldImage("../../media/ArduBits/KW5.png", 32, 32)); 
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("TX#");
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("RX#");
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(" 设蓝牙为").appendField(new Blockly.FieldDropdown(ArduBits_BTMaster_SETNUM), "BTMaster_SETNUM");
    this.appendValueInput("TEXT", String).setCheck([Number, String]).setAlign(Blockly.ALIGN_RIGHT).appendField(" 设蓝牙名");
    this.appendValueInput('PIN').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(" 设配对码"); 
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(" 设波特率").appendField(new Blockly.FieldDropdown(ArduBits_BTSlave_BAUD), "BTMaster_BAUD");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip("ArduBits_逐日_K_W5_蓝牙数传主");
    this.setHelpUrl('www.ardubits.com');
  }
};

//辅块器_蓝牙数传从_蓝牙设置
var ArduBits_BTSlave_BAUDA = [
  ["38400", "38400"],
  ["1200", "1200"],
  ["2400", "2400"],
  ["4800", "4800"],
  ["9600", "9600"],
  ["19200", "19200"],
  ["38400", "38400"],
  ["57600", "57600"],
  ["115200", "115200"],
  ["230400", "230400"],
  ["460800", "460800"]
];

//辅块器_蓝牙数传从_波特率为
Blockly.Blocks.ArduBits_BTSlave_BAUD = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE2);
    this.appendDummyInput("").appendField("蓝牙数传从").appendField(new Blockly.FieldImage("../../media/ArduBits/KW4.png", 32, 32)); 
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("TX#");
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("RX#");
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(" 波特率").appendField(new Blockly.FieldDropdown(ArduBits_BTSlave_BAUDA), "BTSlave_BAUDA");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip("ArduBits_逐日_K_W4_蓝牙数传从");
    this.setHelpUrl('www.ardubits.com');
  }
};

//辅块器_蓝牙数传从_接收数据
var ArduBits_BTSlave_RXNUM = [
  ["接收码", "Slave_RX_Schar"],
  ["接收数", "Slave_RX_Snum"]
];

//辅块器_蓝牙数传从_接收数据
Blockly.Blocks.ArduBits_BTSlave_RX = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE2);
    this.appendDummyInput("").appendField("蓝牙数传从").appendField(new Blockly.FieldImage("../../media/ArduBits/KW4.png", 32, 32)); 
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("TX#");
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("RX#");
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(" 获取").appendField(new Blockly.FieldDropdown(ArduBits_BTSlave_RXNUM), "BTSlave_RXNUM");
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip("ArduBits_逐日_K_W4_蓝牙数传从");
    this.setHelpUrl('www.ardubits.com');
  }
};

//辅块器_蓝牙数传从_发射数据
Blockly.Blocks.ArduBits_BTSlave_TX = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE2);
    this.appendDummyInput("").appendField("蓝牙数传从").appendField(new Blockly.FieldImage("../../media/ArduBits/KW4.png", 32, 32)); 
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("TX#");
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("RX#");
    this.appendValueInput("TEXT", String).setCheck([Number, String]).setAlign(Blockly.ALIGN_RIGHT).appendField(" 发射码");
    this.appendValueInput('NUM').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(" 发射数"); 
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip("ArduBits_逐日_K_W4_蓝牙数传从");
    this.setHelpUrl('www.ardubits.com');
  }
};

//辅块器_蓝牙数传从_蓝牙设置
var ArduBits_BTSlave_BAUD = [
  ["38400", "6"],
  ["1200", "1"],
  ["2400", "2"],
  ["4800", "3"],
  ["9600", "4"],
  ["19200", "5"],
  ["38400", "6"],
  ["57600", "7"],
  ["115200", "8"],
  ["230400", "9"],
  ["460800", "A"]
];
//辅块器_蓝牙数传从_蓝牙设置
Blockly.Blocks.ArduBits_BTSlave_Name = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE2);
    this.appendDummyInput("").appendField("蓝牙数传从").appendField(new Blockly.FieldImage("../../media/ArduBits/KW4.png", 32, 32)); 
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("TX#");
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("RX#");
    this.appendValueInput("TEXT", String).setCheck([Number, String]).setAlign(Blockly.ALIGN_RIGHT).appendField(" 设蓝牙名");
    this.appendValueInput('PIN').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(" 设配对码"); 
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(" 设波特率").appendField(new Blockly.FieldDropdown(ArduBits_BTSlave_BAUD), "BTSlave_BAUD");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip("ArduBits_逐日_K_W4_蓝牙数传从");
    this.setHelpUrl('www.ardubits.com');
  }
};

//传感器_超声波测距_获取距离
Blockly.Blocks.ArduBits_SR04_Distance = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE1);
    this.appendDummyInput("").appendField("超声波测距").appendField(new Blockly.FieldImage("../../media/ArduBits/KI9.png", 32, 32));
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("Trig#");
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("Echo#");
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(" 获取距离(cm)");
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip("ArduBits_逐日_K-I14_实时时钟块");
    this.setHelpUrl('www.ardubits.com');
  }
};

//传感器_温湿度传感_获取温湿
var ArduBits_DHT11_TPNUM = [
  ["温度/℃", "readTemperature"],
  ["湿度/%", "readHumidity"]
];

//传感器_温湿度传感_获取温湿
Blockly.Blocks.ArduBits_DHT11_TP = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE1);
    this.appendDummyInput("").appendField("温湿度传感").appendField(new Blockly.FieldImage("../../media/ArduBits/KI7.png", 32, 32));
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("DTA#");
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(" 获取").appendField(new Blockly.FieldDropdown(ArduBits_DHT11_TPNUM), "DHT11_TPNUM");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip("ArduBits_逐日_K-I7_温湿度传感(温度为摄氏度,湿度为相对湿度)");
    this.setHelpUrl('www.ardubits.com');
  }
};

//执行器_四位数码管_操作选择
var ArduBits_TM1650_OnOff = [
  ["亮", "true"],
  ["灭", "false"]
];

//执行器_四位数码管_操作选择
var ArduBits_TM1650_DOTNUM = [
  ["1", "0"],
  ["2", "1"],
  ["3", "2"],
  ["4", "3"]
];

//执行器_四位数码管_操作清除
Blockly.Blocks.ArduBits_TM1650_DOT = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE4);
    this.appendDummyInput("").appendField("四位数码管").appendField(new Blockly.FieldImage("../../media/ArduBits/KO8.png", 32, 32));
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("SDA#");
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("SCL#");
    this.appendDummyInput("").appendField(" 小数点位").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown(ArduBits_TM1650_DOTNUM), "TM1650_DOTNUM");
    this.appendDummyInput("").appendField(" 设为").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown(ArduBits_TM1650_OnOff), "TM1650_OnOff");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip("ArduBits_逐日_K_O8_四位数码管");
    this.setHelpUrl('www.ardubits.com');
  }
};

//执行器_四位数码管_字符显示
Blockly.Blocks.ArduBits_TM1650_Display = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE4);
    this.appendDummyInput("").appendField("四位数码管").appendField(new Blockly.FieldImage("../../media/ArduBits/KO8.png", 32, 32)); 
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("SDA#");
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("SCL#");
    this.appendValueInput("TEXT", String).setCheck([Number, String]).setAlign(Blockly.ALIGN_RIGHT).appendField(" 显示");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip("ArduBits_逐日_K_O8_四位数码管");
    this.setHelpUrl('www.ardubits.com');
  }
};

//执行器_四位数码管_操作选择
var ArduBits_TM1650_NUM = [
  ["清屏", "clear"],
  ["打开", "displayOn"],
  ["关闭", "displayOff"]
];

//执行器_四位数码管_操作清除
Blockly.Blocks.ArduBits_TM1650_CLEAR = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE4);
    this.appendDummyInput("").appendField("四位数码管").appendField(new Blockly.FieldImage("../../media/ArduBits/KO8.png", 32, 32));
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("SDA#");
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("SCL#");
    this.appendDummyInput("").appendField(" 显示").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown(ArduBits_TM1650_NUM), "TM1650_TYPE");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("ArduBits_逐日_K_O8_四位数码管");
    this.setHelpUrl('www.ardubits.com');
  }
};
//////////////////////////////////

var ArduBits_OLED_DisplayNUM = [
  ["正显", "WHITE,BLACK"],
  ["反显", "BLACK,WHITE"]
];

//执行器_液晶显示器_多行显示
Blockly.Blocks.ArduBits_OLED_Display = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE4);
    this.appendDummyInput("").appendField("液晶显示器(IIC)").appendField(new Blockly.FieldImage("../../media/ArduBits/KO4.png", 32, 32));
    this.appendValueInput('MNUM').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(" 字号"); 
    this.appendValueInput('TEXT1','String').setAlign(Blockly.ALIGN_RIGHT).appendField(" 第一行");
    this.appendValueInput('TEXT2','String').setAlign(Blockly.ALIGN_RIGHT).appendField(" 第二行");
    this.appendValueInput('TEXT3','String').setAlign(Blockly.ALIGN_RIGHT).appendField(" 第三行");
    this.appendValueInput('TEXT4','String').setAlign(Blockly.ALIGN_RIGHT).appendField(" 第四行");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("ArduBits_逐日_K-O4_液晶显示器(IIC接口,显示字符及变量)");
    this.setHelpUrl('www.ardubits.com');
  }
};

//执行器_液晶显示器_中文字符
Blockly.Blocks.ArduBits_OLED_showBitmap = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE4);
    this.appendDummyInput("").appendField("液晶显示器(IIC)").appendField(new Blockly.FieldImage("../../media/ArduBits/KO4.png", 32, 32));
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(" 字模").appendField(new Blockly.FieldTextInput('bitmap1'), 'VAR');
    this.appendValueInput("WIDTH").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(" 模宽"); 
    this.appendValueInput("HEIGHT").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(" 模高");
    this.appendValueInput("XVALUE").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(" X起");
    this.appendValueInput("YVALUE").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(" Y起");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("ArduBits_逐日_K-O4_液晶显示器(IIC接口,显示取模数据,X轴:字模左上起点位置,范围1-128,Y轴:字模左上起点位置,范围1-64)");
    this.setHelpUrl('www.ardubits.com');
  }
};


//执行器_液晶显示器_数组数据
Blockly.Blocks.ArduBits_OLED_Bitmap = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE4);
    this.appendDummyInput("").appendField("液晶显示器(IIC)").appendField(new Blockly.FieldImage("../../media/ArduBits/KO4.png", 32, 32));
    this.appendDummyInput("").appendField("字模名称").appendField(new Blockly.FieldTextInput('bitmap1'), 'VAR');
    this.appendDummyInput("").appendField("字模数据").appendField(new Blockly.FieldTextInput('0x00,0x00,0x00,0x00,0x07,0xC0,0x0E,0x19,0xCE,0x1F,0xFF,0xFE,0x1F,0x19,0xCE,0x3F, 0xFF,0xFF,0x3F,0xDD,0xCE,0x30,0x0C,0x07,0x7F,0xDF,0xFC,0x30,0x0C,0x07,0x66,0xCF, 0xFC,0x3F,0xFF,0xFF,0x7F,0xDF,0xFC,0x3F,0xFF,0xFF,0x7F,0xDF,0xFC,0x30,0x0C,0x07, 0x7F,0x9F,0xFE,0x38,0x0F,0x1F,0x7F,0x1F,0xFE,0x3F,0xFF,0xFE,0x7F,0xDF,0xFE,0x1F, 0xFF,0xFC,0x7B,0xDF,0xFC,0x00,0xE3,0xDC,0x78,0xDF,0xF8,0x1F,0xE1,0xFE,0x67,0xDE, 0xFC,0x3F,0xC0,0xFF,0x6F,0xDE,0xFE,0x38,0x61,0x87,0x6F,0x9F,0x7E,0x30,0x63,0x87, 0x6C,0x1B,0xFE,0x30,0x63,0x87,0x6E,0x19,0xFC,0x30,0x61,0x87,0x6F,0x1B,0xF8,0x3F, 0xE1,0xFF,0x67,0x9B,0xC0,0x1F,0xE1,0xFE,0x63,0x99,0xF8,0x0F,0xE1,0xF8,0x61,0xD8, 0xFE,0x00,0x7F,0xFF,0x60,0xF8,0x1E,0x00,0x3F,0xFF,0x60,0x58,0x00,0x00,0x1F,0xFC, 0x20,0x1F,0xE0,0x00,0x00,0x00,0x70,0x1F,0xFC,0x30,0x0C,0x07,0x70,0x1F,0xFC,0x30, 0x0C,0x07,0x70,0x01,0x8C,0x30,0x0C,0x07,0x70,0x01,0x8C,0x3F,0xFF,0xFF,0x3F,0xEF, 0xFC,0x1F,0xFF,0xFE,0x3F,0xFF,0xFC,0x1F,0xFF,0xFE,0x3E,0x1F,0xE0,0x3F,0xFF,0xFF, 0x38,0x18,0x00,0x3F,0xFF,0xFF,0x38,0x1C,0x00,0x3F,0xFF,0xFF,0x38,0x1F,0xF8,0x3F, 0xFF,0xFF,0x38,0x0F,0xFC,0x0F,0xE1,0xFC,0x38,0x00,0x1E,0x1F,0xE1,0xFE,0x38,0x00, 0x0E,0x3F,0xCC,0xFF,0x38,0x00,0x0C,0x30,0x0C,0x07,0x3F,0xF8,0x1C,0x3F,0xED,0xF7, 0x3F,0xF8,0x1C,0x3F,0xED,0xF6,0x70,0x00,0x1C,0x18,0x4C,0x06,0x70,0x00,0x1C,0x18, 0x0C,0x06,0x70,0x00,0x1C,0x1F,0xED,0xFE,0x70,0x00,0x1C,0x1F,0xED,0xFE,0x70,0x00, 0x1C,0x38,0x0C,0x06,0x7F,0xF8,0x0C,0x38,0x0C,0x07,0x3F,0xF8,0x0C,0x30,0x0C,0x03'), 'TEXT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip("ArduBits_逐日_K-O4_液晶显示器(IIC接口,存储取模数组数据,注意逐行、顺向取模及对应取模高度宽度)");
    this.setHelpUrl('www.ardubits.com');
  }
};

//执行器_液晶显示器_画点变量
var ArduBits_OLED_NUM = [
  ["亮", "WHITE"],
  ["灭", "BLACK"]
];

//执行器_液晶显示器_画点显示
Blockly.Blocks.ArduBits_OLED_POS = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE4);
    this.appendDummyInput("").appendField("液晶显示器(IIC)").appendField(new Blockly.FieldImage("../../media/ArduBits/KO4.png", 32, 32));
    this.appendValueInput('XVALUE').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(" X轴");
    this.appendValueInput('YVALUE').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(" Y轴");
    this.appendDummyInput("").appendField(" 单点设为").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown(ArduBits_OLED_NUM), "OLED_TYPE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("ArduBits_逐日_K-O4_液晶显示器(IIC接口,单点操作,X轴范围:1-128,Y轴范围:1-64)");
    this.setHelpUrl('www.ardubits.com');
  }
};

//执行器_液晶显示器_操作变量
var ArduBits_OLED_DISNUM = [
  ["清屏", "clearDisplay"],
  ["信息", "display"]
];

//执行器_液晶显示器_显示操作
Blockly.Blocks.ArduBits_OLED_Clear = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE4);
    this.appendDummyInput("").appendField("液晶显示器(IIC)").appendField(new Blockly.FieldImage("../../media/ArduBits/KO4.png", 32, 32));
    this.appendDummyInput("").appendField(" 显示").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown(ArduBits_OLED_DISNUM), "OLED_DISNUM");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip("ArduBits_逐日_K-O4_液晶显示器(IIC接口,清屏刷新)");
    this.setHelpUrl('www.ardubits.com');
  }
};

//执行器_液晶显示器_显示字符
Blockly.Blocks.ArduBits_OLED_Print = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE4);
    this.appendDummyInput("").appendField("液晶显示器(IIC)").appendField(new Blockly.FieldImage("../../media/ArduBits/KO4.png", 32, 32));
    this.appendDummyInput("").appendField(" 显示").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown(ArduBits_OLED_DisplayNUM), "OLED_DisplayNUM");
    this.appendValueInput('MNUM').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(" 字号");
    this.appendValueInput("TEXT", String).setCheck([Number, String]).setAlign(Blockly.ALIGN_RIGHT).appendField(" 显示");
    this.appendValueInput('XVALUE').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(" X起");
    this.appendValueInput('YVALUE').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(" Y起");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("ArduBits_逐日_K-O4_液晶显示器(IIC接口,显示字符及变量,X轴:字符左上起点位置,范围1-128,Y轴:字符左上起点位置,范围1-64)");
    this.setHelpUrl('www.ardubits.com');
  }
};

//传感器-重力感应块-获取数据
var ArduBits_ADXL345_GETAB = [
  ["X轴角度", "a"],
  ["Y轴角度", "b"]
];

var ArduBits_ADXL345_PIN1 = [
  ["A4", "A4"]
];

var ArduBits_ADXL345_PIN2 = [
  ["A5", "A5"]
];


//传感器-重力感应块-获取数据
Blockly.Blocks.ArduBits_ADXL345 = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE1);
    this.appendDummyInput("").appendField("重力感应块").appendField(new Blockly.FieldImage("../../media/ArduBits/KI15.png", 32, 32));
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField("SDA#").appendField(new Blockly.FieldDropdown(ArduBits_ADXL345_PIN1), "ADXL345_PIN1");
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField("SCL#").appendField(new Blockly.FieldDropdown(ArduBits_ADXL345_PIN2), "ADXL345_PIN2");
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(" 获取角度").appendField(new Blockly.FieldDropdown(ArduBits_ADXL345_GETAB), "ADXL345_PIN");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip("ArduBits_逐日_K-I15_重力感应块(获取重力角度,X、Y轴范围:-180°~+180°)");
    this.setHelpUrl('www.ardubits.com');
  }
};

//执行器_全彩彩灯块_颜色表选
Blockly.Blocks.ArduBits_RGB2 = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE4);
    this.appendDummyInput("").appendField("全彩彩灯块").appendField(new Blockly.FieldImage("../../media/ArduBits/KO11.png", 32, 32));
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("DAT#");
    this.appendValueInput("_LED_").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(" 灯号");
    this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT).appendField(" 色卡").appendField(new Blockly.FieldColour("#ff0000"), "RGB_LED_color");
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(" 颜色表选");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("ArduBits_逐日_K_O11_全彩彩灯块(全彩灯灯号范围1-4,RGB取值颜色分配");
    this.setHelpUrl('www.ardubits.com');
  }
};

//执行器_全彩彩灯块_颜色数选
Blockly.Blocks.ArduBits_RGB = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE4);
    this.appendDummyInput("").appendField("全彩彩灯块").appendField(new Blockly.FieldImage("../../media/ArduBits/KO11.png", 32, 32));
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("DAT#");
    this.appendValueInput('_LED_').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(" 灯号");
    this.appendValueInput("RVALUE").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(" R值");
    this.appendValueInput("GVALUE").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(" G值");
    this.appendValueInput("BVALUE").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(" B值");
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField("颜色设值");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("ArduBits_逐日_K_O11_全彩彩灯块(全彩灯灯号范围1-4,RGB取值范围0-255)");
    this.setHelpUrl('www.ardubits.com');
  }
};

//传感器_ID射频读卡_获取数据
Blockly.Blocks.ArduBits_RFID = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE1);
    this.appendDummyInput("").appendField("ID射频读卡").appendField(new Blockly.FieldImage("../../media/ArduBits/KI16.png", 32, 32));
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("TX#");
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("RX#");
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField("获取卡号");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip("ArduBits_逐日_K-I16_ID射频读卡(卡序列号为无符号长整型)");
    this.setHelpUrl('www.ardubits.com');
  }
};

//执行器_点阵屏显示_显示图案
Blockly.Blocks.ArduBits_Matrix_DisplayChar = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE4);
    this.appendDummyInput("").appendField("点阵屏显示").appendField(new Blockly.FieldImage("../../media/ArduBits/KO9.png", 32, 32));
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("SDA#");
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("SCL#"); 
    this.appendValueInput("Chars").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(" 图案数组");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("ArduBits_逐日_K_O9_点阵屏显示(图案数组勾选设置显示)");
    this.setHelpUrl('www.ardubits.com');
  }
};

//执行器_点阵屏显示_图案数组
Blockly.Blocks.ArduBits_Matrix_LedArray = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE4);
    this.appendDummyInput("").appendField("数组变量").appendField(new Blockly.FieldTextInput("LedArray1"), "VAR");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a81").appendField(new Blockly.FieldCheckbox("FALSE"), "a82").appendField(new Blockly.FieldCheckbox("FALSE"), "a83").appendField(new Blockly.FieldCheckbox("FALSE"), "a84").appendField(new Blockly.FieldCheckbox("FALSE"), "a85").appendField(new Blockly.FieldCheckbox("FALSE"), "a86").appendField(new Blockly.FieldCheckbox("FALSE"), "a87").appendField(new Blockly.FieldCheckbox("FALSE"), "a88");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a71").appendField(new Blockly.FieldCheckbox("FALSE"), "a72").appendField(new Blockly.FieldCheckbox("FALSE"), "a73").appendField(new Blockly.FieldCheckbox("FALSE"), "a74").appendField(new Blockly.FieldCheckbox("FALSE"), "a75").appendField(new Blockly.FieldCheckbox("FALSE"), "a76").appendField(new Blockly.FieldCheckbox("FALSE"), "a77").appendField(new Blockly.FieldCheckbox("FALSE"), "a78");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a61").appendField(new Blockly.FieldCheckbox("FALSE"), "a62").appendField(new Blockly.FieldCheckbox("FALSE"), "a63").appendField(new Blockly.FieldCheckbox("FALSE"), "a64").appendField(new Blockly.FieldCheckbox("FALSE"), "a65").appendField(new Blockly.FieldCheckbox("FALSE"), "a66").appendField(new Blockly.FieldCheckbox("FALSE"), "a67").appendField(new Blockly.FieldCheckbox("FALSE"), "a68");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a51").appendField(new Blockly.FieldCheckbox("FALSE"), "a52").appendField(new Blockly.FieldCheckbox("FALSE"), "a53").appendField(new Blockly.FieldCheckbox("FALSE"), "a54").appendField(new Blockly.FieldCheckbox("FALSE"), "a55").appendField(new Blockly.FieldCheckbox("FALSE"), "a56").appendField(new Blockly.FieldCheckbox("FALSE"), "a57").appendField(new Blockly.FieldCheckbox("FALSE"), "a58");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a41").appendField(new Blockly.FieldCheckbox("FALSE"), "a42").appendField(new Blockly.FieldCheckbox("FALSE"), "a43").appendField(new Blockly.FieldCheckbox("FALSE"), "a44").appendField(new Blockly.FieldCheckbox("FALSE"), "a45").appendField(new Blockly.FieldCheckbox("FALSE"), "a46").appendField(new Blockly.FieldCheckbox("FALSE"), "a47").appendField(new Blockly.FieldCheckbox("FALSE"), "a48");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a31").appendField(new Blockly.FieldCheckbox("FALSE"), "a32").appendField(new Blockly.FieldCheckbox("FALSE"), "a33").appendField(new Blockly.FieldCheckbox("FALSE"), "a34").appendField(new Blockly.FieldCheckbox("FALSE"), "a35").appendField(new Blockly.FieldCheckbox("FALSE"), "a36").appendField(new Blockly.FieldCheckbox("FALSE"), "a37").appendField(new Blockly.FieldCheckbox("FALSE"), "a38");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a21").appendField(new Blockly.FieldCheckbox("FALSE"), "a22").appendField(new Blockly.FieldCheckbox("FALSE"), "a23").appendField(new Blockly.FieldCheckbox("FALSE"), "a24").appendField(new Blockly.FieldCheckbox("FALSE"), "a25").appendField(new Blockly.FieldCheckbox("FALSE"), "a26").appendField(new Blockly.FieldCheckbox("FALSE"), "a27").appendField(new Blockly.FieldCheckbox("FALSE"), "a28");
    this.appendDummyInput("").appendField(new Blockly.FieldCheckbox("FALSE"), "a11").appendField(new Blockly.FieldCheckbox("FALSE"), "a12").appendField(new Blockly.FieldCheckbox("FALSE"), "a13").appendField(new Blockly.FieldCheckbox("FALSE"), "a14").appendField(new Blockly.FieldCheckbox("FALSE"), "a15").appendField(new Blockly.FieldCheckbox("FALSE"), "a16").appendField(new Blockly.FieldCheckbox("FALSE"), "a17").appendField(new Blockly.FieldCheckbox("FALSE"), "a18");
    this.setOutput(true, Number);
    this.setTooltip("ArduBits_逐日_K_O9_点阵屏显示");
    this.setHelpUrl('www.ardubits.com');
  }
};


//执行器_点阵屏显示_画点变量
var ArduBits_DrawPixel_NUM = [
  ["亮", "LED_ON"],
  ["灭", "LED_OFF"]
];

//执行器_点阵屏显示_画点显示
Blockly.Blocks.ArduBits_Matrix_POS = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE4);
    this.appendDummyInput("").appendField("点阵屏显示").appendField(new Blockly.FieldImage("../../media/ArduBits/KO9.png", 32, 32));
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("SDA#");
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("SCL#"); 
    this.appendValueInput('XVALUE').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(" X轴");
    this.appendValueInput("YVALUE").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(" Y轴");
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(" 单点设为").appendField(new Blockly.FieldDropdown(ArduBits_DrawPixel_NUM), "DrawPixel_TYPE");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("ArduBits_逐日_K_O9_点阵屏显示（点阵屏单点操作，XY轴取值范围1-8）");
    this.setHelpUrl('www.ardubits.com');
  }
};

//执行器_点阵屏显示_旋转变量
var ArduBits_Rotation_NUM = [
  ["0°", "0"],
  ["-90°", "1"],
  ["+90°", "3"],
  ["180°", "2"]
];

//执行器_点阵屏显示_显示旋转
Blockly.Blocks.ArduBits_Matrix_Rotation = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE4);
    this.appendDummyInput("").appendField("点阵屏显示").appendField(new Blockly.FieldImage("../../media/ArduBits/KO9.png", 32, 32));
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("SDA#");
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("SCL#"); 
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField("屏幕旋转").appendField(new Blockly.FieldDropdown(ArduBits_Rotation_NUM), "Rotation_TYPE");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("ArduBits_逐日_K_O9_点阵屏显示");
    this.setHelpUrl('www.ardubits.com');
  }
};

//执行器_点阵屏显示_字符显示
Blockly.Blocks.ArduBits_Matrix_TEXT={
  init:function(){
    this.setColour(Blockly.Blocks.ArduBits.HUE4);
    this.appendDummyInput("").appendField("点阵屏显示").appendField(new Blockly.FieldImage("../../media/ArduBits/KO9.png", 32, 32));
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("SDA#");
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("SCL#");  
    this.appendValueInput("TEXT", String).setCheck([Number, String]).setAlign(Blockly.ALIGN_RIGHT).appendField(" 显示");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip("ArduBits_逐日_K_O9_点阵屏显示");
    this.setHelpUrl('www.ardubits.com');
  }
};

//执行器_点阵屏显示_清除屏幕
Blockly.Blocks.ArduBits_Matrix_CLEAR = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE4);
    this.appendDummyInput("").appendField("点阵屏显示").appendField(new Blockly.FieldImage("../../media/ArduBits/KO9.png", 32, 32));
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("SDA#");
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("SCL#");
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(" 显示清屏");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("ArduBits_逐日_K_O9_点阵屏显示");
    this.setHelpUrl('www.ardubits.com');
  }
};


//传感器-脑电波采集-获取数据
var ArduBits_Brainwave_GETAB = [
  ["专注度", "a"],
  ["放松度", "b"],
  ["眨眼度", "c"]
];

//传感器-脑电波采集-获取数据
Blockly.Blocks.ArduBits_Brainwave = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE1);
    this.appendDummyInput("").appendField("脑电波采集").appendField(new Blockly.FieldImage("../../media/ArduBits/KI20.png", 32, 32));
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("TX#");
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("RX#");
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(" 获取数据").appendField(new Blockly.FieldDropdown(ArduBits_Brainwave_GETAB), "Brainwave_PIN");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip("ArduBits_逐日_K-I20_脑电波采集(需配合“K-W5_蓝牙数传主”使用)");
    this.setHelpUrl('www.ardubits.com');
  }
};

//辅助块语音合成块_数组数据
Blockly.Blocks.ArduBits_SYN6288_Bitmap = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE2);
    this.appendDummyInput("").appendField("语音合成块").appendField(new Blockly.FieldImage("../../media/ArduBits/KW8.png", 32, 32));
    this.appendDummyInput("").appendField("语音名称").appendField(new Blockly.FieldTextInput('voice1'), 'VAR');
    this.appendDummyInput("").appendField("语音数据").appendField(new Blockly.FieldTextInput('0XB3,0XA3,0XD6,0XDD,0XCB,0XBC,0XCC,0XA9,0XC4,0XB7,0XBD,0XCC,0XD3,0XFD,0XBF,0XC6,0XBC,0XBC,0XD3,0XD0,0XCF,0XDE,0XB9,0XAB,0XCB,0XBE'), 'TEXT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip("ArduBits_逐日_K_W8_语音合成块");
    this.setHelpUrl('www.ardubits.com');
  }
};

//辅助块-语音合成块_背景音乐
var ArduBits_SYN6288_MUSIC = [
  ["0", "0"],
  ["1", "1"],
  ["2", "2"],
  ["3", "3"],
  ["4", "4"],
  ["5", "5"],
  ["6", "6"],
  ["7", "7"],
  ["8", "8"],
  ["9", "9"],
  ["10", "10"],
  ["11", "11"],
  ["12", "12"],
  ["13", "13"],
  ["14", "14"],
  ["15", "15"]
];

//辅助块-语音合成块_语音合成
Blockly.Blocks.ArduBits_SYN6288 = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE2);
    this.appendDummyInput("").appendField("语音合成块").appendField(new Blockly.FieldImage("../../media/ArduBits/KW8.png", 32, 32));
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("TX#");
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("RX#");
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField("语音数组").appendField(new Blockly.FieldTextInput('voice1'), 'VAR');
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(" 背景音乐").appendField(new Blockly.FieldDropdown(ArduBits_SYN6288_MUSIC), "MUSIC_PIN");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("ArduBits_逐日_K_W8_语音合成块");
    this.setHelpUrl('www.ardubits.com');
  }
};
  


//传感器-电子称重块-获取称重
Blockly.Blocks.ArduBits_HX711_Weight = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE1);
    this.appendDummyInput("").appendField("电子称重块").appendField(new Blockly.FieldImage("../../media/ArduBits/KI17.png", 32, 32));
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("DAT#");
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("SCK#");
    this.appendValueInput('NUM').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(" 校正比例");
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(" 获取重量(g)");
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip("ArduBits_逐日_K-I17_电子称重块");
    this.setHelpUrl('www.ardubits.com');
  }
};

//辅助块-超外差发射-信号变量选择
var ArduBits_TXAB = [
  ["A", "a"],
  ["B", "b"]
];


//辅助块-超外差发射-信号发送
Blockly.Blocks.ArduBits_TX433MHZ = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE2);
    this.appendDummyInput("").appendField("超外差发射").appendField(new Blockly.FieldImage("../../media/ArduBits/KW9.png", 32, 32));
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("DOA#");
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("DOB#");
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(" 发送信号").appendField(new Blockly.FieldDropdown(ArduBits_TXAB), "TXAB_PIN")
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip("ArduBits_逐日_K-W9_超外差发射");
    this.setHelpUrl('www.ardubits.com');
  }
};

//传感器-实时时钟块_时间变量
var ArduBits_RTC_TIME_TYPE = [
  ["年", "getYear"],
  ["月", "getMonth"],
  ["日", "getDay"],
  ["时", "getHour"],
  ["分", "getMinute"],
  ["秒", "getSecond"],
  ["星期", "getWeek"]
];


//传感器-实时时钟块_获取时间
Blockly.Blocks.ArduBits_RTC_get_time = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE1);
    this.appendDummyInput("").appendField("实时时钟块").appendField(new Blockly.FieldImage("../../media/ArduBits/KI14.png", 32, 32));
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("SDA#");
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("SCL#");
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(" 获取时间").appendField(new Blockly.FieldDropdown(ArduBits_RTC_TIME_TYPE), "TIME_TYPE");
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip("ArduBits_逐日_K-I14_实时时钟块");
    this.setHelpUrl('www.ardubits.com');
  }
};

//传感器-实时时钟块_设置时间
Blockly.Blocks.ArduBits_RTC_set_time = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE1);
    this.appendDummyInput("").appendField("实时时钟块").appendField(new Blockly.FieldImage("../../media/ArduBits/KI14.png", 32, 32));
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("SDA#");
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("SCL#")
    this.appendValueInput("hour").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("  设时");
    this.appendValueInput("minute").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(" 设分");
    this.appendValueInput("second").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(" 设秒");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("ArduBits_逐日_K-I14_实时时钟块");
    this.setHelpUrl('www.ardubits.com');
  }
};

//传感器-实时时钟块_设置日期
Blockly.Blocks.ArduBits_RTC_set_date = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE1);
    this.appendDummyInput("").appendField("实时时钟块").appendField(new Blockly.FieldImage("../../media/ArduBits/KI14.png", 32, 32));
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("SDA#");
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("SCL#")
    this.appendValueInput("year").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField("  设年");
    this.appendValueInput("month").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(" 设月");
    this.appendValueInput("day").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(" 设日");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("ArduBits_逐日_K-I14_实时时钟块(星期根据年月日自动算出设置)");
    this.setHelpUrl('www.ardubits.com');
  }
};



//辅助块-S4A固件
Blockly.Blocks.ArduBits_S4A = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE5);
    this.appendDummyInput().appendField(new Blockly.FieldImage("../../media/ardubits/S4A.png", 32,32));
    this.appendDummyInput().appendField("S4A固件恢复");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("ArduBits_恢复S4A使用固件");
    this.setHelpUrl('www.ardubits.com');
  }
};

//辅助块-IIC地址查找

Blockly.Blocks.ArduBits_IICSCAN = {
  init: function() {
    this.setColour(Blockly.Blocks.ArduBits.HUE5);
    this.appendDummyInput().appendField(new Blockly.FieldImage("../../media/ardubits/IIC.png", 32,32));
    this.appendDummyInput().appendField("IIC地址扫描");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("ArduBits_扫描IIC地址程序");
    this.setHelpUrl('www.ardubits.com');
  }
};

