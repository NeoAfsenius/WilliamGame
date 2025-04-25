import {Ball,Bird,Level} from "./classes.js";
import {keys, mouse , isLeftMouseDown,forceMouseDown,shopMenu, mouseX, mouseY,ballToMouseAngle,balltoMouseX,balltoMousey,allInputDocument, hasABallBeenShotThisClick, setHasBallBeenShot} from "./input.js"
console.log("sigma boi");
let canvas = document.querySelector("canvas");
allInputDocument(canvas)
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = "100%";
canvas.style.height = "100%";
const backGroundImage = new Image()
backGroundImage.src = ""
const c = canvas.getContext("2d");

//dessa functioner används för att ändra värden på variablar som gör till constanter vid import
function increaseDollares(amount) { 
  dollares += amount
}
function decreaseDollares(amount) {
  dollares -= amount
}
function birdGoneAdder() {
  birdGone += 1
}
//random number generator, mindre matte i koden
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
console.log(
  `Bredd på canvas: ${canvas.width},
  Höjd på canvas: ${canvas.height}`
);
function SpawnBird() {
  if (birdGone >= currentlevel.maxBirdListLength) {
    levelIsOn = false;
  } else if (birdList.length < currentlevel.maxBirdListLength) {
    console.log(currentlevel.maxBirdListLength);
    const randomDelay = randomIntFromRange(1000, 3000); //random sekund mellan 1-3
    if (currentlevel.movingBirds === true) {
      let spawnOrNo = randomIntFromRange(1, 3);
      if (spawnOrNo === 1) {
        setTimeout(() => {
          // => betyder att du skapar en function utan namn som du bara kan använda för detta tilfälle
          var newBird = new Bird(true, canvas.width + 50, randomIntFromRange(canvas.height - 200, 200));
          newBird.baseY = newBird.y; //är startpunkt i y-axel
          newBird.waveSpeed = 0.05 + Math.random() * 0.1; //hastighet
          newBird.waveAmp = 30 + Math.random() * 20; //amplitud
          newBird.hasSineWave = true;
          birdList.push(newBird);
          console.log("moving");
          SpawnBird();
        }, randomDelay); //keep spawning the bird
      } else {
        setTimeout(() => {
          // => betyder att du skapar en function utan namn som du bara kan använda för detta tilfälle
          var newBird = new Bird(true, canvas.width + 50, randomIntFromRange(50, canvas.height - canvas.height / 10 - 30));
          birdList.push(newBird);
          console.log(birdList);
          SpawnBird();
        }, randomDelay); //keep spawning the bird
      }
    } else {
      setTimeout(() => {
        // => betyder att du skapar en function utan namn som du bara kan använda för detta tilfälle
        var newBird = new Bird(true, canvas.width + 50, randomIntFromRange(50, canvas.height - canvas.height / 10 - 30));
        birdList.push(newBird);
        console.log(birdList);
        SpawnBird();
      }, randomDelay); //keep spawning the bird
    }
  } else {
    setTimeout(SpawnBird, 500);
  }
}

let ballList = [];
let birdList = [];
let birdMissed = [];
let birdGone = 0;
let birdHit = birdList.length - birdMissed.length;
let movingBirds = true;
let levelIsOn = true;
let levelNumber = 1;
let currentlevel = new Level(1);
let dollares = 0;
SpawnBird();

function drawBase() {
  if (levelIsOn === false && birdGone >= currentlevel.maxBirdListLength && shopMenu === false) {
    drawLevelScreen();
    if (keys.Enter) {
      levelNumber += 1;
      currentlevel = new Level(levelNumber);
      birdGone = 0;
      levelIsOn = true;
      SpawnBird();
    }
  } else if (shopMenu === true) {
    c.clearRect(0, 0, canvas.width, canvas.height);

  } else {
    drawBasicGameScreen();
    if (isLeftMouseDown === true && hasABallBeenShotThisClick === false) {
      const newBall = new Ball(true, 230, canvas.height - canvas.height / 10 - 100, "grey", 5, 0.2, ballToMouseAngle);
      ballList.push(newBall);
      setHasBallBeenShot(true) // ändrar värdet på hasABallBeenShotThisClick genom att använda en function då när man importar skapas den som en const
      if (ballList.length > 20) {
        ballList.splice(0, 1);
      }
    }
    ballList.forEach((Balls) => {
      //gör dessa två functioner för alla elements i listan
      Balls.update();
      Balls.draw(c);
    });
    birdList.forEach((Bird) => {
      //gör dessa två functioner för alla elements i listan
      Bird.update(canvas,ballList,birdMissed,increaseDollares,decreaseDollares,birdGoneAdder);
      Bird.draw(c);
      if (Bird.markForDespawn === true) {
        Bird.timeSinceDewspawnMark += 1; //antar att den kör 60fps
        if (Bird.timeSinceDewspawnMark > 180) {
          Bird.xvelocity = 0;
          Bird.hasSineWave = false;
          Bird.x = 300;
          Bird.y = -800;
          Bird.yvelocity = 0;
          birdGoneAdder()
          Bird.markForDespawn = false;
        }
      }
    });
  }
  window.requestAnimationFrame(drawBase);
}
window.requestAnimationFrame(drawBase);
function deletingTheBirds(object) {
  birdGoneAdder()
  object.x = canvas.width / 2;
  object.y = canvas.height + 10000;
}
function drawLevelScreen() {
  c.clearRect(0, 0, canvas.width, canvas.height); //resettar hela skärmen
  ballList = [];
  birdList = [];
  c.fillStyle = "grey";
  c.fillRect(0, canvas.height - canvas.height / 2, canvas.width, canvas.height / 3);

  c.fillStyle = "grey";
  c.font = "23px 'Press Start 2P'";
  c.fillText("Press Enter to go to the next level", 100, canvas.height / 2);
}
function drawBasicGameScreen() {
  c.clearRect(0, 0, canvas.width, canvas.height); //resettar hela skärmen
  c.fillStyle = "green";
  c.fillRect(0, canvas.height - canvas.height / 10, canvas.width, canvas.height / 10);
  c.font = c.font = "16px 'Press Start 2P'";
  c.fillText("Dollares: " + dollares, 20, 20);

  c.fillStyle = "black";
  c.fillRect(200, canvas.height - canvas.height / 10 - 100, 30, 100);
}
