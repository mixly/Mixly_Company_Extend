'use strict';

goog.provide('Blockly.Arduino.makeblock');

goog.require('Blockly.Arduino');

Blockly.Arduino.mb_servo_move = function() {
  var dropdown_Direction = this.getFieldValue('Direction');
  var value_Speed = Blockly.Arduino.valueToCode(this, 'Speed', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['define_MeMCore'] = '#include <MeMCore.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_makeblockMove'] = 'MeDCMotor motor_9(9);'
  	+'MeDCMotor motor_10(10);'
  	+'void move(int direction, int speed)\n' 
  	+'{\n'
  	+'	int leftSpeed = 0;\n'
  	+'	int rightSpeed = 0;\n'
  	+'	if(direction == 1){\n'
  	+'		leftSpeed = speed;\n'
  	+'		rightSpeed = speed;\n'
  	+'	}else if(direction == 2){\n'
  	+'		leftSpeed = -speed;\n'
  	+'		rightSpeed = -speed;\n'
  	+'	}else if(direction == 3){\n'
  	+'		leftSpeed = -speed;\n'
  	+'		rightSpeed = speed;\n'
  	+'	}else if(direction == 4){\n'
  	+'		leftSpeed = -speed;\n'
  	+'		rightSpeed = speed;\n'
  	+'	}\n'
  	+'	motor_9.run((9)==M1?-(leftSpeed):(leftSpeed));\n'
  	+'	motor_10.run((10)==M1?-(rightSpeed):(rightSpeed));\n'
  	+'}\n';
  var code = 'move('+dropdown_Direction+','+value_Speed+');\n';
  return code;
};


Blockly.Arduino.mb_servo_setAngle = function() {
  var dropdown_port = this.getFieldValue('port');
  var dropdown_plug = this.getFieldValue('plug');
  var value_angle = Blockly.Arduino.valueToCode(this, 'angle', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['define_MeMCore'] = '#include <MeMCore.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_Servo'+ dropdown_port +'_'+ dropdown_plug] = 'Servo servo_' + dropdown_port +'_'+ dropdown_plug +';\n';
  Blockly.Arduino.definitions_['define_Port' + dropdown_port] = 'MePort port_'+ dropdown_port +'('+ dropdown_port +');'
  Blockly.Arduino.setups_['servo_setAngle'] = 'servo_' + dropdown_port +'_'+ dropdown_plug + '.attach(port_'+ dropdown_port+ '.pin'+dropdown_port +'());' +'\n';
  var code = 'servo_' + dropdown_port +'_'+ dropdown_plug + '.write('+ value_angle +');\n';
  return code;
};

Blockly.Arduino.mb_setBoradLED = function() {
  var boradLED = this.getFieldValue('boradLED');
  var Rvalue = Blockly.Arduino.valueToCode(this, 'Rvalue', Blockly.Arduino.ORDER_ATOMIC);
  var Gvalue = Blockly.Arduino.valueToCode(this, 'Gvalue', Blockly.Arduino.ORDER_ATOMIC);
  var Bvalue = Blockly.Arduino.valueToCode(this, 'Bvalue', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['define_MeMCore'] = '#include <MeMCore.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_MeRGBLed' + boradLED] = 'MeRGBLed rgbled_7(7,7==7?2:4);\n';
  var code = 'rgbled_7.setColor('+ boradLED +','+ Rvalue +','+ Gvalue +','+ Bvalue+');\n'
  		   + 'rgbled_7.show();\n';
  return code;
};


Blockly.Arduino.mb_setLED = function() {
  var LEDPort = this.getFieldValue('LEDPort');
  var value_sharp = this.getFieldValue('_sharp');
  var Rvalue = Blockly.Arduino.valueToCode(this, 'Rvalue', Blockly.Arduino.ORDER_ATOMIC);
  var Gvalue = Blockly.Arduino.valueToCode(this, 'Gvalue', Blockly.Arduino.ORDER_ATOMIC);
  var Bvalue = Blockly.Arduino.valueToCode(this, 'Bvalue', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['define_MeMCore'] = '#include <MeMCore.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_MeRGBLed' + LEDPort] = 'MeRGBLed rgbled_'+ LEDPort +'('+ LEDPort +',4);\n';
  var code = 'rgbled_'+ LEDPort +'.setColor('+ value_sharp +','+ Rvalue +','+ Gvalue +','+ Bvalue+');\n'
  		   + 'rgbled_'+ LEDPort +'.show();\n';
  return code;
};

