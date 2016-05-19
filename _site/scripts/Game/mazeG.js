//Maze generator algorithm
var MazeG = function (config) {
    this.ent = [0,0];
    this.exit = [0,0];
    this.at = [];
    this.view = [];
    this.nCols = config.nCols;
    this.nRows = config.nRows;
}

MazeG.prototype.generate = function () {

    //Initializing all the matrix for Maze object
    var visit = []; //Matrix for Maze gereration algorithm, to indentify which point was visit or not
    this.view = [];
    this.at = [];

    for (var i = 0; i < this.nRows; i++) { //Create Matrix for the Maze itself storage
        this.at.push([]);
        visit.push([]);
        for (var j = 0; j < this.nCols; j++) {
            this.at[i].push(3); //Set all to one(wall)
            visit[i].push(this.at[i][j]); //Set it to the same values of the Maze matrix(need to be visited)
        }
    }

    //Temp variables for use on the Maze algorithm below
    var yy = 0, xx = 0;
    this.at[yy][xx] = 0; //Set it to zero(floor)
    visit[yy][xx] = 0; //Set it to zero(floor)
    var thereismore = true; //To define if there is still more points to visit the algorithm will keep goind
    var cacheX = [],cacheY = []; //Store the way the algorithm is going
    var direc = []; //All the directions availables
    var idirec = 0; //The direction that the algorithm will go from the ones available

    while (thereismore) { //Maze algorithm
        direc = [];
        if (xx - 2 >= 0 && visit[yy][xx - 2]) { direc.push(1); }
        if (yy + 2 < this.nRows && visit[yy + 2][xx]) { direc.push(2); }
        if (xx + 2 < this.nCols && visit[yy][xx + 2]) { direc.push(3); }
        if (yy - 2 >= 0 && visit[yy - 2][xx]) { direc.push(4); }

        if (direc.length === 0) {
            if (cacheX.length === 0) { thereismore = false; }
            else { xx = cacheX.pop(); yy = cacheY.pop(); }
        } else {
            cacheX.push(xx); cacheY.push(yy);
            idirec = direc[Math.round(Math.random() * (direc.length - 1))];
            if (idirec === 1) { this.at[yy][xx - 1] = 0; xx = xx - 2; }
            if (idirec === 2) { this.at[yy + 1][xx] = 0; yy = yy + 2; }
            if (idirec === 3) { this.at[yy][xx + 1] = 0; xx = xx + 2; }
            if (idirec === 4) { this.at[yy - 1][xx] = 0; yy = yy - 2; }
            visit[yy][xx] = 0; this.at[yy][xx] = 0;
        }
    }

    var nborder = 1;
    this.setBorder(nborder);
    this.initView();
    this.rPortals();
    this.at[this.ent[0]][this.ent[1]] = 1;
    this.at[this.exit[0]][this.exit[1]] = 2;
    this.initLights(this.ent[1], this.ent[0]);
}
MazeG.prototype.rPortals = function () {
    var xi = this.nCols, yi = this.nRows;
    var xx = Math.round(Math.random() * (xi - 2)), yy = Math.round(Math.random() * (yi - 2));
    if (xx % 2 === 0) { xx++; } if (yy % 2 === 0) { yy++; }
    this.ent = [yy, xx];
    var vpathD = [];
    var thereismore = true, direc = [], cacheX = [], cacheY = [], idirec = 0, doCache = 0, L = 0;
    cacheX.push(xx); cacheY.push(yy);
    var maze = [];
    for (var i = 0; i < this.nRows; i++) { maze.push([]); for (var j = 0; j < this.nCols; j++) { maze[i].push(this.at[i][j]); } }
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

    this.exit = [vpathD[0][0], vpathD[0][1]];
    var j = vpathD[0][2];
    for (var i = 1; i < vpathD.length; i++) {
        if (vpathD[i][2] > j) {
            j = vpathD[i][2];
            this.exit = [vpathD[i][0], vpathD[i][1]];
        }
    }


};
MazeG.prototype.setBorder = function (n) {
    for (var i = 0; i < this.nRows; i++) {
        for (var j = 0; j < n; j++) {
            this.at[i].push(3);
            this.at[i].push(3);
        }
    }
    for (var j = 0; j < n; j++) {
        this.at.push([]);
        for (var i = 0; i < this.at[0].length; i++) {
            this.at[this.at.length - 1].push(3);
        }
        this.at.push([]);
        for (var i = 0; i < this.at[0].length; i++) {
            this.at[this.at.length - 1].push(3);
        }
    }
    this.nCols += 2 * n;
    this.nRows += 2 * n;

    for (var i = this.nRows - 1 - n; i >= n; i--) {
        for (var j = this.nCols - 1 - n; j >= n; j--) {
            this.at[i][j] = this.at[i-n][j-n];
        }
    }
    for (var j = 0; j < n; j++) {
        for (var i = 0; i < this.at[0].length; i++) {
            this.at[j][i] = 3;
            this.at[this.at.length - 1 - j][i] = 3;
        }
        for (var i = 0; i < this.at.length; i++) {
            this.at[i][j] = 3;
            this.at[i][this.at[0].length - 1 - j] = 3;
        }
    }
}

