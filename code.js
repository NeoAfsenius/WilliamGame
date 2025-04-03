console.log("sigma boi")
let canvas = document.querySelector("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.style.width = "100%"
canvas.style.height = "100%"

const c = canvas.getContext("2d")

class ball {
    constructor(material, speed, size, grav/*Neo tyckte det var coolt*/) {
        this.material = material
        this.speed = speed
        this.size = size
        this.grav = grav
        
    }
}
let keys = {
    b: false,
    w: false,
  }
document.onkeydown = function (e) {
    console.log(e) //Inparametern e innehåller ett event-objekt med information om eventet.
    const key = e.key
    keys[key] = true // Sätter t.ex. keys.w till true
}

let isLeftMouseDown = false

document.addEventListener("mousedown", function(event) {
    if (event.button === 0) { // 0 is the left mouse button
        console.log("Mouse X:", event.clientX, "Mouse Y:", event.clientY);
        isLeftMouseDown = true
        console.log(isLeftMouseDown)
    }
})

document.addEventListener("mouseup", function(event) {
    if (event.button === 0) { // Left mouse button released
        isLeftMouseDown = false;
        console.log(isLeftMouseDown);
    }
});

document.onkeyup = function (e) {
    const key = e.key
    keys[key] = false
}

console.log(
    `Bredd på canvas: ${canvas.width},
  Höjd på canvas: ${canvas.height}`
  .a
  );
let OnOther=false
function drawBase() {
    c.fillStyle = "green"
    c.fillRect(0,(canvas.height)-(canvas.height/10), canvas.width, canvas.height/10)
    c.fillStyle = "black"
    c.fillRect(200, (canvas.height)-(canvas.height/10)-100, 30, 100)

    
    if (isLeftMouseDown = true && OnOther===false) {
    }
    drawBase()
}
drawBase()

document.onkeydown = function (e) {
    console.log(e) //Inparametern e innehåller ett event-objekt med information om eventet.
    const key = e.key
    keys[key] = true // Sätter t.ex. keys.w till true
  }