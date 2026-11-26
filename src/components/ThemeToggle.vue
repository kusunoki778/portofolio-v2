<script setup>
import { useTheme } from '../composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <button
    type="button"
    class="grid size-11 place-items-center rounded-full border border-[var(--line-strong)] text-[var(--text-primary)] transition hover:bg-[var(--text-primary)] hover:text-[var(--surface)]"
    :aria-label="theme === 'dark' ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'"
    :aria-pressed="theme === 'dark'"
    @click="toggleTheme"
  >
    <!-- Moon = switch to dark (shown in light mode). Sun = switch back to light. -->
    <svg v-if="theme !== 'dark'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a7 7 0 1 0 10.5 10.5Z" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" stroke-linecap="round" />
    </svg>
  </button>
</template>
