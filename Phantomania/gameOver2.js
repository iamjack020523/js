class gameOver2 extends Phaser.Scene {
  constructor() {
    super({
      key: "gameOver2",
    });

    // Put global variable here
  }

  preload() {

 
    this.load.image("gameOver", "assets/gameOver.png", {
    });
  }

  create() {
    console.log("*** gameOver");

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'gameOver').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to stage2");

        this.scene.start(
          "stage2",
          // Optional parameters
          {}
        );
      },
      this
    );

    // Add any text in the main page
    this.add.text(130, 600, "Press spacebar to restart", {
      font: "25px Courier",
      fill: "#FFFFFF",
    });

    // Create all the game animations here
  }
}
