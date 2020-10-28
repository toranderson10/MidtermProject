let sands = [];
yoff = 0;
let img,imgB;
let MySeagull, MyStars;
let seaVar = 400;
let changeDirection;
let brushx = 0;
let brushy = 0;
let px = 0;
let py = 0;
let ez = 0.1;

function preload(){
	img = loadImage("seagull.png");
	imgB = loadImage("star.png");
  imgC = loadImage("sparkles.png");
  imgD = loadImage("starz.png");
	   }
  // MySeagull = new Seagull(img,imgB,0,0,100,100);

function setup (){
	createCanvas(1400, 800);
  MySeagull = new Seagull(img, imgB, 0, 10, 100, 100);
  MyStars = new Stars(imgC, imgD, 10, 0, 100, 100);
	wave1 = new Waves ();
	wave2 = new Waves2 ();
	pixelDensity(1);
//for the sand
for (let i = 0; i < 10; i++) {
  let sax = (random(1400));
  let say = (700);
  let sar = random(20, 60);
  let s = new Sand(sax, say, sar);
  sands.push(s);
}
// for the boat
seaVar = 1;
changeDirection = false;
}

function mousePressed() {
  for (let i = 0; i < sands.length; i++) {
    sands[i].clicked(mouseX, mouseY);
  }
}

function draw(){
  background(40);
    	 loadPixels();
	     drawSunset();
       updatePixels();
            wave1.create();
            wave2.create();
	     drawSun();
	     drawSunShadow();
            MySeagull.display();
            //for the sand
  for (let i = 0; i < sands.length; i++) {
    sands[i].display();
    //sands[i].move();
}
// for boat
fill(138,43,226);
arc(seaVar, 500, 80, 80, 0, PI, CHORD);
line(seaVar, 500, seaVar, 450);
fill(105, 45, 10, 40);
rect(seaVar, 450, 70, 20);
if(seaVar>width){
  changeDirection=true}
else if (seaVar<=0){
  changeDirection=false}
if (seaVar>=0 && changeDirection == false){
  seaVar=seaVar+1}
else if(changeDirection == true){
  seaVar=seaVar-1}
  // make a brush!
  brush();
  //Clouds.show();
}

//to draw the sunset i referenced dan shiffmans tutorial on pixels
function drawSunset(){
	for(let pixelsX = 0; pixelsX < width; pixelsX++){
		for (let pixelsY = 0; pixelsY < width; pixelsY++){
			let index = (pixelsX + pixelsY * width) * 4
				pixels[index+8] = 300;
				pixels[index+5] = 400;
				pixels[index+1] = pixelsY;
				pixels[index+3] = 100;
			}
		}
	}

	function drawSun(){
		noStroke();
		//translate(0, 200);
		fill(252, 175, 88);
		arc(700, 400, 340, 340, PI, TWO_PI);
	}
//to make the sunset on the water fade i used the p5js reference on alpha values
	function drawSunShadow(){
  arcColor = color(252, 255, 202);
  arcColor.setAlpha(128 + 128 * sin(millis() / 1000));
  fill(arcColor);
  arc(700, 400, 340, 340, 0, PI, PIE)
}
// i want to be able to draw clouds
function brush(){
  brushx += (mouseX - brushx) * ez;
  brushy += (mouseY - brushy) * ez;
  line(brushx, brushy, px, py);
  px = brushx;
  py = brushy;
}
//dan shiffman object trails
// function Clouds(x, y){
//   this.x = x;
//   this.y = y;
//   this.history =[];
//
//   this.update = function(){
//     this.x += random(-5, 5);
//     this.y += random(-5, 5);
//     var v = createVector(this.x, this.y)
//     this.history.push(v);
//   }
// this.show = function(){
//   stroke(0);
//   fill(0, 150);
//   ellipse(this.x, this.y, 24, 24);
//   for (var i = 0, i < this.history.length; i++) {
//     var pos = this.history[i];
//     ellipse(pos.x, pos.y, 8, 8);
//   }
// }
// }
