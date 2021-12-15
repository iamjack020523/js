var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 32 * 20,
    height: 32 * 20,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#000000',
    pixelArt: true,
    scene: [preloadScene,intro1,intro2,intro3,gameOver1,gameOver2,gameOver3,gameOver4,
             main, world, room1, stage1, stage2, stage3,]
};



var game = new Phaser.Game(config);
window.keys = 0;