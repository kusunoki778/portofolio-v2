<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-[var(--line)] py-8">
    <div
      class="mx-auto flex w-[min(1180px,calc(100%-2rem))] flex-col gap-4 text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between sm:text-[0.8125rem] sm:tracking-[0.14em]"
    >
      <span>© {{ year }} Muhamad Fadhlurrahman</span>
      <span class="flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-4">
        <a href="mailto:mfadhlurrahman361@gmail.com" class="transition hover:text-[var(--text-primary)]">Email</a>
        <span aria-hidden="true" class="hidden text-[var(--text-faint)] sm:inline">·</span>
        <a href="https://github.com/kusunoki778" target="_blank" rel="noreferrer" class="transition hover:text-[var(--text-primary)]">GitHub</a>
        <span aria-hidden="true" class="hidden text-[var(--text-faint)] sm:inline">·</span>
        <span>Bekasi, Indonesia</span>
      </span>
    </div>
  </footer>
</template>
