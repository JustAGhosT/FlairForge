import { hydrateRoot } from 'react-dom/client'
import Preview from '../components/Preview/Preview'

// @ts-expect-error - __FLYER_HTML__ is injected by the server
const flyerHtml = window.__FLYER_HTML__ as string

hydrateRoot(
  document.getElementById('root')!,
  <Preview html={flyerHtml} />
) 