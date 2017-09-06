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


  //var size=window.parseFloat(this.getFieldValue('SIZE'));
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
  var thisNum=this.getFieldValue('NUM');
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