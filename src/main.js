// Nathan Altice
// Created: 6/9/20
// Updated: 4/11/21
// Finite State Machines
// CharacterFSM example adapted from mkelly.me/blog/phaser-finite-state-machine
// refactored for Hero prefab, detangled scene code from hero code, added 'hurt' state

// DE-DANGER
'use strict';

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
    scene: [Load, Title, Credit, Menu, Play, Gameover, Map1]
};

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
let gameover = false;

let attacking = false;
let hurting = false;

let max_hp = 3
let hp = 3

let MAX_X_VEL = 100;
let MAX_Y_VEL = 1300;