export default class RobotDestroyedError extends Error {
  constructor(...args: any[]) {
    super(...args);
    this.name = 'RobotDestroyedError';
  }
}
