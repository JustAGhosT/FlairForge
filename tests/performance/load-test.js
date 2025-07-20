import { check, sleep } from 'k6'
import http from 'k6/http'
import { Rate } from 'k6/metrics'

// Custom metrics
const errorRate = new Rate('errors')

// Test configuration
export const options = {
  stages: [
    { duration: '2m', target: 10 }, // Ramp up to 10 users
    { duration: '5m', target: 10 }, // Stay at 10 users
    { duration: '2m', target: 50 }, // Ramp up to 50 users
    { duration: '5m', target: 50 }, // Stay at 50 users
    { duration: '2m', target: 0 },  // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% of requests must complete below 2s
    http_req_failed: ['rate<0.1'],     // Error rate must be less than 10%
    errors: ['rate<0.1'],              // Custom error rate
  },
}

// Test data
const testData = {
  template: 'cheesy-pig',
  data: {
    title: 'Performance Test Flyer',
    description: 'Testing flyer generation performance under load',
    businessName: 'Test Business',
    contactInfo: 'test@example.com',
    tagline: 'Amazing deals!'
  }
}

// Main test function
export default function() {
  const baseUrl = __ENV.BASE_URL || 'https://flairforge.netlify.app'
  
  // Test 1: Get templates
  const templatesResponse = http.get(`${baseUrl}/.netlify/functions/api/templates`)
  check(templatesResponse, {
    'templates status is 200': (r) => r.status === 200,
    'templates response time < 1000ms': (r) => r.timings.duration < 1000,
    'templates has data': (r) => r.json('success') === true && r.json('data').length > 0,
  }) || errorRate.add(1)

  sleep(1)

  // Test 2: Generate flyer
  const flyerResponse = http.post(
    `${baseUrl}/.netlify/functions/api/generate-flyer`,
    JSON.stringify(testData),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  
  check(flyerResponse, {
    'flyer generation status is 200': (r) => r.status === 200,
    'flyer generation response time < 5000ms': (r) => r.timings.duration < 5000,
    'flyer generation has flyerId': (r) => r.json('success') === true && r.json('data.flyerId'),
    'flyer generation has previewUrl': (r) => r.json('success') === true && r.json('data.previewUrl'),
  }) || errorRate.add(1)

  sleep(2)

  // Test 3: AI content enhancement
  const enhanceResponse = http.post(
    `${baseUrl}/.netlify/functions/api/enhance-content`,
    JSON.stringify({ content: 'sale today' }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  
  check(enhanceResponse, {
    'enhancement status is 200': (r) => r.status === 200,
    'enhancement response time < 3000ms': (r) => r.timings.duration < 3000,
    'enhancement has enhanced text': (r) => r.json('success') === true && r.json('data.enhancedText'),
  }) || errorRate.add(1)

  sleep(1)
}

// Setup function (runs once before the test)
export function setup() {
  const baseUrl = __ENV.BASE_URL || 'https://flairforge.netlify.app'
  
  // Verify the API is accessible
  const healthCheck = http.get(`${baseUrl}/.netlify/functions/api/templates`)
  
  if (healthCheck.status !== 200) {
    throw new Error(`API health check failed: ${healthCheck.status}`)
  }
  
  console.log('Performance test setup completed')
  return { baseUrl }
}

// Teardown function (runs once after the test)
export function teardown(data) {
  console.log('Performance test completed')
} 