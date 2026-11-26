<script setup>
import { computed, onMounted, ref } from 'vue'

const USERNAME = 'kusunoki778'

const months = ref([])
const loading = ref(true)
const failed = ref(false)
const profile = ref(null)
const repositories = ref([])
const totalContributions = ref(0)
const activityAvailable = ref(false)
const topRepositories = ref([])
const commitCountsAvailable = ref(false)

function makeMonths(contributions) {
  const now = new Date()
  const cursor = new Date(now.getFullYear(), now.getMonth(), 1)
  // Walk back exactly 12 months so the chart always ends on the current month.
  const first = new Date(cursor.getFullYear(), cursor.getMonth() - 11, 1)

  return Array.from({ length: 12 }, (_, offset) => {
    const date = new Date(first.getFullYear(), first.getMonth() + offset, 1)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    const count = contributions
      .filter((item) => item.date.startsWith(key))
      .reduce((sum, item) => sum + item.count, 0)
    return {
      label: date.toLocaleString('en-US', { month: 'short' }),
      year: String(date.getFullYear()).slice(-2),
      full: date.toLocaleString('id-ID', { month: 'long', year: 'numeric' }),
      count,
    }
  })
}

async function countRepositoryCommits(repo, signal) {
  // GitHub rejects requests without a User-Agent, which is why the counter used
  // to stay empty in some browsers.
  const response = await fetch(`https://api.github.com/repos/${USERNAME}/${repo}/commits?per_page=1`, {
    signal,
    headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-web' },
  })

  if (!response.ok) return { repo, count: 0 }

  const commits = await response.json()
  const link = response.headers.get('Link') || ''
  const lastPage = link.match(/[?&]page=(\d+)>; rel="last"/)?.[1]

  return {
    repo,
    count: lastPage ? Number(lastPage) : Array.isArray(commits) ? commits.length : 0,
  }
}

async function getPublicRepositories(signal) {
  const response = await fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&type=owner&sort=pushed`, {
    signal,
    headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-web' },
  })

  // `null` means "we could not ask GitHub", [] means "the list is really empty".
  if (!response.ok) return null
  const list = await response.json()
  return Array.isArray(list) ? list : null
}

// Every visitor shares one cached serverless call (/api/github), so the GitHub
// rate limit per IP no longer matters. Returns null when the endpoint is absent.
async function getServerSummary(signal) {
  try {
    const response = await fetch('/api/github', { signal })
    if (!response.ok) return null
    const data = await response.json()
    if (!data || typeof data !== 'object') return null
    return data
  } catch {
    return null
  }
}

async function load() {
  loading.value = true
  failed.value = false
  commitCountsAvailable.value = false
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 9000)

  try {
    const [activityResult, profileResult, repositoriesResult, serverResult] = await Promise.allSettled([
      fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`, { signal: controller.signal }).then((r) =>
        r.ok ? r.json() : null,
      ),
      fetch(`https://api.github.com/users/${USERNAME}`, {
        signal: controller.signal,
        headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-web' },
      }).then((r) => (r.ok ? r.json() : null)),
      getPublicRepositories(controller.signal),
      getServerSummary(controller.signal),
    ])

    const summary = serverResult.status === 'fulfilled' ? serverResult.value : null

    // `/users/:name` reports the authoritative public repo count; the repos list
    // can come back empty when GitHub rate-limits the connection.
    const profileData = profileResult.status === 'fulfilled' ? profileResult.value : null
    const repoList = repositoriesResult.status === 'fulfilled' ? repositoriesResult.value : null
    profile.value = profileData
    repositories.value = repoList || []

    const activity = activityResult.status === 'fulfilled' ? activityResult.value : null
    const contributions = activity?.contributions || []
    activityAvailable.value = Array.isArray(activity?.contributions)
    if (activityAvailable.value) {
      months.value = makeMonths(contributions)
      totalContributions.value = months.value.reduce((sum, m) => sum + m.count, 0)
    } else {
      months.value = makeMonths([])
    }

    if (Array.isArray(summary?.topRepositories) && summary.topRepositories.length) {
      // Server already counted the commits: instant and never rate limited.
      topRepositories.value = summary.topRepositories.map((item) => ({ repo: item.repo, count: item.commits }))
      commitCountsAvailable.value = true
      if (!profile.value && typeof summary.publicRepos === 'number') {
        profile.value = { public_repos: summary.publicRepos }
      }
    } else if (repositories.value.length) {
      // Count commits only when the repo list actually arrived, otherwise every
      // request fails and we would spend the rate limit for nothing.
      const results = await Promise.all(
        repositories.value.map((repository) =>
          countRepositoryCommits(repository.name, controller.signal).catch(() => null),
        ),
      )
      commitCountsAvailable.value = results.some((item) => item && item.count > 0)
      topRepositories.value = results
        .filter(Boolean)
        .filter((item) => item.count > 0)
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)
    }
  } catch {
    failed.value = true
    activityAvailable.value = false
    topRepositories.value = []
  } finally {
    clearTimeout(timer)
    loading.value = false
  }
}

