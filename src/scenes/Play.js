class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {

    }

    create() {


        // monster animation
        this.anims.create({
            key: 'monstermove',
            frames: [
                { frame: 'monster0001' },
                { frame: 'monster0002' },
                { frame: 'monster0003' },
                { frame: 'monster0004' },
                { frame: 'monster0005' }
            ],
            defaultTextureKey: 'monster_atlas',
            repeat: -1
        });
        // add bg
        this.bg = this.add.tileSprite(0, 0,400,300,'bg').setOrigin(0,0);
        this.hider = this.physics.add.sprite(20, 30,'hider')

        // add monster
        this.monsterVelocity = 50;
        this.monster = this.physics.add.sprite(250, 250+32,'monster_atlas','monster0001').setScale(SCALE/4);
        this.monster.anims.play('monstermove');

        //add towerblock




        // initialize state machine managing hero (initial state, possible states, state args[])
        this.heroFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            swing: new SwingState(),
            dash: new DashState(),
        }, [this, this.hero]);

        // hero animations (walking)
        this.anims.create({
            key: 'walk-right',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 3 }),
        });
        this.anims.create({
            key: 'walk-left',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hero', { start: 4, end: 7 }),
        });

        // hero animations (swinging)
        this.anims.create({
            key: 'swing-right',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('hero', { start: 8, end: 11 }),
        });
        this.anims.create({
            key: 'swing-left',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('hero', { start: 12, end: 15 }),
        });


        this.physics.add.collider(this.hero,this.monster, ()=>{
            //this.monster.alpha = 0;
            if (attacking){
                this.monster.x = w;
                this.hider.y -= 32;
                
            }else{
                this.hero.x = 0;
                this.monster.x += 64;
                this.hider.y += 32;
                hurting = true;
            }
        },null, this);
    }

    update() { 
       
       if(!gameover){
            this.heroFSM.step(); 
            //monster move
           this.monster.setVelocityX(-this.monsterVelocity);
           if (this.monster.x<0){
               this.monster.x = w;
           }
       }else{
           this.monsterVelocity = 0;
           this.monster.x = 1000;
           this.scene.start('menuScene');
       }
       
       if (this.hider.y>=190){
           gameover=true;
       } else if (this.hider.y<=-43){
           this.hider.y = -34;
       }
       
    }
}