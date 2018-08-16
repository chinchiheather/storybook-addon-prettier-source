/**
 * Git post-commit hook to ammend the previous commit to add the dist/bundle.js file
 * that was generated in the pre-commit hook
 *
 * Adding the file in the pre-commit hook did not add it into that commit, so we need to
 * ammend it instead
 */

const shell = require('shelljs');

if (shell.test('-e', '.commit')) {
  shell.rm('.commit');
  shell.exec('git add dist/index.js');
  shell.exec('git commit --amend --reuse-message HEAD --no-verify');
}
