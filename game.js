//Maze generator algorith
var mazesize = 3;
var xi, yi, xf, yf;
var mapData = [];
var maze = function(x,y,mD) { // x and y must be multiple of 3, for a centralized player and centralized map
  mD.length = 0;
  for (var i = 0; i < x+16; i++) { mD.push([]); for (var j = 0; j < y+16; j++) { mD[i].push(0); } }
  xi = 8; yi = 8; xf = 0; yf = 0;
  mD[yi][xi]=1; var visited = [];
  for (var i = 0; i < x+16; i++) {
    visited.push([]);
    for (var j = 0; j < y+16; j++) {
      visited[i].push(mD[i][j]);
    }
  }
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < y + 16; j++) {
      visited[i][j]=1;
    }
  }
  for (var i = 8; i < x + 8; i++) {
    for (var j = 0; j < 8; j++) {
      visited[i][j]=1;
    }
    for (var j = y + 8; j < y + 16; j++) {
      visited[i][j]=1;
    }
  }
  for (var i = x + 8; i < x + 16; i++) {
    for (var j = 0; j < y + 16; j++) {
      visited[i][j]=1;
    }
  }
  var thereismore = true; var neighbors = true; var temp = 0; var mnxi = []; var mnyi = []; var idirec = 0; var direc = [];
  while (thereismore) {
    temp = 0; direc = [];
    if (visited[yi][xi-2] === 1) { temp++; } else { direc.  push(1); }
    if (visited[yi+2][xi] === 1) { temp++; } else { direc.push(2); }
    if (visited[yi][xi+2] === 1) { temp++; } else { direc.push(3); }
    if (visited[yi-2][xi] === 1) { temp++; } else { direc.push(4); }
    if (temp === 4) {neighbors = false;} else { neighbors = true; }
    if (temp < 3) { mnxi.push(xi); mnyi.push(yi); }
    if (neighbors) {
      idirec = direc[round(random(direc.length-1))];
      if (idirec === 1) { visited[yi][xi-2] = 1; mD[yi][xi-2] = 1; mD[yi][xi-1] = 1; xi = xi - 2; }
      if (idirec === 2) { visited[yi+2][xi] = 1; mD[yi+2][xi] = 1; mD[yi+1][xi] = 1; yi = yi + 2; }
      if (idirec === 3) { visited[yi][xi+2] = 1; mD[yi][xi+2] = 1; mD[yi][xi+1] = 1; xi = xi + 2; }
      if (idirec === 4) { visited[yi-2][xi] = 1; mD[yi-2][xi] = 1; mD[yi-1][xi] = 1; yi = yi - 2; }
    } else { if (mnxi.length === 0) { thereismore = 0; } else { xi = mnxi.pop(); yi = mnyi.pop();} }
  }

  xi = 0; yi = 0;
  while (abs(xi-xf) < x/5 || abs(yi-yf) < y/5) {
      xi = round(random(8,mD[0].length - 9)); yi = round(random(8,mD.length - 9));
      xf = round(random(8,mD[0].length - 9)); yf = round(random(8,mD.length - 9));
      if (xi % 2 === 1) { xi++; } if (yi % 2 === 1) { yi++; } if (xf % 2 === 1) { xf++; } if (yf % 2 === 1) { yf++; }
  }
  mD[yi][xi] = 2;
  mD[yf][xf] = 3;
};

var w = 512; var h = 512; var m = 32; void setup() { size(w, h); frameRate(30); };

