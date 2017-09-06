'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');


Blockly.Arduino.BuzzerTone = function() {
//var buzzerNum = this.getFieldValue('buzzerNumber');
var Frequency = Blockly.Arduino.valueToCode(this, 'Frequency', Blockly.Arduino.ORDER_ATOMIC)
var BuzzerPin = Blockly.Arduino.valueToCode(this, 'BuzzerPin', Blockly.Arduino.ORDER_ATOMIC)
Blockly.Arduino.definitions_['define_BuzzerPin'+BuzzerPin] = '#define BuzzerPin'+BuzzerPin+' '+BuzzerPin;

//Blockly.Arduino.setups_['setup_Buzzer'+BuzzerPin] = 'pinMode(BuzzerPin'+BuzzerPin+',OUTPUT);';

var code='tone(BuzzerPin'+BuzzerPin+','+Frequency+');\n';
return code;
};


Blockly.Arduino.BuzzerToneMelody = function() {
	var buzzerMelody = this.getFieldValue('buzzerMelody');
	var BuzzerPin = Blockly.Arduino.valueToCode(this, 'BuzzerPin', Blockly.Arduino.ORDER_ATOMIC)
	Blockly.Arduino.definitions_['define_BuzzerPin'+BuzzerPin] = '#define BuzzerPin'+BuzzerPin+' '+BuzzerPin;

	//Blockly.Arduino.setups_['setup_Buzzer'+BuzzerPin] = 'pinMode(BuzzerPin'+BuzzerPin+',OUTPUT);';

	var code='';
	code+='tone(BuzzerPin'+BuzzerPin+','+buzzerMelody+');\n';

	return code;
};


