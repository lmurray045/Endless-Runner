class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        this.GAME_OVER = false
        this.HIGH_NOON = false
        this.RIDERS_PASSED = 0
    }

    create() {
        console.log("play scene")

        //key binds
        cursors = this.input.keyboard.createCursorKeys()

        //tile map
        this.desert = this.add.tileSprite(0, 0, 640, 960, 'desert').setOrigin(0,0)

        //set world bounds
        this.physics.world.setBounds(120, 0, 400, 680)

        
        //player sprite
        this.cowboy = new Player(this, game.config.height / 2, (3* game.config.width / 4), 'cowboy', 0).setOrigin(0.5, 0)
        this.cowboy.setSize(20, 46)
        this.cowboy.setScale(2.5)
        this.cowboy.body.setAllowDrag(true)
        this.cowboy.body.setDragX(1000)
        this.cowboy.setDepth(10)

        //group enemies for collider
        this.enemyGroup = this.add.group({
            runChildUpdate: true  //run updates on all enemies
        })

        //enemy riders
        this.time.delayedCall(2000, () => {
            this.spawnRider()
        })

        //add enemy collider
        this.physics.add.collider(this.cowboy, this.enemyGroup, this.HorseCollide, (player, enemy) => {
            if(player.collided) {
                return false
            } else {
                return true
            }
        })
    }

    //add a new rider method
    spawnRider() {
        let xspawn = Phaser.Math.Between(130, 488)
        let rider = new enemyRider(this, xspawn, -150, 'enemyrider', 0, (speed * 40)).setOrigin(0.5, 0)
        console.log(xspawn)
        this.enemyGroup.add(rider)
    } 

    update() {
        if(Play.GAME_OVER == true) {
            this.cowboy.body.stop()
            setTimeout(() => {
                this.scene.start('gameOverScene')
            }, 3000)
        } else {
            
            //move map
            this.desert.tilePositionY -= speed
        
            //update player
            this.cowboy.update()

        }

    }

    HorseCollide(player, enemy) {
        console.log("Collison Detected")
        player.collided = true
        setTimeout(() => {
            player.collided = false
            player.play('cowboy_idle', true)
        }, 3000)
        player.hp -= 1
        console.log(`Current HP: ${player.hp}`)
        if (player.hp < 1) {
            Play.GAME_OVER = true
            console.log("GAME OVER")
        }
        else {
            player.play('player_damage', true)
        }
    }
} 