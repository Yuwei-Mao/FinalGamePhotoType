// Hero prefab
class Hero extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction) {
        super(scene, x, y, texture, frame); // call Sprite parent class
        scene.add.existing(this);           // add Hero to existing scene
        scene.physics.add.existing(this);   // add physics body to scene

        // set properties
        this.direction = direction; 
        this.heroVelocity = 110;    // in pixels
        this.dashCooldown = 900;    // in ms
        this.hurtTimer = 480;       // in ms
        this.JUMP_VELOCITY = -390;         
    
    }
    
}

// hero-specific state classes
class IdleState extends State {
    enter(scene, hero) {
        hero.body.setVelocity(0);
        hero.anims.play(`walk-${hero.direction}`);
        hero.anims.stop();
    }

    execute(scene, hero) {
        
        // use destructuring to make a local copy of the keyboard object
        const { left, right, space, shift } = scene.keys;
        const HKey = scene.keys.HKey;

        // transition to swing if pressing space
        if(Phaser.Input.Keyboard.JustDown(space)) {
            this.stateMachine.transition('swing');
            return;
        }

        // transition to dash if pressing shift
        if(Phaser.Input.Keyboard.JustDown(shift)) {
            this.stateMachine.transition('dash');
            return;
            
        }

        // hurt if H key input (just for demo purposes)
        if(hurting) {
            this.stateMachine.transition('hurt');
            hurting = false;
            return;
        }

        // transition to move if pressing a movement key
        if(left.isDown || right.isDown) {
            this.stateMachine.transition('move');
            return;
        }
    }
}

class MoveState extends State {
    execute(scene, hero) {
        // use destructuring to make a local copy of the keyboard object
        const { left, right, space, shift } = scene.keys;
        const HKey = scene.keys.HKey;
        
        // transition to swing if pressing space
        if(Phaser.Input.Keyboard.JustDown(space)) {
            this.stateMachine.transition('swing');
            return;
        }

        // transition to dash if pressing shift
        if(Phaser.Input.Keyboard.JustDown(shift) && hero.body.y == 256-64) {
            this.stateMachine.transition('dash');
            return;
        }

        // hurt if H key input (just for demo purposes)
        if(Phaser.Input.Keyboard.JustDown(HKey)) {
            this.stateMachine.transition('hurt');
            return;
        }

        // transition to idle if not pressing movement keys
        if(!(left.isDown || right.isDown )) {
            this.stateMachine.transition('idle');
            return;
        }

        // handle movement
        hero.body.setVelocity(0);
        
        if(left.isDown) {
            hero.body.setVelocityX(-hero.heroVelocity);
            hero.direction = 'left';
        } else if(right.isDown) {
            hero.body.setVelocityX(hero.heroVelocity);
            hero.direction = 'right';
        }

        // handle animation
        hero.anims.play(`walk-${hero.direction}`, true);

    }
}

class SwingState extends State {
    enter(scene, hero) {
        scene.sound.play('attack');
        hero.body.setVelocity(0);
        attacking = true;
        hero.anims.play(`swing-${hero.direction}`);
        hero.once('animationcomplete', () => {
            attacking = false;
            this.stateMachine.transition('idle');
        });
    }
}

class DashState extends State {
    enter(scene, hero) {
        //scene.sound.play('shift');
        
        //hero.anims.play(`swing-${hero.direction}`);
        // switch(hero.direction) {
        //     case 'left':
        //         hero.body.setVelocityY(-hero.heroVelocity * 3);
        //         break;
        //     case 'right':
        //         hero.body.setVelocityY(hero.heroVelocity * 3);
        //         break;
        // }
        //hero.body.setVelocityX(0);
        const { left, right, space, shift } = scene.keys;
        //scene.sound.play('shift');
        if(left.isDown) {
            hero.body.setVelocityX(-hero.heroVelocity);
            hero.body.setVelocityY(hero.JUMP_VELOCITY);
            hero.direction = 'left';
        } else if(right.isDown) {
            hero.body.setVelocityX(hero.heroVelocity);
            hero.body.setVelocityY(hero.JUMP_VELOCITY);
            hero.direction = 'right';
        } else{
            hero.body.setVelocityY(hero.JUMP_VELOCITY);
        }
        //hero.anims.play(`swing-${hero.direction}`);
        //this.stateMachine.transition('idle');
        // set a short delay before going back to idle
        scene.time.delayedCall(260, () => {
             this.stateMachine.transition('idle');
        });
        //hero.body.setVelocityY(this.JUMP_VELOCITY);
        //this.stateMachine.transition('idle');
        
    }
}

class HurtState extends State {
    enter(scene, hero) {
        hero.body.setVelocity(0);
        hero.anims.play(`walk-${hero.direction}`);
        hero.anims.stop();
        hero.setTint(0xFF0000);     // turn red

        // set recovery timer
        scene.time.delayedCall(hero.hurtTimer, () => {
            hero.clearTint();
            this.stateMachine.transition('idle');
        });
    }
}