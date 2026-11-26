/**
 * Dev-only middleware so `npm run dev` and `npm run preview` also answer
 * `/api/github` the same way Vercel does in production.
 * Set GITHUB_TOKEN in your shell (or .env.local) to avoid rate limits.
 */
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'

const handlerPath = join(dirname(fileURLToPath(import.meta.url)), '..', 'api', 'github.js')

export function githubApiPlugin() {
  const handle = async (req, res, next) => {
    if (!req.url?.startsWith('/api/github')) return next()

    try {
      const mod = await import(`${pathToFileURL(handlerPath).href}?t=${Date.now()}`)
      const fakeResponse = {
        statusCode: 200,
        headers: {},
        status(code) {
          this.statusCode = code
          return this
        },
        setHeader(key, value) {
          this.headers[key] = value
        },
        json(payload) {
          res.statusCode = this.statusCode
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          for (const [key, value] of Object.entries(this.headers)) res.setHeader(key, value)
          res.end(JSON.stringify(payload))
        },
      }
      await mod.default({ method: req.method, headers: req.headers }, fakeResponse)
    } catch (error) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      console.error('[github-api]', error)
      res.end(JSON.stringify({ error: String(error?.stack || error?.message || error) }))
    }
  }

  return {
    name: 'portfolio-github-api',
    configureServer(server) {
      server.middlewares.use(handle)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handle)
    },
  }
}
