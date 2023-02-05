import keys from "../lib/keys.js";
import Bullet from "./Bullet.js";
import Stage from "./Stage.js";

class Player {
  radius = 40;
  bullets = [];
  angle = Math.PI / 2;
  speed = 5;

  constructor(name) {
    this.x = 200;
    this.y = 200;

    this.name = name;
  }

  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.save();

    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.translate(-this.x, -this.y);

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.rect(this.x + this.radius, this.y - 5, 25, 10);
    ctx.fill();

    ctx.restore();

    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillText(this.name, this.x, this.y - this.radius);

    this.bullets.forEach((bullet) => {
      bullet.draw(ctx);
    });
  }

  update() {
    this.move();

    this.bullets.forEach((bullet) => {
      bullet.update();

      if (bullet.finished === true) {
        this.bullets.splice(this.bullets.indexOf(bullet), 1);
      }
    });
  }

  move() {
    if (keys.includes("w") && this.y - this.radius > 0) {
      this.y -= this.speed;
    }

    if (keys.includes("a") && this.x - this.radius > 0) {
      this.x -= this.speed;
    }

    if (keys.includes("s") && this.y + this.radius < Stage.height) {
      this.y += this.speed;
    }

    if (keys.includes("d") && this.x + this.radius < Stage.width) {
      this.x += this.speed;
    }
  }

  shoot() {
    const bullet = new Bullet(this.x, this.y, {
      x: Math.cos(this.angle),
      y: Math.sin(this.angle),
    });
    this.bullets.push(bullet);
  }

  rotate(event, canvas) {
    this.angle = Math.atan2(
      event.clientY - canvas.height / 2,
      event.clientX - canvas.width / 2
    );
  }
}

export default Player;
