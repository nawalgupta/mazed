var PlatM = function (game, FW, tilemap) {

    this.dude = 'dude0';
    this.b = 0.1;
    this.FW = FW;
    Phaser.Tilemap.call(this, game, tilemap, 32, 32);
    this.game.physics.arcade.gravity.y = 300;
    this.addTilesetImage('blocks1');
    this.setTileIndexCallback(32, this.nextLevel, this);
    this.setCollisionBetween(1, 32);

    this.l0 = this.createLayer(0);
    this.l0.resizeWorld();

    this.l1 = this.createBlankLayer(1, this.FW.mapG.nCols, this.FW.mapG.nRows, 32, 32);
    this.l1.resize(this.l0.width, this.l1.height);

    for (var i = 0; i < this.FW.mapG.nRows; i++) {
        for (var j = 0; j < this.FW.mapG.nCols; j++) {
            this.getTile(j, i, 0).index = this.FW.mapG.view[i][j];
            if (this.FW.mapG.corners[i][j] !== 0) { this.putTile(this.FW.mapG.corners[i][j], j, i, 1); }
        }
    }
    var sprite = this.FW.game.add.sprite((this.FW.mapG.ent[1] - 1) * 32, 0, 'blocks1A'); sprite.angle = 180; sprite.anchor.setTo(1, 0);
    this.FW.game.add.sprite((this.FW.mapG.exit[1] - 1) * 32, (this.FW.mapG.exit[0] + 1) * 32, 'blocks1A');

    this.vy = 0;
    this.vx = 0;
    this.uL = false;
    this.jumpTimer = 0;
    this.bustCDTimer = 0;
    this.bustCD = 5000;
    this.donext = true;
};

PlatM.prototype = Object.create(Phaser.Tilemap.prototype);
PlatM.prototype.constructor = PlatM;

PlatM.prototype.updateMap = function (player) {
    //Reset the players velocity (movement)
    if (Math.round(player.body.x) % 32 === 0) { player.body.velocity.x = 0; player.body.x = Math.round(player.body.x); }

    if (player.allowMove) {
        var v = 100; //Player movement
        if (Mazed.vgc.Left) { player.body.velocity.x = -v; }
        else if (Mazed.vgc.Right) { player.body.velocity.x = v; }

        if ((Mazed.vgc.Down) && this.bustCDTimer < player.game.time.now) {
            Mazed.effects[5].play(); this.bustCDTimer = player.game.time.now + this.bustCD; player.body.velocity.y = -4 * v;
        }
        if (Mazed.vgc.Up) { if (player.body.onFloor()) { Mazed.effects[2].play(); player.body.velocity.y = - 2.5 * v; }  }
    }
    if (player.body.velocity.x < 0) { player.animations.play('left'); }
    else if (player.body.velocity.x > 0) { player.animations.play('right'); }
    else { player.animations.play('idle1'); }
};

PlatM.prototype.nextLevel = function () {
    Mazed.fadeOut(500, 0xD7D4DB, 4500);
    this.FW.player.body.velocity.y = 0;
    this.FW.player.nextLevel();

    this.game.time.events.add(5000, function () {
        if (this.donext) {
            this.donext = false;
            Mazed.music.stop();
            this.game.state.start('LevelReview');
        }
    }, this);
}
