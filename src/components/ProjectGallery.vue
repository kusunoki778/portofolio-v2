<script setup>
defineProps({
  project: { type: Object, required: true },
})
</script>

<template>
  <div
    class="grid aspect-[16/10] grid-cols-3 gap-1.5 overflow-hidden bg-[var(--surface-muted)] md:gap-2"
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
    />
  </div>
</template>
