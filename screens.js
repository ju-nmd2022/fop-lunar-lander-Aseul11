function startScreen() {
  background(0, 0, 0);
  fill(255, 255, 255);
  textSize(40);
  text("Click to start", 200, 100);
}

function gameScreen() {
  background(0, 0, 0);
  fill(255, 255, 255);
  textSize(40);
  text("Game", 200, 100);
}

function resultScreen() {
  background(0, 0, 0);
  fill(255, 255, 255);
  textSize(40);
  text("Your landed safely!", 400, 100);
}

let state = "result";

function draw() {
  if (state === "start") {
    startScreen();
  } else if (state === "game") {
    gameScreen();
  } else if (state === "result") {
    resultScreen();
  }
}

function mouseClicked() {
  if (state === "start") {
    state = "game";
  } else if (state === "game") {
    state = "result";
  } else if (state === "result") {
    state = "start";
  }
}
