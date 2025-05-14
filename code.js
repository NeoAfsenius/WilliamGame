import { spawnBird } from "./spawn.js";
import { Ball, Level } from "./classes.js";
import { keys, isLeftMouseDown, shopMenu, ballToMouseAngle, allInputDocument, hasABallBeenShotThisClick, setHasBallBeenShot } from "./input.js";
export { birdList, randomIntFromRange };
console.log("sigma boi");
let canvas = document.querySelector("canvas");
allInputDocument(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = "100%";
canvas.style.height = "100%";

const c = canvas.getContext("2d");
const grassImage = new Image();
grassImage.src = "./img/grass.png";

const skyImage = new Image();
skyImage.src = "./img/sky.png";

const characterImage = new Image();
characterImage.src = "./img/character.png";

export const basicBallImage = new Image();
basicBallImage.src = "./img/basicball.png";

export const birdImage1 = new Image();
birdImage1.src = "./img/bird1.png";

export const birdImage2 = new Image();
birdImage2.src = "./img/bird2.png";

export const deadBird = new Image();
deadBird.src = "./img/deadbird.png";

export const shop = new Image();
shop.src = "./img/shop.png";

//dessa functioner används för att ändra värden på variablar som gör till constanter vid import
//random number generator, mindre matte i koden
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
console.log(
  `Bredd på canvas: ${canvas.width},
  Höjd på canvas: ${canvas.height}`
);
function centerTextOnXaxis(text, height) {
  const textWidth = c.measureText(text).width;
  c.fillText(text, (canvas.width - textWidth) / 2, height);
}
export let gameState = {
  dollares: 10,
  birdGone: 0,
  levelNumber: 1,
  currentMaxBulletsPerLevel: 20,
  currentBulletAmount: 20,
  currentGravity: 0.2,
  levelIsOn: true,
  startScreen: true,
  currentLevel: new Level(1),
  gameOver: false,
};
export let inventory = {
  amountOfBiggerBallsack: 0,
  zeroGraaavBought: false,
  zeroGraaavEquipped: false,
  reverseGraavBought: false,
  reverseGraavEquipped: false,
  normalGraavBought: false,
};

let ballList = [];
let birdList = [];
let birdMissed = [];

function drawBase() {
  if (gameState.startScreen === true) {
    drawLevelScreen();
    if (keys.Enter) {
      gameState.startScreen = false;
      spawnBird();
    }
  } else if (gameState.gameOver === false && gameState.levelIsOn === false && gameState.birdGone >= gameState.currentLevel.maxBirdListLength && shopMenu === false) {
    drawLevelScreen();
    if (keys.Enter) {
      gameState.levelNumber += 1;
      gameState.currentLevel = new Level(gameState.levelNumber);
      gameState.birdGone = 0;
      gameState.levelIsOn = true;
      gameState.currentBulletAmount = gameState.currentMaxBulletsPerLevel;
      spawnBird();
    }
  } else if (shopMenu === true) {
    drawShop();
  } else if (gameState.dollares < 0) {
    drawGameOver();
    gameState.gameOver = true;
  } else {
    drawBasicGameScreen();
    if (gameState.gameOver === false && isLeftMouseDown === true && hasABallBeenShotThisClick === false && gameState.currentBulletAmount > 0) {
      const newBall = new Ball(true, 230, canvas.height - canvas.height / 10 - 100, "grey", 5, gameState.currentGravity, ballToMouseAngle);
      ballList.push(newBall);
      setHasBallBeenShot(true); // ändrar värdet på hasABallBeenShotThisClick genom att använda en function då när man importar skapas den som en const
      gameState.currentBulletAmount -= 1;
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
      Bird.update(canvas, ballList, birdMissed);
      Bird.draw(c);
      if (Bird.markForDespawn === true) {
        Bird.timeSinceDewspawnMark += 1; //antar att den kör 60fps
        if (Bird.timeSinceDewspawnMark > 180) {
          Bird.xvelocity = 0;
          Bird.hasSineWave = false;
          Bird.x = 300;
          Bird.y = -800;
          Bird.yvelocity = 0;
          gameState.birdGone += 1;
          Bird.markForDespawn = false;
        }
      }
    });
  }
  window.requestAnimationFrame(drawBase);
}
window.requestAnimationFrame(drawBase);

