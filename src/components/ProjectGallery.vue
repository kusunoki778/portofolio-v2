<script setup>
defineProps({
  project: { type: Object, required: true },
  compact: { type: Boolean, default: false },
})
</script>

<template>
  <div
    class="grid aspect-[16/10] overflow-hidden bg-[var(--surface-muted)]"
    :class="compact ? 'grid-cols-1 gap-1.5 sm:grid-cols-3 md:gap-2' : 'grid-cols-3 gap-1.5 md:gap-2'"
  >
    <img
      :src="project.gallery[0].src"
      :alt="project.gallery[0].alt"
      loading="lazy"
      decoding="async"
      class="h-full min-h-0 w-full object-contain"
    />
    <img
      v-for="item in project.gallery.slice(1)"
      :key="item.src"
      :src="item.src"
      :alt="item.alt"
      loading="lazy"
      decoding="async"
      class="h-full min-h-0 w-full object-contain"
      :class="compact ? 'hidden sm:block' : ''"
    />
  </div>
</template>
