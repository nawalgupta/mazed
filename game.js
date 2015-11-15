//var w = screen.width; var h = screen.height;
var w = 512; var h = 512; 
var m = 32;
void setup() { 
    size(w, h); 
    frameRate(30);
};

var Block = function(config) { 
    this.x = m*config.x; 
    this.y = m*config.y; 
    this.width = m; 
    this.height = m; 
    this.type = config.t;
};
Block.prototype.draw = function() { 
    noStroke(); 
    if (this.type === 0) { 
        fill(130, 179, 84); 
        rect(this.x,this.y,this.width,this.height); 
    } else if (this.type === 1) { 
        fill(255,255,255); 
        rect(this.x,this.y,this.width,this.height); 
    } else if (this.type === 2) { 
        fill(0,0,0); 
        rect(this.x,this.y,this.width,this.height); 
    }
};
var Level = function(config) { 
    this.mD = config.mD; 
    this.blocks = []; 
    for (var i = 0; i < this.mD.length; i++) { 
        this.blocks.push([]); 
        for (var j = 0; j < this.mD[0].length; j++) { 
            this.blocks[i].push(new Block({x:j, y:i, t: this.mD[i][j]})); 
        } 
    } 
};
Level.prototype.draw = function(unit) { 
    pushMatrix(); 
    translate(w/2-m-unit.x,h/2-m-unit.y); 
    for (var i = 0; i < this.blocks.length; i++) { 
        for (var j = 0; j < this.blocks[0].length; j++) { 
            this.blocks[i][j].draw(); 
        } 
    } 
    popMatrix(); 
};
Level.prototype.checkCollision = function(unit) {
    if (unit.y%m === 0 && unit.x%m === 0) {
        if (mapData1[unit.y/m][unit.x/m+1] === 0) {unit.rightCollision = true;}         else {unit.rightCollision = false;} 
        if (mapData1[unit.y/m][unit.x/m-1] === 0) {unit.leftCollision = true;}          else {unit.leftCollision = false;}
        if (mapData1[unit.y/m+1][unit.x/m] === 0) {unit.bottomCollision = true;}        else {unit.bottomCollision = false;} 
        if (mapData1[unit.y/m-1][unit.x/m] === 0) {unit.topCollision = true;}           else {unit.topCollision = false;}
    }
}
var Light = function(config) { };
Light.prototype.draw = function(level, unit) {  
    for (var i = 0; i < level.blocks.length; i++) {
        for (var j = 0; j < level.blocks[0].length; j++) {
            level.blocks[i][j].type = 0;
        }
    }
    var isItDark = false;
    for (var i = unit.y/m; i >= 0; i--) {
        if (level.mD[i][unit.x/m] === 0) {isItDark = true; }
        if (!isItDark && level.mD[i][unit.x/m] === 1) { level.blocks[i][unit.x/m].type = 1; 
            if (level.mD[i][unit.x/m - 1] === 1) { level.blocks[i][unit.x/m - 1].type = 1; }
            if (level.mD[i][unit.x/m + 1] === 1) { level.blocks[i][unit.x/m + 1].type = 1; }
        }
    }
    isItDark = false
    for (var i = unit.y/m; i < level.blocks.length; i++) {
        if (level.mD[i][unit.x/m] === 0) {isItDark = true; }
        if (!isItDark && level.mD[i][unit.x/m] === 1) { level.blocks[i][unit.x/m].type = 1; 
            if (level.mD[i][unit.x/m - 1] === 1) { level.blocks[i][unit.x/m - 1].type = 1; }
            if (level.mD[i][unit.x/m + 1] === 1) { level.blocks[i][unit.x/m + 1].type = 1; }}
    }
    isItDark = false
    for (var i = unit.x/m; i < level.blocks[0].length; i++) {
        if (level.mD[unit.y/m][i] === 0) {isItDark = true; }
        if (!isItDark && level.mD[unit.y/m][i] === 1) { level.blocks[unit.y/m][i].type = 1; 
            if (level.mD[unit.y/m - 1][i] === 1) { level.blocks[unit.y/m - 1][i].type = 1; }
            if (level.mD[unit.y/m + 1][i] === 1) { level.blocks[unit.y/m + 1][i].type = 1; }}
    }
    isItDark = false
    for (var i = unit.x/m; i >= 0; i--) {
        if (level.mD[unit.y/m][i] === 0) {isItDark = true; }
        if (!isItDark && level.mD[unit.y/m][i] === 1) { level.blocks[unit.y/m][i].type = 1;
            if (level.mD[unit.y/m - 1][i] === 1) { level.blocks[unit.y/m - 1][i].type = 1; }
            if (level.mD[unit.y/m + 1][i] === 1) { level.blocks[unit.y/m + 1][i].type = 1; }}
    }
};
var Persona = function(config){
    this.color = config.color || color(255, 232, 186); 
    this.y = config.y || 2*m; 
    this.x = config.x || 2*m; 
    this.height = config.height || m; 
    this.width = config.width || m;
    this.yspeed = config.yspeed || 0.0; 
    this.xspeed = config.xspeed || 0.0; 
    this.leftCollision = false; 
    this.rightCollision = false; 
    this.bottomCollision = false; 
    this.topCollision = false;
};
Persona.prototype.draw = function() { 
    fill(this.color); 
    rect(w/2-m,h/2-m,this.width,this.height); 
};
Persona.prototype.move = function() {        
    if (this.xspeed > 0 && this.rightCollision === false) { this.x +=this.xspeed; }     if (this.xspeed > 0 && this.rightCollision === true) { this.xspeed = 0; }
    if (this.xspeed < 0 && this.leftCollision === false) { this.x +=this.xspeed; }      if (this.xspeed < 0 && this.leftCollision === true) { this.xspeed = 0; }
    if (this.yspeed > 0 && this.bottomCollision === false) { this.y +=this.yspeed; }    if (this.yspeed > 0 && this.bottomCollision === true) { this.yspeed = 0; }
    if (this.yspeed < 0 && this.topCollision === false) { this.y +=this.yspeed; }       if (this.yspeed < 0 && this.topCollision === true) { this.yspeed = 0; }
    if (this.x%m === 0) {this.xspeed = 0;}
    if (this.y%m === 0) {this.yspeed = 0;}          
};
var Game = function() { 
    this.lvl = 0; 
    this.levels = []; 
    this.unit = new Persona({}); 
    this.lights = [];
};
Game.prototype.SetLevels = function() { 
    this.levels.push(new Level({mD: mapData1})); 
    this.lights.push(new Light({mD: mapData1})); 
};
Game.prototype.draw = function(lvl) {   
    this.levels[this.lvl].checkCollision(this.unit);
    this.unit.move();
    this.levels[this.lvl].draw(this.unit);
    if (this.unit.yspeed === 0 && this.unit.xspeed === 0) {this.lights[this.lvl].draw(this.levels[this.lvl], this.unit);}
    this.unit.draw();
};
Game.prototype.Update = function(x) { 
    if(keyCode===UP){this.unit.yspeed=-x*m/4;} 
    if(keyCode===DOWN){this.unit.yspeed=x*m/4;} 
    if(keyCode===LEFT){this.unit.xspeed=-x*m/4;} 
    if(keyCode===RIGHT){this.unit.xspeed=x*m/4;} 
};
var game = new Game(); 
game.SetLevels();  
void keyPressed() { game.Update(1); } //void keyReleased()  { game.Update(0); }
void draw() {
    background(255,255,255);
    game.draw();
}