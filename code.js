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
document.onkeydown = function (e) {
    console.log(e) //Inparametern e innehåller ett event-objekt med information om eventet.
    const key = e.key
    keys[key] = true // Sätter t.ex. keys.w till true
  }
console.log(
    `Bredd på canvas: ${canvas.width},
  Höjd på canvas: ${canvas.height}`
  .a
  );

function drawGround() {
  c.fillStyle = "green"
  c.fillRect(0,(canvas.height)-(canvas.height/10), canvas.width, canvas.height/10)
}
drawGround()

document.onkeydown = function (e) {
    console.log(e) //Inparametern e innehåller ett event-objekt med information om eventet.
    const key = e.key
    keys[key] = true // Sätter t.ex. keys.w till true
  }