var Block =  function(config) { this.x = m*config.x; this.y = m*config.y; this.width = m; this.height = m; this.type = config.t; };
Block.prototype.draw = function() {
  if      (this.type === 0) { fill(#477B75);      rect(this.x,this.y,this.width,this.height); }
  else if (this.type === 1) { fill(255,255,255);  rect(this.x,this.y,this.width,this.height); }
  else if (this.type === 2) { fill(255,255,0);    rect(this.x,this.y,this.width,this.height); line(this.x,this.y,this.x+this.width+1,this.y+this.height+1); line(this.x+this.width+1,this.y,this.x,this.y+this.height+1); }
  else if (this.type === 3) { fill(255, 100, 0);  rect(this.x,this.y,this.width,this.height);
    line(this.x+this.width/2,this.y,this.x+this.width/2,this.y+this.height); line(this.x,this.y+this.height/2,this.x+this.width,this.y+this.height/2); line(this.x+this.width/2+1,this.y,this.x+this.width/2+1,this.y+this.height); line(this.x,this.y+this.height/2+1,this.x+this.width,this.y+this.height/2+1);
  }
};
var Persona = function(config){
    this.y = config.y || (yi)*m;  this.x = config.x || (xi)*m; this.leftCollision = false; this.rightCollision = false; this.bottomCollision = false;  this.topCollision = false;
    this.color = config.color || color(255, 232, 186); this.height = config.height || m; this.width = config.width || m; this.yspeed = config.yspeed || 0.0; this.xspeed = config.xspeed || 0.0;
};
Persona.prototype.draw = function() {fill(this.color); rect(w/2-m/2,h/2-m/2,this.width,this.height); };
Persona.prototype.move = function() {
    if (this.xspeed > 0 && this.rightCollision === false) { this.x +=this.xspeed; }     if (this.xspeed > 0 && this.rightCollision === true) { this.xspeed = 0; }
    if (this.xspeed < 0 && this.leftCollision === false) { this.x +=this.xspeed; }      if (this.xspeed < 0 && this.leftCollision === true) { this.xspeed = 0; }
    if (this.yspeed > 0 && this.bottomCollision === false) { this.y +=this.yspeed; }    if (this.yspeed > 0 && this.bottomCollision === true) { this.yspeed = 0; }
    if (this.yspeed < 0 && this.topCollision === false) { this.y +=this.yspeed; }       if (this.yspeed < 0 && this.topCollision === true) { this.yspeed = 0; }
    if (this.x%m === 0) {this.xspeed = 0;} if (this.y%m === 0) {this.yspeed = 0;}
};

var Level = function(config) { this.mD = config.mD; this.blocks = []; };
Level.prototype.set = function(config) {
  this.mD = config.mD;
  this.blocks.length = 0;
  for (var i = 0; i < this.mD.length; i++) { this.blocks.push([]); for (var j = 0; j < this.mD[0].length; j++) { this.blocks[i].push(new Block({x:j, y:i, t: this.mD[i][j]})); } }
}
Level.prototype.draw = function(unit) { pushMatrix(); translate(w/2-m/2-unit.x,h/2-m/2-unit.y); for (var i = 0; i < this.blocks.length; i++) { for (var j = 0; j < this.blocks[0].length; j++) { this.blocks[i][j].draw(); } } popMatrix(); };
Level.prototype.checkCollision = function(unit) {
    if (unit.y%m === 0 && unit.x%m === 0) {
        if (mapData[unit.y/m][unit.x/m+1] === 0) {unit.rightCollision = true;}         else {unit.rightCollision = false;}
        if (mapData[unit.y/m][unit.x/m-1] === 0) {unit.leftCollision = true;}          else {unit.leftCollision = false;}
        if (mapData[unit.y/m+1][unit.x/m] === 0) {unit.bottomCollision = true;}        else {unit.bottomCollision = false;}
        if (mapData[unit.y/m-1][unit.x/m] === 0) {unit.topCollision = true;}           else {unit.topCollision = false;}
    }
};
Level.prototype.checkLights = function(unit) {
    for (var i = 0; i < this.blocks.length; i++) { for (var j = 0; j < this.blocks[0].length; j++) { this.blocks[i][j].type = 0;  } } var isItDark = false;
    for (var i = unit.y/m; i >= 0; i--) {
        if (this.mD[i][unit.x/m] === 0) {isItDark = true;}
        if (!isItDark) {
          this.blocks[i][unit.x/m].type = this.mD[i][unit.x/m]; this.blocks[i][unit.x/m-1].type = this.mD[i][unit.x/m-1]; this.blocks[i][unit.x/m+1].type = this.mD[i][unit.x/m+1];
        }
    } isItDark = false;
    for (var i = unit.y/m; i < this.blocks.length; i++) {
        if (this.mD[i][unit.x/m] === 0) {isItDark = true; }
        if (!isItDark) {
          this.blocks[i][unit.x/m].type = this.mD[i][unit.x/m]; this.blocks[i][unit.x/m-1].type = this.mD[i][unit.x/m-1]; this.blocks[i][unit.x/m+1].type = this.mD[i][unit.x/m+1];
        }
    } isItDark = false;
    for (var i = unit.x/m; i < this.blocks[0].length; i++) {
        if (this.mD[unit.y/m][i] === 0) {isItDark = true; }
        if (!isItDark) {
          this.blocks[unit.y/m][i].type = this.mD[unit.y/m][i]; this.blocks[unit.y/m-1][i].type = this.mD[unit.y/m-1][i]; this.blocks[unit.y/m+1][i].type = this.mD[unit.y/m+1][i];
        }
    } isItDark = false;
    for (var i = unit.x/m; i >= 0; i--) {
        if (this.mD[unit.y/m][i] === 0) {isItDark = true; }
        if (!isItDark) {
          this.blocks[unit.y/m][i].type = this.mD[unit.y/m][i]; this.blocks[unit.y/m-1][i].type = this.mD[unit.y/m-1][i]; this.blocks[unit.y/m+1][i].type = this.mD[unit.y/m+1][i];
        }
    }
};

var Game = function() {
    this.lvl = 1;
    this.level = new Level({});
    this.level.set({mD: mapData});
    this.unit = new Persona({});
};
Game.prototype.draw = function(lvl) {
  if (this.unit.yspeed === 0 && this.unit.xspeed === 0) {this.level.checkLights(this.unit);}
  this.level.checkCollision(this.unit);
  this.unit.move();
  this.level.draw(this.unit);
  this.unit.draw();
  if (this.unit.x/m === xf && this.unit.y/m === yf) {
    this.lvl++; mazesize+=2;  maze(mazesize,mazesize,mapData);
    this.level.set({mD: mapData});
    this.unit.x = xi*m; this.unit.y = yi*m;
  }
  fill(0,0,0); rect(0,0,m,m); fill(255,255,255); textSize(m); textAlign(CENTER); text(this.lvl,m/2,m*8/9);
};
Game.prototype.Update = function(x) {
    if (keyCode===UP){this.unit.yspeed=-x*m/4;}
    if (keyCode===DOWN){this.unit.yspeed=x*m/4;}
    if (keyCode===LEFT){this.unit.xspeed=-x*m/4;}
    if (keyCode===RIGHT){this.unit.xspeed=x*m/4;}
};
maze(mazesize,mazesize,mapData); var game = new Game();
void keyPressed() { game.Update(1); }
void draw() { background(#477B75); game.draw(); }
void mouseClicked() {
    if (mouseX >= mouseY && (-mouseX) >= mouseY ) { game.unit.yspeed=-m/4; }
    if (mouseX >= mouseY && (-mouseX) <= mouseY ) { game.unit.xspeed= m/4; }
    if (mouseX <= mouseY && (-mouseX) >= mouseY ) { game.unit.xspeed=-m/4; }
    if (mouseX <= mouseY && (-mouseX) <= mouseY ) { game.unit.yspeed= m/4; }
}
