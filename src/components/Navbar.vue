<script setup>
import { ref } from 'vue'
import { useTheme } from '../composables/useTheme'
import ThemeToggle from './ThemeToggle.vue'

const { theme } = useTheme()
const open = ref(false)

const items = [
  { name: 'Beranda', to: '/' },
  { name: 'Tentang saya', to: '/about' },
  { name: 'Proyek', to: '/projects' },
  { name: 'Sertifikat', to: '/certificates' },
  { name: 'Kontak', to: '/contact' },
]
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 border-b border-[var(--line)]"
    style="background: color-mix(in srgb, var(--surface) 88%, transparent); backdrop-filter: blur(16px)"
  >
    <div class="mx-auto flex h-[4.5rem] w-[min(1180px,calc(100%-2rem))] items-center justify-between gap-4">
      <RouterLink to="/" class="text-xl font-bold tracking-[-0.04em] text-[var(--text-primary)]" @click="open = false">
        mufra.dev
      </RouterLink>

      <nav class="hidden items-center gap-8 md:flex" aria-label="Navigasi utama">
        <RouterLink
          v-for="item in items"
          :key="item.name"
          :to="item.to"
          class="text-[0.9375rem] font-medium text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
          active-class="!font-bold !text-[var(--text-primary)]"
          >{{ item.name }}</RouterLink
        >
      </nav>

      <div class="flex items-center gap-2">
        <ThemeToggle />
        <button
          type="button"
          class="grid size-11 place-items-center rounded-full border border-[var(--line-strong)] text-[var(--text-primary)] md:hidden"
          :aria-expanded="open"
          aria-controls="mobile-nav"
          :aria-label="open ? 'Tutup menu' : 'Buka menu'"
          @click="open = !open"
        >
          <svg v-if="!open" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round" />
          </svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    </div>

    <nav v-if="open" id="mobile-nav" class="border-t border-[var(--line)] bg-[var(--surface)] px-5 pb-6 pt-2 md:hidden" aria-label="Navigasi seluler">
      <RouterLink
        v-for="item in items"
        :key="item.name"
        :to="item.to"
        class="flex items-center justify-between border-b border-[var(--line)] py-4 text-base font-medium text-[var(--text-primary)]"
        @click="open = false"
      >
        {{ item.name }}
        <span aria-hidden="true" class="text-[var(--text-faint)]">↗</span>
      </RouterLink>
    </nav>
  </header>
</template>
