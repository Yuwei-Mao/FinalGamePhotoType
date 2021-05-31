// Bullet frefab
class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this); 
        scene.physics.add.existing(this);

        // add object to the existing scene
        this.isFiring = false; // track bullet firing status
        this.moveSpeed = 500; 
        this.body.allowGravity = false;
        this.movedFrame = 0;
        this.timeMoving = 0.15;

    }

    update() {
        
        if(this.isFiring) {
            this.movedFrame += 1;
            if (this.movedFrame >= 60*this.timeMoving){
                this.reset();
            }
        }
    }

    //reset rocket to "ground"

    //fire while game.input.activePointer.leftButton.isDown is true
    fire(ax,ay) {
        
            this.isFiring = true;
            this.x = ax;
            this.y = ay;
            if (ax>=centerX){
                ax = 200;
            }
            var directionX = parseInt(ax - game.input.mousePointer.x)
            var directionY = parseInt(ay - game.input.mousePointer.y)
		    this.setVelocityX(-(directionX/(Math.abs(directionY)+Math.abs(directionX))) * this.moveSpeed);
            this.setVelocityY(-(directionY/(Math.abs(directionY)+Math.abs(directionX))) * this.moveSpeed);    
        
        console.log(this.isFiring)
    }

    reset() {
        this.isFiring = false;
        this.x = -100;
        this.y = -100;
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.movedFrame = 0;
    }
}