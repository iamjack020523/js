class preloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: "preloadScene",
    });

    // Put global variable here
  }

  preload() {
    // Preload all the assets here
    this.load.tilemapTiledJSON("world1", "assets/Tutorial1.json");

    // Preload any images here
 
    this.load.image("mainPg", "assets/mainPg.png", {
    });

  }

  create() {
    console.log("*** preload");

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'mainPg').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to intro1");

        this.scene.start(
          "intro1",
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
