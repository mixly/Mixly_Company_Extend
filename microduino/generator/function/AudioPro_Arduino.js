'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');


Blockly.Arduino.audioProPrepare = function() {

	var getType = this.getFieldValue('getType');

	var audioProDefine='';
	audioProDefine+='#include <SPI.h>\n';
	audioProDefine+='#include <Adafruit_VS1053.h>\n';
	audioProDefine+='#define VS_XRESET  -1\n';
	audioProDefine+='#define VS_XCS     A3\n';
	audioProDefine+='#define VS_XDCS    A2\n';
	audioProDefine+='#define CARDCS 7\n';
	audioProDefine+='#define VS_DREQ 3\n';
	audioProDefine+='#define VS1053_BANK_DEFAULT 0x00\n';
	audioProDefine+='#define VS1053_BANK_DRUMS1 0x78\n';
	audioProDefine+='#define VS1053_BANK_DRUMS2 0x7F\n';
	audioProDefine+='#define VS1053_BANK_MELODY 0x79\n';
	audioProDefine+='#define VS1053_GM1_ACOUSTIC_GRAND_PIANO 0\n';
	audioProDefine+='#define VS1053_GM1_PIANO 1\n';
	audioProDefine+='#define VS1053_GM1_ELECTRIC_GRAND_PIANO 2\n';
	audioProDefine+='#define VS1053_GM1_HONKY_TONK_PIANO 3\n';
	audioProDefine+='#define VS1053_GM1_RHODES_PIANO 4\n';
	audioProDefine+='#define VS1053_GM1_CHORUSED_PIANO 5\n';
	audioProDefine+='#define VS1053_GM1_OCARINA 30\n';
	audioProDefine+='#define VS1053_GM1_OCARINB 31\n';
	audioProDefine+='#define VS1053_GM1_OCARINC 32\n';
	audioProDefine+='#define MIDI_NOTE_ON  0x90\n';
	audioProDefine+='#define MIDI_NOTE_OFF 0x80\n';
	audioProDefine+='#define MIDI_CHAN_MSG 0xB0\n';
	audioProDefine+='#define MIDI_CHAN_BANK 0x00\n';
	audioProDefine+='#define MIDI_CHAN_VOLUME 0x07\n';
	audioProDefine+='#define MIDI_CHAN_PROGRAM 0xC0\n';
	audioProDefine+='static const uint16_t  MIDIPatch[] PROGMEM = {\n';
	audioProDefine+='  0x0007, 0x0001, 0x8050, 0x0006, 0x0014, 0x0030, 0x0715, 0xb080,\n';
	audioProDefine+='  0x3400, 0x0007, 0x9255, 0x3d00, 0x0024, 0x0030, 0x0295, 0x6890,\n';
	audioProDefine+='  0x3400, 0x0030, 0x0495, 0x3d00, 0x0024, 0x2908, 0x4d40, 0x0030,\n';
	audioProDefine+='  0x0200, 0x000a, 0x0001, 0x0050\n';
	audioProDefine+='};\n';
	audioProDefine+='static const uint16_t recPlugin[]PROGMEM = {\n';
	audioProDefine+='  0x0007, 0x0001, 0x8010, 0x0006, 0x001c, 0x3e12, 0xb817, 0x3e14,\n';
	audioProDefine+='  0xf812, 0x3e01, 0xb811, 0x0007, 0x9717, 0x0020, 0xffd2, 0x0030,\n';
	audioProDefine+='  0x11d1, 0x3111, 0x8024, 0x3704, 0xc024, 0x3b81, 0x8024, 0x3101,\n';
	audioProDefine+='  0x8024, 0x3b81, 0x8024, 0x3f04, 0xc024, 0x2808, 0x4800, 0x36f1,\n';
	audioProDefine+='  0x9811, 0x0007, 0x0001, 0x8028, 0x0006, 0x0002, 0x2a00, 0x040e\n';
	audioProDefine+='};\n';
	audioProDefine+='Adafruit_VS1053 musicPlayer = Adafruit_VS1053(VS_XRESET, VS_XCS, VS_XDCS, VS_DREQ);\n';
	audioProDefine+='void midiSetInstrument(uint8_t chan, uint8_t inst) {\n';
	audioProDefine+='  if (chan > 15 || --inst > 127) return;\n';
	audioProDefine+='  uint8_t _c[] = {0, MIDI_CHAN_PROGRAM | chan, 0, inst};\n';
	audioProDefine+='  while (!musicPlayer.readyForData());\n';
	audioProDefine+='  musicPlayer.playData(_c, sizeof(_c));\n';
	audioProDefine+='}\n';
	audioProDefine+='void midiSetChannelVolume(uint8_t chan, uint16_t vol) {\n';
	audioProDefine+='  if (chan > 15 || vol > 127) return;\n';
	audioProDefine+='  uint8_t _c[] = {0, MIDI_CHAN_MSG | chan, 0, MIDI_CHAN_VOLUME, 0, vol};\n';
	audioProDefine+='  while (!musicPlayer.readyForData());\n';
	audioProDefine+='  musicPlayer.playData(_c, sizeof(_c));\n';
	audioProDefine+='}\n';
	audioProDefine+='void midiSetChannelBank(uint8_t chan, uint8_t bank) {\n';
	audioProDefine+='  if (chan > 15 || bank > 127) return;\n';
	audioProDefine+='  uint8_t _c[] = {0, MIDI_CHAN_MSG | chan, 0, MIDI_CHAN_BANK, 0, bank};\n';
	audioProDefine+='  while (!musicPlayer.readyForData());\n';
	audioProDefine+='  musicPlayer.playData(_c, sizeof(_c));\n';
	audioProDefine+='}\n';
	audioProDefine+='void midiNoteOn(uint8_t chan, uint8_t n, uint8_t vol) {\n';
	audioProDefine+='  if (chan > 15 || n > 127 || vol > 127) return;\n';
	audioProDefine+='  uint8_t _c[] = {0, MIDI_NOTE_ON | chan, 0, n, 0, vol};\n';
	audioProDefine+='  while (!musicPlayer.readyForData());\n';
	audioProDefine+='  musicPlayer.playData(_c, sizeof(_c));\n';
	audioProDefine+='}\n';
	audioProDefine+='void midiNoteOff(uint8_t chan, uint8_t n, uint8_t vol) {\n';
	audioProDefine+='  if (chan > 15 || n > 127 || vol > 127) return;\n';
	audioProDefine+='  uint8_t _c[] = {0, MIDI_NOTE_OFF | chan, 0, n, 0, vol};\n';
	audioProDefine+='  while (!musicPlayer.readyForData());\n';
	audioProDefine+='  musicPlayer.playData(_c, sizeof(_c));\n';
	audioProDefine+='}\n';
	Blockly.Arduino.definitions_['define_AudioPro'] = audioProDefine;

	var audioProSetup='';

	audioProSetup+='if (!musicPlayer.begin()) {\n';
	audioProSetup+='	while (1);\n';
	audioProSetup+='}\n';
	audioProSetup+='musicPlayer.applyPatch(MIDIPatch, sizeof(MIDIPatch) / sizeof(uint16_t));\n';
	audioProSetup+='musicPlayer.setVolume(0, 0);\n';
	audioProSetup+='midiSetChannelBank(0, VS1053_BANK_MELODY);\n';
	audioProSetup+='midiSetInstrument(0, '+getType+');\n';

	audioProSetup+='musicPlayer.GPIO_pinMode(4, OUTPUT);\n';
	audioProSetup+='musicPlayer.GPIO_digitalWrite(4, LOW);\n';

	Blockly.Arduino.setups_['setup_AudioPro'] = audioProSetup;

	var code='';
	return code;
};

Blockly.Arduino.audioProInstrument = function() {
  var getType = this.getFieldValue('getType');
  var code='midiSetInstrument(0, '+getType+');\n';
  return code;
};

Blockly.Arduino.audioProControl = function() {

	var getType = this.getFieldValue('getType');


	var audioProMelody = Blockly.Arduino.valueToCode(this, 'audioProMelody', Blockly.Arduino.ORDER_ATOMIC);
	var audioProVolume = Blockly.Arduino.valueToCode(this, 'audioProVolume', Blockly.Arduino.ORDER_ATOMIC);
	var audioProDuration = Blockly.Arduino.valueToCode(this, 'audioProDuration', Blockly.Arduino.ORDER_ATOMIC);
	var code='';
	code+=getType+'(0, '+audioProMelody+', '+audioProVolume+');\n';
	code+='delay('+audioProDuration+');\n';
	return code;
};