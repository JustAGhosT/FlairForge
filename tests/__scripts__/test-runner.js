// frontend/tests/test-runner.js
// Custom test runner for FlairForge frontend
// Runs unit tests, starts the dev server, runs E2E tests, and shuts down the server.
// Usage: npm run test:all (after adding the script to package.json)

const { exec } = require('child_process');
const fs = require('fs');

// Console colors for output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m'
};

// Helper to run a shell command and capture output
const runCommand = (command, cwd = process.cwd()) => {
  return new Promise((resolve, reject) => {
    console.log(`${colors.cyan}Running: ${command}${colors.reset}`);
    exec(command, { cwd }, (error, stdout, stderr) => {
      if (error) {
        console.error(`${colors.red}Error: ${error.message}${colors.reset}`);
        return reject({ error, stdout, stderr });
      }
      resolve({ stdout, stderr });
    });
  });
};

// Parse Vitest JSON output
function parseVitestResults(json) {
  let passed = 0, failed = 0, skipped = 0;
  if (json && json.testResults) {
    for (const suite of json.testResults) {
      for (const test of suite.tests) {
        if (test.result === 'pass') passed++;
        else if (test.result === 'fail') failed++;
        else if (test.result === 'skip') skipped++;
      }
    }
  }
  return { passed, failed, skipped };
}

// Parse Playwright JSON output
function parsePlaywrightResults(json) {
  let passed = 0, failed = 0, skipped = 0;
  if (json && json.suites) {
    for (const suite of json.suites) {
      for (const test of suite.tests) {
        for (const result of test.results) {
          if (result.status === 'passed') passed++;
          else if (result.status === 'failed') failed++;
          else if (result.status === 'skipped') skipped++;
        }
      }
    }
  }
  return { passed, failed, skipped };
}

// Main test runner logic
const runTests = async () => {
  try {
    console.log(`${colors.yellow}🚀 Starting test suite...${colors.reset}`);

    // 1. Run unit tests with JSON reporter
    console.log(`\n${colors.cyan}=== Running Unit Tests ===${colors.reset}`);
    const vitestJsonPath = 'vitest-report.json';
    await runCommand(`npx vitest --run --reporter=json --config=tests/__config__/vitest.config.frontend.ts --outputFile=${vitestJsonPath}`);
    const vitestJson = JSON.parse(fs.readFileSync(vitestJsonPath, 'utf-8'));
    const unitSummary = parseVitestResults(vitestJson);
    fs.unlinkSync(vitestJsonPath);
    console.log(`${colors.green}Unit Test Results:${colors.reset} Passed: ${unitSummary.passed}, Failed: ${unitSummary.failed}, Skipped: ${unitSummary.skipped}`);
    if (unitSummary.failed > 0) {
      console.log(`${colors.red}❌ Unit tests failed. Fix these before running E2E tests.${colors.reset}`);
      printNextSteps();
      process.exit(1);
    }

    // 2. Start the dev server in the background
    console.log(`\n${colors.cyan}=== Starting Development Server ===${colors.reset}`);
    const serverProcess = exec('npm run dev');
    console.log('Waiting for server to start... (this may take a moment)');
    await new Promise(resolve => setTimeout(resolve, 10000));

    try {
      // 3. Run E2E tests with Playwright JSON reporter
      console.log(`\n${colors.cyan}=== Running E2E Tests ===${colors.reset}`);
      const pwJsonPath = 'playwright-report.json';
      await runCommand(`npx playwright test --reporter=json --output=${pwJsonPath}`);
      const pwJson = JSON.parse(fs.readFileSync(pwJsonPath, 'utf-8'));
      const e2eSummary = parsePlaywrightResults(pwJson);
      fs.unlinkSync(pwJsonPath);
      console.log(`${colors.green}E2E Test Results:${colors.reset} Passed: ${e2eSummary.passed}, Failed: ${e2eSummary.failed}, Skipped: ${e2eSummary.skipped}`);
      if (e2eSummary.failed > 0) {
        console.log(`${colors.red}❌ E2E tests failed. See above for details.${colors.reset}`);
        printNextSteps();
        process.exit(1);
      }
      console.log(`\n${colors.green}✅ All tests completed successfully!${colors.reset}`);
      printNextSteps();
    } finally {
      // 4. Ensure the dev server is killed after tests
      try {
        process.kill(serverProcess.pid, 'SIGTERM');
      } catch (e) {
        console.error('Error stopping server:', e);
      }
    }
  } catch (error) {
    console.error(`\n${colors.red}❌ Tests failed: ${error.message}${colors.reset}`);
    printNextSteps();
    process.exit(1);
  }
};

function printNextSteps() {
  console.log(`\n${colors.yellow}Next time, run ${colors.cyan}npm run test:frontend${colors.yellow} to confirm frontend passes before running all tests.${colors.reset}`);
  console.log(`${colors.yellow}For more details, see TESTING.md.${colors.reset}`);
}

// Run the test suite
runTests(); 