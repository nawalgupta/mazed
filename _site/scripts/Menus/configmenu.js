var Mazed = Mazed || {}; Mazed.OptionsMenu = function () {};

Mazed.OptionsMenu.prototype = {
    create: function () {
        this.game.camera.bounds = null;
        var i = Mazed.game.rnd.integerInRange(0, 2), m = 72 / 2, xx = Mazed.width * 1 / 8, yy = Mazed.height / 2;
        Mazed.setupBackground(i);
        Mazed.setupLogo(xx, i);
        Mazed.setupMusic(i);

        this.bckEV = Mazed.effV; Mazed.addButton(xx, yy - 3 * m, 'menubuttons', this.chageEVol, this, 35 - Mazed.effV * 10, 34 + Mazed.effV * 10, 0, this.helpEVol);
        this.bckshake = Mazed.Pshaking; Mazed.addButton(xx, yy - m, 'menubuttons', this.changeShake, this, 21 - Mazed.Pshaking, 20 + Mazed.Pshaking, 0, this.helpShake);
        this.bckvol = Mazed.vol; Mazed.addButton(xx, yy + m, 'menubuttons', this.changeVol, this, 17 - Mazed.vol, 16 + Mazed.vol, 0, this.helpVol);
        Mazed.addButton(xx, yy + 3 * m, 'menubuttons', this.goBack, this, 9, 8, 0, this.helpBack);

        Mazed.helptext.setText("OPTIONS");

        Mazed.game.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown.add(this.goBack, this);
        Mazed.game.state.onShutDownCallback = function () { Mazed.music.stop(); };
        utils.setscreenShake(Mazed, 250, 4);
    },

    update: function () { if (Mazed.shaking) { utils.screenShake(Mazed); } },

    chageEVol: function () {
        this.bckEV ? Mazed.effV = 0 : Mazed.effV = 0.1;
        for (var i = 0; i < Mazed.effects.length; i++) { Mazed.effects[i].volume = Mazed.effV; }
        localStorage.setItem('Evol', JSON.stringify(!Mazed.effV));
        Mazed.game.state.restart();
    },
    changeShake: function () {
        this.bckshake ? Mazed.Pshaking = false : Mazed.Pshaking = true;
        localStorage.setItem('shake', JSON.stringify(!Mazed.Pshaking));
        Mazed.game.state.restart();
    },
    changeVol: function () {
        this.bckvol ? Mazed.vol = 0 : Mazed.vol = 1;
        localStorage.setItem('vol', JSON.stringify(!Mazed.vol));
        Mazed.game.state.restart();
    },
    
    goBack: function () { Mazed.game.state.start('MainMenu', true); },
    
    helpEVol: function () { Mazed.explaintext.setText("SOUND EFFECTS VOLUME"); },
    helpShake: function () { Mazed.explaintext.setText("SCREENSHAKE"); },
    helpVol: function () { Mazed.explaintext.setText("MUSIC VOLUME"); },
    helpBack: function () { Mazed.explaintext.setText("GO BACK?"); },
};
