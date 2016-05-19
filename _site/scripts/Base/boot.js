var Mazed = Mazed || {}; 

Mazed.Boot = function () {}; 

Mazed.Boot.prototype = { 
    init: function () { 
        Mazed.game.stage.disableVisibilityChange = true; 
        Mazed.game.scale.pageAlignHorizontally = true;
        Mazed.game.scale.pageAlignVertically = true;
        Mazed.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    }, 
    preload: function () {
        Mazed.game.load.image('preloaderBar', 'assets/loadbar.png'); 
        Mazed.game.load.image('Logo', 'assets/mazedlogo.png'); 
        Mazed.game.load.image('background0', 'assets/background0.png', 32, 32); 
    }, 
    create: function () {
        Mazed.game.time.events.add(50, function () {  Mazed.game.state.start('Preloader', true); }, this);  
    },
};