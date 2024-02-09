class enemyRider extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, movespeed) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        //properties
        this.setImmovable()
        this.setSize(19, 48)
        this.setScale(2.5)
        this.parentScene = scene


        //special values
        this.hp = 3
        this.movespeed = movespeed

        //spawning control
        this.new = true

        //run down the screen
        this.setVelocityY(this.movespeed)
    }

    update() {
        if(this.new && this.y > game.config.height / 2) {
            this.parentScene.spawnRider()
            this.new = false
        }

        if(this.y > game.config.height) {
            this.destroy()
        }

        if(Play.GAME_OVER == true) {
            this.setVelocityY(-this.movespeed * 2)
            setTimeout(() => {
                this.destroy()
            }, 2000)
        }
    }
}