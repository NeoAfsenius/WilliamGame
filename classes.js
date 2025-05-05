import { basicBallImage, birdImage1, birdImage2, deadBird, gameState } from "./code.js";
export function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export class Ball {
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
  draw(c) {
    c.fillStyle = this.material; //kollar bara så att kulan ligger på rätt plats
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
    c.stroke();
    if (basicBallImage.complete) {
      c.drawImage(basicBallImage, this.x - this.radius * 4, this.y - this.radius * 4, this.radius * 8, this.radius * 8);
    }
  }
}
export class Bird {
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
    this.animationFrame = 0;
    this.animationTimer = 0;
  }
  update(canvas, ballList, birdMissed) {
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
        gameState.dollares += 20
        } else {
        gameState.dollares += 10
        }
      }
    }
    if (this.x <= -31) {
      this.xvelocity = 0;
      this.x = 300;
      this.y = -800;
      this.yvelocity = 0;
      birdMissed.push("missed");
      gameState.birdGone += 1
      console.log("gone");
      this.outsideMark = true;
      if (this.hasSineWave === true) {
        gameState.dollares -= 10
      } else {
        gameState.dollares -= 5
      }
      this.hasSineWave = false;
    }
    this.animationTimer += 1;
    if (this.animationTimer > 10) {
      this.animationFrame = (this.animationFrame + 1) % 2;
      this.animationTimer = 0;
    }
  }
  draw(c) {
    // c.fillStyle = "black";
    // c.fillRect(this.x, this.y, 30, 30);
    if (this.markForDespawn === true && deadBird.complete) {
      c.drawImage(deadBird, this.x - 40, this.y - 40, 100, 100);
    } else if (this.animationFrame === 0 && birdImage1.complete) {
      c.drawImage(birdImage1, this.x - 40, this.y - 40, 120, 120);
    } else if (birdImage2.complete) {
      c.drawImage(birdImage2, this.x - 40, this.y - 40, 120, 120);
    }
  }
}
export class Level {
  constructor(Level) {
    this.Level = Level;
    this.maxBirdListLength = Math.ceil(3 + 2.5 * Math.log2(Level + 1)); //kurva för fåglar som bestämmer mängd per Level
    if (this.Level > 3) {
      this.movingBirds = true;
    } else {
      this.movingBirds = false;
      console.log("tihi");
    }
  }
}
