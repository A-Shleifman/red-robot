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

  constructor(x: number, y: number, orientation: Orientation = Orientation.NORTH) {
    this.#x = x;
    this.#y = y;
    this.#orientation = orientation;
  }

  get position() {
    return { x: this.#x, y: this.#y, orientation: this.#orientation };
  }

  turnLeft() {
    this.#orientation = (this.#orientation - 1 + orientationCount) % orientationCount;

    return this;
  }

  turnRight() {
    this.#orientation = (this.#orientation + 1) % orientationCount;

    return this;
  }

  forward() {
    switch (this.#orientation) {
      case Orientation.NORTH:
        this.#y += 1;
        break;
      case Orientation.SOUTH:
        this.#y -= 1;
        break;
      case Orientation.EAST:
        this.#x += 1;
        break;
      case Orientation.WEST:
        this.#x -= 1;
        break;
    }

    return this;
  }
}
