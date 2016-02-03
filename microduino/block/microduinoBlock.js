'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');

var colorRED=0;
var colorBlue=230;
var colorGreen=120;
var colorYellow=65;
var colorBlack = 518;

var colorLightBlue=220;



Blockly.Blocks.serialBegin = {
  init: function() {

        var FLIP = [['9600 baud', '9600'],
                    ['38400 baud', '38400'],
                    ['57600 baud', '57600'],
                    ['115200 baud', '115200'],
                    ['300 baud', '300'],
                    ['1200 baud', '1200'],
                    ['2400 baud', '2400'],
                    ['4800 baud', '4800'],
                    ['19200 baud', '19200'],
                    ['230400 baud', '230400'],
                    ['250000 baud', '250000']];

    this.setColour(colorRED);

    this.appendDummyInput("")
        //.appendField(new Blockly.FieldImage("../../media/Microduino/CoreUSB.png", 60, 90))
        .appendTitle(Blockly.serialSetup)
        
        .appendField(new Blockly.FieldDropdown(FLIP), 'FLIP')


    //this.appendStatementInput('DO')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
//    this.setTooltip("test");  
    this.setInputsInline(true);
    },
};



Blockly.Blocks.serialPrint = {
  init: function() {
    this.setColour(colorRED);
    
    this.appendValueInput("serialData")
    .appendTitle(Blockly.serialPrint);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    },
};


Blockly.Blocks.serialPrintln = {
  init: function() {
    this.setColour(colorRED);
    
    this.appendValueInput("serialData")
    .appendTitle(Blockly.serialPrintln);

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    },
};


Blockly.Blocks.ws2812Begin = {
  init: function() {
    this.setColour(colorRED);

    this.appendDummyInput("")
        .appendTitle(Blockly.ColorLEDInit)
        .appendField(new Blockly.FieldImage("../../media/Microduino/colorLEDBegin.png", 80, 32))

    this.appendValueInput("LEDNumber", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.ColorLEDNumber);
    this.appendValueInput("LEDPin", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.ColorLEDPin);

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);

    this.setInputsInline(true);
    },
};



Blockly.Blocks.ws2812Doing = {
  init: function() {

    this.setColour(colorRED);


    this.appendDummyInput("")
        .appendTitle(Blockly.ColorLEDControl)
        .appendField(new Blockly.FieldImage("../../media/Microduino/colorLEDCntrol.png", 40, 32))

    this.appendValueInput("LEDIndex", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.ColorLEDIndex);

    this.appendValueInput("R", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.ColorLEDRed);
    this.appendValueInput("G", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.ColorLEDGreen);
    this.appendValueInput("B", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.ColorLEDBlue);

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    },
};



var mCookie_PORTS =[["Serial0", "Serial"],["Serial1", "Serial1"],["SoftwareSerial(2,3)", "mySerial(2, 3)"],["SoftwareSerial(4,5)", "mySerial(4, 5)"]];



Blockly.Blocks.mCookie_bluetooth_readString = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_BLUETOOTH)
        .appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_BT.jpg", 45, 32))
        .appendTitle("#")
        .appendTitle(new Blockly.FieldDropdown(mCookie_PORTS), "PIN")
        .appendTitle(Blockly.LKL_BLUETOOTH_READ_STR);
    this.setOutput(true, String);
    this.setInputsInline(true);
  }
};
Blockly.Blocks.mCookie_bluetooth_Robot_Direction = {    
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_BLUETOOTH_Car)
        .appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_BT.jpg", 45, 32))
        .appendTitle("#")
        .appendTitle(new Blockly.FieldDropdown(mCookie_PORTS), "PIN")
        .appendTitle("#")
        .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_Run_f, "1"], [Blockly.LKL_Run_b, "2"], [Blockly.LKL_Run_l, "3"], [Blockly.LKL_Run_r, "4"]]),'direction')
        .appendTitle(Blockly.LKL_Run_Direction);
    //this.setInputsInline(true);
    //this.setPreviousStatement(true);
    //this.setNextStatement(true);
    this.setInputsInline(true);
    this.setOutput(true);
  }
};
Blockly.Blocks.mCookie_bluetooth_available = {

  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_BLUETOOTH)
        .appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_BT.jpg", 45, 32))
        .appendTitle("#")
        .appendTitle(new Blockly.FieldDropdown(mCookie_PORTS), "PIN")
        .appendTitle(Blockly.LKL_AVAILABLE);
    this.setOutput(true, Boolean);
    this.setInputsInline(true);
  }
};

Blockly.Blocks.GSM_SMS = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput("")
         .appendTitle(Blockly.GSM)
         .appendField(new Blockly.FieldImage("../../media/Microduino/GSM.jpg", 45, 32))
         .appendTitle(Blockly.GSM_SMS)
         .appendTitle(new Blockly.FieldTextInput('xxxxxxxxxxx'),'TELNUM')
         .appendTitle(Blockly.GSM_Read);
    this.appendValueInput('text')
        .setCheck(String)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.GSM_CONTENT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.NFC_Format = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput("")
         .appendTitle(Blockly.NFC)
         .appendField(new Blockly.FieldImage("../../media/Microduino/NFC.jpg", 45, 32))
         .appendTitle(Blockly.NFC_Format_Classic);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.NFC_Read = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput("")
         .appendTitle(Blockly.NFC)
         .appendField(new Blockly.FieldImage("../../media/Microduino/NFC.jpg", 45, 32))
         .appendTitle(Blockly.NFC_Read);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


