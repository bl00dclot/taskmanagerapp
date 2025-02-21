module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
    globals: {
      'ts-jest': {
        tsconfig: '<rootDir>/tsconfig.jest.json'
      }
    }
  };