Blockly.Arduino.mb_LEDMTX_setNumber = function() {
  var LEDPort = this.getFieldValue('LEDPort');
  var value_Num = Blockly.Arduino.valueToCode(this, 'Num', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['define_MeMCore'] = '#include <MeMCore.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_MeLEDMatrix' + LEDPort] = 'MeLEDMatrix ledMtx_'+ LEDPort +'('+LEDPort+');\n';
  var code = 'ledMtx_'+ LEDPort +'.setColorIndex(1);\n'
  		     + 'ledMtx_'+ LEDPort +'.setBrightness(6);\n'
  		     + 'ledMtx_'+ LEDPort +'.showNum('+ value_Num +',3);\n';
  return code;
};


Blockly.Arduino.mb_LEDMTX_setString = function() {
  var LEDPort = this.getFieldValue('LEDPort');
  var value_Str = Blockly.Arduino.valueToCode(this, 'Str', Blockly.Arduino.ORDER_ATOMIC);
  var value_x = Blockly.Arduino.valueToCode(this, 'x', Blockly.Arduino.ORDER_ATOMIC);
  var value_y = Blockly.Arduino.valueToCode(this, 'y', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['define_MeMCore'] = '#include <MeMCore.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_MeLEDMatrix' + LEDPort] = 'MeLEDMatrix ledMtx_'+ LEDPort +'('+ LEDPort +');\n';
  var code = 'ledMtx_'+ LEDPort +'.setColorIndex(1);\n'
  		     + 'ledMtx_'+ LEDPort +'.setBrightness(6);\n'
  		     + 'ledMtx_'+ LEDPort +'.drawStr('+ value_x + ',' + value_y +','+ value_Str +');\n';
  return code;
};

Blockly.Arduino.mb_LEDMTX_setTime = function() {
  var LEDPort = this.getFieldValue('LEDPort');
  var value_h = Blockly.Arduino.valueToCode(this, 'h', Blockly.Arduino.ORDER_ATOMIC);
  var value_m = Blockly.Arduino.valueToCode(this, 'm', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['define_MeMCore'] = '#include <MeMCore.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_MeLEDMatrix' + LEDPort] = 'MeLEDMatrix ledMtx_'+ LEDPort +'('+ LEDPort +');\n';
  var code = 'ledMtx_'+ LEDPort +'.setColorIndex(1);\n'
  		     + 'ledMtx_'+ LEDPort +'.setBrightness(6);\n'
  		     + 'ledMtx_'+ LEDPort +'.showClock('+ value_h + ',' + value_m +',0);\n';
  return code;
};
/*
Blockly.Arduino.mb_LEDMTX_freeSet = function() {
  var LEDPort = this.getFieldValue('LEDPort');
  var value_x = Blockly.Arduino.valueToCode(this, 'x', Blockly.Arduino.ORDER_ATOMIC);
  var value_y = Blockly.Arduino.valueToCode(this, 'y', Blockly.Arduino.ORDER_ATOMIC);
  var a = new Array();
  var b = new Array();
  for (var i = 0; i < 16; i++) {
    a[i] = "";
    for (var j = 1; j < 9; j++) {
      a[i] = a[i] + (this.getFieldValue('a' + j + i.toString(16)) == "TRUE") ? 1 : 0;
    }
  }
  for (var i = 0; i < 16; i++) {
    b[i] = praseInt(a[i],2);
  }
  Blockly.Arduino.definitions_['define_MeMCore'] = '#include <MeMCore.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_MeLEDMatrix' + LEDPort] = 'MeLEDMatrix ledMtx_'+ LEDPort +'('+LEDPort+');\n';
  Blockly.Arduino.definitions_['define_drawBuffer'] = 'unsigned char drawBuffer[16];';
  Blockly.Arduino.definitions_['define_drawTemp'] = 'unsigned char *drawTemp;';
  var code = 'ledMtx_'+ LEDPort +'.setColorIndex(1);\n'
  		     + 'ledMtx_'+ LEDPort +'.setBrightness(6);\n'
  		     + 'drawTemp = new unsigned char[16]{';
  for (var i = 0; i < 16; i++) {
    code += b[i];
    if(i < 15)
    	code += ',';
  }

  code= code + '};\n' + 'memcpy(drawBuffer,drawTemp,16);\n' + 'free(drawTemp);\n' + 'ledMtx_' + LEDPort +'.drawBitmap(' + value_x +',' + value_y + ',16,drawBuffer);\n'
  return code;
};

Blockly.Arduino.mb_bluetooth_readString = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Makeblock.h>';
  Blockly.Arduino.definitions_['var_makeblock_bluetooth'+dropdown_pin] = 'MeBluetooth  myBluetooth_'+dropdown_pin+'('+dropdown_pin+');';
  Blockly.Arduino.setups_['setup_makeblock_bluetooth'+dropdown_pin] = 'myBluetooth_'+dropdown_pin+'.begin(9600);';
  var code = 'myBluetooth_'+dropdown_pin+'.readString()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_bluetooth_available = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Makeblock.h>';
  Blockly.Arduino.definitions_['var_makeblock_bluetooth'+dropdown_pin] = 'MeBluetooth  myBluetooth_'+dropdown_pin+'('+dropdown_pin+');';
  Blockly.Arduino.setups_['setup_makeblock_bluetooth'+dropdown_pin] = 'myBluetooth_'+dropdown_pin+'.begin(9600);';
  var code = 'myBluetooth_'+dropdown_pin+'.available()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
*/
Blockly.Arduino.mb_display = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var num = Blockly.Arduino.valueToCode(this, 'num',Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_MeMCore'] = '#include <MeMCore.h>';
  Blockly.Arduino.definitions_['var_makeblock_display'+dropdown_pin] = 'Me7SegmentDisplay  seg7_'+dropdown_pin+'('+dropdown_pin+');';
  var code = 'seg7_'+dropdown_pin+'.display((float)('+num+'));\n';
  return code;
};

