import Mars from 'entities/Mars';
import Robot from 'entities/Robot';
import { getMarsInstance, registerMarsInstance } from 'store/MarsStore';
import { UUID } from 'types';

export default class MarsService {
  createMarsInstance(x: number, y: number) {
    const mars = new Mars(x, y);

    registerMarsInstance(mars);

    return mars;
  }

  getMarsInstanceById(id: UUID) {
    return getMarsInstance(id);
  }

  placeNewRobot(id: UUID, robot: Robot) {
    getMarsInstance(id).placeNewRobot(robot);
  }
}
