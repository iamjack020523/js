class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world",
    });
  }

  // incoming data from scene below
  init(data) {}

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON('Wmap', 'assets/Wmap.json');

    // Step 2 : Preload any images here, nickname, filename
    this.load.image("water", "assets/water32x32.png");
    this.load.image("base", "assets/base32x32.png");
    this.load.image("item", "assets/voidKey.png");

    this.load.atlas( 'left', 'assets/left.png', 'assets/left.json'); 
    this.load.atlas( 'right', 'assets/right.png', 'assets/right.json');
    this.load.atlas( 'front', 'assets/front.png', 'assets/front.json');
    this.load.atlas( 'back', 'assets/back.png', 'assets/back.json');
    
    this.load.atlas( 'phLeft', 'assets/phLeft.png', 'assets/phLeft.json');
    this.load.atlas( 'phRight', 'assets/phRight.png', 'assets/phRight.json');
    this.load.atlas( 'phStand', 'assets/phRight.png', 'assets/phRight.json');

  }

  create() {
    console.log("*** world scene");

    //Step 3 - Create the map from main
    let map = this.make.tilemap({key: 'Wmap'});

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let waterTiles = map.addTilesetImage("base32x32", "base");
    let baseTiles = map.addTilesetImage("water32x32", "water");

    let tilesArray = [ baseTiles,waterTiles]

    // Step 5  Load in layers by layers
    this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0);
    this.fenceLayer = map.createLayer("fenceLayer", tilesArray, 0, 0);
    this.vegeLayer2 = map.createLayer("vegeLayer2",tilesArray, 0, 0);
    this.buildingLayer = map.createLayer("buildingLayer", tilesArray, 0, 0);
    this.treesLayer = map.createLayer("treesLayer", tilesArray, 0, 0);


    //character animation
    this.anims.create({ 
      key: 'left',
      frames: [
        { key: 'left', frame: 'Left 1'}, 
        { key: 'left', frame: 'Left 2'},
        { key: 'left', frame: 'Left 5'},
        { key: 'left', frame: 'left 4'},
        { key: 'left', frame: 'Left 7'},
        { key: 'left', frame: 'Left 6'},
        { key: 'left', frame: 'left 3'},
      ],
      frameRate: 7, 
      repeat: -1
    })

    this.anims.create({
      key: 'right',
      frames: [
        { key: 'right', frame: 'Right 1'},
        { key: 'right', frame: 'Right 2'},
        { key: 'right', frame: 'Right 3'},
        { key: 'right', frame: 'Right 4'},
        { key: 'right', frame: 'Right 7'},
        { key: 'right', frame: 'Right 6'},
        { key: 'right', frame: 'Right 5'},
      ],
      frameRate: 7,
      repeat: -1
    })


    this.anims.create({
      key: 'back',
      frames: [
        { key: 'back', frame: 'Back 1'},
        { key: 'back', frame: 'Back 2'},
        { key: 'back', frame: 'back 4'},
        { key: 'back', frame: 'Back 3'},
      ],
      frameRate: 7,
      repeat: -1
    })

     this.anims.create({
      key: 'front',
      frames: [
        { key: 'front', frame: 'Front 1'},
        { key: 'front', frame: 'Front 2'},
        { key: 'front', frame: 'Front 4'},
        { key: 'front', frame: 'Front 3'},
      ],
      frameRate: 7,
      repeat: -1
    })

    this.anims.create({
      key: 'phLeft',
      frames: [
        { key: 'phLeft', frame: 'phLeft1'},
        { key: 'phLeft', frame: 'phLeft3'},
        { key: 'phLeft', frame: 'phLeft5'},
      ],
      frameRate: 5,
      repeat: -1
    })

    this.anims.create({
      key: 'phRight',
      frames: [
        { key: 'phStand', frame: 'phRight1'},
        { key: 'phStand', frame: 'phRight3'},
        { key: 'phStand', frame: 'phRight5'},
      ],
      frameRate: 5,
      repeat: -1
    })

    this.anims.create({
      key: 'phStand',
      frames: [
        { key: 'phStand', frame: 'phRight1'},
        { key: 'phStand', frame: 'phRight3'},
        { key: 'phStand', frame: 'phRight5'},
      ],
      frameRate: 5,
      repeat: -1
    })

    this.physics.world.bounds.width = this.groundLayer.width; 
    this.physics.world.bounds.height = this.groundLayer.height;

    this.player = this.physics.add.sprite(752, 752, 'front');
  

    //enable debug
    window.player = this.player;

    this.player.setCollideWorldBounds(true); // don't go out of the this.map 

    // // create the arrow keys
     this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player 
    this.cameras.main.startFollow(this.player);


    this.fenceLayer.setCollisionByExclusion(-1, true) 
    this.buildingLayer.setCollisionByExclusion(-1, true)
    this.treesLayer.setCollisionByExclusion(-1, true)

    this.physics.add.collider(this.player, this.fenceLayer); 
    this.physics.add.collider(this.player, this.buildingLayer);
    this.physics.add.collider(this.player, this.treesLayer);

    
  } /////////////////// end of create //////////////////////////////

  update() {

    // check for room1_center wood building
    if ( this.player.x > 745 && this.player.x < 755
      && this.player.y > 683 && this.player.y < 692 ) {
      this.room1()
      }
    else  if ( this.player.x > 770 && this.player.x < 790
     && this.player.y == 1200 ) {
       this.stage1();
      }
    else  if ( this.player.x >206 && this.player.x < 213
       && this.player.y == 400 ) {
       this.stage2();
       }

    else  if ( this.player.x >994 && this.player.x < 1047
       && this.player.y == 208 ) {
        this.stage3();
        }
    

    //character movement
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-150);
      this.player.anims.play("left", true); 
    } 
    else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(150);
      this.player.anims.play("right", true);
    } 
    else if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-150);
      this.player.anims.play("back", true);
      //console.log('up');
    } 
    else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(150);
      this.player.anims.play("front", true);
      //console.log('down');
    } 
    else {
      this.player.anims.stop(); 
      this.player.body.setVelocity(0, 0);
    }

  } /////////////////// end of update //////////////////////////////

  

  // Function to jump to room1
  room1(player, tile) {
    console.log("room1 function");
    this.scene.start("room1");
  }

  stage1(player, tile) {
    console.log("stage1 function");
    this.scene.start("stage1");
  }

  stage2(player, tile) {
    console.log("stage2 function");
    this.scene.start("stage2");
  }

  stage3(player, tile) {
    console.log("stage3 function");
    this.scene.start("stage3");
  }
} //////////// end of class world ////////////////////////
