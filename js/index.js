import circleCollision from './lib/utils.js';

import Camera from './classes/Camera.js';
import Enemy from './classes/Enemy.js';
import Player from './classes/Player.js';
import Stage from './classes/Stage.js';

const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;

function init() {
  document.body.appendChild(canvas);

  game();
}

const ctx = canvas.getContext('2d');

const interval = 1000 / 60;
let then = Date.now();

const player = new Player();
const enemies = [];

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
  player.update();

  enemies.forEach((enemy) => {
    player.bullets.forEach((bullet) => {
      if (circleCollision(bullet, enemy)) {
        bullet.finished = true;
        enemy.radius -= 1;
      }
    });

    enemy.update();

    if (enemy.alive === false) {
      enemies.splice(enemies.indexOf(enemy), 1);
    }
  });
}

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  Camera.renderView(ctx, player);

  ctx.fillStyle = '#aaaaaa';
  ctx.fillRect(0, 0, Stage.width, Stage.height);

  player.draw(ctx);

  enemies.forEach((enemy) => {
    enemy.draw(ctx);
  });

  ctx.restore();
};

for (let i = 0; i < 7; i += 1) {
  enemies.push(new Enemy(Math.random() * Stage.width, Math.random() * Stage.height));
}

window.onload = init;
window.onclick = (event) => {
  player.shoot(event);
};
window.onmousemove = (event) => {
  player.rotate(event, canvas);
};
