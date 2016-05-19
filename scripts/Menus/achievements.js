var Mazed = Mazed || {};

Mazed.AchievMenu = function () {
};

Mazed.AchievMenu.prototype = {
    create: function () {
        this.game.camera.bounds = null;
        var i = Mazed.game.rnd.integerInRange(0, 2), m = 72 / 2, xx = Mazed.width * 1 / 8, yy = Mazed.height / 2;
        Mazed.setupBackground(i);
        Mazed.setupLogo(xx, i);
        Mazed.setupMusic(i);

        Mazed.addButton(xx, yy - 3 * m, 'menubuttons', this.showI, this, 39 - Mazed.r100, 38 + Mazed.r100, 0, this.helpInfo);
        Mazed.addButton(xx, yy - m, 'menubuttons', this.showG, this, 41 - Mazed.s100, 40 + Mazed.s100, 0, this.helpGame);
        Mazed.addButton(xx, yy + m, 'menubuttons', this.showW, this, 43 - Mazed.d100, 42 + Mazed.d100, 0, this.helpWebS);
        Mazed.addButton(xx, yy + 3 * m, 'menubuttons', this.goBack, this, 9, 8, 0, this.helpBack);

        Mazed.helptext.setText("ACHIEVEMENTS");
        Mazed.explaintext.setText(" ");

        Mazed.game.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown.add(this.goBack, this);
        Mazed.game.state.onShutDownCallback = function () { Mazed.music.stop(); };
        utils.setscreenShake(Mazed, 250, 4);
    },

    update: function () { if (Mazed.shaking) { utils.screenShake(Mazed); } },

    showI: function () { Mazed.explaintext.setText("RANDOM MODE LEVEL 100"); },
    showG: function () { Mazed.explaintext.setText("SINGLE MODE LEVEL 100"); },
    showW: function () { Mazed.explaintext.setText("100 THAT DID NOT DESERVE IT"); },
    goBack: function () { Mazed.game.state.start('MainMenu', true); },
    
    helpInfo: function () { Mazed.explaintext.setText("RANDOM MODE LEVEL 100"); },
    helpGame: function () { Mazed.explaintext.setText("SINGLE MODE LEVEL 100"); },
    helpWebS: function () { Mazed.explaintext.setText("100 THAT DID NOT DESERVE IT"); },
    helpBack: function () { Mazed.explaintext.setText("GO BACK?"); },
};
