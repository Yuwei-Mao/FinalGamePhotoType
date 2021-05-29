class Map1 extends Phaser.Scene {
    constructor() {
        super('map1Scene');
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
        
        // add hero 
        this.hero = new Hero(this, 5, 256-64, 'hero', 0, 'left');

        this.hero.body.setCollideWorldBounds(true);
        this.hero.body.setMaxVelocity(MAX_X_VEL, MAX_Y_VEL);

        // set gravity and physics world bounds (so collideWorldBounds works)
        this.physics.world.gravity.y = 380;
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);

        // create collider(s)/overlap(s)
        this.physics.add.collider(this.hero, worldLayer);
        
        // define keyboard cursor input
        cursors = this.input.keyboard.createCursorKeys();

        // create camera control configuration object to pass to Camera Controller (see below)
        let controlConfig = {
            camera: this.cameras.main,      // which camera?
            up: cursors.up,
            down: cursors.down,
            zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
            zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
            zoomSpeed: 0.02,
            acceleration: 0.06,             // physics values (keep these low)
            drag: 0.0005,
            maxSpeed: 0.5
        }
        // create smoothed key camera control
        this.camControl = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

        // set camera bounds
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.hero, true, 0.25, 0.25); 
        // enable scene switcher / reload keys
        this.swap = this.input.keyboard.addKey('S');
        this.reload = this.input.keyboard.addKey('R');
        

        // initialize state machine managing hero (initial state, possible states, state args[])
        this.heroFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            swing: new SwingState(),
            dash: new DashState(),
            hurt: new HurtState(),
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

        // setup keyboard input
        this.keys = this.input.keyboard.createCursorKeys();
        this.keys.HKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);


        
    }

    update(time, delta) { 
       // update our camera controller (delta: Δ time in ms since last frame)
       this.camControl.update(delta);
       this.heroFSM.step(); 
       // scene switching / restart
       if(Phaser.Input.Keyboard.JustDown(this.reload)) {
           this.scene.restart();
       }
       
    }
}