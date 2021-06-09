const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;

function init() {
  document.body.appendChild(canvas);

  game();
}

const ctx = canvas.getContext('2d');
const keys = [];

const interval = 1000 / 60;
let then = Date.now();

class Player {
  radius = 40;
  bullets = [];
  angle = Math.PI / 2;
  speed = 5;

  constructor() {
    this.x = (canvas.width - this.radius) / 2;
    this.y = (canvas.height - this.radius) / 2;
  }

  draw() {
    ctx.save();

    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.translate(-this.x, -this.y);

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(
      this.x,
      this.y,
      this.radius,
      0,
      Math.PI * 2
    );
    ctx.fill();

    ctx.beginPath();
    ctx.rect(this.x + this.radius, this.y - 5, 25, 10);
    ctx.fill();

    ctx.restore();

    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].draw();
    }
  }

  update() {
    this.move();

    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].update();
    }
  }

  move() {
    if (keys.includes('w') && this.y - this.radius > 0) {
      this.y -= this.speed;
    }

    if (keys.includes('a') && this.x - this.radius > 0) {
      this.x -= this.speed;
    }

    if (keys.includes('s') && this.y + this.radius < Stage.height) {
      this.y += this.speed;
    }

    if (keys.includes('d') && this.x + this.radius < Stage.width) {
      this.x += this.speed;
    }
  }

  shoot(event) {
    const bullet = new Bullet(this.x, this.y, {
      x: Math.cos(this.angle),
      y: Math.sin(this.angle)
    });
    this.bullets.push(bullet);
  }

  rotate(event) {
    this.angle = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2);
  }
};

class Bullet {
  radius = 8;
  speed = 10;

  constructor(x, y, velocity) {
    this.x = x + velocity.x * 60;
    this.y = y + velocity.y * 60;
    this.velocity = velocity;
  }

  draw() {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(
      this.x,
      this.y,
      this.radius,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  update() {
    this.x += this.velocity.x * this.speed;
    this.y += this.velocity.y * this.speed;

    for (let i = 0; i < entities.length; i++) {
      if (circleCollision(this, entities[i])) {
        this.remove();
        entities[i].radius--;
      }
    }

    if (
      this.x > Stage.width
      || this.x + this.radius < 0
      || this.y < 0
      || this.y + this.radius > Stage.height
    ) {
      this.remove();
    }
  }

  remove() {
    player.bullets.splice(player.bullets.indexOf(this), 1);
  }
}

class Enemy {
  radius = 30;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    if (this.radius > 0) {
      ctx.fillStyle = 'blue';
      ctx.beginPath();
      ctx.arc(
        this.x,
        this.y,
        this.radius,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  }

  update() {
    if (this.radius < 10) {
      entities.splice(entities.indexOf(this), 1);
    }
  }
}

const player = new Player();
const entities = [player];

const game = () => {
  const now = Date.now();
  const elapsed = now - then;

  if (elapsed > interval) {
    then = now - (elapsed % interval);
    update();
    draw();
  }

  requestAnimationFrame(game);
};

function update() {
  for (let i = 0; i < entities.length; i++) {
    entities[i].update();
  }
}

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  Camera.renderView(player);

  ctx.fillStyle = '#aaaaaa';
  ctx.fillRect(0, 0, Stage.width, Stage.height);

  for (let i = 0; i < entities.length; i++) {
    entities[i].draw();
  }

  ctx.restore();
};

class Camera {
  static padding = 100;

  static renderView(player) {
    let x = -player.x + player.radius + this.padding;
    let y = -player.y + player.radius + this.padding;

    ctx.translate(x, y);
  }
}

class Stage {
  static width = 1000;
  static height = 800;
}

const circleCollision = (circleA, circleB) => {
  const distanceX = circleA.x - circleB.x;
  const distanceY = circleA.y - circleB.y;
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

  return distance < circleA.radius + circleB.radius;
};

for (let i = 0; i < 7; i++) {
  entities.push(new Enemy(Math.random() * Stage.width, Math.random() * Stage.height));
}

window.onload = init;
window.onclick = (event) => {
  player.shoot(event);
};
window.onmousemove = (event) => {
  player.rotate(event);
};

window.addEventListener('keydown', e => {
  const { key } = e;

  if (!keys.includes(key)) {
    keys.push(key);
  }
});

window.addEventListener('keyup', e => {
  const { key } = e;

  if (keys.includes(key)) {
    keys.splice(keys.indexOf(key), 1);
  }
});
