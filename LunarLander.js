function setup() {
  createCanvas(800, 800);
}

background(0, 0, 0);

function rocket(x, y) {
  // sourse for making fire https://www.youtube.com/watch?v=cl5FW_zgY_Q
  //fire
  fill(255, 215, 0);
  ellipse(x, y + random(80, 88), 35, 60);
  push();
  noStroke();
  fill(255, 170, 51);
  ellipse(x, y + random(70, 77), 20, 50);
  pop();

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
}

function redPlanet(x, y) {
  // red planet
  strokeWeight(1);
  fill(145, 95, 95);
  ellipse(x, y, 100);
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
  fill(111, 143, 175);
  ellipse(x, y, 150);

  strokeWeight(0);
  fill(71, 103, 135);
  ellipse(x + 30, y + 20, 50);
  ellipse(x - 20, y - 30, 60);
  ellipse(x - 40, y + 25, 30);
  ellipse(x + 30, y - 40, 20);
  ellipse(x - 20, y + 50, 15);
}

function GreenPlanet(x, y) {
  // beige planet
  strokeWeight(1);
  fill(120, 156, 132);
  ellipse(x - 100, y - 70, 170);
  fill(95, 133, 117);
  ellipse(x - 100, y - 100, 70);
  ellipse(x - 140, y - 40, 20);
  ellipse(x - 110, y - 20, 40);
  ellipse(x - 60, y - 50, 40);
}

function ground(x, y) {
  fill(200, 200, 200);
  rect(x, y, 800, 500);
  // crash zone
  triangle(x, y - 200, x + 200, y, x, y);
  triangle(x + 600, y, x + 800, y - 350, x + 800, y);
  triangle(x + 200, y - 150, x + 100, y, x + 450, y);
  triangle(x, y - 150, x + 150, y, x + 200, y - 150);
  fill(150, 150, 150);
  ellipse(x + 200, y + random(50, 51), 100, 50);
  ellipse(x + 350, y + random(70, 71), 70, 30);
  ellipse(x + 600, y + random(40, 41), 70, 30);
  ellipse(x + 50, y + random(90, 91), 130, 50);
  ellipse(x + 700, y + random(90, 91), 130, 50);
}

let starX = [];
let starY = [];
let starAlpha = [];

for (let i = 0; i < 300; i++) {
  const x = Math.floor(Math.random() * width);
  const y = Math.floor(Math.random() * height);
  const alpha = Math.random() * height;

  starX.push(x);
  starY.push(y);
  starAlpha.push(alpha);
}

function startScreen() {
  noStroke();
  background(0, 0, 0);

  for (let index in starX) {
    fill(255, 255, 255, Math.abs(Math.sin(starAlpha[index])) * 255);
    ellipse(starX[index], starY[index], 1);

    starAlpha[index] = starAlpha[index] + 0.02;
  }

  fill(255, 255, 255);
  textSize(40);
  text("Click to start", 300, 300);
  textSize(30);
  text("You should land on a flat ground", 200, 370);
}

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
  rocket(rocketX, rocketY);

  // ROCKET IS MOVING

  rocketX = rocketX + 0;

  if (isGameActive) {
    rocketY = rocketY + velocity;
    velocity = velocity + acceleration;
  }

  if (keyIsDown(38) && isGameActive) {
    velocity = velocity - 0.7;
  }

  if (rocketY > 650 && velocity > 5) {
    isGameActive = false;
    state = "fail";
    failScreen();
  } else if (rocketY > 650 && velocity < 5) {
    isGameActive = false;
    state = "win";
    winScreen();
  }

  if (keyIsDown(37)) {
    rocketX = rocketX - 3;
  }
  if (keyIsDown(39)) {
    rocketX = rocketX + 3;
  }

  // ROCKET CRASHES IF NOT LANDING ON A FLAT GROUND
  /*
  if ((rocketX < 300 && rocketY > 600) || (rocketX > 600 && rocketY > 600)) {
    isGameActive = false;
    state = "fail";
    failScreen();
  } else if (rocketX > 300 || rocketX < 600) {
    isGameActive = false;
    state = "win";
    winScreen();
  }
  */
}

// WIN SCREEN WIN SCREEN WIN SCREEN
function winScreen() {
  noStroke();
  background(0, 0, 0);

  for (let index in starX) {
    fill(255, 255, 255, Math.abs(Math.sin(starAlpha[index])) * 255);
    ellipse(starX[index], starY[index], 1);

    starAlpha[index] = starAlpha[index] + 0.02;
  }

  fill(255, 255, 255);
  textSize(40);
  text("You landed safely!", 230, 300);
}

// FAIL SCREEN FAIL SCREEN FAIL SCREEN
function failScreen() {
  noStroke();
  background(0, 0, 0);

  for (let index in starX) {
    fill(255, 255, 255, Math.abs(Math.sin(starAlpha[index])) * 255);
    ellipse(starX[index], starY[index], 1);

    starAlpha[index] = starAlpha[index] + 0.02;
  }

  fill(255, 255, 255);
  textSize(40);
  text("You crashed!", 280, 300);
  text("Click to try again", 250, 350);
}

function mouseClicked() {
  if (state === "start") {
    state = "game";
  } else if (state === "game") {
    state = "result";
  } else if (state === "result") {
    state = "start";
  } else if (state === "win") {
    winScrean();
  } else if (state === "fail") {
    failScreen();
  }
}

let state = "start";
let rocketX = 400;
let rocketY = 100;
let velocity = 1;
let acceleration = 0.3;
let isGameActive = true;

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
