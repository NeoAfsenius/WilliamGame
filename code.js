import {spawnBird} from "./spawn.js"
import {Ball,Bird,Level} from "./classes.js";
import {keys, mouse , isLeftMouseDown,forceMouseDown,shopMenu, mouseX, mouseY,ballToMouseAngle,balltoMouseX,balltoMousey,allInputDocument, hasABallBeenShotThisClick, setHasBallBeenShot} from "./input.js"
export {birdGone,birdList,currentlevel,levelIsOn,randomIntFromRange}
console.log("sigma boi");
let canvas = document.querySelector("canvas");
allInputDocument(canvas)
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = "100%";
canvas.style.height = "100%";

const c = canvas.getContext("2d");
const grassImage = new Image();

grassImage.src = "./img/grass.png"
const skyImage = new Image()

skyImage.src = "./img/sky.png"
const characterImage = new Image()

characterImage.src = "./img/character.png"
export const basicBallImage = new Image()

basicBallImage.src = "./img/basicball.png"
export const birdImage1 =  new Image()

birdImage1.src = "./img/bird1.png"
export const birdImage2 =  new Image()

birdImage2.src = "./img/bird2.png"
export const deadBird =  new Image()

deadBird.src = "./img/deadbird.png"


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
export function changeLevelValue() {
  levelIsOn = !levelIsOn
}
//random number generator, mindre matte i koden
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
console.log(
  `Bredd på canvas: ${canvas.width},
  Höjd på canvas: ${canvas.height}`
);


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
let currentMaxBulletsPerLevel = 30
let currentBulletAmount = 30
spawnBird();

function drawBase() {
  if (levelIsOn === false && birdGone >= currentlevel.maxBirdListLength && shopMenu === false) {
    drawLevelScreen();
    if (keys.Enter) {
      levelNumber += 1;
      currentlevel = new Level(levelNumber);
      birdGone = 0;
      levelIsOn = true;
      currentBulletAmount = currentMaxBulletsPerLevel
      spawnBird();
    }
  } else if (shopMenu === true ) {
    c.clearRect(0, 0, canvas.width, canvas.height);
  } else {
    drawBasicGameScreen();
    if (isLeftMouseDown === true && hasABallBeenShotThisClick === false && currentBulletAmount > 0) {
      const newBall = new Ball(true, 230, canvas.height - canvas.height / 10 - 100, "grey", 5, 0.2, ballToMouseAngle);
      ballList.push(newBall);
      setHasBallBeenShot(true) // ändrar värdet på hasABallBeenShotThisClick genom att använda en function då när man importar skapas den som en const
      currentBulletAmount -= 1
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
  if (skyImage.complete) {
    c.drawImage(skyImage,0,0,canvas.width,canvas.height)
  }
  if (grassImage.complete) {
    c.drawImage(grassImage,0,canvas.height-canvas.height/10-20,canvas.width,canvas.height/10 + 20)
  } else{
    c.clearRect(0, 0, canvas.width, canvas.height); //resettar hela skärmen
    c.fillStyle = "green";
  }
  c.font = "16px 'Press Start 2P'";
  c.fillStyle = "lime"
  c.fillText("Dollares:$" + dollares  + "$", 20, 20);
  c.fillStyle = "silver"
  c.fillText("Current Bullets:" + currentBulletAmount, 20, 40)
  c.fillStyle = "yellow"
  c.font = "24px 'Press Start 2P'" 
  c.fillText("Current Level Is:" + levelNumber, canvas.width/2,40)
  if (characterImage.complete) {
    c.drawImage(characterImage,100, canvas.height - canvas.height / 10 - 170, 200, 200)
  }
//   c.fillStyle = "black";
//   c.fillRect(200, canvas.height - canvas.height / 10 - 100, 30, 100);
}
