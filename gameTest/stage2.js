class stage2 extends Phaser.Scene {

    constructor() {
        super({ key: 'stage2' });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.inventory = data.inventory
    }

    preload() {

    // Step 1, load JSON
    this.load.tilemapTiledJSON('stage2', 'assets/stage2.json');

    // Step 2 : Preload any images here, nickname, filename
    this.load.image("dungeon", "assets/Dungeon32x32.png");

    }

    create() {

    console.log('*** stage2 scene');

    let map = this.make.tilemap({key: 'stage2'});

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

    this.player = this.physics.add.sprite(1055, 1847, 'back').setScale(1.5);
    this.phantom1 = this.physics.add.sprite(1310,1565,'phantom').play('phRight').setScale(2.0);
    this.phantom2 = this.physics.add.sprite(1150,1256,'phantom').play('phLeft').setScale(2.0)
    this.phantom3 = this.physics.add.sprite(1850,1928,'phantom').play('phLeft').setScale(2.0)
    this.phantom4 = this.physics.add.sprite(505,1638,'phantom').play('phLeft').setScale(2.0)
    this.phantom5 = this.physics.add.sprite(778,260,'phantom').play('phLeft').setScale(2.0)
    this.phantom6 = this.physics.add.sprite(66,488,'phantom').play('phLeft').setScale(2.0)

  
    //key
    this.item1 = this.physics.add.sprite(1300,1104,'item').setScale(1.5)
    this.item2 = this.physics.add.sprite(331,1211,'item').setScale(1.5)
    this.item3 = this.physics.add.sprite(763,808,'item').setScale(1.5)
    this.item4 = this.physics.add.sprite(1528,88,'item').setScale(1.5)
    this.item5 = this.physics.add.sprite(1975,1432,'item').setScale(1.5)

   //btm 
   this.time.addEvent({
    delay: 1000,
    callback: this.moveRightLeft1,
    callbackScope: this,
    loop: false,
  });

  this.time.addEvent({
    delay: 1000,
    callback: this.moveRightLeft5,
    callbackScope: this,
    loop: false,
  });

  this.time.addEvent({
    delay: 1000,
    callback: this.moveRightLeft2,
    callbackScope: this,
    loop: false,
  });

  //top left
  this.time.addEvent({
    delay: 1000,
    callback: this.moveRightLeft3,
    callbackScope: this,
    loop: false,
  });

  this.time.addEvent({
    delay: 1000,
    callback: this.moveRightLeft4,
    callbackScope: this,
    loop: false,
  });    


//btm right
this.time.addEvent({
  delay: 1000,
  callback : this.moveDownUp1,
 callbackScope: this,
  loop: false,
});

    //enable debug
    window.player = this.player;

    this.player.setCollideWorldBounds(true); // don't go out of the this.map 

    // // create the arrow keys
     this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player 
    this.cameras.main.startFollow(this.player);


    this.wallLayer.setCollisionByExclusion(-1, true) 

    this.physics.add.collider(this.player, this.wallLayer); 
    this.physics.add.collider(this.phantom1, this.wallLayer);  
    this.physics.add.overlap(this.player,this.phantom1,this.phOverlap,null,this)
    this.physics.add.overlap(this.player,this.phantom2,this.phOverlap,null,this)
    this.physics.add.overlap(this.player,this.phantom3,this.phOverlap,null,this)
    this.physics.add.overlap(this.player,this.phantom4,this.phOverlap,null,this)
    this.physics.add.overlap(this.player,this.phantom5,this.phOverlap,null,this)
    this.physics.add.overlap(this.player,this.phantom6,this.phOverlap,null,this)
    this.physics.add.overlap(this.player, this.item1, this.collectItem, null, this)
    this.physics.add.overlap(this.player, this.item2, this.collectItem, null, this)
    this.physics.add.overlap(this.player, this.item3, this.collectItem, null, this)
    this.physics.add.overlap(this.player, this.item4, this.collectItem, null, this)
    this.physics.add.overlap(this.player, this.item5, this.collectItem, null, this)
    }

    phOverlap(){
      console.log('ph overlap player');
      this.scene.start("stage2");
      let playerPos ={}
      playerPos.x = 634
      playerPos.y = 1106
      playerPos.dir = 'back';
    }
    
    moveRightLeft1(){
      console.log("moveDownUp");
        this.tweens.timeline({
          targets: this.phantom1,
          loop: -1, // loop forever
          ease: "Linear",
          duration: 3000,
          tweens: [
            {
              x: 1700,
            },
            {
              x: 1310,
            },
          ],
        });
      }
    
      moveRightLeft2(){
        console.log("moveDownUp");
          this.tweens.timeline({
            targets: this.phantom4,
            loop: -1, // loop forever
            ease: "Linear",
            duration: 3000,
            tweens: [
              {
                x: 60,
              },
              {
                x: 505,
              },
            ],
          });
        }
        moveRightLeft3(){
          console.log("moveDownUp");
            this.tweens.timeline({
              targets: this.phantom5,
              loop: -1, // loop forever
              ease: "Linear",
              duration: 3000,
              tweens: [
                {
                  x: 1203,
                },
                {
                  x: 778,
                },
              ],
            });
          }
      
          moveRightLeft4(){
            console.log("moveDownUp");
              this.tweens.timeline({
                targets: this.phantom6,
                loop: -1, // loop forever
                ease: "Linear",
                duration: 3000,
                tweens: [
                  {
                    x: 296,
                  },
                  {
                    x: 66,
                  },
                ],
              });
            }
            
            moveRightLeft5(){
              console.log("moveDownUp");
                this.tweens.timeline({
                  targets: this.phantom2,
                  loop: -1, // loop forever
                  ease: "Linear",
                  duration: 3000,
                  tweens: [
                    {
                      x: 504,
                    },
                    {
                      x: 1152,
                    },
                  ],
                });
              }
                              
    
      moveDownUp1() {
        console.log("moveDownUp");
        this.tweens.timeline({
          targets: this.phantom3,
          ease: "Linear",
          loop: -1, // loop forever
          duration: 3000,
          tweens: [
            {
              y: 1473,
            },
            {
              y: 1950,
            },
          ],
        });
      }
      
      collectItem (player,item1)
      {
      item1.disableBody(true,true);
       }
    
 
    



    update() {

        //go back to worldmap, check for woodHouse exits
        if ( this.player.x > 1858 && this.player.x < 1990
          && this.player.y > 57 && this.player.y <60) {
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
    this.scene.start("world",{player: player});
 }


    

}