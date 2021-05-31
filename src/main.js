const config = {
    parent: 'phaser-game', 
    type: Phaser.AUTO,     
    width: 400,
    height: 256,
    pixelArt: true,
    zoom: 2,
    physics: {
        default: "arcade"
    },
    scene: [Load, Title, Credit, Menu, Map1]
}

// define game
const game = new Phaser.Game(config);
let centerX = game.config.width / 2;
let centerY = game.config.height / 2;
let quarterX = game.config.width / 4;
let quarterY = game.config.height / 4;
let w = game.config.width;
let h = game.config.height;
const SCALE = 2;
const textSpacer = 20;
let cursors;
//let gameover = false;

//let attacking = false;


let hp = 3;
