var ShootM = function (game, FW, tilemap) {
    this.dude = 'dude0';
    this.b = 0;

    this.FW = FW;
    Phaser.Tilemap.call(this, game, tilemap, 32, 32);
    this.game.physics.arcade.gravity.y = 0;
    this.addTilesetImage('blocks2');
    this.setCollision([1, 34]); //this.setCollisionBetween(1, 3);

    this.l0 = this.createLayer(0);
    this.l0.resizeWorld();

    this.l1 = this.createBlankLayer(1, this.FW.mapG.nCols, this.FW.mapG.nRows, 32, 32);
    this.l1.resize(Mazed.width, Mazed.height);

    this.setTileIndexCallback(34, this.nextLevel, this, this.l0);

    for (var i = 0; i < this.FW.mapG.nRows; i++) {
        for (var j = 0; j < this.FW.mapG.nCols; j++) {
            this.getTile(j, i, 0).index = this.FW.mapG.view[i][j];
            this.getTile(j, i, 0).rotation = this.FW.mapG.Rview[i][j];
            if (this.FW.mapG.corners[i][j] !== 0) {
                this.putTile(this.FW.mapG.corners[i][j], j, i, 1);
            }//*/
        }
    }
    //*/
    this.makeEnemies(this.FW.mapG);

    this.minV = 0;
    this.donext = true;
};

ShootM.prototype = Object.create(Phaser.Tilemap.prototype);
ShootM.prototype.constructor = ShootM;

ShootM.prototype.updateMap = function (player) {
    if (player.allowMove) {
        var tVC = Math.cos(player.angle * Math.PI / 180), tVS = Math.sin(player.angle * Math.PI / 180);
        if ((player.body.velocity.x < this.minV && tVC > 0) || (player.body.velocity.x > -this.minV && tVC < 0)) {
            player.body.velocity.x = this.minV * tVC; player.body.acceleration.x = 0;
        }
        if ((player.body.velocity.y < this.minV && tVS > 0) || (player.body.velocity.y > -this.minV && tVS < 0)) {
            player.body.velocity.y = this.minV * tVS; player.body.acceleration.y = 0;
        }
        var v = 100, m = 2, av = 50;
        if (Mazed.vgc.Up) {
            player.body.velocity.setTo(v * tVC, v * tVS); player.body.acceleration.setTo(-v * tVC, -v * tVS);
        }
        if (Mazed.vgc.Down) { player.fire(); }
        if (Mazed.vgc.Left) {
            if (player.body.angularVelocity === 0) { player.body.angularVelocity = -av; }
            player.body.angularAcceleration = -av * m;
        } else if (Mazed.vgc.Right) {
            if (player.body.angularVelocity === 0) { player.body.angularVelocity = av; }
            player.body.angularAcceleration = av * m;
        } else { player.body.angularAcceleration = 0; player.body.angularVelocity = 0; }

        if (player.body.angularVelocity < 0) { player.animations.play('fleft'); }
        else if (player.body.angularVelocity > 0) { player.animations.play('fright'); }
        else if (player.body.velocity.x || player.body.velocity.y) { player.animations.play('fforward'); }
        else { player.animations.play('idle2'); }
    } else {
        player.body.angularAcceleration = 0; player.body.angularVelocity = 0;
        player.body.acceleration.setTo(0,0);
    } //*/

    Mazed.game.physics.arcade.collide(Mazed.enemies, Mazed.map.l0);
    Mazed.game.physics.arcade.collide(Mazed.enemies, Mazed.enemies);

    Mazed.game.physics.arcade.overlap(Mazed.enemies, Mazed.player, Mazed.player.playerKill, null, Mazed.player);

    Mazed.game.physics.arcade.collide(Mazed.player.bullets, Mazed.map.l0, Mazed.player.bulletKill, null, Mazed.player);
    Mazed.game.physics.arcade.overlap(Mazed.player.bullets, Mazed.enemies, Mazed.player.enemyKill, null, Mazed.player); //*/
};

ShootM.prototype.nextLevel = function (player) {
    if (player === Mazed.player) {
        if (this.donext) {
            this.donext = false;
            this.FW.player.body.velocity.x = 0; this.FW.player.body.velocity.y = 0;
            this.FW.player.nextLevel();
            Mazed.fadeOut(500, 0xFFFEF6, 4500);
            this.game.time.events.add(5000, function () {
                this.game.state.start('LevelReview', true);
                Mazed.music.stop();
            }, this);
        }
    } else {
        player.kill();
    }
};

ShootM.prototype.makeEnemies = function (_mapG) {
    Mazed.gtemp = Mazed.game.add.group();
    Mazed.enemies = new Enemy(Mazed.game, _mapG.enemiesData);
};
