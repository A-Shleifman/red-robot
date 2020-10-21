export default class UnhandledMoveError extends Error {
  constructor(...args: any[]) {
    super(...args);
    this.name = 'UnhandledMoveError';
  }
}
