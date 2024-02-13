class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }
    
    preload() {
        this.load.image('title', './assets/Title.png')
        this.load.spritesheet('numbers', './assets/numbers.png', {
            frameWidth: 72,
            frameHeight: 96,
            startFrame: 0,
            endFrame: 9
        })
    }

    create() {
        //inputs
        cursors = this.input.keyboard.createCursorKeys()

        //title screen
        this.title = this.add.image(0, 0, 'title').setOrigin(0,0)

        //PARSE score
        let nums = `00000${highscore}`

        //score
        this.digit1 = this.add.sprite(358, 680 * 7.5 / 10, 'numbers', nums[nums.length - 1]).setOrigin(0).setScale(.5)
        this.digit2 = this.add.sprite(322, 680 * 7.5 / 10, 'numbers', nums[nums.length - 2]).setOrigin(0).setScale(.5)
        this.digit3 = this.add.sprite(286, 680 * 7.5 / 10, 'numbers', nums[nums.length - 3]).setOrigin(0).setScale(.5)
        this.digit4 = this.add.sprite(250, 680 * 7.5 / 10, 'numbers', nums[nums.length - 4]).setOrigin(0).setScale(.5)
        this.digit5 = this.add.sprite(214, 680 * 7.5 / 10, 'numbers', nums[nums.length - 5]).setOrigin(0).setScale(.5)


        console.log("menu scene")
    }

    update() {
        if (cursors.space.isDown == true) {
            if(loaded == true) {
                this.scene.start('playScene')
            }
            else {
                loaded = true
                this.scene.start('loadScene')
            }
        }
    }
}
