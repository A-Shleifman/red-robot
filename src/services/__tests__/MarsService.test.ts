import Mars from 'entities/Mars';
import Robot from 'entities/Robot';
import MarsService from 'services/MarsService';
import { getMarsInstance, registerMarsInstance } from 'store/MarsStore';
import { mocked } from 'ts-jest';
import * as uuid from 'uuid';

jest.mock('store/MarsStore');

const marsService = new MarsService();

it('creates and registers new instances', () => {
  mocked(registerMarsInstance).mockReset();

  const mars = marsService.createMarsInstance(10, 10);

  expect(registerMarsInstance).toHaveBeenCalledWith(mars);
});

it('retrieves mars instance by id', () => {
  mocked(getMarsInstance).mockReset();

  const id = uuid.v4();

  marsService.getMarsInstanceById(id);

  expect(getMarsInstance).toHaveBeenCalledWith(id);
});

it('allows to place a new robot', () => {
  const mars = new Mars(10, 10);
  const robot = new Robot(3, 3);

  mocked(getMarsInstance).mockImplementation(() => mars);

  marsService.placeNewRobot(uuid.v4(), robot);

  expect(mars.robot).toBe(robot);
});
