class gameOver4 extends Phaser.Scene {
  constructor() {
    super({
      key: "gameOver4",
    });

    // Put global variable here
  }

  preload() {

 
    this.load.image("gameC", "assets/gameC.png", {
    });
    
    this.load.audio('win','assets/win.mp3')
  }

  create() {
    console.log("*** gameOver4");
    this.win=this.sound.add('win').setVolume(1)
    this.win.play()

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'gameC').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to preload");

        this.scene.start(
          "preloadScene",
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
