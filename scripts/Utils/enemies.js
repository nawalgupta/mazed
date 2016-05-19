var Enemy = function (game, _data, player) {
    var ne2 = 0;
    for (var i = 0; i < _data.length; i++) { ne2 += _data[i][2]; }
    Phaser.Group.call(this, game);
    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;
    this.createMultiple(ne2, 'enemy');
    
    this.setAll('anchor.x', 0.5);
    this.setAll('anchor.y', 0.5);
    this.setAll('body.bounce.x', 1);
    this.setAll('body.bounce.y', 1);
    var temp = 0, i = 0;
    this.forEach(function (enemy) {
        enemy.animations.add('enemyIdle', [0, 1, 2, 1], 15, true);
        enemy.animations.add('enemyDeath', [0, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 25, true);
        enemy.animations.play('enemyIdle');
        enemy.body.enable = false;
        enemy.renderable = false;
        enemy.tstart = Mazed.game.add.tween(enemy.scale).from({ x: 5, y: 5 }, 400, Phaser.Easing.Linear.None, false);
        enemy.x = _data[i][1] * 32 + 16;
        enemy.y = _data[i][0] * 32 + 16;
        enemy.where = Mazed.game.add.image(enemy.x, enemy.y, 'enemy', 14, Mazed.gtemp);
        enemy.where.anchor.set(0.5);
        enemy.where.animations.add('falling', [15,16, 17, 18, 19]).onComplete.add(function () {
            this.renderable = true;
            this.tstart.start();
            this.where.frame = 13;
        }, enemy);
        enemy.alowRevive = true;
        enemy.events.onRevived.add(function (enemy) {
            enemy.where.animations.play('falling', 15, false);
        });
        
        enemy.tstart.onComplete.add(function () {
            Mazed.effects[6].play();
            utils.setscreenShake(Mazed, 250, 6);
            enemy.body.enable = true;
            var v = 50;
            this.body.velocity.x = Mazed.game.rnd.integerInRange(-v, v);
            this.body.velocity.y = Mazed.game.rnd.integerInRange(-v, v);
        }, enemy);

        enemy.idata = i;
        temp++;
        if (temp === _data[i][2]) {
            temp = 0;
            i++;
        }

        enemy.events.onKilled.add(function (enemy) {
            Mazed.effects[0].play();
            var tsprite = Mazed.game.add.sprite(enemy.body.x, enemy.body.y, 'enemy', 12, Mazed.gtemp);
            tsprite.animations.add('enemyDeath', [0, 3, 4, 5, 6, 7, 8, 9, 10, 11], 25, false);
            tsprite.animations.play('enemyDeath', 30, false, true);
        }, this);
    }, _data, temp, i);
    Mazed.game.time.events.add(Mazed.game.rnd.integerInRange(1000, 3000), this.launchEnemies,this);
};
    
Enemy.prototype = Object.create(Phaser.Group.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.launchEnemies = function () {
    this.forEach(function (enemy) {
        if (enemy.where.inCamera && enemy.alowRevive) {
            enemy.revive(1);
            enemy.alowRevive = false;
        }
    }, this);
    Mazed.game.time.events.add(Mazed.game.rnd.integerInRange(1000, 5000), this.launchEnemies, this);
};
