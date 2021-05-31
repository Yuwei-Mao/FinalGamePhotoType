class Map1 extends Phaser.Scene {
    constructor() {
        super('map1Scene');

         // variables and settings
         this.ACCELERATION = 500;
         this.MAX_X_VEL = 200;   // pixels/second
         this.MAX_Y_VEL = 2000;
         this.DRAG = 600;    
         this.JUMP_VELOCITY = -600;
         this.ENEMY_SPAWNS = 5;      // how many enemy spawn locations will populate?
        // enemy frame indices from tilesheet
        this.ENEMY_FRAMES = [0];
    }

    preload() {
        // load tile map
        this.load.path = "./assets/tilemaps/";
        this.load.image("tiles","tileset1.png");
        this.load.tilemapTiledJSON("map","map4.json");
    }

    create() {

        // add a tile map
        
        const map = this.add.tilemap("map");    // this is referencing the key to our Tiled JSON file
        // add a tile set to the map
        const tileset = map.addTilesetImage("tileset1", "tiles");
        // create a new tilemap layer
        const worldLayer = map.createLayer("Background", tileset, 0, 32);
        const worldLayer0 = map.createLayer("Terrain", tileset, 0, 32);

        // add terrain collision
        worldLayer0.setCollisionByProperty({
            collides: true
        });
        
        // spawn hero
        const p1Spawn = map.findObject('Spawns', obj=> obj.name === 'p1Spawn');
        this.hero = new Hero(this,p1Spawn.x, p1Spawn.y, 'hero', 0);


        // spawn monster
        const m1Spawn = map.findObject('Spawns', obj=> obj.name === 'm1Spawn');
        this.monster1 = new Eyeball(this,m1Spawn.x, m1Spawn.y, 'pink_eyeball', 0);
        this.monster1.setImmovable(true);

        const m2Spawn = map.findObject('Spawns', obj=> obj.name === 'm2Spawn');
        this.monster2 = new Eyeball(this,m2Spawn.x, m2Spawn.y, 'pink_eyeball', 0);
        this.monster2.setImmovable(true);
        
        const m3Spawn = map.findObject('Spawns', obj=> obj.name === 'm3Spawn');
        this.monster3 = new Eyeball(this,m3Spawn.x, m3Spawn.y, 'pink_eyeball', 0);
        this.monster3.setImmovable(true);
        
        const m4Spawn = map.findObject('Spawns', obj=> obj.name === 'm4Spawn');
        this.monster4 = new Eyeball(this,m4Spawn.x, m4Spawn.y, 'pink_eyeball', 0);
        this.monster4.setImmovable(true);
        
        // add hero physics
        this.hero.body.setCollideWorldBounds(true);
        this.hero.body.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);

        // add bullet
        this.bullet1 = new Bullet(this,-100,-100,'bullet').setOrigin(0,0);
        // add life text
        this.lifeText = this.add.bitmapText(5, 5, 'gem', 'Life: 3', 30).setOrigin(0,0).setTint(0xee2c79);
        
        // set camera bounds
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.hero, true, 0.25, 0.25); 

        //set world physics
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.world.gravity.y = 2000;
        
        // create collider
        this.physics.add.collider(this.hero, worldLayer0);
        this.physics.add.collider(this.monster1, worldLayer0);
        this.physics.add.collider(this.monster2, worldLayer0);
        this.physics.add.collider(this.monster3, worldLayer0);
        this.physics.add.collider(this.monster4, worldLayer0);

        
        // define keyboard cursor input
        cursors = this.input.keyboard.createCursorKeys();
        this.keyA = this.input.keyboard.addKey('A'); 
        this.keyD = this.input.keyboard.addKey('D'); 
    
        // hero animation(idle)
        this.anims.create({
            key: 'idle',
            defaultTextureKey: 'hero',
            frames: [ 
                { frame: 0 },
            ]
        });

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
            defaultTextureKey: 'hero',
            frames: [ 
                { frame: 8 },
            ]
        });

        this.anims.create({
            key: 'swing-left',
            defaultTextureKey: 'hero',
            frames: [ 
                { frame: 8 },
            ]
        });

        // hero animations (jumping)
        this.anims.create({
            key: 'jump-right',
            defaultTextureKey: 'hero',
            frames: [ 
                { frame: 10 },
            ]
        });

        this.anims.create({
            key: 'jump-left',
            defaultTextureKey: 'hero',
            frames: [ 
                { frame: 11 },
            ]
        });

        //define animation of eyeballs
        this.anims.create({
            key: 'eyeballMove',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('pink_eyeball', { start: 0, end: 3 }),
        });
        this.monster1.anims.play('eyeballMove');
        this.monster2.anims.play('eyeballMove');
        this.monster3.anims.play('eyeballMove');
        this.monster4.anims.play('eyeballMove');


        // init player animation
        this.hero.anims.play('idle');

        this.physics.add.collider(this.hero,this.monster1, ()=>{
            this.hero.hurt();
        },null, this);
        this.physics.add.collider(this.hero,this.monster2, ()=>{
            this.hero.hurt();
        },null, this);
        this.physics.add.collider(this.hero,this.monster3, ()=>{
            this.hero.hurt();
        },null, this);
        this.physics.add.collider(this.hero,this.monster4, ()=>{
            this.hero.hurt();
        },null, this);

        this.physics.add.collider(this.bullet1, this.monster1, ()=>{
            this.monster1.hurt();
            this.monster1.setTint(0xFF0000);
            if (this.monster1.hp <= 0){
                this.monster1.destroyed = true;
                this.monster1.destroy();
            }
                        
        },null, this);
        this.physics.add.collider(this.bullet1,this.monster2, ()=>{
            this.monster2.hurt();
            if (this.monster2.hp <= 0){
                this.monster2.destroyed = true;
                this.monster2.destroy();
            }
        },null, this);
        this.physics.add.collider(this.bullet1,this.monster3, ()=>{
            this.monster3.hurt();
            if (this.monster3.hp <= 0){
                this.monster3.destroyed = true;
                this.monster3.destroy();
            }
        },null, this);
        this.physics.add.collider(this.bullet1,this.monster4, ()=>{
            this.monster4.hurt();
            if (this.monster4.hp <= 0){
                this.monster4.destroyed = true;
                this.monster4.destroy();
            }
        },null, this);
        

    }

    selectRandomElements(elements, num) {
        let newList = [];
        for(let i = 0; i < num; i++) {
            let randValue = Math.floor(Math.random() * elements.length);    // get rnd value w/in array length
            newList.push(elements[randValue]);  // push that array element to new array
            elements.splice(randValue, 1);      // remove that element from original array (to prevent duplicate selection)
        }
        return newList;
    }

    update() { 
        //update location and content of lifeText
        this.lifeText.x = this.hero.x;
        this.lifeText.text = "Life: " + hp;
        this.bullet1.update();

        //update monsters
        this.monster1.update();
        this.monster2.update();
        this.monster3.update();
        this.monster4.update();

        if(this.keyA.isDown) {
            this.hero.body.setAccelerationX(-this.ACCELERATION);
            this.hero.play('walk-left', true);
            this.hero.setFlip(true, false);
        } else if(this.keyD.isDown) {
            this.hero.body.setAccelerationX(this.ACCELERATION);
            this.hero.play('walk-right', true);
            this.hero.resetFlip();
        } else {
            // set acceleration to 0 so DRAG will take over
            this.hero.play('idle');
            this.hero.body.setAccelerationX(0);
            this.hero.body.setDragX(this.DRAG);
        }

        if(!this.hero.body.blocked.down) {
            this.hero.anims.play('jump-left');
        }
        if(this.hero.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.hero.body.setVelocityY(this.JUMP_VELOCITY);
        }

        if(cursors.shift.isDown || game.input.mousePointer.isDown) {
            this.hero.play('swing-left', true);
            this.bullet1.fire(this.hero.x, this.hero.y)
        }
    }
}