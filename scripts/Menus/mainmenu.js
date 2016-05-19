var Mazed = Mazed || {}; Mazed.MainMenu = function () {};
Mazed.i = 0; Mazed.b = [null, null, null, null, null];
Mazed.MainMenu.prototype = {
    create: function () {
        Mazed.confirm = false;
        this.game.camera.bounds = null;
        var i = Mazed.game.rnd.integerInRange(0, 2), m = 72 / 2, xx = Mazed.width * 1 / 8, yy = Mazed.height / 2;
        Mazed.setupBackground(i);
        Mazed.setupLogo(xx, i);
        Mazed.setupMusic(i);
        Mazed.i = i;

        Mazed.b[0] = Mazed.addButton(xx, yy - 3 * m, 'menubuttons', this.startGame, this, 1, 0, 0, this.helpGame);
        Mazed.b[1] = Mazed.addButton(xx, yy - m, 'menubuttons', this.startMore, this, 3, 2, 0, this.helpMore);
        Mazed.b[2] = Mazed.addButton(xx, yy + m, 'menubuttons', this.startOptions, this, 5, 4, 0, this.helpOptions);
        Mazed.b[3] = Mazed.addButton(xx, yy + 3 * m, 'menubuttons', this.startAchi, this, 7, 6, 0, this.helpAchi);

        Mazed.helptext.setText("READY TO MAZE?");
        Mazed.explaintext.setText(" ");

        Mazed.game.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown.add(this.exitGame, this);
        Mazed.game.state.onShutDownCallback = function () { Mazed.music.stop(); };
        utils.setscreenShake(Mazed, 250, 4);
    },

    update: function () { if (Mazed.shaking) { utils.screenShake(Mazed); } },

    startGame: function () { this.game.state.start('StorageCheck', true); Mazed.randomMode = true; },
    startMore: function () { this.game.state.start('MoreMenu', true); },
    startOptions: function () { this.game.state.start('OptionsMenu', true); },
    startAchi: function () { this.game.state.start('AchievMenu', true); },

    helpGame: function () { Mazed.explaintext.setText("START RANDOM GAME MODE"); },
    helpMore: function () { Mazed.explaintext.setText("OPEN GAME MODES"); },
    helpOptions: function () { Mazed.explaintext.setText("CHANGE OPTIONS"); },
    helpAchi: function () { Mazed.explaintext.setText("ACHIEVEMENTS"); },
    helpExit: function () { Mazed.explaintext.setText("ALREADY LEAVING?"); },

    exitGame: function () {
        if (!Mazed.confirm) {
            for (var i = 0; i < Mazed.b.length; i++) { Mazed.b[i].inputEnabled = false; }
            Mazed.confirm = true;
            var m = 72 / 2, xx = Mazed.width / 2, yy = 100;
            Mazed.helptext.setText("EXIT GAME?");
            var bg = Mazed.game.add.tileSprite(0, 50, Mazed.width, Mazed.height, "background" + Mazed.i);
            bg.fixedToCamera = true; bg.tilePosition.set(-16, -16 + 46);
            var b1 = Mazed.addButton(xx - m, yy, 'menubuttons', function () {
                b1.destroy(); b2.destroy(); bg.destroy();
                for (var i = 0; i < Mazed.b.length; i++) { Mazed.b[i].inputEnabled = true; } 
                Mazed.helptext.setText("READY TO MAZE?"); Mazed.explaintext.setText("?"); Mazed.confirm = false; window.close();
            }, this, 29, 28, 0, null);
            var b2 = Mazed.addButton(xx + m, yy, 'menubuttons', function () {
                b1.destroy(); b2.destroy(); bg.destroy(); 
                for (var i = 0; i < Mazed.b.length; i++) { Mazed.b[i].inputEnabled = true; } 
                Mazed.helptext.setText("READY TO MAZE?"); Mazed.explaintext.setText("?"); Mazed.confirm = false;
            }, this, 31, 30, 0, null);
        }
    },
};
