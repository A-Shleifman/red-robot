export default class RobotNotFoundError extends Error {
  constructor(...args: any[]) {
    super(...args);
    this.name = 'RobotNotFoundError';
  }
}
