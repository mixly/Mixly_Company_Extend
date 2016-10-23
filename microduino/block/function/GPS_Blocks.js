'use strict';

goog.provide('Blockly.Blocks.Microduino');

goog.require('Blockly.Blocks');


//var colorSet=65;
var colorSet='#e5b748';


Blockly.Blocks.GPS = {
  init: function() {
    this.setColour(colorSet);

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



Blockly.Blocks.GPSShows = {
  init: function() {
    this.setColour(colorSet);

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

    // this.appendValueInput("GPSFix", String)
    //     .setCheck([String,Number])
    //     .setAlign(Blockly.ALIGN_RIGHT)
    //     .appendField(Blockly.GPSFix);

    this.appendValueInput("GPSFix", String)
        .setCheck([Boolean])
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
    this.setColour(colorSet);
    this.appendDummyInput()
    .appendField(Blockly.GPSHour)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSMinute = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput()
    .appendField(Blockly.GPSMinute)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSSeconds = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput()
    .appendField(Blockly.GPSSeconds)
    this.setOutput(true, String);

  }
};


Blockly.Blocks.GPSDay = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput()
    .appendField(Blockly.GPSDay)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSMonth = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput()
    .appendField(Blockly.GPSMonth)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSYear = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput()
    .appendField(Blockly.GPSYear)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSFix = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput()
    .appendField(Blockly.GPSFix)
    this.setOutput(true, Boolean);

  }
};

Blockly.Blocks.GPSQuality = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput()
    .appendField(Blockly.GPSQuality)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSLatitude = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput()
    .appendField(Blockly.GPSLatitude)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSLat = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput()
    .appendField(Blockly.GPSLat)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSLongitude = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput()
    .appendField(Blockly.GPSLongitude)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSLon = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput()
    .appendField(Blockly.GPSLon)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSSpeed = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput()
    .appendField(Blockly.GPSSpeed)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSAngle = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput()
    .appendField(Blockly.GPSAngle)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSAltitude = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput()
    .appendField(Blockly.GPSAltitude)
    this.setOutput(true, String);

  }
};

Blockly.Blocks.GPSSatellites = {
  init: function() {
    this.setColour(colorSet);
    this.appendDummyInput()
    .appendField(Blockly.GPSSatellites)
    this.setOutput(true, String);

  }
};