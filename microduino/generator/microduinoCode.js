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


Blockly.Arduino.mCookie_bluetooth_readString = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  if(dropdown_pin=='Serial'||dropdown_pin=='Serial1')
  Blockly.Arduino.definitions_['define_mySerial'] = '#define my_Serial '+dropdown_pin;
  else
  {
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = 'SoftwareSerial '+ dropdown_pin+';';
  Blockly.Arduino.definitions_['define_mySerial'] = '#define my_Serial  mySerial';  
  }
  
  Blockly.Arduino.setups_['setup_mCookie_bluetooth'] = 'my_Serial.begin(9600);';
  Blockly.Arduino.setups_['setup_mCookie_Serial'] = 'Serial.begin(9600);';
  var code = 'my_Serial.readString()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mCookie_bluetooth_available = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['define_Software'] = '#include <SoftwareSerial.h>';
  if(dropdown_pin=='Serial'||dropdown_pin=='Serial1')
  Blockly.Arduino.definitions_['define_mySerial'] = '#define my_Serial '+dropdown_pin;
  else
  {
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = 'SoftwareSerial '+ dropdown_pin+';';
  Blockly.Arduino.definitions_['define_mySerial'] = '#define my_Serial  mySerial';  
  }
  
  Blockly.Arduino.setups_['setup_mCookie_bluetooth'] = 'my_Serial.begin(9600);';
  Blockly.Arduino.setups_['setup_mCookie_Serial'] = 'Serial.begin(9600);';
  var code = 'my_Serial.available()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


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


Blockly.Arduino.nRF_Init = function() {
  var Channel = this.getFieldValue('CHANNEL');
  var baud = this.getFieldValue('BAUD');
  var Interval = this.getFieldValue('INTERVAL');

  Blockly.Arduino.definitions_['define_include'] = '#include <RF24Network.h>\n'
  +'#include <RF24.h>\n'
  +'#include <SPI.h>';
  Blockly.Arduino.definitions_['define_option'] = 'RF24 radio(9,10);\n'
   +'RF24Network network(radio);\n' 
   +'const uint16_t this_node = 1;\n'
   +'const uint16_t other_node = 0;\n'
   +'const unsigned long interval = '+Interval+';\n'
   +'unsigned long last_sent;\n';
  Blockly.Arduino.setups_['setup_option'] = 'Serial.begin('+baud+');\n'
   +'SPI.begin();\n'
   +'radio.begin();\n'
   +'network.begin(/*channel*/ '+Channel+', /*node address*/ this_node);\n';

  var code = '';

  return code;
};

Blockly.Arduino.nRF_Send = function() {
  var Interval = this.getFieldValue('INTERVAL');
  var Struct_Name = this.getFieldValue('Struct_Name');
  Blockly.Arduino.definitions_['send_option'] = 'const unsigned long interval = '+Interval+';\n';
 
  var code = 'network.update();\n'
  +'unsigned long now = millis();\n'
  +'if ( now - last_sent >= interval  )\n'
  +' {\n'
  +'last_sent = now;\n'
  +'RF24NetworkHeader header(/*to node*/ other_node);\n'
  +'network.write(header,&'+Struct_Name+',sizeof('+Struct_Name+'));\n'
  +'}\n';
  return code;
};


Blockly.Arduino.nRF_Read = function() {
  var Receive_Name = this.getFieldValue('Struct_Name');
  
  var code = 'network.update();\n'
  +'while ( network.available() )\n'
  +'{\n'
  +'RF24NetworkHeader header;\n'
  +'network.read(header,&'+Receive_Name+',sizeof('+Receive_Name+'));\n';
  return code;
};

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







