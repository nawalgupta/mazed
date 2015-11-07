void setup() { size(0.8*screen.width, 0.8*screen.height); }
//Global variable
var g = 1; var globalground = 300; var m = 0.1*0.8*screen.height;
var mapData = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var Block = function(config) { this.x = config.x; this.y = config.y; this.width = m; this.height = m; };

Block.prototype.draw = function() { fill(130, 179, 84); rect(this.x,this.y,this.width,this.height); fill(198, 240, 156); rect(this.x+this.width/2,this.y,this.width/2,this.height); };

var checkCBox = function(v1, v2, v3, v4, v5, v6) { return ((v1 === v2) && (v3 >= v4) && (v5 <= v6)); };

Block.prototype.checkVCollision = function(unit) {
    unit.bottomCollision = (checkCBox(unit.y, this.y, unit.x, this.x, unit.x + unit.width, this.x + this.width) && (unit.yspeed > 0));
    unit.topCollision = (checkCBox(unit.y - unit.height, this.y + this.height, unit.x, this.x, unit.x + unit.width, this.x + this.width) && (unit.yspeed < 0)); 
    unit.ground = this.y;
};

Block.prototype.checkHCollision = function(unit) {
    unit.rightCollision = checkCBox(unit.x + unit.width, this.x, unit.y-unit.height, this.y, unit.y, this.y+this.height);
    unit.leftCollision = checkCBox(unit.x, this.x + this.width, unit.y-unit.height, this.y, unit.y, this.y+this.height);
};

var Level = function(config) { 
    this.numBlocks = config.numBlocks || 100; this.blocks = []; this.blocksAfloat = []; this.blockL = config.blockL || m;
};

Level.prototype.setLeveI = function() {
    var a = 300, b = 350, c = 300;
    for (var i = 0; i < this.numBlocks; i++) { 
        if (i < 2) {this.blocks.push(new Block({x:i*this.blockL, y:a, width: this.blockL, height: 400-a,}));}
        else if (i < 4) {this.blocks.push(new Block({x:i*this.blockL, y:b, width: this.blockL, height: 400-b,}));}
        else if (i < this.numBlocks) {this.blocks.push(new Block({x:i*this.blockL, y:c, width: this.blockL, height: 400-c,}));}
    }
};

Level.prototype.draw = function(unit) {
    pushMatrix();
    translate(100-unit.x,0); for (var i = 0; i < this.blocks.length; i++) { this.blocks[i].draw(); }
    popMatrix();

    if (unit.xspeed > 0 && floor((unit.x)/this.blockL)+1 <= this.blocks.length) {
        this.blocks[floor((unit.x)/this.blockL)+1].checkHCollision(unit);
    }
    if (unit.xspeed < 0 && floor((unit.x)/this.blockL)-1 >= 0) {
        this.blocks[floor((unit.x)/this.blockL)-1].checkHCollision(unit);
    }
    
    var oldground = unit.ground;
    this.blocks[floor((unit.x)/this.blockL)].checkVCollision(unit);
    var new2ground = unit.ground;
    this.blocks[floor((unit.x+unit.width)/this.blockL)].checkVCollision(unit);
    var new1ground = unit.ground;
    if (new1ground - oldground === 0 ) {unit.ground = new1ground;}
    if (new2ground - oldground === 0 ) {unit.ground = new2ground;}
};

//Your character
var Persona = function(config){
    this.color = config.color || color(255, 232, 186);
    this.y = config.x || globalground; 
    this.x = config.y || 0; 
    this.height = config.height || 20;
    this.width = config.width || 20;
    this.ground = config.ground || globalground;
    this.yspeed = config.yspeed || 0; 
    this.xspeed = config.xspeed || 0; 
    this.jump = config.jump || false;
    this.leftCollision = false;
    this.rightCollision = false;
    this.bottomCollision = false;
    this.topCollision = false;
    
};

Persona.prototype.draw = function() {
    fill(this.color);
    this.x = constrain(this.x, 0, 1000); 
    this.y = constrain(this.y, 0, this.ground);
    rect(100,this.y-20,this.width,this.height);                            //Character drawing
    fill(171, 159, 140);
    stroke(0, 0, 0);
};


var Environment = function() { this.unit = new Persona({}); this.lvl = new Level({}); this.ground = globalground; };

var move = function(unit) {   
    //Function for moviment of the character
    if (unit.xspeed !== 0 && unit.leftCollision === false && unit.rightCollision === false) {unit.x +=unit.xspeed;}              
    if (unit.xspeed === -1 && unit.rightCollision === true) {unit.x +=unit.xspeed;}
    if (unit.xspeed > 0 && unit.leftCollision === true) {unit.x +=unit.xspeed;}
    //Check for moviment on x-coord
    if (unit.jump && unit.y === unit.ground) {unit.yspeed -= 10;}       //Check for moviment on y-coord (jumping)
    if (unit.y < unit.ground) {unit.yspeed += g;}                         //Check for falling status
    unit.y+=unit.yspeed;                                                    //Update y position
    if (unit.y >= unit.ground) {unit.yspeed = 0;}                         //Check for colision on the ground
    
    if (unit.xspeed > 0 && unit.rightCollision === true) { unit.xspeed = 0; }
    if (unit.xspeed < 0 && unit.leftCollision === true) { unit.xspeed = 0; }
    if (unit.bottomCollision === true || unit.topCollision === true) {unit.yspeed = 0; }        
};

Environment.prototype.draw = function() {
    background(194, 138, 194); 
    this.lvl.draw(this.unit); 
    move(this.unit);              
    this.unit.draw();
};


Environment.prototype.update = function(x) {                        //Check for updates by user interaction
    if (keyCode === UP || keyCode === 32) {this.unit.y=x;}       //Check for jumping
    if (keyCode === LEFT) {this.unit.xspeed=-5*x;}                  //Check for running
    if (keyCode === RIGHT) {this.unit.xspeed=5*x;}                  //Check for running
};

//Declare your character
var gameEnv =  new Environment();   
gameEnv.lvl.setLeveI(); 

void keyPressed() { gameEnv.update(1); }                  //Update Data by user interaction 
void keyReleased()  { gameEnv.update(0); }                 //Update Data by user interaction

void draw() {
    gameEnv.draw();
}
