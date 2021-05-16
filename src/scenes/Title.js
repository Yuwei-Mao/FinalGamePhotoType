class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    preload() {

    }

    create() {

        let title01 = this.add.bitmapText(centerX - 5*textSpacer, centerY + 4.5*textSpacer, 'gem', 'Ligen Han', 10).setOrigin(0.5).setTint(0x4ea832);
        let title02 = this.add.bitmapText(centerX, centerY + 4.5*textSpacer, 'gem', 'Yuwei Mao', 10).setOrigin(0.5).setTint(0xff00ff);
        let title03 = this.add.bitmapText(centerX + 5*textSpacer, centerY + 4.5*textSpacer, 'gem', 'Henry Huang', 10).setOrigin(0.5).setTint(0xffff00);
        let title04 = this.add.bitmapText(centerX, centerY-textSpacer, 'gem', 'The Last Tower Guardian', 30).setOrigin(0.5).setTint(0x0099ff);
        this.add.image(centerX, centerY- 4.5*textSpacer, 'tower').setScale(2);
       
        this.add.bitmapText(centerX, centerY + 2*textSpacer, 'gem', 'Press UP ARROW to Continue', 15).setOrigin(0.5).setTint(0xa83232);

        // title text tween
        this.tweens.add({
            targets: title01,
            duration: 2500,
            angle: { from: -1, to: 1 },
            yoyo: true,
            repeat: -1,
            onRepeat: function() {
                this.cameras.main.shake(100, 0.0025);
            },
            onRepeatScope: this
        });

        this.tweens.add({
            targets: title02,
            duration: 2500,
            angle: { from: -1, to: 1 },
            yoyo: true,
            repeat: -1,
            onRepeat: function() {
                this.cameras.main.shake(100, 0.0025);
            },
            onRepeatScope: this
        });

        this.tweens.add({
            targets: title03,
            duration: 2500,
            angle: { from: -1, to: 1 },
            yoyo: true,
            repeat: -1,
            onRepeat: function() {
                this.cameras.main.shake(100, 0.0025);
            },
            onRepeatScope: this
        });

        this.tweens.add({
            targets: title04,
            duration: 2500,
            angle: { from: -3, to: 3 },
            yoyo: true,
            repeat: -1,
            onYoyo: function() {
                this.cameras.main.shake(100, 0.25);
            },
            onYoyoScope: this
        });




        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();  
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
          
            // start gameplay scene
            this.scene.start('menuScene');
        }
    }
}