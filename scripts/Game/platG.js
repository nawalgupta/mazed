//Maze generator algorithm
var PlatG = function (config) {
    this.ent = [0, 2]; this.exit = [0, 0];
    this.at = []; this.view = []; this.corners = [];
    this.nCols = config.nCols;
    this.nRows = config.nRows;
    this.nM = config.nM;
}

PlatG.prototype.generate = function () {
    var n = this.nM, xx = 0, yy = 0, xi = this.nCols, yi = this.nRows, maze = [], visit = [], cnc;
    for (var i = 0; i < yi; i++) { maze.push([]); for (var j = 0; j < xi; j++) { maze[i].push(1); } } maze[yy][xx] = 0;
    for (var i = 0; i < yi; i++) { visit.push([]); for (var j = 0; j < xi; j++) { visit[i].push(1); } } visit[yy][xx] = 0;
    //maze = new Array(yi); for (var i = 0; i < xi; i++) { maze[i] = new Array(xi).fill(1); } maze[yy][xx] = 0;
    //visit = new Array(yi); for (var i = 0; i < xi; i++) { visit[i] = new Array(xi).fill(1); } visit[yy][xx] = 0;

    cnc = new Array(yi); for (var i = 0; i < xi; i++) { cnc[i] = new Array(xi); }
    for (var i = 0; i < cnc.length; i++) {
        for (var j = 0; j < cnc[i].length; j++) {
            cnc[i][j] = [0, 0, 0, 0];

            if (j > 0) {
                if (i > 0) {
                    for (var v = 0; v < 4; v++) { cnc[i][j][v] = Math.round(2 + Math.random() * (n - 5)); }
                    cnc[i][j][2] = cnc[i][j - 1][3];
                    cnc[i][j][0] = cnc[i - 1][j][1];
                } else {
                    for (var v = 0; v < 4; v++) { cnc[i][j][v] = Math.round(2 + Math.random() * (n - 5)); }
                    cnc[i][j][2] = cnc[i][j - 1][3];
                }
            } else if (i > 0) {
                for (var v = 0; v < 4; v++) { cnc[i][j][v] = Math.round(2 + Math.random() * (n - 5)); }
                cnc[i][j][0] = cnc[i - 1][j][1];
            } else if (i === 0 && j === 0) {
                for (var v = 0; v < 4; v++) { cnc[i][j][v] = Math.round(2 + Math.random() * (n - 5)); }
            }
        }
    }


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

    var xf = n * xi, yf = n * yi, nn = 0;
    for (var i = 0; i < xf; i++) { this.at.push([]); for (var j = 0; j < yf; j++) { this.at[i].push(1); } }
    //this.at = new Array(xf); for (var i = 0; i < xf; i++) { this.at[i] = new Array(yf).fill(1); }

    for (var i = 0; i < maze.length; i++) {
        for (var j = 0; j < maze[0].length; j++) {
            if (maze[i][j] === 0) {
                var Mt = [];
                for (var h = 0; h < n; h++) { Mt.push([]); for (var l = 0; l < n; l++) { Mt[h].push(1); } }
                //var Mt = new Array(n); for (var h = 0; h < n; h++) { Mt[h] = new Array(n).fill(1); } 

                var t = 20, xt = new Array(8), yt = new Array(8), mxt = new Array(8), myt = new Array(8);

                xt = [cnc[i][j][0], cnc[i][j][0], cnc[i][j][1], cnc[i][j][1], 0, 0, n - 1, n - 1];
                yt = [0, 0, n - 1, n - 1, cnc[i][j][2], cnc[i][j][2], cnc[i][j][3], cnc[i][j][3]];
                mxt = [-1, 1, -1, 1, 1, 1, -1, -1];
                myt = [1, 1, -1, -1, -1, 1, -1, 1];

                for (var v = 0; v < xt.length; v++) {
                    t = 20;
                    while (t > 0) {
                        var rx = Math.round(Math.random() * 1), ry = Math.round(Math.random() * 1);
                        xt[v] += mxt[v] * rx;
                        yt[v] += myt[v] * ry;
                        if (xt[v] >= Mt.length || yt[v] >= Mt[0].length || xt[v] < 0 || yt[v] < 0) { break; }
                        Mt[yt[v]][xt[v]] = 0;
                        t--;
                    }
                }

                Mt[0][cnc[i][j][0]] = 0;
                Mt[n - 1][cnc[i][j][1]] = 0;
                Mt[cnc[i][j][2]][0] = 0;
                Mt[cnc[i][j][3]][n - 1] = 0;

                for (var k = 0; k < Mt.length; k++) {
                    for (var l = 0; l < Mt[0].length; l++) {
                        this.at[k + i * n][l + j * n] = Mt[k][l];
                    }
                }
            }
        }
    }
    for (var u = 0; u < this.at.length - 1; u++) {
        for (var v = 0; v < this.at[0].length - 1; v++) {
            if (this.at[u][v] === 1) {
                if (this.at[u][v] === 1 && this.at[u + 1][v] === 0 && this.at[u][v + 1] === 0 && this.at[u + 1][v + 1] === 1) {
                    this.at[u][v] = 0;
                    var temp = Math.round(Math.random() * 1);
                    if (temp === 1) { (this.at[u][v] = 0); } else { this.at[u + 1][v + 1] = 0; }
                }
            } else {
                if (this.at[u][v] === 0 && this.at[u + 1][v] === 1 && this.at[u][v + 1] === 1 && this.at[u + 1][v + 1] === 0) {
                    var temp = Math.round(Math.random() * 1);
                    if (temp === 1) { (this.at[u + 1][v] = 0); } else { this.at[u][v + 1] = 0; }
                }
            }
        }
    }
    this.nCols = this.at.length;
    this.nRows = this.at[0].length;
    var n = 2; this.ent = [n, n];
    this.setBorder(n);
    for (var i = 0; i < this.at.length; i++) { this.corners.push([]); for (var j = 0; j < this.at[0].length; j++) { this.corners[i].push(0); } }
    //this.corners = new Array(this.nRows); for (var i = 0; i < this.corners.length; i++) { this.corners[i] = new Array(this.nCols).fill(0); }
    this.mPortals(this.ent[1]);
    this.initView();
    this.mTiles();
}

