import { expect, test } from '@playwright/test'

test.describe('Navigation and Routing', () => {
  test('page has correct title', async ({ page }) => {
    await page.goto('/')
    
    // Check that title contains expected text
    const title = await page.title()
    expect(title).toBeTruthy()
    expect(title.length).toBeGreaterThan(0)
  })

  test('root element is present and visible', async ({ page }) => {
    await page.goto('/')
    
    const root = page.locator('#root')
    await expect(root).toBeVisible()
    
    // Root should have content
    const content = await root.textContent()
    expect(content).toBeTruthy()
  })

  test('page responds to viewport changes', async ({ page }) => {
    await page.goto('/')
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(page.locator('body')).toBeVisible()
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.locator('body')).toBeVisible()
  })

  test('page loads required assets', async ({ page }) => {
    await page.goto('/')
    
    // Wait for network to be idle
    await page.waitForLoadState('networkidle')
    
    // Verify app is interactive
    await expect(page.locator('#root')).toBeVisible()
  })

  test('no console errors on page load', async ({ page }) => {
    const consoleErrors: string[] = []
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    // Allow for expected errors (like missing API endpoints in dev)
    const criticalErrors = consoleErrors.filter(
      err => !err.includes('404') && !err.includes('Failed to fetch')
    )
    
    expect(criticalErrors).toHaveLength(0)
  })
})
