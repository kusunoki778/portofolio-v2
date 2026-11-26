<script setup>
import { computed, ref } from 'vue'
import ProjectCard from '../components/ProjectCard.vue'
import SectionLabel from '../components/SectionLabel.vue'
import SiteFooter from '../components/SiteFooter.vue'
import { projects, projectCategories } from '../data/projects'

const active = ref('Semua')
const filtered = computed(() =>
  active.value === 'Semua' ? projects : projects.filter((project) => project.category === active.value),
)
</script>

<template>
  <div>
    <section class="mx-auto w-[min(1180px,calc(100%-2rem))] pt-28 md:pt-36">
      <SectionLabel eyebrow="Proyek" />
      <h1 class="mt-6 max-w-[20ch] text-[clamp(2.4rem,6.4vw,4.6rem)] font-bold leading-[1] tracking-[-0.03em] text-[var(--text-primary)]">
        Proyek yang pernah saya kerjakan.
      </h1>
      <p class="mt-8 max-w-2xl text-[1.0625rem] leading-8 text-[var(--text-muted)]">
        Proyek di bawah ini berangkat dari kebutuhan yang berbeda: mencatat transaksi toko, mengurus administrasi RT, menemukan
        UMKM sekitar kampus, mengelola konten destinasi wisata, sampai menemani orang memasak. Setiap kartu menjelaskan
        masalah yang dihadapi, solusi yang dibuat, dan bagian yang saya kerjakan.
      </p>
    </section>

    <section class="mx-auto w-[min(1180px,calc(100%-2rem))] pb-16 pt-12 md:pb-24">
      <div class="flex flex-wrap gap-2" role="tablist" aria-label="Filter kategori proyek">
        <button
          v-for="tab in projectCategories"
          :key="tab"
          type="button"
          role="tab"
          :aria-selected="active === tab"
          class="rounded-full border px-4 py-2 text-[0.875rem] font-bold transition"
          :class="
            active === tab
              ? 'border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--surface)]'
              : 'border-[var(--line-strong)] text-[var(--text-muted)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]'
          "
          @click="active = tab"
        >
          {{ tab }}
        </button>
      </div>

      <p class="mt-6 text-[0.875rem] text-[var(--text-muted)]" aria-live="polite">
        Menampilkan {{ filtered.length }} dari {{ projects.length }} proyek.
      </p>

      <div class="mt-6 grid grid-cols-2 gap-3 sm:gap-6">
        <ProjectCard v-for="project in filtered" :key="project.slug" :project="project" />
      </div>
    </section>

    <SiteFooter />
  </div>
</template>
