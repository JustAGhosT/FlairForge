import { readFile } from 'fs/promises'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { fileURLToPath } from 'url'

// Dynamically import the Preview component from the frontend build
let Preview
async function loadPreviewComponent() {
  if (!Preview) {
    console.log('[SSR] Loading Preview component from SSR bundle...')
    Preview = (await import('../../frontend/dist/ssr/entry-server.js')).Preview
    if (!Preview) {
      console.error('[SSR] Failed to load Preview component!')
    }
  }
  return Preview
}

// Load flyer data
async function getFlyerData(flyerId) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const dataPath = path.join(__dirname, '../data/flyerData.json')
  console.log(`[SSR] Loading flyer data from ${dataPath} for flyerId: ${flyerId}`)
  const data = JSON.parse(await readFile(dataPath, 'utf8'))
  const flyer = data[flyerId]
  if (!flyer) {
    console.warn(`[SSR] Flyer data not found for flyerId: ${flyerId}`)
  } else {
    console.log(`[SSR] Found flyer data for flyerId: ${flyerId}`)
  }
  return flyer
}

// Load flyer HTML (EJS rendering)
async function getFlyerHtml(templateId, flyerData) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const ejs = await import('ejs')
  const templatePath = path.join(__dirname, `../templates/${templateId}.ejs`)
  console.log(`[SSR] Loading template from ${templatePath}`)
  try {
    const template = await readFile(templatePath, 'utf8')
    return ejs.render(template, flyerData)
  } catch (err) {
    console.error(`[SSR] Failed to load or render template: ${templatePath}`, err)
    throw err
  }
}

// Main SSR render function
export async function renderFlyerSSR(flyerId, templateId) {
  try {
    const flyerData = await getFlyerData(flyerId)
    if (!flyerData) throw new Error('Flyer not found')
    const html = await getFlyerHtml(templateId, flyerData)
    const Preview = await loadPreviewComponent()
    if (!Preview) throw new Error('Preview component not loaded')
    const element = React.createElement(Preview, { html })
    const rendered = renderToString(element)
    console.log(`[SSR] Successfully rendered flyerId: ${flyerId}`)
    return rendered
  } catch (err) {
    console.error(`[SSR] Error rendering flyerId: ${flyerId} with templateId: ${templateId}`, err)
    throw err
  }
} 