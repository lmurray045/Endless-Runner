class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        this.PLAYER_VELOCITY = 700
    }

    create() {
        console.log("play scene")

        //key binds
        cursors = this.input.keyboard.createCursorKeys()

        //tile map
        this.desert = this.add.tileSprite(0, 0, 640, 960, 'desert').setOrigin(0,0)

        //path bounding boxes
        this.side1 = this.physics.add.sprite(60, 300, 'box')
        this.side1.body.setImmovable(true)
        this.side2 = this.physics.add.sprite(580, 300, 'box')
        this.side2.body.setImmovable(true)

        //create group
        let bounds = [this.side1, this.side2]
        
        //player sprite
        this.cowboy = new Player(this, game.config.height / 2, (3* game.config.width / 4), 'cowboy', 0).setOrigin(0.5, 0)
        this.cowboy.setScale(2.5)
        this.cowboy.body.setAllowDrag(true)
        this.cowboy.body.setDragX(1000)

        //group enemies for collider
        this.enemyGroup = this.add.group({
            runChildUpdate: true  //run updates on all enemies
        })

        //enemy riders
        this.time.delayedCall(2000, () => {
            this.spawnRider()
        })

        //add wall collider
        this.physics.add.collider(this.cowboy, bounds)
    }

    //add a new rider method
    spawnRider() {
        let xspawn = Phaser.Math.Between(130, 488)
        let rider = new enemyRider(this, xspawn, -150, 'enemyrider', 0, 100).setOrigin(0.5, 0)
        console.log(xspawn)
        this.enemyGroup.add(rider)
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
        else if(cursors.right.isDown) {
            console.log('right is down')
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
        this.cowboy.setAcceleration(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)

    }
} 