class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    preload() {
        this.load.image('cowboy', './assets/cowboy.png')
        this.load.image('desert', './assets/desert.png')
        this.load.image('box', './assets/box.png')
    }

    create() {
        cursors = this.input.keyboard.createCursorKeys()
        console.log("menu scene")
    }

    update() {
        if (cursors.space.isDown == true) {
            this.scene.start('playScene')
        }
    }
}
