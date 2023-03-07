let fireVisible = false;
let state = "start";
let rocketX = 400;
let rocketY = 100;
let velocity = 1;
let acceleration = 0.3;
let isGameActive = true;

function setup() {
  createCanvas(800, 800);
  frameRate(30);

  //how to make buttons work source: https://www.youtube.com/watch?v=YLIJLWZ-QB8
  //how to make buttons work source 2: https://p5js.org/reference/#/p5/createButton
  //button styling source: https://www.youtube.com/watch?v=7_jNZLu_6H8

  // first button on win screen
  buttonWin = createButton("Play again");
  buttonWin.mousePressed(playAgainWin);
  buttonWin.position(360, 450);
  buttonWin.style("color:black");
  buttonWin.style("background-color: rgb(255, 215, 0)");
  buttonWin.size(120, 40);
  buttonWin.style("border-radius", "10px");
  buttonWin.style("border", "none");
  buttonWin.hide();

  // second button on fail screen
  buttonFail = createButton("Try again");
  buttonFail.mousePressed(tryAgainFail);
  buttonFail.position(360, 450);
  buttonFail.style("color:black");
  buttonFail.style("background-color: rgb(255, 215, 0)");
  buttonFail.size(120, 40);
  buttonFail.style("border-radius", "10px");
  buttonFail.style("border", "none");
  buttonFail.hide();
}

function fire(x, y) {
  //fire
  // source for making fire move https://www.youtube.com/watch?v=cl5FW_zgY_Q
  fill(255, 215, 0);
  ellipse(x, y + random(80, 88), 35, 60);
  push();
  noStroke();
  fill(255, 170, 51);
  ellipse(x, y + random(70, 77), 20, 50);
  pop();
}

function rocket(x, y) {
  // legs
  fill(18, 44, 44);
  ellipse(x + 37.5, y + 70, 6);
  ellipse(x - 37.5, y + 70, 6);

  beginShape();

  vertex(x - 24, y + 55);
  bezierVertex(x - 26, y + 45, x - 35, y + 50, x - 35, y + 69);
  vertex(x - 40, y + 69);
  vertex(x - 40, y + 69);
  bezierVertex(x - 45, y + 55, x - 40, y + 35, x - 32, y + 30);
  vertex(x - 32, y + 30);
  endShape();

  beginShape();
  vertex(x + 24, y + 55);
  bezierVertex(x + 26, y + 45, x + 35, y + 50, x + 35, y + 69);
  vertex(x + 40, y + 69);
  vertex(x + 40, y + 69);
  bezierVertex(x + 45, y + 55, x + 40, y + 35, x + 32, y + 30);
  vertex(x + 32, y + 30);
  endShape();

  //body
  fill(71, 103, 135);
  ellipse(x, y, 70, 150);

  // window
  fill(18, 44, 44);
  ellipse(x, y - 20, 40);

  // window
  fill(176, 196, 222);
  ellipse(x, y - 20, 30);

  // bottom
  fill(18, 44, 44);
  rect(x - 23, y + 60, 45, 15, 6);

  //top
  beginShape();
  vertex(x - 20, y - 60);
  bezierVertex(x - 25, y - 60, x, y - 100, x + 22, y - 60);
  vertex(x + 20, y - 60);
  bezierVertex(x + 20, y - 60, x, y - 55, x - 20, y - 60);
  vertex(x - 20, y - 60);
  endShape();
}

function redPlanet(x, y) {
  // red planet
  strokeWeight(1);
  push();

  // shining objects source: https://p5js.org/reference/#/p5/drawingContext
  drawingContext.shadowBlur = 5;
  drawingContext.shadowColor = "pink";
  fill(145, 95, 95);
  ellipse(x, y, 100);
  pop();
  strokeWeight(0);
  fill(185, 115, 115);
  ellipse(x - 30, y + 20, 15);
  ellipse(x - 20, y - 20, 20);
  ellipse(x - 3, y + 10, 14);
  ellipse(x + 20, y + 20, 25);
  ellipse(x - 30, y, 7);
  ellipse(x + 20, y - 19, 35);
}

