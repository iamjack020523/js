class main extends Phaser.Scene {
  constructor() {
    super({
      key: "main",
    });

    // Put global variable here
  }

  preload() {
    // Preload all the assets here
    this.load.tilemapTiledJSON("world1", "assets/Tutorial1.json");

    // Preload any images here
 
    this.load.spritesheet("mainPg", "assets/mainPg.png", {
      // frameWidth: 300,
      // frameHeight: 1000,
    });
  }

  create() {
    console.log("*** main scene");


    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'mainPg').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to world scene");

        this.scene.start(
          "world",
          // Optional parameters
          {}
        );
      },
      this
    );

    // Add any text in the main page
    this.add.text(130, 600, "Press spacebar to continue", {
      font: "25px Courier",
      fill: "#FFFFFF",
    });

    // Create all the game animations here
  }
}
