import { hydrateRoot } from 'react-dom/client'
import Preview from '../components/Preview/Preview'

// @ts-ignore
const flyerHtml = window.__FLYER_HTML__ as string

hydrateRoot(
  document.getElementById('root')!,
  <Preview html={flyerHtml} />
) 