function bluePlanet(x, y) {
  // blue planet
  strokeWeight(1);
  push();
  drawingContext.shadowBlur = 5;
  drawingContext.shadowColor = "white";
  fill(111, 143, 175);
  ellipse(x, y, 150);
  pop();
  strokeWeight(0);
  fill(71, 103, 135);
  ellipse(x + 30, y + 20, 50);
  ellipse(x - 20, y - 30, 60);
  ellipse(x - 40, y + 25, 30);
  ellipse(x + 30, y - 40, 20);
  ellipse(x - 20, y + 50, 15);
}

function GreenPlanet(x, y) {
  // green planet
  strokeWeight(1);
  push();
  drawingContext.shadowBlur = 5;
  drawingContext.shadowColor = "white";
  fill(120, 156, 132);
  ellipse(x - 100, y - 70, 170);
  pop();
  fill(95, 133, 117);
  ellipse(x - 100, y - 100, 70);
  ellipse(x - 140, y - 40, 20);
  ellipse(x - 110, y - 20, 40);
  ellipse(x - 60, y - 50, 40);
}

function ground(x, y) {
  // flags
  fill(210, 43, 43);
  triangle(
    x + 350,
    y - 135,
    x + 350,
    y - 100,
    x + random(380, 390),
    y - random(118, 122)
  );
  triangle(
    x + 150,
    y - 250,
    x + 150,
    y - 200,
    x + random(200, 210),
    y - random(222, 228)
  );

  fill(92, 64, 51);
  rect(rect(x + 150, y - 250, 5, 100));
  rect(rect(x + 350, y - 135, 5, 80));

  //ground
  fill(200, 200, 200);
  rect(x, y, 800, 500);

  // hills
  push();
  fill(220, 220, 220);
  triangle(x, y - 250, x + 300, y, x, y);
  pop();
  triangle(x + 600, y, x + 800, y - 350, x + 800, y);
  triangle(x + 200, y - 150, x + 100, y, x + 450, y);
  triangle(x, y - 150, x + 150, y, x + 200, y - 150);
  triangle(x, y - 150, x, y, x + 150, y);
  fill(190, 190, 190);
  rect(x, y + 10, 800, 500);
  fill(170, 170, 170);
  rect(x, y + 40, 800, 500);
  fill(150, 150, 150);
  rect(x, y + 70, 800, 500);
}

// stars from the video lecture

let starX = [];
let starY = [];
let starAlpha = [];

for (let i = 0; i < 300; i++) {
  const x = Math.floor(Math.random() * 800);
  const y = Math.floor(Math.random() * 800);
  const alpha = Math.random() * 800;

  starX.push(x);
  starY.push(y);
  starAlpha.push(alpha);
}

// START SCREEN
// source: video lecture about screens

function startScreen() {
  noStroke();
  background(0, 0, 0);

  for (let index in starX) {
    fill(255, 255, 255, Math.abs(Math.sin(starAlpha[index])) * 255);
    ellipse(starX[index], starY[index], 1);

    starAlpha[index] = starAlpha[index] + 0.02;
  }

  push();
  drawingContext.shadowBlur = 3;
  drawingContext.shadowColor = "white";
  fill(255, 255, 255);
  textSize(40);
  text("Click to start", 300, 300);
  textSize(30);
  text("You should land on a flat ground", 200, 370);
  pop();

  ground(0, 700);
}

