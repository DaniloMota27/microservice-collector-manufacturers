module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '<rootDir>/src/main/**/**.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/**/index.ts',
    '!<rootDir>/src/infra/streaming/sqs/helpers/sqs-helper.ts'
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },

  moduleNameMapper: {
    '@/test/(.*)': '<rootDir>/src/test/$1',
    '@/(.*)': '<rootDir>/src/$1'
  }
}
