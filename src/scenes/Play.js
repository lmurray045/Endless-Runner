class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        this.GAME_OVER = false
        this.RIDERS_PASSED = 0
        this.PASS = false
    }

    create() {
        //console.log("play scene")
        //reset parameters
        this.sound.stopAll()
        Play.GAME_OVER = false
        Play.RIDERS_PASSED = 0
        Play.RIDER_DIVISOR = 5
        Play.PASS = false
        Play.SCORE = 0

        speed = 7


        this.sound.play('playloop')

        //key binds
        cursors = this.input.keyboard.createCursorKeys()

        //tile map
        this.desert = this.add.tileSprite(0, 0, 640, 960, 'desert').setOrigin(0,0)

        //set world bounds
        this.physics.world.setBounds(120, 0, 400, 680)

        //show arrows
        if(loaded == false) {
            this.tutorial = this.add.sprite(0, 0, 'arrows').setOrigin(0, 0)
            this.time.delayedCall(2000, () => {
                this.tutorial.destroy()
            })
        }

        loaded = true
        
        //player sprite
        this.cowboy = new Player(this, game.config.height / 2, (3* game.config.width / 4), 'cowboy', 0).setOrigin(0.5, 0)
        this.cowboy.setSize(20, 46)
        this.cowboy.setScale(2.5)
        this.cowboy.body.setAllowDrag(true)
        this.cowboy.body.setDragX(1000)
        this.cowboy.setDepth(10)

        //hearts
        this.hearts = this.add.sprite(0, 0, 'health', 0).setOrigin(0)
        this.hearts.setScale(3)

        //score
        this.digit1 = this.add.sprite(572, 0, 'numbers', 0).setOrigin(0).setScale(.75)
        this.digit2 = this.add.sprite(518, 0, 'numbers', 0).setOrigin(0).setScale(.75)
        this.digit3 = this.add.sprite(464, 0, 'numbers', 0).setOrigin(0).setScale(.75)
        this.digit4 = this.add.sprite(410, 0, 'numbers', 0).setOrigin(0).setScale(.75)
        this.digit5 = this.add.sprite(356, 0, 'numbers', 0).setOrigin(0).setScale(.75)

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
        this.enemyGroup.add(rider)
    } 

    update() {

        if(Play.PASS == true) { //explanation: this flag exists because even though game over stops play flow, 
                               //it will call the timeout gameover scene multiple times. Thus, this exists to stop
        }                      //play flow and prevent multiple timeout calls
        //check game over
        else if(Play.GAME_OVER == true) {
            //stop movement
            this.cowboy.body.stop()
            this.sound.stopAll()

            //stop gameplay
            Play.PASS = true

            //play anims
            this.cowboy.play('cowboy_death', true)
            this.hearts.play('health_0')
            this.sound.play('death')

            //handle max score
            if(highscore < Play.SCORE) {
                highscore = Play.SCORE
            }

            //take shot for game over
            setTimeout(() => {
                //CITATION: This screen shot code is ripped directly from nathans paddle parkour
                //let textureManager = this.textures;
                // take snapshot of the entire game viewport
                // https://newdocs.phaser.io/docs/3.55.2/Phaser.Renderer.WebGL.WebGLRenderer#snapshot
                // .snapshot(callback, type, encoderOptions)
                // the image is automatically passed to the callback
                game.renderer.snapshot((snapshotImage) => {
                // make sure an existing texture w/ that key doesn't already exist
                    if(this.textures.exists('titlesnapshot')) {
                        this.textures.remove('titlesnapshot')
                    }
                    // take the snapshot img returned from callback and add to texture manager
                    this.textures.addImage('titlesnapshot', snapshotImage)
                })
            }, 2500)

            //switch to game over
            setTimeout(() => {
                this.scene.start('gameOverScene')
            }, 3000)
        } 

        //update
        else {
            
            //move map
            this.desert.tilePositionY -= speed * 2
        
            //update player
            this.cowboy.update()

            //update hearts
            this.hearts.play(`health_${this.cowboy.hp}`,)

            //update score
            this.updateScore()
        }

    }

    HorseCollide(player, enemy) {
        player.collided = true
        setTimeout(() => {
            player.collided = false
            player.play('cowboy_idle', true)
        }, 3000)
        player.hp -= 1
        game.sound.play('hurt')
        if (player.hp < 1) {
            Play.GAME_OVER = true
            //console.log("GAME OVER")
        }
        else {
            player.tint = 0xFF0000
            setTimeout(() => {
                player.tint = 0xFFFFFF
            }, 3000)
        }
    }

    updateScore() {
        let nums = `00000${Play.SCORE}`
        
        this.digit1.setTexture('numbers', nums[nums.length - 1])
        this.digit2.setTexture('numbers', nums[nums.length - 2])
        this.digit3.setTexture('numbers', nums[nums.length - 3])
        this.digit4.setTexture('numbers', nums[nums.length - 4])
        this.digit5.setTexture('numbers', nums[nums.length - 5])
    }
} 