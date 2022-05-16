module.exports = {
  moduleNameMapper: {
    '@src/(.*)$': '<rootDir>/src/$1',
    '@common/(.*)$': '<rootDir>/src/common/$1',
    '@features/(.*)$': '<rootDir>/src/features/$1',
    '.+\\.(css|style|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  testEnvironment: 'jsdom',
};