Blockly.Arduino.BuzzerToneSong = function() {
	var buzzerSong = this.getFieldValue('buzzerSong');
	var BuzzerPin = Blockly.Arduino.valueToCode(this, 'BuzzerPin', Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.definitions_['define_BuzzerPin'+BuzzerPin] = '#define BuzzerPin'+BuzzerPin+' '+BuzzerPin;
	

	var songArray='';
	songArray+='int tone_list[] = {262, 294, 330, 349, 392, 440, 494, 523, 587, 659, 698, 784, 880, 988, 1046, 1175, 1318, 1397, 1568, 1760, 1967};\n';
	songArray+='int music_1[] = {12, 10, 12, 10, 12, 10, 9, 10, 12, 12, 12, 10, 13, 12, 10, 12, 10, 9, 8, 9, 10, 12, 10, 9, 8, 9, 10, 0};\n';
	songArray+='float rhythm_1[] = {1, 0.5, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 2, 0.5, 1, 0.5, 1, 1, 0.5, 0.5, 0.5, 0.5, 1, 1, 1, 1, 0.5, 0.5, 0.5, 0.5, 2};\n';
	songArray+='int music_2[] = {8, 9, 10, 8, 8, 9, 10, 8, 10, 11, 12, 10, 11, 12, 0};\n';
	songArray+='float rhythm_2[] = {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2};\n';
	songArray+='int music_3[] = {5, 8, 8, 10, 13, 10, 12, 12, 13, 12, 10, 11, 10, 9, 6, 9, 9, 11, 14, 14, 13, 12, 11, 11, 10, 6, 7, 8, 9, 0};\n';
	songArray+='float rhythm_3[] = {0.5, 0.25, 0.5, 0.25, 0.5, 0.25, 1, 0.5, 0.25, 0.5, 0.25, 0.5, 0.25, 1, 0.5, 0.25, 0.5, 0.25, 0.5, 0.25, 0.5, 0.25, 1, 0.5, 0.25, 0.5, 1, 0.5, 3};\n';
	songArray+='int music_4[] = {5,5,6,5,8,7,5,5,6,5,9,8,5,5,12,10,8,7,6,11,11,10,8,9,8,0};\n';
	songArray+='float rhythm_4[] = {0.5,0.5,1,1,1,2,0.5,0.5,1,1,1,2,0.5,0.5,1,1,1,1,1,0.5,0.5,1,1,1,3};\n';
	songArray+='int music_5[] = {12, 13, 12, 13, 12, 13, 12, 12, 15, 14, 13, 12, 13, 12, 12, 12, 10, 10, 12, 12, 10, 9, 11, 10, 9, 8, 9, 8, 0};\n';
	songArray+='float rhythm_5[] = {0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 1};\n';
	songArray+='int music_6[] = {8, 8, 10, 8, 8, 10, 22, 13, 13, 13, 12, 13, 12, 8, 10, 22, 15, 13, 13, 12, 13, 12, 8, 9, 22, 14, 14, 12, 10, 12, 0};\n';
	songArray+='float rhythm_6[] = {1, 1, 2, 0.5, 1, 1, 1, 1, 1, 0.5, 0.5, 1, 0.5, 1, 1, 1, 0.5, 0.5, 0.5, 0.5, 2, 0.5, 1, 1, 1, 1, 0.5, 0.5, 1, 4};\n';
	songArray+='int music_7[] = {6, 8, 9, 10, 12, 10, 8, 9, 6, 22, 8, 9, 10, 12, 12, 13, 9, 10, 22, 10, 12, 13, 12, 13, 15, 14, 13, 12, 13, 10, 8, 9, 10, 12, 8, 6, 8, 9, 10, 13, 12, 0};\n';
	songArray+='float rhythm_7[] = {0.5, 0.5, 0.5, 1, 0.5, 0.5, 0.5, 1, 2, 0.5, 0.5, 0.5, 0.5, 1, 0.5, 1, 1, 2, 1, 0.5, 0.5, 2, 1, 0.5, 0.5, 0.25, 0.25, 0.5, 0.5, 1, 0.5, 0.5, 1, 0.5, 1, 1, 0.5, 0.5, 0.5, 0.5, 3};\n';
	songArray+='int music_8[] = {10, 8, 9, 6, 10, 9, 8, 9, 6, 10, 8, 9, 9, 12, 10, 7, 8, 8, 7, 6, 7, 8, 9, 5, 13, 12, 10, 10, 9, 8, 9, 10, 9, 10, 9, 12, 12, 12, 12, 12, 12, 0};\n';
	songArray+='float rhythm_8[] = {1, 1, 1, 1, 0.5, 0.5, 0.5, 0.5, 2, 1, 1, 1, 1, 0.5, 0.5, 1, 1, 0.5, 0.5, 1, 0.5, 0.5, 1, 1, 0.5, 0.5, 1, 1, 0.5, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 1, 0.5, 0.5, 0.5, 0.5, 1};\n';
	songArray+='int music_9[] = {10,12,15,13,12,10,12,13,15,12,15,17,16,15,16,15,13,15,12,0};\n';
	songArray+='float rhythm_9[] = {0.5,0.5,0.5,0.5,2,0.5,0.5,0.5,0.5,2,1,0.5,1,1,0.5,0.5,0.5,0.5,2};\n';
	songArray+='int music_10[] = {10,10,10,8,5,5,22,10,10,10,8,10,22,12,12,10,8,5,5,5,6,7,8,10,9,0};\n';
	songArray+='float rhythm_10[] = {0.5,0.5,0.5,0.5,1,0.5,0.5,0.5,0.5,0.5,0.5,1,1,0.5,0.5,0.5,0.5,0.5,0.5,1,0.5,0.5,0.5,0.5,1};\n';


	Blockly.Arduino.definitions_['setup_BuzzerSongArray'] = songArray;


	//Blockly.Arduino.setups_['setup_Buzzer'+BuzzerPin] = 'pinMode(BuzzerPin'+BuzzerPin+',OUTPUT);';

	

	var code='';
	code+='for (int a = 0; music_'+buzzerSong+'[a] != 0; a++) {\n';
	code+='  if (music_'+buzzerSong+'[a] != 22) {\n';
	code+='    tone(BuzzerPin'+BuzzerPin+', tone_list[music_'+buzzerSong+'[a] - 1]);\n';
	code+='  }\n';
	code+='  else {\n';
	code+='    noTone(BuzzerPin'+BuzzerPin+');\n';
	code+='  }\n';
	code+='  delay(rhythm_'+buzzerSong+'[a] * 300);\n';
	code+='  noTone(BuzzerPin'+BuzzerPin+');\n';
	code+='  delay(30);\n';
	code+='}\n';
	code+='delay(1000);\n';

	return code;
};

Blockly.Arduino.BuzzerNoTone = function() {
	var BuzzerPin = Blockly.Arduino.valueToCode(this, 'BuzzerPin', Blockly.Arduino.ORDER_ATOMIC)

	// var buzzerNum = this.getFieldValue('buzzerNumber');

	Blockly.Arduino.definitions_['define_BuzzerPin'+BuzzerPin] = '#define BuzzerPin'+BuzzerPin+' '+BuzzerPin;

	//Blockly.Arduino.setups_['setup_Buzzer'+BuzzerPin] = 'pinMode(BuzzerPin'+BuzzerPin+',OUTPUT);';

	var code='noTone(BuzzerPin'+BuzzerPin+');\n';
	return code;
};