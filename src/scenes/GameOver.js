class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene')
    }

    create() {
        //console.log("GameOver Scene")

        this.sound.play('deathloop')

        //inputs
        this.RKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        this.MKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
        
        //CITATION: This is also taken from Paddle Parkour
        // add snapshot image from prior Scene
        if (this.textures.exists('titlesnapshot')) {
            this.add.image(this.game.config.width/2, this.game.config.height/2, 'titlesnapshot').setOrigin(0.5);
        } else {
            console.log('texture error');
        }

        this.gameover = this.add.image(0, 0, 'gameover').setOrigin(0,0)
    }

    update() {
        //restart
        if(Phaser.Input.Keyboard.JustDown(this.RKey)) {
            Play.GAME_OVER = false
            Play.PASS = false
            Play.RIDERS_PASSED = 0
            this.scene.start('playScene')
        }

        //Main Menu
        if(Phaser.Input.Keyboard.JustDown(this.MKey)) {
            Play.GAME_OVER = false
            Play.PASS = false
            Play.RIDERS_PASSED = 0
            this.scene.start('menuScene')
        }

    }
}