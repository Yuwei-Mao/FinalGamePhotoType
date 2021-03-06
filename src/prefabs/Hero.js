// Hero frefab
class Hero extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this); 
        scene.physics.add.existing(this);

        this.scene = scene;

        //set moveVelocity
        this.moveVelocity = 20;

    }

    update() {
        
        
        
    }

    hurt() {
        this.x -= 30;
        hp -= 1;
        this.setTint(0xFF0000); 
        this.scene.time.delayedCall(500, () => {
            this.clearTint();
        });
    }


    reset() {
        
    }
}