module.exports = {
  projects: [
    {
      displayName: 'test',
      moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
        '\\.(svg|png)$': '<rootDir>/test/mocks/file-mock.js' // add more file extensions as required
      },
      setupFiles: ['./test/test-setup.js']
    },
    {
      displayName: 'lint',
      runner: 'jest-runner-eslint',
      testMatch: ['<rootDir>/src/**/*.spec.js']
    }
  ]
};
