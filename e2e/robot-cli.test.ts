import UnhandledMoveError from 'cli/errors/UnhandledMoveError';
import fs from 'fs';
import { mocked } from 'ts-jest/utils';

const testFilePath = './testInstructions';
const originalArgv = process.argv;
process.argv[2] = testFilePath;

afterAll(() => {
  process.argv = originalArgv;
});

jest.spyOn(console, 'log').mockImplementation(() => {});

afterEach(() => {
  fs.unlinkSync(testFilePath);
  jest.resetModules();
  mocked(console.log).mockClear();
});

test('one robot on mars', () => {
  fs.writeFileSync(testFilePath, `30 30\n15 15 S\nFFFFRFFFFLLF`);

  require('cli/robot-cli');

  expect(mocked(console.log).mock.calls).toEqual([['12 11 E']]);
});

test('one robot falling of the edge', () => {
  fs.writeFileSync(testFilePath, `3 3\n3 3 N\nFFRF`);

  require('cli/robot-cli');

  expect(mocked(console.log).mock.calls).toEqual([['3 3 N LOST']]);
});

test('two robots falling of the edge', () => {
  fs.writeFileSync(testFilePath, `3 3\n3 3 N\nFFRF\n3 3 N\nFFRF`);

  require('cli/robot-cli');

  expect(mocked(console.log).mock.calls).toEqual([['3 3 N LOST'], ['3 3 E LOST']]);
});

test('three robots on mars', () => {
  fs.writeFileSync(testFilePath, '5 3\n1 1 E\nRFRFRFRF\n3 2 N\nFRRFLLFFRRFLL\n0 3 W\nLLFFFLFLFL');

  require('cli/robot-cli');

  expect(mocked(console.log).mock.calls).toEqual([['1 1 E'], ['3 3 N LOST'], ['2 3 S']]);
});

test('three robots on mars', () => {
  fs.writeFileSync(testFilePath, '5 3\n1 1 E\nRo');

  expect(() => require('cli/robot-cli')).toThrowErrorMatchingInlineSnapshot(`"Invalid move o"`);
});
