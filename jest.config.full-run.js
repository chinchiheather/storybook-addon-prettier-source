const baseConfig = require('./jest.config.base');

const fullRunConfig = baseConfig;
fullRunConfig.coverageReporters = ['text-summary', 'html'];
module.exports = fullRunConfig;
