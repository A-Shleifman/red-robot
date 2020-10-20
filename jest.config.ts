import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['./src'],
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};

export default config;