onMounted(load)

const maxCount = () => Math.max(1, ...months.value.map((m) => m.count))

// Real numbers only: GitHub's profile count first, then the fetched repo list.
const totalRepoCount = computed(() => {
  if (typeof profile.value?.public_repos === 'number') return String(profile.value.public_repos)
  if (repositories.value.length) return String(repositories.value.length)
  return null
})

const activityLabel = computed(() => (activityAvailable.value ? 'aktivitas 12 bulan' : 'aktivitas terbaru'))
</script>

<template>
  <section class="border-t border-[var(--line)] py-16 md:py-24">
    <!-- Header Section -->
    <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div>
        <p class="font-mono text-[0.8125rem] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
          Aktivitas GitHub
        </p>
        <h2 class="mt-4 text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-[var(--text-primary)] md:text-[3.25rem]">
          Aktivitas saya<br />
          <span class="text-[var(--text-faint)]">di GitHub.</span>
        </h2>
      </div>
      <a
        :href="`https://github.com/${USERNAME}?tab=repositories`"
        target="_blank"
        rel="noreferrer"
        class="hidden text-[0.9375rem] font-bold text-[var(--text-primary)] underline decoration-2 underline-offset-4 hover:opacity-80 sm:inline-block"
      >
        Lihat semua repositori ↗
      </a>
    </div>

    <!-- GitHub Main Panel -->
    <div class="mt-8 rounded-[1.25rem] border border-[var(--line)] bg-[var(--surface-card)] p-5 shadow-sm md:p-7">
      <!-- Summary Bar -->
      <div class="flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-[var(--line)] pb-5">
        <div class="grid size-9 shrink-0 place-items-center rounded-xl bg-[var(--text-primary)] text-[var(--surface)] shadow-sm sm:size-11">
          <svg viewBox="0 0 16 16" class="size-4 fill-current sm:size-5" aria-hidden="true">
            <path
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
            />
          </svg>
        </div>
        <div class="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <div>
            <strong class="block text-xl font-bold leading-none text-[var(--text-primary)] sm:text-2xl">
              {{ totalRepoCount ?? '—' }}
            </strong>
            <span class="font-mono text-[0.625rem] font-medium uppercase tracking-wider text-[var(--text-muted)] sm:text-[0.6875rem]">
              repositori publik
            </span>
          </div>
          <div>
            <strong class="block text-xl font-bold leading-none text-[var(--text-primary)] sm:text-2xl">
              {{ totalContributions }}
            </strong>
            <span class="font-mono text-[0.625rem] font-medium uppercase tracking-wider text-[var(--text-muted)] sm:text-[0.6875rem]">
              {{ activityLabel }}
            </span>
          </div>
        </div>
        <a
          :href="`https://github.com/${USERNAME}?tab=repositories`"
          target="_blank"
          rel="noreferrer"
          class="font-mono text-[0.6875rem] font-semibold text-[var(--text-primary)] underline decoration-1 underline-offset-4 hover:opacity-80 sm:ml-auto sm:text-xs"
        >
          Buka GitHub ↗
        </a>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="space-y-4 py-12" role="status" aria-live="polite">
        <p class="font-mono text-xs text-[var(--text-muted)]">Memuat aktivitas GitHub…</p>
        <div class="flex h-36 items-end justify-between gap-2 px-2" aria-hidden="true">
          <span
            v-for="n in 12"
            :key="n"
            class="w-full animate-pulse rounded-lg bg-[var(--surface-muted)]"
            :style="{ height: `${20 + ((n * 17) % 75)}%` }"
          />
        </div>
      </div>

      <!-- Monthly Activity Chart -->
      <div v-else class="pt-6">
        <div class="grid h-auto grid-cols-6 items-end gap-x-2 gap-y-4 sm:h-48 sm:grid-cols-12 sm:gap-3 sm:gap-y-0 px-1">
          <div
            v-for="month in months"
            :key="month.label + month.year"
            class="flex min-w-0 flex-col items-center justify-end gap-1.5 sm:h-full"
          >
            <!-- Commit count number on top of bar -->
            <strong class="font-mono text-[0.6875rem] font-medium text-[var(--text-primary)]">
              {{ month.count }}
            </strong>

            <!-- Track Container with Neutral Grayscale Bar -->
            <div class="flex h-20 w-full max-w-[34px] items-end overflow-hidden rounded-lg bg-[var(--surface-muted)]/70 p-0.5 sm:h-28">
              <span
                class="block w-full rounded-md transition-all duration-700 ease-out"
                :style="{
                  height: `${Math.max(8, Math.round((month.count / maxCount()) * 100))}%`,
                  background: 'linear-gradient(180deg, var(--text-primary), var(--text-muted))',
                }"
                :title="`${month.count} kontribusi pada ${month.full}`"
              />
            </div>

            <!-- Month & Year Label -->
            <small class="flex flex-col items-center font-mono text-[0.625rem] text-[var(--text-muted)] uppercase">
              <span>{{ month.label }}</span>
              <i class="not-italic text-[0.5rem] opacity-60">{{ month.year }}</i>
            </small>
          </div>
        </div>

        <!-- Top Active Repositories Section -->
        <div v-if="topRepositories.length" class="mt-8 border-t border-[var(--line)] pt-4">
          <p class="mb-2 font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            Repositori dengan commit terbanyak
          </p>
          <div class="divide-y divide-[var(--line)]">
            <a
              v-for="(item, index) in topRepositories"
              :key="item.repo"
              :href="`https://github.com/${USERNAME}/${item.repo}`"
              target="_blank"
              rel="noreferrer"
              class="group flex items-center justify-between gap-3 py-2.5 text-sm transition-colors"
            >
              <div class="flex min-w-0 items-center gap-2 sm:gap-3">
                <span class="font-mono text-xs font-bold text-[var(--text-muted)]">0{{ index + 1 }}</span>
                <strong class="truncate font-mono text-xs text-[var(--text-primary)] transition-colors group-hover:underline sm:text-sm">
                  {{ item.repo }}
                </strong>
              </div>
              <small class="shrink-0 font-mono text-[0.6875rem] text-[var(--text-muted)] sm:text-xs">
                {{ item.count }} commits ↗
              </small>
            </a>
          </div>
        </div>

        <!-- Footnote Status -->
        <p v-if="commitCountsAvailable" class="mt-6 font-mono text-[0.65rem] leading-relaxed text-[var(--text-muted)] sm:mt-4">
          Jumlah commit pada branch utama dari repositori yang sedang dipantau.
        </p>

        <!-- Shown when GitHub rate-limits the request, so the panel never ends empty -->
        <p
          v-else
          class="mt-6 border-t border-[var(--line)] pt-4 font-mono text-[0.65rem] leading-relaxed text-[var(--text-muted)]"
        >
          Daftar repositori sedang tidak bisa dimuat (batas permintaan GitHub). Buka profil GitHub untuk melihat semuanya.
        </p>
      </div>
    </div>

    <a
      :href="`https://github.com/${USERNAME}?tab=repositories`"
      target="_blank"
      rel="noreferrer"
      class="mt-6 inline-flex items-center gap-1 font-mono text-[0.9375rem] font-bold text-[var(--text-primary)] underline decoration-2 underline-offset-4 hover:opacity-80 sm:hidden"
    >
      Lihat semua repositori ↗
    </a>
  </section>
</template>
