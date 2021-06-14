class Enemy {
  radius = 30;

  alive = true;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    if (this.radius > 0) {
      ctx.fillStyle = 'blue';
      ctx.beginPath();
      ctx.arc(
        this.x,
        this.y,
        this.radius,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }
  }

  update() {
    if (this.radius < 10) {
      this.alive = false;
    }
  }
}

export default Enemy;
