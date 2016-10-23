///<jscompress sourcefile="BT_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');


Blockly.Arduino.bluetoothMicroduinoBegin = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['define_Software'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_blueReciveInfo'] = 'String currentInfo="";';

  
  if(dropdown_pin=='2') {
    Blockly.Arduino.definitions_['define_SoftwareSerial'] = 'SoftwareSerial mySerial(4, 5);';
    Blockly.Arduino.definitions_['define_mySerial'] = '#define my_Serial  mySerial'; 
    Blockly.Arduino.setups_['setup_mCookie_bluetooth'] = 'my_Serial.begin(9600);'; 
  }
  else if(dropdown_pin=='1'){
    Blockly.Arduino.definitions_['define_mySerial'] = '#define my_Serial Serial1';
    Blockly.Arduino.setups_['setup_mCookie_bluetooth'] = 'my_Serial.begin(9600);';
  } else {
    Blockly.Arduino.definitions_['define_mySerial'] = '#define my_Serial Serial';

  }
  var code = '';
  return code;
  //return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.bluetoothMicroduinoReciver = function() {

var branch = Blockly.Arduino.statementToCode(this, 'reciverDataInput');

  var code = 'if (my_Serial.available() > 0) { \n';
  code+=" currentInfo = my_Serial.readStringUntil('\\n');\n";
  code+=branch;
  code+='}\n';
  return code;
};



Blockly.Arduino.btMicroduinoReciverData = function() {

  var code = 'currentInfo';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
  //return code;
};


Blockly.Arduino.btMicroduinoSenderData = function() {
var str = Blockly.Arduino.valueToCode(this, 'senderText', Blockly.Arduino.ORDER_ATOMIC) || 'String(\"\")';

  var code = 'my_Serial.println('+str+');\n';
  //return [code, Blockly.Arduino.ORDER_ATOMIC];
  return code;
};

Blockly.Arduino.bluetoothmtankBegin = function() {
  var Type_md_mc = this.getFieldValue('Type_md_mc');

  if (Type_md_mc==1) {
    Blockly.Arduino.definitions_['Protocol_HardSer'] = '#include <Microduino_Protocol_HardSer.h>';
    Blockly.Arduino.definitions_['define_Protocol'] = 'Protocol ProtocolB(&Serial1, TYPE_NUM);';
  }
  else if (Type_md_mc==2){
    Blockly.Arduino.definitions_['Protocol_SoftSer'] = '#include <Microduino_Protocol_SoftSer.h>';
    Blockly.Arduino.definitions_['define_Software'] = '#include <SoftwareSerial.h>';
    Blockly.Arduino.definitions_['define_SoftwareSerial'] = 'SoftwareSerial mySerial(4, -1);';
    Blockly.Arduino.definitions_['define_Protocol'] = 'Protocol ProtocolB(&mySerial, TYPE_NUM);';
  } else {
    Blockly.Arduino.definitions_['Protocol_HardSer'] = '#include <Microduino_Protocol_HardSer.h>';
    Blockly.Arduino.definitions_['define_Protocol'] = 'Protocol ProtocolB(&Serial, TYPE_NUM);';
  }
  Blockly.Arduino.setups_['setup_mCookie_bleSerial'] = 'ProtocolB.begin(9600);';
  // Blockly.Arduino.setups_['setup_mCookie_Serial'] = 'Serial.begin(9600);';
  var code = '\n';
  return code;
};

Blockly.Arduino.bluetoothmTankReciver = function() {
  var branch = Blockly.Arduino.statementToCode(this, 'reciverDataInput');
  Blockly.Arduino.definitions_['mCookie_ble_data'] = 'uint16_t Data[8];';

  var code = 'int sta = ProtocolB.parse(Data, MODE_WHILE);\n';
  code += '  if (sta == P_FINE) {\n';
  code += '  for (int a = 0; a < CHANNEL_NUM; a++) {\n';
  code += '    Serial.print(Data[a]);\n';
  code += '    Serial.print(" ");\n';
  code += '  }\n';
  code += '  Serial.println(" \t DATA OK");\n';
  code+=branch;
  code += '}\n';
  code += 'delay(10);\n';
  return code;
};

Blockly.Arduino.bluetoothmTankdata = function() {
  var mTankchooseNumber = this.getFieldValue('mTankchooseNumber');
  var code = 'Data['+mTankchooseNumber+']';

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.bluetoothcolorled = function() {

Blockly.Arduino.definitions_['define_buffer'] = 'char buffer[100];';
Blockly.Arduino.definitions_['define_buffer_sta'] = 'boolean buffer_sta = false,color_en = false;';
Blockly.Arduino.definitions_['define_buffer_num'] = 'int buffer_num = 0;';
Blockly.Arduino.definitions_['define_sta'] = 'int sta[4];';
Blockly.Arduino.definitions_['define_safeled'] = 'unsigned long safeled_ms = 0;';
Blockly.Arduino.definitions_['define_pos_num'] = 'int led_pos = 0,led_num = 1;\n';
Blockly.Arduino.definitions_['define_led_time'] = 'unsigned long led_time = 0;\n';
Blockly.Arduino.definitions_['define_val_max'] = '#define val_max 255\n';
Blockly.Arduino.definitions_['define_val_min'] = '#define val_min 0\n';
Blockly.Arduino.setups_['setup_Serial'] = 'Serial.begin(115200);'; 

var setColor='void colorSet(uint32_t c) {\n';
    setColor+='for (uint16_t i = 0; i < strip.numPixels(); i++)\n';
    setColor+='strip.setPixelColor(i, c);\n';
    setColor+='strip.show();}\n';
    setColor+='void colorSet(uint32_t c, int i) {\n';
    setColor+='strip.setPixelColor(i, c);\n';
    setColor+='strip.show();}\n';
Blockly.Arduino.definitions_['define_setColor'] = setColor;

var breath='void breath(int r, int g, int b, int i){\n';
  breath+='if (millis() < led_time) led_time = millis();\n';
  breath+='if (millis() - led_time > 10) {\n';
  breath+='  led_pos += led_num;\n';
  breath+='  if (led_pos >= 255 || led_pos <= 0)\n';
  breath+='    led_num = -led_num;\n';
  breath+='  led_time = millis();}\n';
  breath+='colorSet(strip.Color(map(led_pos, val_min, val_max, 0, r), map(led_pos, val_min, val_max, 0, g), map(led_pos, val_min, val_max, 0, b)), i);}\n';
Blockly.Arduino.definitions_['define_setbreath'] = breath;


var code = '\n';
  code += 'if (!color_en)\n';
  code += '{\n';
  code += 'for (int j = 0; j < 6; j++)\n';
  code += '  breath(255, 0, 255, j);\n';
  code += '}\n';
  code += 'if (millis() - safeled_ms > 2000)\n';
  code += '{\n';
  code += '  safeled_ms = millis();\n';
  code += '  color_en = false;\n';
  code += '}\n';
  code += 'while (my_Serial.available()){\n';
  code += 'char c = my_Serial.read();\n';
  code += 'delay(2);\n';
  code += 'if (c == \'C\')\n';
  code += '    buffer_sta = true;\n';
  code += 'if (c == \'\\n\'){\n';
  code += '    color_en = true;\n';
  code += '    safeled_ms = millis();}\n';
  code += '  if (buffer_sta)\n';
  code += '  {\n';
  code += '    buffer[buffer_num] = c;\n';
  code += '    buffer_num++;\n';
  code += '  }\n';
  code += '}\n';
  code += 'if (buffer_sta)\n';
  code += '{\n';
  code += '  buffer_sta = false;\n';
  code += '  sscanf((char *)strstr((char *)buffer, "C:"), "C:%d,%d,%d,%d", &sta[0], &sta[1], &sta[2], &sta[3]);\n';
  code += '  for (int a = 0; a < buffer_num; a++)\n';
  code += '    buffer[a] = NULL;\n';
  code += '  buffer_num = 0;\n';
  code += '  if (-1 == sta[3]) {\n';
  code += '    colorSet(strip.Color(sta[0], sta[1], sta[2]));\n';
  code += ' }\n';
  code += '  else if ((0 <= sta[3]) && (sta[3] < 6)) {\n';
  code += '    colorSet(strip.Color(sta[0], sta[1], sta[2]), sta[3]);\n';
  code += '  }\n';
  code += '}\n';
  //return [code, Blockly.Arduino.ORDER_ATOMIC];
  return code;
};

///<jscompress sourcefile="GSM_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.GSM_SMS = function() {
  var TELNUM = this.getFieldValue('TELNUM');
  var str = Blockly.Arduino.valueToCode(this, 'text', Blockly.Arduino.ORDER_ATOMIC) || 'String(\"\")'
  Blockly.Arduino.definitions_['define_include'] = '#include "SIM900.h"\n'
	+'#include <SoftwareSerial.h>\n'
	+'#include "sms.h"\n';
  Blockly.Arduino.definitions_['define_option'] = 'SMSGSM sms;\n'
 	 +'int numdata;\n' 
 	 +'boolean started=false;\n'
 	 +'char smsbuffer[160];\n'
 	 +'char n[20];\n'
 	 +'boolean sendflag=false;\n'
 	 +'char number[20]="+86'+TELNUM+'";';
  Blockly.Arduino.setups_['setup_option'] = 'Serial.begin(9600);\n'
 	 +'Serial.println("GSM Shield testing.");\n';
 
  var code = '     if (gsm.begin(2400)) {\n'
  +'          Serial.println("\nstatus=READY");\n'
  +'          started=true;\n'
  +'     } else Serial.println("\nstatus=IDLE");\n'
  +'    if(Serial.available())\n'
  +'    {\n'
  +'      char c = Serial.read();\n'
  +'      if(c==\'a\')sendflag=true;\n'
  +'    }\n'
  +'     if(started&&sendflag) {\n'
  +'          if (sms.SendSMS(number, "'+str+'"))\n'
  +'          Serial.println("\nSMS sent OK");\n'
  +'          sendflag=0;\n'
  +'          delay(1000);\n'
  +'     }\n'
  +'     if(started) {\n'
  +'          if(gsm.readSMS(smsbuffer, 160, n, 20)) {\n'
  +'               Serial.println(n);\n'
  +'               Serial.println(smsbuffer);\n'
  +'          }\n'
  +'          delay(1000);\n'
  +'     }\n';
  return code;
};
///<jscompress sourcefile="IIC_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');



Blockly.Arduino.microduinoIICSendToSlaver = function() {

  var type = this.getFieldValue('TYPE');

  var numSlaver = Blockly.Arduino.valueToCode(this, 'numSlaver', Blockly.Arduino.ORDER_ATOMIC);
  var numByte = Blockly.Arduino.valueToCode(this, 'numByte', Blockly.Arduino.ORDER_ATOMIC);
  var arrayLength = Blockly.Arduino.valueToCode(this, 'arrayLength', Blockly.Arduino.ORDER_ATOMIC);
  

  Blockly.Arduino.definitions_['Wire'] = '#include <Wire.h>';
  Blockly.Arduino.setups_['Wire'] = 'Wire.begin();';

  var code='';
  code+='Wire.beginTransmission('+numSlaver+');\n';

  if(type=='string') {
    code+='Wire.write('+numByte+',String('+numByte+').length());\n';
  } else {
    code+='Wire.write('+numByte+',sizeof('+numByte+')/sizeof('+numByte+'[0]));\n';
  }

  code+='Wire.endTransmission();\n';
  return code;
};


