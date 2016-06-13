'use strict';
goog.provide('Blockly.Blocks.esp8266wifi');
goog.require('Blockly.Blocks');

Blockly.Blocks.esp8266wifi.HUE = 100;

Blockly.Blocks.esp8266wifi_begin = {
  init: function() {
    this.setColour(Blockly.Blocks.esp8266wifi.HUE);
    this.appendValueInput("ssid")
        .appendField(Blockly.MIXLY_ESP8266WIFI_BEGIN)
		.appendField(Blockly.MIXLY_ESP8266WIFI_SSID)
        .setCheck(String);
    this.appendValueInput("password")
        .appendField(Blockly.MIXLY_ESP8266WIFI_PASSWORD)
		.setAlign(Blockly.ALIGN_RIGHT)
        .setCheck(String);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
  }
};

Blockly.Blocks['esp8266wifi_local_ip'] = {
  init: function() {
    this.setColour(Blockly.Blocks.esp8266wifi.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_ESP8266WIFI_LOCALIP);
    this.setOutput(true, 'IPAddress');
  }
};

Blockly.Blocks['esp8266wifi_client_connect_host']={
  init: function() {
    this.setColour(Blockly.Blocks.esp8266wifi.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_ESP8266WIFI_CLINET_CONNECT_HOST)
		.appendField(this.newQuote_(true))
        .appendField(new Blockly.FieldTextInput('mixly.org'), 'HOST')
        .appendField(this.newQuote_(false));
	this.appendValueInput('PORT')
		.setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_ESP8266WIFI_CLINET_PORT);
    this.setOutput(true, Number);
	this.setInputsInline(true);
  },
  newQuote_: function(open) {
    if (open == this.RTL) {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==';
    } else {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC';
    }
    return new Blockly.FieldImage(file, 12, 12, '"');
  }
}

Blockly.Blocks['esp8266wifi_client_connected'] = {
  init: function() {
    this.setColour(Blockly.Blocks.esp8266wifi.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_ESP8266WIFI_CLINET_CONNECTED);
    this.setOutput(true, Number);
  }
};

Blockly.Blocks['esp8266wifi_client_available'] = {
  init: function() {
    this.setColour(Blockly.Blocks.esp8266wifi.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_ESP8266WIFI_CLINET_AVAILABLE);
    this.setOutput(true, Number);
  }
};

Blockly.Blocks['esp8266wifi_client_read'] = {
  init: function() {
    this.setColour(Blockly.Blocks.esp8266wifi.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_ESP8266WIFI_CLINET_READ);
    this.setOutput(true, Number);
  }
};

Blockly.Blocks['esp8266wifi_client_print'] = {
  init: function() {
    this.setColour(Blockly.Blocks.esp8266wifi.HUE);
	this.appendValueInput('TEXT')
		.setCheck(String)
        .appendField(Blockly.MIXLY_ESP8266WIFI_CLINET_PRINT);
	this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks['esp8266wifi_client_println'] = {
  init: function() {
    this.setColour(Blockly.Blocks.esp8266wifi.HUE);
	this.appendValueInput('TEXT')
		.setCheck(String)
        .appendField(Blockly.MIXLY_ESP8266WIFI_CLINET_PRINTLN);
	this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};