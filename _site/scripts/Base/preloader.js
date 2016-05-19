var Mazed = Mazed || {}; 

Mazed.Preloader = function () { this.ready = false; this.preloadBar = null; this.splash = null; };

Mazed.Preloader.prototype = {
    preload: function () {
        Mazed.setupBackground(0);
        var xx = Mazed.width / 2, yy = Mazed.height / 2;
        this.splash = this.game.add.sprite(xx - 48, 0.5 * yy, 'Logo');
        this.preloadBar = this.game.add.sprite(xx - 288/2, 1.5 * yy - 96/2, 'preloaderBar');
        this.game.load.setPreloadSprite(this.preloadBar);
        this.game.load.audio('music0', ['assets/music0.wav', 'assets/music0.ogg']);
        this.game.load.audio('music1', ['assets/music1.wav', 'assets/music1.ogg']);
        this.game.load.audio('music2', ['assets/music2.wav', 'assets/music2.ogg']);
        this.game.load.audio('EEE', ['assets/EffEnExp.wav', 'assets/EffEnExp.ogg']);
        this.game.load.audio('EPE', ['assets/EffPlExp.wav', 'assets/EffPlExp.ogg']);
        this.game.load.audio('EPJ', ['assets/EffPlJump.wav', 'assets/EffPlJump.ogg']);
        this.game.load.audio('EPS', ['assets/EffPlShoot.wav', 'assets/EffPlShoot.ogg']);
        this.game.load.audio('EPS2', ['assets/EffPlShoot2.wav', 'assets/EffPlShoot2.ogg']);
        this.game.load.audio('EPJB', ['assets/EffPlJumpB.wav', 'assets/EffPlShoot2.ogg']);
        this.game.load.audio('EEA', ['assets/EffEnArr.wav', 'assets/EffEnArr.ogg']);
        this.game.load.audio('EPW', ['assets/EffPlWalk.wav', 'assets/EffPlWalk.ogg']);
        this.game.load.audio('SEL', ['assets/Select.wav', 'assets/Select.ogg']);
        this.game.load.image('background1', 'assets/background1.png', 32, 32);
        this.game.load.image('background2', 'assets/background2.png', 32, 32);
        this.game.load.image('blocks1A', 'assets/blocks1A.png');
        this.game.load.image('bullet', 'assets/bullets.png');
        this.game.load.image('panel', 'assets/panel.png');
        this.game.load.spritesheet('mazedname0', 'assets/mazedname0.png', 195, 96);
        this.game.load.spritesheet('mazedname1', 'assets/mazedname1.png', 195, 96);
        this.game.load.spritesheet('mazedname2', 'assets/mazedname2.png', 195, 96);
        this.game.load.spritesheet('bexplo', 'assets/bulletexplosion.png', 32, 32);
        this.game.load.spritesheet('enemy', 'assets/enemy.png', 32, 32);
        this.game.load.spritesheet('trail', 'assets/trail.png', 32, 32);
        this.game.load.spritesheet('menubuttons', 'assets/playbutton.png', 72, 72);
        this.game.load.spritesheet('dude0', 'assets/dude0.png', 32, 32);
        this.game.load.spritesheet('blocks0', 'assets/blocks0.png', 32, 32);
        this.game.load.spritesheet('blocks1', 'assets/blocks1.png', 32, 32);
        this.game.load.spritesheet('blocks2', 'assets/blocks2.png', 32, 32);
        this.game.load.spritesheet('minimap', 'assets/minimap.png', 2, 2);
        this.game.load.spritesheet('controller', 'assets/controller.png', 100, 100);
        this.game.load.bitmapFont('jmfont', 'assets/jmfont_0.png', 'assets/jmfont.fnt');
    },

    create: function () {
        this.preloadBar.cropEnabled = false; Mazed.game.clearBeforeRender = false; 
        Mazed.Pshaking = !JSON.parse(localStorage.getItem('shake')); 
        Mazed.vol = !JSON.parse(localStorage.getItem('vol')); 
        Mazed.effV = !JSON.parse(localStorage.getItem('Evol')); if (Mazed.effV) { Mazed.effV = 0.1; }
        Mazed.r100 = JSON.parse(localStorage.getItem('r100'));
        Mazed.s100 = JSON.parse(localStorage.getItem('s100'));
        Mazed.d100 = JSON.parse(localStorage.getItem('d100'));
        Mazed.nd100 = JSON.parse(localStorage.getItem('nd100'));
    },

    update: function () {
        if ((Mazed.game.cache.isSoundDecoded('music0') && Mazed.game.cache.isSoundDecoded('music1') && Mazed.game.cache.isSoundDecoded('music2'))
            && this.ready == false) {
            this.ready = true;
            Mazed.effects[0] = Mazed.game.add.audio('EEE', Mazed.effV, false);
            Mazed.effects[1] = Mazed.game.add.audio('EPE', Mazed.effV, false);
            Mazed.effects[2] = Mazed.game.add.audio('EPJ', Mazed.effV, false);
            Mazed.effects[3] = Mazed.game.add.audio('EPS', Mazed.effV, false);
            Mazed.effects[4] = Mazed.game.add.audio('EPS2', Mazed.effV, false);
            Mazed.effects[5] = Mazed.game.add.audio('EPJB', Mazed.effV, false);
            Mazed.effects[6] = Mazed.game.add.audio('EEA', Mazed.effV, false);
            Mazed.effects[7] = Mazed.game.add.audio('EPW', Mazed.effV, false);
            Mazed.effects[8] = Mazed.game.add.audio('SEL', Mazed.effV, false);
            this.game.state.start('MainMenu', true);
        }
    }
};
