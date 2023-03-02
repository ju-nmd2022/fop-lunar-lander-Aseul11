function setup() {
  createCanvas(800, 800);
}

background(0, 0, 0);

function rocket(x, y) {
  //fire
  fill(255, 215, 0);
  beginShape();
  vertex(x - 20, y + 140);
  bezierVertex(x - 20, y + 140, x - 40, y + 170, x, y + 210);
  vertex(x, y + 210);
  bezierVertex(x, y + 210, x + 40, y + 170, x + 20, y + 140);
  endShape();

  fill(255, 140, 51);
  beginShape();
  strokeWeight(0);
  vertex(x - 10, y + 130);
  bezierVertex(x - 10, y + 140, x - 25, y + 160, x, y + 190);
  bezierVertex(x + 10, y + 160, x + 25, y + 180, x + 10, y + 130);
  vertex(x + 10, y + 130);
  endShape();

  // bottom
  fill(178, 44, 44);
  rect(x - 30, y + 125, 60, 17, 10);

  beginShape();
  fill(18, 44, 44);
  ellipse(x - 60, y + 140, 10);
  ellipse(x + 60, y + 140, 10);

  //left
  fill(178, 44, 44);
  vertex(x - 40, y + 110);
  bezierVertex(x - 40, y + 110, x - 50, y + 110, x - 55, y + 130);
  vertex(x - 55, y + 140);
  vertex(x - 65, y + 140);
  bezierVertex(x - 65, y + 140, x - 80, y + 100, x - 50, y + 70);
  vertex(x - 50, y + 70);

  //right
  vertex(x + 40, y + 110);
  bezierVertex(x + 40, y + 110, x + 50, y + 110, x + 55, y + 130);
  vertex(x + 55, y + 140);
  vertex(x + 65, y + 140);
  bezierVertex(x + 65, y + 140, x + 80, y + 100, x + 50, y + 70);
  vertex(x + 50, y + 70);

  endShape();

  //body
  fill(110, 44, 44);
  beginShape();
  vertex(x, y - 90);
  bezierVertex(x, y - 100, x - 110, y, x - 30, y + 130);
  vertex(x - 30, y + 130);
  vertex(x + 30, y + 130);
  bezierVertex(x + 30, y + 130, x + 110, y + 10, x, y - 90);
  vertex(x, y - 90);
  endShape();

  // window

  fill(18, 44, 44);
  ellipse(x, y, 60);

  // window
  fill(176, 196, 222);
  ellipse(x, y, 50);

  //top
  fill(178, 44, 44);
  beginShape();
  vertex(x - 30, y - 60);
  bezierVertex(x - 40, y - 50, x - 10, y - 90, x, y - 90);
  vertex(x, y - 90);
  bezierVertex(x, y - 90, x + 10, y - 90, x + 30, y - 60);
  vertex(x + 30, y - 60);
  bezierVertex();
  vertex(x - 30, y - 60);
  endShape();
}

/*
  function draw() {
    rocket(150, 200);
  }
  */

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

function BeigePlanet(x, y) {
  // beige planet
  strokeWeight(1);
  fill(150, 128, 108);
  ellipse(x - 100, y - 70, 170);
}

function ground(x, y) {
  fill(200, 200, 200);
  rect(x, y, 800, 500);
  // crash zone
  triangle(x, y - 200, x + 200, y, x, y);
  triangle(x + 600, y, x + 800, y - 350, x + 800, y);
  triangle(x + 200, y - 100, x + 100, y, x + 300, y);
  fill(150, 150, 150);
  ellipse(x + 200, y + 50, 100, 50);
  ellipse(x + 350, y + 70, 70, 30);
  ellipse(x + 600, y + 40, 70, 30);
  ellipse(x + 50, y + 90, 130, 50);
  ellipse(x + 700, y + 90, 130, 50);
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

let rocketY = 150;
let rocketX = 400;
let velocity = 1;
let acceleration = 0.2;
let isGameActive = true;

function startScreen() {
  noStroke();
  background(0, 0, 0);

  for (let index in starX) {
    fill(255, 255, 255, Math.abs(Math.sin(starAlpha[index])) * 255);
    ellipse(starX[index], starY[index], 2);

    starAlpha[index] = starAlpha[index] + 0.02;
  }

  fill(255, 255, 255);
  textSize(40);
  text("Click to start", 300, 300);
}

function gameScreen() {
  noStroke();
  background(0, 0, 0);

  for (let index in starX) {
    fill(255, 255, 255, Math.abs(Math.sin(starAlpha[index])) * 255);
    ellipse(starX[index], starY[index], 2);

    starAlpha[index] = starAlpha[index] + 0.02;
  }

  bluePlanet(650, 150);
  redPlanet(200, 250);
  BeigePlanet(200, 180);
  ground(0, 700);
  rocket(rocketX, rocketY);
  rocketY = rocketY + velocity;
  velocity = velocity + acceleration;
}

function resultScreen() {
  noStroke();
  background(0, 0, 0);

  for (let index in starX) {
    fill(255, 255, 255, Math.abs(Math.sin(starAlpha[index])) * 255);
    ellipse(starX[index], starY[index], 2);

    starAlpha[index] = starAlpha[index] + 0.02;
  }

  fill(255, 255, 255);
  textSize(40);
  text("Your landed safely!", 400, 300);
}

let state = "start";
/*
  function draw() {
    if (state === "start") {
      startScreen();
    } else if (state === "game") {
      gameScreen();
    } else if (state === "result") {
      resultScreen();
    }
  }
  */

function mouseClicked() {
  if (state === "start") {
    state = "game";
  } else if (state === "game") {
    state = "result";
  } else if (state === "result") {
    state = "start";
  }
}

function draw() {
  if (state === "start") {
    startScreen();
  }
  if (isGameActive && state === "game") {
    gameScreen();
  } else if (isGameActive === false && state === "result") {
    resultScreen();
  }
}

/*
  if (isGameactive) {
    rocketY = rocketY + velocity;
    velocity = velocity + acceleration;
  }
  if (rocketY > 700) {
    isGameActive = false;
  }
  if (rocketX < 250 && rocketX > 600) {
    isGameActive = false;
  }
  */