Blockly.Arduino.mb_motor = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var speed = Blockly.Arduino.valueToCode(this, 'speed',Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Arduino.definitions_['define_MeMCore'] = '#include <MeMCore.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_makeblockMove'] = 'MeDCMotor motor_9(9);'
    +'MeDCMotor motor_10(10);'
    +'void move(int direction, int speed)\n' 
    +'{\n'
    +'  int leftSpeed = 0;\n'
    +'  int rightSpeed = 0;\n'
    +'  if(direction == 1){\n'
    +'    leftSpeed = speed;\n'
    +'    rightSpeed = speed;\n'
    +'  }else if(direction == 2){\n'
    +'    leftSpeed = -speed;\n'
    +'    rightSpeed = -speed;\n'
    +'  }else if(direction == 3){\n'
    +'    leftSpeed = -speed;\n'
    +'    rightSpeed = speed;\n'
    +'  }else if(direction == 4){\n'
    +'    leftSpeed = -speed;\n'
    +'    rightSpeed = speed;\n'
    +'  }\n'
    +'  motor_9.run((9)==M1?-(leftSpeed):(leftSpeed));\n'
    +'  motor_10.run((10)==M1?-(rightSpeed):(rightSpeed));\n'
    +'}\n';
  var code = 'motor_'+ dropdown_pin +'.run(('+ dropdown_pin +')==M1?-(0):(0));\n';
  return code;
};

