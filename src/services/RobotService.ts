import FallAlreadyRegisteredError from 'entities/errors/FallAlreadyRegisteredError';
import Robot from 'entities/Robot';
import RobotNotFoundError from 'services/errors/RobotNotFoundError';
import { getMarsInstance } from 'store/MarsStore';
import { UUID } from 'types';

export default class RobotService {
  turnLeft(marsId: UUID): Robot {
    const mars = getMarsInstance(marsId);

    if (!mars.robot) {
      throw new RobotNotFoundError();
    }

    return mars.robot.turnLeft();
  }

  turnRight(marsId: UUID): Robot {
    const mars = getMarsInstance(marsId);

    if (!mars.robot) {
      throw new RobotNotFoundError();
    }

    return mars.robot.turnRight();
  }

  moveForward(marsId: UUID): Robot {
    const mars = getMarsInstance(marsId);

    if (!mars.robot) {
      throw new RobotNotFoundError();
    }

    const { x, y } = mars.robot.peekForward();

    if (mars.isValidCoord(x, y)) {
      return mars.robot.forward();
    }

    try {
      mars.registerFall(x, y);
      mars.robot.destroy();
    } catch (e) {
      if (!(e instanceof FallAlreadyRegisteredError)) {
        throw e;
      }
    }

    return mars.robot;
  }
}
