import fs from 'fs';

jest.mock('services/MarsService');
jest.mock('services/RobotService');
jest.spyOn(fs, 'readFileSync');

jest.spyOn(console, 'error');
jest.spyOn(process, 'exit').mockImplementation(() => {
  throw new Error('exit');
});

const originalArgv = process.argv;

beforeEach(() => {
  process.argv[2] = '';
  jest.resetModules();
});

afterAll(() => {
  jest.resetModules();
  process.argv = originalArgv;
});

it('displays error when no file is provided', () => {
  process.argv = originalArgv;

  expect(() => require('cli/robot-cli')).toThrowError('exit');

  expect(console.error).toHaveBeenLastCalledWith(`Usage: npm run cli -- /path/to/file`);
});

it('displays error when file cannot be found', () => {
  const filePath = '/some/invalid/path';
  process.argv[2] = filePath;

  expect(() => require('cli/robot-cli')).toThrowError('exit');

  expect(console.error).toHaveBeenLastCalledWith(`Failed to load file ${filePath}`);
});
