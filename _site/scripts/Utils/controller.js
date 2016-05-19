var GC = function (game) {
    this.game = game;
   
    this.Up = false;
    this.Down = false;
    this.Left = false;
    this.Right = false;

    if (Mazed.game.device.desktop) {
        this.W = Mazed.game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.W.onDown.add(function () { this.Up = true; }, this);
        this.W.onUp.add(function () { this.Up = false; }, this);
        this.S = Mazed.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.S.onDown.add(function () { this.Down = true; }, this);
        this.S.onUp.add(function () { this.Down = false; }, this);
        this.A = Mazed.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.A.onDown.add(function () { this.Left = true; }, this);
        this.A.onUp.add(function () { this.Left = false; }, this);
        this.D = Mazed.game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.D.onDown.add(function () { this.Right = true; }, this);
        this.D.onUp.add(function () { this.Right = false; }, this);
    } else {
        this.control = this.game.add.group();
        this.control.fixedToCamera = true;
        this.control.alpha = 0.5

        this.cNL = [null, null, null, null];
        this.createVGC();
    }
};

GC.prototype.createVGC = function () {
    var wc = 100, hc = 100;
    var x = Mazed.width, y = Mazed.height - hc/2;
    var b = this.addButton(x - wc / 2, y - hc, 1, 0, 90);
    b.events.onInputDown.add(function () { this.Up = true }, this);
    b.events.onInputUp.add(function () { this.Up = false }, this);

    b = this.addButton(x - wc / 2, y, 1, 0, 270);
    b.events.onInputDown.add(function () { this.Down = true }, this);
    b.events.onInputUp.add(function () { this.Down = false }, this);

    b = this.addButton(wc / 2, y, 1, 0, 0);
    b.events.onInputDown.add(function () { this.Left = true }, this);
    b.events.onInputUp.add(function () { this.Left = false }, this);

    b = this.addButton(wc * 3 / 2, y, 1, 0, 180);
    b.events.onInputDown.add(function () { this.Right = true }, this);
    b.events.onInputUp.add(function () { this.Right = false }, this);
};

GC.prototype.nextLevel = function () {
};

GC.prototype.addButton = function (x, y, fi, ff, ang) {
    var b = Mazed.game.add.button(x, y, 'controller', null, this, fi, ff, fi, ff, this.control); b.anchor.setTo(0.5, 0.5); b.angle = ang;
    return b;
};