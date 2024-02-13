class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }
    
    preload() {
        this.load.image('title', './assets/Title.png')
    }

    create() {
        cursors = this.input.keyboard.createCursorKeys()
        this.title = this.add.tileSprite(0, 0, 640, 640, 'title').setOrigin(0,0)
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
