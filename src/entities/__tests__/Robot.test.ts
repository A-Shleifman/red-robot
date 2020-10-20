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

it('moves forward in the right direction', () => {
  const x = 10;
  const y = 10;

  expect(new Robot(x, y, Orientation.NORTH).forward().position).toEqual({
    x,
    y: y + 1,
    orientation: Orientation.NORTH,
  });

  expect(new Robot(x, y, Orientation.EAST).forward().position).toEqual({
    x: x + 1,
    y,
    orientation: Orientation.EAST,
  });

  expect(new Robot(x, y, Orientation.SOUTH).forward().position).toEqual({
    x,
    y: y - 1,
    orientation: Orientation.SOUTH,
  });

  expect(new Robot(x, y, Orientation.WEST).forward().position).toEqual({
    x: x - 1,
    y,
    orientation: Orientation.WEST,
  });
});
