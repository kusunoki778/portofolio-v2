<script setup>
import BaseButton from '../components/BaseButton.vue'
import SiteFooter from '../components/SiteFooter.vue'
</script>

<template>
  <div>
    <section class="mx-auto flex w-[min(1180px,calc(100%-2rem))] flex-col items-start justify-center py-32 md:min-h-[70vh] md:py-44">
      <p class="font-mono text-[0.8125rem] uppercase tracking-[0.2em] text-[var(--text-muted)]">404</p>
      <h1 class="mt-4 max-w-[20ch] text-[clamp(2.2rem,5.6vw,4rem)] font-bold leading-[1.02] tracking-[-0.03em] text-[var(--text-primary)]">
        Halaman ini tidak ada.
      </h1>
      <p class="mt-5 max-w-xl text-[1.0625rem] leading-8 text-[var(--text-muted)]">
        Mungkin tautannya salah ketik atau sudah dipindahkan. Coba mulai dari beranda atau lihat daftar proyek.
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <BaseButton to="/" size="lg">Kembali ke beranda</BaseButton>
        <BaseButton to="/projects" variant="outline" size="lg">Lihat proyek</BaseButton>
      </div>
    </section>
    <SiteFooter />
  </div>
</template>