MazeG.prototype.initView = function () {
    for (var i = 0; i < this.nRows; i++) {
        this.view.push([]);
        for (var j = 0; j < this.nCols; j++) {
            this.view[i].push(3);
        }
    }
}

MazeG.prototype.initLights = function (x, y) {
    //reset view matrix
    for (var i = 0; i < this.nRows; i++) {
        for (var j = 0; j < this.nCols; j++) { this.view[i][j] = 3; }
    }

    /*
    for (var i = 0; i < this.nRows; i++) {
        this.view[i].fill(3);
    }*/
    var m = 32;
    var px = x;
    var py = y;
    var isItDark = false;
    var c = 0;
    this.view[py][px] = this.at[py][px];

    //player position
    this.view[py - 1][px - 1] = 4;
    this.view[py - 1][px + 1] = 5;
    this.view[py + 1][px - 1] = 6;
    this.view[py + 1][px + 1] = 7;
    this.view[py][px - 1] = 8;
    this.view[py][px + 1] = 9;
    this.view[py + 1][px] = 10;
    this.view[py - 1][px] = 11;

    c = py - 1;
    var l = 4;
    if (this.at[c][px] <= 2) {
        while (!isItDark) {
            if (this.at[c][px] >= 3) { isItDark = true; }
            if (c > py - l) {
                if (!isItDark) {
                    this.view[c][px] = this.at[c][px];
                    if (this.at[c][px - 1] <= 2) {
                        this.view[c][px - 1] = (this.at[c][px - 1] > 0) ? this.at[c][px - 1] : 23;
                        this.view[c - 1][px - 1] = (this.view[c - 1][px - 1] <= 11) ? 12 : 16;
                        this.view[c + 1][px - 1] = (this.view[c + 1][px - 1] <= 11) ? 14 : 16;
                    } else {
                        this.view[c][px - 1] = (this.view[c][px - 1] <= 7) ? 8 : 12;
                    }
                    if (this.at[c][px + 1] <= 2) {
                        this.view[c][px + 1] = (this.at[c][px + 1] > 0) ? this.at[c][px + 1] : 22;
                        this.view[c - 1][px + 1] = (this.view[c - 1][px + 1] <= 11) ? 13 : 17;
                        this.view[c + 1][px + 1] = (this.view[c + 1][px + 1] <= 11) ? 15 : 17;
                    } else {
                        this.view[c][px + 1] = (this.view[c][px + 1] <= 7) ? 9 : 13;
                    }
                } else {
                    this.view[c][px] = 11;
                    this.view[c][px - 1] = (this.view[c][px - 1] === 3) ? 4 : 11;
                    this.view[c][px + 1] = (this.view[c][px + 1] === 3) ? 5 : 11;
                }
                c--;
            } else {
                isItDark = true;
                if (this.at[c][px] <= 2) {
                    this.view[c][px - 1] = (this.at[c + 1][px - 1] === 0) ? 12 : 8;
                    this.view[c][px] = 20;
                    this.view[c][px + 1] = (this.at[c + 1][px + 1] === 0) ? 13 : 9;
                } else if (this.at[c + 1][px] <= 2) {
                    this.view[c][px - 1] = (this.at[c + 1][px - 1] === 0) ? 11 : 4;
                    this.view[c][px] = 11;
                    this.view[c][px + 1] = (this.at[c + 1][px + 1] === 0) ? 11 : 5;

                }
            }
        }; isItDark = false;
    }

    c = py + 1;
    if (this.at[c][px] <= 2) {
        while (!isItDark) {
            if (this.at[c][px] >= 3) { isItDark = true; }
            if (c < py + l) {
                if (!isItDark) {
                    this.view[c][px] = this.at[c][px];
                    if (this.at[c][px - 1] <= 2) {
                        this.view[c][px - 1] = (this.at[c][px - 1] > 0) ? this.at[c][px - 1] : 23;
                        this.view[c - 1][px - 1] = (this.view[c - 1][px - 1] <= 11) ? 12 : 16;
                        this.view[c + 1][px - 1] = (this.view[c + 1][px - 1] <= 11) ? 14 : 16;
                    } else {
                        this.view[c][px - 1] = (this.view[c][px - 1] <= 7) ? 8 : 14;
                    }
                    if (this.at[c][px + 1] <= 2) {
                        this.view[c][px + 1] = (this.at[c][px + 1] > 0) ? this.at[c][px + 1] : 22;
                        this.view[c - 1][px + 1] = (this.view[c - 1][px + 1] <= 11) ? 13 : 17;
                        this.view[c + 1][px + 1] = (this.view[c + 1][px + 1] <= 11) ? 15 : 17;
                    } else {
                        this.view[c][px + 1] = (this.view[c][px + 1] <= 7) ? 9 : 15;
                    }
                } else {
                    this.view[c][px] = 10;
                    this.view[c][px - 1] = (this.view[c][px - 1] === 3) ? 6 : 10;
                    this.view[c][px + 1] = (this.view[c][px + 1] === 3) ? 7 : 10;
                }
                c++;
            } else {
                isItDark = true;
                if (this.at[c][px] <= 2) {
                    this.view[c][px - 1] = (this.at[c - 1][px - 1] === 0) ? 14 : 8;
                    this.view[c][px] = 21;
                    this.view[c][px + 1] = (this.at[c - 1][px + 1] === 0) ? 15 : 9;
                } else if (this.at[c - 1][px] <= 2) {
                    this.view[c][px - 1] = (this.at[c - 1][px - 1] === 0) ? 10 : 6;
                    this.view[c][px] = 10;
                    this.view[c][px + 1] = (this.at[c - 1][px + 1] === 0) ? 10 : 7;

                }
            }
        }; isItDark = false;
    }

    c = px + 1;
    if (this.at[py][c] <= 2) {
        while (!isItDark) {
            if (this.at[py][c] >= 3) { isItDark = true; }
            if (c < px + l) {
                if (!isItDark) {
                    this.view[py][c] = this.at[py][c];
                    if (this.at[py - 1][c] <= 2) {
                        this.view[py - 1][c] = (this.at[py - 1][c] > 0) ? this.at[py - 1][c] : 20;
                        this.view[py - 1][c - 1] = (this.view[py - 1][c - 1] <= 11) ? 12 : 19;
                        this.view[py - 1][c + 1] = (this.view[py - 1][c + 1] <= 11) ? 13 : 19;
                    } else {
                        this.view[py - 1][c] = (this.view[py - 1][c] === 15) ? 17 : ((this.view[py - 1][c] <= 7) ? 11 : 13);
                    }
                    if (this.at[py + 1][c] <= 2) {
                        this.view[py + 1][c] = (this.at[py + 1][c] > 0) ? this.at[py + 1][c] : 21;
                        this.view[py + 1][c - 1] = (this.view[py + 1][c - 1] <= 11) ? 14 : 18;
                        this.view[py + 1][c + 1] = (this.view[py + 1][c + 1] <= 11) ? 15 : 18;
                    } else {
                        this.view[py + 1][c] = (this.view[py + 1][c] === 13) ? 17 : ((this.view[py + 1][c] <= 7) ? 10 : 15);
                    }
                } else {
                    this.view[py][c] = 9;
                    this.view[py - 1][c] = (this.view[py - 1][c] <= 5) ? 5 : 9;
                    this.view[py + 1][c] = (this.view[py + 1][c] <= 7) ? 7 : 9;
                }
                c++;
            } else {
                isItDark = true;
                if (this.at[py][c] <= 2) {
                    this.view[py - 1][c] = (this.at[py - 1][c - 1] === 0) ? 13 : 11;
                    this.view[py][c] = 22;
                    this.view[py + 1][c] = (this.at[py + 1][c - 1] === 0) ? 15 : 10;
                } else if (this.at[py][c - 1] <= 2) {
                    this.view[py - 1][c] = (this.at[py - 1][c - 1] === 0) ? 9 : 5;
                    this.view[py][c] = 9;
                    this.view[py + 1][c] = (this.at[py + 1][c - 1] === 0) ? 9 : 7;
                }
            }
        }; isItDark = false;
    }

    c = px - 1;
    if (this.at[py][c] <= 2) {
        while (!isItDark) {
            if (this.at[py][c] >= 3) { isItDark = true; }
            if (c > px - l) {
                if (!isItDark) {
                    this.view[py][c] = this.at[py][c];
                    if (this.at[py - 1][c] <= 2) {
                        this.view[py - 1][c] = (this.at[py - 1][c] > 0) ? this.at[py - 1][c] : 20;
                        this.view[py - 1][c - 1] = (this.view[py - 1][c - 1] <= 11) ? 12 : 19;
                        this.view[py - 1][c + 1] = (this.view[py - 1][c + 1] <= 11) ? 13 : 19;
                    } else {
                        this.view[py - 1][c] = (this.view[py - 1][c] === 14) ? 16 : ((this.view[py - 1][c] <= 7) ? 11 : 12);
                    }
                    if (this.at[py + 1][c] <= 2) {
                        this.view[py + 1][c] = (this.at[py + 1][c] > 0) ? this.at[py + 1][c] : 21;
                        this.view[py + 1][c - 1] = (this.view[py + 1][c - 1] <= 11) ? 14 : 18;
                        this.view[py + 1][c + 1] = (this.view[py + 1][c + 1] <= 11) ? 15 : 18;
                    } else {
                        this.view[py + 1][c] = (this.view[py + 1][c] === 12) ? 16 : ((this.view[py + 1][c] <= 7) ? 10 : 14);
                    }
                } else {
                    this.view[py][c] = 8;
                    this.view[py - 1][c] = (this.view[py - 1][c] <= 4) ? 4 : 8;
                    this.view[py + 1][c] = (this.view[py + 1][c] <= 6) ? 6 : 8;
                }
                c--;
            } else {
                isItDark = true;
                if (this.at[py][c] <= 2) {
                    this.view[py - 1][c] = (this.at[py - 1][c + 1] === 0) ? 12 : 11;
                    this.view[py][c] = 23;
                    this.view[py + 1][c] = (this.at[py + 1][c + 1] === 0) ? 14 : 10;
                } else if (this.at[py][c + 1] <= 2) {
                    this.view[py - 1][c] = (this.at[py - 1][c + 1] === 0) ? 8 : 4;
                    this.view[py][c] = 8;
                    this.view[py + 1][c] = (this.at[py + 1][c + 1] === 0) ? 8 : 6;
                }
            }
        }; isItDark = false;
    }

}

MazeG.prototype.Lights = function (player) {
    var m = 32;
    this.initLights(player.body.x / m, player.body.y / m);
};

MazeG.prototype.Test = function () {
    this.view = [];
    this.at = [];
    this.at = [
        [3, 3, 3, 3, 3, 3, 3],
        [3, 3, 0, 3, 3, 3, 3],
        [3, 0, 0, 0, 3, 3, 3],
        [3, 3, 0, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 3, 3]
    ];
    this.view = [
        [3, 3, 3, 3, 3, 3, 3],
        [3, 3, 0, 3, 3, 3, 3],
        [3, 0, 0, 0, 3, 3, 3],
        [3, 3, 0, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 3, 3]
    ];
    this.nCols = 5;
    this.nRows = 5;
    this.ent = [2, 2];
    this.exit = [3, 3];
};
