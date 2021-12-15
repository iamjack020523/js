class room1 extends Phaser.Scene {

    constructor() {
        super({ key: 'room1' });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.inventory = data.inventory
    }

    preload() {

    // Step 1, load JSON
    this.load.tilemapTiledJSON('woodHouse', 'assets/room.json');

    // Step 2 : Preload any images here, nickname, filename
    this.load.image("water", "assets/water32x32.png");
    this.load.image("base", "assets/base32x32.png");

    this.load.audio('homeMusic','assets/home.mp3')

    }

    create() {

    console.log('*** room1 scene');
    this.homeMusic = this.sound.add('homeMusic').setVolume(0.3)
    window.music4 = this.homeMusic
    window.music4.play();
    window.music4.loop = true;


    let map = this.make.tilemap({key: 'woodHouse'});

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let baseTiles = map.addTilesetImage("[Base]BaseChip_pipo", "base");

    let tilesArray = [ baseTiles ]

    // Step 5  Load in layers by layers
    this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0);
    this.wallLayer = map.createLayer("wallLayer", tilesArray, 0, 0);
    this.decoLayer = map.createLayer("decoLayer",tilesArray, 0, 0);
    this.decoLayer2 = map.createLayer("decoLayer2", tilesArray, 0, 0);

    this.physics.world.bounds.width = this.groundLayer.width; 
    this.physics.world.bounds.height = this.groundLayer.height;

    this.player = this.physics.add.sprite(143, 280, 'back');

    //enable debug
    window.player = this.player;

    this.player.setCollideWorldBounds(true); // don't go out of the this.map 

    // // create the arrow keys
     this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player 
    this.cameras.main.startFollow(this.player);


    this.wallLayer.setCollisionByExclusion(-1, true) 
    this.decoLayer.setCollisionByExclusion(-1, true)
    this.decoLayer2.setCollisionByExclusion(-1, true)

    this.physics.add.collider(this.player, this.wallLayer); 
    this.physics.add.collider(this.player, this.decoLayer);
    this.physics.add.collider(this.player, this.decoLayer2);
        
    }

    update() {

        //go back to worldmap, check for woodHouse exits
        if ( this.player.x > 141 && this.player.x < 176
            && this.player.y < 290 && this.player.y > 285) {
              window.music4.stop();
                this.world();
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
}

    // Function to jump to worldmap
    world(player, tile) {
    console.log("world function");
    this.scene.start("world",{player: player});
 }

    

}
