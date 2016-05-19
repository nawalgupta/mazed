var Hud = function (game) {
    this.game = game;
    this.messages = [];
    this.mFree = true;
    this.hud = this.game.add.group();
    this.hud.fixedToCamera = true;
    this.hud.sh = [null, null];
    this.messageTimer = 0;
    this.spb = 0.1;
    this.spx = [0, 1];
    this.spy = [0, 0];
    this.sp = [
        [50, 50],
        [Mazed.width - 50, 50]
    ];
    this.ELT = new Array(4);
};

Hud.prototype.addScoreBoard = function () {
    // Bitmap for drawing on the HUD
    this.hud.overlayBitmap = this.game.add.bitmapData(Mazed.width, Mazed.height);
    this.hud.overlaySprite = this.game.add.sprite(0, 0, this.hud.overlayBitmap, 0, this.hud);
    this.hud.alpha = 1;

    for (var i = 0; i <= Math.round(Mazed.width / 80) ; i++) {
        var bg3 = this.game.add.image(80 * i, 0, 'panel', 2, this.hud); bg3.smoothed = true; //bg3.alpha = 0.75;
    }

    this.hud.bg1 = this.game.add.image(this.sp[1][0], this.sp[1][1], 'controller', 2, this.hud);
    this.hud.bg1.anchor.set(0.5);
    this.hud.bg2 = this.game.add.image(this.sp[0][0], this.sp[0][1], 'controller', 2, this.hud);
    this.hud.bg2.anchor.set(0.5);

    this.hud.sh[0] = this.game.add.bitmapText(this.sp[1][0], this.sp[1][1] + 19, 'jmfont', '32', 32, this.hud);
    this.hud.sh[1] = this.game.add.bitmapText(this.sp[0][0], this.sp[0][1] + 19, 'jmfont', 'LVL', 32, this.hud);

    for (var i = 0, w = Mazed.width - 80, h = Mazed.height - 80; i < 2; i++) {
        this.hud.sh[i].anchor.set(0.5, 0.5);
        this.hud.sh[i].smoothed = true;
        this.hud.sh[i].scale.set(1);
    }
};

Hud.prototype.updateHud = function () {
};

Hud.prototype.nextLevel = function () {
};

Hud.prototype.addMessage = function (message) {
    this.messages.push(message);
    Mazed.game.time.events.add(100, function () { this.updateMessage(); }, this);
};

Hud.prototype.updateMessage = function () {
    if (this.messages.length > 0) {
        this.mFree = false;
        var m = this.messages.shift();
        var t = 1500;
        var text = Mazed.game.add.bitmapText(Mazed.width * 2, 27, 'jmfont', " " + m + " ", 32);
        text.smoothed = true; text.anchor.set(0.5); text.fixedToCamera = true;
        var tween = Mazed.game.add.tween(text.cameraOffset)
            .to({ x: Mazed.width / 2 }, 1000, Phaser.Easing.Linear.None, false, 100)
            .to({ x: -2 * Mazed.width }, 1000, Phaser.Easing.Linear.None, false, t);
        tween.onComplete.add(function () {
            text.destroy(); this.updateMessage(); this.mFree = true;
        }, this);
        tween.start();
    }
};
