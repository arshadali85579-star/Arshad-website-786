/**
 * ============================================================
 * AUTO GITHUB SYNC ENGINE — PERMANENT SETUP
 * ============================================================
 * Author: Sayyad Arshad
 * Target Repo: https://github.com/arshadali85579-star/Arshad-website-786.git
 * Account: arshadali85579-star
 * Branch: main
 * ============================================================
 */

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const REQUIRED_REPO_PATTERN = /github\.com[/:](arshadali85579-star\/Arshad-website-786)(\.git)?$/i;
const REQUIRED_BRANCH = 'main';
const AUTHORIZED_ACCOUNT = 'arshadali85579-star';
const FORBIDDEN_ACCOUNT = 'deard0338-cloud';
const DEBOUNCE_MS = 6000;

// Excluded patterns for file watching
const IGNORED_PATHS = [
  'node_modules',
  'dist',
  'dist-ssr',
  '.git',
  '.env',
  '.env.local',
  'package-lock.json',
  'FULL_PROJECT_BACKUP.bat',
  'GITHUB_SYNC_STATUS.bat',
  'START_AUTO_SYNC.bat',
  'MANUAL_SYNC.bat'
];

function log(msg) {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${msg}`);
}

function runGit(args) {
  try {
    return execSync(`git ${args}`, { cwd: PROJECT_ROOT, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
  } catch (err) {
    const errorOutput = (err.stderr || err.stdout || err.message || '').toString();
    throw new Error(errorOutput);
  }
}

/**
 * 1. Verify Git remote, branch, and authorized user
 */
function verifyEnvironment() {
  // Check Remote URL
  const remoteUrl = runGit('config --get remote.origin.url');
  if (!REQUIRED_REPO_PATTERN.test(remoteUrl)) {
    throw new Error(
      `SAFETY ABORT: Invalid remote URL: "${remoteUrl}". Expected: https://github.com/arshadali85579-star/Arshad-website-786.git`
    );
  }

  // Check Branch
  const currentBranch = runGit('branch --show-current');
  if (currentBranch !== REQUIRED_BRANCH) {
    throw new Error(`SAFETY ABORT: Current branch is "${currentBranch}". Auto sync only pushes to "${REQUIRED_BRANCH}".`);
  }

  // Check Authorized Account
  const configuredUser = runGit('config --get credential.https://github.com.username') || '';
  if (configuredUser.toLowerCase() === FORBIDDEN_ACCOUNT.toLowerCase()) {
    throw new Error('GitHub authentication is using the wrong account. Aborting immediately.');
  }

  // Check Merge / Rebase State
  if (
    fs.existsSync(path.join(PROJECT_ROOT, '.git', 'MERGE_HEAD')) ||
    fs.existsSync(path.join(PROJECT_ROOT, '.git', 'REBASE_HEAD')) ||
    fs.existsSync(path.join(PROJECT_ROOT, '.git', 'CHERRY_PICK_HEAD'))
  ) {
    throw new Error('SAFETY ABORT: A git merge, rebase, or cherry-pick is currently in progress. Resolve it before syncing.');
  }

  return { remoteUrl, currentBranch, configuredUser };
}

/**
 * 2. Generate contextual commit message
 */
function generateCommitMessage(statusLines) {
  const files = statusLines.map((l) => l.slice(3).trim());

  const onlyStyles = files.every((f) => f.endsWith('.css') || f.includes('tailwind') || f.includes('postcss'));
  if (onlyStyles) return 'Auto sync: update styles';

  const onlyComponents = files.every((f) => f.startsWith('src/components/') || f.startsWith('src\\components\\'));
  if (onlyComponents) return 'Auto sync: update components';

  const onlyContent = files.some(
    (f) => f.includes('App.tsx') || f.includes('index.html') || f.includes('types.ts')
  );
  if (onlyContent && files.length <= 3) return 'Auto sync: update content';

  return 'Auto sync: update website';
}

/**
 * 3. Validate build safety before pushing major changes
 */
function validateBuild() {
  log('Running build validation (npm run build)...');
  try {
    execSync('npm run build', { cwd: PROJECT_ROOT, stdio: ['pipe', 'pipe', 'pipe'] });
    log('✓ Build check passed successfully.');
    return true;
  } catch (err) {
    const errorMsg = (err.stderr || err.stdout || err.message || '').toString();
    console.error('\n' + '='.repeat(60));
    console.error('❌ BUILD ERROR DETECTED — PUSH CANCELLED TO PROTECT REPO');
    console.error('='.repeat(60));
    console.error(errorMsg);
    console.error('='.repeat(60));
    console.error('Please fix the above compilation error. Auto sync will resume once fixed.\n');
    return false;
  }
}

/**
 * 4. Core Sync Execution
 */
let isSyncing = false;

