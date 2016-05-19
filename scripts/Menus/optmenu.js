var Mazed = Mazed || {};

Mazed.MoreMenu = function () {
};

Mazed.MoreMenu.prototype = {
    create: function () {
        this.game.camera.bounds = null;
        var i = Mazed.game.rnd.integerInRange(0, 2), m = 72 / 2, xx = Mazed.width * 1 / 8, yy = Mazed.height / 2;
        Mazed.setupBackground(i);
        Mazed.setupLogo(xx, i);
        Mazed.setupMusic(i);

        Mazed.addButton(xx, yy - 3 * m, 'menubuttons', this.goMaze, this, 11, 10, 0, this.helpMaze);
        Mazed.addButton(xx, yy - m, 'menubuttons', this.goPlat, this, 13, 12, 0, this.helpPlat);
        Mazed.addButton(xx, yy + m, 'menubuttons', this.goShoot, this, 15, 14, 0, this.helpShoot);
        Mazed.addButton(xx, yy + 3 * m, 'menubuttons', this.goBack, this, 9, 8, 0, this.helpBack);

        Mazed.helptext.setText("GAME MODES");

        Mazed.game.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown.add(this.goBack, this);
        Mazed.game.state.onShutDownCallback = function () { Mazed.music.stop(); };
        utils.setscreenShake(Mazed, 250, 4);
    },

    update: function () { if (Mazed.shaking) { utils.screenShake(Mazed); } },

    goMaze: function () { Mazed.game.state.start('StorageCheck', true); Mazed.randomMode = false; Mazed.type = 0; },
    goPlat: function () { Mazed.game.state.start('StorageCheck', true); Mazed.randomMode = false; Mazed.type = 1; },
    goShoot: function () { Mazed.game.state.start('StorageCheck', true); Mazed.randomMode = false; Mazed.type = 2; },
    goBack: function () { Mazed.game.state.start('MainMenu', true); },
    
    helpMaze: function () { Mazed.explaintext.setText("SIMPLE MAZE MODE"); },
    helpPlat: function () { Mazed.explaintext.setText("PLATFORM MAZE MODE"); },
    helpShoot: function () { Mazed.explaintext.setText("SHOOTER MAZE MODE"); },
    helpBack: function () { Mazed.explaintext.setText("GO BACK?"); },
};
