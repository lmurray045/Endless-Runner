//Liam Murray
//Working Title
//Description:
    //an endless cowboy themed runner!
    //rob the bank! Ride your horse! Shoot 'em dead!
//total hours:
//Citations:

let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    width: 640,
    height: 640,
    scene: [Menu, Play, GameOver, Load]
}

let game = new Phaser.Game(config)

let cursors

//set global speeds
let speed = 7

let max_speed = 20

//set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3