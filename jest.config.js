module.exports = {
  moduleNameMapper: {
    '@src/(.*)$': '<rootDir>/src/$1',
    '@common/(.*)$': '<rootDir>/src/common/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  testEnvironment: 'jsdom',
};
