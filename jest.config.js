module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'jsdom', // Simulate a browser environment
  // setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Optional: For custom setup
};
