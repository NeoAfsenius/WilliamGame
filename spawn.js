import {birdList, currentlevel, levelIsOn, randomIntFromRange, changeLevelValue,gameState } from "./code.js";
import { Bird } from "./classes.js";

export function spawnBird() {
  if (gameState.birdGone >= currentlevel.maxBirdListLength) {
    changeLevelValue();
  } else if (birdList.length < currentlevel.maxBirdListLength) {
    console.log(currentlevel.maxBirdListLength);
    const randomDelay = randomIntFromRange(1000, 3000); //random sekund mellan 1-3
    if (currentlevel.movingBirds === true) {
      let spawnOrNo = randomIntFromRange(1, 3);
      if (spawnOrNo === 1) {
        setTimeout(spawnMovingBird, randomDelay); //keep spawning the bird
      } else {
        setTimeout(spawnNormalBird, randomDelay); //keep spawning the bird
      }
    } else {
      setTimeout(spawnNormalBird, randomDelay); //keep spawning the bird
    }
  } else {
    setTimeout(spawnBird, 500);
  }
}
function spawnNormalBird() {
  var newBird = new Bird(true, canvas.width + 50, randomIntFromRange(50, canvas.height - canvas.height / 10 - 30));
  birdList.push(newBird);
  console.log(birdList);
  spawnBird();
}
function spawnMovingBird() {
  var newBird = new Bird(true, canvas.width + 50, randomIntFromRange(canvas.height - 200, 200));
  newBird.baseY = newBird.y; //är startpunkt i y-axel
  newBird.waveSpeed = 0.05 + Math.random() * 0.1; //hastighet
  newBird.waveAmp = 30 + Math.random() * 20; //amplitud
  newBird.hasSineWave = true;
  birdList.push(newBird);
  console.log("moving");
  spawnBird();
}
