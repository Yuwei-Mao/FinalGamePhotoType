class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        //load sheets
        this.load.path = './assets/';
        this.load.spritesheet('hero', 'hero-sheet.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet('pink_eyeball', 'Pink-Eyeball.png', {
            frameWidth: 32,
            frameHeight: 32,
        })

        this.load.bitmapFont('gem', 'gem.png', 'gem.xml');
        this.load.image('tower', 'tower.png');
        this.load.atlas('monster_atlas', 'monster.png', 'monster.json');
        this.load.image('bg','bg.png')
        this.load.image('hider','hider.png')

        //load audio
        this.load.audio('attack','attack.wav');
        this.load.audio('shift','shift.wav');
    }

    create() {
        //

        // go to Title scene
        this.scene.start('titleScene');
    }
}