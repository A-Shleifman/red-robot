export default class FallAlreadyRegisteredError extends Error {
  constructor(...args: any[]) {
    super(...args);
    this.name = 'FallAlreadyRegisteredError';
  }
}
