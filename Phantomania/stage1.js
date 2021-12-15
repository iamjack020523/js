class stage1 extends Phaser.Scene {

    constructor() {
        super({ key: 'stage1' });
        
        // Put global variable here
       this.score = 0


    }


    init(data) {
        this.player = data.player
        this.inventory = data.inventory
    }


    preload() {

    // Step 1, load JSON
    this.load.tilemapTiledJSON('dungeon', 'assets/stage1.json');
    // Step 2 : Preload any images here, nickname, filename
    this.load.image("dungeon", "assets/Dungeon32x32.png");
    this.load.image("item", "assets/voidKey.png");
    this.load.spritesheet('boy','assets/boy.png',{ frameWidth: 32, frameHeight:32});
    this.load.spritesheet('phantom','assets/phantom.png',{ frameWidth: 32, frameHeight:32});

    this.load.audio('bgMusic', 'assets/soundtrack.mp3');
    this.load.audio('lose', 'assets/lose.mp3');
    this.load.audio('pick','assets/pick.mp3')
    }
   
    
    
    create() {

    console.log('*** stage1 scene');

    let map = this.make.tilemap({key: 'dungeon'});

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


    this.player = this.physics.add.sprite(1055, 1847, 'boy').setScale(1.5);
    //phantom
    this.phantom1 = this.physics.add.sprite(1327,1565,'phantom').play('phLeft').setScale(2.0)
    this.phantom2 = this.physics.add.sprite(1240,1256,'phantom').play('phLeft').setScale(2.0)
    this.phantom3 = this.physics.add.sprite(1850,1928,'phantom').play('phLeft').setScale(2.0)
    this.phantom4 = this.physics.add.sprite(505,1638,'phantom').play('phLeft').setScale(2.0)
    this.phantom5 = this.physics.add.sprite(778,260,'phantom').play('phLeft').setScale(2.0)
    this.phantom6 = this.physics.add.sprite(66,488,'phantom').play('phLeft').setScale(2.0)

    //middle ph
    this.phantom7 = this.physics.add.sprite(664,1320,'phantom').play('phLeft').setScale(2.0)
    this.phantom8 = this.physics.add.sprite(664,1320,'phantom').play('phLeft').setScale(2.0)
    this.phantom9= this.physics.add.sprite(664,1576,'phantom').play('phLeft').setScale(2.0)
    //key
    this.item1 = this.physics.add.sprite(1300,1104,'item').setScale(1.5)
    this.item2 = this.physics.add.sprite(331,1211,'item').setScale(1.5)
    this.item3 = this.physics.add.sprite(232,808,'item').setScale(1.5)
    this.item4 = this.physics.add.sprite(1528,88,'item').setScale(1.5)
    this.item5 = this.physics.add.sprite(1975,1447,'item').setScale(1.5)

   //btm 
    this.time.addEvent({
      delay: 1000,
      callback: this.moveRightLeft1,
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.moveRightLeft2,
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.moveRightLeft5,
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
      
  //middle
  this.time.addEvent({
    delay: 1000,
    callback : this.moveRightLeft6,
   callbackScope: this,
    loop: false,
  });

  this.time.addEvent({
    delay: 1000,
    callback : this.moveRightLeft7,
   callbackScope: this,
    loop: false,
  });

  this.time.addEvent({
    delay: 1000,
    callback : this.moveRightLeft8,
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
    this.physics.add.overlap(this.player,this.phantom7,this.phOverlap,null,this)
    this.physics.add.overlap(this.player,this.phantom8,this.phOverlap,null,this)
    this.physics.add.overlap(this.player,this.phantom9,this.phOverlap,null,this)
    this.physics.add.overlap(this.player, this.item1, this.collectItem1, null, this)
    this.physics.add.overlap(this.player, this.item2, this.collectItem2, null, this)
    this.physics.add.overlap(this.player, this.item3, this.collectItem3, null, this)
    this.physics.add.overlap(this.player, this.item4, this.collectItem4, null, this)
    this.physics.add.overlap(this.player, this.item5, this.collectItem5, null, this)
    }
////////////////////END OF CREATE///////////////////


update() {

   //go back to worldmap, check for woodHouse exits
      if ( this.player.x > 1858 && this.player.x < 2014
           && this.player.y < 56) {
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

phOverlap(){
  console.log('ph overlap player');
  window.music1.pause();
  this.lose.play()
  this.scene.start("gameOver1");
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
      duration: 1500,
      tweens: [
        {
          x: 1700,
        },
        {
          x: 1327,
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
        duration: 1500,
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
          duration: 1500,
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
            duration: 1500,
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
              duration: 1500,
              tweens: [
                {
                  x: 1512,
                },
                {
                  x: 1240,
                },
              ],
            });
          }

          moveRightLeft6(){
            console.log("moveDownUp");
              this.tweens.timeline({
                targets: this.phantom7,
                loop: -1, // loop forever
                ease: "Linear",
                duration: 1500,
                tweens: [
                  {
                    x: 1160,
                  },
                  {
                    x: 664,
                  },
                ],
              });
            }

            moveRightLeft7(){
              console.log("moveDownUp");
                this.tweens.timeline({
                  targets: this.phantom8,
                  loop: -1, // loop forever
                  ease: "Linear",
                  duration: 1000,
                  tweens: [
                    {
                      x: 1160,
                    },
                    {
                      x: 664,
                    },
                  ],
                });
              }

              moveRightLeft8(){
                console.log("moveDownUp");
                  this.tweens.timeline({
                    targets: this.phantom9,
                    loop: -1, // loop forever
                    ease: "Linear",
                    duration: 1600,
                    tweens: [
                      {
                        x: 1160,
                      },
                      {
                        x: 664,
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
      duration: 1500,
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
  
  

    // Function to jump to worldmap
    world(player, tile) {
    console.log("world function");
    window.music1.pause();
    this.scene.start("world",{player: player});

 }

}

