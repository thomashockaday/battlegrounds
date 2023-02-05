import Stage from "./Stage.js";

class Bullet {
  radius = 8;
  speed = 10;
  finished = false;

  constructor(x, y, velocity) {
    this.x = x + velocity.x * 60;
    this.y = y + velocity.y * 60;
    this.velocity = velocity;
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    this.x += this.velocity.x * this.speed;
    this.y += this.velocity.y * this.speed;

    if (
      this.x > Stage.width ||
      this.x + this.radius < 0 ||
      this.y < 0 ||
      this.y + this.radius > Stage.height
    ) {
      this.finished = true;
    }
  }
}

export default Bullet;
