class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    preload() {
        this.load.image('cowboy', './assets/cowboy.png')
        this.load.image('desert', './assets/desert.png')
        this.load.image('box', './assets/box.png')
        this.load.image('enemyrider', './assets/enemyrider.png')

        this.load.spritesheet('cowboy_hurt', './assets/cowboy_hurt.png', {
            frameWidth: 24,
            frameHeight: 48,
            startFrame: 0,
            endFrame: 1
        })

        this.load.spritesheet('cowboy-lean', './assets/cowboy-lean.png', {
            frameWidth: 30,
            frameHeight: 48,
            startFrame: 0,
            endFrame: 5
        })
    }

    create() {
        cursors = this.input.keyboard.createCursorKeys()
        console.log("menu scene")
        
        //animations
        this.anims.create({
            key: 'player_damage',
            frames: this.anims.generateFrameNumbers('cowboy_hurt', {start: 0, end: 1, first:0}),
            frameRate: 5,
            repeat: 12
        })

        this.anims.create({
            key: 'cowboy_left',
            frames: this.anims.generateFrameNumbers('cowboy-lean', {start: 0, end: 2, first: 0}),
            frameRate: 5,
            repeat: 0
        })

        this.anims.create({
            key: 'cowboy_right',
            frames: this.anims.generateFrameNumbers('cowboy-lean', {start: 3, end: 5, first: 3}),
            frameRate: 5,
            repeat: 0
        })

        this.anims.create({
            key: 'cowboy_idle',
            frames: this.anims.generateFrameNumbers('cowboy-lean', {start: 0, end: 0, first: 0}),
            frameRate: 5
        })
    }

    update() {
        if (cursors.space.isDown == true) {
            this.scene.start('playScene')
        }
    }
}