Blockly.Blocks.nRF_Init = {
  init: function() {
            var BAUD = [['9600 baud', '9600'],
                    ['38400 baud', '38400'],
                    ['57600 baud', '57600'],
                    ['115200 baud', '115200'],
                    ['300 baud', '300'],
                    ['1200 baud', '1200'],
                    ['2400 baud', '2400'],
                    ['4800 baud', '4800'],
                    ['19200 baud', '19200'],
                    ['230400 baud', '230400'],
                    ['250000 baud', '250000']];
    this.setColour(colorBlue);
    this.appendDummyInput("")
         .appendTitle(Blockly.nRF_Init)
         .appendField(new Blockly.FieldImage("../../media/Microduino/nRF24.jpg", 45, 32))
         .appendTitle("#")
         .appendTitle(Blockly.Zigbee_Baud)
         .appendField(new Blockly.FieldDropdown(BAUD), 'BAUD')
         .appendTitle(Blockly.nRF_Interval)
         .appendField(new Blockly.FieldTextInput('200'), 'INTERVAL')
         .appendTitle(Blockly.nRF_Channel)
         .appendTitle(new Blockly.FieldTextInput('70'),'CHANNEL');
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.nRF_Send = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput("")
         .appendTitle(Blockly.nRF_Send)
         .appendField(new Blockly.FieldImage("../../media/Microduino/nRF24.jpg", 45, 32))
         .appendTitle("#")
         .appendTitle(Blockly.nRF_Interval)
         .appendTitle(new Blockly.FieldTextInput('150'),'INTERVAL')
         .appendTitle(Blockly.ms)
         .appendTitle(Blockly.Send_INFO)
         .appendTitle(new Blockly.FieldTextInput('Structure name'),'Struct_Name');

    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.nRF_Read = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput("")
         .appendTitle(Blockly.nRF_Read)
         .appendField(new Blockly.FieldImage("../../media/Microduino/nRF24.jpg", 45, 32))
         .appendTitle("#")
         .appendTitle(Blockly.Read_INFO)
         .appendTitle(new Blockly.FieldTextInput('Structure name'),'Struct_Name');
   // this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


Blockly.Blocks.smartRF_Init_Send = {
  init: function() {
        var BAUD = [['9600 baud', '9600'],
                    ['38400 baud', '38400'],
                    ['57600 baud', '57600'],
                    ['115200 baud', '115200'],
                    ['300 baud', '300'],
                    ['1200 baud', '1200'],
                    ['2400 baud', '2400'],
                    ['4800 baud', '4800'],
                    ['19200 baud', '19200'],
                    ['230400 baud', '230400'],
                    ['250000 baud', '250000']];
        var FREQ = [['433', 'CFREQ_433'],
                    ['868', 'CFREQ_868'],
                    ['915', 'CFREQ_915']];

    this.setColour(colorBlue);
    this.appendDummyInput("")
           .appendTitle(Blockly.smartRF)
        .appendField(new Blockly.FieldImage("../../media/Microduino/smartRF.jpg", 45, 32))
        .appendTitle(Blockly.smartRF_Init_Send)
        .appendTitle(Blockly.Zigbee_Baud)
        .appendField(new Blockly.FieldDropdown(BAUD), 'BAUD')
            .appendTitle(Blockly.Frequency)
        .appendField(new Blockly.FieldDropdown(FREQ), 'FREQ')
        .appendTitle(Blockly.SENDADDR)
        .appendTitle(new Blockly.FieldTextInput('4'),'SenderADDRESS')
        .appendTitle(Blockly.RECADDR)
        .appendTitle(new Blockly.FieldTextInput('5'),'ReceiverADDRESS');

     this.setPreviousStatement(true, null);
     this.setNextStatement(true, null);
     this.setInputsInline(true);
    },
};

Blockly.Blocks.smartRF_Init_Read = {
  init: function() {
        var BAUD = [['9600 baud', '9600'],
                    ['38400 baud', '38400'],
                    ['57600 baud', '57600'],
                    ['115200 baud', '115200'],
                    ['300 baud', '300'],
                    ['1200 baud', '1200'],
                    ['2400 baud', '2400'],
                    ['4800 baud', '4800'],
                    ['19200 baud', '19200'],
                    ['230400 baud', '230400'],
                    ['250000 baud', '250000']];
        var FREQ = [['433', 'CFREQ_433'],
                    ['868', 'CFREQ_868'],
                    ['915', 'CFREQ_915']];
    this.setColour(colorBlue);
    this.appendDummyInput("")
        .appendTitle(Blockly.smartRF)
        .appendField(new Blockly.FieldImage("../../media/Microduino/smartRF.jpg", 45, 32))
        .appendTitle(Blockly.smartRF_Init_Read)
        .appendTitle(Blockly.Zigbee_Baud)
        .appendField(new Blockly.FieldDropdown(BAUD), 'BAUD')
        .appendTitle(Blockly.Frequency)
        .appendField(new Blockly.FieldDropdown(FREQ), 'FREQ')
        .appendTitle(Blockly.RECADDR)
        .appendTitle(new Blockly.FieldTextInput('5'),'ReceiverADDRESS');

     this.setPreviousStatement(true, null);
     this.setNextStatement(true, null);
     this.setInputsInline(true);
    },
};

Blockly.Blocks.smartRF_Send = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput("")
      .appendTitle(Blockly.smartRF)
      .appendField(new Blockly.FieldImage("../../media/Microduino/smartRF.jpg", 45, 32))
      .appendTitle(Blockly.smartRF_Send)
      .appendTitle(new Blockly.FieldTextInput('data'),'smartRF_Data')
      .appendTitle(Blockly.smartRF_Send_Length)
      .appendTitle(new Blockly.FieldTextInput('length'),'smartRF_Data_Length');
    this.appendStatementInput('DO');

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
  }
};

Blockly.Blocks.smartRF_Read = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput("")
      .appendTitle(Blockly.smartRF)
      .appendField(new Blockly.FieldImage("../../media/Microduino/smartRF.jpg", 45, 32))
      .appendTitle(Blockly.smartRF_Read)
      .appendTitle(new Blockly.FieldTextInput('data'),'smartRF_REC_Data')

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
  }
};


Blockly.Blocks.W5500_Init = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput("")
      .appendTitle(Blockly.W5500)
    .appendField(new Blockly.FieldImage("../../media/Microduino/Zigbee.jpg", 45, 32))
    .appendTitle("#")
    .appendTitle(Blockly.W5500_Init);
    this.setOutput(true, Boolean);
  this.setInputsInline(true);

  }
};



