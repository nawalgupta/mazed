var Mazed = Mazed || {};

Mazed.setupBackground = function (i) {
    var x = Mazed.width, y = Mazed.height;
    var bg = Mazed.game.add.tileSprite(0, 0, x, y, "background" + i); //Background
    bg.fixedToCamera = true; bg.tilePosition.set(-16, -16);
    return bg;
};

Mazed.setupLogo = function (xx, i) {
    var name = Mazed.game.add.sprite(Mazed.width * 2.5 / 4, Mazed.height / 2, 'mazedname' + i); name.anchor.setTo(0.5, 0.5); name.smoothed = false;
    name.scale.set(2);
    name.animations.add('logo0', [0, 1, 1, 1, 1, 2, 3, 4, 5, 6, 6, 7, 8, 8, 8, 8, 8, 8, 8, 8], 8).onComplete.add(function () {
        this.game.time.events.add(1000 + Mazed.game.rnd.integerInRange(0, 1500), function () {
            this.animations.play('logo' + Mazed.game.rnd.integerInRange(0, 2));
        }, name);
    }, this);
    name.animations.add('logo1', [9, 10, 10, 10, 10, 11, 12, 13, 14, 15, 15, 16, 17, 8, 8, 8, 8, 8, 8, 8, 8], 8).onComplete.add(function () {
        this.game.time.events.add(1000 + Mazed.game.rnd.integerInRange(0, 1500), function () {
            this.animations.play('logo' + Mazed.game.rnd.integerInRange(0, 2));
        }, name);
    }, this);
    name.animations.add('logo2', [18, 19, 19, 19, 19, 20, 21, 22, 23, 24, 25, 25, 26, 8, 8, 8, 8, 8, 8, 8, 8], 8).onComplete.add(function () {
        this.game.time.events.add(1000 + Mazed.game.rnd.integerInRange(0, 1500), function () {
            this.animations.play('logo' + Mazed.game.rnd.integerInRange(0, 2));
        }, name);
    }, this);
    name.animations.play('logo' + i);

    for (var j = 0; j <= Math.round(Mazed.width / 80); j++) {
        var bg3 = Mazed.game.add.image(80 * j, 0, 'panel', 2); bg3.anchor.setTo(0.5, 0); bg3.fixedToCamera = true; bg3.smoothed = true;
    }
    
    for (var j = 0; j <= Math.round(Mazed.width / 80); j++) {
        var bg3 = Mazed.game.add.image(80 * j, Mazed.height, 'panel', 2); bg3.anchor.setTo(0.5, 1); bg3.fixedToCamera = true; bg3.smoothed = true;
    }

    Mazed.helptext = Mazed.game.add.bitmapText(Mazed.width / 2, 27, 'jmfont', " ", 32);
    Mazed.helptext.smoothed = true; Mazed.helptext.anchor.setTo(0.5); Mazed.helptext.fixedToCamera = true;
    
    Mazed.explaintext = Mazed.game.add.bitmapText(Mazed.width / 2, Mazed.height - 22, 'jmfont', " ", 32);
    Mazed.explaintext.smoothed = true; Mazed.explaintext.anchor.setTo(0.5); Mazed.explaintext.fixedToCamera = true;
};

Mazed.setupMusic = function (i) {
    Mazed.music = Mazed.game.add.audio('music' + i, Mazed.vol, true);
    Mazed.music.play();
    Mazed.game.state.onShutDownCallback = function () { Mazed.music.stop(); };
};

Mazed.addButton = function (x, y, key, f, context, ff, fi, ang, overf) {
    var b = Mazed.game.add.button(x, y, key, f, context, ff, fi, ff, fi);
    if (overf !== null) { b.onInputOver.add(overf); b.onInputOut.add(Mazed.cleanText); }
    b.onInputDown.add(function () { Mazed.effects[8].play();}, this);
    b.anchor.setTo(0.5, 0.5); b.fixedToCamera = true; b.smoothed = true; b.inputEnabled = false;
    Mazed.game.time.events.add(300, function () { this.inputEnabled = true; }, b);
    return b;
},

Mazed.cleanText = function () {
    Mazed.explaintext.setText(" ");
},

Mazed.addRectangle = function (color, x, y, w, h) {
    var rect = Mazed.game.add.graphics(0, 0);
    rect.fixedToCamera = true;
    rect.beginFill(color, 1);
    rect.drawRect(x, y, w, h);
    rect.endFill();
    return rect;
};

Mazed.fadeIn = function (length, color, delay) {
    if (delay === undefined) delay = 0;
    if (color === undefined) color = 0x000000;
    if (length === undefined) length = 500;

    var curtain = Mazed.addRectangle(color, 0, 0, Mazed.width, Mazed.height); curtain.alpha = 1;
    Mazed.game.add.tween(curtain).to({ alpha: 0 }, length, Phaser.Easing.Quadratic.In, true, delay);
};

Mazed.fadeOut = function (length, color, delay) {
    if (delay === undefined) delay = 0;
    if (color === undefined) color = 0x000000;
    if (length === undefined) length = 500;

    var curtain = Mazed.addRectangle(color, 0, 0, Mazed.width, Mazed.height); curtain.alpha = 0;
    Mazed.game.add.tween(curtain).to({ alpha: 1 }, length, Phaser.Easing.Quadratic.In, true, delay);
};
