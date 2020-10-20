export default class ExceededMaxColCountError extends Error {
  constructor(...args: any[]) {
    super(...args);
    this.name = 'ExceededMaxColCountError';
  }
}
