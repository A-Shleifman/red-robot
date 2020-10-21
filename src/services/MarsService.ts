import Mars from 'entities/Mars';
import Robot, { Orientation } from 'entities/Robot';
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

  placeNewRobot(id: UUID, x: number, y: number, orientation: Orientation) {
    getMarsInstance(id).placeNewRobot(new Robot(x, y, orientation));
  }
}