Blockly.Arduino.microduinoIICRequest = function() {
  var success = Blockly.Arduino.statementToCode(this, 'success');
  var fail = Blockly.Arduino.statementToCode(this, 'fail');
  var numSlaver = Blockly.Arduino.valueToCode(this, 'numSlaver', Blockly.Arduino.ORDER_ATOMIC);
  var numByte = Blockly.Arduino.valueToCode(this, 'numByte', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['Wire'] = '#include <Wire.h>';
  var requireFun='';
  requireFun+='boolean request(int add,int num){\n';
  requireFun+='  boolean b=0;\n';
  requireFun+='  while(Wire.available()>0){\n';
  requireFun+='    int a=0;\n';
  requireFun+='    a=Wire.read();\n';
  requireFun+='  }\n';
  requireFun+='  Wire.requestFrom(add, num);\n';
  requireFun+='  for(int a=0;a<100;a++){\n';
  requireFun+='    if(Wire.available()==num){\n';
  requireFun+='      b=1;\n';
  requireFun+='      a=100;\n';
  requireFun+='    }\n';
  requireFun+='  }\n';
  requireFun+='  return b;\n';
  requireFun+='}\n';
  Blockly.Arduino.definitions_['IICrequireFun'] = requireFun;
  Blockly.Arduino.setups_['Wire'] = 'Wire.begin();';
  var code='';
  code+='  if(request('+numSlaver+','+numByte+')==1){\n';
  code+=success;
  code+='  }\n';
  code+='  else{\n';
  code+=fail;
  code+='  }\n';
  return code;
};


Blockly.Arduino.microduinoIICReadCache = function() {
  Blockly.Arduino.definitions_['Wire'] = '#include <Wire.h>';
  Blockly.Arduino.setups_['Wire'] = 'Wire.begin();';
  var code='';
  code+='Wire.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.microduinoIICCacheLen = function() {
  Blockly.Arduino.definitions_['Wire'] = '#include <Wire.h>';
  Blockly.Arduino.setups_['Wire'] = 'Wire.begin();';
  var code='';
  code+='Wire.available()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.microduinoIMIICSlaver = function() {
  var numSlaver = Blockly.Arduino.valueToCode(this, 'numSlaver', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['Wire'] = '#include <Wire.h>';
  Blockly.Arduino.setups_['WireSlaver'+numSlaver] = 'Wire.begin('+numSlaver+');';
  var code='';
  return code;
};



Blockly.Arduino.reciverIICMasterRequest = function() {
  var requireEventDo = Blockly.Arduino.statementToCode(this, 'requireEventDo');
  Blockly.Arduino.definitions_['Wire'] = '#include <Wire.h>';
  var requestEventFun='';
  requestEventFun+='void requestEvent(){\n';
  requestEventFun+=requireEventDo;
  requestEventFun+='}\n';
  Blockly.Arduino.definitions_['IICrequestEventFun'] = requestEventFun;
  Blockly.Arduino.setups_['WireRequestEvent'] = 'Wire.onRequest(requestEvent);';
  var code='';
  return code;
};


Blockly.Arduino.microduinoIICSendToMaster = function() {
  var type = this.getFieldValue('TYPE');

  var numByte = Blockly.Arduino.valueToCode(this, 'numByte', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['Wire'] = '#include <Wire.h>';
  var code='';
  
  if(type=='string') {
    code+='Wire.write('+numByte+',String('+numByte+').length());\n';
  } else {
    code+='Wire.write('+numByte+',sizeof('+numByte+')/sizeof('+numByte+'[0]));\n';
  }
  return code;
};


Blockly.Arduino.reciverIICMasterData = function() {
  var reciverEventDo = Blockly.Arduino.statementToCode(this, 'reciverEventDo');
  Blockly.Arduino.definitions_['Wire'] = '#include <Wire.h>';
  var reciverEventFun='';
  reciverEventFun+='void receiveEvent(int howMany){\n';
  reciverEventFun+=reciverEventDo;
  reciverEventFun+='}\n';
  Blockly.Arduino.definitions_['IICreciverEventFun'] = reciverEventFun;
  Blockly.Arduino.setups_['WireReciverEvent'] = 'Wire.onReceive(receiveEvent);';
  var code='';
  return code;
};
///<jscompress sourcefile="IRCommunication_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');


Blockly.Arduino.IRSenderCode = function() {

  Blockly.Arduino.definitions_['define_ir_recv'] = '#include <IRremote.h>\n';
  Blockly.Arduino.definitions_['var_ir_send'] = 'IRsend irsend;\n';
  var data = Blockly.Arduino.valueToCode(this, 'data',Blockly.Arduino.ORDER_ATOMIC) || '0';
  var bits = Blockly.Arduino.valueToCode(this, 'bits',Blockly.Arduino.ORDER_ATOMIC) || '0';
  var type = this.getFieldValue('TYPE');
  var code='irsend.send'+type+'('+data+','+bits+');\n';
  return code;
};


Blockly.Arduino.IRSenderRaw = function() {

  Blockly.Arduino.definitions_['define_ir_recv'] = '#include <IRremote.h>\n';
  Blockly.Arduino.definitions_['var_ir_send'] = 'IRsend irsend;\n';
  var length = Blockly.Arduino.valueToCode(this, 'length',Blockly.Arduino.ORDER_ATOMIC) || '0';
  var freq = Blockly.Arduino.valueToCode(this, 'freq',Blockly.Arduino.ORDER_ATOMIC) || '0';
  var text = this.getTitleValue('TEXT');
  var code='unsigned int buf_raw['+length+']={'+text+'};\n'
  code=code+'irsend.sendRaw(buf_raw,'+length+','+freq+');\n';
  return code;
  
};

Blockly.Arduino.IRReciver = function() {
   var variable = Blockly.Arduino.variableDB_.getName(this.getTitleValue('VAR'), Blockly.Variables.NAME_TYPE);
   Blockly.Arduino.definitions_['var_declare'+variable] = 'long '+variable+';';
   var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
   var branch = Blockly.Arduino.statementToCode(this, 'DO');
   var branch2 = Blockly.Arduino.statementToCode(this, 'DO2');
   var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
   Blockly.Arduino.definitions_['define_ir_recv'] = '#include <IRremote.h>\n';
   //Blockly.Arduino.definitions_['var_declare'+varName] = 'long '+varName+';\n';
   Blockly.Arduino.definitions_['var_ir_recv'+dropdown_pin] = 'IRrecv irrecv_'+dropdown_pin+'('+dropdown_pin+');\ndecode_results results_'+dropdown_pin+';\n';
   Blockly.Arduino.setups_['setup_ir_recv_'+dropdown_pin] = 'irrecv_'+dropdown_pin+'.enableIRIn();';
   var code="if (irrecv_"+dropdown_pin+".decode(&results_"+dropdown_pin+")) {\n"
   code += '  '+variable+'=results_'+dropdown_pin+'.value;\n';
   code += '  String type="UNKNOWN";\n';
   ////////////////////////////////////////////////////////////////
   code += '  String typelist[14]={"UNKNOWN", "NEC", "SONY", "RC5", "RC6", "DISH", "SHARP", "PANASONIC", "JVC", "SANYO", "MITSUBISHI", "SAMSUNG", "LG", "WHYNTER"};\n';
   code += '  if(results_'+dropdown_pin+'.decode_type>=1&&results_'+dropdown_pin+'.decode_type<=13){\n';
   code += '    type=typelist[results_'+dropdown_pin+'.decode_type];\n'
   code += '  }\n';
   ////////////////////////////////////////////////////////////////
   //code += '  switch(results_'+dropdown_pin+'.decode_type) {\n';
   //code += '  case NEC:\n';
   //code += '    type="NEC";\n';
   //code += '    break;\n';
   //code += '  case WHYNTER:\n';
   //code += '    type="WHYNTER";\n';
   //code += '    break;\n';
   //code += '  case SONY:\n';
   //code += '    type="SONY";\n';
   //code += '    break;\n';
   //code += '  case RC5:\n';
   //code += '    type="RC5";\n';
   //code += '    break;\n';
   //code += '  case RC6:\n';
   //code += '    type="RC6";\n';
   //code += '    break;\n';
   //code += '  case DISH:\n';
   //code += '    type="DISH";\n';
   //code += '    break;\n';
   //code += '  case SHARP:\n';
   //code += '    type="SHARP";\n';
   //code += '    break;\n';
   //code += '  case SAMSUNG:\n';
   //code += '    type="SAMSUNG";\n';
   //code += '    break;\n';
   //code += '  default:\n';
   //code += '    type="UNKNOWN";\n';
   //code += '  }\n';
   ////////////////////////////////////////////////////////////////
   code += '  Serial.print("IR TYPE:"+type+"  ");\n';
   code += branch;
   code +='  irrecv_'+dropdown_pin+'.resume();\n'
   code +='} else {\n';
   code +=branch2;
   code +='}\n';
   return code;
};



Blockly.Arduino.IRReciverRaw = function() {
   var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
   Blockly.Arduino.definitions_['define_ir_recv'] = '#include <IRremote.h>\n';
   Blockly.Arduino.definitions_['var_ir_recv'+dropdown_pin] = 'IRrecv irrecv_'+dropdown_pin+'('+dropdown_pin+');\ndecode_results results_'+dropdown_pin+';\n';
   if(Blockly.Arduino.setups_['setup_serial_Serial'+profile.default.serial]){
   }else{
   Blockly.Arduino.setups_['setup_serial_Serial'+profile.default.serial] = 'Serial.begin('+profile.default.serial+');'; 
   }
   Blockly.Arduino.setups_['setup_ir_recv_'+dropdown_pin] = 'irrecv_'+dropdown_pin+'.enableIRIn();\n';
   var code="if (irrecv_"+dropdown_pin+".decode(&results_"+dropdown_pin+")) {\n"
   code += '  '+'dumpRaw(&results_'+dropdown_pin+');\n';
   code +='  irrecv_'+dropdown_pin+'.resume();\n'
   code +='}\n';
   var funcode='void dumpRaw(decode_results *results) {\n' 
  + '  int count = results->rawlen;\n'
  + '  Serial.print("RawData (");\n'
  + '  Serial.print(count, DEC);\n'
  + '  Serial.print("): ");\n'
  + '  for (int i = 0; i < count; i++) {\n'
  + '    Serial.print(results->rawbuf[i]*USECPERTICK, DEC);\n'
  + '    if(i!=count-1){\n'
  + '      Serial.print(",");\n'
  + '    }\n'
  + '  }\n'
  + '  Serial.println("");\n'
  + '}\n';
   Blockly.Arduino.definitions_['dumpRaw'] = funcode;
   return code;
};



Blockly.Arduino.IRReciverEnable = function() {
   var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
   var code='';
    code+='irrecv_'+dropdown_pin+'.enableIRIn(); \n';
   return code;
};
///<jscompress sourcefile="NFC_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.NFC_Format = function() {
  Blockly.Arduino.definitions_['define_includes'] = '#include <Wire.h>\n'
 +'#include <Adafruit_NFCShield_I2C.h>\n';

  Blockly.Arduino.definitions_['define_options'] = '#define IRQ                     (2)\n'
 	 +'#define NR_SHORTSECTOR          (32)\n' 
 	 +'#define NR_LONGSECTOR           (8)\n'
 	 +'#define NR_BLOCK_OF_SHORTSECTOR (4)\n'
 	 +'#define NR_BLOCK_OF_LONGSECTOR  (16)\n'
 	 +'#define BLOCK_NUMBER_OF_SECTOR_TRAILER(sector) (((sector)<NR_SHORTSECTOR)? \n'
   +'((sector)*NR_BLOCK_OF_SHORTSECTOR + NR_BLOCK_OF_SHORTSECTOR-1):\n'
   +'(NR_SHORTSECTOR*NR_BLOCK_OF_SHORTSECTOR + (sector-NR_SHORTSECTOR)*NR_BLOCK_OF_LONGSECTOR + NR_BLOCK_OF_LONGSECTOR-1))\n'
   +'#define BLOCK_NUMBER_OF_SECTOR_1ST_BLOCK(sector) (((sector)<NR_SHORTSECTOR)? \n'
   +'((sector)*NR_BLOCK_OF_SHORTSECTOR):\n'
   +'(NR_SHORTSECTOR*NR_BLOCK_OF_SHORTSECTOR + (sector-NR_SHORTSECTOR)*NR_BLOCK_OF_LONGSECTOR))\n'
   +'(NR_SHORTSECTOR*NR_BLOCK_OF_SHORTSECTOR + (sector-NR_SHORTSECTOR)*NR_BLOCK_OF_LONGSECTOR))\n'
   +'static const uint8_t KEY_DEFAULT_KEYAB[6] = {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF};\n'
   +'Adafruit_NFCShield_I2C nfc(IRQ);\n';

  Blockly.Arduino.setups_['setup_NFC'] = ' Serial.begin(115200);\n'
  +'Serial.println("Looking for PN532...");\n'
  +'nfc.begin();\n'
  +'uint32_t versiondata = nfc.getFirmwareVersion();\n'
  +'if (! versiondata) {\n'
  +'Serial.print("Didn"t find PN53x board");\n'
  +'while (1);\n'
  +'}\n'
  +'Serial.print("Found chip PN5"); Serial.println((versiondata>>24) & 0xFF, HEX);\n'
  +'Serial.print("Firmware ver. "); Serial.print((versiondata>>16) & 0xFF, DEC);\n'
  +'Serial.print("."); Serial.println((versiondata>>8) & 0xFF, DEC);\n'
  +'nfc.SAMConfig();\n';

  var code = 'uint8_t success;\n'
  +'uint8_t uid[] = { 0, 0, 0, 0, 0, 0, 0 };\n'
  +'uint8_t uidLength;\n'
  +'bool authenticated = false;\n'
  +'uint8_t blockBuffer[16];\n'
  +'uint8_t blankAccessBits[3] = { 0xff, 0x07, 0x80 };\n'
  +'uint8_t idx = 0;\n'
  +'uint8_t numOfSector = 16;\n'
  +'Serial.println("Place your NDEF formatted Mifare Classic 1K card on the reader");\n'
  +'Serial.println("and press any key to continue ...");\n'
  +'while (!Serial.available());\n'
  +'while (Serial.available()) Serial.read();\n'
  +'success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, &uidLength);\n'
  +'if (success)\n'
  +'{\n'
  +'Serial.println("Found an ISO14443A card/tag");\n'
  +'Serial.print("  UID Length: ");Serial.print(uidLength, DEC);Serial.println(" bytes");\n'
  +'Serial.print("  UID Value: ");\n'
  +'nfc.PrintHex(uid, uidLength);\n'
  +'Serial.println("");\n'
  +'if (uidLength != 4)\n'
  +'{\n'
  +'Serial.println("Ooops ... this doesn"t seem to be a Mifare Classic card!");\n'
  +'return;\n'
  +'}\n'
  +'Serial.println("Seems to be a Mifare Classic card (4 byte UID)");\n'
  +'Serial.println("");\n'
  +'Serial.println("Reformatting card for Mifare Classic (please don"t touch it!) ... ");\n'
  +'for (idx = 0; idx < numOfSector; idx++)\n'
  +'{\n'
  +'success = nfc.mifareclassic_AuthenticateBlock (uid, uidLength, BLOCK_NUMBER_OF_SECTOR_TRAILER(idx), 1, (uint8_t *)KEY_DEFAULT_KEYAB);\n'
  +'if (!success)\n'
  +'{\n'
  +'Serial.print("Authentication failed for sector "); Serial.println(numOfSector);\n'
  +' return;\n'
  +' }\n'
  +'if (idx == 16)\n'
  +'{\n'
  +'memset(blockBuffer, 0, sizeof(blockBuffer));\n'
  +'if (!(nfc.mifareclassic_WriteDataBlock((BLOCK_NUMBER_OF_SECTOR_TRAILER(idx)) - 3, blockBuffer)))\n'
  +'{\n'
  +' Serial.print("Unable to write to sector "); Serial.println(numOfSector);\n'
  +' return;\n'
  +'}\n'
  +'}\n'
  +'if ((idx == 0) || (idx == 16))\n'
  +'{\n'
  +' memset(blockBuffer, 0, sizeof(blockBuffer));\n'
  +'if (!(nfc.mifareclassic_WriteDataBlock((BLOCK_NUMBER_OF_SECTOR_TRAILER(idx)) - 2, blockBuffer)))\n'
  +'{\n'
  +' Serial.print("Unable to write to sector "); Serial.println(numOfSector);\n'
  +'return;\n'
  +' }\n'
  +' }\n'
  +'else\n'
  +'{\n'
  +' memset(blockBuffer, 0, sizeof(blockBuffer));\n'
  +'if (!(nfc.mifareclassic_WriteDataBlock((BLOCK_NUMBER_OF_SECTOR_TRAILER(idx)) - 3, blockBuffer)))\n'
  +'{\n'
  +' Serial.print("Unable to write to sector "); Serial.println(numOfSector);\n'
  +' return;\n'
  +'}\n'
  +'if (!(nfc.mifareclassic_WriteDataBlock((BLOCK_NUMBER_OF_SECTOR_TRAILER(idx)) - 2, blockBuffer)))\n'
  +'{\n'
  +'Serial.print("Unable to write to sector "); Serial.println(numOfSector);\n'
  +'return;\n'
  +'}\n'
  +'}\n'
  +'memset(blockBuffer, 0, sizeof(blockBuffer));\n'
  +'if (!(nfc.mifareclassic_WriteDataBlock((BLOCK_NUMBER_OF_SECTOR_TRAILER(idx)) - 1, blockBuffer)))\n'
  +'{\n'
  +'Serial.print("Unable to write to sector "); Serial.println(numOfSector);\n'
  +'return;\n'
  +'}\n'
  +'memcpy(blockBuffer, KEY_DEFAULT_KEYAB, sizeof(KEY_DEFAULT_KEYAB));\n'
  +'memcpy(blockBuffer + 6, blankAccessBits, sizeof(blankAccessBits));\n'
  +'blockBuffer[9] = 0x69;\n'
  +'memcpy(blockBuffer + 10, KEY_DEFAULT_KEYAB, sizeof(KEY_DEFAULT_KEYAB));\n'
  +'if (!(nfc.mifareclassic_WriteDataBlock((BLOCK_NUMBER_OF_SECTOR_TRAILER(idx)), blockBuffer)))\n'
  +'{\n'
  +'Serial.print("Unable to write trailer block of sector "); Serial.println(numOfSector);\n'
  +'return;\n'
  +'}\n'
  +'}\n'
  +'}\n'
  +'Serial.println("\n\nDone!");\n'
  +'delay(1000);\n'
  +'Serial.flush();\n';

  return code;
};


Blockly.Arduino.NFC_Read = function() {
   Blockly.Arduino.definitions_['define_NFCread_include'] = '#include <Wire.h>\n'
 +'#include <Adafruit_NFCShield_I2C.h>\n'
 +' #define IRQ   (2)\n'
 +'Adafruit_NFCShield_I2C nfc(IRQ); \n';
  Blockly.Arduino.setups_['setup_NFCread'] = ' Serial.begin(115200);\n'
 +'Serial.begin(115200);\n'
 +'Serial.println("Hello!");\n'
 +' nfc.begin();\n'
 +' uint32_t versiondata = nfc.getFirmwareVersion();\n'
 +'if (! versiondata) {\n'
 +'  Serial.print("Didn"t find PN53x board");\n'
 +' while (1); // halt\n'
 +' }\n'
 +'  Serial.print("Found chip PN5"); Serial.println((versiondata >> 24) & 0xFF, HEX);\n'
 +' Serial.print("Firmware ver. "); Serial.print((versiondata >> 16) & 0xFF, DEC);\n'
 +'  Serial.print("."); Serial.println((versiondata >> 8) & 0xFF, DEC);\n'
 +' nfc.SAMConfig();\n'
 +' Serial.println("Waiting for an ISO14443A Card ...");\n';
  
  var code = 'uint8_t success;\n'
  +'uint8_t uid[] = { 0, 0, 0, 0, 0, 0, 0 };  // Buffer to store the returned UID\n'
  +'uint8_t uidLength;                        // Length of the UID (4 or 7 bytes depending on ISO14443A card type)\n'
  +'success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, &uidLength);\n'
  +' if (success) {\n'
  +'   delay(200);\n'
  +'    Serial.println("Found an ISO14443A card");\n'
  +'    Serial.print("  UID Length: "); Serial.print(uidLength, DEC); Serial.println(" bytes");\n'
  +'    Serial.print("  UID Value: ");\n'
  +'    nfc.PrintHex(uid, uidLength);\n'
  +'    Serial.println("");\n'
  +'    if (uidLength == 4)\n'
  +'    if (uidLength == 4)\n'
  +'    {\n'
  +'      Serial.println("Seems to be a Mifare Classic card (4 byte UID)");\n'
  +'      Serial.println("Trying to authenticate block 4 with default KEYA value");\n'
  +'      uint8_t keya[6] = {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF };\n'
  +'      success = nfc.mifareclassic_AuthenticateBlock(uid, uidLength, 8, 0, keya);\n'
  +'      if (success)\n'
  +'      {\n'
  +'        Serial.println("Sector 2 (Blocks 8..11) has been authenticated");\n'
  +'        uint8_t data[16];\n'
  +'        success = nfc.mifareclassic_ReadDataBlock(8, data);\n'
  +'        if (success)\n'
  +'        {\n'
  +'          Serial.println("Reading Block 8:");\n'
  +'          nfc.PrintHexChar(data, 16);\n'
  +'          Serial.println("");\n'
  +'          delay(1000);\n'
  +'        }\n'
  +'        else\n'
  +'        {\n'
  +'          Serial.println("Ooops ... unable to read the requested block.  Try another key?");\n'
  +'        }\n'
  +'      }\n'
  +'      else\n'
  +'      {\n'
  +'        Serial.println("Ooops ... authentication failed: Try another key?");\n'
  +'      }\n'
  +'    }\n'
  +'    if (uidLength == 7)\n'
  +'    {\n'
  +'      Serial.println("Seems to be a Mifare Ultralight tag (7 byte UID)");\n'
  +'      Serial.println("Reading page 4");\n'
  +'      uint8_t data[32];\n'
  +'      success = nfc.mifareultralight_ReadPage (4, data);\n'
  +'      if (success)\n'
  +'      {\n'
  +'        nfc.PrintHexChar(data, 4);\n'
  +'        Serial.println("");\n'
  +'        delay(1000);\n'
  +'      }\n'
  +'      else\n'
  +'      {\n'
  +'        Serial.println("Ooops ... unable to read the requested page!?");\n'
  +'      }\n'
  +'    }\n'
  +'  }\n'
  +'}\n';
  return code;
};

///<jscompress sourcefile="nRF24_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.nRF_Init = function() {
  var Channel = this.getFieldValue('CHANNEL');
  // var baud = this.getFieldValue('BAUD');
  var Interval = this.getFieldValue('INTERVAL');

  var nRFBeginDefine='';
  nRFBeginDefine+='#include <RF24Network.h>\n';
  nRFBeginDefine+='#include <RF24.h>\n';
  nRFBeginDefine+='#include <SPI.h>\n';
  nRFBeginDefine+='RF24 radio(9,10);\n';
  nRFBeginDefine+='RF24Network network(radio);\n';
  nRFBeginDefine+='const uint16_t this_node = 1;\n';
  nRFBeginDefine+='const uint16_t other_node = 0;\n';
  nRFBeginDefine+='const unsigned long interval = '+Interval+';\n';
  nRFBeginDefine+='unsigned long last_sent;\n';
  nRFBeginDefine+='\n';

  Blockly.Arduino.definitions_['define_nRFBeginDefine'] = nRFBeginDefine;

  var nRFSetup='';
  nRFSetup+='SPI.begin();\n';
  nRFSetup+='SPI.begin();\n';
  nRFSetup+='network.begin(/*channel*/ '+Channel+', /*node address*/ this_node);\n';

  Blockly.Arduino.setups_['setup_nRFSetup'] = nRFSetup;
  var code = '';
  return code;
};

Blockly.Arduino.nRF_Send = function() {

  var branch = Blockly.Arduino.statementToCode(this, 'DO');

  var code='network.update();';
  code+='unsigned long now = millis();\n';
  code+='if ( now - last_sent >= interval  ) {\n';
  code+='last_sent = now;\n';
  code+=branch;
  code+='RF24NetworkHeader header(/*to node*/ other_node);\n';
  code+='bool ok = network.write(header,&payload,sizeof(payload));\n';
  code+='}\n';

  return code;
};


Blockly.Arduino.nRF_Read = function() {
  var branch = Blockly.Arduino.statementToCode(this, 'DO');

  var code='';
  code+='network.update();\n';
  code+='while ( network.available() ) {\n';
  code+='RF24NetworkHeader header;\n';
  code+='payload_t payload;\n';
  code+='network.read(header,&payload,sizeof(payload));\n';
  code+=branch;
  code+='}\n';
  code+='\n';

  return code;
};
///<jscompress sourcefile="smartRF_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.smartRF_Init_Send = function() {
  var flip = this.getFieldValue('BAUD');
  var Frequency = this.getFieldValue('FREQ');
  var SenderADDRESS = this.getFieldValue('SenderADDRESS');
  var ReceiverADDRESS = this.getFieldValue('ReceiverADDRESS');

  Blockly.Arduino.definitions_['define_smartRF_include'] = '#include "EEPROM.h"\n'
	+'#include "cc1101.h"\n';
  Blockly.Arduino.definitions_['define_smartRF_option'] = 'byte syncWord[] = {19, 9};\n'
 	 +'byte senderAddress = '+SenderADDRESS+';\n' 
 	 +'byte receiverAddress = '+ReceiverADDRESS+';\n'
 	 +'CC1101 cc1101;\n';
  Blockly.Arduino.setups_['setup_Serial'] = 'Serial.begin('+flip+');\n'
	 +' Serial.println("start");\n';
  Blockly.Arduino.setups_['setup_smartRF_Option'] = 'cc1101.init();\n'
  	 +'cc1101.setCarrierFreq('+Frequency+');\n'
  	 +'cc1101.setSyncWord(syncWord, false);\n'
  	 +'cc1101.setDevAddress(senderAddress, false);\n'
  	 +'Serial.println("device initialized");\n'
  	 +'Serial.print("set sender address to ");\n'
  	 +'Serial.println(senderAddress);\n'
  	 +'Serial.println("done");\n';
  var code = '\n';

  return code;
};


