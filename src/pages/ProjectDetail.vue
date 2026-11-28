<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BaseButton from '../components/BaseButton.vue'
import SiteFooter from '../components/SiteFooter.vue'
import SectionLabel from '../components/SectionLabel.vue'
import ProjectCard from '../components/ProjectCard.vue'
import ProjectGallery from '../components/ProjectGallery.vue'
import { findProject, projects } from '../data/projects'

const route = useRoute()
const project = computed(() => findProject(route.params.slug))

const others = computed(() => projects.filter((item) => item.slug !== route.params.slug).slice(0, 2))

const blocks = computed(() =>
  project.value
    ? [
        ...(project.value.problem ? [['Masalah', project.value.problem]] : []),
        ...(project.value.solution ? [['Solusi', project.value.solution]] : []),
        ...(project.value.role ? [['Peran saya', project.value.role]] : []),
        ...(project.value.notes ? [['Catatan', project.value.notes]] : []),
      ]
    : [],
)
</script>

<template>
  <div>
    <section v-if="project" class="mx-auto w-[min(1180px,calc(100%-2rem))] pt-28 md:pt-36">
      <RouterLink to="/projects" class="text-[0.875rem] font-bold text-[var(--text-muted)] transition hover:text-[var(--text-primary)]">
        ← Semua proyek
      </RouterLink>

      <SectionLabel class="mt-8" :eyebrow="`${project.type} · ${project.year}`" />
      <h1 class="mt-5 max-w-[22ch] text-[clamp(2.2rem,5.6vw,4rem)] font-bold leading-[1.02] tracking-[-0.03em] text-[var(--text-primary)]">
        {{ project.title }}
      </h1>
      <p class="mt-6 max-w-2xl text-[1.125rem] leading-9 text-[var(--text-muted)]">{{ project.summary }}</p>
      <p v-if="project.context" class="mt-4 max-w-2xl text-[0.875rem] leading-6 text-[var(--text-muted)]">
        {{ project.context }} ·
        {{ project.contextNote || 'dibuat untuk pembelajaran, bukan sistem produksi yang dipakai publik.' }}
      </p>

      <div class="mt-8 flex flex-wrap items-center gap-3">
        <BaseButton v-if="project.link" :href="project.link" size="lg">
          {{ project.category === 'Mobile' ? 'Lihat demo aplikasi' : 'Buka situs demo' }} <span aria-hidden="true">↗</span>
        </BaseButton>
        <BaseButton v-if="project.apk" :href="project.apk" variant="outline" size="lg">
          Unduh APK <span aria-hidden="true">↗</span>
        </BaseButton>
        <BaseButton v-if="project.repo" :href="project.repo" variant="outline" size="lg">Lihat kode sumber</BaseButton>
      </div>

      <div
        v-if="project.demoAccounts"
        class="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--surface-card)] p-5 font-mono text-[0.8125rem]"
      >
        <p class="font-bold text-[var(--text-primary)] mb-3">Akun Demo (Environment Lokal):</p>
        <div class="grid gap-3 sm:grid-cols-3">
          <div
            v-for="acc in project.demoAccounts"
            :key="acc.role"
            class="rounded-xl border border-[var(--line)] bg-[var(--surface-muted)]/60 p-3"
          >
            <span class="block font-bold text-[var(--text-primary)] mb-1">{{ acc.role }}</span>
            <span class="block truncate text-[var(--text-muted)]">Email: {{ acc.email }}</span>
            <span class="block text-[var(--text-muted)]">Password: {{ acc.password }}</span>
          </div>
        </div>
        <p v-if="project.demoNote" class="mt-3 text-[0.75rem] text-[var(--text-muted)]">
          {{ project.demoNote }}
        </p>
      </div>

      <p
        v-else-if="project.demo"
        class="mt-5 inline-flex flex-wrap items-center gap-2 rounded-full border border-[var(--line-strong)] px-4 py-2 font-mono text-[0.8125rem] text-[var(--text-muted)]"
      >
        <span class="font-bold text-[var(--text-primary)]">Demo login</span>
        <span>username: {{ project.demo.username }}</span>
        <span aria-hidden="true" class="text-[var(--text-faint)]">/</span>
        <span>password: {{ project.demo.password }}</span>
      </p>

      <figure class="mt-10 overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface-muted)]">
        <ProjectGallery v-if="project.gallery" :project="project" />
        <img v-else :src="project.image" :alt="project.imageAlt" class="w-full object-contain" />
      </figure>
    </section>

    <section v-if="project" class="mx-auto w-[min(1180px,calc(100%-2rem))] py-16 md:py-24">
      <div class="grid gap-10 md:grid-cols-[.6fr_1.4fr] md:gap-16">
        <div>
          <h2 class="text-[0.8125rem] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">Teknologi</h2>
          <ul class="mt-4 flex flex-wrap gap-2">
            <li v-for="tech in project.stack" :key="tech" class="rounded-full border border-[var(--line-strong)] px-3 py-1 font-mono text-[0.8125rem] text-[var(--text-primary)]">
              {{ tech }}
            </li>
          </ul>
        </div>
        <div class="space-y-10">
          <div v-for="block in blocks" :key="block[0]">
            <h2 class="text-xl font-bold tracking-[-0.01em] text-[var(--text-primary)]">{{ block[0] }}</h2>
            <p class="mt-3 max-w-2xl text-[1rem] leading-8 text-[var(--text-muted)]">{{ block[1] }}</p>
          </div>

          <div>
            <h2 class="text-xl font-bold tracking-[-0.01em] text-[var(--text-primary)]">Hasil Pengembangan</h2>
            <ul class="mt-4 space-y-3">
              <li v-for="highlight in project.highlights" :key="highlight" class="flex gap-3 text-[1rem] leading-8 text-[var(--text-muted)]">
                <span aria-hidden="true" class="mt-1 text-[var(--text-primary)]">✓</span>
                <span>{{ highlight }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section v-if="project && others.length" class="mx-auto w-[min(1180px,calc(100%-2rem))] border-t border-[var(--line)] pb-16 pt-14 md:pb-24">
      <div class="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h2 class="text-[clamp(1.5rem,3.2vw,2.25rem)] font-bold leading-tight tracking-[-0.02em] text-[var(--text-primary)]">
          Proyek lain
        </h2>
        <RouterLink to="/projects" class="text-[0.9375rem] font-bold text-[var(--text-primary)] underline decoration-2 underline-offset-4">
          Lihat semuanya ↗
        </RouterLink>
      </div>
      <div class="grid grid-cols-2 gap-3 sm:gap-6">
        <ProjectCard v-for="item in others" :key="item.slug" :project="item" />
      </div>
    </section>

    <section v-if="!project" class="mx-auto w-[min(1180px,calc(100%-2rem))] py-32 text-center md:py-44">
      <h1 class="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] text-[var(--text-primary)]">Proyek tidak ditemukan</h1>
      <p class="mx-auto mt-4 max-w-lg text-[1rem] leading-8 text-[var(--text-muted)]">
        Tautan yang kamu buka mungkin sudah berubah. Semua proyek yang masih aktif ada di halaman proyek.
      </p>
      <BaseButton to="/projects" class="mt-8">Kembali ke daftar proyek</BaseButton>
    </section>

    <SiteFooter />
  </div>
</template>
