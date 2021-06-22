import Player from '../../js/classes/Player';
import Bullet from '../../js/classes/Bullet';

describe('Player', () => {
  let events = {};

  beforeEach(() => {
    events = {};

    window.addEventListener = jest.fn((event, callback) => {
      events[event] = callback;
    });
  });

  test('player can be instantiated', () => {
    const player = new Player();

    expect(player.x).toBe(200);
    expect(player.y).toBe(200);
    expect(player.radius).toBe(40);
    expect(player.bullets).toStrictEqual([]);
    expect(player.angle).toBe(Math.PI / 2);
    expect(player.speed).toBe(5);
  });

  test('shoot adds a bullet to the bullets array', () => {
    const player = new Player();

    expect(player.bullets).toStrictEqual([]);

    player.shoot();

    const bullet = new Bullet(200, 200, {
      x: Math.cos(Math.PI / 2),
      y: Math.sin(Math.PI / 2),
    });

    expect(player.bullets).toStrictEqual([bullet]);
  });

  test('update removes a bullet from the bullets array if it is finished', () => {
    const player = new Player();

    player.shoot();

    const bullet = new Bullet(200, 200, {
      x: Math.cos(Math.PI / 2),
      y: Math.sin(Math.PI / 2),
    });

    expect(player.bullets).toStrictEqual([bullet]);

    player.bullets[0].finished = true;

    player.update();

    expect(player.bullets).toStrictEqual([]);
  });
});