function drawLevelScreen() {
  c.clearRect(0, 0, canvas.width, canvas.height); //resettar hela skärmen
  ballList = [];
  birdList = [];

  if (skyImage.complete) {
    c.drawImage(skyImage, 0, 0, canvas.width, canvas.height);
  }

  if (grassImage.complete) {
    c.drawImage(grassImage, 0, canvas.height - canvas.height / 10 - 20, canvas.width, canvas.height / 10 + 20);
  }

  if (characterImage.complete) {
    c.drawImage(characterImage, 100, canvas.height - canvas.height / 10 - 170, 200, 200);
  }

  c.fillStyle = "gold";
  const startText1 = "Press Enter to start/continue the game";
  c.font = "30px 'Press Start 2P'";
  centerTextOnXaxis(startText1, canvas.height / 2);
  const startText2 = "REMINDER you can press B at anytime to enter the shop";
  c.font = "20px 'Press Start 2P'";
  centerTextOnXaxis(startText2, canvas.height / 2 + 40);
  const percentView = ("Use 80% viewheight for best experience")
  centerTextOnXaxis(percentView, canvas.height/2+95)
}

function drawBasicGameScreen() {
  c.clearRect(0, 0, canvas.width, canvas.height); //resettar hela skärmen
  if (skyImage.complete) {
    c.drawImage(skyImage, 0, 0, canvas.width, canvas.height);
  }
  if (grassImage.complete) {
    c.drawImage(grassImage, 0, canvas.height - canvas.height / 10 - 20, canvas.width, canvas.height / 10 + 20);
  } else {
    c.clearRect(0, 0, canvas.width, canvas.height); //resettar hela skärmen
    c.fillStyle = "green";
  }
  c.font = "16px 'Press Start 2P'";
  c.fillStyle = "lime";
  c.fillText("Dollares:$" + gameState.dollares + "$", 20, 20);
  c.fillStyle = "silver";
  c.fillText("Current Bullets:" + gameState.currentBulletAmount, 20, 40);
  c.fillStyle = "yellow";
  c.font = "24px 'Press Start 2P'";
  const currentLevelText = "Current Level Is:" + gameState.levelNumber;
  centerTextOnXaxis(currentLevelText, 40);
  c.drawImage(characterImage, 100, canvas.height - canvas.height / 10 - 170, 200, 200);
  //   c.fillStyle = "black";
  //   c.fillRect(200, canvas.height - canvas.height / 10 - 100, 30, 100);
}
function drawShop() {
  if (shop.complete) {
    c.drawImage(shop, 0, -151);
    c.drawImage(shop, 1400, -151);
  }
  c.fillStyle = "yellow";
  c.font = "16px 'Press Start 2P'";
  c.fillText("Press 1 to Increase Ballsack by 10", 240, 180);
  c.fillText("Cost: " + (10 + inventory.amountOfBiggerBallsack * 10) + " Dollares", 240, 200);
  c.fillText("Press 2 to Buy Zero Graaaav Ball", 240, 350);
  c.fillText("Cost: 100 Dollares", 240, 370);
  c.fillText("Press 3 to Buy Reverse Graaaav Ball", 240, 520);
  c.fillText("Cost: 100 Dollares", 240, 540);
  c.fillText("Press 4 to Buy Normal Graaav Ball", 240, 690);
  c.fillText("Cost: 10 Dollares", 240, 710);
  c.fillText("BOUGHT ITEMS", 1640, 180);
  c.fillText("Amount Of Bigger Ballsack Bought:" + inventory.amountOfBiggerBallsack, 1640, 220);
  c.fillStyle = "lime";
  c.fillText("Current Dollares:$" + gameState.dollares + "$", 1640, 140);
  c.fillStyle = "yellow";
  c.font = "16px 'Press Start 2P'";

  if (inventory.zeroGraaavEquipped === true) {
    c.fillText("Ball Equipped: Zero Graaav", 1640, 300);
  } else if (inventory.reverseGraavEquipped === true) {
    c.fillText("Ball Equipped: Reverse Graaav", 1640, 300);
  } else {
    c.fillText("Ball Equipped: Normal Graaav", 1640, 300);
  }
}
function drawGameOver() {
  c.fillStyle = "red";
  c.font = "40px 'Press Start 2P'";
  let gameOverText = "GAME OVER";
  centerTextOnXaxis(gameOverText, canvas.height / 2);
  let GameOverTextButtonText = "Press 6 to restart";
  centerTextOnXaxis(GameOverTextButtonText, canvas.height / 2 + 50);
}
