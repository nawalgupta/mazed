var Mazed = Mazed || {};

Mazed.Game = function (game) {
};

Mazed.confirm = false;
Mazed.b1 = null;
Mazed.b2 = null;
Mazed.bg = null;

Mazed.Game.prototype = {
    preload: function () {
        if (Mazed.type === 0) {
            Mazed.mapG = new MazeG({ nRows: Mazed.mapS[Mazed.type][0], nCols: Mazed.mapS[Mazed.type][1] });
        } else if (Mazed.type === 1) {
            Mazed.mapG = new PlatG({ nRows: Mazed.mapS[Mazed.type][0], nCols: Mazed.mapS[Mazed.type][1], nM: Mazed.nM });
        } else if (Mazed.type === 2) {
            Mazed.mapG = new ShootG({ nRows: Mazed.mapS[Mazed.type][0], nCols: Mazed.mapS[Mazed.type][1], nM: Mazed.snM, Nen: Mazed.sNen });
        }

        Mazed.mapG.generate(); //Maze Matrix generator
        var ss = ""; for (var i = 0; i < Mazed.mapG.nRows; i++) { ss += Mazed.mapG.at[i].join(','); ss += "\n"; }
        Mazed.game.load.tilemap('map', null, ss, Phaser.Tilemap.CSV);

        Mazed.game.physics.startSystem(Phaser.Physics.ARCADE); //Game Physics
    },

    create: function () {
        Mazed.confirm = false;

        this.bg = Mazed.setupBackground(Mazed.type);

        Mazed.map = Mazed.type === 0 ? new MazeM(this.game, Mazed, 'map') :
                   (Mazed.type === 1 ? new PlatM(this.game, Mazed, 'map') :
                                       new ShootM(this.game, Mazed, 'map'));            this.ent = Mazed.mapG.ent;

        Mazed.player = new Player(Mazed.game, (this.ent[1]) * 32 + 16, (this.ent[0]) * 32 + 16, Mazed); Mazed.game.add.existing(Mazed.player); // Player

        Mazed.hud = new Hud(this.game); Mazed.hud.addScoreBoard();
        Mazed.hud.hud.sh[0].setText(Mazed.level);

        Mazed.game.antialias = false;
        Mazed.vgc = new GC(this.game);

        Mazed.game.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown.add(this.quitGame, this);
        document.addEventListener("backbutton", this.quitGame, false);
        Mazed.game.state.onShutDownCallback = function () { document.removeEventListener("backbutton", this.quitGame, false); Mazed.music.stop(); };

        Mazed.music = Mazed.game.add.audio('music' + Mazed.type, Mazed.vol, true); Mazed.music.play();

        Mazed.hud.addMessage(Mazed.Intro[Mazed.game.rnd.integerInRange(0, Mazed.Intro.length - 1)]); //Hud stuff
        Mazed.game.time.events.add(Mazed.game.rnd.integerInRange(3, 6) * 10000, this.randomM, this);

        Mazed.fadeIn(1000, Mazed.fazeColor[Mazed.type], 0); //0xD7D4DB

        var m = 72 / 2, xx = Mazed.width / 2, yy = Mazed.height - 100;
        Mazed.bg = Mazed.game.add.tileSprite(Mazed.width / 4, Mazed.height / 2, Mazed.width * 2 / 4, Mazed.height / 2, "background" + Mazed.type);
        Mazed.bg.alpha = 0.75; Mazed.bg.fixedToCamera = true; Mazed.bg.kill();
        Mazed.helptext = Mazed.game.add.bitmapText(Mazed.width / 2, Mazed.height + 27 - 50, 'jmfont', "EXIT GAME?", 32);
        Mazed.helptext.smoothed = true; Mazed.helptext.anchor.setTo(0.5); Mazed.helptext.fixedToCamera = true; Mazed.helptext.kill();

        Mazed.b1 = Mazed.addButton(xx - m, yy, 'menubuttons', function () {
            if (Mazed.player.allowMove) {
                Mazed.confirm = false;
                Mazed.music.stop();
                if (Mazed.randomMode) {
                    localStorage.setItem('rmtype', JSON.stringify(Mazed.type));
                    localStorage.setItem('rsize', JSON.stringify(Mazed.mapS));
                    localStorage.setItem('rlevel', JSON.stringify(Mazed.level));
                } else {
                    localStorage.setItem('size' + Mazed.type, JSON.stringify(Mazed.mapS[Mazed.type]));
                    localStorage.setItem('level' + Mazed.type, JSON.stringify(Mazed.level));
                }
                Mazed.level = 1; Mazed.mapS = [[3, 3], [3, 3], [3, 3]];
                Mazed.game.state.start('MainMenu', true);
            }
        }, this, 29, 28, 0, null);

        Mazed.b2 = Mazed.addButton(xx + m, yy, 'menubuttons', function () {
            Mazed.b1.kill(); Mazed.b2.kill(); Mazed.bg.kill(); Mazed.helptext.kill(); Mazed.confirm = false;
        }, this, 31, 30, 0, null);
        Mazed.b1.kill(); Mazed.b2.kill();
        
        this.AchievementsCheck();
    },

    update: function () {
        if (Mazed.shaking) { utils.screenShake(Mazed); }

        this.bg.tilePosition.set(-this.game.camera.x, -this.game.camera.y); //Background update
        this.game.physics.arcade.collide(Mazed.player, Mazed.map.l0);
    },

    randomM: function () {
        if (Mazed.hud.mFree) {
            Mazed.hud.addMessage(Mazed.Random[Mazed.game.rnd.integerInRange(0, Mazed.Random.length - 1)]);
        }
        Mazed.game.time.events.add(Mazed.game.rnd.integerInRange(3,6)*10000, this.randomM, this);
    },

    quitGame: function (pointer) {
        if (!Mazed.confirm && Mazed.player.allowMove) {
            Mazed.confirm = true;
            Mazed.b1.revive();
            Mazed.b2.revive();
            Mazed.bg.revive();
            Mazed.helptext.revive();
        }
    },
    
    AchievementsCheck: function () {
      if (Mazed.randomMode === true && Mazed.level === 100) {
          Mazed.r100 = 1;
          localStorage.setItem('r100', JSON.stringify(Mazed.r100));
      }  
      if (Mazed.randomMode === false && Mazed.level === 100) {
          Mazed.s100 = 1; 
          localStorage.setItem('s100', JSON.stringify(Mazed.s100));
      }      
    }
};