Blockly.Arduino.smartRF_Init_Read = function() {
  var flip = this.getFieldValue('BAUD');
  var Frequency = this.getFieldValue('FREQ');
  var ReceiverADDRESS = this.getFieldValue('ReceiverADDRESS');

  Blockly.Arduino.definitions_['define_smartRF_include'] = '#include "EEPROM.h"\n'
  +'#include "cc1101.h"\n';
  Blockly.Arduino.definitions_['define_smartRF_option'] = 'byte syncWord[] = {19, 9};\n'
   +'byte receiverAddress = '+ReceiverADDRESS+';\n'
   +'CC1101 cc1101;\n'
   +'boolean packetAvailable = false;\n'
   +'void cc1101signalsInterrupt(void){\n'
   +'packetAvailable = true;\n'
   +'}\n';
  Blockly.Arduino.setups_['setup_Serial'] = 'Serial.begin('+flip+');\n'
   +' Serial.println("start");\n';
  Blockly.Arduino.setups_['setup_smartRF_Option'] = 'cc1101.init();\n'
  +'cc1101.setCarrierFreq('+Frequency+');\n'
  +'cc1101.setSyncWord(syncWord, false);\n'
  +'cc1101.setDevAddress(receiverAddress, false);\n'
  +'cc1101.enableAddressCheck();\n'
  +'cc1101.setRxState();\n'
  +'attachInterrupt(0, cc1101signalsInterrupt, FALLING);\n'
  +'Serial.println("setup done");\n';
  var code = '\n';

  return code;
};




Blockly.Arduino.smartRF_Send = function() {
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
  var smartRF_Data = this.getFieldValue('smartRF_Data');
  var smartRF_Data_Length = this.getFieldValue('smartRF_Data_Length');
  
  var code = 'CCPACKET '+smartRF_Data+';\n'
  +'data.length='+smartRF_Data_Length+';\n'
  +branch
  +'if(cc1101.sendData('+smartRF_Data+'))\n'
  +'{\n'
  +'Serial.print("ok ");\n'
  +'}else{\n'
  +'Serial.print("failed ");\n'
  +'}\n';

    return code;
};

Blockly.Arduino.smartRF_Read = function() {
  var smartRF_Read_Data = this.getFieldValue('smartRF_REC_Data');

  var code = ' if(packetAvailable){\n'
  +'packetAvailable = false;\n'
  +'CCPACKET '+smartRF_Read_Data+';'
  +'detachInterrupt(0);\n'
  +'if(cc1101.receiveData(&'+smartRF_Read_Data+') > 0){\n'
  +'if ('+smartRF_Read_Data+'.crc_ok && '+smartRF_Read_Data+'.length > 1){\n'
  +'Serial.print("'+smartRF_Read_Data+': len");\n'
  +'Serial.print('+smartRF_Read_Data+'.length);\n'
  +'Serial.print(" data1: ");\n'
  +'Serial.println('+smartRF_Read_Data+'.data[1]);\n'
  +'}\n'
  +'}\n'
  +'attachInterrupt(0, cc1101signalsInterrupt, FALLING);\n'
  +'}\n'
  +'}\n';
    return code;
};
///<jscompress sourcefile="W5500_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.W5500_Init = function() {
  Blockly.Arduino.definitions_['define_buffer'] = '#define buffer_NUM 200';
  Blockly.Arduino.definitions_['define_parameter'] = 'byte mac[] = {0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED};\n'
  +'IPAddress ip(192,168,199,123);\n'
  +'IPAddress gateway(192,168,199, 1);\n'
  +'IPAddress subnet(255, 255, 255, 0);\n'
  +'EthernetServer server(80);\n'
  +'byte buffer[buffer_NUM];';
  Blockly.Arduino.definitions_['define_unit'] = 'EthernetClient client;';

  Blockly.Arduino.setups_['setup_Serial'] = 'Serial.begin(115200);';
  Blockly.Arduino.setups_['setup_Serverbegin'] = 'Serial.begin(115200);\n'
  +'Ethernet.begin(mac, ip, gateway, subnet);\n'
  +'server.begin();\n'
  +'Serial.print("server is at ");\n'
  +'Serial.println(Ethernet.localIP());';
  
  var code = 'server.available();';
   return [code, Blockly.Arduino.ORDER_ATOMIC];
};

///<jscompress sourcefile="WIFI_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');



Blockly.Arduino.WiFi = function() {
  var SSID = this.getFieldValue('SSID');
  var WiFiPASS = this.getFieldValue('WiFiPASS');
  var HOST_NAME = this.getFieldValue('HOST_NAME');
  var HOST_PORT = this.getFieldValue('HOST_PORT');
  var WEBPAGE = this.getFieldValue('WEBPAGE');


  var branch = Blockly.Arduino.statementToCode(this, 'WiFiInput');

  var WiFiDefine='#include "ESP8266.h"\n';
  WiFiDefine+='#define SSID "'+SSID+'"\n';
  WiFiDefine+='#define PASSWORD "'+WiFiPASS+'"\n';
  WiFiDefine+='#define HOST_NAME "'+HOST_NAME+'"\n';
  WiFiDefine+='#define HOST_PORT ('+HOST_PORT+')\n';
  WiFiDefine+='#define WEBPAGE "'+WEBPAGE+'"\n';
  WiFiDefine+='ESP8266 wifi(Serial1);\n';
  WiFiDefine+='String postString;\n';

  Blockly.Arduino.definitions_['var_WiFiDefine'] = WiFiDefine;





  var WiFiInit='Serial.println("setup begin");\n';
  WiFiInit+='Serial.print("FW Version:");\n';
  WiFiInit+='Serial.println(wifi.getVersion().c_str());\n';
  WiFiInit+='if (wifi.setOprToStationSoftAP()) {\n';
  WiFiInit+=' Serial.println("to station + softap ok");\n';
  WiFiInit+='} else {\n';
  WiFiInit+=' Serial.println("to station + softap err");\n';
  WiFiInit+='}\n';
  WiFiInit+='if (wifi.joinAP(SSID, PASSWORD)) {\n';
  WiFiInit+=' Serial.println("Join AP success");\n';
  WiFiInit+=' Serial.print("IP:");\n';
  WiFiInit+=' Serial.println( wifi.getLocalIP().c_str());\n';
  WiFiInit+='} else {\n';
  WiFiInit+=' Serial.println("Join AP failure");\n';
  WiFiInit+='}\n';
  WiFiInit+='if (wifi.disableMUX()) {\n';
  WiFiInit+=' Serial.println("single ok");\n';
  WiFiInit+='} else {\n';
  WiFiInit+=' Serial.println("single err");\n';
  WiFiInit+='}\n';
  WiFiInit+='Serial.println("setup end");\n';

  Blockly.Arduino.setups_['setup_WiFiInit'] = WiFiInit;






  var code="uint8_t buffer[1024] = {0};\n";
  code+='if (wifi.createTCP(HOST_NAME, HOST_PORT)) {\n';
  code+=' Serial.println("create tcp ok");\n';
  code+='} else {\n';
  code+=' Serial.println("create tcp err");\n';
  code+='}\n';

  code+='postString="GET ";\n';
  code+='postString+=WEBPAGE;\n';
  code+='postString+=" HTTP/1.1";\n';
  code+='postString+="\\r\\n";\n';
  code+='postString+="Host: "; \n';
  code+='postString+=HOST_NAME;\n';
  code+='postString+="\\r\\n";\n';
  code+='postString+="Connection: close";\n';
  code+='postString+="\\r\\n\\r\\n";\n';


  //code+=branch;


  code+='const char *postArray = postString.c_str();\n';
  code+='Serial.println(postArray);\n';
  code+='wifi.send((const uint8_t*)postArray, strlen(postArray));\n';
  code+='uint32_t len = wifi.recv(buffer, sizeof(buffer), 10000);\n';
  code+='if (len > 0) {\n';
  code+=' Serial.print("Received:[");\n';
  code+=' for(uint32_t i = 0; i < len; i++) {\n';
  code+='   Serial.print((char)buffer[i]);\n';
  code+=' }\n';
  code+=' Serial.println("]");\n';
  code+='}\n';
  code+='if (wifi.releaseTCP()) {\n';
  code+=' Serial.println("release tcp ok");\n';
  code+='} else {\n';
  code+=' Serial.println("release tcp err");\n';
  code+='}\n';
  code+='while(1);\n';
  

  //return [code, Blockly.Arduino.ORDER_ATOMIC];
  return code;
};



Blockly.Arduino.WiFiBlynk = function() {
  var SSID = this.getFieldValue('SSID');
  var WiFiPASS = this.getFieldValue('WiFiPASS');
  var authToken = this.getFieldValue('authToken');

  //var branch = Blockly.Arduino.statementToCode(this, 'WiFiInput');

  // var WiFiDefine='#define BLYNK_PRINT Serial\n';
  // WiFiDefine+='#include <ESP8266_HardSer.h>\n';
  // WiFiDefine+='#include <BlynkSimpleShieldEsp8266_HardSer.h>\n';
  
  // WiFiDefine+='#define EspSerial Serial1\n';
  // WiFiDefine+='ESP8266 wifi(EspSerial);\n';
  // WiFiDefine+='char auth[] = "'+authToken+'";\n';
  // WiFiDefine+='\n';
  // WiFiDefine+='\n';

    /*********************test******************************/
  var  WiFiDefine='#include <ESP8266_HardSer.h>\n';
  WiFiDefine+='#include <BlynkSimpleShieldEsp8266_HardSer.h>\n';
  WiFiDefine+='#if defined(__AVR_ATmega32U4__)\n';
  WiFiDefine+='#define BLYNK_PRINT Serial\n';
  WiFiDefine+='#define EspSerial Serial1\n';
  WiFiDefine+='#else if defined(__AVR_ATmega328P__) || (__AVR_ATmega1284P__) || defined(__AVR_ATmega644P__) || defined(__AVR_ATmega128RFA1__)\n';
  WiFiDefine+='#include <SoftwareSerial.h>\n';
  WiFiDefine+='SoftwareSerial mySerial(2, 3); // RX, TX\n';
  WiFiDefine+='#define BLYNK_PRINT mySerial\n';
  WiFiDefine+='#define EspSerial Serial\n';
  WiFiDefine+='#endif\n';
  WiFiDefine+='ESP8266 wifi(EspSerial);\n';
  WiFiDefine+='char auth[] = "'+authToken+'";\n';
  WiFiDefine+='\n';
  WiFiDefine+='\n';
  /*********************test^*****************************/

  Blockly.Arduino.definitions_['var_WiFiBlynkDefine'] = WiFiDefine;

  var WiFiInit='EspSerial.begin(115200);\n';
  WiFiInit+='delay(10);\n';
  WiFiInit+='Blynk.begin(auth, wifi, "'+SSID+'", "'+WiFiPASS+'");\n';
  Blockly.Arduino.setups_['setup_WiFiBlynkInit'] = WiFiInit;


  var code='Blynk.run();\n';
  code+='\n';
  //code+=branch;
  code+='\n';
  
  //return [code, Blockly.Arduino.ORDER_ATOMIC];
  return code;
};


Blockly.Arduino.BLYNK_READ = function() {
  var virtualPort = this.getFieldValue('virtualPort');
  var blynkReadInput = Blockly.Arduino.valueToCode(this, 'blynkReadInput', Blockly.Arduino.ORDER_ATOMIC)
  var BlynkRead='';
  BlynkRead+='BLYNK_READ('+virtualPort+') {\n';
  BlynkRead+='\n';
  BlynkRead+='  Blynk.virtualWrite('+virtualPort+', '+blynkReadInput+');\n';
  BlynkRead+='}\n';
  Blockly.Arduino.definitions_['var_BlynkRead'+virtualPort] = BlynkRead;
  var code='';
  return code;
};

Blockly.Arduino.BLYNK_WRITE = function() {
  var virtualPort = this.getFieldValue('virtualPort');
  //var blynkReadInput = Blockly.Arduino.valueToCode(this, 'blynkReadInput', Blockly.Arduino.ORDER_ATOMIC)
  var branch = Blockly.Arduino.statementToCode(this, 'blynkWriteInput');

  var BlynkWrite='';
  BlynkWrite+='BLYNK_WRITE('+virtualPort+') {\n';
  BlynkWrite+=branch;
  BlynkWrite+='\n';
  BlynkWrite+='}\n';
  Blockly.Arduino.definitions_['var_BlynkWrite'+virtualPort] = BlynkWrite;
  var code='';
  return code;
};