Blockly.Blocks.WiFi = {
  init: function() {
    this.setColour(colorBlue);

    this.appendDummyInput()
    .appendField(Blockly.WiFi);


    this.appendDummyInput()
    .appendField(Blockly.WiFiSSID)
    .appendField(new Blockly.FieldTextInput(Blockly.typeSSID), "SSID")

    this.appendDummyInput()
    .appendField(Blockly.WiFiPass)
    .appendField(new Blockly.FieldTextInput(Blockly.typePass), "WiFiPASS")

    this.appendDummyInput()
    .appendField(Blockly.HOST_NAME)
    .appendField(new Blockly.FieldTextInput("www.baidu.com"), "HOST_NAME")

    this.appendDummyInput()
    .appendField(Blockly.HOST_PORT)
    .appendField(new Blockly.FieldTextInput("80"), "HOST_PORT")

    this.appendDummyInput()
    .appendField(Blockly.WEBPAGE)
    .appendField(new Blockly.FieldTextInput("/"), "WEBPAGE")

    this.appendStatementInput("WiFiInput");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    //this.setOutput(true, String);

  }
};


Blockly.Blocks.SSID = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput()
    .appendField("SSID")
    .appendField(new Blockly.FieldTextInput("yourSSID"), "SSIDValue");
    this.setOutput(true, String);

  }
};

Blockly.Blocks.WiFiPASS = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput()
    .appendField("WiFiPASS")
    .appendField(new Blockly.FieldTextInput("yourPass"), "WiFiPASS");
    this.setOutput(true, String);

  }
};

Blockly.Blocks.HOST_NAME = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput()
    .appendField("HOST_NAME")
    .appendField(new Blockly.FieldTextInput("HOST_NAME"), "HOST_NAME");
    this.setOutput(true, String);

  }
};

Blockly.Blocks.HOST_PORT = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput()
    .appendField("HOST_PORT")
    .appendField(new Blockly.FieldTextInput("HOST_PORT"), "HOST_PORT");
    this.setOutput(true, String);

  }
};


Blockly.Blocks.WEBPAGE = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput()
    .appendField("WEBPAGE")
    .appendField(new Blockly.FieldTextInput("WEBPAGE"), "WEBPAGE");
    this.setOutput(true, String);

  }
};


Blockly.Blocks.GPSShow = {
  init: function() {
    this.setColour(colorBlue);

    this.appendDummyInput()
    .appendField(Blockly.GPSShow);

    this.appendValueInput("GPSHour", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.GPSHour);
    this.appendValueInput("GPSMinute", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.GPSMinute);
    this.appendValueInput("GPSSeconds", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.GPSSeconds);
    this.appendValueInput("GPSDay", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.GPSDay);
    this.appendValueInput("GPSMonth", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.GPSMonth);
    this.appendValueInput("GPSYear", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.GPSYear);
    this.appendValueInput("GPSFix", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.GPSFix);
    this.appendValueInput("GPSQuality", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.GPSQuality);
    this.appendValueInput("GPSLatitude", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.GPSLatitude);
    this.appendValueInput("GPSLat", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.GPSLat);
    this.appendValueInput("GPSLongitude", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.GPSLongitude);
    this.appendValueInput("GPSLon", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.GPSLon);
    this.appendValueInput("GPSSpeed", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.GPSSpeed);
    this.appendValueInput("GPSAngle", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.GPSAngle);
    this.appendValueInput("GPSAltitude", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.GPSAltitude);
    this.appendValueInput("GPSSatellites", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.GPSSatellites);


    this.setPreviousStatement(true, null);

  }
};


Blockly.Blocks.GPSHour = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput()
    .appendField(Blockly.GPSHour)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSMinute = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput()
    .appendField(Blockly.GPSMinute)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSSeconds = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput()
    .appendField(Blockly.GPSSeconds)
    this.setOutput(true, String);

  }
};


Blockly.Blocks.GPSDay = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput()
    .appendField(Blockly.GPSDay)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSMonth = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput()
    .appendField(Blockly.GPSMonth)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSYear = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput()
    .appendField(Blockly.GPSYear)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSFix = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput()
    .appendField(Blockly.GPSFix)
    this.setOutput(true, Boolean);

  }
};

Blockly.Blocks.GPSQuality = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput()
    .appendField(Blockly.GPSQuality)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSLatitude = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput()
    .appendField(Blockly.GPSLatitude)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSLat = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput()
    .appendField(Blockly.GPSLat)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSLongitude = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput()
    .appendField(Blockly.GPSLongitude)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSLon = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput()
    .appendField(Blockly.GPSLon)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSSpeed = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput()
    .appendField(Blockly.GPSSpeed)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSAngle = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput()
    .appendField(Blockly.GPSAngle)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSAltitude = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput()
    .appendField(Blockly.GPSAltitude)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSSatellites = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput()
    .appendField(Blockly.GPSSatellites)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.Zigbee_AT = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput("")
      .appendTitle(Blockly.Zigbee)
    .appendField(new Blockly.FieldImage("../../media/Microduino/Zigbee.jpg", 45, 32))
    .appendTitle("#")
      .appendTitle(new Blockly.FieldDropdown(mCookie_PORTS), "PIN")
    .appendTitle(Blockly.Zigbee_SetAT);
  this.setInputsInline(true);
  }
};

Blockly.Blocks.Zigbee_Init = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput("")
         .appendTitle(Blockly.Zigbee_Init)
         .appendField(new Blockly.FieldImage("../../media/Microduino/Zigbee.jpg", 45, 32))
         .appendTitle("#")
          .appendTitle(new Blockly.FieldDropdown(mCookie_PORTS), "PIN")
    this.appendValueInput("BRate", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.Zigbee_Baud);
  this.setInputsInline(true);
      this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};


Blockly.Blocks.Zigbee_Available = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput("")
      .appendTitle(Blockly.Zigbee)
    .appendField(new Blockly.FieldImage("../../media/Microduino/Zigbee.jpg", 45, 32))
    .appendTitle("#")
    .appendTitle(Blockly.Zigbee_Available);
    this.setOutput(true, Boolean);
  this.setInputsInline(true);
  }
};

