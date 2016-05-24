'use strict';
goog.provide('Blockly.Arduino.ruilong');
goog.require('Blockly.Arduino');

Blockly.Arduino.ruilong_lamp = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_stat = this.getTitleValue('STAT');
  var code = "";
  if(window.isNaN(dropdown_pin)){
    code = code+'pinMode('+dropdown_pin+', OUTPUT);\n';
  }else{
    Blockly.Arduino.setups_['setup_output_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  }
  code += 'digitalWrite('+dropdown_pin+','+dropdown_stat+');\n'
  return code;
};

Blockly.Arduino.ruilong_buzzer = Blockly.Arduino.ruilong_lamp;
Blockly.Arduino.ruilong_relay = Blockly.Arduino.ruilong_lamp;

Blockly.Arduino.ruilong_magnetic = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var code = "";
  if(window.isNaN(dropdown_pin)){
	var funcName='mixly_digitalRead';
	var code2='int'+ ' ' + funcName + '(uint8_t pin) {\n' 
	+ '  pinMode(pin, INPUT);\n'
	+ '  return digitalRead(pin);\n'
	+ '}\n';
    Blockly.Arduino.definitions_[funcName] = code2;
	code = 'mixly_digitalRead('+dropdown_pin+')';
  }else{
    if(Blockly.Arduino.setups_['setup_output_'+dropdown_pin]){
	   //存在pinMode已设为output则不再设为input
	}else{
       Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
	}
	code = 'digitalRead('+dropdown_pin+')';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ruilong_vibration = Blockly.Arduino.ruilong_magnetic;
Blockly.Arduino.ruilong_tilt = Blockly.Arduino.ruilong_magnetic;
Blockly.Arduino.ruilong_touch = Blockly.Arduino.ruilong_magnetic;
Blockly.Arduino.ruilong_collision = Blockly.Arduino.ruilong_magnetic;
Blockly.Arduino.ruilong_button = Blockly.Arduino.ruilong_magnetic;
Blockly.Arduino.ruilong_obstacle = Blockly.Arduino.ruilong_magnetic;

Blockly.Arduino.ruilong_dht11 = function() {
	var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
	var what = this.getFieldValue('WHAT');
	Blockly.Arduino.definitions_['define_dht11'] = '#include <dht11.h>';
	Blockly.Arduino.definitions_['var_dht11'+dropdown_pin] = 'dht11 myDHT_'+dropdown_pin+';';
	var funcName='dht_'+dropdown_pin+'_get'+what;
	var code='int'+ ' ' + funcName + '() {\n' 
	+ '  int chk = myDHT_'+dropdown_pin+'.read('+dropdown_pin+');\n'
	+ '  int value = myDHT_'+dropdown_pin+'.'+what+';\n'
	+ '  return value;\n'
	+ '}\n';
    Blockly.Arduino.definitions_[funcName] = code;
	return [funcName+'()', Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.ruilong_resistor_scratch = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var code = 'analogRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ruilong_temp = Blockly.Arduino.ruilong_resistor_scratch;
Blockly.Arduino.ruilong_sound = Blockly.Arduino.ruilong_resistor_scratch;
Blockly.Arduino.ruilong_moisture = Blockly.Arduino.ruilong_resistor_scratch;
Blockly.Arduino.ruilong_steam = Blockly.Arduino.ruilong_resistor_scratch;
Blockly.Arduino.ruilong_linefinder = Blockly.Arduino.ruilong_resistor_scratch;
Blockly.Arduino.ruilong_knob = Blockly.Arduino.ruilong_resistor_scratch;
Blockly.Arduino.ruilong_slider = Blockly.Arduino.ruilong_resistor_scratch;
Blockly.Arduino.ruilong_light = Blockly.Arduino.ruilong_resistor_scratch;

Blockly.Arduino.ruilong_lcd_print = function() {
  var str1 = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || '\"\"';
  var str2 = Blockly.Arduino.valueToCode(this, 'TEXT2', Blockly.Arduino.ORDER_ATOMIC) || '\"\"';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_df_lcd'] = '#include <LiquidCrystal_I2C.h>';
  Blockly.Arduino.definitions_['var_df_lcd'] = 'LiquidCrystal_I2C df_lcd(0x20,16,2);';
  Blockly.Arduino.setups_['setup_df_lcd1'] = 'df_lcd.init();';
  Blockly.Arduino.setups_['setup_df_lcd2'] = 'df_lcd.backlight();';
  var code = 'df_lcd.setCursor(0, 0);\n'
  code+='df_lcd.print('+str1+');\n';
  code+='df_lcd.setCursor(0, 1);\n';
  code+='df_lcd.print('+str2+');\n';
  return code;
};

Blockly.Arduino.ruilong_lcd_power = function() {
  var dropdown_stat = this.getTitleValue('STAT');
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_df_lcd'] = '#include <LiquidCrystal_I2C.h>';
  Blockly.Arduino.definitions_['var_df_lcd'] = 'LiquidCrystal_I2C df_lcd(0x20,16,2);';
  Blockly.Arduino.setups_['setup_df_lcd1'] = 'df_lcd.init();';
  Blockly.Arduino.setups_['setup_df_lcd2'] = 'df_lcd.backlight();';
  var code = 'df_lcd.'+dropdown_stat+'();\n'
  return code;
};