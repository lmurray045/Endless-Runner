class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        //loading bar
        //CITATION: This codes inspiriation was taken from Nathans Paddle Parkour
        //let loadingBar = this.add


        this.load.image('cowboy', './assets/cowboy.png')
        this.load.image('desert', './assets/desert.png')
        this.load.image('box', './assets/box.png')
        this.load.image('enemyrider', './assets/enemyrider.png')
        this.load.image('gameover', './assets/GameOver.png')
        this.load.image('title', './assets/Title.png')

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

        this.load.spritesheet('cowboy-death', './assets/cowboydeath.png', {
            frameWidth: 66,
            frameHeight: 48,
            startFrame: 0,
            endFrame: 10
        })

        this.load.spritesheet('health', './assets/health.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 3
        })
    }

    create() {
        console.log("Load Scene")
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

        this.anims.create({
            key: 'cowboy_death',
            frames: this.anims.generateFrameNumbers('cowboy-death', {start: 0, end: 10, first: 0}),
            frameRate: 10
        })

        this.anims.create({
            key: 'health_3',
            frames: this.anims.generateFrameNumbers('health', {start: 0, end: 0, first: 0}),
            frameRate: 0
        })

        this.anims.create({
            key: 'health_2',
            frames: this.anims.generateFrameNumbers('health', {start: 1, end: 1, first: 1}),
            frameRate: 0
        })

        this.anims.create({
            key: 'health_1',
            frames: this.anims.generateFrameNumbers('health', {start: 2, end: 2, first: 2}),
            frameRate: 0
        })

        this.anims.create({
            key: 'health_0',
            frames: this.anims.generateFrameNumbers('health', {start: 3, end: 3, first: 3}),
            frameRate: 0
        })

    }

    update() {
        //pass the buck to play
        this.scene.start('playScene')
    }
}