// GAME SCREEN
function gameScreen() {
  // background
  noStroke();
  background(0, 0, 0);

  for (let index in starX) {
    fill(255, 255, 255, Math.abs(Math.sin(starAlpha[index])) * 255);
    ellipse(starX[index], starY[index], 2);

    starAlpha[index] = starAlpha[index] + 0.02;
  }

  bluePlanet(650, 150);
  redPlanet(200, 250);
  GreenPlanet(200, 180);
  ground(0, 700);
  if (fireVisible == true) {
    fire(rocketX, rocketY);
  }
  rocket(rocketX, rocketY);

  // ROCKET IS MOVING DOWN, LEFT, AND RIGHT
  // source: flappy ufo game from the lecture
  // source: video lectures about && and ||
  // source: video lectures about 'keyIsDown'

  rocketX = rocketX + 0;

  if (isGameActive) {
    rocketY = rocketY + velocity;
    velocity = velocity + acceleration;
  }

  // making fire appear only when pressing keyIsDown(38): got help from the lab
  if (keyIsDown(38) && isGameActive) {
    velocity = velocity - 0.7;
    fireVisible = true;
  } else if (keyIsDown(38) === false) {
    fireVisible = false;
  }

  // identifying the area where rocket can/ can't land
  if (rocketY > 650 && (rocketX < 450 || rocketX > 600 || velocity > 5)) {
    isGameActive = false;
    state = "fail";
    failScreen();
  } else if (rocketY > 650 && rocketX > 450 && rocketX < 600 && velocity < 5) {
    isGameActive = false;
    state = "win";
    winScreen();
  }

  // navigating rocket left and right
  if (keyIsDown(37)) {
    rocketX = rocketX - 2;
  }
  if (keyIsDown(39)) {
    rocketX = rocketX + 2;
  }

  // to hide objects source: https://p5js.org/reference/#/p5.Element/hide
  // to show objects source: https://p5js.org/reference/#/p5.Element/show

  buttonFail.hide();
  buttonWin.hide();
}

// WIN SCREEN
function winScreen() {
  noStroke();
  background(0, 0, 0);

  for (let index in starX) {
    fill(255, 255, 255, Math.abs(Math.sin(starAlpha[index])) * 255);
    ellipse(starX[index], starY[index], 1);

    starAlpha[index] = starAlpha[index] + 0.02;
  }
  push();
  drawingContext.shadowBlur = 3;
  drawingContext.shadowColor = "white";
  fill(255, 255, 255);
  textSize(40);
  text("You landed safely!", 230, 300);
  textSize(30);
  text("Click to play again", 270, 350);
  pop();
  buttonWin.show();
}

// FAIL SCREEN
function failScreen() {
  noStroke();
  background(0, 0, 0);

  for (let index in starX) {
    fill(255, 255, 255, Math.abs(Math.sin(starAlpha[index])) * 255);
    ellipse(starX[index], starY[index], 1);

    starAlpha[index] = starAlpha[index] + 0.02;
  }
  push();
  drawingContext.shadowBlur = 3;
  drawingContext.shadowColor = "white";
  fill(255, 255, 255);
  textSize(40);
  text("You crashed!", 280, 300);
  text("Click to try again", 250, 350);
  pop();
  buttonWin.hide();
  buttonFail.show();
}

// changing screens on click source: video lecture about screens
function mouseClicked() {
  if (state === "start") {
    state = "game";
  } else if (state === "game") {
    state = "result";
  } else if (state === "result") {
    state = "start";
  }
}

// buttons working
// source: got help from the lab
function playAgainWin() {
  state = "start";
  isGameActive = true;
  rocketX = 400;
  rocketY = 100;
  velocity = 0.1;
  acceletation = 0.3;
}

function tryAgainFail() {
  state = "start";
  isGameActive = true;
  rocketX = 400;
  rocketY = 100;
  velocity = 0.1;
  acceletation = 0.3;
}

function draw() {
  if (state === "start") {
    startScreen();
  }
  if (isGameActive && state === "game") {
    gameScreen();
  } else if (isGameActive === false && state === "win") {
    winScreen();
  } else if (isGameActive === false && state === "fail") {
    failScreen();
  }
}
