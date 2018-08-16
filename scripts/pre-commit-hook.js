/**
 * Git pre-commit hook to compile the library and add the ./dist/index.js file
 * to the commit
 * It compiles the library using the staged changes, and if it fails to compile
 * it prevents the commit
 *
 * 1. Stashes any unstaged changes and untracked files
 * 2. Compiles the library
 * 3. Creates a .commit file (this is referenced in the post-commit hook)
 * 3. Restores the stashed changes (this will also happen if compiling fails)
 */

const shell = require('shelljs');

let exitCode = 0;
const stashMessage = Date.now();

function runCommand(command, message = '', checkErrorCode = true) {
  if (checkErrorCode && exitCode !== 0) {
    exit();
    return null;
  }
  if (message) {
    shell.echo(`\n${message}`);
  }
  return shell.exec(command).code;
}

function getCommandLines(command) {
  return shell
    .exec(command, { silent: true })
    .cat()
    .split('\n');
}

function exit() {
  const lastStash = getCommandLines('git stash list')[0];
  if (new RegExp(`${stashMessage}`).test(lastStash)) {
    const diff = getCommandLines('git diff stash@{0} --name-only');
    if (diff.length === 0 || (diff.length === 1 && diff[0] === '')) {
      runCommand('git stash drop stash@{0} --quiet', '', false);
    } else {
      runCommand(
        'git stash pop --quiet',
        'Restoring unstaged changes...',
        false
      );
    }
  }
  process.exit(exitCode);
}

function compile() {
  const staged = getCommandLines('git diff --staged --name-only');
  const srcFilesChanged = staged.find(
    (fileName) => fileName.indexOf('src/') === 0 || fileName === 'index.js'
  );
  // only need to bother compiling if any source files were changed
  if (srcFilesChanged) {
    exitCode = runCommand(
      `git stash save --keep-index --include-untracked "${stashMessage}"`,
      'Stashing unstaged changes...'
    );
    exitCode = runCommand('yarn compile', 'Compiling library...');

    // Running 'git add' here did not add the file into the current commit
    // We check for this '.commit' file in the post-commit hook and ammend the commit
    // to add the generated dist/bundle.js file if found
    shell.touch('.commit');
  }
  exit();
}

compile();
