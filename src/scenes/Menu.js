class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }
    
    preload() {
        this.load.image('title', './assets/Title.png')
        this.load.image('credits', './assets/credits.jpeg')
        this.load.spritesheet('numbers', './assets/numbers.png', {
            frameWidth: 72,
            frameHeight: 96,
            startFrame: 0,
            endFrame: 9
        })
        this.load.audio('start', './assets/start.wav')
        this.load.audio({  
            key: 'menuMusic',
            url: './assets/vgm-mark-h-the-desert-ruins.mp3',
            loop: true
        })
    }

    create() {
        //inputs
        cursors = this.input.keyboard.createCursorKeys()
        this.CKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)

        //title screen
        this.title = this.add.image(0, 0, 'title').setOrigin(0,0)

        this.sound.stopAll()

        //PARSE score
        let nums = `00000${highscore}`

        //play menu music
        this.sound.play('menuMusic')

        //credits flag
        this.creditsUp = false
        this.cred = this.add.sprite(0, 0, 'credits').setOrigin(0, 0)
        this.cred.setAlpha(0)
        this.cred.setDepth(10)
        this.cred.setScale(.94)

        //score
        this.digit1 = this.add.sprite(358, 680 * 7.5 / 10, 'numbers', nums[nums.length - 1]).setOrigin(0).setScale(.5)
        this.digit2 = this.add.sprite(322, 680 * 7.5 / 10, 'numbers', nums[nums.length - 2]).setOrigin(0).setScale(.5)
        this.digit3 = this.add.sprite(286, 680 * 7.5 / 10, 'numbers', nums[nums.length - 3]).setOrigin(0).setScale(.5)
        this.digit4 = this.add.sprite(250, 680 * 7.5 / 10, 'numbers', nums[nums.length - 4]).setOrigin(0).setScale(.5)
        this.digit5 = this.add.sprite(214, 680 * 7.5 / 10, 'numbers', nums[nums.length - 5]).setOrigin(0).setScale(.5)


        //console.log("menu scene")
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
            if(this.creditsUp == true) {
                this.creditsUp = false
                this.cred.setAlpha(0)
                this.sound.play('start')
            }
            else{
                this.sound.stopAll()
                this.sound.play('start')
                if(loaded == true) {
                    this.scene.start('playScene')
                }
                else {
                    this.scene.start('loadScene')
                }
            }
        }
        if(Phaser.Input.Keyboard.JustDown(this.CKey) && this.creditsUp == false) {
            this.sound.play('start')
            this.creditsUp = true
            this.cred.setAlpha(1)
            //console.log("here")
        }
    }
}
