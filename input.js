import { inventory,gameState, currentlevel } from "./code.js";
export let keys = {}; //En lista som håller kolla på alla aktiva och deaktiva knappar
export let mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

export let hasABallBeenShotThisClick = false;
export let isLeftMouseDown = false;
export let forceMouseDown = false;
export let isBKeyPressed = false;
export let is1KeyPressed = false;
export let is2KeyPressed = false;
export let is3KeyPressed = false;
export let is4KeyPressed = false;
export let is5KeyPressed = false;
export let is6KeyPressed = false;
export let shopMenu = false;
export let ballToMouseAngle = 0; //måste sätta värde på allt med mouse för annars krånglar det med import osv
export let balltoMouseX = 0;
export let balltoMousey = 0;
export let mouseX = 0;
export let mouseY = 0;

export function setHasBallBeenShot(value) {
  //function för att ändra värde på variablen när den senare blir en const via import
  hasABallBeenShotThisClick = value;
}
export function allInputDocument(canvas) {
  //kopplar alla input varianter och kallar de så att de är aktiva
  document.addEventListener("mousedown", function (event) {
    if (event.button === 0 && forceMouseDown === false) {
      // 0 is the left mouse button
      console.log("Mouse X:", event.clientX, "Mouse Y:", event.clientY);
      mouseX = event.clientX;
      mouseY = event.clientY;
      balltoMouseX = mouseX - 230;
      balltoMousey = mouseY - (canvas.height - canvas.height / 10 - 100);
      ballToMouseAngle = Math.atan2(balltoMousey, balltoMouseX);
      isLeftMouseDown = true; //left button pressed
      forceMouseDown = true;
    }
  });
  document.addEventListener("mouseup", function (event) {
    if (event.button === 0) {
      // 0 is the left mouse button
      // Left mouse button released
      isLeftMouseDown = false;
      console.log(isLeftMouseDown);
      forceMouseDown = false;
      hasABallBeenShotThisClick = false;
    }
  });
  document.addEventListener("keydown", function (event) {
    keys[event.key] = true;
    console.log(keys);
    if ((event.key === "b" || event.key === "B") && isBKeyPressed === false) {
      shopMenu = !shopMenu; // flippar på booliska värdet
      isBKeyPressed = true;
    } else if (event.key === "1" && is1KeyPressed === false) {
      is1KeyPressed = true;
      if (shopMenu === true && gameState.dollares >= (10+inventory.amountOfBiggerBallsack*10)) {
        gameState.dollares -= (10+inventory.amountOfBiggerBallsack*10)
        gameState.currentMaxBulletsPerLevel += 10
        gameState.currentBulletAmount += 10
        inventory.amountOfBiggerBallsack += 1
      }
    } else if (event.key === "2" && is2KeyPressed === false) {
      is2KeyPressed = true;
      if (shopMenu === true && gameState.dollares >= 100 && inventory.zeroGraaavBought === false) {
        gameState.dollares -= 100
        gameState.currentGravity = 0
        inventory.zeroGraaavEquipped = true
        inventory.zeroGraaavBought = true
        inventory.reverseGraavEquipped = false
      }
    } else if (event.key === "3" && is3KeyPressed === false) {
      is3KeyPressed = true;
      if (shopMenu === true && gameState.dollares >= 100 && inventory.reverseGraavBought === false) {
        gameState.dollares -= 100
        gameState.currentGravity = -0.3
        inventory.reverseGraavEquipped = true
        inventory.reverseGraavBought = true
        inventory.zeroGraaavEquipped = false
      }
    } else if (event.key === "4" && is4KeyPressed === false) {
      is4KeyPressed = true;
      if (shopMenu === true && gameState.dollares >= 10 && inventory.normalGraavBought === false) {
        gameState.dollares -= 10
        gameState.currentGravity = 0.2
        inventory.zeroGraaavEquipped = false
        inventory.reverseGraavEquipped = false
      }
    } else if (event.key === "5" && is5KeyPressed === false) {
      is5KeyPressed = true;
      console.log(gameState.birdGone)
      console.log(currentlevel.maxBirdListLength)
      console.log(gameState.levelIsOn)
      console.log(shopMenu)
    } else if (event.key === "6" && is6KeyPressed === false) {
      is6KeyPressed = true;
    }
  });
  document.addEventListener("keyup", function (event) {
    keys[event.key] = false;
    if (event.key === "b" || event.key === "B") {
      isBKeyPressed = false;
    } else if (event.key === "1") {
      is1KeyPressed = false;
    } else if (event.key === "2") {
      is2KeyPressed = false;
    } else if (event.key === "3") {
      is3KeyPressed = false;
    } else if (event.key === "4") {
      is4KeyPressed = false;
    } else if (event.key === "5") {
      is5KeyPressed = false;
    } else if (event.key === "6") {
      is6KeyPressed = false;
    }
  });

  document.addEventListener("mousemove", function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  });
}
