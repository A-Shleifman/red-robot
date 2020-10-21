import RobotDestroyedError from 'entities/errors/RobotDestroyedError';

export enum Orientation {
  NORTH,
  EAST,
  SOUTH,
  WEST,
}

const orientationCount = Object.keys(Orientation).length / 2;

export default class Robot {
  #x: number;
  #y: number;
  #orientation: Orientation;
  #isDestroyed = false;

  constructor(x: number, y: number, orientation: Orientation = Orientation.NORTH) {
    this.#x = x;
    this.#y = y;
    this.#orientation = orientation;
  }

  get position() {
    return { x: this.#x, y: this.#y, orientation: this.#orientation };
  }

  get isDestroyed() {
    return this.#isDestroyed;
  }

  turnLeft() {
    if (this.#isDestroyed) return this;

    this.#orientation = (this.#orientation - 1 + orientationCount) % orientationCount;

    return this;
  }

  turnRight() {
    if (this.#isDestroyed) return this;

    this.#orientation = (this.#orientation + 1) % orientationCount;

    return this;
  }

  peekForward() {
    let x = this.#x;
    let y = this.#y;

    switch (this.#orientation) {
      case Orientation.NORTH:
        y++;
        break;
      case Orientation.SOUTH:
        y--;
        break;
      case Orientation.EAST:
        x++;
        break;
      case Orientation.WEST:
        x--;
        break;
    }

    return { x, y };
  }

  forward() {
    if (this.#isDestroyed) return this;

    const { x, y } = this.peekForward();

    this.#x = x;
    this.#y = y;

    return this;
  }

  destroy() {
    this.#isDestroyed = true;

    return this;
  }
}
