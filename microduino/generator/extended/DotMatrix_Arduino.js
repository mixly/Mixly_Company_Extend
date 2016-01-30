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