PlatG.prototype.setBorder = function (n) {
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

PlatG.prototype.initView = function () {
    for (var i = 0; i < this.nRows; i++) {
        this.view.push([]);
        for (var j = 0; j < this.nCols; j++) {
            this.view[i].push(this.at[i][j]);
        }
    }
};

PlatG.prototype.mTiles = function () {
    var a, b, c, d, t = 1,tt;
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
                    (1 - this.at[i + 1][j - 1]) * this.at[i][j - 1] * this.at[i + 1][j] ) {
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

PlatG.prototype.mPortals = function (n) {
    var m = 0;
    while (true) {
        if (this.at[m][n] === 0) { break; }
        this.at[m][n] = 0; m++;
    };

    this.corners[0][n - 1] = 3;
    this.corners[0][n + 1] = 9;

    //this.corners[0][n - 1] = 20;
    //this.at[0][n] = 32;
    //this.corners[0][n + 1] = 24;

    m = this.at.length - 1;
    n = this.at[0].length - n - 1;
    
    while (true) {
        if (this.at[m][n] === 0) { break; }
        this.at[m][n] = 0; m--;
    };
    this.corners[this.at.length - 1][n - 1] = 3;
    this.at[this.at.length - 1][n] = 32;
    this.exit = [this.at.length - 1, n];
    this.corners[this.at.length - 1][n + 1] = 9;

    //this.corners[this.at.length - 1][n - 1] = 18;
    //this.at[this.at.length - 1][n] = 33;
    //this.corners[this.at.length - 1][n + 1] = 17;
};