import express from 'express'
import puppeteer from 'puppeteer'
import { renderFlyerSSR } from './ssrFlyerRenderer.js'

const router = express.Router()

// SSR flyer route: /flyer/:id
router.get('/flyer/:id', async (req, res) => {
  const flyerId = req.params.id
  // For demo, assume templateId === flyerId
  const templateId = flyerId
  try {
    const flyerHtml = await renderFlyerSSR(flyerId, templateId)
    // Path to the client bundle (ensure this matches your Vite output)
    const clientBundle = '/static/ssr/ssr-client.js'
    res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Flyer: ${flyerId}</title>
          <link rel="stylesheet" href="/static/preview.css" />
        </head>
        <body>
          <div id="root">${flyerHtml}</div>
          <script>window.__FLYER_HTML__ = ${JSON.stringify(flyerHtml)};</script>
          <script type="module" src="${clientBundle}"></script>
        </body>
      </html>
    `)
  } catch (err) {
    res.status(404).send(`<h1>Flyer not found</h1><pre>${err.message}</pre>`)
  }
})

// Export flyer as PNG/JPG
router.get('/flyer/:id/export', async (req, res) => {
  const flyerId = req.params.id
  const templateId = flyerId
  const format = req.query.format === 'jpg' ? 'jpeg' : 'png'
  try {
    // Launch Puppeteer
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
    const page = await browser.newPage()
    // SSR flyer URL (assumes server is accessible at localhost)
    const url = `http://localhost:3001/flyer/${flyerId}`
    await page.goto(url, { waitUntil: 'networkidle0' })
    // Screenshot the flyer root div
    const element = await page.$('#root')
    if (!element) {
      await browser.close()
      res.status(404).send(`<h1>Export failed</h1><pre>#root element not found. SSR page may have returned 404 or error.</pre>`)
      return
    }
    const buffer = await element.screenshot({ type: format })
    await browser.close()
    res.set('Content-Type', format === 'png' ? 'image/png' : 'image/jpeg')
    res.set('Content-Disposition', `attachment; filename="flyer-${flyerId}.${format}"`)
    res.send(buffer)
  } catch (err) {
    res.status(500).send(`<h1>Export failed</h1><pre>${err.message}</pre>`)
  }
})

export default router 