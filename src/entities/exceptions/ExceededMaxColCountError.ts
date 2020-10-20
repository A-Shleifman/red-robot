export default class ExceededMaxRowCountError extends Error {
  constructor(...args: any[]) {
    super(...args);
    this.name = 'ExceededMaxRowCountError';
  }
}
