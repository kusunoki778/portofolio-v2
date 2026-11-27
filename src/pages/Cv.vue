<script setup>
import BaseButton from '../components/BaseButton.vue'
import SectionLabel from '../components/SectionLabel.vue'
import SiteFooter from '../components/SiteFooter.vue'

const CV_FILE = '/assets/Muhamad_Fadhlurrahman_CV.pdf'
const DOWNLOAD_NAME = 'Muhamad_Fadhlurrahman_CV.pdf'

// The PDF is rendered to images at build time (scripts/pdf-to-images.mjs) so the
// CV stays readable even when the browser blocks its built-in PDF viewer.
const pages = [
  { src: '/assets/cv-preview/cv-page-1.png', alt: 'Halaman 1 CV Muhamad Fadhlurrahman' },
  { src: '/assets/cv-preview/cv-page-2.png', alt: 'Halaman 2 CV Muhamad Fadhlurrahman' },
]

const highlights = [
  'D4 Rekayasa Perangkat Lunak, Politeknik Negeri Indramayu — IPK 3.60/4.00',
  'Magang IT Support di PT Indofarma Tbk (2022) dan PT Madina Flash, Bintaro (2023)',
  'Terbiasa Laravel, React, Flutter, MySQL, PostgreSQL, dan Linux',
]
</script>

<template>
  <div>
    <section class="mx-auto w-[min(1180px,calc(100%-2rem))] pt-28 md:pt-36">
      <SectionLabel eyebrow="Curriculum Vitae" />
      <h1 class="mt-6 max-w-[24ch] text-[clamp(2.2rem,6vw,4.2rem)] font-bold leading-[1.02] tracking-[-0.03em] text-[var(--text-primary)]">
        CV Muhamad Fadhlurrahman.
      </h1>
      <p class="mt-7 max-w-2xl text-[1.0625rem] leading-8 text-[var(--text-muted)]">
        Ringkasan pendidikan, pengalaman kerja, proyek, dan teknologi yang saya pakai. Pratinjau di bawah bisa dibaca langsung
        di HP; versi PDF-nya tersedia untuk diunduh atau dibuka di tab baru.
      </p>

      <div class="mt-8 flex flex-wrap gap-3">
        <BaseButton :href="CV_FILE" :download="DOWNLOAD_NAME" size="lg">
          UNDUH CV (PDF)
          <span aria-hidden="true">↓</span>
        </BaseButton>
        <BaseButton :href="CV_FILE" target="_blank" rel="noreferrer" variant="outline" size="lg">
          BUKA PDF DI TAB BARU
          <span aria-hidden="true">↗</span>
        </BaseButton>
      </div>

      <ul class="mt-10 grid gap-3 border-y border-[var(--line)] py-6 text-[0.9375rem] leading-7 text-[var(--text-muted)] sm:grid-cols-3 sm:gap-6">
        <li v-for="item in highlights" :key="item" class="flex gap-2">
          <span aria-hidden="true" class="text-[var(--text-primary)]">—</span>
          <span>{{ item }}</span>
        </li>
      </ul>
    </section>

    <section class="mx-auto w-[min(1180px,calc(100%-2rem))] pt-10 md:pt-14">
      <div class="flex flex-wrap items-end justify-between gap-3">
        <h2 class="font-mono text-[0.75rem] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
          Pratinjau CV
        </h2>
        <p class="font-mono text-[0.75rem] text-[var(--text-faint)]">
          {{ pages.length }} halaman · PDF {{ CV_FILE.split('/').pop() }}
        </p>
      </div>

      <ol class="mt-5 space-y-4">
        <li
          v-for="(page, index) in pages"
          :key="page.src"
          class="overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-sm"
        >
          <a :href="CV_FILE" target="_blank" rel="noreferrer" class="block" :aria-label="`Buka PDF halaman ${index + 1}`">
            <img
              :src="page.src"
              :alt="page.alt"
              :loading="index === 0 ? 'eager' : 'lazy'"
              decoding="async"
              class="block h-auto w-full"
            />
          </a>
        </li>
      </ol>

      <p class="mt-4 text-[0.875rem] leading-6 text-[var(--text-muted)]">
        Gambar di atas adalah pratinjau CV. Teks yang bisa diseleksi ada di versi PDF — gunakan tombol unduh di atas.
      </p>
    </section>

    <section class="mx-auto w-[min(1180px,calc(100%-2rem))] py-16 md:py-24">
      <div class="grid gap-6 rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface-card)] p-6 sm:grid-cols-[1fr_auto] sm:items-center md:p-8">
        <div>
          <h2 class="text-2xl font-bold leading-tight tracking-[-0.02em] text-[var(--text-primary)]">
            Butuh CV dalam format lain?
          </h2>
          <p class="mt-2 text-[0.9375rem] leading-7 text-[var(--text-muted)]">
            Saya bisa mengirim versi PDF atau detail portofolio lewat email.
          </p>
        </div>
        <div class="flex flex-wrap gap-3">
          <BaseButton to="/contact">Hubungi saya</BaseButton>
          <BaseButton to="/projects" variant="outline">Lihat proyek</BaseButton>
        </div>
      </div>
    </section>

    <SiteFooter />
  </div>
</template>
