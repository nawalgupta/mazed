var Mazed = Mazed || {};

Mazed.LevelReview = function (game) {
    this.lssize;
    this.lsrmt;
    this.lslevel;
    this.Tstring = "";
};

Mazed.LevelReview.prototype = {
    create: function () {
      this.game.camera.bounds = null; Mazed.setupMusic(Mazed.type);

      var bg1 = Mazed.game.add.tileSprite(0, 0, Mazed.width/2, Mazed.height, "background"+Mazed.type); //bg1.frame = 3;

      Mazed.minimap = Mazed.game.add.group();
      Mazed.minimap.fixedToCamera = true;
      var bx = 0, by = 0;
      var scale = (Mazed.height)/(2*Mazed.mapG.nRows);

      for (var i = 0; i < Mazed.mapG.nRows; i++) {
        for (var j = 0; j < Mazed.mapG.nCols; j++) {
          if (Mazed.type === 0) {
            if (Mazed.mapG.at[j][i] === 1 || Mazed.mapG.at[j][i] === 2) {
              Mazed.minimap.create(bx + scale*2*i, by + scale*2*j, 'minimap', 0).smoothed = false;
            } else {             
              Mazed.minimap.create(bx + scale*2*i, by + scale*2*j, 'minimap', Mazed.mapG.at[j][i]).smoothed = false;
            }
          } else if (Mazed.type === 1) {
            if (Mazed.mapG.at[j][i] === 1) {
              Mazed.minimap.create(bx + scale*2*i, by + scale*2*j, 'minimap', 3).smoothed = false;
            } else {
              Mazed.minimap.create(bx + scale*2*i, by + scale*2*j, 'minimap', Mazed.mapG.at[j][i]).smoothed = false;
            }
          } else if (Mazed.type === 2) {
            if (Mazed.mapG.at[j][i] === 1) {
              Mazed.minimap.create(bx + scale*2*i, by + scale*2*j, 'minimap', 3).smoothed = false;
            } else {
              Mazed.minimap.create(bx + scale*2*i, by + scale*2*j, 'minimap', Mazed.mapG.at[j][i]).smoothed = false;
            }
          }
        }
      }
      Mazed.minimap.setAll('scale.x', scale); Mazed.minimap.setAll('scale.y', scale);

      var bg2 = Mazed.game.add.tileSprite(Mazed.height, 0, Mazed.width, Mazed.height, "minimap"); bg2.frame = 5;

      var m = 72 / 2, xx = Mazed.height + (Mazed.width - Mazed.height) / 2, yy = Mazed.height - 50;
      Mazed.addButton(xx - m, yy, 'menubuttons', this.goNext, this, 37, 36, 0, null);
      Mazed.addButton(xx + m, yy, 'menubuttons', this.goBack, this, 9, 8, 0, null);

      for (var i =  Mazed.height / 80; i < Mazed.width; i++) {
          var bg3 = this.game.add.image(80 * i, 50, 'panel', 2, this.hud); bg3.anchor.setTo(0, 0.5); bg3.smoothed = true; //bg3.alpha = 0.75;
      }

      Mazed.helptext = Mazed.game.add.bitmapText(Mazed.height + (Mazed.width - Mazed.height) / 2, 50+2, 'jmfont', "YOU DID IT!", 32);
      Mazed.helptext.smoothed = true; Mazed.helptext.anchor.setTo(0.5); Mazed.helptext.fixedToCamera = true;


      for (var i =  Mazed.height / 80; i < Mazed.width; i++) {
        var bg3 = this.game.add.image(80 * i, 100, 'panel', 2, this.hud); bg3.anchor.setTo(0, 0.5); bg3.smoothed = true; //bg3.alpha = 0.75;
      }

      Mazed.helptext = Mazed.game.add.bitmapText(Mazed.height + (Mazed.width - Mazed.height) / 2, 100+2, 'jmfont', Mazed.mapS[Mazed.type][0] + "X" + Mazed.mapS[Mazed.type][1], 32);
      Mazed.helptext.smoothed = true; Mazed.helptext.anchor.setTo(0.5); Mazed.helptext.fixedToCamera = true;

      for (var i =  Mazed.height / 80; i < Mazed.width; i++) {
        var bg3 = this.game.add.image(80 * i, 150, 'panel', 2, this.hud); bg3.anchor.setTo(0, 0.5); bg3.smoothed = true; //bg3.alpha = 0.75;
      }

      var rtt = 0;
      Mazed.type === 0 ? rtt = "SIMPLE" : (Mazed.type === 1 ? rtt = "PLATFORM" : rtt = "SHOOTER");
      if (Mazed.randomMode === true) { rtt = "RANDOM"; }
      Mazed.helptext = Mazed.game.add.bitmapText(Mazed.height + (Mazed.width - Mazed.height) / 2, 150+2, 'jmfont', rtt, 32);
      Mazed.helptext.smoothed = true; Mazed.helptext.anchor.setTo(0.5); Mazed.helptext.fixedToCamera = true;

      for (var i =  Mazed.height / 80; i < Mazed.width; i++) {
          var bg3 = this.game.add.image(80 * i, 200, 'panel', 2, this.hud); bg3.anchor.setTo(0, 0.5); bg3.smoothed = true; //bg3.alpha = 0.75;
      }

      Mazed.helptext = Mazed.game.add.bitmapText(Mazed.height + (Mazed.width - Mazed.height) / 2, 200+2, 'jmfont', "NEXT MAZE?", 32);
      Mazed.helptext.smoothed = true; Mazed.helptext.anchor.setTo(0.5); Mazed.helptext.fixedToCamera = true;

      Mazed.game.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown.add(this.goBack, this);
      document.addEventListener("backbutton", this.goBack, false);
      Mazed.game.state.onShutDownCallback = function () { document.removeEventListener("backbutton", this.goBack, false); Mazed.music.stop(); };

      Mazed.level++; Mazed.mapS[Mazed.type][0] += 2; Mazed.mapS[Mazed.type][1] += 2;

      if (Mazed.randomMode) {
          Mazed.type = Mazed.game.rnd.integerInRange(0, 2);
          localStorage.setItem('rmtype', JSON.stringify(Mazed.type));
          localStorage.setItem('rsize', JSON.stringify(Mazed.mapS));
          localStorage.setItem('rlevel', JSON.stringify(Mazed.level));
      } else {
          localStorage.setItem('size' + Mazed.type, JSON.stringify(Mazed.mapS[Mazed.type]));
          localStorage.setItem('level' + Mazed.type, JSON.stringify(Mazed.level));
      }
    },

    update: function () { if (Mazed.shaking) { utils.screenShake(Mazed); } },

    goNext: function () { this.game.state.start('Game', true); },
    goBack: function () { this.game.state.start('MainMenu', true); },    
};
