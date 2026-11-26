<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-[var(--line)] py-8">
    <div
      class="mx-auto flex w-[min(1180px,calc(100%-2rem))] flex-col justify-between gap-3 text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)] sm:flex-row sm:items-center"
    >
      <span>© {{ year }} Muhamad Fadhlurrahman</span>
      <span class="flex flex-wrap items-center gap-x-4 gap-y-2">
        <a href="mailto:mfadhlurrahman361@gmail.com" class="transition hover:text-[var(--text-primary)]">Email</a>
        <span aria-hidden="true" class="text-[var(--text-faint)]">·</span>
        <a href="https://github.com/kusunoki778" target="_blank" rel="noreferrer" class="transition hover:text-[var(--text-primary)]">GitHub</a>
        <span aria-hidden="true" class="text-[var(--text-faint)]">·</span>
        <a
          href="/assets/Muhamad_Fadhlurrahman_CV.pdf"
          download="Muhamad_Fadhlurrahman_CV.pdf"
          class="transition hover:text-[var(--text-primary)]"
          >CV</a
        >
        <span aria-hidden="true" class="text-[var(--text-faint)]">·</span>
        <span>Bekasi, Indonesia</span>
      </span>
    </div>
  </footer>
</template>
