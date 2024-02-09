class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        //create and add object to the scene
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.body.setImmovable()
        this.setCollideWorldBounds(true)
        
        //add attributes
        this.hp = 3
        this.PLAYER_VELOCITY = 700
        this.collided = false
    }

    update() {
        let playerDirection = 'idle'

        //move player
        let playerVector = new Phaser.Math.Vector2(0, 0)
        //left and right
        if(cursors.left.isDown) {
            playerVector.x = -1
            playerDirection = 'left'
        }
        else if(cursors.right.isDown) {
            playerVector.x = 1
            playerDirection = 'right'
        }
        else {
            playerVector.x = 0
            playerDirection = 'idle'
        }

        //no up and down
        playerVector.y = 0

        //normalize
        playerVector.normalize()

        //apply velocity
        this.setAcceleration(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)

        //play animation
        //cursors.left.onDown(this.play(`cowboy_${playerDirection}`, true))
        //cursors.right.onDown(this.play(`cowboy_${playerDirection}`, true))
    }
}