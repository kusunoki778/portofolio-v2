<script setup>
import { computed } from 'vue'
import ProjectGallery from './ProjectGallery.vue'

const props = defineProps({
  project: { type: Object, required: true },
})

const heroImage = computed(() => props.project.image)
</script>

<template>
  <article
    class="group flex flex-col overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface-card)] transition duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)] hover:shadow-xl hover:shadow-black/10"
  >
    <RouterLink
      :to="`/projects/${project.slug}`"
      class="block overflow-hidden border-b border-[var(--line)] bg-[var(--surface-muted)]"
      tabindex="-1"
      aria-hidden="true"
    >
      <ProjectGallery v-if="project.gallery" :project="project" class="transition duration-500 group-hover:scale-[1.02]" />
      <img
        v-else
        :src="heroImage"
        :alt="project.imageAlt"
        loading="lazy"
        decoding="async"
        class="aspect-[16/10] w-full bg-[var(--surface-card)] object-contain object-center transition duration-500 group-hover:scale-[1.02]"
      />
    </RouterLink>

    <div class="flex flex-1 flex-col p-6">
      <p class="flex flex-wrap items-center gap-2 text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
        <span>{{ project.type }}</span>
        <span aria-hidden="true" class="text-[var(--text-faint)]">/</span>
        <span>{{ project.year }}</span>
      </p>

      <h3 class="mt-3 text-2xl font-bold leading-tight tracking-[-0.02em] text-[var(--text-primary)]">
        <RouterLink :to="`/projects/${project.slug}`" class="transition hover:underline hover:decoration-2 hover:underline-offset-4">
          {{ project.title }}
        </RouterLink>
      </h3>

      <p class="mt-3 text-[0.9375rem] leading-7 text-[var(--text-muted)]">{{ project.summary }}</p>

      <ul class="mt-5 flex flex-wrap gap-2" aria-label="Teknologi">
        <li
          v-for="tech in project.stack"
          :key="tech"
          class="rounded-full border border-[var(--line)] px-3 py-1 font-mono text-[0.75rem] text-[var(--text-muted)]"
        >
          {{ tech }}
        </li>
      </ul>

      <div class="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[var(--line)] pt-5 text-[0.875rem] font-bold">
        <RouterLink :to="`/projects/${project.slug}`" class="text-[var(--text-primary)] underline decoration-2 underline-offset-4">
          Studi kasus
        </RouterLink>
        <a
          v-if="project.link"
          :href="project.link"
          target="_blank"
          rel="noreferrer"
          class="text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
          >{{ project.category === 'Mobile' ? 'Buka demo' : 'Buka situs' }} ↗</a
        >
        <a
          v-if="project.repo"
          :href="project.repo"
          target="_blank"
          rel="noreferrer"
          class="text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
          >Kode sumber ↗</a
        >
      </div>
    </div>
  </article>
</template>
