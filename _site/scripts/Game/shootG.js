//Maze generator algorithm
var ShootG = function (config) {
    this.SNen = config.Nen;
    this.ent = [0, 0]; this.exit = [0, 0];
    this.at = [];
    this.view = []; this.Rview = []; this.Fview = [];
    this.corners = []; this.Rcorners = []; this.Fcorner = [];
    this.nCols = config.nCols;
    this.nRows = config.nRows;
    this.nM = config.nM;
    this.ment = [0, 0];
    this.mexit = [0, 0];
    this.InitAngle = 0;
    this.EndAngle = 0;
    this.enemiesData = [];
}
ShootG.prototype.generate = function () {
    var n = this.nM, xx = 0, yy = 0, xi = this.nCols, yi = this.nRows, maze = [], visit = [];
    for (var i = 0; i < yi; i++) { maze.push([]); for (var j = 0; j < xi; j++) { maze[i].push(1); } } maze[yy][xx] = 0;
    for (var i = 0; i < yi; i++) { visit.push([]); for (var j = 0; j < xi; j++) { visit[i].push(1); } } visit[yy][xx] = 0;

    var thereismore = true, direc = [], cacheX = [], cacheY = [], idirec = 0;
    while (thereismore) {
        direc = [];
        if (xx - 2 >= 0) { if (visit[yy][xx - 2]) { direc.push(1); } }
        if (yy + 2 < xi) { if (visit[yy + 2][xx]) { direc.push(2); } }
        if (xx + 2 < yi) { if (visit[yy][xx + 2]) { direc.push(3); } }
        if (yy - 2 >= 0) { if (visit[yy - 2][xx]) { direc.push(4); } }

        if (direc.length === 0) {
            if (cacheX.length === 0) { thereismore = false; }
            else { xx = cacheX.pop(); yy = cacheY.pop(); }
        } else {
            cacheX.push(xx); cacheY.push(yy);
            idirec = direc[Math.round(Math.random() * (direc.length - 1))];
            if (idirec === 1) { maze[yy][xx - 1] = 0; xx = xx - 2; }
            if (idirec === 2) { maze[yy + 1][xx] = 0; yy = yy + 2; }
            if (idirec === 3) { maze[yy][xx + 1] = 0; xx = xx + 2; }
            if (idirec === 4) { maze[yy - 1][xx] = 0; yy = yy - 2; }
            visit[yy][xx] = 0; maze[yy][xx] = 0;
        }
    }

    var xf = n * xi, yf = n * yi;
    for (var i = 0; i < xf; i++) { this.at.push([]); for (var j = 0; j < yf; j++) { this.at[i].push(1); } }

    for (var i = 0; i < maze.length; i++) {
        for (var j = 0; j < maze[0].length; j++) {
            if (maze[i][j] === 0) {
                var Mt = []; for (var h = 0; h < n; h++) { Mt.push([]); for (var l = 0; l < n; l++) { Mt[h].push(0); } }
                var mi = Math.floor(0.1 * Mt.length), mf = Math.floor(0.2 * Mt.length)
                var doit = true;
                if (i + 1 < maze.length) { if (!maze[i + 1][j]) { doit = false; } }
                if (doit) {
                    for (var k = 0; k < Mt.length; k++) {
                        mi += Math.round(Math.random() * 2 - 1); if (mi < 0) { mi = 0; } if (mi > mf) { mi = mf; } for (var l = 0; l < mi; l++) { Mt[Mt.length - 1 - l][k] = 1; }
                    }
                }

                doit = true;
                if (i > 0) { if (!maze[i - 1][j]) { doit = false; } }
                if (doit) {
                    for (var k = 0; k < Mt.length; k++) {
                        mi += Math.round(Math.random() * 2 - 1); if (mi < 0) { mi = 0; } if (mi > mf) { mi = mf; } for (var l = 0; l < mi; l++) { Mt[l][k] = 1; }
                    }
                }

                doit = true;
                if (j > 0) { if (!maze[i][j - 1]) { doit = false; } }
                if (doit) {
                    for (var k = 0; k < Mt.length; k++) {
                        mi += Math.round(Math.random() * 2 - 1); if (mi < 0) { mi = 0; } if (mi > mf) { mi = mf; } for (var l = 0; l < mi; l++) { Mt[k][l] = 1; }
                    }
                }

                doit = true;
                if (j + 1 < maze.length) { if (!maze[i][j + 1]) { doit = false; } }
                if (doit) {
                    for (var k = 0; k < Mt.length; k++) {
                        mi += Math.round(Math.random() * 2 - 1); if (mi < 0) { mi = 0; } if (mi > mf) { mi = mf; } for (var l = 0; l < mi; l++) { Mt[k][Mt.length - 1 - l] = 1; }
                    }
                }
                    
                for (var k = 0; k < Mt.length; k++) {
                    for (var l = 0; l < Mt[0].length; l++) {
                        this.at[k + i * n][l + j * n] = Mt[k][l];
                    }
                }
            }
        }
    }

    this.nCols = this.at.length;
    this.nRows = this.at[0].length;
    var n = 3; this.setBorder(n);
    this.corners = [];
    this.Rcorners = [];
    this.Fcorners = [];
    this.Rview = [];
    this.Fview = [];
    for (var i = 0; i < this.at.length; i++) { this.corners.push([]); for (var j = 0; j < this.at[0].length; j++) { this.corners[i].push(0); } }
    for (var i = 0; i < this.at.length; i++) { this.Rview.push([]); for (var j = 0; j < this.at[0].length; j++) { this.Rview[i].push(0); } }

    this.rPortals(maze);

    this.initView();
    this.mTiles();

    this.mPortals(maze);

    this.enemyTiles(maze);
};