Blockly.Arduino.BLYNKParamOne = function() {
  var paramType = this.getTitleValue('paramType');
  var code='';
  code+='param.'+paramType;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.BLYNKParamArray = function() {
  var paramNum = Blockly.Arduino.valueToCode(this, 'paramNum', Blockly.Arduino.ORDER_ATOMIC)
  var paramType = this.getTitleValue('paramType');
  var code='';
  code+='param['+paramNum+'].'+paramType;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.WiFiBlynkTimer = function() {

  var branch = Blockly.Arduino.statementToCode(this, 'blynkTimerDoing');
  Blockly.Arduino.definitions_['BlynkTimerInclude'] = '#include <SimpleTimer.h>';
  var timerName = this.getTitleValue('timerName');
  var duration = this.getTitleValue('duration');
  
  Blockly.Arduino.definitions_['BlynkTimerDefine'+timerName] = 'SimpleTimer '+timerName+'Timer;';

  Blockly.Arduino.setups_['setup_BlynkTimer'+timerName+'Timer'] = timerName+'Timer.setInterval('+duration+'L, Sender'+timerName+');';

  var timerFun='';
  timerFun+='void Sender'+timerName+'() {\n';
  timerFun+=branch;
  timerFun+='}\n';

  Blockly.Arduino.definitions_['BlynkTimerFunction'+timerName] = timerFun;


  var code='';
  code+=timerName+'Timer.run();\n';
  //return [code, Blockly.Arduino.ORDER_ATOMIC];
  return code;
};



Blockly.Arduino.WiFiBlynkVirtualWrite = function() {
  var virtualPort = this.getFieldValue('virtualPort');
  var senderDataToBlynk = Blockly.Arduino.valueToCode(this, 'senderDataToBlynk', Blockly.Arduino.ORDER_ATOMIC)

  var code='';
  code+='Blynk.virtualWrite('+virtualPort+', '+senderDataToBlynk+');\n';
  return code;
};
///<jscompress sourcefile="Zigbee_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.Zigbee_AT = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['define_Software'] = '#include <SoftwareSerial.h>';
  if(dropdown_pin=='Serial'||dropdown_pin=='Serial1')
  Blockly.Arduino.definitions_['define_mySerial'] = '#define my_Serial '+dropdown_pin+'';
  else
  {
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = 'SoftwareSerial '+ dropdown_pin+';';
  Blockly.Arduino.definitions_['define_mySerial'] = '#define my_Serial  mySerial';  
  }
  Blockly.Arduino.definitions_['define_String1'] = 'String myStringSoftCom="";';  
  Blockly.Arduino.definitions_['define_String2'] = 'String myStringHardCom="";';  

  Blockly.Arduino.setups_['setup_Zigbee'] = 'my_Serial.begin(9600);';
  Blockly.Arduino.setups_['setup_Zigbee_Serial'] = 'Serial.begin(9600);';

  var code = 'while (Serial.available() > 0)\n';
   code += '{\n';
   code += 'myStringHardCom += char(Serial.read());\n';
   code += 'delay(2);\n';
   code += '}\n';
   code += 'if(myStringHardCom!="")\n';
   code += 'mySerial.println(myStringHardCom)\n';
   code += 'myStringHardCom="";\n';  
   code += 'while(mySerial.available() > 0)\n';
   code += '{\n';
   code += 'myStringSoftCom += char(mySerial.read());\n';
   code += 'delay(2);\n';
   code += '}\n';    
   code += 'if (myStringSoftCom.length() > 0)\n';  
   code += '{\n';  
   code += 'Serial.print(myStringSoftCom);\n';    
   code += 'myStringSoftCom="";\n';  
   code += '}\n'; 
   code += 'delay(100);\n';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Zigbee_Init = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var BRate = Blockly.Arduino.valueToCode(this, 'BRate', Blockly.Arduino.ORDER_ATOMIC)
  Blockly.Arduino.definitions_['define_SoftwareSerials'] = '#include <SoftwareSerial.h>';

  if(dropdown_pin=='Serial'||dropdown_pin=='Serial1')
  Blockly.Arduino.definitions_['define_mySerial'] = '#define my_Serial '+dropdown_pin+'';
  else
  {
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = 'SoftwareSerial '+ dropdown_pin+';';
  Blockly.Arduino.definitions_['define_mySerial'] = '#define my_Serial  mySerial';  
  }
  
  Blockly.Arduino.setups_['setup_mCookie_bluetooth'] = 'my_Serial.begin('+BRate+');';
  Blockly.Arduino.setups_['setup_mCookie_Serial'] = 'Serial.begin('+BRate+');';


  var code = '';
  
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.Zigbee_Read = function() {

  var code = 'my_Serial.readString()';
  
  return  [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Zigbee_Send = function() {
  var str = Blockly.Arduino.valueToCode(this, 'text', Blockly.Arduino.ORDER_ATOMIC) || 'String(\"\")'
 
  var code = 'my_Serial.println('+str+');\n';
 
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.Zigbee_Available = function() {
  var code = 'my_Serial.available()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.VariableIs = function() {
  var VariableName = Blockly.Arduino.valueToCode(this, 'VariableName', Blockly.Arduino.ORDER_ATOMIC)
  var VariableIs = Blockly.Arduino.valueToCode(this, 'VariableIs', Blockly.Arduino.ORDER_ATOMIC)

  code = ''+VariableName+''+'=='+''+VariableIs+'';

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

///<jscompress sourcefile="serial_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');


Blockly.Arduino.serialBegin = function() {
  //var branch = Blockly.Arduino.statementToCode(this, 'DO');


  var flip = this.getFieldValue('FLIP');


  Blockly.Arduino.setups_['setup_baud'] = 'Serial.begin('+flip+');';

  //var flip = this.getFieldValue('FLIP');
  var code='';
  //code+='strip.show();\n'
  // code+='do {\n';
  //code+=branch;
  // code+='} while( oled.nextPage() );\n';

  return code;
};


Blockly.Arduino.serialPrint = function() {
  //var branch = Blockly.Arduino.statementToCode(this, 'DO');
  var serialData = Blockly.Arduino.valueToCode(this, 'serialData', Blockly.Arduino.ORDER_ATOMIC) || '';

  //var flip = this.getFieldValue('FLIP');
  var code='Serial.print('+serialData+');\n';
  //code+='strip.show();\n'
  // code+='do {\n';
  // code+=branch;
  // code+='} while( oled.nextPage() );\n';

  //return [code, Blockly.Arduino.ORDER_ATOMIC];
  return code;
  
};

Blockly.Arduino.serialPrintln = function() {
  var serialData = Blockly.Arduino.valueToCode(this, 'serialData', Blockly.Arduino.ORDER_ATOMIC) || '';
  var code='Serial.println('+serialData+');\n';
  //return [code, Blockly.Arduino.ORDER_ATOMIC];
  return code;
  
};



Blockly.Arduino.microduinoAnaloyWrite = function() {
  var mCookie_pwmPin = this.getTitleValue('mCookie_pwmPin');
  var pwmNumber = Blockly.Arduino.valueToCode(this, 'pwmNumber', Blockly.Arduino.ORDER_ATOMIC)

  var code='';
  code = 'analogWrite('+mCookie_pwmPin+','+pwmNumber+');\n';

  return code;
};



Blockly.Arduino.microduinoWatting = function() {
  var wait = Blockly.Arduino.valueToCode(this, 'wait',Blockly.Arduino.ORDER_ATOMIC) || 'false';

  var code='';
  code+='while(!'+wait+');\n';
  return code;
};

Blockly.Arduino.microduinoWhile = function() {
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
  var wait = Blockly.Arduino.valueToCode(this, 'wait',Blockly.Arduino.ORDER_ATOMIC) || 'false';

  var code='';
  code+='while('+wait+') {\n';
  code+=branch+'\n';
  code+='}\n';
  return code;
};


Blockly.Arduino.microduinoFor = function() {
  // For loop.
  var variable0 = Blockly.Arduino.variableDB_.getName(
      this.getTitleValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Arduino.valueToCode(this, 'FROM',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var argument1 = Blockly.Arduino.valueToCode(this, 'TO',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var step =  window.parseFloat(this.getTitleValue('STEP'));
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
  if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
    branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + this.id + '\'') + branch;
  }
  var code;
  var down = step<0;
  if (argument0.match(/^-?\d+(\.\d+)?$/) &&
      argument1.match(/^-?\d+(\.\d+)?$/)) {
    code = 'for (int ' + variable0 + ' = ' + argument0 + '; ' +
        variable0 + (down ? ' >= ' : ' <= ') + argument1 + '; ' +
        variable0 + ' = '  + variable0 + ' + (' +step+')) {\n' +
        branch + '}\n';
  }else {
      //涉及到变量
      code = 'for (int ' + variable0 + ' = (' + argument0 + '); ' +
      variable0 + (down ? ' >= ' : ' <= ')+'(' + argument1 + '); ' +
      variable0 + ' = '  + variable0 + ' + (' +step+')) {\n' +
      branch + '}\n';
  }
  return code;
};



Blockly.Arduino.microduinoAnaloyRead = function() {
  var analogPin = this.getFieldValue('analogPin');
  Blockly.Arduino.setups_['setup_'+analogPin] = 'pinMode('+analogPin+',INPUT);';
  var code='';
  code+='analogRead('+analogPin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.microduinoSerailAvailable = function() {
  var serailType = this.getTitleValue('serailType');


  var code='';
  code+=serailType+'.available()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
///<jscompress sourcefile="softwareSerial_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');


/*****
ray add for ws2812
****/

Blockly.Arduino.ws2812Begin = function() {
  //var branch = Blockly.Arduino.statementToCode(this, 'DO');

  var LEDNumber = Blockly.Arduino.valueToCode(this, 'LEDNumber', Blockly.Arduino.ORDER_ATOMIC)
  var LEDPin = Blockly.Arduino.valueToCode(this, 'LEDPin', Blockly.Arduino.ORDER_ATOMIC)

  Blockly.Arduino.definitions_['define_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
  Blockly.Arduino.definitions_['var_Adafruit_NeoPixel'] = 'Adafruit_NeoPixel strip = Adafruit_NeoPixel('+LEDNumber+', '+LEDPin+', NEO_GRB + NEO_KHZ800);';
  
  Blockly.Arduino.setups_['setup_stripBegin'] = 'strip.begin();';
  Blockly.Arduino.setups_['setup_stripShow'] ='strip.show();';

  //var flip = this.getFieldValue('FLIP');
  var code='';
  //code+='strip.show();\n'
  // code+='do {\n';
  //code+=branch;
  // code+='} while( oled.nextPage() );\n';

  return code;
};


Blockly.Arduino.ws2812Doing = function() {
  //var branch = Blockly.Arduino.statementToCode(this, 'DO');

  var LEDNumber = Blockly.Arduino.valueToCode(this, 'LEDIndex', Blockly.Arduino.ORDER_ATOMIC)
  var R = Blockly.Arduino.valueToCode(this, 'R', Blockly.Arduino.ORDER_ATOMIC)
  var G = Blockly.Arduino.valueToCode(this, 'G', Blockly.Arduino.ORDER_ATOMIC)
  var B = Blockly.Arduino.valueToCode(this, 'B', Blockly.Arduino.ORDER_ATOMIC)

  //var flip = this.getFieldValue('FLIP');
  var code='strip.setPixelColor('+LEDNumber+', strip.Color('+R+', '+G+', '+B+'));\n';
  code+='strip.show();\n'
  // code+='do {\n';
  // code+=branch;
  // code+='} while( oled.nextPage() );\n';


  return code;
};
///<jscompress sourcefile="DotMatrix_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

function hexToRgbDivid4(hex) {
    if ( hex.charAt(0) == '#' ) {
      hex = hex.substr(1);
    }
    var bigint = parseInt(hex, 16);
    var r = Math.floor(((bigint >> 16) & 255)/8);
    var g = Math.floor(((bigint >> 8) & 255)/8);
    var b = Math.floor((bigint & 255)/8);
    return '{'+r + "," + g + "," + b+"}, ";
}

Blockly.Arduino.DotMatrix = function() {
  //var branch = Blockly.Arduino.statementToCode(this, 'DO');
  var dotName = this.getFieldValue('dotName');
  var dotAddress = this.getFieldValue('dotAddress');

  var row0 = Blockly.Arduino.valueToCode(this, 'row0', Blockly.Arduino.ORDER_ATOMIC)
  var row1 = Blockly.Arduino.valueToCode(this, 'row1', Blockly.Arduino.ORDER_ATOMIC)
  var row2 = Blockly.Arduino.valueToCode(this, 'row2', Blockly.Arduino.ORDER_ATOMIC)
  var row3 = Blockly.Arduino.valueToCode(this, 'row3', Blockly.Arduino.ORDER_ATOMIC)
  var row4 = Blockly.Arduino.valueToCode(this, 'row4', Blockly.Arduino.ORDER_ATOMIC)
  var row5 = Blockly.Arduino.valueToCode(this, 'row5', Blockly.Arduino.ORDER_ATOMIC)
  var row6 = Blockly.Arduino.valueToCode(this, 'row6', Blockly.Arduino.ORDER_ATOMIC)
  var row7 = Blockly.Arduino.valueToCode(this, 'row7', Blockly.Arduino.ORDER_ATOMIC)
  
  // Blockly.Arduino.definitions_['var_Adafruit_NeoPixel'] = 'Adafruit_NeoPixel strip = Adafruit_NeoPixel('+LEDNumber+', '+LEDPin+', NEO_GRB + NEO_KHZ800);';
  Blockly.Arduino.definitions_['define_Wire'] = '#include "Wire.h"';

  var define_dotDef='uint8_t i,j,r,g,b,temp[4];\n';
  define_dotDef+='byte add;\n';

  Blockly.Arduino.definitions_['define_dotDef'] = define_dotDef;

  var setColorString='void setColor(byte add, uint8_t x, uint8_t y, uint8_t red, uint8_t green, uint8_t blue)\n';
	setColorString+='{\n';
	// setColorString+='  Wire.beginTransmission(add);\n';
  setColorString+='  Wire.beginTransmission(add);\n';
	setColorString+='  temp[0] = 0x80|(y<<3)|x;\n';
	setColorString+='  temp[1] = blue;\n';
	setColorString+='  temp[2] = 0x20|green;\n';
	setColorString+='  temp[3] = 0x40|red;\n';
	setColorString+='  Wire.write(temp, 4);\n';
	setColorString+='  Wire.endTransmission();\n';
	setColorString+='}\n';

  setColorString+='byte scanAddr() {\n';
  setColorString+=' byte error, address;\n';
  //setColorString+=' int nDevices;\n';
  //setColorString+=' nDevices = 0;\n';
  setColorString+=' for (address = 1; address < 65; address++ ) {\n';
  setColorString+='   Wire.beginTransmission(address);\n';
  setColorString+='   error = Wire.endTransmission();\n';
  setColorString+='   if (error == 0) {\n';
  //setColorString+='     if (address < 16)\n';
  //setColorString+='     nDevices++;\n';
  setColorString+='     add = address;\n';
  setColorString+='   }\n';
  setColorString+='  }\n';
  setColorString+='}\n';

  Blockly.Arduino.definitions_['define_setColorFunction'] = setColorString;

  var rgbArray='uint8_t rgbArray'+dotName+'[8][8][3]={\n';
  rgbArray+='{'+row0+'},\n';
  rgbArray+='{'+row1+'},\n';
  rgbArray+='{'+row2+'},\n';
  rgbArray+='{'+row3+'},\n';
  rgbArray+='{'+row4+'},\n';
  rgbArray+='{'+row5+'},\n';
  rgbArray+='{'+row6+'},\n';
  rgbArray+='{'+row7+'},\n';
  rgbArray+='};\n';

  Blockly.Arduino.definitions_['define_'+dotName+'_rgbSetArray'] = rgbArray;

  var setupDotMatrix='Wire.begin();\n';
  setupDotMatrix+='delay(5000);\n';
  //setupDotMatrix+='scanAddr();\n';

  Blockly.Arduino.setups_['setup_dotSet'] = setupDotMatrix;

  var code='';

  code+='for(i=0; i<8; i++)\n';
  code+='{\n'
  code+='    for(j=0; j<8; j++)\n'
  code+='    {\n'
  code+='        setColor('+dotAddress+',i,j,rgbArray'+dotName+'[i][j][0],rgbArray'+dotName+'[i][j][1],rgbArray'+dotName+'[i][j][2]);\n'
  code+='    }  \n'
  code+='}\n'

  //code+='delay(100);\n'

  return code;
  //return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.DotMatrixRow = function() {
  //var branch = Blockly.Arduino.statementToCode(this, 'DO');

  var Dot0 = this.getFieldValue('Dot0');
  var Dot1 = this.getFieldValue('Dot1');
  var Dot2 = this.getFieldValue('Dot2');
  var Dot3 = this.getFieldValue('Dot3');
  var Dot4 = this.getFieldValue('Dot4');
  var Dot5 = this.getFieldValue('Dot5');
  var Dot6 = this.getFieldValue('Dot6');
  var Dot7 = this.getFieldValue('Dot7');
  // var colorRGB = this.getFieldValue('colorRGB');

  var code='';
  code+=hexToRgbDivid4(Dot0);
  code+=hexToRgbDivid4(Dot1);
  code+=hexToRgbDivid4(Dot2);
  code+=hexToRgbDivid4(Dot3);
  code+=hexToRgbDivid4(Dot4);
  code+=hexToRgbDivid4(Dot5);
  code+=hexToRgbDivid4(Dot6);
  code+=hexToRgbDivid4(Dot7);

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.DotMatrixAddArray = function() {


  //var size=window.parseFloat(this.getTitleValue('SIZE'));
  var code = new Array(this.itemCount_);
  for (var n = 0; n < this.itemCount_; n++) {
    code[n] = Blockly.Arduino.valueToCode(this, 'ADD' + n,
        Blockly.Arduino.ORDER_NONE) || '64';
  }
  var DotMatrixDefine='';
  DotMatrixDefine+='#include "Microduino_Matrix.h"\n';
  DotMatrixDefine+='uint8_t'+' Addr[MatrixPix_X][MatrixPix_Y]'+'='+ '{{' + code.join('},\n{') + '}};\n';
  DotMatrixDefine+='Matrix display = Matrix(Addr);\n'

  Blockly.Arduino.definitions_['DotMatrixDefine'] = DotMatrixDefine;

  // var DotMatrixLogo='';
  // DotMatrixLogo+='static const unsigned char PROGMEM logo[] = {\n';
  // DotMatrixLogo+='  0x00, 0x66, 0x66, 0xDB, 0xDB, 0xDB, 0xDB, 0x00\n';
  // DotMatrixLogo+='};\n';

  // Blockly.Arduino.definitions_['DotMatrixLogo'] = DotMatrixLogo;

  Blockly.Arduino.setups_['setup_DotMatrix'] = 'Wire.begin();\n';
  Blockly.Arduino.setups_['setup_Delay'] = 'delay(2000);\n';
  //var code =''+arrayVAR+'['+size+"]"+'='+ '{' + code.join(', ') + '};\n';
  //Blockly.Arduino.setups_['setup_lists'+arrayVAR] = code;
  return '';
};

Blockly.Arduino.DotMatrixAddNum = function() {
  var addInput = Blockly.Arduino.valueToCode(this, 'addInput', Blockly.Arduino.ORDER_ATOMIC) || '';
  var thisNum=this.getTitleValue('NUM');
  var code = '';
  code +=thisNum;
  if(addInput!='') {
    code+=','+addInput;
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.getMatrixNum = function() {
  var code = '';
  code +='display.getMatrixNum()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.getMatrixDeviceAddr = function() {
  var MatrixIndex = Blockly.Arduino.valueToCode(this, 'MatrixIndex', Blockly.Arduino.ORDER_ATOMIC);
  var code='display.getDeviceAddr('+MatrixIndex+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.getMatrixHeight = function() {
  var code = '';
  code +='display.getHeight()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.getMatrixWidth = function() {
  var code = '';
  code +='display.getWidth()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.setMatrixLedColor = function() {
  var MatrixIndexX = Blockly.Arduino.valueToCode(this, 'MatrixIndexX', Blockly.Arduino.ORDER_ATOMIC);
  var MatrixIndexY = Blockly.Arduino.valueToCode(this, 'MatrixIndexY', Blockly.Arduino.ORDER_ATOMIC);
  var MatrixIndexRed = Blockly.Arduino.valueToCode(this, 'MatrixIndexRed', Blockly.Arduino.ORDER_ATOMIC);
  var MatrixIndexGreen = Blockly.Arduino.valueToCode(this, 'MatrixIndexGreen', Blockly.Arduino.ORDER_ATOMIC);
  var MatrixIndexBlue = Blockly.Arduino.valueToCode(this, 'MatrixIndexBlue', Blockly.Arduino.ORDER_ATOMIC);

  var code='';
  code+='display.setLedColor('+MatrixIndexX+', '+MatrixIndexY+', '+MatrixIndexRed+', '+MatrixIndexGreen+', '+MatrixIndexBlue+');\n';
  return code;
};


Blockly.Arduino.clearMatrixDisplay = function() {
  var code='';
  code+='display.clearDisplay();\n';
  return code;
};


Blockly.Arduino.setMatrixColor = function() {

  var MatrixRed = Blockly.Arduino.valueToCode(this, 'MatrixRed', Blockly.Arduino.ORDER_ATOMIC);
  var MatrixGreen = Blockly.Arduino.valueToCode(this, 'MatrixGreen', Blockly.Arduino.ORDER_ATOMIC);
  var MatrixBlue = Blockly.Arduino.valueToCode(this, 'MatrixBlue', Blockly.Arduino.ORDER_ATOMIC);

  var code='';
  code+='display.setColor('+MatrixRed+', '+MatrixGreen+', '+MatrixBlue+');\n';
  return code;
};


Blockly.Arduino.clearMatrixColor = function() {
  var code='';
  code+='display.clearColor();\n';
  return code;
};



Blockly.Arduino.MatrixWriteString = function() {
  var stringVar=this.getFieldValue('stringVar');
  //var MatrixShowMode = this.getFieldValue('MatrixShowMode');
  var startMatrixT = Blockly.Arduino.valueToCode(this, 'startMatrixT', Blockly.Arduino.ORDER_ATOMIC);
  var startMatrixXY = Blockly.Arduino.valueToCode(this, 'startMatrixXY', Blockly.Arduino.ORDER_ATOMIC);
  var code='';
  code+='display.writeString("'+stringVar+'", '+startMatrixT+', '+startMatrixXY+');\n';
  return code;
};


Blockly.Arduino.MD_Matrix_GeometryLine = function() {
  var type = this.getFieldValue('TYPE');

  var x0 = Blockly.Arduino.valueToCode(this, 'x0', Blockly.Arduino.ORDER_ATOMIC);
  var y0 = Blockly.Arduino.valueToCode(this, 'y0', Blockly.Arduino.ORDER_ATOMIC);
  var x1w = Blockly.Arduino.valueToCode(this, 'x1w', Blockly.Arduino.ORDER_ATOMIC);
  var y1h = Blockly.Arduino.valueToCode(this, 'y1h', Blockly.Arduino.ORDER_ATOMIC);

  var code='';

  if(type=='point') {
    code+='display.setLed('+x0+','+y0+', true);\n';
  } else if(type=='line') {
    code+='display.drawLine('+x0+','+y0+','+x1w+','+y1h+');\n';
  } else if(type=='HLine') {
    code+='display.drawHLine('+x0+','+y0+','+x1w+');\n';
  } else if(type=='VLine') {
    code+='display.drawVLine('+x0+','+y0+','+y1h+');\n';
  } 
  else if(type=='frame') {
    code+='display.drawFrame('+x0+','+y0+','+x1w+','+y1h+');\n';
  } 
  else if(type=='box') {
    code+='display.drawBox('+x0+','+y0+','+x1w+','+y1h+');\n';
  } 
  return code;
};


Blockly.Arduino.MD_Matrix_GeometryCircle = function() {
  var type = this.getFieldValue('TYPE');

  var x = Blockly.Arduino.valueToCode(this, 'x', Blockly.Arduino.ORDER_ATOMIC);
  var y = Blockly.Arduino.valueToCode(this, 'y', Blockly.Arduino.ORDER_ATOMIC);
  var rw = Blockly.Arduino.valueToCode(this, 'rw', Blockly.Arduino.ORDER_ATOMIC);
  var code='';

  if(type=='circle') {
    code+='display.drawCircle('+x+','+y+','+rw+');\n';
  } else if(type=='disc') {
    code+='display.drawDisc('+x+','+y+','+rw+');\n';
  } 

  return code;
};
///<jscompress sourcefile="Motor_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');





Blockly.Arduino.MotorBegin = function() {
  var defineMotorBegin='#include <Microduino_Motor.h>\n';
  defineMotorBegin+='#if defined(__AVR_ATmega32U4__) || (__AVR_ATmega1284P__) || defined(__AVR_ATmega644P__) || defined(__AVR_ATmega128RFA1__)\n';
  defineMotorBegin+='#define motor_pin0A 8\n';
  defineMotorBegin+='#define motor_pin0B 6\n';
  defineMotorBegin+='#define motor_pin1A 7\n';
  defineMotorBegin+='#define motor_pin1B 5\n';
  defineMotorBegin+='#else\n';
  defineMotorBegin+='#define motor_pin0A 6\n';
  defineMotorBegin+='#define motor_pin0B 8\n';
  defineMotorBegin+='#define motor_pin1A 5\n';
  defineMotorBegin+='#define motor_pin1B 7\n';
  defineMotorBegin+='#endif\n';
  defineMotorBegin+='Motor MotorLeft(motor_pin0A, motor_pin0B);\n';
  defineMotorBegin+='Motor MotorRight(motor_pin1A, motor_pin1B);\n';
  defineMotorBegin+='#define MAX_THROTTLE 255\n';
  defineMotorBegin+='#define MAX_STEERING 200\n';
  defineMotorBegin+='int16_t throttle = 0;\n';
  defineMotorBegin+='int16_t steering = 0;\n';


  Blockly.Arduino.definitions_['define_motorBegin'] = defineMotorBegin;

  var motorSetup='MotorLeft.Fix(1);\n';
  motorSetup+='MotorRight.Fix(1);\n';
  motorSetup+='delay(1000);\n';

  Blockly.Arduino.setups_['setup_mCookie_bluetooth'] = motorSetup;


  var code='';
  return code;
};

Blockly.Arduino.MotorBeginchange = function() {
  var defineMotorBegin='#include <Microduino_Motor.h>\n';
  defineMotorBegin+='#if defined(__AVR_ATmega32U4__) || (__AVR_ATmega1284P__) || defined(__AVR_ATmega644P__) || defined(__AVR_ATmega128RFA1__)\n';
  defineMotorBegin+='#define motor_pin0A 8\n';
  defineMotorBegin+='#define motor_pin0B 6\n';
  defineMotorBegin+='#define motor_pin1A 7\n';
  defineMotorBegin+='#define motor_pin1B 5\n';
  defineMotorBegin+='#else\n';
  defineMotorBegin+='#define motor_pin0A 6\n';
  defineMotorBegin+='#define motor_pin0B 8\n';
  defineMotorBegin+='#define motor_pin1A 5\n';
  defineMotorBegin+='#define motor_pin1B 7\n';
  defineMotorBegin+='#endif\n';
  defineMotorBegin+='Motor MotorLeft(motor_pin0A, motor_pin0B);\n';
  defineMotorBegin+='Motor MotorRight(motor_pin1A, motor_pin1B);\n';
  defineMotorBegin+='#define MAX_THROTTLE 255\n';
  defineMotorBegin+='#define MAX_STEERING 200\n';
  defineMotorBegin+='int16_t throttle = 0;\n';
  defineMotorBegin+='int16_t steering = 0;\n';


  Blockly.Arduino.definitions_['define_motorBegin'] = defineMotorBegin;

  var motorSetup='MotorLeft.Fix(1);\n';
  motorSetup+='MotorRight.Fix(1);\n';
  motorSetup+='delay(1000);\n';

  Blockly.Arduino.setups_['setup_mCookie_bluetooth'] = motorSetup;


  var code='';
  return code;
};

Blockly.Arduino.Motor_run = function() {

var Break_left_right = this.getFieldValue('Break_left_right');
var speed = Blockly.Arduino.valueToCode(this, 'speed',Blockly.Arduino.ORDER_ATOMIC) || '0';

//var throttle = this.getFieldValue('motor_ctrl');

var code='throttle = '+speed+';\n';

 if (Break_left_right==1)  code+='MotorLeft.Driver(MotorLeft.GetData(throttle, 0, CHAN_LEFT));\n';
 else if (Break_left_right==2) code+='MotorRight.Driver(MotorRight.GetData(-throttle, 0, CHAN_RIGHT));\n';

return code;

};

Blockly.Arduino.MotorBreak = function() {

var Break_left_right = this.getFieldValue('Break_left_right');

if (Break_left_right==1) var code='MotorLeft.Brake();\n';
else if (Break_left_right==2) var code='MotorRight.Brake();\n';

return code;

};

Blockly.Arduino.MotorFree = function() {

var Free_left_right = this.getFieldValue('Free_left_right');

if (Free_left_right==1) var code='MotorLeft.Free();\n';
else if (Free_left_right==2) var code='MotorRight.Free();\n';

return code;
};




Blockly.Arduino.microduinoCarControl = function() {

  var leftSpeed = Blockly.Arduino.valueToCode(this, 'leftSpeed',Blockly.Arduino.ORDER_ATOMIC) || '0';
  var rightSpeed = Blockly.Arduino.valueToCode(this, 'rightSpeed',Blockly.Arduino.ORDER_ATOMIC) || '0';

  var code='';
  code+='MotorLeft.Driver(MotorLeft.GetData('+leftSpeed+', 0, CHAN_LEFT));\n';
  code+='MotorRight.Driver(MotorRight.GetData('+rightSpeed+', 0, CHAN_RIGHT));\n';
  
  return code;
};



// Blockly.Arduino.Car_MotorBegin = function() {

//   // var leftSpeed = Blockly.Arduino.valueToCode(this, 'leftSpeed',Blockly.Arduino.ORDER_ATOMIC) || '0';
//   // var rightSpeed = Blockly.Arduino.valueToCode(this, 'rightSpeed',Blockly.Arduino.ORDER_ATOMIC) || '0';

//   code='ssss';
//   // code+='MotorLeft.Driver(MotorLeft.GetData('+leftSpeed+', 0, CHAN_LEFT));\n';
//   // code+='MotorRight.Driver(MotorRight.GetData('+rightSpeed+', 0, CHAN_RIGHT));\n';
  
//   return code;
// };

// Blockly.Arduino.mCookie_Motor = function() {


//   var throttle = this.getFieldValue('speed');
//   var steering = this.getFieldValue('angle');

//   var code='throttle = '+throttle+';\n';
//   code+='steering = '+steering+';\n';

//   code+='MotorLeft.Driver(MotorLeft.GetData(throttle, steering, CHAN_LEFT));\n';
//   code+='MotorRight.Driver(MotorRight.GetData(throttle, steering, CHAN_RIGHT));\n';
//   return code;
// };


// Blockly.Arduino.mCookie_bluetooth_Robot_Direction = function() {
//   var dropdown_pin = this.getTitleValue('PIN')
//   var BLE_Run_stye = this.getTitleValue('direction')
//   var code='BLE_Joystick('+BLE_Run_stye+')';

//   Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
//   Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
//   if(dropdown_pin=='Serial'||dropdown_pin=='Serial1')
//   Blockly.Arduino.definitions_['define_mySerial'] = '#define my_Serial '+dropdown_pin;
//   else
//   {
//   Blockly.Arduino.definitions_['define_SoftwareSerial'] = 'SoftwareSerial '+ dropdown_pin+';';
//   Blockly.Arduino.definitions_['define_mySerial'] = '#define my_Serial  mySerial';  
//   }

//   Blockly.Arduino.definitions_['define_stiring'] = 'String currentInfo;';
//   Blockly.Arduino.definitions_['define_data'] = 'char senderData[100];';
//   Blockly.Arduino.definitions_['define_as'] = 'int angle = 90, angle1 = 90, angle2 = 90;';
//   Blockly.Arduino.definitions_['define_sp'] = 'int speed = 0, speed1 = 0, speed2 = 0;';
//   Blockly.Arduino.definitions_['define_lage'] = '#define lage 20\n';

//   Blockly.Arduino.setups_['setup_mCookie_bluetooth'] = 'my_Serial.begin(9600);';
//   Blockly.Arduino.setups_['setup_mCookie_Serial'] = 'Serial.begin(9600);';

//   var joyName='BLE_Joystick';
//   var min='\''+'\\'+'n'+'\'';
//   var code1 = 'int ' +joyName+'(int num){\n'
//   +'if('+dropdown_pin+'.available() > 0) \n'
//   +'currentInfo = my_Serial.readStringUntil('+min+');\n'
//   +'if (currentInfo != NULL) {\n'
//   +'currentInfo.toCharArray(senderData, sizeof(senderData));\n'
//   +'sscanf((char *)strstr((char *)senderData, "D:"), "D:%d,%d", &angle, &speed);\n'
//   +'}\n'
//   +  'if (0 < angle && angle < 90 - lage || 90 + lage < angle && angle < 180){\n'
//   +  'if (0 < angle && angle < 90 - lage)\n'
//   +    'angle1 = map(angle, 0, 90 - lage, 255, 0);\n'
//   +  'else if (90 + lage < angle && angle < 180)\n'
//   +   'angle2 = map(angle, 90 + lage, 180 , 0, 255);}\n'
//   +'if (-255 < speed && speed < -lage || lage < speed && speed < 255){\n'
//   +  'if (-255 < speed && speed < -lage)\n'
//   +    'speed1 = map(speed, -255, -lage , 255, 0);\n'
//   +  'else if (lage < speed && speed < 255)\n'
//   +    'speed2 = map(speed, lage, 255, 0, 255);}\n'
//   +'if (num == 1)\n'
//   +  'return angle1;\n'
//   +'else if (num == 2)\n'
//   +  'return angle2;\n'
//   +'else if (num == 3)\n'
//   +  'return speed1;\n'
//   +'else if (num == 4)\n'
//   +  'return speed2;}\n'
//   Blockly.Arduino.definitions_[joyName] = code1;
//   return [code, Blockly.Arduino.ORDER_ATOMIC]|| '0';
//  };

///<jscompress sourcefile="OLED_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.OLED_begin = function() {
  var branch = Blockly.Arduino.statementToCode(this, 'DO');

  Blockly.Arduino.definitions_['define_oled'] = '#include "U8glib.h"';

  var defineOled='U8GLIB_SSD1306_128X64 u8g(U8G_I2C_OPT_NONE);\n';
  defineOled+='#define setFont_L u8g.setFont(u8g_font_fur20)\n';
  defineOled+='#define setFont_S u8g.setFont(u8g_font_fixed_v0r)\n';
  defineOled+='#define setFont_M u8g.setFont(u8g_font_9x18)\n';


  Blockly.Arduino.definitions_['var_oled'] = defineOled;

  var flip = this.getFieldValue('FLIP');
  var code='u8g.'+flip+'();\n';
  code+='u8g.firstPage();\n'
  code+='do {\n';
  code+=branch;
  code+='} while( u8g.nextPage() );\n';
  return code;
};

Blockly.Arduino.OLED_print = function() {
  var str = Blockly.Arduino.valueToCode(this, 'text', Blockly.Arduino.ORDER_ATOMIC) || 'String(\"\")';
  var x = Blockly.Arduino.valueToCode(this, 'x', Blockly.Arduino.ORDER_ATOMIC);
  var y = Blockly.Arduino.valueToCode(this, 'y', Blockly.Arduino.ORDER_ATOMIC);
  var type = this.getFieldValue('TYPE');
  //var code='oled.setFont('+type+');\n';
  var code=type+';\n';
	code+='u8g.setPrintPos('+x+', '+y+');\n';
	code+='u8g.print('+str+');\n';
  return code;
};

Blockly.Arduino.OLED_print_roll = function() {
  var str = Blockly.Arduino.valueToCode(this, 'text', Blockly.Arduino.ORDER_ATOMIC) || 'String(\"\")';
  var y = Blockly.Arduino.valueToCode(this, 'y', Blockly.Arduino.ORDER_ATOMIC);
  var x = Blockly.Arduino.valueToCode(this, 'x', Blockly.Arduino.ORDER_ATOMIC);
  var type = this.getFieldValue('TYPE');

  Blockly.Arduino.definitions_['define_oled_x'] = 'long x_coordinate;';
  Blockly.Arduino.definitions_['define_oled_xtime'] = 'unsigned long timer_x_coordinate = millis();';

var code='if (timer_x_coordinate > millis()) timer_x_coordinate = millis();\n';
  code+=' if(millis()-timer_x_coordinate>'+x+') {\n';
  code+='    x_coordinate = x_coordinate - 4;\n';
  code+='    timer_x_coordinate = millis();\n';
  code+='  }\n';
  code+=type+';\n';
  code+='u8g.setPrintPos(x_coordinate,'+ y+');\n';
  code+='u8g.print('+str+');\n';
  return code;
};


Blockly.Arduino.OLED_simplePrint = function() {
  var str = Blockly.Arduino.valueToCode(this, 'text', Blockly.Arduino.ORDER_ATOMIC) || 'String(\"\")'
  var code ='';
  code+='u8g.print('+str+');\n';
  return code;
};


Blockly.Arduino.MD_OLED_GeometryLine = function() {
  var type = this.getFieldValue('TYPE');

  var x0 = Blockly.Arduino.valueToCode(this, 'x0', Blockly.Arduino.ORDER_ATOMIC);
  var y0 = Blockly.Arduino.valueToCode(this, 'y0', Blockly.Arduino.ORDER_ATOMIC);
  var x1w = Blockly.Arduino.valueToCode(this, 'x1w', Blockly.Arduino.ORDER_ATOMIC);
  var y1h = Blockly.Arduino.valueToCode(this, 'y1h', Blockly.Arduino.ORDER_ATOMIC);
  // var x2r = Blockly.Arduino.valueToCode(this, 'x2r', Blockly.Arduino.ORDER_ATOMIC);
  // var y2 = Blockly.Arduino.valueToCode(this, 'y2', Blockly.Arduino.ORDER_ATOMIC);

  var code='';

  if(type=='point') {
    code+='u8g.drawPixel('+x0+','+y0+');\n';
  } else if(type=='line') {
    code+='u8g.drawLine('+x0+','+y0+','+x1w+','+y1h+');\n';
  } else if(type=='HLine') {
    code+='u8g.drawHLine('+x0+','+y0+','+x1w+');\n';
  } else if(type=='VLine') {
    code+='u8g.drawVLine('+x0+','+y0+','+y1h+');\n';
  } 
  // else if(type=='triangle') {
  //   code+='u8g.drawTriangle('+x0+','+y0+','+x1w+','+y1h+','+x2r+','+y2+');\n';
  // } 
  else if(type=='frame') {
    code+='u8g.drawFrame('+x0+','+y0+','+x1w+','+y1h+');\n';
  } 
  // else if(type=='RFrame') {
  //   code+='u8g.drawRFrame('+x0+','+y0+','+x1w+','+y1h+','+x2r+');\n';
  // } 
  else if(type=='box') {
    code+='u8g.drawBox('+x0+','+y0+','+x1w+','+y1h+');\n';
  } 
  // else if(type=='RBox') {
  //   code+='u8g.drawRBox('+x0+','+y0+','+x1w+','+y1h+','+x2r+');\n';
  // }

  return code;
};


Blockly.Arduino.MD_OLED_GeometryCircle = function() {


  var type = this.getFieldValue('TYPE');
  var ArcType = this.getFieldValue('ArcType');

  var x = Blockly.Arduino.valueToCode(this, 'x', Blockly.Arduino.ORDER_ATOMIC);
  var y = Blockly.Arduino.valueToCode(this, 'y', Blockly.Arduino.ORDER_ATOMIC);
  var rw = Blockly.Arduino.valueToCode(this, 'rw', Blockly.Arduino.ORDER_ATOMIC);
  // var h = Blockly.Arduino.valueToCode(this, 'h', Blockly.Arduino.ORDER_ATOMIC);

  var code='';

  if(type=='circle') {
    code+='u8g.drawCircle('+x+','+y+','+rw+','+ArcType+');\n';
  } else if(type=='disc') {
    code+='u8g.drawDisc('+x+','+y+','+rw+','+ArcType+');\n';
  } 

  // else if(type=='ellipse') {
  //   code+='u8g.drawEllipse('+x+','+y+','+rw+','+h+','+ArcType+');\n';
  // } else if(type=='filledEllipse') {
  //   code+='u8g.drawFilledEllipse('+x+','+y+','+rw+','+h+','+ArcType+');\n';
  // } 

  return code;
};


Blockly.Arduino.MD_OLED_getWidthHigh = function() {

  var type = this.getFieldValue('TYPE');

  var code = '';

  if(type=='width') {
    code +='u8g.getWidth()';
  } else {
    code +='u8g.getHeight()';
  }
 
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

///<jscompress sourcefile="Stepper_Arduino.js" />
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


///<jscompress sourcefile="Audio_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.mCookie_Audio_Serial = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var DEVICE = this.getTitleValue('PIN1');
  var MODE = this.getTitleValue('PIN2');
  var Volce = Blockly.Arduino.valueToCode(this, 'Vol', Blockly.Arduino.ORDER_ATOMIC);

  Blockly.Arduino.definitions_['define_Software'] = '#include <SoftwareSerial.h>\n';
  Blockly.Arduino.definitions_['define_JQ6500'] = '#include "JQ6500.h"\n';

  
  if(dropdown_pin=='core+') {
      Blockly.Arduino.definitions_['define_audioSerial'] = 'JQ6500 AUDIO(&Serial1);';
  } else {
    Blockly.Arduino.definitions_['define_SoftwareSerial'] = 'SoftwareSerial audioSerial(2,3);';
    Blockly.Arduino.definitions_['define_audioSerial'] = 'JQ6500 AUDIO(&audioSerial);';
  }
  //Blockly.Arduino.setups_['setup_mCookie_Serial'] = 'Serial.begin(9600);';
  //Blockly.Arduino.setups_['setup_mCookie_MODE'] = 'AUDIO.init('+DEVICE+','+MODE+','+Volce+');';
  var AudioInit='AUDIO.init('+DEVICE+','+MODE+','+Volce+');\n';
  AudioInit+='AUDIO.choose(1);\n';
  AudioInit+='AUDIO.pause();\n';

  Blockly.Arduino.setups_['setup_Audio_Init'] = AudioInit;

  var code='';
  return code;
};

Blockly.Arduino.mCookie_Audio_Play = function() {
  var code='AUDIO.play();\n';
  return code;
};
Blockly.Arduino.mCookie_Audio_Pose = function() {
  var code='AUDIO.pause();\n';
  return code;
};
Blockly.Arduino.mCookie_Audio_Next = function() {
  var code='AUDIO.next();\n';
  return code;
};
Blockly.Arduino.mCookie_Audio_Prev = function() {
  var code='AUDIO.prev();\n';
  return code;
};
Blockly.Arduino.mCookie_Audio_VolUp = function() {
  var code='AUDIO.volUp();\n';
  return code;
};
Blockly.Arduino.mCookie_Audio_VolDown = function() {
  var code='AUDIO.volDown();\n';
  return code;
};



Blockly.Arduino.mCookie_Audio_Control = function() {

  var getType = this.getTitleValue('getType');

  var code='AUDIO.'+getType+';';

  return code;
};

Blockly.Arduino.mCookie_Audio_Choose = function() {
  var audioNumber = Blockly.Arduino.valueToCode(this, 'audioNumber', Blockly.Arduino.ORDER_ATOMIC);

  var code='';
  code+='AUDIO.choose('+audioNumber+');\n';

  return code;
};
///<jscompress sourcefile="AudioPro_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');


Blockly.Arduino.audioProPrepare = function() {

	var getType = this.getTitleValue('getType');

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
  var getType = this.getTitleValue('getType');
  var code='midiSetInstrument(0, '+getType+');\n';
  return code;
};

Blockly.Arduino.audioProControl = function() {

	var getType = this.getTitleValue('getType');


	var audioProMelody = Blockly.Arduino.valueToCode(this, 'audioProMelody', Blockly.Arduino.ORDER_ATOMIC);
	var audioProVolume = Blockly.Arduino.valueToCode(this, 'audioProVolume', Blockly.Arduino.ORDER_ATOMIC);
	var audioProDuration = Blockly.Arduino.valueToCode(this, 'audioProDuration', Blockly.Arduino.ORDER_ATOMIC);
	var code='';
	code+=getType+'(0, '+audioProMelody+', '+audioProVolume+');\n';
	code+='delay('+audioProDuration+');\n';
	return code;
};
///<jscompress sourcefile="GPS_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');



Blockly.Arduino.GPS = function() {
  var GPSUPDATE = this.getFieldValue('GPSUPDATE');

  var branch = Blockly.Arduino.statementToCode(this, 'GPSInput');

  var gpsDefine='#include <Adafruit_GPS.h>\n';
  gpsDefine+='#include <SoftwareSerial.h>\n';
  gpsDefine+='Adafruit_GPS GPS(&Serial1);\n';
  gpsDefine+='#define GPSUPDATE '+GPSUPDATE+'\n';
  gpsDefine+='uint32_t gpsTimer = millis();\n';

  Blockly.Arduino.definitions_['var_GPSDefine'] = gpsDefine;

  var gpsInit='GPS.begin(38400);\n';
  gpsInit+='GPS.set_powermode(CONTINUOUS);\n';
  gpsInit+='GPS.set_updata(UPDATE_2HZ);\n';
  gpsInit+='GPS.set_config(CONFIG_SAVE);\n';

  Blockly.Arduino.setups_['setup_GPSInit'] = gpsInit;



  var code="char c = GPS.read();\n";
  code+='if (GPS.newNMEAreceived()) {\n';
  code+='	if (!GPS.parse(GPS.lastNMEA()))\n';
  code+='		return;\n';
  code+='}\n';
  code+='\n';
  code+='if (gpsTimer > millis()) gpsTimer = millis();\n';
  code+='if (millis() - gpsTimer > GPSUPDATE*1000) {\n';
  code+='gpsTimer = millis();\n';


  code+=branch;


  code+='}\n';
  code+='\n';
  code+='\n';
  

  //return [code, Blockly.Arduino.ORDER_ATOMIC];
  return code;
};



Blockly.Arduino.GPSShows = function() {

  var GPSHour = Blockly.Arduino.valueToCode(this, 'GPSHour', Blockly.Arduino.ORDER_ATOMIC)
  var GPSMinute = Blockly.Arduino.valueToCode(this, 'GPSMinute', Blockly.Arduino.ORDER_ATOMIC)
  var GPSSeconds = Blockly.Arduino.valueToCode(this, 'GPSSeconds', Blockly.Arduino.ORDER_ATOMIC)
  var GPSDay = Blockly.Arduino.valueToCode(this, 'GPSDay', Blockly.Arduino.ORDER_ATOMIC)
  var GPSMonth = Blockly.Arduino.valueToCode(this, 'GPSMonth', Blockly.Arduino.ORDER_ATOMIC)
  var GPSYear = Blockly.Arduino.valueToCode(this, 'GPSYear', Blockly.Arduino.ORDER_ATOMIC)
  var GPSFix = Blockly.Arduino.valueToCode(this, 'GPSFix', Blockly.Arduino.ORDER_ATOMIC)
  var GPSQuality = Blockly.Arduino.valueToCode(this, 'GPSQuality', Blockly.Arduino.ORDER_ATOMIC)
  var GPSLatitude = Blockly.Arduino.valueToCode(this, 'GPSLatitude', Blockly.Arduino.ORDER_ATOMIC)
  var GPSLat = Blockly.Arduino.valueToCode(this, 'GPSLat', Blockly.Arduino.ORDER_ATOMIC)
  var GPSLongitude = Blockly.Arduino.valueToCode(this, 'GPSLongitude', Blockly.Arduino.ORDER_ATOMIC)
  var GPSLon = Blockly.Arduino.valueToCode(this, 'GPSLon', Blockly.Arduino.ORDER_ATOMIC)
  var GPSSpeed = Blockly.Arduino.valueToCode(this, 'GPSSpeed', Blockly.Arduino.ORDER_ATOMIC)
  var GPSAngle = Blockly.Arduino.valueToCode(this, 'GPSAngle', Blockly.Arduino.ORDER_ATOMIC)
  var GPSAltitude = Blockly.Arduino.valueToCode(this, 'GPSAltitude', Blockly.Arduino.ORDER_ATOMIC)
  var GPSSatellites = Blockly.Arduino.valueToCode(this, 'GPSSatellites', Blockly.Arduino.ORDER_ATOMIC)




  var code='Serial.println();\n';

  code+='Serial.print("Time: ");\n';
  code+='Serial.print('+GPSHour+', DEC); \n';
  code+='Serial.print(":");\n';
  code+='Serial.print('+GPSMinute+', DEC); \n';
  code+='Serial.print(":");\n';
  code+='Serial.println('+GPSSeconds+', DEC); \n';
  code+='Serial.print("Date: ");\n';
  code+='Serial.print('+GPSDay+', DEC); \n';
  code+='Serial.print("/");\n';
  code+='Serial.print('+GPSMonth+', DEC); \n';
  code+='Serial.print("/20");\n';
  code+='Serial.println('+GPSYear+', DEC);\n';
  code+='Serial.print("Fix: ");\n';
  code+='Serial.print((int)'+GPSFix+');\n';
  code+='Serial.print(" quality: "); \n';
  code+='Serial.println((int)'+GPSQuality+');\n';
  code+='if ('+GPSFix+') {\n';
  code+=' Serial.print("Location: ");\n';
  code+=' Serial.print('+GPSLatitude+', 4);\n';
  code+=' Serial.print('+GPSLat+');\n';
  code+=' Serial.print(", ");\n';
  code+=' Serial.print('+GPSLongitude+', 4);\n';
  code+=' Serial.println('+GPSLon+');\n';
  code+=' Serial.print("Speed (knots): "); \n';
  code+=' Serial.println('+GPSSpeed+');\n';
  code+=' Serial.print("Angle: "); \n';
  code+=' Serial.println('+GPSAngle+');\n';
  code+=' Serial.print("Altitude: ");\n';
  code+=' Serial.println('+GPSAltitude+');\n';
  code+=' Serial.print("Satellites: "); \n';
  code+=' Serial.println((int)'+GPSSatellites+');\n';
  code+='}\n';

  return code;
};




Blockly.Arduino.GPSHour = function() {
  var code="GPS.hour";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.GPSMinute = function() {
  var code="GPS.minute";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.GPSSeconds = function() {
  var code="GPS.seconds";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.GPSDay = function() {
  var code="GPS.day";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.GPSMonth = function() {
  var code="GPS.month";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.GPSYear = function() {
  var code="GPS.year";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.GPSFix = function() {
  var code="GPS.fix";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.GPSQuality = function() {
  var code="GPS.fixquality";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.GPSLatitude = function() {
  var code="GPS.latitude";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.GPSLat = function() {
  var code="GPS.lat";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.GPSLongitude = function() {
  var code="GPS.longitude";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.GPSLon = function() {
  var code="GPS.lon";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.GPSSpeed = function() {
  var code="GPS.speed";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.GPSAngle = function() {
  var code="GPS.angle";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.GPSAltitude = function() {
  var code="GPS.altitude";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.GPSSatellites = function() {
  var code="GPS.satellites";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
///<jscompress sourcefile="motion_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');


Blockly.Arduino.motionAccGyro = function() {

  Blockly.Arduino.definitions_['define_Wire'] = '#include "Wire.h"';
  Blockly.Arduino.definitions_['define_I2Cdev'] = '#include "I2Cdev.h"';
  Blockly.Arduino.definitions_['define_MPU6050'] = '#include "MPU6050.h"';
  Blockly.Arduino.definitions_['var_accelgyro'] = 'MPU6050 accelgyro;';

  var accGyroVar='';
  accGyroVar+='int16_t accX, accY, accZ;\n';
  accGyroVar+='int16_t gyroX, gyroY, gyroZ;\n';
  Blockly.Arduino.definitions_['var_accelGyro'] = accGyroVar;


  Blockly.Arduino.setups_['setup_wireBegin'] = 'Wire.begin();';

  //Blockly.Arduino.setups_['setup_printInitI2C'] ='Serial.println("Initializing I2C devices...");';
  Blockly.Arduino.setups_['setup_accInit'] ='accelgyro.initialize();';
  //Blockly.Arduino.setups_['setup_testDevice'] ='Serial.println("Testing device connections...");';
  //Blockly.Arduino.setups_['setup_printTest'] ='Serial.println(accelgyro.testConnection() ? "MPU6050 connection successful" : "MPU6050 connection failed");';

  Blockly.Arduino.setups_['setup_printAccGyroTest'] ='accelgyro.testConnection();';

  var code='accelgyro.getMotion6(&accX, &accY, &accZ, &gyroX, &gyroY, &gyroZ);\n';

  return code;
};


Blockly.Arduino.getMotionValue = function() {

  var getType = this.getTitleValue('getType');

  var code=getType;

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.motionDMP = function() {

  Blockly.Arduino.definitions_['define_MPU6050_6Axis_Microduino'] = '#include "MPU6050_6Axis_Microduino.h"';
  Blockly.Arduino.definitions_['var_MPU6050'] = 'MPU6050 mpu;';

  var motionDMP='';
  motionDMP+='Quaternion q;\n';
  motionDMP+='float ypr[3];\n';
  motionDMP+='uint8_t mpuMode;\n';
  motionDMP+='bool mpuReady;\n';
  Blockly.Arduino.definitions_['var_motionDMP'] = motionDMP;


  var setupMotionDMP='';
  setupMotionDMP+='mpuMode = MODE_DMP;\n';
  setupMotionDMP+='mpuReady = mpu.begin(mpuMode);\n';
  Blockly.Arduino.setups_['setup_motionDMP'] = setupMotionDMP;


  var code='';
  code+='if (!mpuReady) return;\n';
  code+='mpu.getYawPitchRoll(ypr);\n';
  code+='if (!mpuReady) return;\n';
  code+='mpu.getYawPitchRoll(ypr);\n';
  return code;
};


Blockly.Arduino.motionSoft = function() {

  var getType = this.getTitleValue('getType');

  Blockly.Arduino.definitions_['define_MPU6050_6Axis_Microduino'] = '#include "MPU6050_6Axis_Microduino.h"';
  Blockly.Arduino.definitions_['define_HMC5883L'] = '#include "HMC5883L.h"';
  Blockly.Arduino.definitions_['var_MPU6050'] = 'MPU6050 mpu;';

  if(getType=='1') {
    Blockly.Arduino.definitions_['define_AXIS_9'] = '#define AXIS_9';
  }


  var defHMC5883L='';
  defHMC5883L+='#ifdef AXIS_9\n';
  defHMC5883L+='  HMC5883L mag;\n';
  defHMC5883L+='#endif\n';


  Blockly.Arduino.definitions_['var_HMC5883L'] = defHMC5883L;


  var motionSoft='';
  motionSoft+='Quaternion q;\n';
  motionSoft+='float ypr[3];\n';
  motionSoft+='float mx, my, mz;\n';
  motionSoft+='uint8_t mpuMode;\n';
  motionSoft+='bool mpuReady;\n';
  Blockly.Arduino.definitions_['var_motionSoft'] = motionSoft;


  var setupMotionSoft='';
  setupMotionSoft+='mpuMode = MODE_SW;\n';
  setupMotionSoft+='mpuReady = mpu.begin(mpuMode);\n';
  
  setupMotionSoft+='#ifdef AXIS_9\n';
  setupMotionSoft+='  mag.begin();\n';
  setupMotionSoft+='  mag.calibrateMag(0);\n';
  setupMotionSoft+='  mag.xOffset;\n';
  setupMotionSoft+='  mag.yOffset;\n';
  setupMotionSoft+='  mag.zOffset;\n';
  setupMotionSoft+='#endif \n';


  Blockly.Arduino.setups_['setup_motionDMP'] = setupMotionSoft;

  var code='';
  code+='if (!mpuReady) return;\n';

  code+='#ifdef AXIS_9\n';
  code+=' mag.getMagneto(&mx, &my, &mz);\n';
  code+='#endif\n';

  code+='#ifdef AXIS_9\n';
  code+=' mpu.getYawPitchRoll(ypr, mx, my, mz);\n';
  code+='#else\n';
  code+=' mpu.getYawPitchRoll(ypr);\n';
  code+='#endif\n';

  return code;
};



Blockly.Arduino.getMotionYawPitchRoll = function() {
  var getType = this.getTitleValue('getType');

  var code='';
  if(getType=='ypr\[2\]') {
    code='(ypr[2]>=0?180-ypr[2]:(ypr[2]*-1)-180)';
  } else {
    code=getType;
  }

  //var code=getType;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
///<jscompress sourcefile="RTC_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');




Blockly.Arduino.mCookie_RTC_time = function() {

  var rtcDefineInit='';
  rtcDefineInit+='#include <Rtc_Pcf8563.h>\n';
  rtcDefineInit+='Rtc_Pcf8563 rtc;\n';
  Blockly.Arduino.definitions_['define_RTC_Init'] = rtcDefineInit;

  var rtcBegin='';
  rtcBegin+='rtc.begin();\n';

  Blockly.Arduino.setups_['setup_RTC_time_begin'] = rtcBegin;

  var code='';
  code+='rtc.formatTime();\n';
  code+='rtc.formatDate();\n';
  code+='dateTime = rtc.getDateTime();\n';

  return code;
};




Blockly.Arduino.mCookie_RTC_set = function() {
	var Year = Blockly.Arduino.valueToCode(this, 'Year', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var Mouth = Blockly.Arduino.valueToCode(this, 'Mouth', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var Day = Blockly.Arduino.valueToCode(this, 'Day', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var Week = Blockly.Arduino.valueToCode(this, 'Week', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var Hour = Blockly.Arduino.valueToCode(this, 'Hour', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var Minute = Blockly.Arduino.valueToCode(this, 'Minute', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var Second = Blockly.Arduino.valueToCode(this, 'Second', Blockly.Arduino.ORDER_ATOMIC) || '0';


  var rtcDefineSetInit='';
  // rtcDefineSetInit+='#include <Rtc_Pcf8563.h>\n';
  // rtcDefineSetInit+='Rtc_Pcf8563 rtc;\n';
  rtcDefineSetInit+='DateTime dateTime = {'+Year+', '+Mouth+', '+Day+', '+Week+', '+Hour+', '+Minute+', '+Second+'};\n';
  Blockly.Arduino.definitions_['define_RTC_SetInit'] = rtcDefineSetInit;


  var rtcSetup='';
  // rtcSetup+='rtc.begin();\n';
  rtcSetup+='rtc.clearAll();\n';
  rtcSetup+='rtc.setDateTime(dateTime);\n';

  Blockly.Arduino.setups_['setup_RTC_time'] = rtcSetup;


  var code='';
  // code+='rtc.formatTime();\n';
  // code+='rtc.formatDate();\n';
  // code+='dateTime = rtc.getDateTime();\n';

  return code;
};




Blockly.Arduino.mCookie_RTC_date = function() {

  var code='rtc.formatDate()';
  return [code, Blockly.Arduino.ORDER_ATOMIC]|| 'String(\"\")';
  //return code;
};



Blockly.Arduino.mCookie_RTC_Week = function() {
  var code='rtc.getWeekday()';
  return [code, Blockly.Arduino.ORDER_ATOMIC]|| '0';
};

Blockly.Arduino.mCookie_RTC_Hour = function() {
  var code='rtc.getHour()';
  return [code, Blockly.Arduino.ORDER_ATOMIC]|| '0';
};

Blockly.Arduino.mCookie_RTC_Minute = function() {
  var code='rtc.getMinute()';
  return [code, Blockly.Arduino.ORDER_ATOMIC]|| '0';
};

Blockly.Arduino.mCookie_RTC_Second = function() {
  var code='rtc.getSecond()';
  return [code, Blockly.Arduino.ORDER_ATOMIC]|| '0';
};


Blockly.Arduino.mCookie_RTC_Output = function() {

  var getType = this.getTitleValue('getType');
  var code='dateTime.'+getType;
  return [code, Blockly.Arduino.ORDER_ATOMIC]|| '0';
};
///<jscompress sourcefile="SD_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');



Blockly.Arduino.SD_Write = function() {
  var File_Name = Blockly.Arduino.valueToCode(this, 'File_Name', Blockly.Arduino.ORDER_ATOMIC)
  var Content = Blockly.Arduino.valueToCode(this, 'Content', Blockly.Arduino.ORDER_ATOMIC)
  Blockly.Arduino.definitions_['define_SD'] = '#include <SD.h>\n';
  Blockly.Arduino.definitions_['define_Pin'] = '#define Pin 7\n';
  Blockly.Arduino.definitions_['define_File_Name'] = 'File myFile;\n';

  Blockly.Arduino.setups_['setup_Serial'] ='Serial.begin(9600);\n'
  Blockly.Arduino.setups_['setup_Init'] = 'Serial.println("Initializing SD card...");\n'
  +'if (!SD.begin(Pin)) {\n'
  +'Serial.println("initialization failed!");\n'
  +'return;\n'
  +'}\n'
  +'Serial.println("initialization done.");\n';

  var code='myFile = SD.open("'+File_Name+'", FILE_WRITE);\n';
  code+='if (myFile) {\n';
  code+='myFile.print('+Content+');\n';
  code+='myFile.close();\n';
  code+='Serial.println("Write done.");\n';
  code+='}else{\n';
  code+='Serial.println("error opening '+File_Name+'");\n'
  code+='}\n';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.SD_Read = function() {
  var File_Name = Blockly.Arduino.valueToCode(this, 'File_Name', Blockly.Arduino.ORDER_ATOMIC)
  Blockly.Arduino.definitions_['define_SD'] = '#include <SD.h>\n';
  Blockly.Arduino.definitions_['define_Pin'] = '#define Pin 7\n';
  Blockly.Arduino.definitions_['define_File_Name'] = 'File myFile;\n';

  Blockly.Arduino.setups_['setup_Serial'] ='Serial.begin(9600);\n'
  Blockly.Arduino.setups_['setup_Init'] = 'Serial.println("Initializing SD card...");\n'
  +'if (!SD.begin(Pin)) {\n'
  +'Serial.println("initialization failed!");\n'
  +'return;\n'
  +'}\n'
  +'Serial.println("initialization done.");\n';

  var code='myFile = myFile = SD.open("'+File_Name+'");\n';
  code+='if (myFile) {\n';
  code+='while (myFile.available()) {\n';
  code+='data+=char(myFile.read());\n';
  code+='}\n';
  code+='}else{\n';
  code+='Serial.println("error opening '+File_Name+'");\n'
  code+='}\n';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

///<jscompress sourcefile="analogRead_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');



Blockly.Arduino.microduinoMicAnal = function() {
	var analogPin = this.getFieldValue('analogPin');

	//Blockly.Arduino.setups_['setup_'+analogPin] = 'pinMode('+analogPin+',INPUT);';
	var code='';
	code+='analogRead('+analogPin+')';

	return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.microduinoLightAnal = function() {
	var analogPin = this.getFieldValue('analogPin');

	//Blockly.Arduino.setups_['setup_'+analogPin] = 'pinMode('+analogPin+',INPUT);';

	var code='';
	code+='analogRead('+analogPin+')';

	return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.microduinoIRRactAnal = function() {
	var analogPin = this.getFieldValue('analogPin');

	//Blockly.Arduino.setups_['setup_'+analogPin] = 'pinMode('+analogPin+',INPUT);';

	var code='';
	code+='analogRead('+analogPin+')';

	return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.MD_Potentiometer = function() {
	var analogPin = this.getFieldValue('analogPin');

	//Blockly.Arduino.setups_['setup_'+analogPin] = 'pinMode('+analogPin+',INPUT);';
	var code='';
	code+='analogRead('+analogPin+')';

	return [code, Blockly.Arduino.ORDER_ATOMIC];
};
///<jscompress sourcefile="BreathingLight_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');



Blockly.Arduino.BreathingLightH = function() {
  //var branch = Blockly.Arduino.statementToCode(this, 'DO');

  var LEDPinNumber = this.getTitleValue('LEDPinNumber');
  var LEDFrequency = Blockly.Arduino.valueToCode(this, 'LEDFrequency', Blockly.Arduino.ORDER_ATOMIC)

  var code='';

  code+='for(int breathI=0;breathI<=255;breathI++){\n';
  code+='    analogWrite('+LEDPinNumber+',breathI);\n';
  code+='    delay('+LEDFrequency+'*1000/500);\n';
  code+='}\n';

  return code;
};

Blockly.Arduino.BreathingLightX = function() {
  //var branch = Blockly.Arduino.statementToCode(this, 'DO');

  var LEDPinNumber = this.getTitleValue('LEDPinNumber');
  var LEDFrequency = Blockly.Arduino.valueToCode(this, 'LEDFrequency', Blockly.Arduino.ORDER_ATOMIC)

  var code='';
  code+='for(int breathI=255;breathI>=0;breathI--){\n';
  code+='    analogWrite('+LEDPinNumber+',breathI);\n';
  code+='    delay('+LEDFrequency+'*1000/500);\n';
  code+='}\n';

  return code;
};
///<jscompress sourcefile="Buzzer_Arduino.js" />
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
	var buzzerMelody = this.getTitleValue('buzzerMelody');
	var BuzzerPin = Blockly.Arduino.valueToCode(this, 'BuzzerPin', Blockly.Arduino.ORDER_ATOMIC)
	Blockly.Arduino.definitions_['define_BuzzerPin'+BuzzerPin] = '#define BuzzerPin'+BuzzerPin+' '+BuzzerPin;

	//Blockly.Arduino.setups_['setup_Buzzer'+BuzzerPin] = 'pinMode(BuzzerPin'+BuzzerPin+',OUTPUT);';

	var code='';
	code+='tone(BuzzerPin'+BuzzerPin+','+buzzerMelody+');\n';

	return code;
};


Blockly.Arduino.BuzzerToneSong = function() {
	var buzzerSong = this.getTitleValue('buzzerSong');
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
///<jscompress sourcefile="colorLED_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');


function hexToRgb(hex) {
    if ( hex.charAt(0) == '#' ) {
      hex = hex.substr(1);
    }
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return r + "," + g + "," + b;
}

Blockly.Arduino.ws2812Begin = function() {
  //var branch = Blockly.Arduino.statementToCode(this, 'DO');

  var LEDNumber = Blockly.Arduino.valueToCode(this, 'LEDNumber', Blockly.Arduino.ORDER_ATOMIC)
  var LEDPin = Blockly.Arduino.valueToCode(this, 'LEDPin', Blockly.Arduino.ORDER_ATOMIC)

  Blockly.Arduino.definitions_['define_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
  Blockly.Arduino.definitions_['var_Adafruit_NeoPixel'] = 'Adafruit_NeoPixel strip = Adafruit_NeoPixel('+LEDNumber+', '+LEDPin+', NEO_GRB + NEO_KHZ800);';
  
  Blockly.Arduino.setups_['setup_stripBegin'] = 'strip.begin();';
  Blockly.Arduino.setups_['setup_stripShow'] ='strip.show();';

  //var flip = this.getFieldValue('FLIP');
  var code='';
  //code+='strip.show();\n'
  // code+='do {\n';
  //code+=branch;
  // code+='} while( oled.nextPage() );\n';

  return code;
};


Blockly.Arduino.ws2812Doing = function() {
  //var branch = Blockly.Arduino.statementToCode(this, 'DO');


  var LEDNumber = Blockly.Arduino.valueToCode(this, 'LEDIndex', Blockly.Arduino.ORDER_ATOMIC)

  var colorRGB = this.getFieldValue('colorRGB');

  var code='strip.setPixelColor('+LEDNumber+'-1, '+hexToRgb(colorRGB)+');\n';
  code+='strip.show();\n'

  return code;
};


Blockly.Arduino.ws2812DoingRGB = function() {

  var LEDNumber = Blockly.Arduino.valueToCode(this, 'LEDIndex', Blockly.Arduino.ORDER_ATOMIC)

  var red = Blockly.Arduino.valueToCode(this, 'red', Blockly.Arduino.ORDER_ATOMIC)
  var green = Blockly.Arduino.valueToCode(this, 'green', Blockly.Arduino.ORDER_ATOMIC)
  var blue = Blockly.Arduino.valueToCode(this, 'blue', Blockly.Arduino.ORDER_ATOMIC)

  var code='strip.setPixelColor('+LEDNumber+'-1, '+red+','+green+','+blue+');\n';
  code+='strip.show();\n'

  return code;
};


Blockly.Arduino.ws2812BreathRGB= function() {

  var LEDNumber = Blockly.Arduino.valueToCode(this, 'LEDIndex', Blockly.Arduino.ORDER_ATOMIC)

  var red = Blockly.Arduino.valueToCode(this, 'red', Blockly.Arduino.ORDER_ATOMIC)
  var green = Blockly.Arduino.valueToCode(this, 'green', Blockly.Arduino.ORDER_ATOMIC)
  var blue = Blockly.Arduino.valueToCode(this, 'blue', Blockly.Arduino.ORDER_ATOMIC)

Blockly.Arduino.definitions_['define_pos_num'] = 'int led_pos = 0,led_num = 1;\n';
Blockly.Arduino.definitions_['define_led_time'] = 'unsigned long led_time = 0;\n';
Blockly.Arduino.definitions_['define_val_max'] = '#define val_max 255\n';
Blockly.Arduino.definitions_['define_val_min'] = '#define val_min 0\n';

var setColor='void colorSet(uint32_t c, int i) {\n';
    setColor+='strip.setPixelColor(i, c);\n';
    setColor+='strip.show();}\n';
Blockly.Arduino.definitions_['define_setColor'] = setColor;

var breath='void breath(int r, int g, int b, int i){\n';
  breath+='if (millis() < led_time) led_time = millis();\n';
  breath+='if (millis() - led_time > 10) {\n';
  breath+='  led_pos += led_num;\n';
  breath+='  if (led_pos >= 255 || led_pos <= 0)\n';
  breath+='    led_num = -led_num;\n';
  breath+='  led_time = millis();}\n';
  breath+='colorSet(strip.Color(map(led_pos, val_min, val_max, 0, r), map(led_pos, val_min, val_max, 0, g), map(led_pos, val_min, val_max, 0, b)), i);}\n';
Blockly.Arduino.definitions_['define_setbreath'] = breath;

var code='breath('+red+','+green+','+blue+','+LEDNumber+'-1);\n';

  return code;
};
///<jscompress sourcefile="digitalRead_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');


Blockly.Arduino.microduinoCrash = function() {
  var digitalPin = Blockly.Arduino.valueToCode(this, 'digitalPin', Blockly.Arduino.ORDER_ATOMIC);
  var action = this.getTitleValue('action');

  //Blockly.Arduino.setups_['setup_'+digitalPin] = 'pinMode('+digitalPin+',INPUT);';
  var code='';

  if(action=="down") {
  	code+='!digitalRead('+digitalPin+')';
  } else {
  	code+='digitalRead('+digitalPin+')';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.microduinoTuch = function() {
  var digitalPin = Blockly.Arduino.valueToCode(this, 'digitalPin', Blockly.Arduino.ORDER_ATOMIC);
  var action = this.getTitleValue('action');

  //Blockly.Arduino.setups_['setup_'+digitalPin] = 'pinMode('+digitalPin+',INPUT);';
  var code='';

  if(action=="down") {
  	code+='!digitalRead('+digitalPin+')';
  } else {
  	code+='digitalRead('+digitalPin+')';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.microduinoPIR = function() {
  var digitalPin = Blockly.Arduino.valueToCode(this, 'digitalPin', Blockly.Arduino.ORDER_ATOMIC);
  var action = this.getTitleValue('action');

  //Blockly.Arduino.setups_['setup_'+digitalPin] = 'pinMode('+digitalPin+',INPUT);';
  var code='';

  if(action=="high") {
  	code+='digitalRead('+digitalPin+')';
  } else {
  	code+='!digitalRead('+digitalPin+')';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.microduinoMic = function() {
  var digitalPin = Blockly.Arduino.valueToCode(this, 'digitalPin', Blockly.Arduino.ORDER_ATOMIC);
  var action = this.getTitleValue('action');
//Blockly.Arduino.setups_['setup_'+digitalPin] = 'pinMode('+digitalPin+',INPUT);';

  var code='';

  if(action=="high") {
  	code+='digitalRead('+digitalPin+')';
  } else {
  	code+='!digitalRead('+digitalPin+')';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.microduinoLight = function() {
  var digitalPin = Blockly.Arduino.valueToCode(this, 'digitalPin', Blockly.Arduino.ORDER_ATOMIC);
  var action = this.getTitleValue('action');


  //Blockly.Arduino.setups_['setup_'+digitalPin] = 'pinMode('+digitalPin+',INPUT);';


  var code='';

  if(action=="high") {
    code+='digitalRead('+digitalPin+')';
  } else {
    code+='!digitalRead('+digitalPin+')';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
///<jscompress sourcefile="IR_Receiver_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');


Blockly.Arduino.Microduino_ir_remote_begin = function() {
var btn_ir = this.getTitleValue('btn');
var ir_r_Pin = Blockly.Arduino.valueToCode(this, 'Pin', Blockly.Arduino.ORDER_ATOMIC)|| '0';
Blockly.Arduino.definitions_['IRremote'] = '#include <IRremote.h>';
Blockly.Arduino.definitions_['RECV_PIN'] = 'IRrecv irrecv('+ir_r_Pin+');';
Blockly.Arduino.definitions_['results'] = 'decode_results results;\n';
//Blockly.Arduino.setups_['setup_mCookie_Serial'] = 'Serial.begin(9600);';
Blockly.Arduino.setups_['setup_irrecv'] = 'irrecv.enableIRIn();';

var code='if (irrecv.decode(&results)) {\n'
+'irrecv.resume();\n'
+'Serial.println(results.value, HEX);\n'
+'}\n'

return [code, Blockly.Arduino.ORDER_ATOMIC]||'0';
};

Blockly.Arduino.Microduino_ir_remote = function() {
var btn_ir = this.getTitleValue('btn');
Blockly.Arduino.definitions_['IRremote'] = '#include <IRremote.h>';
Blockly.Arduino.definitions_['results'] = 'decode_results results;\n';
//Blockly.Arduino.setups_['setup_mCookie_Serial'] = 'Serial.begin(9600);';
Blockly.Arduino.setups_['setup_irrecv'] = 'irrecv.enableIRIn();';

var code="results.value=="+btn_ir;
/*
var code='if (irrecv.decode(&results)) {\n'
+'irrecv.resume();\n'
+'Serial.println(results.value, HEX);\n'
+'}\n'
*/
return [code, Blockly.Arduino.ORDER_ATOMIC]||'0';
};

Blockly.Arduino.IRSend = function() {
  var Type = this.getFieldValue('TYPE');
  var IRContent = this.getFieldValue('IRCONTENT');
  var IRLength = this.getFieldValue('IRLENGTH');

Blockly.Arduino.definitions_['IRremotes'] = '#include <IRremote.h>';
Blockly.Arduino.definitions_['IR define'] = 'IRsend irsend;\n';
//Blockly.Arduino.setups_['setup_Serial'] = 'Serial.begin(9600);';


var code='  if (Serial.read() != -1) {\n';
if(Type=='Sony')
	code+='      irsend.sendSony('+IRContent+', '+IRLength+'); \n      delay(100);\n';
else if(Type=='NEC')
	code+='      irsend.sendNEC('+IRContent+', '+IRLength+'); \n      delay(100);\n';
else if(Type=='RC5')
	code+='      irsend.sendRC5('+IRContent+', '+IRLength+'); \n      delay(100);\n';
else if(Type=='RC6')
	code+='      irsend.sendRC6('+IRContent+', '+IRLength+'); \n      delay(100);\n';
code+='}\n';
return [code, Blockly.Arduino.ORDER_ATOMIC]||'0';
};

///<jscompress sourcefile="joystick_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');



Blockly.Arduino.xyJoystick = function() {
  var analogPin = this.getFieldValue('analogPin');
  var direction = this.getTitleValue('direction');

  Blockly.Arduino.definitions_['var_Anolg'+analogPin+direction] = '#define Pin_'+analogPin+direction+' '+analogPin;
  //Blockly.Arduino.setups_['setup_'+analogPin+direction] = 'pinMode(Pin_'+analogPin+direction+',INPUT);';

  var code='analogRead(Pin_'+analogPin+direction+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.microduinoJoystick = function() {
  var analogPin = this.getFieldValue('analogPin');
  var type = this.getTitleValue('type');

  var microduinoJoysitcFun='';
  microduinoJoysitcFun+='boolean joy_stick(int pin, int mode) {\n';
  microduinoJoysitcFun+='uint8_t joyStickA=-1,joyStickB=-2;\n';

microduinoJoysitcFun+='  while(joyStickA!=joyStickB){\n';
microduinoJoysitcFun+='    if (analogRead(pin) < 50) {\n';
microduinoJoysitcFun+='      joyStickA=0;\n';
microduinoJoysitcFun+='    }\n';
microduinoJoysitcFun+='    else if(analogRead(pin) < 374 && analogRead(pin) > 274){\n';
microduinoJoysitcFun+='      joyStickA=1;\n';
microduinoJoysitcFun+='    }\n';
microduinoJoysitcFun+='    else if(analogRead(pin) < 559 && analogRead(pin) > 459){\n';
microduinoJoysitcFun+='      joyStickA=2;\n';
microduinoJoysitcFun+='    }\n';
microduinoJoysitcFun+='    else if(analogRead(pin) < 751 && analogRead(pin) > 651){\n';
microduinoJoysitcFun+='      joyStickA=3;\n';
microduinoJoysitcFun+='    }\n';
microduinoJoysitcFun+='    else if(analogRead(pin) < 906 && analogRead(pin) > 806){\n';
microduinoJoysitcFun+='      joyStickA=4;\n';
microduinoJoysitcFun+='    }\n';
microduinoJoysitcFun+='    else if(analogRead(pin) > 973){\n';
microduinoJoysitcFun+='      joyStickA=5;\n';
microduinoJoysitcFun+='    }\n';
microduinoJoysitcFun+='    delay(20);\n';
microduinoJoysitcFun+='    if (analogRead(pin) < 50) {\n';
microduinoJoysitcFun+='      joyStickB=0;\n';
microduinoJoysitcFun+='    }\n';
microduinoJoysitcFun+='    else if(analogRead(pin) < 374 && analogRead(pin) > 274){\n';
microduinoJoysitcFun+='      joyStickB=1;\n';
microduinoJoysitcFun+='    }\n';
microduinoJoysitcFun+='    else if(analogRead(pin) < 559 && analogRead(pin) > 459){\n';
microduinoJoysitcFun+='      joyStickB=2;\n';
microduinoJoysitcFun+='    }\n';
microduinoJoysitcFun+='    else if(analogRead(pin) < 751 && analogRead(pin) > 651){\n';
microduinoJoysitcFun+='      joyStickB=3;\n';
microduinoJoysitcFun+='    }\n';
microduinoJoysitcFun+='    else if(analogRead(pin) < 906 && analogRead(pin) > 806){\n';
microduinoJoysitcFun+='      joyStickB=4;\n';
microduinoJoysitcFun+='    }\n';
microduinoJoysitcFun+='    else if(analogRead(pin) > 973){\n';
microduinoJoysitcFun+='      joyStickB=5;\n';
microduinoJoysitcFun+='    }\n';
microduinoJoysitcFun+='  }\n';
microduinoJoysitcFun+='  if(mode==joyStickB){\n';
microduinoJoysitcFun+='    return true;\n';
microduinoJoysitcFun+='  }\n';
microduinoJoysitcFun+='  else{\n';
microduinoJoysitcFun+='    return false;\n';
microduinoJoysitcFun+='  }\n';
microduinoJoysitcFun+='}\n';


  Blockly.Arduino.definitions_['microduinoJoysitcFun'] = microduinoJoysitcFun;

  var code='joy_stick('+analogPin+','+type+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
///<jscompress sourcefile="KEY_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');


Blockly.Arduino.Microduino_KEYDigital = function() {

  var branch = Blockly.Arduino.statementToCode(this, 'DO');

  var pin = this.getFieldValue('KPin');
  //var type = this.getFieldValue('INPUTTYPE');
  var check = this.getFieldValue('CHECK');

  Blockly.Arduino.definitions_['define_key'] = '#include <Microduino_Key.h>';
  //Blockly.Arduino.definitions_['var_key_'+pin+''] = 'Key Key'+pin+'('+pin+', '+type+');';
  Blockly.Arduino.definitions_['var_key_'+pin+''] = 'Key Key'+pin+'('+pin+', INPUT_PULLUP);';
  
  var code='';
  code+='if(Key'+pin+'.read()=='+check+') {\n';
  code+=branch;
  code+='}\n';

  //return [code, Blockly.Arduino.ORDER_ATOMIC];
  return code;
};


Blockly.Arduino.Microduino_KEYAnalog = function() {

  var branch = Blockly.Arduino.statementToCode(this, 'DO');

  var joyStickAction = this.getFieldValue('joyStickAction');
  var pin = this.getFieldValue('KPin');
  var min = this.getFieldValue('MIN');
  var max = this.getFieldValue('MAX');
  var check = this.getFieldValue('CHECK');

  Blockly.Arduino.definitions_['define_key'] = '#include <Microduino_Key.h>';
  Blockly.Arduino.definitions_['var_key_'+joyStickAction+''] = 'Key Key'+joyStickAction+'('+pin+', INPUT);';
  
  var code='';
  code+='if(Key'+joyStickAction+'.read('+min+', '+max+')=='+check+') {\n';
  code+=branch;
  code+='}\n';

  //return [code, Blockly.Arduino.ORDER_ATOMIC];
  return code;
};



Blockly.Arduino.oldKEYDigital = function() {

  var pin = this.getFieldValue('KPin');
  //var type = this.getFieldValue('INPUTTYPE');
  var check = this.getFieldValue('CHECK');

  Blockly.Arduino.definitions_['define_keyOld'] = '#include <Microduino_KeyOld.h>';
  //Blockly.Arduino.definitions_['var_key_'+pin+''] = 'Key Key'+pin+'('+pin+', '+type+');';
  Blockly.Arduino.definitions_['var_keyOld_'+pin+''] = 'KeyOld KeyOld'+pin+'('+pin+', INPUT_PULLUP);';
  
  var code='';
  code+='(KeyOld'+pin+'.read('+check+'))';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.oldKEYAnalog = function() {
  var pin = this.getFieldValue('KPin');
  var min = this.getFieldValue('MIN');
  var max = this.getFieldValue('MAX');

  Blockly.Arduino.definitions_['define_keyOld'] = '#include <Microduino_KeyOld.h>';
  Blockly.Arduino.definitions_['var_keyOld_'+pin+''] = 'KeyOld KeyOld'+pin+'('+pin+', INPUT);';
  
  var code='';
  code+='(KeyOld'+pin+'.read(PRESS, '+min+', '+max+'))';

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


///<jscompress sourcefile="LM75_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');



Blockly.Arduino.lm75 = function() {


  var lm75Include="#include <inttypes.h>\n";
  lm75Include+="#include <Wire.h>\n";
  lm75Include+="#include <lm75.h>\n";

  Blockly.Arduino.definitions_['var_lm75Include'] = lm75Include;
  Blockly.Arduino.definitions_['var_lm75defineVar'] = "TempI2C_LM75 termo = TempI2C_LM75(0x48,TempI2C_LM75::nine_bits);\n";

  var code="termo.getTemp()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

///<jscompress sourcefile="servo_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.microduinoServoMove = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var value_degree = Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);
  var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '0'

  Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>\n';
  Blockly.Arduino.definitions_['var_servo'+dropdown_pin] = 'Servo servo_'+dropdown_pin+';\n';

  var funForServo='';

  funForServo+='void servo'+dropdown_pin+'_move(int target_angle,int move_speed){\n';
  funForServo+='  int servo_angle;\n';
  funForServo+='  servo_angle=servo_'+dropdown_pin+'.read();\n';
  funForServo+='  if (move_speed >= 1000) {\n';
  funForServo+='      servo_'+dropdown_pin+'.write(target_angle);\n';
  funForServo+='  }\n';
  funForServo+='  else {\n';
  funForServo+='  if(target_angle-servo_angle>0){\n';
  funForServo+='    for(int a=0;a<target_angle-servo_angle;a++){\n';
  funForServo+='      servo_'+dropdown_pin+'.write(servo_angle+a);\n';
  funForServo+='      delay(1000/move_speed);\n';
  funForServo+='    }\n';
  funForServo+='  }\n';
  funForServo+='  else if(target_angle-servo_angle<0){\n';
  funForServo+='    for(int a=0;a<servo_angle-target_angle;a++){\n';
  funForServo+='      servo_'+dropdown_pin+'.write(servo_angle-a);\n';
  funForServo+='      delay(1000/move_speed);\n';
  funForServo+='    }\n';
  funForServo+='  } else {\n';
  funForServo+='      servo_'+dropdown_pin+'.write(target_angle);\n';
  funForServo+='    }\n';
  funForServo+='  }\n';
  funForServo+='}\n';

  Blockly.Arduino.definitions_['funForServo'+dropdown_pin] = funForServo;

  Blockly.Arduino.setups_['setup_servo_'+dropdown_pin] = 'servo_'+dropdown_pin+'.attach('+dropdown_pin+');\n';

  var code = 'servo'+dropdown_pin+'_move('+value_degree+','+delay_time+');\n';
  return code;
};
///<jscompress sourcefile="TCS3414_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.ColorDetPrepare_TCS3414 = function() {

  var TCS3414Include="#include <TCS3414Lib.h>\n";
  TCS3414Include+="#include <Wire.h>\n";
  TCS3414Include+="#define colorSUM 3\n";

  Blockly.Arduino.definitions_['var_TCS3414Include'] = TCS3414Include;

  var TCS3414Var='';
  TCS3414Var+='uint8_t redColor,greenColor,blueColor;\n';
  TCS3414Var+='uint16_t redValue, greenValue, blueValue, maxLight;\n';
  TCS3414Var+='TCS3414 tcs;\n';

  Blockly.Arduino.definitions_['var_TCS3414defineVar'] = TCS3414Var;


  var TCS3414Init='';
  TCS3414Init+='Wire.begin();\n';
  TCS3414Init+='tcs.init(TCS3414_FREEMODE);\n';
  TCS3414Init+='tcs.setIntegrationTime(INTEG_PARAM_INTTIME_12MS);\n';
  TCS3414Init+='tcs.setGain(GAIN_1, PRESCALER_1);\n';
  TCS3414Init+='tcs.start();\n';
  Blockly.Arduino.setups_['setup_TCS3414Init'] = TCS3414Init;

  var code='\n';

  code+='tcs.getRGB(&redValue, &greenValue, &blueValue, &maxLight);\n';
  code+='redColor = map(redValue, 0, maxLight * colorSUM, 0, 255);\n';
  code+='greenColor = map(greenValue, 0, maxLight * colorSUM, 0, 255);\n';
  code+='blueColor = map(blueValue, 0, maxLight * colorSUM, 0, 255);\n';
  return code;
};


Blockly.Arduino.ColorGet_TCS3414 = function() {
  var getType = this.getTitleValue('getType');
  var code=getType;

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
///<jscompress sourcefile="Tem_Hum_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.mCookie_AM2321 = function() {
var Tem_Hum = this.getTitleValue('direction');

var code='readByAM2321('+Tem_Hum+')';

Blockly.Arduino.definitions_['Wire'] = '#include <Wire.h>';
Blockly.Arduino.definitions_['AM2321'] = '#include <AM2321.h>';


var joyName='readByAM2321';
var code1 = 'float ' +joyName+'(int num) {\n';
	code1+='	AM2321 am2321;\n';
	code1+='	am2321.read();\n';
	code1+='	float sensor_tem=am2321.temperature/10.0;\n';
	code1+='	float sensor_hum=am2321.humidity/10.0;\n';
	code1+='	delay(500);\n'
	code1+='	if(num==1) {\n';
	code1+='		return sensor_tem;\n';
	code1+='	}\n';
	code1+='	else if(num==2) {\n';
	code1+='		return sensor_hum;\n';
	code1+='	} else {\n';
	code1+='		return 0.0;\n';
	code1+='	}\n';
	code1+='}\n';


 Blockly.Arduino.definitions_[joyName] = code1; 
 return [code, Blockly.Arduino.ORDER_ATOMIC]|| '0';
};




Blockly.Arduino.mCookie_SHT2 = function() {
var Tem_Hum = this.getTitleValue('direction');

Blockly.Arduino.definitions_['Wire'] = '#include <Wire.h>';
Blockly.Arduino.definitions_['SHT2x'] = '#include <SHT2x.h>';


Blockly.Arduino.setups_['Wire'] = 'Wire.begin();';

 var code='';
 if(Tem_Hum=='1') {
 	code+='SHT2x.GetTemperature()';
 } else if(Tem_Hum=='2') {
 	code+='SHT2x.GetHumidity()';
 } 

 return [code, Blockly.Arduino.ORDER_ATOMIC]|| '0';
};
///<jscompress sourcefile="Timer_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');



Blockly.Arduino.MicroduinoTimer = function() {
  var branch = Blockly.Arduino.statementToCode(this, 'TimerDOing');
  var timerName = this.getFieldValue('timerName');
  var intervalTime = Blockly.Arduino.valueToCode(this, 'intervalTime', Blockly.Arduino.ORDER_ATOMIC)

  Blockly.Arduino.definitions_['define_'+timerName+'Timer'] = '#define INTERVAL_'+timerName+' '+intervalTime;
  Blockly.Arduino.definitions_['define_'+timerName+'lastTime'] = 'unsigned long '+timerName+'lastTime = millis();';

  var code='';

  code+='if ('+timerName+'lastTime > millis()) '+timerName+'lastTime = millis();\n';
  code+='if(millis()-'+timerName+'lastTime>INTERVAL_'+timerName+') {\n';
  code+=branch;
  code+='  '+timerName+'lastTime = millis();\n';
  code+='} \n';

  return code;
};


Blockly.Arduino.MicroduinoTimerBegin = function() {

  var timerName = this.getFieldValue('timerName');

  Blockly.Arduino.definitions_['define_'+timerName+'lastTime'] = 'unsigned long '+timerName+'lastTime = millis();';

  var code='';

  code+=timerName+'lastTime = millis();\n';

  return code;
};


Blockly.Arduino.MicroduinoTimerOut = function() {

  var timerName = this.getFieldValue('timerName');
  var intervalTime = Blockly.Arduino.valueToCode(this, 'intervalTime', Blockly.Arduino.ORDER_ATOMIC)

  Blockly.Arduino.definitions_['define_'+timerName+'Timer'] = '#define INTERVAL_'+timerName+' '+intervalTime;
  Blockly.Arduino.definitions_['define_'+timerName+'lastTime'] = 'unsigned long '+timerName+'lastTime = millis();';

  var code='(millis() - '+timerName+'lastTime > INTERVAL_'+timerName+')';

  return [code, Blockly.Arduino.ORDER_ATOMIC];

};


Blockly.Arduino.MicroduinoTimerDuration = function() {

  var timerName = this.getFieldValue('timerName');

  Blockly.Arduino.definitions_['define_'+timerName+'lastTime'] = 'unsigned long '+timerName+'lastTime = millis();';

  var code='(millis() - '+timerName+'lastTime)';

  return [code, Blockly.Arduino.ORDER_ATOMIC];

};



///<jscompress sourcefile="TSL2561_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');



Blockly.Arduino.TSL2561LightReady = function() {

  var TSL2561Include="#include <Adafruit_Sensor.h>\n";
  TSL2561Include+="#include <Wire.h>\n";
  TSL2561Include+="#include <Adafruit_TSL2561_U.h>\n";

  Blockly.Arduino.definitions_['var_TSL2561Include'] = TSL2561Include;

  var TSL2561Var='float lightTSL2561=0.0;\n';
  TSL2561Var+='Adafruit_TSL2561_Unified tsl = Adafruit_TSL2561_Unified(TSL2561_ADDR_LOW, 12345);\n';

  Blockly.Arduino.definitions_['var_TSL2561defineVar'] = TSL2561Var;

  var code='sensors_event_t event;\n';
  code+='tsl.getEvent(&event);\n';
  code+='if (event.light) lightTSL2561=event.light;\n';

  //return [code, Blockly.Arduino.ORDER_ATOMIC];
  return code;
};


Blockly.Arduino.TSL2561Light = function() {

  var code='lightTSL2561';

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
///<jscompress sourcefile="NewVariable_Arduino.js" />
'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.Defination = function() {
  //var branch = Blockly.Arduino.statementToCode(this, 'DO');
  var varName = this.getFieldValue('NAME');
  var flip = this.getFieldValue('FLIP');
  var argument0 = Blockly.Arduino.valueToCode(this, 'VALUE',Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  Blockly.Arduino.definitions_['define_NewVariable'+varName+flip] = ''+flip+' '+varName+';';
  Blockly.Arduino.setups_['setup_VariableIs'] = varName + '=' + argument0 + ';\n';

  //var flip = this.getFieldValue('FLIP');
  var code='';
  //code+='strip.show();\n'
  // code+='do {\n';
  //code+=branch;
  // code+='} while( oled.nextPage() );\n';

  return code;
};

Blockly.Arduino.Structure = function() {
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
  var varName = this.getFieldValue('Struct_NAME');
  var varName2 = this.getFieldValue('Struct_DEF');
  Blockly.Arduino.definitions_['define_Struct'] = 'struct '+''+varName+'\n'
  +'{\n'
  +branch
  +'}';


  //var flip = this.getFieldValue('FLIP');
  var code=''+varName+' '+varName2+';\n';
  //code+='strip.show();\n'
  // code+='do {\n';
  //code+=branch;
  // code+='} while( oled.nextPage() );\n';

  return code;
};


Blockly.Arduino.Var_Definations = function() {
  //var branch = Blockly.Arduino.statementToCode(this, 'DO');
  var varName = this.getFieldValue('NAME');
  var flip = this.getFieldValue('FLIP');
  //var flip = this.getFieldValue('FLIP');
  var code=flip +' '+ varName+';\n';
  //code+='strip.show();\n'
  // code+='do {\n';
  //code+=branch;
  // code+='} while( oled.nextPage() );\n';

  return code;
};

Blockly.Arduino.Struct_Var_Definations = function() {
  var VARI = Blockly.Arduino.valueToCode(this, 'VARI',Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var Struct_NAME = this.getFieldValue('Struct_NAME');
  var Struct_Member = this.getFieldValue('Struct_Member');

  var code=Struct_NAME +'.'+ Struct_Member+'='+ VARI +';\n';
  //code+='strip.show();\n'
  // code+='do {\n';
  //code+=branch;
  // code+='} while( oled.nextPage() );\n';

  return code;
};

Blockly.Arduino.IntDefine = function() {
  var text_intName = this.getFieldValue('intName');
  // var intValue = Blockly.Arduino.valueToCode(this, 'intValue', Blockly.Arduino.ORDER_ATOMIC) || 'undefined';
  var intValue = Blockly.Arduino.valueToCode(this, 'intValue', Blockly.Arduino.ORDER_ATOMIC);

  Blockly.Arduino.definitions_['var_Int'+text_intName] = 'int '+text_intName+'=0;';

  var code='';
  return code;
};


Blockly.Arduino.BooleanDefine = function() {
  var text_boolName = this.getFieldValue('booleanName');
  // var boolValue = Blockly.Arduino.valueToCode(this, 'booleanValue', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var boolValue = Blockly.Arduino.valueToCode(this, 'booleanValue', Blockly.Arduino.ORDER_ATOMIC);
  
  Blockly.Arduino.definitions_['var_bool'+text_boolName] = 'boolean '+text_boolName+'=false;';

  var code=text_boolName+'='+boolValue;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.melodyBuzzer = function() {

  var melodyFraqance = this.getFieldValue('melodyFraqance');
  var code=melodyFraqance;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.rhythmBuzzer = function() {

  var rhythmNumber = this.getFieldValue('rhythmNumber');
  var code=rhythmNumber;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};




Blockly.Arduino.nrfDataStructDefine = function() {
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
  var define_nrfDataStruct='';
  define_nrfDataStruct+='struct payload_t {\n';
  define_nrfDataStruct+=branch;
  define_nrfDataStruct+='};\n';
  Blockly.Arduino.definitions_['define_nrfDataStruct'] = define_nrfDataStruct;
  var code='';
  return code;
};


Blockly.Arduino.nrfDataMemberDefine = function() {
  var varName = this.getFieldValue('NAME');
  var VALUE = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);
  var flip = this.getFieldValue('FLIP');
  var code=flip +' '+ varName+';\n';
  return code;
};


Blockly.Arduino.nrfDataSender = function() {
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
  var code='';
  code+='payload_t payload = {\n';
  code+=branch;
  code+='};\n';
  return code;
};

Blockly.Arduino.nrfDataMemberSender = function() {
  var VALUE = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);
  var code=VALUE+',\n';
  return code;
};

Blockly.Arduino.nrfDataMemberReciver = function() {
  var Struct_Member = this.getFieldValue('Struct_Member');
  var code='payload.'+ Struct_Member;

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
