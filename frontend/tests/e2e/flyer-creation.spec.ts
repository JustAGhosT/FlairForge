import { expect, test } from '@playwright/test'

test.describe('Flyer Creation Workflow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('complete flyer generation workflow', async ({ page }) => {
    // Step 1: Navigate to flyer creation
    await page.click('[data-testid="create-flyer-button"]')
    await expect(page.locator('[data-testid="flyer-creator"]')).toBeVisible()

    // Step 2: Select a template
    await page.click('[data-testid="template-cheesy-pig"]')
    await expect(page.locator('[data-testid="template-selected"]')).toBeVisible()

    // Step 3: Fill in flyer content
    await page.fill('[data-testid="title-input"]', 'Amazing Pizza Sale!')
    await page.fill('[data-testid="description-input"]', '50% off all pizzas this weekend')
    await page.fill('[data-testid="business-name-input"]', 'Cheesy Pig Pizza')
    await page.fill('[data-testid="contact-input"]', '555-1234')

    // Step 4: Generate flyer
    await page.click('[data-testid="generate-flyer-button"]')
    
    // Step 5: Wait for generation and verify preview
    await expect(page.locator('[data-testid="flyer-preview"]')).toBeVisible({ timeout: 10000 })
    await expect(page.locator('[data-testid="flyer-preview"] img')).toBeVisible()

    // Step 6: Verify flyer content
    await expect(page.locator('[data-testid="flyer-title"]')).toContainText('Amazing Pizza Sale!')
    await expect(page.locator('[data-testid="flyer-description"]')).toContainText('50% off all pizzas this weekend')
    await expect(page.locator('[data-testid="flyer-business"]')).toContainText('Cheesy Pig Pizza')
  })

  test('AI enhancement workflow', async ({ page }) => {
    // Navigate to AI enhancement
    await page.click('[data-testid="ai-enhancement-tab"]')
    await expect(page.locator('[data-testid="ai-enhancement-panel"]')).toBeVisible()

    // Enter content for enhancement
    await page.fill('[data-testid="content-input"]', 'sale today')
    await page.click('[data-testid="enhance-content-button"]')

    // Wait for AI enhancement
    await expect(page.locator('[data-testid="enhanced-content"]')).toBeVisible({ timeout: 10000 })
    
    // Verify enhanced content
    const enhancedText = await page.locator('[data-testid="enhanced-content"]').textContent()
    expect(enhancedText).toContain('sale')
    expect(enhancedText.length).toBeGreaterThan('sale today'.length)
  })

  test('template selection and preview', async ({ page }) => {
    // Browse templates
    await page.click('[data-testid="templates-tab"]')
    await expect(page.locator('[data-testid="templates-grid"]')).toBeVisible()

    // Select different template
    await page.click('[data-testid="template-business-classic"]')
    await expect(page.locator('[data-testid="template-preview"]')).toBeVisible()

    // Verify template preview shows correct template
    await expect(page.locator('[data-testid="template-name"]')).toContainText('Business Classic')
  })

  test('export functionality', async ({ page }) => {
    // Create a flyer first
    await page.click('[data-testid="create-flyer-button"]')
    await page.click('[data-testid="template-cheesy-pig"]')
    await page.fill('[data-testid="title-input"]', 'Test Export Flyer')
    await page.click('[data-testid="generate-flyer-button"]')
    await expect(page.locator('[data-testid="flyer-preview"]')).toBeVisible({ timeout: 10000 })

    // Test PDF export
    const downloadPromise = page.waitForEvent('download')
    await page.click('[data-testid="export-pdf-button"]')
    const download = await downloadPromise
    expect(download.suggestedFilename()).toMatch(/\.pdf$/)

    // Test PNG export
    const pngDownloadPromise = page.waitForEvent('download')
    await page.click('[data-testid="export-png-button"]')
    const pngDownload = await pngDownloadPromise
    expect(pngDownload.suggestedFilename()).toMatch(/\.png$/)
  })

  test('error handling - invalid template', async ({ page }) => {
    // Try to generate flyer without selecting template
    await page.click('[data-testid="create-flyer-button"]')
    await page.fill('[data-testid="title-input"]', 'Test Flyer')
    await page.click('[data-testid="generate-flyer-button"]')

    // Should show error message
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible()
    await expect(page.locator('[data-testid="error-message"]')).toContainText('Please select a template')
  })

  test('error handling - missing required fields', async ({ page }) => {
    // Try to generate flyer without required fields
    await page.click('[data-testid="create-flyer-button"]')
    await page.click('[data-testid="template-cheesy-pig"]')
    await page.click('[data-testid="generate-flyer-button"]')

    // Should show validation errors
    await expect(page.locator('[data-testid="title-error"]')).toBeVisible()
    await expect(page.locator('[data-testid="title-error"]')).toContainText('Title is required')
  })

  test('responsive design - mobile view', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    // Verify mobile navigation works
    await page.click('[data-testid="mobile-menu-button"]')
    await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible()

    // Verify template selection works on mobile
    await page.click('[data-testid="create-flyer-button"]')
    await page.click('[data-testid="template-cheesy-pig"]')
    await expect(page.locator('[data-testid="template-selected"]')).toBeVisible()
  })
}) 