;(() => {
    //
    Blockly.Blocks.dino_game_setup = {
        init: function () {
            this.appendDummyInput()
                .appendField('DinoGame初始化, 选择u8g2实例:')
                .appendField(new Blockly.FieldTextInput('u8g2'), 'oled')

            this.setPreviousStatement(true, null)
            this.setNextStatement(true, null)
            this.setColour(345)
            this.setTooltip('Dino')
            this.setHelpUrl('Dino')
        },
    }

    Blockly.Blocks.dino_game_loop = {
        init: function () {
            this.appendDummyInput().appendField('DinoGame循环执行命令')
            this.setPreviousStatement(true, null)
            this.setNextStatement(true, null)
            this.setColour(345)
            this.setTooltip('Dino')
            this.setHelpUrl('Dino')
        },
    }

    Blockly.Blocks.dino_game_start_game = {
        init: function () {
            this.appendDummyInput().appendField('DinoGame开始游戏')
            this.setPreviousStatement(true, null)
            this.setNextStatement(true, null)
            this.setColour(345)
            this.setTooltip('Dino')
            this.setHelpUrl('Dino')
        },
    }

    Blockly.Blocks.dino_game_dino_jump = {
        init: function () {
            this.appendDummyInput().appendField('DinoGame恐龙跳跃')
            this.setPreviousStatement(true, null)
            this.setNextStatement(true, null)
            this.setColour(345)
            this.setTooltip('Dino')
            this.setHelpUrl('Dino')
        },
    }

    Blockly.Blocks.dino_game_set_cheat = {
        init: function () {
            this.appendDummyInput()
                .appendField('是否开启作弊')
                .appendField(
                    new Blockly.FieldDropdown([
                        ['开启', '1'],
                        ['关闭', '0'],
                    ]),
                    'isCheat'
                )
            this.setPreviousStatement(true, null)
            this.setNextStatement(true, null)
            this.setColour(345)
            this.setTooltip('Dino')
            this.setHelpUrl('Dino')
        },
    }

    Blockly.Blocks.dino_game_show_ultraman = {
        init: function () {
            this.appendDummyInput().appendField('DinoGame显示奥特曼')
            this.setPreviousStatement(true, null)
            this.setNextStatement(true, null)
            this.setColour(345)
            this.setTooltip('Dino')
            this.setHelpUrl('Dino')
        },
    }
})()
