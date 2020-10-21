import Mars from 'entities/Mars';
import Robot from 'entities/Robot';
import RobotNotFoundError from 'services/errors/RobotNotFoundError';
import RobotService from 'services/RobotService';
import * as MarsStore from 'store/MarsStore';
import { mocked } from 'ts-jest/utils';
import * as uuid from 'uuid';

jest.mock('entities/Robot');

Robot.prototype.peekForward = () => ({ x: 0, y: 0 });

beforeEach(() => {
  jest.spyOn(MarsStore, 'getMarsInstance').mockImplementation(() => {
    const robot = new Robot(3, 3);
    const mars = new Mars(5, 5);
    mars.placeNewRobot(robot);

    return mars;
  });
});

afterEach(() => {
  mocked(Robot).mockClear();
});

it('turns robot left', () => {
  new RobotService().turnLeft(uuid.v4());

  const instances = mocked(Robot).mock.instances;

  expect(instances[instances.length - 1].turnLeft).toHaveBeenCalledTimes(1);
});

it('turns robot right', () => {
  new RobotService().turnRight(uuid.v4());

  const instances = mocked(Robot).mock.instances;

  expect(instances[instances.length - 1].turnRight).toHaveBeenCalledTimes(1);
});

it('moves robot forward', () => {
  new RobotService().moveForward(uuid.v4());

  const instances = mocked(Robot).mock.instances;

  expect(instances[instances.length - 1].forward).toHaveBeenCalledTimes(1);
});

describe('throws error when no robot found', () => {
  beforeEach(() => {
    mocked(MarsStore.getMarsInstance).mockReturnValue(new Mars(5, 5));
  });

  test('turnLeft', () => {
    expect(() => new RobotService().turnLeft(uuid.v4())).toThrow(RobotNotFoundError);
  });

  test('turnRight', () => {
    expect(() => new RobotService().turnRight(uuid.v4())).toThrow(RobotNotFoundError);
  });

  test('moveForward', () => {
    expect(() => new RobotService().moveForward(uuid.v4())).toThrow(RobotNotFoundError);
  });
});

it('bubbles up errors other than FallAlreadyRegisteredError', () => {
  const errorMessage = 'unhandled error';

  Robot.prototype.destroy = () => {
    throw new Error(errorMessage);
  };

  Robot.prototype.peekForward = () => ({ x: 5, y: 6 });

  const mars = new Mars(5, 5);
  mars.placeNewRobot(new Robot(0, 0));

  mocked(MarsStore.getMarsInstance).mockReturnValue(mars);

  expect(() => new RobotService().moveForward(uuid.v4())).toThrowError(errorMessage);
});
