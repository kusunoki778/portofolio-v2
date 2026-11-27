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
    class="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface-card)] transition duration-300 sm:rounded-[1.5rem] sm:hover:-translate-y-1 sm:hover:border-[var(--line-strong)] sm:hover:shadow-xl sm:hover:shadow-black/10"
  >
    <span
      v-if="project.context"
      class="absolute left-2 top-2 z-10 rounded-full border border-[var(--line)] bg-[var(--surface)]/95 px-2 py-0.5 font-mono text-[0.5625rem] font-bold uppercase tracking-[0.08em] text-[var(--text-muted)] backdrop-blur sm:left-4 sm:top-4 sm:text-[0.6875rem]"
    >
      {{ project.context }}
    </span>
    <RouterLink
      :to="`/projects/${project.slug}`"
      class="block overflow-hidden border-b border-[var(--line)] bg-[var(--surface-muted)]"
      tabindex="-1"
      aria-hidden="true"
    >
      <ProjectGallery v-if="project.gallery" :project="project" compact class="transition duration-500 sm:group-hover:scale-[1.02]" />
      <img
        v-else
        :src="heroImage"
        :alt="project.imageAlt"
        loading="lazy"
        decoding="async"
        class="aspect-[16/10] w-full bg-[var(--surface-card)] object-contain object-center transition duration-500 sm:group-hover:scale-[1.02]"
      />
    </RouterLink>

    <div class="flex flex-1 flex-col p-3.5 sm:p-6">
      <p class="flex flex-wrap items-center gap-1.5 text-[0.625rem] font-bold uppercase tracking-[0.1em] text-[var(--text-muted)] sm:gap-2 sm:text-[0.8125rem] sm:tracking-[0.14em]">
        <span>{{ project.type }}</span>
        <span aria-hidden="true" class="text-[var(--text-faint)]">/</span>
        <span>{{ project.year }}</span>
      </p>

      <h3 class="mt-2 text-base font-bold leading-snug tracking-[-0.02em] text-[var(--text-primary)] sm:mt-3 sm:text-2xl sm:leading-tight">
        <RouterLink :to="`/projects/${project.slug}`" class="transition hover:underline hover:decoration-2 hover:underline-offset-4">
          {{ project.title }}
        </RouterLink>
      </h3>

      <p class="mb-3 mt-2 line-clamp-2 text-[0.8125rem] leading-5 text-[var(--text-muted)] sm:mb-6 sm:mt-3 sm:line-clamp-none sm:text-[0.9375rem] sm:leading-7">{{ project.summary }}</p>

      <ul class="mt-3 hidden flex-wrap gap-1.5 sm:mt-5 sm:flex sm:gap-2" aria-label="Teknologi">
        <li
          v-for="tech in project.stack"
          :key="tech"
          class="rounded-full border border-[var(--line)] px-2 py-0.5 font-mono text-[0.6875rem] text-[var(--text-muted)] sm:px-3 sm:py-1 sm:text-[0.75rem]"
        >
          {{ tech }}
        </li>
      </ul>

      <div class="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-[var(--line)] pt-3 text-[0.75rem] font-bold sm:gap-x-5 sm:gap-y-3 sm:pt-5 sm:text-[0.875rem]">
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
