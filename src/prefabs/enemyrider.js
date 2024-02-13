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
        if(this.new && this.y > game.config.height / 3) {
            this.parentScene.spawnRider()
            this.new = false
        }

        if(this.y > game.config.height) {
            this.destroy()
            Play.RIDERS_PASSED += 1

            if(Play.RIDERS_PASSED % Play.RIDER_DIVISOR == 0 && Play.RIDERS_PASSED > 4) {
                if (speed < max_speed) {
                    speed += 1
                    Play.RIDER_DIVISOR += speed
                }
                console.log(`Speed Up! Current speed: ${speed}`)
            }
        }

        if(Play.GAME_OVER == true) {
            this.setVelocityY(-this.movespeed * 2)
            setTimeout(() => {
                this.destroy()
            }, 3000)
        }
    }
}