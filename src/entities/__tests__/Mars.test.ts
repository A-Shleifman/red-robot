import ExceededMaxRowCountError from 'entities/errors/ExceededMaxColCountError';
import ExceededMaxColCountError from 'entities/errors/ExceededMaxRowCountError';
import FallAlreadyRegisteredError from 'entities/errors/FallAlreadyRegisteredError';
import Mars from 'entities/Mars';
import Robot from 'entities/Robot';

it('places a robot', () => {
  const mars = new Mars(10, 10);

  const robot = new Robot(3, 3);

  mars.placeNewRobot(robot);

  expect(mars.robot).toBe(robot);
});

it('generates a unique planet id', () => {
  expect(new Mars(0, 0).id).not.toEqual(new Mars(0, 0).id);
});

it('throws an exception when rows exceed the limit', () => {
  expect(() => new Mars(0, 1000)).toThrow(ExceededMaxRowCountError);
});

it('throws an exception when cols exceed the limit', () => {
  expect(() => new Mars(1000, 0)).toThrow(ExceededMaxColCountError);
});

it('validates coordinates', () => {
  const mars = new Mars(50, 50);

  expect(mars.isValidCoord(0, 0)).toEqual(true);
  expect(mars.isValidCoord(25, 25)).toEqual(true);
  expect(mars.isValidCoord(49, 49)).toEqual(true);

  expect(mars.isValidCoord(50, 0)).toEqual(false);
  expect(mars.isValidCoord(0, 50)).toEqual(false);
  expect(mars.isValidCoord(-1, 0)).toEqual(false);
  expect(mars.isValidCoord(0, -1)).toEqual(false);
});

it('registers a fall only once', () => {
  const mars = new Mars(3, 3);

  mars.registerFall(2, 3);

  expect(() => mars.registerFall(2, 3)).toThrow(FallAlreadyRegisteredError);
});
