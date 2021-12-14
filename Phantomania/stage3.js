class stage3 extends Phaser.Scene {

    constructor() {
        super({ key: 'stage3' });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.inventory = data.inventory
    }

    preload() {

    // Step 1, load JSON
    this.load.tilemapTiledJSON('stage3', 'assets/stage3.json');

    // Step 2 : Preload any images here, nickname, filename
    this.load.image("dungeon", "assets/Dungeon32x32.png");
        
    this.load.audio('bgMusic', 'assets/soundtrack.mp3');
    this.load.audio('lose', 'assets/lose.mp3');
    this.load.audio('pick','assets/pick.mp3')


    }

    create() {

    console.log('*** stage3 scene');

    let map = this.make.tilemap({key: 'stage3'});

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let baseTiles = map.addTilesetImage("dungeon32x32", "dungeon");

    let tilesArray = [ baseTiles ]

    // Step 5  Load in layers by layers
    this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0);
    this.wallLayer = map.createLayer("wallLayer", tilesArray, 0, 0);

    this.physics.world.bounds.width = this.groundLayer.width; 
    this.physics.world.bounds.height = this.groundLayer.height;


    this.pick = this.sound.add('pick').setVolume(1)
    this.lose = this.sound.add('lose').setVolume(1)

    this.bgMusic = this.sound.add('bgMusic').setVolume(0.3)
    window.music1 = this.bgMusic
    window.music1.play();
    window.music1.loop = true;

    
    //score
    this.itemCount = this.add.sprite(20,30,'item').setScrollFactor(0)
    this.itemText = this.add.text(50, 20, window.keys, {
    fontSize: '30px',
    fill: '#221C48'
      });
     
   // fix the text to the camera
   this.itemText.setScrollFactor(0);
   this.itemText.visible = true;

    this.player = this.physics.add.sprite(1055, 2200, 'back').setScale(1.5);

    this.phantom1 = this.physics.add.sprite(887,563,'phantom').play('phRight').setScale(7.0);
    this.phantom2 = this.physics.add.sprite(1400,563,'phantom').play('phLeft').setScale(7.0);
    this.phantom3 = this.physics.add.sprite(1809,563,'phantom').play('phRight').setScale(7.0);
    this.phantom4 = this.physics.add.sprite(238,907,'phantom').play('phRight').setScale(7.0);

    this.physics.add.collider(this.phantom1, this.wallLayer); 
    this.physics.add.collider(this.phantom2, this.wallLayer); 
    this.physics.add.collider(this.phantom3, this.wallLayer); 
    this.physics.add.collider(this.phantom4, this.wallLayer); 
    this.physics.add.overlap(this.player,this.phantom1,this.phOverlap,null,this)
    this.physics.add.overlap(this.player,this.phantom2,this.phOverlap,null,this)
    this.physics.add.overlap(this.player,this.phantom3,this.phOverlap,null,this)
    this.physics.add.overlap(this.player,this.phantom4,this.phOverlap,null,this)


       //key
       this.item1 = this.physics.add.sprite(1300,1104,'item').setScale(1.5)
       this.item2 = this.physics.add.sprite(331,1211,'item').setScale(1.5)
       this.item3 = this.physics.add.sprite(763,808,'item').setScale(1.5)
       this.item4 = this.physics.add.sprite(1528,88,'item').setScale(1.5)
       this.item5 = this.physics.add.sprite(322,538,'item').setScale(1.5)
   

    //enable debug
    window.player = this.player;

    this.player.setCollideWorldBounds(true); // don't go out of the this.map 

    // // create the arrow keys
     this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player 
    this.cameras.main.startFollow(this.player);


    this.wallLayer.setCollisionByExclusion(-1, true) 

    this.physics.add.collider(this.player, this.wallLayer); 
    this.physics.add.overlap(this.player, this.item1, this.collectItem1, null, this)
    this.physics.add.overlap(this.player, this.item2, this.collectItem2, null, this)
    this.physics.add.overlap(this.player, this.item3, this.collectItem3, null, this)
    this.physics.add.overlap(this.player, this.item4, this.collectItem4, null, this)
    this.physics.add.overlap(this.player, this.item5, this.collectItem5, null, this)
    }


    phOverlap(){
      console.log('ph overlap player');
      window.music1.stop();
      this.lose.play()
      this.scene.start("gameOver3");
      let playerPos ={}
      playerPos.x = 634
      playerPos.y = 1106
      playerPos.dir = 'back';
    }


    collectItem1 (player, item1) {
      console.log('remove item' );
    item1.disableBody(true,true);
    this.pick.play();
    window.keys++;
    this.itemText.setText(window.keys);
     }
  
     collectItem2 (player, item2) {
      console.log('remove item' );
    item2.disableBody(true,true);
    this.pick.play();
    window.keys++;
    this.itemText.setText(window.keys);
     }
  
     collectItem3 (player, item3) {
      console.log('remove item' );
    item3.disableBody(true,true);
    this.pick.play();
    window.keys++;
    this.itemText.setText(window.keys);
     }
    
     collectItem4 (player, item4) {
      console.log('remove item');
    item4.disableBody(true,true);
    this.pick.play();
    window.keys++;
    this.itemText.setText(window.keys);
     }
    
     collectItem5 (player, item5) {
    console.log('remove item');
    item5.disableBody(true,true);
    this.pick.play();
    window.keys++;
    this.itemText.setText(window.keys);
     }
    

    update() {

      this.physics.moveToObject(this.phantom1,this.player,50,1200)
      this.physics.moveToObject(this.phantom2,this.player,50,1200)
      this.physics.moveToObject(this.phantom3,this.player,50,1200)
      this.physics.moveToObject(this.phantom4,this.player,50,1200)

        //go back to worldmap, check for woodHouse exits
        if ( this.player.x >  50 && this.player.x < 60
          && this.player.y > 85 && this.player.y <90) {
         this.world();
          }

        //character movement
     if (this.cursors.left.isDown) {
        this.player.body.setVelocityX(-250);
        this.player.anims.play("left", true); 
      } 
      else if (this.cursors.right.isDown) {
        this.player.body.setVelocityX(250);
        this.player.anims.play("right", true);
      } 
      else if (this.cursors.up.isDown) {
        this.player.body.setVelocityY(-250);
        this.player.anims.play("back", true);
        //console.log('up');
      } 
      else if (this.cursors.down.isDown) {
        this.player.body.setVelocityY(250);
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
    window.music1.pause();
    this.scene.start("world",{player: player});
 }

    

}
