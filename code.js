console.log("sigma boi");
let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = "100%";
canvas.style.height = "100%";

const c = canvas.getContext("2d");

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
    this.totalVelocity = Math.sqrt(15 ** 2 + 15 ** 2);
    this.xvelocity = Math.cos(angle) * this.totalVelocity;
    this.velocity = Math.sin(angle) * this.totalVelocity; //sätt -10 för standard
    this.active = false;
    this.x = x;
    this.y = y;
    this.material = material;
    this.radius = radius;
    this.grav = grav;
  }
  update() {
    //uppdaterar bollen rörelse
    this.velocity += this.grav; // Kör gravitation
    this.y += this.velocity; // Rör bollen ner
    let ground = canvas.height - canvas.height / 10 - this.radius;
    if (this.y >= ground) {
      this.y = ground;
      this.velocity = -this.velocity * 0.7;
      this.xvelocity = this.xvelocity * 0.7;
    }
    this.x += this.xvelocity; // Rör bollen sidleds
    this.xvelocity = this.xvelocity * 0.9999;
  }
  draw() {
    c.fillStyle = this.material;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
    c.stroke();
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
let isLeftMouseDown = false;
let BallList = [];
let BallShot = false;
let ForceMouseDown = false;

function drawBase() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "green";
  c.fillRect(0, canvas.height - canvas.height / 10, canvas.width, canvas.height / 10);

  c.fillStyle = "black";
  c.fillRect(200, canvas.height - canvas.height / 10 - 100, 30, 100);

  if (isLeftMouseDown === true && BallShot === false) {
    const newBall = new ball(true, 230, canvas.height - canvas.height / 10 - 100, "grey", 5, 0.2, BallToMouseAngle);
    BallList.push(newBall);
    BallShot = true;
  }
  BallList.forEach((balls) => {
    balls.update();
    balls.draw();
  });
  window.requestAnimationFrame(drawBase);
}
window.requestAnimationFrame(drawBase);

document.onkeydown = function (e) {
  console.log(e); //Inparametern e innehåller ett event-objekt med information om eventet.
  const key = e.key;
  keys[key] = true; // Sätter t.ex. keys.w till true
};
