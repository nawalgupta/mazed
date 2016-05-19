var Mazed = Mazed || {};

Mazed.StorageCheck = function (game) {
    this.lssize;
    this.lsrmt;
    this.lslevel;
    this.Tstring = "";
};
var temp;
Mazed.StorageCheck.prototype = {
    create: function () {
        this.lsrmt = Mazed.type;
        this.lssize = JSON.parse(localStorage.getItem('size' + Mazed.type));
        this.lslevel = JSON.parse(localStorage.getItem('level' + Mazed.type));

        if (Mazed.randomMode) {
            Mazed.type = Mazed.game.rnd.integerInRange(0, 2);
            this.lsrmt = JSON.parse(localStorage.getItem('rmtype'));
            this.lssize = JSON.parse(localStorage.getItem('rsize'));
            this.lslevel = JSON.parse(localStorage.getItem('rlevel'));
        }

        if (this.lslevel !== null) {
            this.game.camera.bounds = null;
        var i = Mazed.game.rnd.integerInRange(0, 2), m = 72 / 2, xx = Mazed.width * 1 / 8, yy = Mazed.height / 2;
            Mazed.setupBackground(i);
            Mazed.setupLogo(xx, i);
            Mazed.setupMusic(i);
            Mazed.addButton(xx, yy - 3 * m, 'menubuttons', this.goYes, this, 29, 28, 0, null);
            Mazed.addButton(xx, yy - m, 'menubuttons', this.goNo, this, 31, 30, 0, null);
            Mazed.addButton(xx, yy + m, 'menubuttons', this.INFO, this, 33, 32, 0, null);
            Mazed.addButton(xx, yy + 3 * m, 'menubuttons', this.goBack, this, 9, 8, 0, null);

            Mazed.helptext.setText("A SAVE WAS FOUND, KEEP GOING?");

            Mazed.game.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown.add(this.goBack, this);
            document.addEventListener("backbutton", this.goBack, false);
            Mazed.game.state.onShutDownCallback = function () { document.removeEventListener("backbutton", this.goBack, false); Mazed.music.stop(); };
        } else {
            this.game.state.start('Game', true);
        }
    },

    update: function () { if (Mazed.shaking) { utils.screenShake(Mazed); } },

    goYes: function () {
      Mazed.type = this.lsrmt;
      Mazed.randomMode ? Mazed.mapS = this.lssize : Mazed.mapS[Mazed.type] = this.lssize;
      Mazed.level = this.lslevel;
      this.game.state.start('Game', true);
    },
    goNo: function () {
      Mazed.level = 1; 
      Mazed.mapS[Mazed.type][0] = 3;
      Mazed.mapS[Mazed.type][1] = 3;

      this.game.state.start('Game', true);
    },
    INFO: function () {
      Mazed.randomMode ? this.Tstring = "SAVE: RANDOM " : this.Tstring = "SAVE: ";
      this.Tstring += "LVL " + this.lslevel + " ";
      this.lsrmt === 0 ? this.Tstring += "SIMPLE" : (this.lsrmt === 1 ? this.Tstring += "PLATFORM" : this.Tstring += "SHOOTER");

      Mazed.explaintext.setText(this.Tstring);
    },
    goBack: function () { this.game.state.start('MainMenu', true); },
};