async function executeSync(options = { skipBuildCheck: false }) {
  if (isSyncing) {
    log('Sync already in progress. Skipping duplicate execution.');
    return;
  }

  isSyncing = true;
  try {
    verifyEnvironment();

    const statusOutput = runGit('status --porcelain');
    if (!statusOutput) {
      log('No changes detected in working tree. Repository is clean.');
      return;
    }

    const lines = statusOutput.split('\n').filter(Boolean);

    // Double check that no forbidden/sensitive files are being added
    for (const line of lines) {
      const filePath = line.slice(3).trim();
      if (filePath.startsWith('.env') && filePath !== '.env.example') {
        throw new Error(`SAFETY ABORT: Refusing to sync secret file: ${filePath}`);
      }
      if (filePath.startsWith('node_modules') || filePath.startsWith('dist')) {
        throw new Error(`SAFETY ABORT: Attempted to stage excluded directory: ${filePath}`);
      }
    }

    log(`Detected ${lines.length} changed file(s):`);
    lines.slice(0, 5).forEach((l) => console.log(`   ${l}`));
    if (lines.length > 5) console.log(`   ...and ${lines.length - 5} more`);

    // Optional build check
    if (!options.skipBuildCheck) {
      const buildOk = validateBuild();
      if (!buildOk) {
        log('Auto sync aborted because the website build failed. Source files left untouched.');
        return;
      }
    }

    // Stage source files
    log('Staging valid source files...');
    runGit('add -u'); // stage modifications to tracked files
    runGit('add src/ public/ scripts/ index.html vite.config.ts package.json .gitignore .env.example GITHUB_SYNC_STATUS.bat START_AUTO_SYNC.bat MANUAL_SYNC.bat 2>nul || ver>nul');

    // Check if anything is staged
    const stagedCheck = runGit('status --porcelain');
    if (!stagedCheck) {
      log('No stageable changes found.');
      return;
    }

    // Commit
    const commitMsg = generateCommitMessage(lines);
    log(`Creating commit: "${commitMsg}"`);
    runGit(`commit -m "${commitMsg}"`);

    // Push
    log('Pushing commit to origin/main on GitHub...');
    const pushOutput = runGit('push origin main');
    log('✓ Successfully pushed to GitHub main!');
    if (pushOutput) console.log(pushOutput);

    console.log('\n' + '='.repeat(60));
    console.log('✅ AUTO GITHUB SYNC COMPLETED SUCCESSFULLY: main -> main');
    console.log('='.repeat(60) + '\n');
  } catch (err) {
    console.error('\n' + '!'.repeat(60));
    console.error('❌ AUTO SYNC FAILED:');
    console.error(err.message);
    console.error('!'.repeat(60) + '\n');
    console.error('Files were NOT deleted. Working tree was preserved.\n');
  } finally {
    isSyncing = false;
  }
}

/**
 * 5. File Watcher with Debounce
 */
function startWatcher() {
  verifyEnvironment();

  console.log('\n' + '='.repeat(60));
  console.log('🚀 AUTO GITHUB SYNC ACTIVE & WATCHING');
  console.log('='.repeat(60));
  console.log(`Repository : https://github.com/arshadali85579-star/Arshad-website-786.git`);
  console.log(`Account    : ${AUTHORIZED_ACCOUNT}`);
  console.log(`Branch     : ${REQUIRED_BRANCH}`);
  console.log(`Debounce   : ${DEBOUNCE_MS / 1000} seconds`);
  console.log('='.repeat(60));
  console.log('Watching for changes in src/, public/, and project config...\n');

  let debounceTimer = null;
  const watchPaths = [
    path.join(PROJECT_ROOT, 'src'),
    path.join(PROJECT_ROOT, 'public'),
    path.join(PROJECT_ROOT, 'index.html'),
    path.join(PROJECT_ROOT, 'vite.config.ts'),
    path.join(PROJECT_ROOT, 'tailwind.config.js'),
    path.join(PROJECT_ROOT, 'postcss.config.js')
  ];

  function scheduleSync(changedPath) {
    // Check if ignored
    for (const ignored of IGNORED_PATHS) {
      if (changedPath && changedPath.includes(ignored)) return;
    }

    log(`Change detected: ${changedPath || 'file updated'}. Waiting ${DEBOUNCE_MS / 1000}s for edits to settle...`);

    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      log('Changes stabilized. Initiating sync...');
      executeSync();
    }, DEBOUNCE_MS);
  }

  // Watch directories
  const dirsToWatch = [path.join(PROJECT_ROOT, 'src'), path.join(PROJECT_ROOT, 'public')];
  dirsToWatch.forEach((dir) => {
    if (fs.existsSync(dir)) {
      fs.watch(dir, { recursive: true }, (eventType, filename) => {
        if (filename) scheduleSync(path.join(dir, filename));
      });
    }
  });

  // Watch root files
  const rootFiles = ['index.html', 'vite.config.ts', 'tailwind.config.js', 'package.json'];
  rootFiles.forEach((file) => {
    const full = path.join(PROJECT_ROOT, file);
    if (fs.existsSync(full)) {
      fs.watch(full, (eventType) => {
        scheduleSync(full);
      });
    }
  });

  // Keep process alive
  setInterval(() => {}, 1000 * 60 * 60);
}

// Command-line dispatch
const args = process.argv.slice(2);
if (args.includes('--now') || args.includes('--manual')) {
  executeSync();
} else if (args.includes('--status')) {
  try {
    const env = verifyEnvironment();
    const status = runGit('status --short');
    const lastCommit = runGit('log -1 --pretty=format:"%h - %s (%cr)"');
    console.log(`Repository: ${env.remoteUrl}`);
    console.log(`Account   : ${env.configuredUser}`);
    console.log(`Branch    : ${env.currentBranch}`);
    console.log(`Status    : ${status ? 'Uncommitted changes present' : 'Clean'}`);
    console.log(`LastCommit: ${lastCommit}`);
  } catch (err) {
    console.error('Error checking status:', err.message);
  }
} else {
  startWatcher();
}
