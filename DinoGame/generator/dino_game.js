;(() => {
    //
    Blockly.Arduino.forBlock.dino_game_setup = function () {
        var oled = this.getFieldValue('oled')
        Blockly.Arduino.definitions_[
            'header'
        ] = `#include "dino_game_arduino.h"\nDinoGameArduino dinoGameArduino(&${oled});`
        Blockly.Arduino.setups_['setup'] = 'dinoGameArduino.setup();'
        var code = ''
        return code
    }

    Blockly.Arduino.forBlock.dino_game_loop = function () {
        var code = 'dinoGameArduino.loop();'
        return code
    }

    Blockly.Arduino.forBlock.dino_game_start_game = function () {
        var code = 'dinoGameArduino.startGame();'
        return code
    }

    Blockly.Arduino.forBlock.dino_game_dino_jump = function () {
        var code = 'dinoGameArduino.dinoJump();'
        return code
    }
    Blockly.Arduino.forBlock.dino_game_set_cheat = function () {
        var dropdown_isCheat = this.getFieldValue('isCheat')
        var code = `dinoGameArduino.setCheatMode(${dropdown_isCheat});`
        return code
    }

    Blockly.Arduino.forBlock.dino_game_show_ultraman = function () {
        var code = 'dinoGameArduino.showUltraman();'
        return code
    }
})()
