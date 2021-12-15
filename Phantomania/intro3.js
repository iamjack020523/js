class intro3 extends Phaser.Scene {
  constructor() {
    super({
      key: "intro3",
    });

    // Put global variable here
  }

  preload() {
    // Preload all the assets here

    // Preload any images here
 
    this.load.image("intro3", "assets/intro3.png", {
    });
  }

  create() {
    console.log("*** intro3");

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'intro3').setOrigin(0, 0);

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
