import React from 'react'
import { readFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { renderToString } from 'react-dom/server'

// Dynamically import the Preview component from the frontend build
let Preview
async function loadPreviewComponent() {
  if (!Preview) {
    // Use the built SSR bundle from Vite (to be created)
    Preview = (await import('../../frontend/dist/ssr/entry-server.js')).Preview
  }
  return Preview
}

// Load flyer data
async function getFlyerData(flyerId) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const dataPath = path.join(__dirname, '../data/flyerData.json')
  const data = JSON.parse(await readFile(dataPath, 'utf8'))
  return data[flyerId]
}

// Load flyer HTML (EJS rendering)
async function getFlyerHtml(templateId, flyerData) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const ejs = await import('ejs')
  const templatePath = path.join(__dirname, `../templates/${templateId}.ejs`)
  const template = await readFile(templatePath, 'utf8')
  return ejs.render(template, flyerData)
}

// Main SSR render function
export async function renderFlyerSSR(flyerId, templateId) {
  const flyerData = await getFlyerData(flyerId)
  if (!flyerData) throw new Error('Flyer not found')
  const html = await getFlyerHtml(templateId, flyerData)
  const Preview = await loadPreviewComponent()
  const element = React.createElement(Preview, { html })
  return renderToString(element)
} 