Blockly.Blocks.Zigbee_Send = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput("")
      .appendTitle(Blockly.Zigbee)
    .appendField(new Blockly.FieldImage("../../media/Microduino/Zigbee.jpg", 45, 32))
    .appendTitle("#")
    .appendTitle(Blockly.Zigbee_Send);
  this.appendValueInput('text')
        .setCheck(String)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle("Text:");

      this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks.Zigbee_Read = {
  init: function() {
    this.setColour(colorBlue);
    this.appendDummyInput("")
      .appendTitle(Blockly.Zigbee)
      .appendField(new Blockly.FieldImage("../../media/Microduino/Zigbee.jpg", 45, 32))
      .appendTitle("#")
      .appendTitle(Blockly.Zigbee_Read);
  this.setOutput(true,String);
  }
};


Blockly.Blocks.VariableIs = {
  init: function() {
    this.setColour(colorBlue);

    this.appendValueInput('VariableName', String)
        .setCheck([Number,String])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.VariableName);
  this.appendValueInput('VariableIs', String)
        .setCheck([Number,String])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.VariableIs);
    this.setOutput(true, Boolean);
  this.setInputsInline(true);
  }
};


Blockly.Blocks.DotMatrix = {
  init: function() {
    this.setColour(colorGreen);
    this.appendDummyInput()
        .appendTitle(Blockly.DotMatrix)

    this.appendDummyInput()
    .appendTitle(Blockly.DotMatrixName)
    .appendField(new Blockly.FieldTextInput("1"), "dotName");


    this.appendValueInput("row0", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MatrixRow0);
    this.appendValueInput("row1", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MatrixRow1)
    this.appendValueInput("row2", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MatrixRow2);
    this.appendValueInput("row3", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MatrixRow3)
    this.appendValueInput("row4", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MatrixRow4);
    this.appendValueInput("row5", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MatrixRow5)
    this.appendValueInput("row6", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MatrixRow6);
    this.appendValueInput("row7", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MatrixRow7)

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};


Blockly.Blocks.DotMatrixRow = {
  init: function() {

    this.setColour(colorGreen);

    this.appendDummyInput("")
        .appendTitle(" ")
        .appendField(new Blockly.FieldColour("#000000"), "Dot0");
    this.appendDummyInput("")
        .appendTitle(" ")
        .appendField(new Blockly.FieldColour("#000000"), "Dot1");
    this.appendDummyInput("")
        .appendTitle(" ")
        .appendField(new Blockly.FieldColour("#000000"), "Dot2");
    this.appendDummyInput("")
        .appendTitle(" ")
        .appendField(new Blockly.FieldColour("#000000"), "Dot3");
    this.appendDummyInput("")
        .appendTitle(" ")
        .appendField(new Blockly.FieldColour("#000000"), "Dot4");
    this.appendDummyInput("")
        .appendTitle(" ")
        .appendField(new Blockly.FieldColour("#000000"), "Dot5");
    this.appendDummyInput("")
        .appendTitle(" ")
        .appendField(new Blockly.FieldColour("#000000"), "Dot6");
    this.appendDummyInput("")
        .appendTitle(" ")
        .appendField(new Blockly.FieldColour("#000000"), "Dot7");

    this.setInputsInline(true);
    this.setOutput(true, String);
    },
};



Blockly.Blocks.MotorBegin = {
   init: function() {
    this.setColour(colorGreen);
    this.appendDummyInput("")
        .appendTitle(Blockly.CubeCar)
        .appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_Motor.jpg", 45, 32))
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    }
};

Blockly.Blocks.mCookie_Motor = {
   init: function() {
    this.setColour(colorGreen);
    this.appendDummyInput("")
        .appendField(Blockly.carSpeed)
        .appendField(new Blockly.FieldTextInput("255"), "speed")
        .appendField(Blockly.carAngle)
        .appendField(new Blockly.FieldTextInput("0"), "angle");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    }
};


Blockly.Blocks.group_lcd_begin = {
  init: function() {
    var FLIP = [['none', 'undoRotation'],['90', 'setRot90'],['180', 'setRot180'],['270', 'setRot270']];

    //this.setColour(colorYellow);
    this.setColour(colorGreen);
    this.appendDummyInput("")
        .appendTitle("OLED-loop")
    this.appendDummyInput("")
        .appendTitle("flip screen")
        .appendField(new Blockly.FieldDropdown(FLIP), 'FLIP')
    this.appendStatementInput('DO')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
//    this.setTooltip("test");
    this.setInputsInline(true);
    },
};

Blockly.Blocks.group_lcd_print = {
  init: function() {
    var TYPE = [['Small', 'setFont_S'],['Middle', 'setFont_M'],['Large', 'setFont_L']];

    // this.setColour(colorYellow);
    this.setColour(colorGreen);
    this.appendDummyInput("")
        .appendTitle("OLED-print")
    this.appendDummyInput("")
        .appendTitle("font")
        .appendField(new Blockly.FieldDropdown(TYPE), 'TYPE')
    this.appendValueInput("x", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle("x:");
    this.appendValueInput("y", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle("y:");
    this.appendValueInput("text", String)
        .setCheck([Number,String])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle("Text:");


    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);

    },
};



Blockly.Blocks.mCookie_Audio_Serial={
init:function(){
    var mCookie_MODE =[["MODE_ALL", "MODE_ALL"],["MODE_FOL", "MODE_FOL"],["MODE_ONE", "MODE_ONE"],["MODE_RAM", "MODE_RAM"],["MODE_ONE_STOP", "MODE_ONE_STOP"]];

    var mCookie_DEVICE =[["DEVICE_TF", "DEVICE_TF"],["DEVICE_FLASH", "DEVICE_FLASH"]];
    this.setColour(colorYellow);
    this.appendDummyInput("")
        .appendTitle('Choose_Audio_Serial')
        .appendTitle("#")
        .appendTitle(new Blockly.FieldDropdown(mCookie_PORTS), "PIN")
        .appendTitle(" #")
        .appendTitle(new Blockly.FieldDropdown(mCookie_DEVICE), "PIN1")
        .appendTitle(" #")
        .appendTitle(new Blockly.FieldDropdown(mCookie_MODE), "PIN2")
    this.appendValueInput("Vol", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle("Vol:");
    //this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.mCookie_Audio_Play={
init:function(){
    this.setColour(colorYellow);
    this.appendDummyInput("")
         .appendTitle('Audio_Play')
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks.mCookie_Audio_Pose={
init:function(){
    this.setColour(colorYellow);
    this.appendDummyInput("")
         .appendTitle('Audio_Pause')
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks.mCookie_Audio_Next={
init:function(){
    this.setColour(colorYellow);
    this.appendDummyInput("")
         .appendTitle('Audio_Next')
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks.mCookie_Audio_Prev={
init:function(){
    this.setColour(colorYellow);
    this.appendDummyInput("")
         .appendTitle('Audio_Prev')
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks.mCookie_Audio_VolUp={
init:function(){
    this.setColour(colorYellow);
    this.appendDummyInput("")
         .appendTitle('Audio_VolUp')
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks.mCookie_Audio_VolDown={
init:function(){
    this.setColour(colorYellow);
    this.appendDummyInput("")
         .appendTitle('Audio_VolDown')
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


Blockly.Blocks.GPS = {
  init: function() {
    this.setColour(colorYellow);

    this.appendDummyInput()
    .appendField(Blockly.GPS);

    this.appendDummyInput()
    .appendField(Blockly.GPSUpdate)
    //.setCheck(Number)
    .appendField(new Blockly.FieldTextInput("2"), "GPSUPDATE")
    .appendField(Blockly.GPSSeconds);
    this.appendStatementInput("GPSInput");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    //this.setOutput(true, String);

  }
};


Blockly.Blocks.GPSShow = {
  init: function() {
    this.setColour(colorYellow);

    this.appendDummyInput()
    .appendField(Blockly.GPSShow);

    this.appendValueInput("GPSHour", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.GPSHour);
    this.appendValueInput("GPSMinute", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.GPSMinute);
    this.appendValueInput("GPSSeconds", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.GPSSeconds);
    this.appendValueInput("GPSDay", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.GPSDay);
    this.appendValueInput("GPSMonth", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.GPSMonth);
    this.appendValueInput("GPSYear", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.GPSYear);
    this.appendValueInput("GPSFix", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.GPSFix);
    this.appendValueInput("GPSQuality", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.GPSQuality);
    this.appendValueInput("GPSLatitude", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.GPSLatitude);
    this.appendValueInput("GPSLat", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.GPSLat);
    this.appendValueInput("GPSLongitude", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.GPSLongitude);
    this.appendValueInput("GPSLon", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.GPSLon);
    this.appendValueInput("GPSSpeed", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.GPSSpeed);
    this.appendValueInput("GPSAngle", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.GPSAngle);
    this.appendValueInput("GPSAltitude", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.GPSAltitude);
    this.appendValueInput("GPSSatellites", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.GPSSatellites);




    this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);

  }
};


Blockly.Blocks.GPSHour = {
  init: function() {
    this.setColour(colorYellow);
    this.appendDummyInput()
    .appendField(Blockly.GPSHour)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSMinute = {
  init: function() {
    this.setColour(colorYellow);
    this.appendDummyInput()
    .appendField(Blockly.GPSMinute)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSSeconds = {
  init: function() {
    this.setColour(colorYellow);
    this.appendDummyInput()
    .appendField(Blockly.GPSSeconds)
    this.setOutput(true, String);

  }
};


Blockly.Blocks.GPSDay = {
  init: function() {
    this.setColour(colorYellow);
    this.appendDummyInput()
    .appendField(Blockly.GPSDay)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSMonth = {
  init: function() {
    this.setColour(colorYellow);
    this.appendDummyInput()
    .appendField(Blockly.GPSMonth)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSYear = {
  init: function() {
    this.setColour(colorYellow);
    this.appendDummyInput()
    .appendField(Blockly.GPSYear)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSFix = {
  init: function() {
    this.setColour(colorYellow);
    this.appendDummyInput()
    .appendField(Blockly.GPSFix)
    this.setOutput(true, Boolean);

  }
};

Blockly.Blocks.GPSQuality = {
  init: function() {
    this.setColour(colorYellow);
    this.appendDummyInput()
    .appendField(Blockly.GPSQuality)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSLatitude = {
  init: function() {
    this.setColour(colorYellow);
    this.appendDummyInput()
    .appendField(Blockly.GPSLatitude)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSLat = {
  init: function() {
    this.setColour(colorYellow);
    this.appendDummyInput()
    .appendField(Blockly.GPSLat)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSLongitude = {
  init: function() {
    this.setColour(colorYellow);
    this.appendDummyInput()
    .appendField(Blockly.GPSLongitude)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSLon = {
  init: function() {
    this.setColour(colorYellow);
    this.appendDummyInput()
    .appendField(Blockly.GPSLon)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSSpeed = {
  init: function() {
    this.setColour(colorYellow);
    this.appendDummyInput()
    .appendField(Blockly.GPSSpeed)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSAngle = {
  init: function() {
    this.setColour(colorYellow);
    this.appendDummyInput()
    .appendField(Blockly.GPSAngle)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSAltitude = {
  init: function() {
    this.setColour(colorYellow);
    this.appendDummyInput()
    .appendField(Blockly.GPSAltitude)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSSatellites = {
  init: function() {
    this.setColour(colorYellow);
    this.appendDummyInput()
    .appendField(Blockly.GPSSatellites)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.motionBegin = {
  init: function() {
    this.setColour(colorYellow);

    this.appendDummyInput("")
        .appendTitle(Blockly.motionInit)
        .appendField(new Blockly.FieldImage("../../media/Microduino/motion.png", 63, 70))

    //this.appendStatementInput('DO')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
//    this.setTooltip("test");  
    this.setInputsInline(true);
    },
};




Blockly.Blocks.accX = {
  init: function() {
    this.setColour(colorYellow);
    this.appendDummyInput()
        .appendTitle(Blockly.accX);
    //this.setOutput(true, Number);
    this.setOutput(true, String);
  }
};
Blockly.Blocks.accY = {
  init: function() {
    this.setColour(colorYellow);
    this.appendDummyInput()
        .appendTitle(Blockly.accY);
    //this.setOutput(true, Number);
    this.setOutput(true, String);
  }
};
Blockly.Blocks.accZ = {
  init: function() {
    this.setColour(colorYellow);
    this.appendDummyInput()
        .appendTitle(Blockly.accZ);
    //this.setOutput(true, Number);
    this.setOutput(true, String);
  }
};

Blockly.Blocks.gyroX = {
  init: function() {
    this.setColour(colorYellow);
    this.appendDummyInput()
        .appendTitle(Blockly.gyroX);
    //this.setOutput(true, Number);
    this.setOutput(true, String);
  }
};
Blockly.Blocks.gyroY = {
  init: function() {
    this.setColour(colorYellow);
    this.appendDummyInput()
        .appendTitle(Blockly.gyroY);
    //this.setOutput(true, Number);
    this.setOutput(true, String);
  }
};
Blockly.Blocks.gyroZ = {
  init: function() {
    this.setColour(colorYellow);
    this.appendDummyInput()
        .appendTitle(Blockly.gyroZ);
    //this.setOutput(true, Number);
    this.setOutput(true, String);
  }
};
Blockly.Blocks.tabSpace = {
  init: function() {
    this.setColour(colorYellow);
    this.appendDummyInput()
        .appendTitle(Blockly.tabSpace);
    //this.setOutput(true, Number);
    this.setOutput(true, String);
  }
};



Blockly.Blocks.motionDoing = {
  init: function() {
    //var FLIP = [['none', 'undoRotation'],['90', 'setRot90'],['180', 'setRot180'],['270', 'setRot270']];

    this.setColour(colorYellow);


    this.appendDummyInput("")
        .appendTitle(Blockly.motionDo)
        .appendField(new Blockly.FieldImage("../../media/Microduino/motion.png", 63, 70))

    this.appendValueInput("ax", String)
        .setCheck(String)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.accX);
    this.appendValueInput("ay", String)
        .setCheck(String)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.accY);
    this.appendValueInput("az", String)
        .setCheck(String)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.accZ);

    this.appendValueInput("gx", String)
        .setCheck(String)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.gyroX);
    this.appendValueInput("gy", String)
        .setCheck(String)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.gyroY);
    this.appendValueInput("gz", String)
        .setCheck(String)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.gyroZ);

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);

    },
};



Blockly.Blocks.mCookie_RTC_set = {
  init: function() {
    this.setColour(colorYellow);
    this.appendValueInput('Year')
        .setCheck(Number)
        .appendTitle('Set RTC Time ')
        .appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_RTC.jpg", 45, 32))
        .appendTitle(' Year');
    this.appendValueInput('Mouth')
        .setCheck(Number)
        .appendTitle('Mouth');
    this.appendValueInput('Day')
        .setCheck(Number)
        .appendTitle('Day');
    this.appendValueInput('Week')
        .setCheck(Number)
        .appendTitle('Week');
    this.appendValueInput('Hour')
        .setCheck(Number)
        .appendTitle('Hour');
    this.appendValueInput('Minute')
        .setCheck(Number)
        .appendTitle('Minute');
    this.appendValueInput('Second')
        .setCheck(Number)
        .appendTitle('Second'); 
    this.setPreviousStatement(true);
    this.setNextStatement(false);
    //this.setInputsInline(true);
  }
};

Blockly.Blocks.mCookie_RTC_date={
init:function(){
    this.setColour(colorYellow);
    this.appendDummyInput("")
         .appendTitle('FormatDate')
    this.setOutput(true, String);
    this.setInputsInline(true);
  }
};

Blockly.Blocks.mCookie_RTC_time={
init:function(){
    this.setColour(colorYellow);
    this.appendDummyInput("")
         .appendTitle('FormatTime')
    this.setInputsInline(true);
    this.setOutput(true, String);
  }
};

Blockly.Blocks.mCookie_RTC_Week={
init:function(){
    this.setColour(colorYellow);
    this.appendDummyInput("")
         .appendTitle('FormatWeek')
    this.setInputsInline(true);
    this.setOutput(true);
  }
};

Blockly.Blocks.mCookie_RTC_Hour={
init:function(){
    this.setColour(colorYellow);
    this.appendDummyInput("")
         .appendTitle('FormatHour')
    this.setInputsInline(true);
    this.setOutput(true);
  }
};

Blockly.Blocks.mCookie_RTC_Minute={
init:function(){
    this.setColour(colorYellow);
    this.appendDummyInput("")
         .appendTitle('FormatMinute')
    this.setInputsInline(true);
    this.setOutput(true);
  }
};

Blockly.Blocks.mCookie_RTC_Second={
init:function(){
    this.setColour(colorYellow);
    this.appendDummyInput("")
         .appendTitle('FormatSecond')
    this.setInputsInline(true);
    this.setOutput(true);
  }
};


Blockly.Blocks.SD_Write={
init:function(){
    this.setColour(colorYellow);
    this.appendDummyInput("")
        .appendTitle(Blockly.SD_Write)
        .appendField(new Blockly.FieldImage("../../media/Microduino/SD.jpg", 60, 32))
    this.appendValueInput('File_Name')
        .setCheck(String)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.File_Name);
    this.appendValueInput('Content')
        .setCheck(String)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.Content);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setOutput(true, Boolean);
    this.setInputsInline(true);
  }
};


Blockly.Blocks.SD_Read={
init:function(){
    this.setColour(colorYellow);
    this.appendDummyInput("")
        .appendTitle(Blockly.SD_Read)
        .appendField(new Blockly.FieldImage("../../media/Microduino/SD.jpg", 60, 32))
    this.appendValueInput('File_Name')
        .setCheck(String)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.File_Name);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setOutput(true, Boolean);
    this.setInputsInline(true);
  }
};



Blockly.Blocks.mCookie_AM2321 = {   
  init: function() {
    this.setColour(colorBlack);
    this.appendDummyInput("")
        .appendTitle(Blockly.BLE_AM2321)
        .appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_AM2321.jpg", 45, 32))
        .appendTitle("#")
        .appendTitle(new Blockly.FieldDropdown([[Blockly.BLE_Tem, "1"], [Blockly.BLE_Hum, "2"]]),'direction')
        .appendTitle(Blockly.BLE_Hum_Tem);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setOutput(true);
  }
};

Blockly.Blocks.lm75 = {
  init: function() {
    this.setColour(colorBlack);

    this.appendDummyInput()
    .appendField("LM75")
    this.setOutput(true, Number);

    var tip="获取一个温度值\n";
    tip+="输出一个数字值\n";
    tip+="IIC接口\n";
    this.setTooltip(tip);
    //this.setHelpUrl('https://www.microduino.cn/wiki/index.php/Main_Page/zh');

  }
};


Blockly.Blocks.Microduino_KEYGET = {
  init: function() {
     var INPUTTYPE = [['INPUT', 'INPUT'],
                    ['INPUTPULLUP', 'INPUTPULLUP']];
     var CHECK = [['RELEASE', 'RELEASE'],
                    ['PRESS', 'PRESS'],
                    ['ANALOG', 'ANALOG']];                   
    this.setColour(colorBlack);
    this.appendDummyInput("")
        .appendTitle(Blockly.Keyget)
        .appendTitle(Blockly.Keyget_Pin)
        .appendTitle(new Blockly.FieldTextInput('4'),'KPin')
        .appendTitle(Blockly.Keyget_InputType)
        .appendTitle(new Blockly.FieldDropdown(INPUTTYPE), "INPUTTYPE")
        .appendTitle(Blockly.Keyget_Check)
        .appendTitle(new Blockly.FieldDropdown(CHECK), "CHECK")
        .appendTitle(Blockly.Keyget_Or)
        .appendTitle(Blockly.Keyget_Analog)
        .appendTitle(new Blockly.FieldTextInput('0'),'MIN')
        .appendTitle(Blockly.Keyget_To)
        .appendTitle(new Blockly.FieldTextInput('1023'),'MAX');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    },
};

Blockly.Blocks.xJoystick = {
  init: function() {
    this.setColour(colorBlack);

    //this.appendValueInput("intValue")
    this.appendDummyInput()
    .appendField(Blockly.joyStickX)
    //.setCheck(String)
    .appendField(new Blockly.FieldTextInput("A0"), "xName");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setOutput(true, String);

  }
};


Blockly.Blocks.yJoystick = {
  init: function() {
    this.setColour(colorBlack);

    //this.appendValueInput("intValue")
    this.appendDummyInput()
    .appendField(Blockly.joyStickY)
    //.setCheck(String)
    .appendField(new Blockly.FieldTextInput("A1"), "yName");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setOutput(true, String);

  }
};

Blockly.Blocks.Microduino_ir_remote_begin = {
  init: function() {
    this.setColour(colorBlack);

    this.appendDummyInput("")
        .appendTitle(Blockly.ir_r_Init)
        .appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_ir-s.jpg", 80, 32))
  this.appendValueInput("Pin", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.ColorLEDPin);
    //this.appendStatementInput('DO')
    this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null); 
    this.setInputsInline(true);
    },
};


Blockly.Blocks.Microduino_ir_remote= {
  init: function() {
    this.setColour(colorBlack);        
    this.appendDummyInput("")
        .appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_ir-s.jpg", 80, 32))
          .appendTitle(Blockly.LKL_MBOT_IR_REMOTE)
          .appendTitle("#")
            .appendTitle(new Blockly.FieldDropdown([["power", "0XFFA25D"], ["MENU", "0XFFE21D"],["TEST", "0XFF22DD"],["+", "0XFF02FD"],["back", "0XFFC23D"], ["<<", "0XFFE01F"],[">", "0XFFA857"],[">>", "0XFF906F"],["0", "0XFF6897"],["-", "0XFF9867"],["C", "0XFFB04F"],["1", "0XFF30CF"],["2", "0XFF18E7"],["3", "0XFF7A85"],["4", "0XFF10EF"],["5", "0XFF38C7"],["6", "0XFF5AA5"],["7", "0XFF42BD"],["8", "0XFF4AB5"],["9", "0XFF52AD"]]), "btn")
            .appendTitle(Blockly.LKL_MBOT_IR_REMOTE_PRESSED);
    this.setOutput(true, Boolean);
  }
};

Blockly.Blocks.IRSend= {
  init: function() {
    var TYPE = [ ['NEC', 'NEC'],
                    ['Sony', 'Sony'],
                    ['RC5', 'RC5'],
                    ['RC6', 'RC6']];
    this.setColour(colorBlack);        
    this.appendDummyInput("")
        .appendField(new Blockly.FieldImage("../../media/Microduino/mCookie_ir-s.jpg", 80, 32))
        .appendTitle(Blockly.IRSnd)
        .appendTitle("#")
        .appendTitle(Blockly.IRSend_content)
        .appendTitle(new Blockly.FieldTextInput('0xa90'),'IRCONTENT')
        .appendTitle(Blockly.IRSend_byte)
        .appendTitle(new Blockly.FieldTextInput('12'),'IRLENGTH')
        .appendTitle(Blockly.IRTYPE)
        .appendField(new Blockly.FieldDropdown(TYPE), 'TYPE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null); 
  }
};

Blockly.Blocks.ws2812Begin = {
  init: function() {
    this.setColour(colorBlack);

    this.appendDummyInput("")
        .appendTitle(Blockly.ColorLEDInit)
        .appendField(new Blockly.FieldImage("../../media/Microduino/colorLEDBegin.png", 80, 32))

    this.appendValueInput("LEDNumber", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.ColorLEDNumber);
    this.appendValueInput("LEDPin", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.ColorLEDPin);

    //this.appendStatementInput('DO')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
   // this.setTooltip("test");  
    this.setInputsInline(true);
    },
};



Blockly.Blocks.ws2812Doing = {
  init: function() {


    this.setColour(colorBlack);

    this.appendDummyInput("")
        .appendTitle(Blockly.ColorLEDControl)
        .appendField(new Blockly.FieldImage("../../media/Microduino/colorLEDCntrol.png", 40, 32))

    this.appendValueInput("LEDIndex", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.ColorLEDIndex);


    this.appendDummyInput("")
        .appendTitle(Blockly.ColorBlack)
        .appendField(new Blockly.FieldColour("#FF0000"), "colorRGB");


    //this.appendStatementInput('DO')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
//    this.setTooltip("test");  
    this.setInputsInline(true);
    },
};


Blockly.Blocks.BuzzerTone = {   
  init: function() {
    this.setColour(colorBlack);

    this.appendDummyInput("")
        .appendTitle(Blockly.Buzzer)
        .appendField(new Blockly.FieldImage("../../media/Microduino/Buzzer.jpg", 45, 32))
    .appendField(Blockly.BuzzerNum)
    .appendField(new Blockly.FieldTextInput("1"), "buzzerNumber")
    
    this.appendValueInput("BuzzerPin", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.BuzzerPin);
    this.appendValueInput("Frequency", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.Frequency);

    this.setPreviousStatement(true,null);
    this.setNextStatement(true,null);
    this.setInputsInline(true);
  },
};


Blockly.Blocks.BuzzerNoTone = { 
  init: function() {
    this.setColour(colorBlack);

    this.appendDummyInput("")
      .appendTitle(Blockly.BuzzerNoTone)
    .appendField(new Blockly.FieldImage("../../media/Microduino/Buzzer.jpg", 45, 32))
    .appendField(Blockly.BuzzerNum)
    .appendField(new Blockly.FieldTextInput("1"), "buzzerNumber")
    
    this.appendValueInput("BuzzerPin", Number)
      .setCheck(Number)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendTitle(Blockly.BuzzerPin);

    this.setPreviousStatement(true,null);
    this.setNextStatement(true,null);
    this.setInputsInline(true);
  },
};


Blockly.Blocks.Defination = {
  init: function() {
        var FLIP = [['uint16_t', 'uint16_t'],     //announce menu
                    ['uint32_t', 'uint32_t'],
                    ['double', 'double']];
    this.setColour(colorLightBlue);  //module color
    this.appendValueInput('VALUE') 
         .setCheck(Number)                          //as string
         .setAlign(Blockly.ALIGN_RIGHT)             //right side
         .appendTitle(Blockly.GLOBAL_DECLARE)
         .appendTitle(new Blockly.FieldTextInput('item'),'NAME')//put a text label
         .appendTitle(Blockly.LKL_AS)
     // .appendField(new Blockly.FieldImage("../../media/Microduino/CoreUSB.png", 60, 90))
         .appendTitle(new Blockly.FieldDropdown(FLIP), 'FLIP')//put a menu label
         .appendTitle(Blockly.LKL_VALUE);
    //this.appendStatementInput('DO')
    this.setPreviousStatement(true, null);    
    this.setNextStatement(true, null);
//    this.setTooltip("test");  
    this.setOutput(true);
    //this.setInputsInline(true);
    },
};

Blockly.Blocks.Structure = {
  init: function() {
    this.setColour(colorLightBlue);  //module color
      this.appendDummyInput("")
         .setAlign(Blockly.ALIGN_RIGHT)             //right side
         .appendTitle(Blockly.LKL_DECLARE)
         .appendTitle(new Blockly.FieldTextInput('item'),'Struct_NAME')//put a text label
         .appendTitle(Blockly.Struct)
         .appendTitle(Blockly.Struct_DEF)
         .appendTitle(new Blockly.FieldTextInput('ite_m'),'Struct_DEF');//put a text label
     // .appendField(new Blockly.FieldImage("../../media/Microduino/CoreUSB.png", 60, 90))
    this.appendStatementInput('DO');
    this.setPreviousStatement(true, null);    
    this.setNextStatement(true, null);

    },
};

Blockly.Blocks.Var_Definations = {
  init: function() {
        var FLIP = [['uint16_t', 'uint16_t'],     //announce menu
                    ['uint32_t', 'uint32_t'],
                    ['uint8_t','uint8_t'],
                    ['long','long'],
                    ['int','int'],
                    ['char','char'],
                    ['String','String'],
                    ['double', 'double']];
    this.setColour(colorLightBlue);  //module color
    this.appendValueInput('VALUE') 
         .setCheck(Number)                          //as string
         .setAlign(Blockly.ALIGN_RIGHT)             //right side
         .appendTitle(Blockly.LKL_DECLARE_STRUCT)
         .appendTitle(new Blockly.FieldTextInput('item'),'NAME')//put a text label
         .appendTitle(Blockly.LKL_AS)
     // .appendField(new Blockly.FieldImage("../../media/Microduino/CoreUSB.png", 60, 90))
         .appendTitle(new Blockly.FieldDropdown(FLIP), 'FLIP')//put a menu label
         .appendTitle(Blockly.LKL_VALUE);
    this.setPreviousStatement(true, null);    
    this.setNextStatement(true, null);
    },
};


Blockly.Blocks.Struct_Var_Definations = {
  init: function() {
    this.setColour(colorLightBlue);  //module color
      this.appendValueInput("VARI")
         .appendTitle(Blockly.STRUCT_CLASS)
         .appendTitle(new Blockly.FieldTextInput('item'),'Struct_NAME')//put a text label
         .appendTitle(Blockly.Struct_TEMP)
         .appendTitle(new Blockly.FieldTextInput('ite_m'),'Struct_Member')//put a text label
         .appendTitle(Blockly.Struct_IS);
    this.setPreviousStatement(true, null);    
    this.setNextStatement(true, null);
    },
};


Blockly.Blocks.IntDefine = {
  init: function() {
    this.setColour(colorLightBlue);

    this.appendValueInput("intValue")
    .appendTitle(Blockly.INT)
    .setCheck(Number)
    .appendField(new Blockly.FieldTextInput("a"), "intName");
    this.setOutput(true, Number);
  }
};