Blockly.Arduino.mb_sound = function() {
  var value_tone = Blockly.Arduino.valueToCode(this, 'tone',Blockly.Arduino.ORDER_ATOMIC) || '0';
  var value_duration = Blockly.Arduino.valueToCode(this, 'duration',Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_MeMCore'] = '#include <MeMCore.h>';
  Blockly.Arduino.definitions_['makeblock_buzzer'] = 'MeBuzzer buzzer;';
  var code = 'buzzer.tone('+ value_tone +','+ value_duration +');';
  return code;
};

Blockly.Arduino.mb_soundsensor = function() {
  var port = this.getFieldValue('port');
  Blockly.Arduino.definitions_['define_MeMCore'] = '#include <MeMCore.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_MeSoundSensor' + port] = 'MeSoundSensor soundsensor_'+ port +'(' + port +');\n';
  var code = 'soundsensor_'+ port +'.strength()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_temperature = function() {
  var port = this.getFieldValue('port');
  var plug = this.getFieldValue('plug');
  Blockly.Arduino.definitions_['define_MeMCore'] = '#include <MeMCore.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_MeTemperature' + port + plug] = 'MeTemperature temperature_'+ port +'_'+ plug +'(' + port +','+ plug +');\n';
  var code = 'temperature_'+port+'_'+plug+'.temperature()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_joystick = function() {
  var port = this.getFieldValue('port');
  var dropdown_stat = this.getFieldValue('STAT');
  Blockly.Arduino.definitions_['define_MeMCore'] = '#include <MeMCore.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_MeJoystick'+ port] = 'MeJoystick  joystick_'+ port +'('+ port +');';
  var code = 'joystick_'+ port +'.read('+dropdown_stat+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_gyro = function() {
  var dropdown_stat = this.getFieldValue('STAT');
  Blockly.Arduino.definitions_['define_MeMCore'] = '#include <MeMCore.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_MeGyro'] = 'MeGyro gyro;';
  Blockly.Arduino.setups_['setup_gyro_begin'] = 'gyro.begin();';
  var code = 'gyro.getAngle('+ dropdown_stat +')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_potentiometer = function() {
  var port = this.getFieldValue('port');
  Blockly.Arduino.definitions_['define_MeMCore'] = '#include <MeMCore.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_MePotentiometer' + port] = 'MePotentiometer potentiometer_'+ port +'(' + port +');\n';
  var code = 'potentiometer_'+ port +'.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_pyroelectric_infrared = function() {
  var port = this.getFieldValue('port');
  Blockly.Arduino.definitions_['define_MeMCore'] = '#include <MeMCore.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_MePIRMotionSensor' + port] = 'MePIRMotionSensor pir_'+ port +'(' + port +');\n';
  var code = 'pir_'+ port +'.isHumanDetected()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_Ultrasonic = function() {
  var port = this.getFieldValue('port');
  Blockly.Arduino.definitions_['define_MeMCore'] = '#include <MeMCore.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_MeUltrasonicSensor' + port] = 'MeUltrasonicSensor ultrasonic_'+ port +'(' + port +');\n';
  var code = 'ultrasonic_'+ port +'.distanceCm()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_LineFollower = function() {
  var port = this.getFieldValue('port');
  Blockly.Arduino.definitions_['define_MeMCore'] = '#include <MeMCore.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_MeLineFollower' + port] = 'MeLineFollower linefollower_'+ port +'(' + port +');\n';
  var code = 'linefollower_'+ port +'.readSensors()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/*
Blockly.Arduino.mb_light_grayscale = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Makeblock.h>';
  Blockly.Arduino.definitions_['var_makeblock_light_grayscale'+dropdown_pin] = 'MeLightSensor  myLightSensor_'+dropdown_pin+'('+dropdown_pin+');';
  var code = 'myLightSensor_'+dropdown_pin+'.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_light_grayscale_led = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var dropdown_stat = this.getFieldValue('STAT');
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Makeblock.h>';
  Blockly.Arduino.definitions_['var_makeblock_light_grayscale'+dropdown_pin] = 'MeLightSensor  myLightSensor_'+dropdown_pin+'('+dropdown_pin+');';
  var code = 'myLightSensor_'+dropdown_pin+'.'+dropdown_stat+'();\n';
  return code;
};
*/
Blockly.Arduino.mb_setLightsensor = function() {
  var LEDPort = this.getFieldValue('LEDPort');
  var dropdown_stat = this.getFieldValue('STAT');
  Blockly.Arduino.definitions_['define_MeMCore'] = '#include <MeMCore.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_MeLightSensor' + LEDPort] = 'MeLightSensor lightsensor_'+ LEDPort +'('+ LEDPort +');\n';
  var code = 'lightsensor_'+ LEDPort +'.dWrite1('+ dropdown_stat + ');\n';
  return code;
};


Blockly.Arduino.mb_camera = function() {
  var port = this.getFieldValue('port');
  var dropdown_stat = this.getFieldValue('STAT');
  Blockly.Arduino.definitions_['define_MeMCore'] = '#include <MeMCore.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_MeShutter' + port] = 'MeShutter shutter_'+ port +'('+ port +');\n';
  var code = 'shutter_'+ port + '.setState(' +dropdown_stat + ');\n';
  return code;
};


