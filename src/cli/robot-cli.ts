import UnhandledMoveError from 'cli/errors/UnhandledMoveError';
import { Orientation } from 'entities/Robot';
import fs from 'fs';
import MarsService from 'services/MarsService';
import RobotService from 'services/RobotService';

const marsService = new MarsService();
const robotService = new RobotService();

const [, , filePath] = process.argv;

if (!filePath) {
  // TODO: replace with a logger
  console.error(`Usage: npm run cli -- /path/to/file`);
  process.exit();
}

let data: string;

try {
  data = fs.readFileSync(filePath, 'utf-8');
} catch (e) {
  console.error(`Failed to load file ${filePath}`);
  process.exit();
}

const instructions = data.split('\n');

const [cols, rows] = instructions.shift()!.split(' ');

const mars = marsService.createMarsInstance(Number(cols), Number(rows));

for (let i = 0; i < instructions.length; i += 2) {
  const [x, y, orientation] = instructions[i].split(' ');

  const orientationName = Object.keys(Orientation).find((x) => x.charAt(0) === orientation) as keyof typeof Orientation;

  marsService.placeNewRobot(mars.id, Number(x), Number(y), Orientation[orientationName]);

  const moves = instructions[i + 1].split('');

  moves.forEach((move) => {
    switch (move) {
      case 'F':
        robotService.moveForward(mars.id);
        break;
      case 'R':
        robotService.turnRight(mars.id);
        break;
      case 'L':
        robotService.turnLeft(mars.id);
        break;
      default:
        throw new UnhandledMoveError(`Invalid move ${move}`);
    }
  });

  const { position, isDestroyed } = mars.robot!;

  const output = [position.x, position.y, Orientation[position.orientation].charAt(0)];
  if (isDestroyed) {
    output.push('LOST');
  }

  console.log(output.join(' '));
}
