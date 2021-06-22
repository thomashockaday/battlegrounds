import Bullet from '../../js/classes/Bullet';

describe('Bullet', () => {
  test('bullet can be instantiated', () => {
    const bullet = new Bullet(0, 0, {
      x: 0,
      y: 0
    });

    expect(bullet.x).toBe(0);
    expect(bullet.y).toBe(0);
    expect(bullet.velocity).toStrictEqual({ x: 0, y: 0 });
    expect(bullet.radius).toBe(8);
    expect(bullet.speed).toBe(10);
    expect(bullet.finished).toBe(false);
  });

  test('update increases the x and y values by the velocity and the speed', () => {
    const bullet = new Bullet(0, 0, {
      x: 10,
      y: 10
    });

    expect(bullet.x).toBe(600);
    expect(bullet.y).toBe(600);

    bullet.update();

    expect(bullet.x).toBe(700);
    expect(bullet.y).toBe(700);
  });

  test('update marks finished as true if the x value is less than 0', () => {
    const bullet = new Bullet(0, 0, {
      x: -10,
      y: 0
    });

    expect(bullet.finished).toBe(false);

    bullet.update();

    expect(bullet.finished).toBe(true);
  });

  test('update marks finished as true if the x value is greater than the stage width', () => {
    const bullet = new Bullet(0, 0, {
      x: 400,
      y: 0
    });

    expect(bullet.finished).toBe(false);

    bullet.update();

    expect(bullet.finished).toBe(true);
  });

  test('update marks finished as true if the y value is less than 0', () => {
    const bullet = new Bullet(0, 0, { x: 0, y: -10 });

    expect(bullet.finished).toBe(false);

    bullet.update();

    expect(bullet.finished).toBe(true);
  });

  test('update marks finished as true if the y value is greater than the stage height', () => {
    const bullet = new Bullet(0, 0, { x: 0, y: 800 });

    expect(bullet.finished).toBe(false);

    bullet.update();

    expect(bullet.finished).toBe(true);
  });
});