Blockly.Arduino.mb_fan = function() {
  var port = this.getFieldValue('port');
  var dropdown_stat = this.getFieldValue('STAT');
  Blockly.Arduino.definitions_['define_MeMCore'] = '#include <MeMCore.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_MePort' + port] = 'MePort dc130('+ port +');\n';
  Blockly.Arduino.definitions_['define_dc130_run'] = 'void dc130_run( uint8_t port, int8_t direction){\n'
  + 'pinMode(dc130.pin1(),OUTPUT);\n'
  + 'pinMode(dc130.pin2(),OUTPUT);\n'
  + 'if( direction > 0){\n'
  + '\tdigitalWrite(dc130.pin2(),0);'
  + '\tdigitalWrite(dc130.pin1(),1);'
  + '}\n'
  + 'else if( direction < 0){\n'
  + '\tdigitalWrite(dc130.pin1(),0);'
  + '\tdigitalWrite(dc130.pin2(),1);'
  + '}\n'
  +	'else{\n'
  +	'\tdigitalWrite(dc130.pin1(),0);'
  +	'\tdigitalWrite(dc130.pin2(),0);'
  + '}\n'
  + '}';
  var code = 'dc130_run('+ port + ',' +dropdown_stat + ');\n';
  return code;
};

Blockly.Arduino.mb_limitSwitch = function() {//有问题，需要在loop里加一个update函数
  var port = this.getFieldValue('port');
  var plug = this.getFieldValue('plug');
  Blockly.Arduino.definitions_['define_MeMCore'] = '#include <MeMCore.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_MeLimitSwitch' + port + plug] = 'MeLimitSwitch sw_'+ port +'_'+ plug +'(' + port +','+ plug +');\n';
  var code = 'sw_'+port+'_'+plug+'.touched()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_DHT11 = function() {
  var port = this.getFieldValue('port');
  var dropdown_stat = this.getFieldValue('STAT');
  Blockly.Arduino.definitions_['define_MeMCore'] = '#include <MeMCore.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_MeHumiture' + port] = 'MeHumiture humiture_'+ port +'(' + port + ');\n';
  var code = 'humiture_'+ port +'.getValue('+dropdown_stat+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.mb_flamesensor = function() {
  var port = this.getFieldValue('port');
  Blockly.Arduino.definitions_['define_MeMCore'] = '#include <MeMCore.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_MeFlameSensor' + port] = 'MeFlameSensor flameSensor_'+ port +'(' + port +');\n';
  var code = 'flameSensor_'+ port +'.readAnalog()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_gasSensor = function() {
  var port = this.getFieldValue('port');
  Blockly.Arduino.definitions_['define_MeMCore'] = '#include <MeMCore.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_MeGasSensor' + port] = 'MeGasSensor gasSensor_'+ port +'(' + port +');\n';
  var code = 'gasSensor_'+ port +'.readAnalog()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_touchSensor = function() {
  var port = this.getFieldValue('port');
  Blockly.Arduino.definitions_['define_MeMCore'] = '#include <MeMCore.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_MeTouchSensor' + port] = 'MeTouchSensor touchSensor_'+ port +'(' + port +');\n';
  var code = 'touchSensor_'+ port +'.touched()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_compass = function() {
  var port = this.getFieldValue('port');
  Blockly.Arduino.definitions_['define_MeMCore'] = '#include <MeMCore.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_MeCompass' + port] = 'MeCompass compass_'+ port +'(' + port +');\n';
  Blockly.Arduino.setups_['setup_makeblock_compass'+port] = 'compass_'+port+'.begin();';
  var code = 'compass_'+ port +'.getAngle()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_button = function() {
  var port = this.getFieldValue('port');
  Blockly.Arduino.definitions_['define_MeMCore'] = '#include <MeMCore.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_Me4Button' + port] = 'Me4Button buttonSensor_'+ port +'(' + port +');\n';
  var code = 'buttonSensor_'+ port +'.pressed()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_ir_send = function() {
  var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '\"\"'
  Blockly.Arduino.definitions_['define_MeMCore'] = '#include <MeMCore.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_MeIR'] = 'MeIR ir;';
  Blockly.Arduino.setups_['setup_ir_begin'] = 'ir.begin();';
  var code = 'ir.sendString('+ content +');\n';
  return code;
};

Blockly.Arduino.mb_ir_receive = function() {
  var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '\"\"'
  Blockly.Arduino.definitions_['define_MeMCore'] = '#include <MeMCore.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['define_MeIR'] = 'MeIR ir;';
  Blockly.Arduino.setups_['setup_ir_begin'] = 'ir.begin();';
  var code = 'ir.getString()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
