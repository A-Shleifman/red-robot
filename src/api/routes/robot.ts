import { RobotMove, UUID } from 'types';
import { Orientation } from 'entities/Robot';
import { Request, Router } from 'express';
import MarsService from 'services/MarsService';
import RobotService from 'services/RobotService';

const marsService = new MarsService();
const robotService = new RobotService();

const router = Router();

interface RobotInDto {
  planetId: UUID;
  x: number;
  y: number;
  orientation: Orientation;
}

// TODO: add body validation
router.post('/', (req: Request<{}, {}, RobotInDto>, res) => {
  const { planetId, x, y, orientation } = req.body;

  marsService.placeNewRobot(planetId, x, y, orientation);

  res.json(marsService.getMarsInstanceById(planetId).robot!.toJSON());
});

interface RobotMoveInDto {
  planetId: UUID;
  move: number;
}

router.post('/move', (req: Request<{}, {}, RobotMoveInDto>, res) => {
  const { planetId, move } = req.body;

  switch (move) {
    case RobotMove.TURN_LEFT:
      robotService.turnLeft(planetId);
      break;
    case RobotMove.TURN_RIGHT:
      robotService.turnRight(planetId);
      break;
    case RobotMove.FORWARD:
      robotService.moveForward(planetId);
      break;
  }

  res.json(marsService.getMarsInstanceById(planetId).robot!.toJSON());
});

export const robotRouter = router;
