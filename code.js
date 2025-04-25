console.log("sigma boi");
let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = "100%";
canvas.style.height = "100%";

const c = canvas.getContext("2d");

//random number generator, mindre matte i koden
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

document.addEventListener("mousedown", function (event) {
  if (event.button === 0 && forceMouseDown === false) {
    // 0 is the left mouse button
    console.log("Mouse X:", event.clientX, "Mouse Y:", event.clientY);
    MouseX = event.clientX;
    MouseY = event.clientY;
    BalltoMouseX = MouseX - 230;
    BalltoMousey = MouseY - (canvas.height - canvas.height / 10 - 100);
    BallToMouseAngle = Math.atan2(BalltoMousey, BalltoMouseX);
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
document.addEventListener("mousemove", function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

class ball {
  constructor(active, x, y, material, radius, grav /*Neo tyckte det var coolt*/, angle) {
    this.totalVelocity = Math.sqrt(15 ** 2 + 15 ** 2); //ger hypotenusa
    this.xvelocity = Math.cos(angle) * this.totalVelocity; //ger oss x kated
    this.yvelocity = Math.sin(angle) * this.totalVelocity; //ger oss y kated
    this.active = false;
    this.x = x;
    this.y = y;
    this.material = material;
    this.radius = radius;
    this.grav = grav;
  }
  update() {
    //uppdaterar bollen rörelse
    this.yvelocity += this.grav; // Kör gravitation
    this.y += this.yvelocity; // Rör bollen ner
    let ground = canvas.height - canvas.height / 10 - this.radius;
    if (this.y >= ground) {
      this.y = ground; //gör så att den hamnar på marken även om den är någon pixel nere egentligen
      this.yvelocity = -this.yvelocity * 0.7; //gör så att marken ger energiförlust för y-axel och vänder på riktningen så att den åker upp igen
      this.xvelocity = this.xvelocity * 0.7; //gör så att marken ger energiförlust för x-axel
    }
    this.x += this.xvelocity; // Rör bollen sidleds
    this.xvelocity = this.xvelocity * 0.9999; //gör vindmotstånd
  }
  draw() {
    c.fillStyle = this.material;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
    c.stroke();
  }
}
class bird {
  constructor(active, x, y) {
    this.xvelocity = -randomIntFromRange(5, 9);
    this.yvelocity = 0;
    this.x = x;
    this.y = y;
    this.sinAngle = 0;
    this.active = true;
    this.material = "red";
    this.markForDespawn = false;
    this.timeSinceDewspawnMark = 0;
    this.outsideMark = false;
  }
  update() {
    if (this.hasSineWave === true) {
      this.sinAngle += this.waveSpeed;
      this.y = this.baseY + Math.sin(this.sinAngle) * this.waveAmp;
    } else {
      this.y += this.yvelocity;
    }
    let ground = canvas.height - canvas.height / 10 - 30;
    this.x += this.xvelocity; // Rör bollen sidleds

    if (this.y >= ground) {
      this.yvelocity = 0;
      this.y = ground;
    }

    for (let i = 0; i < ballList.length; i++) {
      //Hitbox koll om
      const element = ballList[i];
      if (this.x - 15 < element.x && this.x + 45 > element.x && this.y - 15 < element.y && this.y + 45 > element.y && this.markForDespawn === false) {
        this.xvelocity = 0;
        this.yvelocity = 10;
        ballList.splice(i, 1);
        this.hasSineWave = false;
        this.markForDespawn = true;
        if (this.hasSineWave === true) {
          dollares += 20
        } else {
          dollares += 10
        }
      }
    }
    if (this.x <= -31) {
      this.xvelocity = 0;
      this.x = 300;
      this.y = -800;
      this.yvelocity = 0;
      birdMissed.push("kuk");
      birdGone += 1;
      console.log("gone");
      this.outsideMark = true;
      if (this.hasSineWave===true) {
        dollares-=10
      } else {
        dollares -= 5
      }
      this.hasSineWave = false;
    }
  }
  draw() {
    c.fillStyle = "black";
    c.fillRect(this.x, this.y, 30, 30);
  }
}
class level {
  constructor(level) {
    this.level = level;
    this.maxBirdListLength = Math.ceil(3 + 2.5 * Math.log2(level + 1)); //kurva för fåglar som bestämmer mängd per level
    if (this.level > 3) {
      this.movingBirds = true;
    } else {
      this.movingBirds = false;
      console.log("tihi");
    }
    this.levelIsOn = true;
  }
}
let keys = {
  //ska användas för att eventuellt använda b och w som knappar för köp och fire
  b: false,
  w: false,
};

document.onkeydown = function (e) {
  console.log(e); //Inparametern e innehåller ett event-objekt med information om eventet.
  const key = e.key;
  keys[key] = true; // Sätter t.ex. keys.w till true
};

document.onkeyup = function (e) {
  const key = e.key;
  keys[key] = false;
};
var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

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
      spawnOrNo = randomIntFromRange(1, 3);
      if (spawnOrNo === 1) {
        setTimeout(() => {
          // => betyder att du skapar en function utan namn som du bara kan använda för detta tilfälle
          var newBird = new bird(true, canvas.width + 50, randomIntFromRange(canvas.height - 200, 200));
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
          var newBird = new bird(true, canvas.width + 50, randomIntFromRange(50, canvas.height - canvas.height / 10 - 30));
          birdList.push(newBird);
          console.log(birdList);
          SpawnBird();
        }, randomDelay); //keep spawning the bird
      }
    } else {
      setTimeout(() => {
        // => betyder att du skapar en function utan namn som du bara kan använda för detta tilfälle
        var newBird = new bird(true, canvas.width + 50, randomIntFromRange(50, canvas.height - canvas.height / 10 - 30));
        birdList.push(newBird);
        console.log(birdList);
        SpawnBird();
      }, randomDelay); //keep spawning the bird
    }
  } else {
    setTimeout(SpawnBird, 500);
  }
}

let isLeftMouseDown = false;
let ballList = [];
let birdList = [];
let birdMissed = [];
let birdGone = 0;
let birdHit = birdList.length - birdMissed.length;
let hasABallBeenShotThisClick = false;
let forceMouseDown = false;
let movingBirds = true;
let levelIsOn = true;
let levelNumber = 1;
let currentlevel = new level(1);
let dollares = 0
let shopMenu = false
SpawnBird();

function drawBase() {
  if (levelIsOn === false && birdGone >= currentlevel.maxBirdListLength && shopMenu === false) {
    c.clearRect(0, 0, canvas.width, canvas.height); //resettar hela skärmen
    ballList = [];
    birdList = [];
    c.fillStyle = "grey";
    c.fillRect(0, canvas.height - canvas.height / 2, canvas.width, canvas.height / 3);

    c.fillStyle = "grey";
    c.font = "30px Arial";
    c.fillText("Press Enter to go to the next level", 100, canvas.height / 2);

    if (keys.Enter) {
      levelNumber += 1;
      currentlevel = new level(levelNumber);
      birdGone = 0;
      levelIsOn = true;
      SpawnBird();
    } else if (keys.b || keys.B || shopMenu === true) {
      shopMenu = true
    }
  }else if (shopMenu === true) {
    c.clearRect(0, 0, canvas.width, canvas.height)
  } else {
    c.clearRect(0, 0, canvas.width, canvas.height); //resettar hela skärmen
    c.fillStyle = "green";
    c.fillRect(0, canvas.height - canvas.height / 10, canvas.width, canvas.height / 10);
    c.fillText("Dollares:" + dollares, 20, 20);

    c.fillStyle = "black";
    c.fillRect(200, canvas.height - canvas.height / 10 - 100, 30, 100);

    if (isLeftMouseDown === true && hasABallBeenShotThisClick === false) {
      const newBall = new ball(true, 230, canvas.height - canvas.height / 10 - 100, "grey", 5, 0.2, BallToMouseAngle);
      ballList.push(newBall);
      hasABallBeenShotThisClick = true;
      if (ballList.length > 20) {
        ballList.splice(0, 1);
      }
    }
    ballList.forEach((balls) => {
      //gör dessa två functioner för alla elements i listan
      balls.update();
      balls.draw();
    });
    birdList.forEach((bird) => {
      //gör dessa två functioner för alla elements i listan
      bird.update();
      bird.draw();
      if (bird.markForDespawn === true) {
        bird.timeSinceDewspawnMark += 1; //antar att den kör 60fps
        if (bird.timeSinceDewspawnMark > 180) {
          bird.xvelocity = 0;
          bird.hasSineWave = false;
          bird.x = 300;
          bird.y = -800;
          bird.yvelocity = 0;
          birdGone+=1
          bird.markForDespawn = false
        }
      }
    });
  }
  window.requestAnimationFrame(drawBase);
}
window.requestAnimationFrame(drawBase);

document.onkeydown = function (e) {
  console.log(e); //Inparametern e innehåller ett event-objekt med information om eventet.
  const key = e.key;
  keys[key] = true; // Sätter t.ex. keys.w till true
};

function deletingTheBirds(object) {
  birdGone += 1
  object.x = canvas.width/2
  object.y = canvas.height+10000

}

