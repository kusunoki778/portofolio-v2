<script setup>
import { onMounted, ref } from 'vue'

const USERNAME = 'kusunoki778'

const months = ref([])
const loading = ref(true)
const failed = ref(false)
const profile = ref(null)
const totalContributions = ref(0)
const activityAvailable = ref(false)
const topRepositories = ref([])

function makeMonths(contributions) {
  const now = new Date()
  return Array.from({ length: 12 }, (_, offset) => {
    const date = new Date(now.getFullYear(), now.getMonth() - 11 + offset, 1)
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
  const response = await fetch(`https://api.github.com/repos/${USERNAME}/${repo}/commits?per_page=1`, {
    signal,
    headers: { Accept: 'application/vnd.github+json' },
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
    headers: { Accept: 'application/vnd.github+json' },
  })

  if (!response.ok) return []
  const repositories = await response.json()
  return Array.isArray(repositories) ? repositories : []
}

async function load() {
  loading.value = true
  failed.value = false
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 9000)

  try {
    const [activityResult, profileResult, repositoriesResult] = await Promise.allSettled([
      fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`, { signal: controller.signal }).then((r) =>
        r.ok ? r.json() : null,
      ),
      fetch(`https://api.github.com/users/${USERNAME}`, { signal: controller.signal }).then((r) =>
        r.ok ? r.json() : null,
      ),
      getPublicRepositories(controller.signal),
    ])

    const activity = activityResult.status === 'fulfilled' ? activityResult.value : null
    profile.value = profileResult.status === 'fulfilled' ? profileResult.value : {}

    const contributions = activity?.contributions || []
    activityAvailable.value = Array.isArray(activity?.contributions)
    if (activityAvailable.value) {
      months.value = makeMonths(contributions)
      totalContributions.value = months.value.reduce((sum, m) => sum + m.count, 0)
    } else {
      // Fallback: build months from commit history if contribution API fails
      const now = new Date()
      months.value = Array.from({ length: 12 }, (_, offset) => {
        const date = new Date(now.getFullYear(), now.getMonth() - 11 + offset, 1)
        return {
          label: date.toLocaleString('en-US', { month: 'short' }),
          year: String(date.getFullYear()).slice(-2),
          full: date.toLocaleString('id-ID', { month: 'long', year: 'numeric' }),
          count: 0,
        }
      })
    }

    const repositories = repositoriesResult.status === 'fulfilled' ? repositoriesResult.value : []
    const repoCounts = (await Promise.all(
      repositories.map((repository) =>
        countRepositoryCommits(repository.name, controller.signal).catch(() => null),
      ),
    ))
      .filter(Boolean)
      .filter((item) => item.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    topRepositories.value = repoCounts
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
        :href="`https://github.com/${USERNAME}`"
        target="_blank"
        rel="noreferrer"
        class="inline-flex items-center gap-1 font-mono text-[0.9375rem] font-bold text-[var(--text-primary)] underline decoration-2 underline-offset-4 hover:opacity-80"
      >
        Lihat semua repositori ↗
      </a>
    </div>

    <!-- GitHub Main Panel -->
    <div class="mt-8 rounded-[1.25rem] border border-[var(--line)] bg-[var(--surface-card)] p-5 shadow-sm md:p-7">
      <!-- Summary Bar -->
      <div class="flex flex-wrap items-center gap-4 border-b border-[var(--line)] pb-5 sm:gap-6">
        <div class="grid size-11 place-items-center rounded-xl bg-[var(--text-primary)] text-xl font-bold text-[var(--surface)] shadow-sm">
          ⌘
        </div>
        <div class="flex flex-wrap items-baseline gap-x-8 gap-y-2">
          <div>
            <strong class="block text-2xl font-bold leading-none text-[var(--text-primary)]">
              {{ profile?.public_repos ?? '—' }}
            </strong>
            <span class="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-[var(--text-muted)]">
              repositori publik
            </span>
          </div>
          <div>
            <strong class="block text-2xl font-bold leading-none text-[var(--text-primary)]">
              {{ activityAvailable ? totalContributions : '—' }}
            </strong>
            <span class="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-[var(--text-muted)]">
              aktivitas terbaru
            </span>
          </div>
        </div>
        <a
          :href="`https://github.com/${USERNAME}`"
          target="_blank"
          rel="noreferrer"
          class="ml-auto font-mono text-xs font-semibold text-[var(--text-primary)] underline decoration-1 underline-offset-4 hover:opacity-80"
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
        <div class="grid h-48 grid-cols-6 items-end gap-2 sm:grid-cols-12 sm:gap-3 px-1">
          <div
            v-for="month in months"
            :key="month.label + month.year"
            class="flex h-full flex-col items-center justify-end gap-1.5"
          >
            <!-- Commit count number on top of bar -->
            <strong class="font-mono text-[0.6875rem] font-medium text-[var(--text-primary)]">
              {{ month.count }}
            </strong>

            <!-- Track Container with Neutral Grayscale Bar -->
            <div class="flex h-28 w-full max-w-[34px] items-end rounded-lg bg-[var(--surface-muted)]/70 p-0.5 overflow-hidden">
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
        <div v-if="topRepositories.length" class="mt-6 border-t border-[var(--line)] pt-4">
          <p class="font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
            Repositori dengan commit terbanyak
          </p>
          <div class="divide-y divide-[var(--line)]">
            <a
              v-for="(item, index) in topRepositories"
              :key="item.repo"
              :href="`https://github.com/${USERNAME}/${item.repo}`"
              target="_blank"
              rel="noreferrer"
              class="group flex items-center justify-between py-2.5 text-sm transition-colors"
            >
              <div class="flex items-center gap-3">
                <span class="font-mono text-xs font-bold text-[var(--text-muted)]">0{{ index + 1 }}</span>
                <strong class="font-mono text-xs sm:text-sm text-[var(--text-primary)] group-hover:underline transition-colors">
                  {{ item.repo }}
                </strong>
              </div>
              <small class="font-mono text-xs text-[var(--text-muted)]">
                {{ item.count }} commits ↗
              </small>
            </a>
          </div>
        </div>

        <!-- Footnote Status -->
        <p class="mt-4 font-mono text-[0.65rem] text-[var(--text-muted)]">
          Jumlah commit pada branch utama dari repositori yang sedang dipantau.
        </p>
      </div>
    </div>
  </section>
</template>
