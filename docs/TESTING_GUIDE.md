# FlairForge Testing Guide

This guide provides comprehensive information about testing in the FlairForge project, including how to run tests, write new tests, and understand our testing strategy.

## Table of Contents

1. [Testing Strategy Overview](#testing-strategy-overview)
2. [Test Types](#test-types)
3. [Running Tests](#running-tests)
4. [Writing Tests](#writing-tests)
5. [Test Coverage](#test-coverage)
6. [CI/CD Integration](#cicd-integration)
7. [Troubleshooting](#troubleshooting)

## Testing Strategy Overview

FlairForge follows a comprehensive testing strategy aligned with Cognitive Mesh principles:

- **Unit Tests (65%)**: Test individual components and functions in isolation
- **Integration Tests (20%)**: Test component interactions and API contracts
- **E2E Tests (10%)**: Test complete user workflows
- **Performance Tests (5%)**: Test system performance under load

### Quality Targets

| Metric             | Target    | Current |
| ------------------ | --------- | ------- |
| Unit Test Coverage | ≥80%      | TBD     |
| API Response Time  | <2s (P95) | TBD     |
| Error Rate         | <1%       | TBD     |
| Build Success Rate | ≥95%      | TBD     |

## Test Types

### 1. Unit Tests

Unit tests verify individual functions, components, and utilities in isolation.

**Frontend Unit Tests:**

- React components (rendering, state, props)
- Utility functions (AI enhancement, form validation)
- Store management (Zustand state)

**Backend Unit Tests:**

- API endpoint logic
- Template processing
- AI enhancement algorithms
- Data validation

**Running Unit Tests:**

```bash
# Frontend unit tests
npm run test:unit:frontend

# Backend unit tests
npm run test:unit:backend

# All unit tests
npm run test:unit
```

### 2. Integration Tests

Integration tests verify how components work together and API contracts.

**Frontend Integration:**

- Component interactions
- API calls and responses
- State management integration

**Backend Integration:**

- API endpoint integration
- Database operations
- External service integration

**Running Integration Tests:**

```bash
# Backend integration tests
npm run test:integration

# All integration tests
npm run test:integration
```

### 3. End-to-End (E2E) Tests

E2E tests verify complete user workflows using Playwright.

**Test Scenarios:**

- Complete flyer creation workflow
- AI enhancement process
- Template selection and preview
- Export functionality
- Error handling
- Responsive design

**Running E2E Tests:**

```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run specific E2E test
npx playwright test tests/e2e/flyer-creation.spec.ts
```

### 4. Performance Tests

Performance tests use k6 to load test the application.

**Test Scenarios:**

- API response times under load
- Concurrent user simulation
- Resource usage monitoring
- Performance regression detection

**Running Performance Tests:**

```bash
# Run performance tests
npm run test:performance

# Run with custom base URL
BASE_URL=https://staging.flairforge.netlify.app npm run test:performance
```

### 5. Security Tests

Security tests validate input sanitization, XSS prevention, and other security measures.

**Test Areas:**

- Input validation and sanitization
- File upload security
- XSS prevention
- CSRF protection
- Authentication (future)

**Running Security Tests:**

```bash
# Run security tests
npm run test:security

# Run npm audit
npm audit --audit-level=moderate
```

## Running Tests

### Prerequisites

#### 1. Install dependencies

```bash
npm run install:all
```

#### 2. Install Playwright browsers (for E2E tests)

```bash
cd frontend && npx playwright install --with-deps
```

#### 3. Install k6 (for performance tests)

```bash
# macOS
brew install k6

# Windows
choco install k6

# Linux
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

### Test Commands

```bash
# Run all tests
npm test

# Run specific test types
npm run test:unit          # Unit tests only
npm run test:integration   # Integration tests only
npm run test:e2e          # E2E tests only
npm run test:performance  # Performance tests only
npm run test:security     # Security tests only

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode (frontend only)
cd frontend && npm run test:watch

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix
```

### Environment Variables

Set these environment variables for testing:

```bash
# For E2E tests
BASE_URL=http://localhost:5173

# For performance tests
BASE_URL=https://flairforge.netlify.app

# For API tests
API_BASE_URL=http://localhost:8888
```

## Writing Tests

### Frontend Test Structure

``` text
frontend/
├── tests/
│   ├── unit/
│   │   ├── components/
│   │   │   ├── Header.test.tsx
│   │   │   ├── TemplateSelector.test.tsx
│   │   │   └── ...
│   │   ├── utils/
│   │   │   ├── ai-enhancer.test.ts
│   │   │   └── ...
│   │   └── store/
│   │       └── useAppStore.test.ts
│   ├── e2e/
│   │   ├── flyer-creation.spec.ts
│   │   └── ...
│   └── performance/
│       └── load-test.js
└── src/
    └── test/
        ├── setup.ts
        └── utils.tsx
```

### Backend Test Structure

``` text
backend/
├── tests/
│   ├── unit/
│   │   ├── api.test.js
│   │   ├── utils/
│   │   │   ├── template-manager.test.js
│   │   │   └── ...
│   │   └── ...
│   └── integration/
│       └── api-integration.test.js
└── src/
    └── ...
```

### Writing Unit Tests

#### Frontend Component Test Example

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '../../src/test/utils'
import TemplateSelector from '../../src/components/TemplateSelector/TemplateSelector'

describe('TemplateSelector Component', () => {
  it('renders template options', () => {
    render(<TemplateSelector />)
    
    expect(screen.getByText('Cheesy Pig')).toBeInTheDocument()
    expect(screen.getByText('A fun and engaging template')).toBeInTheDocument()
  })

  it('handles template selection', () => {
    const mockSetSelectedTemplate = vi.fn()
    // Mock store...
    
    render(<TemplateSelector />)
    
    const templateOption = screen.getByRole('button', { name: /select cheesy pig/i })
    fireEvent.click(templateOption)
    
    expect(mockSetSelectedTemplate).toHaveBeenCalledWith(mockTemplateData)
  })
})
```

#### Backend API Test Example

```javascript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import request from 'supertest'
import { createServer } from '../src/server.js'

describe('API Endpoints', () => {
  let app

  beforeEach(() => {
    app = createServer()
    vi.clearAllMocks()
  })

  it('generates flyer successfully', async () => {
    const flyerData = {
      template: 'cheesy-pig',
      data: { title: 'Test Flyer', description: 'Test description' }
    }

    const response = await request(app)
      .post('/api/generate-flyer')
      .send(flyerData)
      .expect(200)

    expect(response.body.success).toBe(true)
    expect(response.body.data).toHaveProperty('flyerId')
  })
})
```

### Writing E2E Tests

```typescript
import { test, expect } from '@playwright/test'

test.describe('Flyer Creation Workflow', () => {
  test('complete flyer generation workflow', async ({ page }) => {
    await page.goto('/')
    
    // Navigate to flyer creation
    await page.click('[data-testid="create-flyer-button"]')
    await expect(page.locator('[data-testid="flyer-creator"]')).toBeVisible()

    // Select template
    await page.click('[data-testid="template-cheesy-pig"]')
    
    // Fill content
    await page.fill('[data-testid="title-input"]', 'Amazing Pizza Sale!')
    
    // Generate flyer
    await page.click('[data-testid="generate-flyer-button"]')
    await expect(page.locator('[data-testid="flyer-preview"]')).toBeVisible({ timeout: 10000 })
  })
})
```

### Writing Performance Tests

```javascript
import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  stages: [
    { duration: '2m', target: 10 },
    { duration: '5m', target: 10 },
    { duration: '2m', target: 0 }
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.1']
  }
}

export default function() {
  const response = http.post(
    'https://flairforge.netlify.app/.netlify/functions/api/generate-flyer',
    JSON.stringify({
      template: 'cheesy-pig',
      data: { title: 'Performance Test Flyer' }
    }),
    { headers: { 'Content-Type': 'application/json' } }
  )

  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 5000ms': (r) => r.timings.duration < 5000
  })

  sleep(1)
}
```

## Test Coverage

### Coverage Reports

Coverage reports are generated automatically when running tests with coverage:

```bash
npm run test:coverage
```

Coverage reports are available in:

- Frontend: `frontend/coverage/`
- Backend: `backend/coverage/`

### Coverage Targets

- **Statements**: ≥80%
- **Branches**: ≥80%
- **Functions**: ≥80%
- **Lines**: ≥80%

### Excluded Files

The following files are excluded from coverage:

- Test files (`*.test.*`, `*.spec.*`)
- Configuration files
- Build outputs
- Mock files

## CI/CD Integration

### GitHub Actions

Tests run automatically on:

- Push to `main` and `develop` branches
- Pull requests to `main` and `develop` branches

### Test Pipeline

1. **Pre-commit**: Lint and unit tests
2. **Pull Request**: Full test suite
3. **Merge to Main**: Performance and security tests
4. **Deploy**: Smoke tests and monitoring verification

### Test Artifacts

- Coverage reports uploaded to Codecov
- Playwright reports uploaded as artifacts
- Performance test results stored for trend analysis

## Troubleshooting

### Common Issues

#### 1. Test Environment Setup

**Problem**: Tests fail due to missing dependencies
**Solution**:

```bash
npm run install:all
cd frontend && npx playwright install --with-deps
```

#### 2. E2E Test Failures

**Problem**: E2E tests fail due to timing issues
**Solution**: Increase timeouts in test files:

```typescript
await expect(page.locator('[data-testid="element"]')).toBeVisible({ timeout: 10000 })
```

#### 3. Performance Test Failures

**Problem**: Performance tests fail due to network issues
**Solution**: Check network connectivity and API availability:

```bash
curl https://flairforge.netlify.app/.netlify/functions/api/templates
```

#### 4. Coverage Issues

**Problem**: Coverage reports show incorrect data
**Solution**: Clean and rebuild:

```bash
npm run clean
npm run install:all
npm run test:coverage
```

### Debugging Tests

#### Frontend Tests

```bash
# Run tests in debug mode
cd frontend && npm run test:watch

# Debug specific test
npm test -- --run tests/unit/components/Header.test.tsx
```

#### Backend Tests

```bash
# Run tests with verbose output
cd backend && npm test -- --reporter=verbose

# Debug specific test
npm test -- tests/unit/api.test.js
```

#### E2E Tests

```bash
# Run tests with UI
cd frontend && npm run test:e2e:ui

# Run tests in headed mode
npx playwright test --headed

# Debug specific test
npx playwright test tests/e2e/flyer-creation.spec.ts --debug
```

### Getting Help

1. Check the test logs for specific error messages
2. Review the testing strategy document
3. Consult the component documentation
4. Check GitHub Actions logs for CI/CD issues
5. Create an issue with detailed error information

## Best Practices

### Test Writing

1. **Follow AAA Pattern**: Arrange, Act, Assert
2. **Use Descriptive Test Names**: Clear, specific test descriptions
3. **Test One Thing**: Each test should verify one specific behavior
4. **Use Data Attributes**: Use `data-testid` for element selection
5. **Mock External Dependencies**: Isolate units under test

### Test Organization

1. **Group Related Tests**: Use `describe` blocks for logical grouping
2. **Use Setup/Teardown**: Clean up between tests
3. **Share Test Data**: Use fixtures and utilities for common data
4. **Maintain Test Independence**: Tests should not depend on each other

### Performance

1. **Optimize Test Speed**: Use efficient selectors and minimal setup
2. **Parallel Execution**: Run tests in parallel when possible
3. **Mock Heavy Operations**: Mock file I/O, network calls, and database operations
4. **Use Test Data**: Avoid creating real data in tests

### Maintenance

1. **Update Tests with Code**: Keep tests in sync with implementation
2. **Review Test Coverage**: Regularly check coverage reports
3. **Refactor Test Code**: Keep test code clean and maintainable
4. **Document Test Patterns**: Share testing patterns and utilities

---

For more information, see the [Testing Strategy Document](flairforge-testing-strategy.md) and [API Documentation](flairforge-api-reference.md).
