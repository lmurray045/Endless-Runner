class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        this.PLAYER_VELOCITY = 350
    }

    create() {
        console.log("play scene")
        //key binds
        cursors = this.input.keyboard.createCursorKeys()

        //tile map
        this.desert = this.add.tileSprite(0, 0, 640, 960, 'desert').setOrigin(0,0)

        //path bounding boxes
        let side1 = this.physics.add.sprite()

        //player sprite
        this.cowboy = new Player(this, game.config.height / 2, (3* game.config.width / 4), 'cowboy', 0).setOrigin(0.5, 0)
        this.cowboy.setScale(2.5)
    }

    update() {
        //move map
        this.desert.tilePositionY -= speed
        let playerDirection = 'forward'

        //move player
        let playerVector = new Phaser.Math.Vector2(0, 0)
        //left and right
        if(cursors.left.isDown) {
            console.log('left is down')
            playerVector.x = -1
            playerDirection = 'left'
        }
        if(cursors.right.isDown) {
            console.log('right is down')
            playerVector.x = 1
            playerDirection = 'right'
        }

        //no up and down
        playerVector.y = 0

        //normalize
        playerVector.normalize()

        //apply velocity
        this.cowboy.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)

    }
} 