ShootG.prototype.rPortals = function (_maze) {
    var xi = _maze[0].length, yi = _maze.length;
    
    var xx = Math.round(Math.random() * (xi - 1));
    var yy = Math.round(Math.random() * (yi - 1));

    if (xx % 2 === 1) { xx++; } if (yy % 2 === 1) { yy++; }

    this.ment = [yy, xx];
    var vpathD = [];
    var thereismore = true, direc = [], cacheX = [], cacheY = [], idirec = 0, doCache = 0, L = 0;
    cacheX.push(xx); cacheY.push(yy);
    var maze = [];
    for (var i = 0; i < xi; i++) { maze.push([]); for (var j = 0; j < yi; j++) { maze[i].push(_maze[i][j]); } }
    while (thereismore) {
        direc = [];
        if (xx - 1 >= 0) { if (maze[yy][xx - 1] === 0) { direc.push(1); } }
        if (yy + 1 < xi) { if (maze[yy + 1][xx] === 0) { direc.push(2); } }
        if (xx + 1 < yi) { if (maze[yy][xx + 1] === 0) { direc.push(3); } }
        if (yy - 1 >= 0) { if (maze[yy - 1][xx] === 0) { direc.push(4); } }


        if (direc.length === 0) {
            if (doCache === 1) {
                var temp = [yy, xx, L];
                vpathD.push(temp);
            }
            L--;
            doCache++;
            if (cacheX.length === 0) { thereismore = false; }
            else { xx = cacheX.pop(); yy = cacheY.pop(); }
        } else {
            L++;
            doCache = 0;
            idirec = direc[Math.round(Math.random() * (direc.length - 1))];
            if (idirec === 1) { maze[yy][xx - 1] = 2; xx = xx - 1; }
            if (idirec === 2) { maze[yy + 1][xx] = 2; yy = yy + 1; }
            if (idirec === 3) { maze[yy][xx + 1] = 2; xx = xx + 1; }
            if (idirec === 4) { maze[yy - 1][xx] = 2; yy = yy - 1; }
            cacheX.push(xx); cacheY.push(yy);
        }
    }

    this.mexit = [vpathD[0][0], vpathD[0][1]];
    var j = vpathD[0][2];
    for (var i = 1; i < vpathD.length; i++) {
        if (vpathD[i][2] > j) {
            j = vpathD[i][2];
            this.mexit = [vpathD[i][0], vpathD[i][1]];
        }
    }
};

ShootG.prototype.setBorder = function (n) {
    for (var i = 0; i < this.nRows; i++) {
        for (var j = 0; j < n; j++) {
            this.at[i].push(1);
            this.at[i].push(1);
        }
    }
    for (var j = 0; j < n; j++) {
        this.at.push([]);
        for (var i = 0; i < this.at[0].length; i++) {
            this.at[this.at.length - 1].push(1);
        }
        this.at.push([]);
        for (var i = 0; i < this.at[0].length; i++) {
            this.at[this.at.length - 1].push(1);
        }
    }
    this.nCols += 2 * n;
    this.nRows += 2 * n;

    for (var i = this.nRows - 1 - n; i >= n; i--) {
        for (var j = this.nCols - 1 - n; j >= n; j--) {
            this.at[i][j] = this.at[i - n][j - n];
        }
    }
    for (var j = 0; j < n; j++) {
        for (var i = 0; i < this.at[0].length; i++) {
            this.at[j][i] = 1;
            this.at[this.at.length - 1 - j][i] = 1;
        }
        for (var i = 0; i < this.at.length; i++) {
            this.at[i][j] = 1;
            this.at[i][this.at[0].length - 1 - j] = 1;
        }
    }
}

ShootG.prototype.initView = function () {
    for (var i = 0; i < this.nRows; i++) {
        this.view.push([]);
        for (var j = 0; j < this.nCols; j++) {
            this.view[i].push(this.at[i][j]);
        }
    }
};

