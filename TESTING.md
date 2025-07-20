# Testing FlairForge Monorepo

## Test Scripts Overview

### Run All Tests (Frontend & Backend)
- **`npm test`** or **`npm run test:all`**
  - Runs all tests (unit, E2E) using the custom runner (`tests/scripts/test-runner.js`).

### Run Only Unit Tests
- **`npm run test:unit`**
  - Runs all unit tests (frontend and backend).
- **`npm run test:unit:frontend`**
  - Runs only frontend unit tests.
- **`npm run test:unit:backend`**
  - Runs only backend unit tests.

### Run Only E2E Tests
- **`npm run test:e2e`**
  - Runs all frontend E2E tests (Playwright).
- **`npm run test:e2e:frontend`**
  - Alias for frontend E2E tests.

### Run All Frontend Tests
- **`npm run test:frontend`**
  - Runs all frontend tests (unit, E2E, etc.).

### Run All Backend Tests
- **`npm run test:backend`**
  - Runs all backend tests (unit, integration, etc.).

---

## Custom Test Runner & Scripts
- The custom test runner is located at `tests/scripts/test-runner.js`.
- Additional test utility scripts are in `tests/scripts/`.
- The runner executes frontend unit tests, starts the dev server, runs E2E tests, and shuts down the server automatically.

---

## Notes
- For most workflows, use `npm test` or `npm run test:all` from the project root.
- For targeted testing, use the specific scripts above.
- See `frontend/package.json` and `backend/package.json` for more granular test scripts. 