class intro2 extends Phaser.Scene {
  constructor() {
    super({
      key: "intro2",
    });

    // Put global variable here
  }

  preload() {
    // Preload all the assets here

    // Preload any images here
 
    this.load.image("intro2", "assets/intro2.png", {
    });
  }

  create() {
    console.log("*** intro2");

    // Add any sound and music here
    // ( 0 = mute to 1 is loudest )
    //this.music = this.sound.add('bgMusic').setVolume(0.3) // 10% volume

    //this.music.play()
    //window.music = this.music

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'intro2').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to intro3");

        this.scene.start(
          "intro3",
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
