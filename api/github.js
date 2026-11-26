// Vercel serverless function: https://<site>/api/github
// One upstream call for every visitor, cached for an hour, so the browser never
// touches the GitHub rate limit (60 requests/hour per IP without a token).
//
// Required env var (Vercel → Settings → Environment Variables):
//   GITHUB_TOKEN = personal access token with only public read access

const USERNAME = 'kusunoki778'
const TOP_REPOS = 5
const CACHE_TTL_MS = 60 * 60 * 1000 // 1 hour
const FETCH_TIMEOUT_MS = 8000

let cache = null
let cacheTime = 0

function ghFetch(path) {
  return fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'portfolio-web',
      ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
    },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  })
}

async function countCommits(repo) {
  const response = await ghFetch(`/repos/${USERNAME}/${repo}/commits?per_page=1`)
  if (!response.ok) return { repo, commits: 0 }

  const link = response.headers.get('Link') || ''
  const lastPage = link.match(/[?&]page=(\d+)>; rel="last"/)?.[1]
  if (lastPage) return { repo, commits: Number(lastPage) }

  const commits = await response.json()
  return { repo, commits: Array.isArray(commits) ? commits.length : 0 }
}

async function buildPayload() {
  const [userResult, reposResult] = await Promise.allSettled([ghFetch(`/users/${USERNAME}`), ghFetch(`/users/${USERNAME}/repos?per_page=100&type=owner&sort=pushed`)])

  if (userResult.status === 'rejected' && reposResult.status === 'rejected') {
    throw new Error('GitHub API unreachable')
  }

  const user = userResult.status === 'fulfilled' && userResult.value.ok ? await userResult.value.json() : null
  const repos = reposResult.status === 'fulfilled' && reposResult.value.ok ? await reposResult.value.json() : []

  const repoList = Array.isArray(repos) ? repos : []
  const counts = (await Promise.all(repoList.map((repo) => countCommits(repo.name).catch(() => null)))).filter(Boolean)

  return {
    username: USERNAME,
    publicRepos: typeof user?.public_repos === 'number' ? user.public_repos : repoList.length || null,
    fetchedAt: new Date().toISOString(),
    topRepositories: counts
      .filter((item) => item.commits > 0)
      .sort((a, b) => b.commits - a.commits)
      .slice(0, TOP_REPOS),
  }
}

export default async function handler(request, response) {
  const now = Date.now()
  const hasCache = cache && now - cacheTime < CACHE_TTL_MS

  if (!hasCache) {
    try {
      cache = await buildPayload()
      cacheTime = now
    } catch {
      // Serve a stale cache instead of an error while GitHub is hiccuping.
      if (!cache) {
        response.status(503).json({ error: 'GitHub data unavailable' })
        return
      }
    }
  }

  response.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400')
  response.status(200).json(cache)
}
