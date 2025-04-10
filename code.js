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
  if (event.button === 0 && ForceMouseDown === false) {
    // 0 is the left mouse button
    console.log("Mouse X:", event.clientX, "Mouse Y:", event.clientY);
    MouseX = event.clientX;
    MouseY = event.clientY;
    BalltoMouseX = MouseX - 230;
    BalltoMousey = MouseY - (canvas.height - canvas.height / 10 - 100);
    BallToMouseAngle = Math.atan2(BalltoMousey, BalltoMouseX);
    isLeftMouseDown = true; //left button pressed
    ForceMouseDown = true;
  }
});

document.addEventListener("mouseup", function (event) {
  if (event.button === 0) {
    // 0 is the left mouse button
    // Left mouse button released
    isLeftMouseDown = false;
    console.log(isLeftMouseDown);
    ForceMouseDown = false;
    BallShot = false;
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
    this.sineAngle = 0;
    this.active = true;
    this.material = "red";
  }
  update() {
    if (this.hasSineWave === true){
      this.sineAngle += this.waveSpeed
      this.y = this.baseY + Math.sin(this.sineAngle) * this.waveHeight
    } 
    else{
      this.y += this.yvelocity
    }
    let ground = canvas.height - canvas.height / 10 - 30
    this.x += this.xvelocity; // Rör bollen sidleds

    if (this.y >= ground) {
      this.yvelocity = 0
      this.y = ground
    }

    for (let i = 0; i < ballList.length; i++) {
      const element = ballList[i];
      if ((this.x - 15) < element.x && (this.x + 45) > element.x && (this.y - 15) < element.y && (this.y + 45) > element.y) {
        
        this.xvelocity = 0
        this.yvelocity = 10
        ballList.splice(i, 1)
        this.hasSineWave=false
        }
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
    this.totalBird = Math.ceil(3 + 2.5 * Math.log2(level + 1));
    if (level > 3) {
      this.movingBirds = true;
    } else {
      this.movingBirds = false;
    }
    this.LevelIsOn = true;
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

let isLeftMouseDown = false;
let ballList = [];
let birdList = [];
let BallShot = false;
let ForceMouseDown = false;
let movingBirds=true

function SpawnBird() {
  const randomDelay = randomIntFromRange(1000, 3000); //random sekund mellan 1-3
  if (movingBirds=true) {
    spawnOrNo = randomIntFromRange(1,4)
    if (spawnOrNo===1){
      setTimeout(() => {
        // => betyder att du skapar en function utan namn som du bara kan använda för detta tilfälle
        var newBird = new bird(true, canvas.width + 50, randomIntFromRange(canvas.height - 200, 200));
        newBird.baseY = newBird.y
        newBird.sineAngle = Math.random() * Math.PI * 2
        newBird.waveSpeed = 0.05 + Math.random() * 0.1
        newBird.waveHeight = 30 + Math.random() * 20
        newBird.hasSineWave = true
        birdList.push(newBird)
        console.log("moving")
        SpawnBird()
      }, randomDelay); //keep spawning the bird
    }
    else{
      setTimeout(() => {
        // => betyder att du skapar en function utan namn som du bara kan använda för detta tilfälle
        var newBird = new bird(true, canvas.width + 50, randomIntFromRange(canvas.height - 200, canvas.height - 1000));
        birdList.push(newBird);
        console.log(birdList);
        SpawnBird();
      }, randomDelay); //keep spawning the bird
    }
  }
  else{
    setTimeout(() => {
      // => betyder att du skapar en function utan namn som du bara kan använda för detta tilfälle
      var newBird = new bird(true, canvas.width + 50, randomIntFromRange(canvas.height - 200, canvas.height - 1000));
      birdList.push(newBird);
      console.log(birdList);
      SpawnBird();
    }, randomDelay); //keep spawning the bird
  }
}

SpawnBird();
function drawBase() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "green";
  c.fillRect(0, canvas.height - canvas.height / 10, canvas.width, canvas.height / 10);

  c.fillStyle = "black";
  c.fillRect(200, canvas.height - canvas.height / 10 - 100, 30, 100);

  if (isLeftMouseDown === true && BallShot === false) {
    const newBall = new ball(true, 230, canvas.height - canvas.height / 10 - 100, "grey", 5, 0.2, BallToMouseAngle);
    ballList.push(newBall);
    BallShot = true;
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
    bird.update();
    bird.draw();
  });
  window.requestAnimationFrame(drawBase);
}
window.requestAnimationFrame(drawBase);

document.onkeydown = function (e) {
  console.log(e); //Inparametern e innehåller ett event-objekt med information om eventet.
  const key = e.key;
  keys[key] = true; // Sätter t.ex. keys.w till true
};