Blockly.Arduino.GPSShow = function() {

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

Blockly.Arduino.group_lcd_begin = function() {
  var branch = Blockly.Arduino.statementToCode(this, 'DO');

  Blockly.Arduino.definitions_['define_oled'] = '#include "U8glib.h"';

  var defineOled='U8GLIB_SSD1306_128X64 u8g(U8G_I2C_OPT_NONE);\n';
  defineOled+='#define setFont_L u8g.setFont(u8g_font_fur25)\n';
  defineOled+='#define setFont_M u8g.setFont(u8g_font_fixed_v0r)\n';
  defineOled+='#define setFont_S u8g.setFont(u8g_font_chikitar)\n';

  
  Blockly.Arduino.definitions_['var_oled'] = defineOled;


  var flip = this.getFieldValue('FLIP');
  var code='u8g.'+flip+'();\n';
  code+='u8g.firstPage();\n'
  code+='do {\n';
  code+=branch;
  code+='} while( u8g.nextPage() );\n';
  return code;
};

Blockly.Arduino.group_lcd_print = function() {
  var str = Blockly.Arduino.valueToCode(this, 'text', Blockly.Arduino.ORDER_ATOMIC) || 'String(\"\")'
  var x = Blockly.Arduino.valueToCode(this, 'x', Blockly.Arduino.ORDER_ATOMIC)
  var y = Blockly.Arduino.valueToCode(this, 'y', Blockly.Arduino.ORDER_ATOMIC)
  //Blockly.Arduino.definitions_['define_oled'] = '#include "U8glib.h"';
  //Blockly.Arduino.definitions_['var_oled'] = 'U8GLIB_SSD1306_128X64 oled(U8G_I2C_OPT_NONE);';
//  Blockly.Arduino.setups_['setup_oled'] = 'df_lcd.init();';
//  Blockly.Arduino.setups_['setup_oled'] = 'df_lcd.backlight();';
  var type = this.getFieldValue('TYPE');
  //var code='oled.setFont('+type+');\n';
  var code=type+';\n';
  code+='u8g.setPrintPos('+x+', '+y+');\n';
  code+='u8g.print('+str+');\n';
  return code;
};


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



Blockly.Arduino.mCookie_Motor = function() {


  var throttle = this.getFieldValue('speed');
  var steering = this.getFieldValue('angle');

  var code='throttle = '+throttle+';\n';
  code+='steering = '+steering+';\n';

  code+='MotorLeft.Driver(MotorLeft.GetData(throttle, steering, CHAN_LEFT));\n';
  code+='MotorRight.Driver(MotorRight.GetData(throttle, steering, CHAN_RIGHT));\n';
  return code;
};










Blockly.Arduino.mCookie_bluetooth_Robot_Direction = function() {
  var dropdown_pin = this.getTitleValue('PIN')
  var BLE_Run_stye = this.getTitleValue('direction')
  var code='BLE_Joystick('+BLE_Run_stye+')';

  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  if(dropdown_pin=='Serial'||dropdown_pin=='Serial1')
  Blockly.Arduino.definitions_['define_mySerial'] = '#define my_Serial '+dropdown_pin;
  else
  {
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = 'SoftwareSerial '+ dropdown_pin+';';
  Blockly.Arduino.definitions_['define_mySerial'] = '#define my_Serial  mySerial';  
  }

  Blockly.Arduino.definitions_['define_stiring'] = 'String currentInfo;';
  Blockly.Arduino.definitions_['define_data'] = 'char senderData[100];';
  Blockly.Arduino.definitions_['define_as'] = 'int angle = 90, angle1 = 90, angle2 = 90;';
  Blockly.Arduino.definitions_['define_sp'] = 'int speed = 0, speed1 = 0, speed2 = 0;';
  Blockly.Arduino.definitions_['define_lage'] = '#define lage 20\n';

  Blockly.Arduino.setups_['setup_mCookie_bluetooth'] = 'my_Serial.begin(9600);';
  Blockly.Arduino.setups_['setup_mCookie_Serial'] = 'Serial.begin(9600);';

  var joyName='BLE_Joystick';
  var min='\''+'\\'+'n'+'\'';
  var code1 = 'int ' +joyName+'(int num){\n'
  +'if('+dropdown_pin+'.available() > 0) \n'
  +'currentInfo = my_Serial.readStringUntil('+min+');\n'
  +'if (currentInfo != NULL) {\n'
  +'currentInfo.toCharArray(senderData, sizeof(senderData));\n'
  +'sscanf((char *)strstr((char *)senderData, "D:"), "D:%d,%d", &angle, &speed);\n'
  +'}\n'
  +  'if (0 < angle && angle < 90 - lage || 90 + lage < angle && angle < 180){\n'
  +  'if (0 < angle && angle < 90 - lage)\n'
  +    'angle1 = map(angle, 0, 90 - lage, 255, 0);\n'
  +  'else if (90 + lage < angle && angle < 180)\n'
  +   'angle2 = map(angle, 90 + lage, 180 , 0, 255);}\n'
  +'if (-255 < speed && speed < -lage || lage < speed && speed < 255){\n'
  +  'if (-255 < speed && speed < -lage)\n'
  +    'speed1 = map(speed, -255, -lage , 255, 0);\n'
  +  'else if (lage < speed && speed < 255)\n'
  +    'speed2 = map(speed, lage, 255, 0, 255);}\n'
  +'if (num == 1)\n'
  +  'return angle1;\n'
  +'else if (num == 2)\n'
  +  'return angle2;\n'
  +'else if (num == 3)\n'
  +  'return speed1;\n'
  +'else if (num == 4)\n'
  +  'return speed2;}\n'
  Blockly.Arduino.definitions_[joyName] = code1;
  return [code, Blockly.Arduino.ORDER_ATOMIC]|| '0';
 };


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
  setColorString+='  Wire.beginTransmission(add);\n';
  setColorString+='  temp[0] = 0x80|(y<<3)|x;\n';
  setColorString+='  temp[1] = red;\n';
  setColorString+='  temp[2] = 0x20|green;\n';
  setColorString+='  temp[3] = 0x40|blue;\n';
  setColorString+='  Wire.write(temp, 4);\n';
  setColorString+='  Wire.endTransmission();\n';
  setColorString+='}\n';

  setColorString+='byte scanAddr() {\n';
  setColorString+=' byte error, address;\n';
  setColorString+=' int nDevices;\n';
  setColorString+=' nDevices = 0;\n';
  setColorString+=' for (address = 1; address < 65; address++ ) {\n';
  setColorString+='   Wire.beginTransmission(address);\n';
  setColorString+='   error = Wire.endTransmission();\n';
  setColorString+='   if (error == 0) {\n';
  setColorString+='     if (address < 16)\n';
  setColorString+='     nDevices++;\n';
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
  setupDotMatrix+='scanAddr();\n';

  Blockly.Arduino.setups_['setup_dotSet'] = setupDotMatrix;



  
  var code='';

  code+='for(i=0; i<8; i++)\n';
  code+='{\n'
  code+='    for(j=0; j<8; j++)\n'
  code+='    {\n'
  code+='        setColor(add,i,j,rgbArray'+dotName+'[i][j][2],rgbArray'+dotName+'[i][j][1],rgbArray'+dotName+'[i][j][0]);\n'
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


Blockly.Arduino.mCookie_RTC_set = function() {
  var Year = Blockly.Arduino.valueToCode(this, 'Year', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var Mouth = Blockly.Arduino.valueToCode(this, 'Mouth', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var Day = Blockly.Arduino.valueToCode(this, 'Day', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var Week = Blockly.Arduino.valueToCode(this, 'Week', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var Hour = Blockly.Arduino.valueToCode(this, 'Hour', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var Minute = Blockly.Arduino.valueToCode(this, 'Minute', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var Second = Blockly.Arduino.valueToCode(this, 'Second', Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Arduino.definitions_['define_RTC'] = '#include <Rtc_Pcf8563.h>\n'+'Rtc_Pcf8563 rtc;\n';
  Blockly.Arduino.definitions_['define_Wire'] = '#include "Wire.h"\n';
  Blockly.Arduino.setups_['setup_RTC_data'] = 'rtc.initClock();\n'+'rtc.setDate('+Day+','+Week+','+Mouth+',0,'+Year+');';
  Blockly.Arduino.setups_['setup_RTC_time'] = 'rtc.setTime('+Hour+','+Minute+','+Second+');\n'+'Serial.begin(9600);\n';

  };
Blockly.Arduino.mCookie_RTC_date = function() {

  Blockly.Arduino.definitions_['define_RTC'] = '#include <Rtc_Pcf8563.h>\n'+'Rtc_Pcf8563 rtc;\n';
  Blockly.Arduino.definitions_['define_Wire'] = '#include "Wire.h"\n';
  Blockly.Arduino.setups_['setup_Serial'] ='Serial.begin(9600);\n';
  var code='rtc.formatDate(RTCC_DATE_US)'
  return [code, Blockly.Arduino.ORDER_ATOMIC]|| 'String(\"\")';
};

Blockly.Arduino.mCookie_RTC_time = function() {

  Blockly.Arduino.definitions_['define_RTC'] = '#include <Rtc_Pcf8563.h>\n'+'Rtc_Pcf8563 rtc;\n';
  Blockly.Arduino.definitions_['define_Wire'] = '#include "Wire.h"\n';
  Blockly.Arduino.setups_['setup_Serial'] ='Serial.begin(9600);\n';
  var code='rtc.formatTime(RTCC_TIME_HMS)'
  return [code, Blockly.Arduino.ORDER_ATOMIC]|| 'String(\"\")';
};

Blockly.Arduino.mCookie_RTC_Week = function() {

  Blockly.Arduino.definitions_['define_RTC'] = '#include <Rtc_Pcf8563.h>\n'+'Rtc_Pcf8563 rtc;\n';
  Blockly.Arduino.definitions_['define_Wire'] = '#include "Wire.h"\n';
  Blockly.Arduino.setups_['setup_Serial'] ='Serial.begin(9600);\n';
  var code='rtc.getWeekday()'
  return [code, Blockly.Arduino.ORDER_ATOMIC]|| '0';
};

Blockly.Arduino.mCookie_RTC_Hour = function() {

  Blockly.Arduino.definitions_['define_RTC'] = '#include <Rtc_Pcf8563.h>\n'+'Rtc_Pcf8563 rtc;\n';
  Blockly.Arduino.definitions_['define_Wire'] = '#include "Wire.h"\n';
  Blockly.Arduino.setups_['setup_Serial'] ='Serial.begin(9600);\n';
  var code='rtc.getHour()'
  return [code, Blockly.Arduino.ORDER_ATOMIC]|| '0';
};

Blockly.Arduino.mCookie_RTC_Minute = function() {

  Blockly.Arduino.definitions_['define_RTC'] = '#include <Rtc_Pcf8563.h>\n'+'Rtc_Pcf8563 rtc;\n';
  Blockly.Arduino.definitions_['define_Wire'] = '#include "Wire.h"\n';
  Blockly.Arduino.setups_['setup_Serial'] ='Serial.begin(9600);\n';
  var code='rtc.getMinute()'
  return [code, Blockly.Arduino.ORDER_ATOMIC]|| '0';
};

Blockly.Arduino.mCookie_RTC_Second = function() {

  Blockly.Arduino.definitions_['define_RTC'] = '#include <Rtc_Pcf8563.h>\n'+'Rtc_Pcf8563 rtc;\n';
  Blockly.Arduino.definitions_['define_Wire'] = '#include "Wire.h"\n';
  Blockly.Arduino.setups_['setup_Serial'] ='Serial.begin(9600);\n';
  var code='rtc.getSecond()'
  return [code, Blockly.Arduino.ORDER_ATOMIC]|| '0';
};


Blockly.Arduino.motionBegin = function() {
  //var branch = Blockly.Arduino.statementToCode(this, 'DO');

  Blockly.Arduino.definitions_['define_Wire'] = '#include "Wire.h"';
  Blockly.Arduino.definitions_['define_I2Cdev'] = '#include "I2Cdev.h"';
  Blockly.Arduino.definitions_['define_MPU6050'] = '#include "MPU6050.h"';


  Blockly.Arduino.definitions_['var_accelgyro'] = 'MPU6050 accelgyro;';

  Blockly.Arduino.setups_['setup_wireBegin'] = 'Wire.begin();';

  Blockly.Arduino.setups_['setup_printInitI2C'] ='Serial.println("Initializing I2C devices...");';
  Blockly.Arduino.setups_['setup_accInit'] ='accelgyro.initialize();';
  Blockly.Arduino.setups_['setup_testDevice'] ='Serial.println("Testing device connections...");';
  Blockly.Arduino.setups_['setup_printTest'] ='Serial.println(accelgyro.testConnection() ? "MPU6050 connection successful" : "MPU6050 connection failed");';

  //var flip = this.getFieldValue('FLIP');
  var code='';
  //code+='strip.show();\n'
  // code+='do {\n';
  //code+=branch;
  // code+='} while( oled.nextPage() );\n';

  return code;
};




Blockly.Arduino.accX = function() {
  Blockly.Arduino.definitions_['var_accelX'] = 'int16_t ax;';

  var code='ax';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}
Blockly.Arduino.accY = function() {
  Blockly.Arduino.definitions_['var_accelY'] = 'int16_t ay;';

  var code='ay';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}
Blockly.Arduino.accZ = function() {
  Blockly.Arduino.definitions_['var_accelZ'] = 'int16_t az;';

  var code='az';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.gyroX = function() {
  Blockly.Arduino.definitions_['var_gyroX'] = 'int16_t gx;';

  var code='gx';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}
Blockly.Arduino.gyroY = function() {
  Blockly.Arduino.definitions_['var_gyroY'] = 'int16_t gy;';

  var code='gy';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}
Blockly.Arduino.gyroZ = function() {
  Blockly.Arduino.definitions_['var_gyroZ'] = 'int16_t gz;';

  var code='gz';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.tabSpace = function() {
  var code='"\\t"';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}


Blockly.Arduino.motionDoing = function() {

  var accX = Blockly.Arduino.valueToCode(this, 'ax', Blockly.Arduino.ORDER_ATOMIC)
  var accY = Blockly.Arduino.valueToCode(this, 'ay', Blockly.Arduino.ORDER_ATOMIC)
  var accZ = Blockly.Arduino.valueToCode(this, 'az', Blockly.Arduino.ORDER_ATOMIC)

  var gyroX = Blockly.Arduino.valueToCode(this, 'gx', Blockly.Arduino.ORDER_ATOMIC)
  var gyroY = Blockly.Arduino.valueToCode(this, 'gy', Blockly.Arduino.ORDER_ATOMIC)
  var gyroZ = Blockly.Arduino.valueToCode(this, 'gz', Blockly.Arduino.ORDER_ATOMIC)

  //var flip = this.getFieldValue('FLIP');
  //var code='accelgyro.getMotion6(&'+accX+', &'+accY+', &'+accZ+', &gx, &gy, &gz);\n';
  var code='accelgyro.getMotion6(&'+accX+', &'+accY+', &'+accZ+', &'+gyroX+', &'+gyroY+', &'+gyroZ+');\n';

  //code+='strip.show();\n'
  // code+='do {\n';
  // code+=branch;
  // code+='} while( oled.nextPage() );\n';


  return code;
};


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
  code+=' if (!GPS.parse(GPS.lastNMEA()))\n';
  code+='   return;\n';
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



Blockly.Arduino.GPSShow = function() {

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


Blockly.Arduino.mCookie_Audio_Serial = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var DEVICE = this.getTitleValue('PIN1');
  var MODE = this.getTitleValue('PIN2');
  var Volce = Blockly.Arduino.valueToCode(this, 'Vol', Blockly.Arduino.ORDER_ATOMIC);
  
  Blockly.Arduino.definitions_['define_JQ6500'] = '#include "JQ6500.h"\n';
  Blockly.Arduino.definitions_['define_Software'] = '#include <SoftwareSerial.h>\n';
  
  if(dropdown_pin=='Serial'||dropdown_pin=='Serial1')
  Blockly.Arduino.definitions_['define_mySerial'] = 'JQ6500 AUDIO(&'+dropdown_pin+');';
  else
  {
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = 'SoftwareSerial '+ dropdown_pin+';';
  Blockly.Arduino.definitions_['define_mySerial'] = 'JQ6500 AUDIO(&mySerial);';
  }
  Blockly.Arduino.setups_['setup_mCookie_Serial'] = 'Serial.begin(9600);';
  Blockly.Arduino.setups_['setup_mCookie_MODE'] = 'AUDIO.init('+DEVICE+','+MODE+','+Volce+');';
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



Blockly.Arduino.BuzzerTone = function() {
var buzzerNum = this.getFieldValue('buzzerNumber');
var Frequency = Blockly.Arduino.valueToCode(this, 'Frequency', Blockly.Arduino.ORDER_ATOMIC)
var BuzzerPin = Blockly.Arduino.valueToCode(this, 'BuzzerPin', Blockly.Arduino.ORDER_ATOMIC)
Blockly.Arduino.definitions_['define_BuzzerPin'+buzzerNum] = '#define BuzzerPin'+buzzerNum+' '+BuzzerPin;

Blockly.Arduino.setups_['setup_Buzzer'+buzzerNum] = 'pinMode(BuzzerPin'+buzzerNum+',OUTPUT);';

var code='tone(BuzzerPin'+buzzerNum+','+Frequency+');\n';
return code;
};


Blockly.Arduino.BuzzerNoTone = function() {

var BuzzerPin = Blockly.Arduino.valueToCode(this, 'BuzzerPin', Blockly.Arduino.ORDER_ATOMIC)

var buzzerNum = this.getFieldValue('buzzerNumber');

Blockly.Arduino.definitions_['define_BuzzerPin'+buzzerNum] = '#define BuzzerPin'+buzzerNum+' '+BuzzerPin;

Blockly.Arduino.setups_['setup_Buzzer'+buzzerNum] = 'pinMode(BuzzerPin'+buzzerNum+',OUTPUT);';

var code='noTone(BuzzerPin'+buzzerNum+');\n';
return code;
};

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

  var code='strip.setPixelColor('+LEDNumber+', strip.Color('+hexToRgb(colorRGB)+'));\n';
  code+='strip.show();\n'

  return code;
};

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

Blockly.Arduino.xJoystick = function() {
  var xName = this.getFieldValue('xName');

  Blockly.Arduino.definitions_['var_Anolg'+xName] = '#define Pin_X '+xName;
  Blockly.Arduino.setups_['setup_pinModeX'] = 'pinMode(Pin_X,INPUT);';


  var code="analogRead(Pin_X)";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.yJoystick = function() {
  var yName = this.getFieldValue('yName');

  Blockly.Arduino.definitions_['var_Anolg'+yName] = '#define Pin_Y '+yName;
  Blockly.Arduino.setups_['setup_pinModeY'] = 'pinMode(Pin_Y,INPUT);';


  var code="analogRead(Pin_Y)";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.Microduino_KEYGET = function() {
  //var branch = Blockly.Arduino.statementToCode(this, 'DO');

  var pin = this.getFieldValue('KPin');
  var type = this.getFieldValue('INPUTTYPE');
  var check = this.getFieldValue('CHECK');
  var min = this.getFieldValue('MIN');
  var max = this.getFieldValue('MAX');

  Blockly.Arduino.definitions_['define_key'] = '#include <Microduino_Key.h>';
  Blockly.Arduino.definitions_['var_key_'+pin+''] = 'Key Key'+pin+'('+pin+', '+type+');';
  
  Blockly.Arduino.setups_['setup_Serial_key'] = 'Serial.begin(9600);';

if(check=='PRESS'||check=='RELEASE')
  var code='  if (Key'+pin+'.read('+check+'))\n'
  +'   Serial.println("KEY Key'+pin+'(digital)!");\n';
else
  var code='   if (Key'+pin+'.read(PRESS, '+min+', '+max+'))\n'
+'    Serial.println("KEY Key'+pin+'(analog)!");\n';
  return code;
};

Blockly.Arduino.lm75 = function() {


  var lm75Include="#include <inttypes.h>\n";
  lm75Include+="#include <Wire.h>\n";
  lm75Include+="#include <lm75.h>\n";

  Blockly.Arduino.definitions_['var_lm75Include'] = lm75Include;
  Blockly.Arduino.definitions_['var_lm75defineVar'] = "TempI2C_LM75 termo = TempI2C_LM75(0x48,TempI2C_LM75::nine_bits);\n";

  var code="termo.getTemp()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mCookie_AM2321 = function() {
var Tem_Hum = this.getTitleValue('direction');
var code='readByAM2321('+Tem_Hum+')';

Blockly.Arduino.definitions_['Wire'] = '#include <Wire.h>';
Blockly.Arduino.definitions_['AM2321'] = '#include <AM2321.h>';
Blockly.Arduino.setups_['setup_mCookie_Serial'] = 'Serial.begin(9600);';

var joyName='readByAM2321';
var code1 = 'float ' +joyName+'(int num){\n'
+  'AM2321 am2321;\n'
+  'am2321.read();\n'
+  'float sensor_tem=am2321.temperature/10.0;\n'
+  'float sensor_hum=am2321.humidity/10.0;\n'
+  'delay(500);\n'
+  'if(num==1)\n'
+  'return sensor_tem;\n'
+  'else if(num==2)\n'
+  'return sensor_hum;}\n'

 Blockly.Arduino.definitions_[joyName] = code1; 
 return [code, Blockly.Arduino.ORDER_ATOMIC]|| '0';
  };

  
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
  var intValue = Blockly.Arduino.valueToCode(this, 'intValue', Blockly.Arduino.ORDER_ATOMIC) || '0';

  
  Blockly.Arduino.definitions_['var_Int'+text_intName] = 'int '+text_intName+';';

  var code=text_intName+'='+intValue;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};







