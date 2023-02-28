/* eslint-disable @typescript-eslint/no-var-requires */
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/', 'src'],
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/public/(.*)$': '<rootDir>/public/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/scripts/'],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx,mjs,ts,tsx}',
    '!<rootDir>/src/**/index.{js,ts,tsx}',
    '!<rootDir>/src/**/constants.{js,ts}',
    '!<rootDir>/src/**/*.stories.{js,ts}',
    '!<rootDir>/node_modules/',
    '!<rootDir>/src/shared/testsUtils/**/*.{js,ts,tsx}',
    '!<rootDir>/src/**/__tests__/*.{js,ts}',
    '!<rootDir>/src/**/*.d.ts',
  ],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)', '!**/__tests__/*.mock.{js,ts}'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  clearMocks: true,
  resetMocks: false,
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
