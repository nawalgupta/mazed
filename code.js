void setup() {
  size(400, 400);
}

var x = 100;
var y = 300;


void draw() {
    background(206, 144, 209);
    fill(130, 173, 157);
    rect(0,300,400,100);
    fill(245, 245, 61);
    // static
    if(keyPressed) {
      if (key == 'b' || key == 'B') {
        x+=5;
      }
      if (keyCode == LEFT) {
        x-=5;
      }
    }

    rect(x,y-20,20,20);
    //if (keyisPressed && keyCode === 32) {x-=5;}
}
