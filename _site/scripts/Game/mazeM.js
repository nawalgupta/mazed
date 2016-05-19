var MazeM = function (game, FW, tilemap) {
    this.dude = 'dude0';
    this.b = 0;

    this.FW = FW;
    Phaser.Tilemap.call(this, game, tilemap, 32, 32);
    this.addTilesetImage('blocks0');
    this.setCollisionByIndex(3);
    this.setCollisionBetween(3, 40);
    this.setTileIndexCallback(2, this.nextLevel, this);
    this.l0 = this.createLayer(0);
    this.l0.resizeWorld();

    for (var i = 0; i < this.FW.mapG.nRows; i++) {
        for (var j = 0; j < this.FW.mapG.nCols; j++) {
            this.getTile(j, i, this.l0).index = this.FW.mapG.view[i][j];
        }
    }
    this.vy = 0; this.vx = 0; this.uL = false;
    this.donext = true;
};

MazeM.prototype = Object.create(Phaser.Tilemap.prototype);
MazeM.prototype.constructor = MazeM;

MazeM.prototype.updateMap = function (player) {
    //Reset the players velocity (movement)
    if (player.allowMove) {
        if (Math.round(player.body.x) % 32 === 0) { player.body.velocity.x = 0; player.body.x = Math.round(player.body.x); }
        if (Math.round(player.body.y) % 32 === 0) { player.body.velocity.y = 0; player.body.y = Math.round(player.body.y); }
        var v = 100;
        if (Mazed.vgc.Left) { player.body.velocity.x = -v; player.angle = 90; }
        else if (Mazed.vgc.Right) { player.body.velocity.x = v; player.angle = -90; }
        else if (Mazed.vgc.Up) { player.body.velocity.y = -v; player.angle = 180; }
        else if (Mazed.vgc.Down) { player.body.velocity.y = v; player.angle = 0; }

        // Check if animation is actived
        if (player.body.blocked.up === false && player.body.blocked.down === false && player.body.blocked.left === false && player.body.blocked.right === false) {
            if (player.body.velocity.x || player.body.velocity.y) { player.animations.play('moving'); } else { player.animations.play('idle0'); }
        } else { player.animations.play('idle0'); }

        //************************************************************************************************************************************************
        if (player.body.velocity.y || player.body.velocity.x) { this.uL = true; }
        var px = player.body.x, py = player.body.y;
        //Update Lights
        if (this.uL && (px) % 32 === 0 && (py) % 32 === 0) {
            this.FW.mapG.Lights(player);
            var cc = 5;
            for (var j = px / 32 - cc; j <= px / 32 + cc; j++) {
                for (var i = py / 32 - cc; i <= py / 32 + cc; i++) {
                    if (i >= 0 && j >= 0 && i < this.FW.mapG.nRows && j < this.FW.mapG.nCols) {
                        this.getTile(j, i, 0).index = this.FW.mapG.view[i][j];
                    }
                }
            }
            this.uL = false;
            this.l0.dirty = true;
        }
    } else {
        if (Math.round(player.body.x) % 32 === 0) { player.body.velocity.x = 0; }
        if (Math.round(player.body.y) % 32 === 0) { player.body.velocity.y = 0; }
    }
};

MazeM.prototype.nextLevel = function () {
    Mazed.fadeOut(500, 0xD3DBD8, 4500);
    this.FW.player.nextLevel();

    this.game.time.events.add(5000, function () {
        Mazed.music.stop();
        this.game.state.start('LevelReview');
    }, this);
}
