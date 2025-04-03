console.log("sigma boi");
let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = "100%";
canvas.style.height = "100%";

const c = canvas.getContext("2d");

class ball {
  constructor(name, x, y, material, speed, radius, grav /*Neo tyckte det var coolt*/) {
    this.velocity = 0;
    this.name = false;
    this.x = x;
    this.y = y;
    this.material = material;
    this.speed = speed;
    this.radius = radius;
    this.grav = grav;
  }
  update() {
    //uppdaterar bollen rörelse
    this.velocity += this.grav; // Kör gravitation
    this.y += this.velocity; // Rör bollen ner

    let marken = canvas.height - canvas.height / 10 - this.radius;

    if (this.y >= marken) {
      this.y = marken;
      this.velocity = -this.velocity * 0.9;
    }
  }
  draw() {
    c.fillstyle = "black";
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
    c.stroke();
  }
}
const SteelBallSpawn = new ball(
  Steelball,
  230,
  canvas.height - canvas.height / 10 - 100,
  "grey",
  10,
  20,
  1 //gravity multiplier
);

console.log(SteelBallSpawn);

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

document.addEventListener("mousedown", function (event) {
  if (event.button === 0) {
    // 0 is the left mouse button
    console.log("Mouse X:", event.clientX, "Mouse Y:", event.clientY);
    isLeftMouseDown = true; //left button pressed
    console.log(isLeftMouseDown);
  }
});

document.addEventListener("mouseup", function (event) {
  if (event.button === 0) {
    // 0 is the left mouse button
    // Left mouse button released
    isLeftMouseDown = false;
    console.log(isLeftMouseDown);
  }
});
document.addEventListener("mousemove", function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
//random number generator, mindre matte i koden
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

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
let OnOther = false;
let isLeftMouseDown = false;
let BallList = [];
SteelBallSpawn.Steelball = true;

function drawBase() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "green";
  c.fillRect(0, canvas.height - canvas.height / 10, canvas.width, canvas.height / 10);

  c.fillStyle = "black";
  c.fillRect(200, canvas.height - canvas.height / 10 - 100, 30, 100);

  if (isLeftMouseDown === true && OnOther === false && SteelBallSpawn === true) {
    /*Kollar om musen är i pekad och att den ingen meny är i klickad */
    SteelBallSpawn.draw
    BallList.push(SteelBallSpawn)
  }
  SteelBallSpawn.update();
  SteelBallSpawn.draw();
  window.requestAnimationFrame(drawBase);
}
window.requestAnimationFrame(drawBase);

document.onkeydown = function (e) {
  console.log(e); //Inparametern e innehåller ett event-objekt med information om eventet.
  const key = e.key;
  keys[key] = true; // Sätter t.ex. keys.w till true
};
