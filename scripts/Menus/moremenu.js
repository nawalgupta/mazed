var Mazed = Mazed || {};

Mazed.InfoMenu = function () {
};

Mazed.InfoMenu.prototype = {
    create: function () {
        this.game.camera.bounds = null;
        var i = Mazed.game.rnd.integerInRange(0, 2), m = 72 / 2, xx = Mazed.width * 1 / 8, yy = Mazed.height / 2;
        Mazed.setupBackground(i);
        Mazed.setupLogo(xx, i);
        Mazed.setupMusic(i);

        Mazed.addButton(xx, yy - 3 * m, 'menubuttons', this.showI, this, 23, 22, 0, this.helpInfo);
        Mazed.addButton(xx, yy - m, 'menubuttons', this.showG, this, 25, 24, 0, this.helpGame);
        Mazed.addButton(xx, yy + m, 'menubuttons', this.showW, this, 27, 26, 0, this.helpWebS);
        Mazed.addButton(xx, yy + 3 * m, 'menubuttons', this.goBack, this, 9, 8, 0, this.helpBack);

        Mazed.helptext.setText("ABOUT");

        Mazed.game.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown.add(this.goBack, this);
        Mazed.game.state.onShutDownCallback = function () { Mazed.music.stop(); };
        utils.setscreenShake(Mazed, 250, 4);
    },

    update: function () { if (Mazed.shaking) { utils.screenShake(Mazed); } },

    showI: function () { Mazed.helptext.setText("ENDLESS MAZE BASED PROJECT"); },
    showG: function () { Mazed.helptext.setText("MORE GAMES COMING SOON!"); },
    showW: function () { Mazed.helptext.setText("FIND ME: JMCRIAT.COM"); },
    goBack: function () { Mazed.game.state.start('MainMenu', true); },
    
    helpInfo: function () { Mazed.explaintext.setText("WHAT IS THIS PROJECT?"); },
    helpGame: function () { Mazed.explaintext.setText("MORE STUFF"); },
    helpWebS: function () { Mazed.explaintext.setText("WEBSITE"); },
    helpBack: function () { Mazed.explaintext.setText("GO BACK?"); },
};
