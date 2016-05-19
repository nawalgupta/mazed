var Player = function (game, x, y, FW) {
    this.FW = FW;
    this.count = 0;
    this.allowMove = false; this.bulletTimer = 0;

    Phaser.Sprite.call(this, game, x, y, 'dude0');
    this.game.physics.arcade.enable(this); this.anchor.setTo(0.5, 0.5); this.body.collideWorldBounds = false;

    var afr = 15;
    this.animations.add('moving', [0, 1, 2, 3], afr, true);
    this.animations.add('left', [6, 5, 4, 7], afr, true);
    this.animations.add('right', [6, 7, 4, 5], afr, true);
    this.animations.add('rightb', [2, 1, 0, 3], afr, true);
    this.animations.add('leftb', [2, 3, 0, 1], afr, true);
    this.animations.add('idle0', [8, 9, 8, 8], afr, true);
    this.animations.add('idle1', [10, 11, 10, 10], afr, true);
    this.animations.add('idle2', [12, 19, 12, 12], afr, true);
    this.animations.add('fleft', [12, 16, 17, 18], afr, true);
    this.animations.add('fright', [12, 18, 17, 16], afr, true);
    this.animations.add('fforward', [12, 15, 14, 13], afr, true);

    this.animations.add('death', [20, 21, 22, 23, 24, 25, 26, 27], afr, true).onComplete.add(function () {
        this.trail.destroy();
        this.game.time.events.add(2500, function () {
            Mazed.music.stop();
            Mazed.game.time.events.add(2000, function () { Mazed.game.state.start('Game', true); }, this);
        }, this);
    }, this);

    this.game.camera.bounds = null;
    var ww = 80, hh = 60;
    this.cameraDeadzone = new Phaser.Rectangle(ww, hh, Mazed.width - 2 * ww, Mazed.height - 2 * hh);

    if (Mazed.type === 0) {
        this.game.camera.focusOn(this);
        var tween = this.game.add.tween(this.scale).from({ x: 3, y: 3 }, 1000, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(function () { this.allowMove = true; this.body.collideWorldBounds = true; utils.setscreenShake(Mazed, 250, 6); }, this);
        this.nLTweens1 = this.game.add.tween(this.scale).to({ x: 0.1, y: 0.1 }, 3000, Phaser.Easing.Linear.None, false);
    } else if (Mazed.type === 1) {
        Mazed.game.camera.focusOnXY(32 * (this.FW.nM / 2 + 2), 32 * (this.FW.nM / 2 + 2));
        var tween = this.game.add.tween(this).from({ y: -100 }, 1000, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(function () {
            this.body.velocity.y = 150; this.allowMove = true; this.body.collideWorldBounds = true;
        }, this);
        this.nLTweens1 = this.game.add.tween(this).to({ y: Mazed.mapG.nRows * 32 + 100 }, 1000, Phaser.Easing.Linear.None, false);
        this.nLTweens1.onStart.add(function () {
            this.body.collideWorldBounds = false; this.game.camera.focusOnXY(this.game.camera.position.x, this.game.camera.position.y);
        }, this);
    } else if (Mazed.type === 2) {
        this.animations.play('idle2');
        this.body.maxAngular = 600;
        this.body.maxVelocity.setTo(200, 200);
        Mazed.game.camera.focusOn(this);
        Mazed.shootAngle === null ? this.angle = 90 : this.angle = Mazed.shootAngle;
        var tween = this.game.add.tween(this.scale).from({ x: 3, y: 3 }, 1000, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(function () {
            this.allowMove = true; this.body.collideWorldBounds = true;
            utils.setscreenShake(Mazed, 250, 6);
        }, this);
        this.nLTweens1 = this.game.add.tween(this.scale).to({ x: 0.1, y: 0.1 }, 3000, Phaser.Easing.Linear.None, false);

        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(30, 'bullet');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 0.5);

        this.bullets.forEach(function (bullet) {
            bullet.events.onKilled.add(function () {
                Mazed.effects[4].play();

                var bex = this.bexplos.getFirstExists(false);
                bex.reset(bullet.body.x, bullet.body.y);
                bex.angle = this.angle;
                bex.alpha = 0.5;
                bex.play('bexplo', 30, false, true);
            }, this);
        }, this);

        this.bexplos = this.game.add.group();
        this.bexplos.enableBody = true;
        this.bexplos.physicsBodyType = Phaser.Physics.ARCADE;
        this.bexplos.createMultiple(30, 'bexplo');
        this.bexplos.setAll('anchor.x', 0.5);
        this.bexplos.setAll('anchor.y', 0.5);
        this.bexplos.forEach(function (bexplo) {
            bexplo.animations.add('bexplo', [0, 1, 2]);
        });
        var ww = 80, hh = (Mazed.height - Mazed.snM * 32) / 2;
        this.cameraDeadzone = new Phaser.Rectangle(ww, hh, Mazed.width - 2 * ww, Mazed.height - 2 * hh);
    }
    //*/
    this.Afree = true;

    this.trail = Mazed.game.add.emitter(this.x, this.y, 20);
    this.trail.makeParticles('trail', [0, 1, 2]);
    this.trail.setXSpeed(0, 0);
    Mazed.type === 1 ? this.trail.gravity = -300 : this.trail.gravity = 0;

    this.trail.setYSpeed(0, 0);
    this.trail.setRotation(0, 0);
    this.trail.start(false, 750, 50);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function () {
    this.trail.x = this.x;
    this.trail.y = this.y;

    Mazed.map.updateMap(this);
    //if (this.game.device.desktop) {
    if (Mazed.type === 0 && this.Afree) {
        var cam = Mazed.game.camera;
        var hEdge = this.x - cam.x, vEdge = this.y - cam.y;

        if (hEdge < this.cameraDeadzone.left || hEdge > this.cameraDeadzone.right || vEdge < this.cameraDeadzone.top || vEdge > this.cameraDeadzone.bottom) {
            var camCenter = { x: cam.x + (cam.width / 2), y: cam.y + (cam.height / 2) };
            var diff = Phaser.Point.subtract(this, camCenter);
            //cam.x += diff.x * 1.9;
            //cam.y += diff.y * 1.9;
            this.Afree = false;
            var tween = Mazed.game.add.tween(Mazed.game.camera).to(
                { x: Mazed.game.camera.x + diff.x * 1.9, y: Mazed.game.camera.y + diff.y * 1.9 }
                , 250, Phaser.Easing.Quadratic.InOut, true);
            tween.onComplete.add(function () { this.Afree = true; }, this);
        }
    } else if ((Mazed.type === 2 || Mazed.type === 1) && this.allowMove && this.Afree) {
        var cam = Mazed.game.camera;

        var hEdge = this.x - cam.x, vEdge = this.y - cam.y;
        var camCenter = { x: cam.x + (cam.width / 2), y: cam.y + (cam.height / 2) };
        var diff = Phaser.Point.subtract(this, camCenter);
        diff.floor();

        diff.y = diff.y / Math.abs(diff.y) * (Mazed.snM * 32) / 2;
        diff.x = diff.x / Math.abs(diff.x) * (Mazed.snM * 32) / 2;

        if (hEdge < this.cameraDeadzone.left) {
            this.Afree = false;
            var tween = Mazed.game.add.tween(Mazed.game.camera).to({ x: Mazed.game.camera.x + diff.x * 4 }, 500, Phaser.Easing.Quadratic.InOut, true);
            tween.onComplete.add(function () { this.Afree = true; }, this);
        } else if (hEdge > this.cameraDeadzone.right) {
            this.Afree = false;
            var tween = Mazed.game.add.tween(Mazed.game.camera).to({ x: Mazed.game.camera.x + diff.x * 4 }, 500, Phaser.Easing.Quadratic.InOut, true);
            tween.onComplete.add(function () { this.Afree = true; }, this);
        } else if (vEdge < this.cameraDeadzone.top) {
            this.Afree = false;
            var tween = Mazed.game.add.tween(Mazed.game.camera).to({ y: Mazed.game.camera.y + diff.y * 2 }, 500, Phaser.Easing.Quadratic.InOut, true);
            tween.onComplete.add(function () { this.Afree = true; }, this);
        } else if (vEdge > this.cameraDeadzone.bottom) {
            this.Afree = false;
            var tween = Mazed.game.add.tween(Mazed.game.camera).to({ y: Mazed.game.camera.y + diff.y * 2 }, 500, Phaser.Easing.Quadratic.InOut, true);
            tween.onComplete.add(function () { this.Afree = true; }, this);
        }
    }

};

Player.prototype.nextLevel = function () {
    this.allowMove = false;
    if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
        if (this.count === 0) {
            this.count++;
            Mazed.hud.addMessage(Mazed.EndLevel[Mazed.game.rnd.integerInRange(0, Mazed.EndLevel.length - 1)]); //Hud stuff

            this.nLTweens1.start(); this.trail.frequency = 50000;
            if (Mazed.type === 2) { Mazed.shootAngle = this.angle; }
        }
    }
};

Player.prototype.fire = function () {
    var bullet = this.bullets.getFirstExists(false);
    if (bullet && this.game.time.now > this.bulletTimer) {
        Mazed.effects[3].play();

        bullet.reset(this.x + 20 * Math.cos(this.game.math.degToRad(this.angle)), this.y + 20 * Math.sin(this.game.math.degToRad(this.angle)));
        bullet.angle = this.angle;
        var v = 500;
        bullet.body.velocity.setTo(v * Math.cos(this.angle * Math.PI / 180), v * Math.sin(this.angle * Math.PI / 180));
        this.body.velocity.x = -v * Math.cos(this.angle * Math.PI / 180);
        this.body.velocity.y = -v * Math.sin(this.angle * Math.PI / 180);
        this.bulletTimer = this.game.time.now + 100;
    }
};

Player.prototype.bulletKill = function (bullet, enemy) {
    bullet.kill();
};

Player.prototype.enemyKill = function (bullet, enemy) {
    bullet.kill();
    enemy.events.onKilled.add(function (enemy) {
        Mazed.nd100 += 1;
        localStorage.setItem('nd100', JSON.stringify(Mazed.nd100));
        if (Mazed.nd100 === 100) {
            Mazed.d100 = 1;
            localStorage.setItem('d100', JSON.stringify(Mazed.d100));
        }
        if (Mazed.hud.mFree) {
            Mazed.hud.addMessage(Mazed.Killing[Mazed.game.rnd.integerInRange(0, Mazed.Killing.length - 1)]); //Hud stuff
        }
        utils.setscreenShake(Mazed, 250, 2);
        this.game.time.events.add(500, function () {
            var tsprite = Mazed.game.add.sprite(enemy.body.x, enemy.body.y, 'enemy', 12, Mazed.gtemp);
            tsprite.alpha = 0.75;
        }, this);
    }, this);
    enemy.kill();
};

Player.prototype.playerKill = function (player, enemy) {
    if (player.allowMove) {
        Mazed.effects[1].play();

        if (Mazed.hud.mFree) {
            Mazed.hud.addMessage(Mazed.Death[Mazed.game.rnd.integerInRange(0, Mazed.Death.length - 1)]); //Hud stuff
        }
        Mazed.game.camera.unfollow();
        utils.setscreenShake(Mazed, 1000, 15);
        player.animations.play('death', 15, false, true);
        enemy.animations.play('enemyDeath', 30, false, true);
        Mazed.fadeOut(500, 0xFFFEF6, 4500);
        if (Mazed.type === 2) { Mazed.shootAngle = this.angle; }
        if (Mazed.randomMode) {
            localStorage.setItem('rmtype', JSON.stringify(Mazed.type));
            localStorage.setItem('rsize', JSON.stringify(Mazed.mapS[Mazed.type]));
            localStorage.setItem('rlevel', JSON.stringify(Mazed.level));
        } else {
            localStorage.setItem('size' + Mazed.type, JSON.stringify(Mazed.mapS[Mazed.type]));
            localStorage.setItem('level' + Mazed.type, JSON.stringify(Mazed.level));
        }
        player.allowMove = false;
    }
};