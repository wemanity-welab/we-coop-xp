module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/test'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  coverageReporters: ['html', 'text', 'text-summary', 'cobertura'],
  reporters: ['default', ['jest-junit', { suiteName: 'jest tests' }]],
};
