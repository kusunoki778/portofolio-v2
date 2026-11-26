import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

// Converts a PDF into one PNG per page by loading it inside Chrome headless and
// rendering each page to a canvas, then screenshotting that canvas at 2x.
// Usage: node scripts/pdf-to-images.mjs <input.pdf> <output-prefix>
// Example: node scripts/pdf-to-images.mjs public/assets/CV.pdf public/assets/cv-page

const CHROME = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const input = process.argv[2]
const outputPrefix = process.argv[3] || 'public/assets/cv-page'
const TARGET_WIDTH = 1240 // ~150 DPI for an A4 page, sharp on phones without being heavy
const PORT = 9600 + Math.floor(Math.random() * 300)

if (!input) {
  console.error('Usage: node scripts/pdf-to-images.mjs <input.pdf> <output-prefix>')
  process.exit(1)
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const profile = `${process.env.TEMP || '.'}\\chrome-pdf2img-${Date.now()}`

const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    '--window-size=1240,1754',
    'about:blank',
  ],
  { stdio: 'ignore' },
)

async function getTargets() {
  for (let i = 0; i < 100; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`)
      if (res.ok) return await res.json()
    } catch {}
    await sleep(250)
  }
  throw new Error('DevTools endpoint not ready')
}

function connect(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl)
    ws.onopen = () => resolve(ws)
    ws.onerror = reject
  })
}

let id = 0
function send(ws, method, params = {}) {
  return new Promise((resolve, reject) => {
    const msgId = ++id
    const onMessage = (event) => {
      const msg = JSON.parse(event.data)
      if (msg.id !== msgId) return
      ws.removeEventListener('message', onMessage)
      if (msg.error) reject(new Error(JSON.stringify(msg.error)))
      else resolve(msg.result)
    }
    ws.addEventListener('message', onMessage)
    ws.send(JSON.stringify({ id: msgId, method, params }))
  })
}

const pdfUrl = new URL(`file:///${path.resolve(input).replace(/\\/g, '/')}`).href
// A data: URL cannot read file:// URLs, so the PDF is inlined as base64 instead.
const pdfDataUrl = `data:application/pdf;base64,${fs.readFileSync(path.resolve(input)).toString('base64')}`
const pageHtml = `<!doctype html><html><head><meta charset="utf-8"><style>
  html,body{margin:0;padding:0;background:#fff}
  canvas{display:block;width:${TARGET_WIDTH}px;height:auto}
</style></head><body><div id="out"></div>
<script type="module">
  import * as pdfjs from 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.8.69/build/pdf.min.mjs'
  pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.8.69/build/pdf.worker.min.mjs'
  window.renderPdf = async (url) => {
    const doc = await pdfjs.getDocument({ url, isEvalSupported: false }).promise
    const out = document.getElementById('out')
    out.innerHTML = ''
    const layers = []
    for (let n = 1; n <= doc.numPages; n++) {
      const page = await doc.getPage(n)
      const base = page.getViewport({ scale: 1 })
      const scale = ${TARGET_WIDTH} / base.width
      const viewport = page.getViewport({ scale })
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(viewport.width)
      canvas.height = Math.round(viewport.height)
      out.appendChild(canvas)
      await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise
      layers.push({ page: n, width: canvas.width, height: canvas.height })
    }
    document.body.dataset.ready = 'true'
    return { pages: doc.numPages, layers }
  }
</script></body></html>`

try {
  fs.mkdirSync(path.dirname(outputPrefix), { recursive: true })
  const targets = await getTargets()
  const page = targets.find((t) => t.type === 'page')
  const ws = await connect(page.webSocketDebuggerUrl)
  await send(ws, 'Page.enable')
  await send(ws, 'Runtime.enable')

  await send(ws, 'Page.navigate', { url: 'data:text/html;charset=utf-8,' + encodeURIComponent(pageHtml) })
  await sleep(2500)

  const rendered = await send(ws, 'Runtime.evaluate', {
    expression: `window.renderPdf(${JSON.stringify(pdfDataUrl)})`,
    awaitPromise: true,
    returnByValue: true,
  })
  if (rendered.exceptionDetails) throw new Error(JSON.stringify(rendered.exceptionDetails))

  const { layers } = rendered.result.value
  for (const layer of layers) {
    const box = await send(ws, 'Runtime.evaluate', {
      expression: `(() => { const c = document.querySelectorAll('canvas')[${layer.page - 1}]; const r = c.getBoundingClientRect(); return { x: 0, y: r.top + window.scrollY, width: Math.round(r.width), height: Math.round(r.height) } })()`,
      returnByValue: true,
    })
    const { data } = await send(ws, 'Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
      clip: { ...box.result.value, scale: 2 },
    })
    const file = `${outputPrefix}-${layer.page}.png`
    fs.writeFileSync(file, Buffer.from(data, 'base64'))
    console.log('wrote', file, box.result.value.width + 'x' + box.result.value.height)
  }
  ws.close()
} catch (error) {
  console.error('ERROR', error.message)
  process.exitCode = 1
} finally {
  chrome.kill()
  await sleep(500)
  try {
    fs.rmSync(profile, { recursive: true, force: true })
  } catch {}
}
