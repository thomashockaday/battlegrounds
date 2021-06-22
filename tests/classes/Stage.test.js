import Stage from '../../js/classes/Stage';

test('it returns the expected static values', () => {
  expect(Stage.width).toBe(1000);
  expect(Stage.height).toBe(800);
});
