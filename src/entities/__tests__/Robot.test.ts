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

describe('throws exception on invalid moves', () => {
  const robot = new Robot(0, 0).destroy();

  test('on turnLeft', () => {
    expect(() => robot.turnLeft()).toThrow(RobotDestroyedError);
  });

  test('on turnRight', () => {
    expect(() => robot.turnRight()).toThrow(RobotDestroyedError);
  });

  test('on forward', () => {
    expect(() => robot.forward()).toThrow(RobotDestroyedError);
  });
});