ShootG.prototype.mTiles = function () {
    var a, b, c, d, t = 1, tt;
    for (var i = 1; i < this.nRows - 1; i++) {
        for (var j = 1; j < this.nCols - 1; j++) {
            var temp = 1;
            if (this.at[i][j] === 1) {
                temp += 1 * (1 - this.at[i - 1][j]);
                temp += 2 * (1 - this.at[i][j + 1]);
                temp += 4 * (1 - this.at[i + 1][j]);
                temp += 8 * (1 - this.at[i][j - 1]);

                this.view[i][j] = temp;

                if ((1 - this.at[i - 1][j - 1]) * this.at[i][j - 1] * this.at[i - 1][j] ||
                    (1 - this.at[i - 1][j + 1]) * this.at[i][j + 1] * this.at[i - 1][j] ||
                    (1 - this.at[i + 1][j + 1]) * this.at[i][j + 1] * this.at[i + 1][j] ||
                    (1 - this.at[i + 1][j - 1]) * this.at[i][j - 1] * this.at[i + 1][j]) {
                    temp = 16;
                    temp += 1 * (1 - this.at[i - 1][j - 1]) * this.at[i][j - 1] * this.at[i - 1][j];
                    temp += 2 * (1 - this.at[i - 1][j + 1]) * this.at[i][j + 1] * this.at[i - 1][j];
                    temp += 4 * (1 - this.at[i + 1][j + 1]) * this.at[i][j + 1] * this.at[i + 1][j];
                    temp += 8 * (1 - this.at[i + 1][j - 1]) * this.at[i][j - 1] * this.at[i + 1][j];

                    this.corners[i][j] = temp;
                }
            }
        }
    }
};

ShootG.prototype.mPortals = function (_maze) {
    this.ent = [this.nM * this.ment[0] + 2 + Math.round(this.nM / 2), this.nM * this.ment[1] + 2 + Math.round(this.nM / 2)];
    this.view[this.ent[0]][this.ent[1]] = 32;

    this.exit = [this.nM * this.mexit[0] + 2 + Math.round(this.nM / 2), this.nM * this.mexit[1] + 2 + Math.round(this.nM / 2)];
    var k = [], rotation = 0;
    if (this.mexit[0] - 1 >= 0) {
        if (!_maze[this.mexit[0] - 1][this.mexit[1]]) {
            k = [this.nM * this.mexit[0] + 3, this.nM * this.mexit[0] + 4, this.nM * this.mexit[1] + 3, this.nM * this.mexit[1] + 3 + this.nM];
            rotation = Math.PI;
        }
    }

    if (this.mexit[1] + 1 < _maze[0].length) {
        if (!_maze[this.mexit[0]][this.mexit[1] + 1]) {
            k = [this.nM * this.mexit[0] + 3, this.nM * this.mexit[0] + 3 + this.nM, this.nM * this.mexit[1] + 2 + this.nM, this.nM * this.mexit[1] + 3 + this.nM];
            rotation = 3 * Math.PI / 2;
        }
    }
    if (this.mexit[0] + 1 < _maze.length) {
        if (!_maze[this.mexit[0] + 1][this.mexit[1]]) {
            k = [this.nM * this.mexit[0] + 2 + this.nM, this.nM * this.mexit[0] + 3 + this.nM, this.nM * this.mexit[1] + 3, this.nM * this.mexit[1] + 3 + this.nM];
            rotation = 0;
        }
    }
    if (this.mexit[1] - 1 >= 0) {
        if (!_maze[this.mexit[0]][this.mexit[1] - 1]) {
            k = [this.nM * this.mexit[0] + 3, this.nM * this.mexit[0] + 3 + this.nM, this.nM * this.mexit[1] + 3, this.nM * this.mexit[1] + 4];
            rotation = Math.PI/2;
        }
    }
    
    for (var i = this.nM * this.mexit[0] + 3; i < this.nM * this.mexit[0] + 3 + this.nM; i++) {
        for (var j = this.nM * this.mexit[1] + 3; j < this.nM * this.mexit[1] + 3 + this.nM; j++) {
            if (this.at[i][j] === 0) {
                this.view[i][j] = 34;
            }
        }
    }

    for (var i = k[0]; i < k[1]; i++) {
        for (var j = k[2]; j < k[3]; j++) {
            if (this.at[i][j] === 0) {
                this.view[i][j] = 35;
                this.Rview[i][j] = rotation;
            }
        }
    }
};

ShootG.prototype.enemyTiles = function (_maze) {
    this.enemiesData = [];
    
    var mu = this.nM;
    var nu = Math.round(this.nM / 2) + 3 - 1;
    
    for (var i = 0; i < _maze.length; i++) {
        for (var j = 0; j < _maze[0].length; j++) {
            if (_maze[i][j] === 0 && (i !== this.ment[0] || j !== this.ment[1]) && (i !== this.mexit[0] || j !== this.mexit[1])) {
                this.enemiesData.push([
                    i * mu + nu + Mazed.game.rnd.integerInRange(-1, 1),
                    j * mu + nu + Mazed.game.rnd.integerInRange(-1, 1),
                    Mazed.game.rnd.integerInRange(1, this.SNen), , null]);
            }
        }
    }//*/
};
