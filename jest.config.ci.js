const baseConfig = require('./jest.config.base');

/* 
 * When running on CI, we just want the test runner (not eslint runner as we are already running linting)
 * and the code coverage summary
 */
const ciConfig = baseConfig;
const testProject = baseConfig.projects[0];
ciConfig.moduleNameMapper = testProject.moduleNameMapper;
ciConfig.setupFiles = testProject.setupFiles;
ciConfig.projects = null;
ciConfig.coverageReporters = ['text-summary'];

module.exports = ciConfig;
