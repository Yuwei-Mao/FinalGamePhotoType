// Eyeball frefab
class Eyeball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this); 
        scene.physics.add.existing(this);

        this.scene = scene;

        //set move range
        this.rangeA = this.x - 64;
        this.rangeB = this.x + 64;

        //set moveVelocity
        this.moveVelocity = 20;

        //set destroyed
        this.destroyed = false;

        //set hp
        this.hp = 3;

    }

    update() {
        
        if (!this.destroyed){
            this.setVelocityX(-20);
        }
        
        
    }

    hurt() {
        this.x += 20;
        this.hp -= 1;
        this.setTint(0xFF0000); 
        this.scene.time.delayedCall(500, () => {
            this.clearTint();
        });
    }

    fire() {
        
            
    }

    reset() {
        
    }
}