void setup() {
  size(screen.width*3/4, screen.height*3/4);
}

var x = 100;
var y = screen.height*2/3*3/4;

void draw() {
    background(206, 144, 209);
    fill(130, 173, 157);
    rect(0,height*2/3,width,height);
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
