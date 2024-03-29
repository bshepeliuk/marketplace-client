module.exports = {
  collectCoverage: true,
  coverageReporters: ['text', 'cobertura', 'clover'],
  moduleNameMapper: {
    '@src/(.*)$': '<rootDir>/src/$1',
    '@common/(.*)$': '<rootDir>/src/common/$1',
    '@features/(.*)$': '<rootDir>/src/features/$1',
    '^d3-(.*)$': `<rootDir>/node_modules/d3-$1/dist/d3-$1`,
    '.+\\.(css|style|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  coveragePathIgnorePatterns: [
    'node_modules',
    '<rootDir>/tests/mocks/',
    '.styled.ts',
    '<rootDir>/tests/wrapper',
    '<rootDir>/tests/helpers/',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  testEnvironment: 'jsdom',
};
