import RobotDestroyedError from 'entities/errors/RobotDestroyedError';
import Robot, { Orientation } from 'entities/Robot';

it('returns position', () => {
  const robot = new Robot(10, 10, Orientation.SOUTH);

  expect(robot.position).toEqual({ x: 10, y: 10, orientation: Orientation.SOUTH });
});

it('faces North by default', () => {
  expect(new Robot(0, 0).position.orientation).toEqual(Orientation.NORTH);
});

it('turns left correctly', () => {
  const robot = new Robot(0, 0, Orientation.NORTH);

  expect(robot.turnLeft().position.orientation).toEqual(Orientation.WEST);
  expect(robot.turnLeft().position.orientation).toEqual(Orientation.SOUTH);
  expect(robot.turnLeft().position.orientation).toEqual(Orientation.EAST);
  expect(robot.turnLeft().position.orientation).toEqual(Orientation.NORTH);
});

it('turns right correctly', () => {
  const robot = new Robot(0, 0, Orientation.NORTH);

  expect(robot.turnRight().position.orientation).toEqual(Orientation.EAST);
  expect(robot.turnRight().position.orientation).toEqual(Orientation.SOUTH);
  expect(robot.turnRight().position.orientation).toEqual(Orientation.WEST);
  expect(robot.turnRight().position.orientation).toEqual(Orientation.NORTH);
});

it('calculates the next step', () => {
  const x = 10;
  const y = 10;

  expect(new Robot(x, y, Orientation.NORTH).peekForward()).toEqual({
    x,
    y: y + 1,
  });

  expect(new Robot(x, y, Orientation.EAST).peekForward()).toEqual({
    x: x + 1,
    y,
  });

  expect(new Robot(x, y, Orientation.SOUTH).peekForward()).toEqual({
    x,
    y: y - 1,
  });

  expect(new Robot(x, y, Orientation.WEST).peekForward()).toEqual({
    x: x - 1,
    y,
  });
});

it('moves forward to the calculated coords', () => {
  const x = 10;
  const y = 10;

  expect(new Robot(x, y, Orientation.EAST).forward().position).toEqual({
    x: x + 1,
    y,
    orientation: Orientation.EAST,
  });
});

describe('ignores invalid moves', () => {
  const x = 5;
  const y = 5;
  const robot = new Robot(x, y).destroy();

  test('on turnLeft', () => {
    expect(robot.turnLeft().position).toEqual({ x, y, orientation: Orientation.NORTH });
  });

  test('on turnRight', () => {
    expect(robot.turnRight().position).toEqual({ x, y, orientation: Orientation.NORTH });
  });

  test('on forward', () => {
    expect(robot.forward().position).toEqual({ x, y, orientation: Orientation.NORTH });
  });
});
