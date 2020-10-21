yoff = 0;

function setup (){
	createCanvas(1400, 800);
	pixelDensity(1);
}

function draw(){
	background(51);
	loadPixels();
	//draw the sunset gradient
	drawSunset();


	// set the properties for the water
  // draw an irregular polygon
  	beginShape();
		fill(176, 224, 230);
		stroke(70,130,180);
//for my 2d noise i referenced our lecture and dan shiffmans video on 2d noise
  let xoff = 0;
	//2D Noise

  // horizontal pixels
  for (let x = 0; x < width; x += 7) {
    let y = map(noise(xoff, yoff), 0, 1, 350, 450);

    // Set the vertex
    vertex(x, y/2);
    // Increment x dimension for noise
    xoff += 0.05;
  }
  // increment y dimension for noise
  yoff += 0.01;
  vertex(height*2, 0);
  vertex(0, 0);
	translate(0, 250);
  updatePixels();
  endShape(CLOSE);
	drawSun();
	drawSunShadow();
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
		fill(252, 175, 88);
		arc(700, 0, 340, 340, PI, TWO_PI);
	}
//to make the sunset on the water fade i used the p5js reference on alpha values
	function drawSunShadow(){
  arcColor = color(252, 255, 202);
  arcColor.setAlpha(128 + 128 * sin(millis() / 1000));
  fill(arcColor);
  arc(700, 0, 340, 340, 0, PI, PIE)
}
