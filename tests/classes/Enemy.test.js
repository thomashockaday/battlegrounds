import Enemy from '../../js/classes/Enemy';

test('enemy can be instantiated', () => {
  const enemy = new Enemy(0, 0);

  expect(enemy.x).toBe(0);
  expect(enemy.y).toBe(0);
  expect(enemy.radius).toBe(30);
  expect(enemy.alive).toBe(true);
});

test('update marks alive as false if the radius value is less than 10', () => {
  const enemy = new Enemy(0, 0);

  expect(enemy.alive).toBe(true);

  enemy.radius = 9;
  enemy.update();

  expect(enemy.alive).toBe(false);
});
