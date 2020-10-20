import { UUID } from 'types';
import * as uuid from 'uuid';
import Robot from 'entities/Robot';
import FallAlreadyRegisteredError from 'entities/errors/FallAlreadyRegisteredError';
import ExceededMaxRowCountError from 'entities/errors/ExceededMaxColCountError';
import ExceededMaxColCountError from 'entities/errors/ExceededMaxRowCountError';

const MAX_ROWS = 50;
const MAX_COLS = 50;

export default class Mars {
  #id = uuid.v4();
  #rows: number;
  #cols: number;
  #robot?: Robot;
  #fallMap = new Set<string>([]); // O(1) lookup

  constructor(cols: number, rows: number) {
    if (rows > MAX_ROWS) throw new ExceededMaxRowCountError();
    if (cols > MAX_COLS) throw new ExceededMaxColCountError();

    this.#rows = rows;
    this.#cols = cols;
  }

  get id() {
    return this.#id;
  }

  placeNewRobot(robot: Robot) {
    this.#robot = robot;
  }

  get robot() {
    return this.#robot;
  }

  isValidCoord(x: number, y: number) {
    return x >= 0 && x < this.#cols && y >= 0 && y < this.#rows;
  }

  registerFall(x: number, y: number) {
    const coords = JSON.stringify({ x, y });

    if (this.#fallMap.has(coords)) {
      throw new FallAlreadyRegisteredError();
    }

    this.#fallMap.add(coords);
  }
}
