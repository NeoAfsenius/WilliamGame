export let keys = {}; //En lista som håller kolla på alla aktiva och deaktiva knappar
export let mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

export let hasABallBeenShotThisClick = false;
export let isLeftMouseDown = false;
export let forceMouseDown = false;
export let isBKeyPressed = false;
export let shopMenu = false;
export let ballToMouseAngle = 0; //måste sätta värde på allt med mouse för annars krånglar det med import osv
export let balltoMouseX = 0;
export let balltoMousey = 0;
export let mouseX = 0;
export let mouseY = 0;

export function setHasBallBeenShot(value){ //function för att ändra värde på variablen när den senare blir en const via import
    hasABallBeenShotThisClick = value
}
export function allInputDocument(canvas) { //kopplar alla input varianter och kallar de så att de är aktiva
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
    console.log(keys)
    if ((event.key === "b" || event.key === "B") && isBKeyPressed === false) {
      shopMenu = !shopMenu; // flippar på booliska värdet
      isBKeyPressed = true;
    }
  });
  document.addEventListener("keyup", function (event) {
    keys[event.key] = false;
    if (event.key === "b" || event.key === "B") {
      isBKeyPressed = false;
    }
  });

  document.addEventListener("mousemove", function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  });
}
