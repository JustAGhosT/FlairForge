import express from 'express'
import { renderFlyerSSR } from './ssrFlyerRenderer.js'

const router = express.Router()

// SSR flyer route: /flyer/:id
router.get('/flyer/:id', async (req, res) => {
  const flyerId = req.params.id
  // For demo, assume templateId === flyerId
  const templateId = flyerId
  try {
    const flyerHtml = await renderFlyerSSR(flyerId, templateId)
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
        </body>
      </html>
    `)
  } catch (err) {
    res.status(404).send(`<h1>Flyer not found</h1><pre>${err.message}</pre>`)
  }
})

export default router 