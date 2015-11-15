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
    } 
    else { 
        fill(255,255,255); 
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
Level.prototype.draw = function(x,y) { 
    pushMatrix(); 
    translate(w/2-m-x,h/2-m-y); 
    for (var i = 0; i < this.mD.length; i++) { 
        for (var j = 0; j < this.mD[0].length; j++) { 
            this.blocks[i][j].draw(); 
        } 
    } 
    popMatrix(); 
};
Level.prototype.checkCollision = function(unit) {
    if (unit.y%m === 0 && unit.x%m === 0) {
        if (mapData1[unit.y/m][unit.x/m+1] === 0) {unit.rightCollision = true;}     else {unit.rightCollision = false;} 
        if (mapData1[unit.y/m][unit.x/m-1] === 0) {unit.leftCollision = true;}      else {unit.leftCollision = false;}
        if (mapData1[unit.y/m+1][unit.x/m] === 0) {unit.bottomCollision = true;}    else {unit.bottomCollision = false;} 
        if (mapData1[unit.y/m-1][unit.x/m] === 0) {unit.topCollision = true;}       else {unit.topCollision = false;}
    }
};
var Light = function(config) { };

Light.prototype.draw = function(level, unit) {  
    var lights = []; 
    for (var i = 0; i < level.mD.length; i++) { 
        lights.push([]); 
        for (var j = 0; j < level.mD[0].length; j++) { 
            lights[i].push(new Block({x:j, y:i, t: this.mD[i][j]})); 
        } 
    } 
    var isItDark = false;
    for (var i = unit.y; i > 0; i--) {
        for (var j = unit.x; j > 0; j--) {
            if (level.mD[i][j] === 1) {isItDark = true;}
            if (isItDark === true) {
                lights[i][j].type = 1;
            }
        }
    }
    //[unit.y/m][unit.x/m]
    pushMatrix(); 
    translate(w/2-m-unit.x,h/2-m-unit.y); 
    for (var i = 0; i < lights.length; i++) { 
        for (var j = 0; j < lights[0].length; j++) { 
            lights[i][j].draw(); 
        } 
    } 
    popMatrix(); 
};

var Persona = function(config){
    this.color = config.color || color(255, 232, 186); 
    this.y = config.y || 2*m; 
    this.x = config.x || 2*m; 
    this.height = config.height || m; 
    this.width = config.width || m;
    this.yspeed = config.yspeed || 0.0; 
    this.xspeed = config.xspeed || 0.0; 
    this.jump = config.jump || false;   
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